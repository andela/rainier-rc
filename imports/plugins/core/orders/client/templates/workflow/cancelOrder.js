import {Meteor} from "meteor/meteor";
import {Template} from "meteor/templating";
import { Shops } from "/lib/collections";

this.state = new ReactiveDict();

const validateComment = (comment) => {
  check(comment, Match.OptionalOrNull(String));

  if (comment.length >= 7) {
    return true;
  } else if (comment.length === 0) {
    return {error: "INVALID_COMMENT", reason: "Specify a reason for canceling"};
  }
  return {error: "INVALID_COMMENT", reason: "Reason must be atleast 7 characters long"};
};

Template.coreOrderCancelOrder.onCreated(function () {
  const template = Template.instance();

  template.showCancelOrderForm = ReactiveVar(true);
  this.state = new ReactiveDict();
  template.formMessages = new ReactiveVar({});

  this.autorun(() => {
    const currentData = template.data;
    const order = currentData.order;
    const shop = Shops.findOne({});
    this.state.set("currency", shop.currencies[shop.currency]);

    if (order.workflow.status === "canceled") {
      template.showCancelOrderForm = ReactiveVar(false);
    }
    this.state.set("order", order);
  });
});

Template.coreOrderCancelOrder.helpers({
  showCancelOrderForm() {
    const template = Template.instance();
    return template.showCancelOrderForm.get();
  },

  messages() {
    return Template.instance().formMessages.get();
  },

  adminDashboard() {
    return true;
  },

  showEditor() {
    return Session.get("showEditor");
  },

  hasError(error) {
    if (error !== true && typeof error !== "undefined") {
      return "has-error has-feedback";
    }
    return false;
  },
  orderRefunded() {
    return !(this.order.refunded);
  }
});


Template.coreOrderCancelOrder.events({
  "change #cancel-reason"(event, template) {
    const cancelReason = template.$("#cancel-reason");
    const selectedReason = cancelReason.val().trim();
    if (selectedReason === "others") {
      Session.set("showEditor", true);
    } else {
      Session.set("showEditor", false);
    }
  },

  "submit form[name=cancelOrderForm]"(event, template) {
    event.preventDefault();
    const otherReason = template.$("#other-reason");
    const otherSelectedReason = (template.$("#cancel-reason")).val().trim();
    const order = template.state.get("order");
    const currency = template.state.get("currency");
    const refundAmount = order.billing[0].invoice.total;
    const buyer = order.billing[0].address.fullName;

    let comment;
    if (otherSelectedReason === "others") {
      comment = otherReason.val().trim();
    } else {
      comment = otherSelectedReason;
    }

    const validatedComment = validateComment(comment);
    const templateInstance = Template.instance();
    const errors = {};

    templateInstance.formMessages.set({});

    if (validatedComment !== true) {
      errors.comment = validatedComment;
    }

    if ($.isEmptyObject(errors) === false) {
      templateInstance.formMessages.set({errors: errors});
      return;
    }

    const cancelComment = {
      body: comment,
      userId: Meteor.userId(),
      updatedAt: new Date
    };

    Alerts.alert({
      title: "Are you sure you want to cancel this order?",
      text: `Refund ${currency.symbol}${refundAmount} to ${buyer}?`,
      showCancelButton: "true",
      confirmButtonText: "Cancel Order"
    }, (isConfirm) => {
      if (isConfirm) {
        Meteor.call("orders/vendorCancelOrder", order, cancelComment, (error) => {
          if (!error) {
            template.showCancelOrderForm.set(false);
            Alerts.toast(("Failed!!", { err: error[0].message }), "error");
          } else {
            Alerts.alert({
              type: "success",
              showCancelButton: false,
              text: "Order Refund Successful"
            });
          }
        });
      }
    });
  }
});
