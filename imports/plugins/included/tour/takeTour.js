import introJs from "intro.js";
import { Reaction } from "/client/api";

const tour = introJs.introJs();
const userTour = [
  {
    intro: `<h2>Welcome to <strong>Reaction Commerce</strong></h2>
    <hr>
    <div class="tourcontainer">
      This brief tour will guide you through some of the features of the platform.
    </div>`
  },
  {
    element: ".product-grid-list",
    intro: `<h2>Products Grid</h2>
    <hr>
    <div>
      Products are displayed in grids here.
    </div>`
  },
  {
    element: ".search",
    intro: `<h2>Product Search</h2>
    <hr>
    <div class="tourcontainer">
      Perform intuitive search here and discover products that interest you
    </div>`
  },
  {
    element: ".cart",
    intro: `<h2>Shopping Cart</h2>
    <hr>
    <div class="tourcontainer">
      This is your cart which shows you the amount of items you have selected for purchase.
    </div>`
  },
  {
    element: ".languages",
    intro: `<h2>Language Support</h2>
    <hr>
    <div class="tourcontainer">
      Select your preferred language here.
    </div>`
  },
  {
    element: ".accounts",
    intro: `<h2>User Account Options</h2>
    <hr>
    <div class="tourcontainer">
      Register, signin, or signout here.
    </div>`
  },
  {
    element: ".tour",
    intro: `<h2>Tour</h2>
    <hr>
    <div class="tourcontainer">
      Thanks for joining me in the tour. Ever need to take a tour again, I am right here.
    </div>`
  }
];

const vendorTour = [
  {
    intro: `<h2>Welcome to <strong>Reaction</strong> Commerce</h2>
    <hr>
    <div class="tourcontainer">
      This brief tour will guide you through some of the features of the platform.
    </div>`
  },
  {
    element: ".product-grid-list",
    intro: `<h2>Products</h2>
    <hr>
    <div class="tourcontainer">
      Your products are displayed in grids here.
    </div>`
  },
  {
    element: ".search",
    intro: `<h2>Search</h2>
    <hr>
    <div class="tourcontainer">
      Your customers can perform intuitive search here and discover products that interest them
    </div>`
  },
  {
    element: ".cart",
    intro: `<h2>Shopping Cart</h2>
    <hr>
    <div class="tourcontainer">
      This is the shopping cart which shows the amount of items your customers have selected for purchase.
    </div>`
  },
  {
    element: ".accounts",
    intro: `<h2>Account Options</h2>
    <hr>
    <div class="tourcontainer">
      Access account controls here by choosing from one of the listed options in the 
      dropdown
    </div>`
  },
  {
    element: ".languages",
    intro: `<h2>Languages</h2>
    <hr>
    <div class="tourcontainer">
      Select your preferred language here.
    </div>`
  },
  {
    element: ".admin-controls-menu",
    intro: `<h2>Admin Controls</h2>
    <hr>
    <div class="tourcontainer">
      Use this tab to access Admin/Vendor functionalities such as your dashboard and content
    </div>`
  },
  {
    element: ".tour",
    intro: `<h2>Tour</h2>
    <hr>
    <div>
    Thanks for joining me in the tour. Ever need to take a tour again, I am right here.
    </div>`
  }
];

export function takeTour() {
  let tourSteps;
  if (Reaction.hasPermission("admin")) {
    tourSteps = vendorTour;
  } else {
    tourSteps = userTour;
  }
  tour.setOptions({
    showBullets: true,
    showProgress: true,
    scrollToElement: true,
    showStepNumbers: false,
    tooltipPosition: "auto",
    steps: tourSteps,
    disableInteraction: true
  });
  tour.start();
}
