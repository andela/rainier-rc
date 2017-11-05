import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import * as Collections from "/lib/collections";
import * as Schemas from "../../../lib/collections/schemas";

Meteor.methods({
  /**
   * Creates a Static Page
   * @param {String} title      page title
   * @param {String} slug       page slug
   * @param {String} category   page category
   * @param {String} content    content of the page
   * @param {String} shopId     ShopId of the page
   * @param {String} pageOwner  vendor id
   * @param {String} createdAt  datetime string at object creation
   * @return {void}             there is no return value
   */
  createPage: function (title, slug, category, content, shopId, pageOwner, createdAt) {
    check(title, String);
    check(slug, String);
    check(category, String);
    check(content, String);
    check(shopId, String);
    check(pageOwner, String);
    check(createdAt, Date);

    const page = {
      title,
      slug,
      category,
      content,
      shopId,
      pageOwner,
      createdAt
    };
    check(page, Schemas.StaticPages);
    Collections.StaticPages.insert(page);
  },

  /**
   * Edits a Static Page
   * @param {String} _id      ID of the page to be updated
   * @param {String} title    new page title
   * @param {String} slug     new page slug
   * @param {String} category page category
   * @param {String} content  new page content
   * @param {String} shopId   shopId
   * @return {void}           updates a shop document
   */
  "editPage"(_id, title, slug, category, content, shopId) {
    check(_id, String);
    check(title, String);
    check(slug, String);
    check(category, String);
    check(content, String);
    check(shopId, String);

    const page = {
      title,
      slug,
      category,
      content,
      shopId
    };
    Collections.StaticPages.update(_id, {
      $set:
        page
    });
  },

  /**
   * Deletes a Static Page
   * @param {String} _id - The id of the page to be deleted
   * @return {void}        deletes a page. Returns nothing
   */
  "deletePage"(_id) {
    check(_id, String);
    Collections.StaticPages.remove(_id);
  }
});
