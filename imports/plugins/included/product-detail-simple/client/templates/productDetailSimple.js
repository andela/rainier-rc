import { ProductDetailContainer } from "../containers";
import { isRevisionControlEnabled } from "/imports/plugins/core/revisions/lib/api";
import {Template} from "meteor/templating";

Template.productDetailSimple.helpers({
  isEnabled() {
    return isRevisionControlEnabled();
  },
  PDC() {
    return ProductDetailContainer;
  }
});
Template.disqus.helpers({
  getDisqus() {
    const d = document;
    const s = d.createElement("script");
    s.src = "https://rainier.disqus.com/embed.js";
    s.setAttribute("data-timestamp", +new Date());
    (d.head || d.body).appendChild(s);
  }
});

