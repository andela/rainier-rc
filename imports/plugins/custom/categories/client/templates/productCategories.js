import { Tags } from "/lib/collections";

Template.productCategoriesList.onCreated(() => {
  Meteor.subscribe("Tags");
});

Template.productCategoriesList.helpers({
  tags() {
    return Tags.find({
      isTopLevel: true
    }, {
      sort: {
        position: 1
      }
    }).fetch();
  }
});
