import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Random } from "meteor/random";

/**
 * Static page schema
 */
export const StaticPages = new SimpleSchema({
  _id: {
    type: String,
    optional: true,
    defaultValue: Random.id()
  },
  title: {
    type: String,
    label: "title", // should be unique
    index: true,
    unique: true
  },
  slug: {
    type: String,
    label: "slug", // has to be unique
    index: true,
    unique: true
  },
  category: {
    type: String,
    optional: true
  },
  content: {
    type: String,
    label: "content"
  },
  shopId: {
    type: String,
    label: "shopId"
  },
  pageOwner: {
    type: String,
    label: "pageOwner"
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      }
      this.unset();  // Prevent user from supplying their own value
      denyUpdate: true;
    }
  },
  updatedAt: {
    type: Date,
    autoValue() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  }
});
