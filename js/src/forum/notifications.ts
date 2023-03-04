import Websocket from "./states/Websocket";
import app from "flarum/forum/app";

export default function notifications() {
  app.websocket.then((websocket: Websocket) => {
    websocket
      .subscribeChannel(`notifications#${app.session.user?.id()}`)
      .on("publication", function () {
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
