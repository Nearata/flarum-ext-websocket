import DiscussionsRefreshItem from "./components/DiscussionsRefreshItem";
import Websocket from "./states/Websocket";
import type { PublicationContext } from "centrifuge";
import { extend } from "flarum/common/extend";
import app from "flarum/forum/app";
import DiscussionList from "flarum/forum/components/DiscussionList";
import IndexPage from "flarum/forum/components/IndexPage";

const routes = ["index", "following"];

function listener(ctx: PublicationContext) {
  if (!routes.includes(app.current.get("routeName"))) {
    return;
  }

  const params = app.discussions.getParams();

  if (params.q || params.sort || params.filter) {
    return;
  }

  const id = String(ctx.data.discussionId);

  if (app.discussionsUpdates.indexOf(id) !== -1) {
    return;
  }

  // flarum/subscriptions
  if (app.current.get("routeName") === "following") {
    const discussion = app.store.getById("discussions", id);

    if (discussion?.attribute("subscription") !== "follow") {
      return;
    }
  }

  app.discussionsUpdates.push(id);

  app.setTitleCount(app.discussionsUpdates.length);

  m.redraw();
}

export default function () {
  app.discussionsUpdates = [];

  extend(IndexPage.prototype, "actionItems", (items) => {
    if (routes.includes(app.current.get("routeName"))) {
      items.setContent("refresh", DiscussionsRefreshItem.component());
    }
  });

  extend(DiscussionList.prototype, "oninit", function () {
    this.listener1 = function (ctx: PublicationContext) {
      if (ctx.channel !== `flarum:#${app.session.user?.id()}`) {
        return;
      }

      if (ctx.data.type !== "discussions") {
        return;
      }

      listener(ctx);
    };
  });

  extend(DiscussionList.prototype, "oncreate", function () {
    app.discussionsUpdates = [];

    app.websocket.then((websocket: Websocket) => {
      websocket.getMain()?.on("publication", this.listener1);

      websocket
        .subscribe("flarum:discussions")
        ?.on("publication", listener.bind(this));
    });
  });

  extend(DiscussionList.prototype, "onremove", function () {
    app.websocket.then((websocket: Websocket) => {
      websocket.getMain()?.removeListener("publication", this.listener1);

      websocket.unsubscribe("flarum:discussions");
    });
  });
}
