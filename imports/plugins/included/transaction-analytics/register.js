import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "ActionableAnalytics",
  name: "reaction-actionable-analytics",
  icon: "fa fa-bar-chart",
  autoEnable: true,
  settings: {
    name: "ActionableAnalytics"
  },
  registry: [
    {
      route: "/dashboard/actionable-analytics",
      provides: "dashboard",
      name: "actionableAnalytics",
      label: "Analytics & Reports",
      description: "Data driven product presentation, and performance analysis",
      icon: "fa fa-bar-chart",
      priority: 1,
      container: "core",
      workflow: "coreDashboardWorkflow",
      template: "actionableAnalytics"
    }
  ]
});
