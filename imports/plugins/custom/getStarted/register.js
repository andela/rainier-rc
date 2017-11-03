import { Reaction } from "/server/api";


Reaction.registerPackage({
  label: "Get Started",
  name: "Get Started",
  icon: "fa fa-cubes",
  autoEnable: true,
  registry: [{
    route: "/get-started",
    template: "getStarted",
    name: "Get Started"
  }]
});

