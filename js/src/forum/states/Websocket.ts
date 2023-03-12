import type { Centrifuge as centrifuge, Subscription } from "centrifuge";
import app from "flarum/forum/app";

export default class Websocket {
  main: centrifuge | undefined;

  init() {
    const wsUrl: string = app.forum.attribute("nearataWebsocketUrl");

    const centrifuge: centrifuge = new Centrifuge(wsUrl, {
      getToken: async function () {
        const url = app.forum.attribute("apiUrl");

        return await app
          .request({
            url: `${url}/nearata/websocket/refreshMainToken`,
            method: "POST",
          })
          .then((res: any) => {
            return res["token"];
          })
          .catch(() => {
            return "";
          });
      },
    });

    centrifuge.connect();

    this.main = centrifuge;
  }

  subscribe(
    channel: string,
    endpoint: string = "/nearata/websocket/refreshChannelToken"
  ) {
    if (this.main?.subscriptions()[channel]) {
      return this.main.getSubscription(channel);
    }

    const sub = this.main?.newSubscription(channel, {
      getToken: async function () {
        const url = app.forum.attribute("apiUrl");

        return await app
          .request({
            url: `${url}${endpoint}`,
            method: "POST",
            body: { channel },
          })
          .then((res: any) => {
            return res["token"];
          })
          .catch(() => {
            return "";
          });
      },
    });

    sub?.subscribe();

    return sub;
  }

  getMain() {
    return this.main;
  }
}
