import {
  Accounts,
  Cart,
  Emails,
  Inventory,
  Orders,
  Products,
  Shops
} from "../../lib/collections";
import Reaction from "../../server/api/core";

const permission = (user, role) => {
  return user
    .roles[Reaction.getShopId()]
    .includes(role);
};

export default() => {
  const Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true,
    version: "v1",
    defaultHeaders: {
      "Content-Type": "application/json"
    }
  });

  const getApi = (collectionName) => {
    return {
      routeOptions: {
        authRequired: true
      },
      endpoints: {
        // GET all items in collection
        get: {
          action() {
            if (permission(this.user, "admin") || permission(this.user, "guest") || permission(this.user, "owner")) {
              const result = collectionName.findOne(this.urlParams.id);
              if (result) {
                return {status: "success", statusCode: 200, message: "All records", data: result};
              }
              return {status: "fail", statusCode: 401, message: "Error occurred. Record not found"};
            }
          }
        },

        // POST into a collection
        post: {
          action() {
            if (permission(this.user, "admin") || permission(this.user, "owner")) {
              const recordInserted = collectionName.insert(this.bodyParams);
              if (recordInserted) {
                return { statusCode: 201, status: "success", data: recordInserted };
              }
              return { statusCode: 400, status: "fail", message: "An error occurred. Post was not successful" };
            }
            if (!(permission(this.user, "admin") || permission(this.user, "owner"))) {
              return { statusCode: 403, status: "fail", message: "You do not have permission to add a record" };
            }
          }
        },

        // UPDATE a collection
        put: {
          action() {
            if (permission(this.user, "admin") || permission(this.user, "owner")) {
              const recordUpdated = collectionName.upsert({ _id: this.urlParams.id }, {
                $set: this.bodyParams
              });
              if (!recordUpdated) {
                return {
                  status: "fail",
                  statusCode: 404,
                  message: "Error occurred. Record does not exist"
                };
              }
              const record = collectionName.findOne(this.urlParams.id);
              return {
                statusCode: 200,
                status: "success",
                data: recordUpdated,
                record
              };
            }
            if (!(permission(this.user, "admin") || permission(this.user, "owner"))) {
              return {
                statusCode: 403,
                status: "fail",
                message: "You do not have permission to edit this record"
              };
            }
          }
        },

        delete: {
          action() {
            if (permission(this.user, "admin") || permission(this.user, "owner")) {
              if (collectionName._name === "Products") {
                const collection = collectionName.findOne(this.urlParams.id);
                collection.recordDeleted = true;
                const recordDeleted = collectionName.upsert({ _id: this.urlParams.id }, {
                  $set: collection
                });
                return {
                  data: recordDeleted,
                  message: "Product has been archived"
                };
              }
              const recordDeleted = collectionName.remove({
                _id: this.urlParams.id
              });
              return {
                status: "success",
                data: recordDeleted,
                message: "Record has been deleted"
              };
            }
            if ((!permission(this.user, "admin") || permission(this.user, "owner"))) {
              return {
                status: "fail",
                statusCode: 403,
                message: "You do not have permission to delete this record"
              };
            }
          }
        }
      }
    };
  };

  Api.addCollection(Accounts, getApi(Accounts));
  Api.addCollection(Cart, getApi(Cart));
  Api.addCollection(Emails, getApi(Emails));
  Api.addCollection(Inventory, getApi(Inventory));
  Api.addCollection(Orders, getApi(Orders));
  Api.addCollection(Products, getApi(Products));
  Api.addCollection(Shops, getApi(Shops));
};
