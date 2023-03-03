import Component from "flarum/common/Component";
import Button from "flarum/common/components/Button";
import Tooltip from "flarum/common/components/Tooltip";
import app from "flarum/forum/app";
import type Mithril from "mithril";

export default class DiscussionsRefreshItem extends Component {
  loading!: boolean;

  oninit(vnode: Mithril.Vnode<this>): void {
    super.oninit(vnode);

    this.loading = false;
  }

  oncreate(vnode: Mithril.VnodeDOM<this>): void {
    super.oncreate(vnode);
  }

  onClick(): void {
    this.loading = true;

    app.discussions.refresh().then(() => {
      this.loading = false;

      app.discussionsUpdates = [];

      app.setTitleCount(0);

      m.redraw();
    });
  }

  view() {
    const count = app.discussionsUpdates.length;

    if (!count) {
      return;
    }

    const text = app.translator.trans(
      "nearata-websocket.forum.discussions_tooltip_label"
    );

    return (
      <Tooltip text={text}>
        <Button
          class="Button"
          onclick={this.onClick.bind(this)}
          loading={this.loading}
          aria-label={text}
        >
          {count}
        </Button>
      </Tooltip>
    );
  }
}
