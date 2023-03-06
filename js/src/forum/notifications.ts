import Websocket from "./states/Websocket";
import app from "flarum/forum/app";

export default function () {
  app.websocket.then((websocket: Websocket) => {
    websocket.getMain()?.on("publication", (ctx) => {
      if (ctx.channel !== `flarum:#${app.session.user?.id()}`) {
        return;
      }

      if (ctx.data.type !== "notifications") {
        return;
      }

      app.session.user?.pushAttributes({
        unreadNotificationCount:
          (app.session.user.unreadNotificationCount() ?? 0) + 1,
        newNotificationCount:
          (app.session.user.newNotificationCount() ?? 0) + 1,
      });

      app.notifications.clear();

      m.redraw();
    });
  });
}
