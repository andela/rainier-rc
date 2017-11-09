import { Meteor } from "meteor/meteor";
import { StaticPages } from "/lib/collections";

Meteor.publish("staticPages", function () {
  if (!this.userId) {
    return this.ready();
  }
  return StaticPages.find({});
});

Meteor.publish("viewPages", function () {
  return StaticPages.find({});
});
