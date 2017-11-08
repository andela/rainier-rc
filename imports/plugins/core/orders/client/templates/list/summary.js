import { Template } from "meteor/templating";
import { Logger } from "/client/api";
import { NumericInput } from "/imports/plugins/core/ui/client/components";

/**
 * ordersListSummary helpers
 *
 * @returns paymentInvoice
 */
Template.ordersListSummary.helpers({
  invoice() {
    return this.invoice;
  },

  numericInputProps(value) {
    const { currencyFormat } = Template.instance().data;
    return {
      component: NumericInput,
      value,
      format: currencyFormat,
      isEditing: false
    };
  },
  showCancelButton() {
    return !(this.order.workflow.status === "canceled"
      || this.order.workflow.status === "coreOrderWorkflow/completed");
  }
});

Template.ordersListSummary.onCreated(function () {
  this.state = new ReactiveDict();
  this.autorun(() => {
    const currentData = Template.currentData();
    const order = currentData.order;
    this.state.set("order", order);
  });
});

/**
  * ordersListSummary events
  */
Template.ordersListSummary.events({
  /**
  * Submit form
  * @param  {Event} event - Event object
  * @param  {Template} instance - Blaze Template
  * @return {void}
  */
  "click button[name=cancel]"(event, template) {
    event.stopPropagation();
    const state = template.state;
    const order = state.get("order");
    let refundContext;
    let status;
    if (order.billing[0].paymentMethod.processor === "Paystack") {
      refundContext = "bank account";
      status = "Your refund is being processed";
    } else {
      refundContext = "wallet";
      status = "Order Refund Successful";
    }
    Alerts.alert({
      title: "Are you sure you want to cancel this order.",
      text: `All refunds will credited to ${refundContext}!`,
      showCancelButton: true,
      confirmButtonText: "Cancel Order"
    }, (isConfirm) => {
      if (isConfirm) {
        Meteor.call("orders/cancelOrder", order, (error) => {
          if (error) {
            Logger.warn(error);
          } else {
            Alerts.alert({
              type: "success",
              showCancelButton: false,
              text: status
            });
          }
        });
      }
    });
  }
});
