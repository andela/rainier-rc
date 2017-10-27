import introJs from "intro.js";
import { Reaction } from "/client/api";

const tour = introJs.introJs();
const userTour = [
  {
    intro: `<h2>Welcome to <strong>Reaction Commerce</strong></h2>
    <hr>
    <div class="tourcontainer">
      <strong>Reaction Commerce</strong> is a modern ecommerce platform that 
      exposes quality products or services from trusted vendors to customers while allowing
      for smooth shopping experience and payments processing.<br><br>
      This brief tour will guide you through some features of the platform.
    </div>`
  },
  {
    element: ".product-grid-list",
    intro: `<h2>Products</h2>
    <hr>
    <div>
      All available products are displayed in a grid here. 
    </div>`
  },
  {
    element: ".search",
    intro: `<h2>Search</h2>
    <hr>
    <div class="tourcontainer">
      Perform intuitive search here, discover products that interest you, while taking
      advatage of the following capabilities:
      <ol>
        <li>view result as you type in your search</li>
        <li>Filter products search results</li>
        <li>Sort products search results based on the product sales</li>
      </ol>
    </div>`
  },
  {
    element: ".cart",
    intro: `<h2>Cart</h2>
    <hr>
    <div class="tourcontainer">
      This is your cart which shows you the amount of items you have selected for purchase.<br>
      Click on the cart icon to cash out. <br>    
    </div>`
  },
  {
    element: ".languages",
    intro: `<h2>Languages</h2>
    <hr>
    <div class="tourcontainer">
      Select your preferred language here. This option was provisioned because we believe that
      language should never be a barrier to helping our customers achieve a best in class 
      shopping or selling experience.
    </div>`
  },
  {
    element: ".accounts",
    intro: `<h2>Account Options</h2>
    <hr>
    <div class="tourcontainer">
      Register or signin here when you finish shopping and want to checkout. It's short, its
      straight forward:<br>
      click on this Icon to reveal a dropdown where you can enter needed details to register
      or login.
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
    element: ".product-grid-list",    
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
