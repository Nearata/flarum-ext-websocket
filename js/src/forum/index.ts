import Session from "flarum/common/Session";
import Button from "flarum/common/components/Button";
import { extend, override } from "flarum/common/extend";
import app from "flarum/forum/app";
import DiscussionList from "flarum/forum/components/DiscussionList";
import IndexPage from "flarum/forum/components/IndexPage";
import type { Children } from "mithril";

/** ref: https://github.com/flarum/pusher/blob/v1.6.1/js/src/forum/index.ts */
app.initializers.add("nearata-websocket", () => {
  const apiRequest = async (channel: string) => {
    return app
      .request({
        url: `${app.forum.attribute(
          "apiUrl"
        )}/nearata/websocket/refreshChannelToken`,
        method: "POST",
        body: { channel },
      })
      .then((res: any) => {
        return res["token"];
      })
      .catch(() => {
        return "";
      });
  };

  app.centrifuge = import(
    "//cdnjs.cloudflare.com/ajax/libs/centrifuge/3.1.0/centrifuge.min.js" /* webpackIgnore: true, webpackPrefetch: true */
  ).then(() => {
    const wsUrl = app.forum.attribute("nearataWebsocketUrl");

    const centrifuge = new Centrifuge(wsUrl, {
      getToken: async function () {
        const response = app
          .request({
            url: `${app.forum.attribute(
              "apiUrl"
            )}/nearata/websocket/refreshMainToken`,
            method: "POST",
          })
          .then((res: any) => {
            return res["token"];
          })
          .catch(() => {
            return "";
          });
        return await response;
      },
    });
    centrifuge.connect();

    const discussions = centrifuge.newSubscription("flarum:discussions", {
      getToken: async function () {
        return await apiRequest("discussions");
      },
    });
    discussions.subscribe();

    const notifications = centrifuge.newSubscription("flarum:notifications", {
      getToken: async function () {
        return await apiRequest("notifications");
      },
    });
    notifications.subscribe();

    return {
      main: centrifuge,
      discussions: discussions,
      notifications: notifications,
    };
  });

  app.centrifuge.then((channels) => {
    channels.notifications.on("publication", function () {
      app.session.user?.pushAttributes({
        unreadNotificationCount:
          app.session.user.unreadNotificationCount() ?? 0 + 1,
        newNotificationCount: app.session.user.newNotificationCount() ?? 0 + 1,
      });

      app.notifications.clear();

      m.redraw();
    });
  });

  app.pushedUpdates = [];

  /*
  override(Session.prototype, 'logout', function (original) {
    const req1 = app.request({ url: `${app.forum.attribute('apiUrl')}/nearata/websocket/expireToken`, method: 'POST' });

    Promise.all([req1]).then(() => original());
  });
  */

  extend(DiscussionList.prototype, "view", function (vdom: Children) {
    if (app.pushedUpdates) {
      const count = app.pushedUpdates.length;

      if (
        count &&
        typeof vdom === "object" &&
        vdom &&
        "children" in vdom &&
        vdom.children instanceof Array
      ) {
        vdom.children.unshift(
          Button.component(
            {
              className: "Button Button--block DiscussionList-update",
              onclick: () => {
                this.attrs.state.refresh().then(() => {
                  this.loadingUpdated = false;

                  app.pushedUpdates = [];
                  app.setTitleCount(0);

                  m.redraw();
                });

                this.loadingUpdated = true;
              },
              loading: this.loadingUpdated,
            },
            app.translator.trans("nearata-websocket.forum.show_updates_text", {
              count,
            })
          )
        );
      }
    }
  });

  extend(DiscussionList.prototype, "oncreate", function () {
    app.centrifuge.then((channels) => {
      channels.discussions.on("publication", (ctx) => {
        const data = ctx.data;

        const params = app.discussions.getParams();

        if (!params.q && !params.sort && !params.filter) {
          const id = String(data.discussionId);

          if (
            (!app.current.get("discussion") ||
              id !== app.current.get("discussion").id()) &&
            app.pushedUpdates.indexOf(id) === -1
          ) {
            app.pushedUpdates.push(id);

            if (app.current.matches(IndexPage)) {
              app.setTitleCount(app.pushedUpdates.length);
            }

            m.redraw();
          }
        }
      });
    });
  });

  extend(IndexPage.prototype, "actionItems", (items) => {
    items.remove("refresh");
  });
});
