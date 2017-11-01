import introJs from "intro.js";
import { Reaction } from "/client/api";

const tour = introJs.introJs();
const userTour = [
  {
    intro: `<h2>Welcome to <strong>Reaction Commerce</strong></h2>
    <hr>
    <div class="tourcontainer">
      This brief tour will guide you through some of the features on the platform.
    </div>`
  },
  {
    element: ".product-grid-list",
    intro: `<h2>Products Grid</h2>
    <hr>
    <div>
<<<<<<< HEAD
      Products are displayed in grids here.
=======
      Products are displayed in grids here. 
>>>>>>> 80e3a40b9f8ffa9b78e4c95efeeb9dbde59e13a3
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
<<<<<<< HEAD
      This is your cart which shows you the amount of items you have selected for purchase.
=======
      This is your cart which shows you the amount of items you have selected for purchase.  
>>>>>>> 80e3a40b9f8ffa9b78e4c95efeeb9dbde59e13a3
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
      That's for joining me in the tour. Ever need to take a tour again, I am right here.
    </div>`
  }
];
const vendorTour = [
  {
    intro: `<h2>Welcome to <strong>Reaction</strong> Commerce</h2>
    <hr>
    <div class="tourcontainer">
    </div>`
  },
  {
<<<<<<< HEAD
    element: ".product-grid-list",
=======
    element: ".product-grid-list",    
>>>>>>> 80e3a40b9f8ffa9b78e4c95efeeb9dbde59e13a3
    intro: `<h2>Products</h2>
    <hr>
    <div class="tourcontainer">
    </div>`
  },
  {
    element: ".search",
    intro: `<h2>Search</h2>
    <hr>
    <div class="tourcontainer">
    </div>`
  },
  {
    element: ".cart",
    intro: `<h2>My Cart</h2>
    <hr>
    <div class="tourcontainer">
    </div>`
  },
  {
    element: ".languages",
    intro: `<h2>Languages</h2>
    <hr>
    <div class="tourcontainer">
    </div>`
  },
  {
    element: ".more",
    intro: `<h2>Static Pages Options</h2>
    <hr>
    <div class="tourcontainer">
    </div>`
  },
  {
    element: ".accounts",
    intro: `<h2>Account Options</h2>
    <hr>
    <div class="tourcontainer">
    </div>`
  },
  {
    element: ".admin-controls-menu",
    intro: `<h2>Admin Controls</h2>
    <hr>
    <div class="tourcontainer">
    </div>`
  },
  {
    element: ".tour",
    intro: `<h2>Tour</h2>
    <hr>
    <div>
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
    steps: tourSteps
  });
  tour.start();
}
