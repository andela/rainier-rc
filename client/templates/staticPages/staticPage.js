import { StaticPages } from "/lib/collections";
import { Template } from "meteor/templating";
import marked from "marked";

Template.staticPageDisplay.onCreated(function () {
  this.autorun(() => {
    this.subscribe("StaticPages");
  });
});

Template.staticPageDisplay.helpers({
  staticPage(slug) {
    const instance = Template.instance();
    if (instance.subscriptionsReady()) {
      const page = StaticPages.find({slug}).fetch();
      if (page.length > 0) {
        const data = { title, content} = page[0];
        data.content = marked(data.content);
        return [data];
      }
    }
  }
});
