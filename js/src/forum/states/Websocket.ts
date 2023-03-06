import type { Centrifuge as centrifuge, Subscription } from "centrifuge";
import app from "flarum/forum/app";

type Channels = {
  [key: string]: Subscription | undefined;
};

export default class Websocket {
  main: centrifuge | undefined;
  channels: Channels;

  constructor() {
    this.channels = {};
  }

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

  subscribeChannel(channel: string) {
    if (channel in this.channels) {
      return this.channels[channel];
    }

    const sub = this.main?.newSubscription(`flarum:${channel}`, {
      getToken: async function () {
        const url = app.forum.attribute("apiUrl");

        return await app
          .request({
            url: `${url}/nearata/websocket/refreshChannelToken`,
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

    this.channels[channel] = sub;

    return sub;
  }

  getMain() {
    return this.main;
  }

  getChannel(channel: string) {
    return this.channels[channel];
  }
}
