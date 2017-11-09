import SimpleMDE from "simplemde";
import { Reaction } from "/client/api";
import { Template } from "meteor/templating";
import { StaticPages } from "/lib/collections";

import "/node_modules/simplemde/dist/simplemde.min.css";
import "./rainierCreateStaticPages.html";

/**
 * creates slug from input
 * @param  {String} text text input
 * @return {String}      slug
 */
const sluggify = text => text.toLowerCase().trim().replace(/\s/g, "-");

let editor;
Template.rainierCreateStaticPages.onRendered(() => {
  editor = new SimpleMDE({
    element: document.getElementById("content"),
    placeholder: "Enter page content...",
    spellChecker: true,
    hideIcons: ["image"],
    autoDownloadFontAwesome: false,
    renderingConfig: {
      singleLineBreaks: false,
      codeSyntaxHighlighting: true
    }
  });
});

Template.rainierCreateStaticPages.events({
  "submit .create-page-form": (event) => {
    event.preventDefault();
    const _id = $("#_id").val();
    const title = $("#title").val();
    const slug = sluggify(title);
    const content = $("#content").val();
    const category = $("#category").val();
    const shopId = Reaction.shopId;
    const pageOwner = Meteor.user()._id;
    const createdAt = new Date();
    if (_id) {
      return Meteor.call(
        "editPage", _id, title, slug, category, content, shopId, (error) => {
          if (error) {
            Alerts.toast(error.message, "error", {
              autoHide: 1000
            });
          } else {
            $("#title").val("");
            $("#_id").val("");
            $("#category").val("");
            editor.value("");
            Alerts.toast("Page updated sucessfully!", "success", {
              autoHide: 1000
            });
          }
          document.getElementById("page-heading").textContent = "Create New Page";
        });
    }
    return Meteor.call(
      "createPage", title, slug, category, content, shopId, pageOwner, createdAt,
      (error) => {
        if (error) {
          Alerts.toast(error.message, "error", {
            autoHide: 1000
          });
        } else {
          $("#title").val("");
          $("#_id").val("");
          $("#category").val("");
          editor.value("");
          Alerts.toast("Page created sucessfully!", "success", {
            autoHide: 1000
          });
        }
      });
  },
  "click #clear-fields": (event) => {
    event.preventDefault();
    $("#title").val("");
    $("#_id").val("");
    $("#category").val("");
    editor.value("");
  }
});


Template.staticPagesList.onCreated(function () {
  Meteor.subscribe("staticPages");
});

Template.staticPagesList.helpers({
  staticPages() {
    return StaticPages.find({shopId: Reaction.shopId}).fetch();
  }
});

Template.staticPagesList.events({
  "click .edit-page"(event) {
    const element = event.target;
    const _id = $(element).attr("data-id");
    const page = StaticPages.find({ _id }).fetch();

    document.getElementById("_id").value = page[0]._id || "";
    const title = document.getElementById("title");
    title.value = page[0].title || "";
    const category = document.getElementById("category");
    category.value = page[0].category || "";
    editor.value(page[0].content);
    document.getElementById("page-heading").textContent = "Edit Page";
  },

  "click .delete-page"(event) {
    event.preventDefault();
    event.stopPropagation();
    Alerts.alert({
      title: "Remove Static Page?",
      type: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes"
    }, (confirmed) => {
      if (confirmed) {
        const element = event.target;
        const id = $(element).attr("data-id");
        Meteor.call("deletePage", id);
      }
      return false;
    });
  }
});
