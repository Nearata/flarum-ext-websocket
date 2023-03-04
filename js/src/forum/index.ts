import discussions from "./discussions";
import notifications from "./notifications";
import Websocket from "./states/Websocket";
import app from "flarum/forum/app";

/**
 * ref: https://github.com/flarum/pusher/blob/v1.6.1/js/src/forum/index.ts
 */
app.initializers.add("nearata-websocket", () => {
  app.websocket = (async () => {
    await import(
      "//cdnjs.cloudflare.com/ajax/libs/centrifuge/3.1.0/centrifuge.min.js" /* webpackIgnore: true, webpackPrefetch: true */
    );

    const websocket = new Websocket();

    websocket.init();

    return websocket;
  })();

  discussions();
  notifications();
});
