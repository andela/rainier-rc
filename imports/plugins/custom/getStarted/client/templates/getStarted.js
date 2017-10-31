import { Template } from "meteor/templating";
import { Reaction } from "/client/api";

Template.getStarted.events({
  "click #intro-next": function (event) {
    event.preventDefault();
    const element = document.querySelector("#intro-li");
    element.nextElementSibling.firstElementChild.click();
  },
  "click #shop-next": function (event) {
    event.preventDefault();
    const element = document.querySelector("#shop-li");
    element.nextElementSibling.firstElementChild.click();
  },
  "click #shop-prev": function (event) {
    event.preventDefault();
    const element = document.querySelector("#shop-li");
    element.previousElementSibling.firstElementChild.click();
  },
  "click #address-next": function (event) {
    event.preventDefault();
    const element = document.querySelector("#shop-info-li");
    element.nextElementSibling.firstElementChild.click();
  },
  "click #address-prev": function (event) {
    event.preventDefault();
    const element = document.querySelector("#shop-info-li");
    element.previousElementSibling.firstElementChild.click();
  },
  "click #payment-next": function (event) {
    event.preventDefault();
    const element = document.querySelector("#payment-li");
    element.nextElementSibling.firstElementChild.click();
  },
  "click #payment-prev": function (event) {
    event.preventDefault();
    const element = document.querySelector("#payment-li");
    element.previousElementSibling.firstElementChild.click();
  },
  "click #social-next": function (event) {
    event.preventDefault();
    const element = document.querySelector("#social-li");
    element.nextElementSibling.firstElementChild.click();
  },
  "click #social-prev": function (event) {
    event.preventDefault();
    const element = document.querySelector("#social-li");
    element.previousElementSibling.firstElementChild.click();
  },
  "click #email-next": function (event) {
    event.preventDefault();
    const element = document.querySelector("#email-li");
    element.nextElementSibling.firstElementChild.click();
  },
  "click #email-prev": function (event) {
    event.preventDefault();
    const element = document.querySelector("#email-li");
    element.previousElementSibling.firstElementChild.click();
  },
  "click #product-next": function (event) {
    event.preventDefault();
    Reaction.Router.go("/reaction/dashboard");
  }
});
