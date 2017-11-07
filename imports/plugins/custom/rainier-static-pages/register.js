import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Static Pages",
  name: "reaction-static-pages",
  icon: "fa fa-list",
  autoEnable: true,
  settings: {
    name: "Static Pages"
  },
  registry: [
    {
      provides: "dashboard",
      route: "/dashboard/static",
      name: "static-pages",
      label: "Static Pages",
      description: "Manage static pages",
      icon: "fa fa-list",
      priority: 1,
      container: "core",
      workflow: "coreProductWorkflow",
      template: "rainierCreateStaticPages"
    }
  ],
  layout: [{
    layout: "coreLayout",
    workflow: "coreProductWorkflow",
    collection: "StaticPages",
    theme: "default",
    enabled: true,
    structure: {
      template: "rainierCreateStaticPages",
      layoutHeader: "layoutHeader",
      layoutFooter: "layoutFooter",
      notFound: "notFound",
      dashboardHeader: "dashboardHeader",
      dashboardControls: "dashboardControls",
      dashboardHeaderControls: "dashboardControls",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});
