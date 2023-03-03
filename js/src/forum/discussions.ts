import DiscussionsRefreshItem from "./components/DiscussionsRefreshItem";
import Websocket from "./states/Websocket";
import { extend } from "flarum/common/extend";
import app from "flarum/forum/app";
import DiscussionList from "flarum/forum/components/DiscussionList";
import IndexPage from "flarum/forum/components/IndexPage";

export default function discussions() {
  app.discussionsUpdates = [];

  extend(DiscussionList.prototype, "oncreate", function () {
    app.discussionsUpdates = [];

    app.websocket.then((websocket: Websocket) => {
      websocket
        .subscribeChannel("discussions")
        .on("publication", (ctx: any) => {
          const params = app.discussions.getParams();

          if (params.q || params.sort || params.filter) {
            return;
          }

          if (!app.current.matches(IndexPage)) {
            return;
          }

          const data = ctx.data;

          const id = String(data.discussionId);

          if (app.discussionsUpdates.indexOf(id) !== -1) {
            return;
          }

          app.discussionsUpdates.push(id);

          app.setTitleCount(app.discussionsUpdates.length);

          m.redraw();
        });
    });
  });

  extend(IndexPage.prototype, "actionItems", (items) => {
    if (app.current.get("routeName") === "index") {
      items.setContent("refresh", DiscussionsRefreshItem.component());
    }
  });
}
