import DiscussionsRefreshItem from "./components/DiscussionsRefreshItem";
import Websocket from "./states/Websocket";
import type { PublicationContext } from "centrifuge";
import { extend } from "flarum/common/extend";
import app from "flarum/forum/app";
import DiscussionList from "flarum/forum/components/DiscussionList";
import IndexPage from "flarum/forum/components/IndexPage";

function listener(ctx: PublicationContext) {
  const params = app.discussions.getParams();

  if (params.q || params.sort || params.filter) {
    return;
  }

  if (!["index", "following"].includes(app.current.get("routeName"))) {
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

export default function discussions() {
  app.discussionsUpdates = [];

  extend(DiscussionList.prototype, "oncreate", function () {
    app.discussionsUpdates = [];

    app.websocket.then((websocket: Websocket) => {
      websocket.subscribeChannel("discussions")?.on("publication", (ctx) => {
        listener(ctx);
      });

      websocket.getMain()?.on("publication", (ctx) => {
        if (ctx.channel !== `flarum:#${app.session.user?.id()}`) {
          return;
        }

        if (ctx.data.type !== "discussions") {
          return;
        }

        listener(ctx);
      });
    });
  });

  extend(IndexPage.prototype, "actionItems", (items) => {
    if (["index", "following"].includes(app.current.get("routeName"))) {
      items.setContent("refresh", DiscussionsRefreshItem.component());
    }
  });
}
