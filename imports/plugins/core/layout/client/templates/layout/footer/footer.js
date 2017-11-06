import { Reaction } from "/client/api";
import { Template } from "meteor/templating";
import { StaticPages } from "/lib/collections";


Template.layoutFooter.onCreated(function () {
  this.autorun(() => {
    this.subscribe("staticPages");
  });
});

Template.layoutFooter.helpers({
  staticPages() {
    return StaticPages.find({shopId: Reaction.shopId}).fetch();
  },
  staticPagesByCategory() {
    const pages = StaticPages.find({shopId: Reaction.shopId}).fetch();
    const categories = [];
    pages.forEach((page) => {
      if (!categories.includes(page.category)) {
        categories.push(page.category);
      }
    });
    return categories.map(category => pages.filter(page => page.category === category));
  }
});
