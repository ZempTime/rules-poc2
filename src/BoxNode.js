import { html, css, LitElement } from 'lit-element';
import { v4 as uuidv4 } from 'uuid/dist/esm-browser';

export class BoxNode extends LitElement {
  static get styles() {
    return css`
      #box {
        min-width: 100px;
        min-height: 100px;
        border-radius: 5px;
        border: 2px solid #c9c9c9;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
      }

      #box:hover {
        cursor: pointer;
        border: 2px solid #a9a9a9;
      }

      #box[focused] {
        border: 2px solid #5b6ba9;
      }

      div {
        padding: 10px;
      }
    `;
  }

  static get properties() {
    return {
      focused: { type: Boolean, reflect: true },
      uuid: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.focused = false;
    this.uuid = this.uuid || uuidv4();
  }

  toggleFocus() {
    this.focused = !this.focused;
  }

  render() {
    return html`
      <div @click="${this.toggleFocus}" id="box" ?focused="${this.focused}">
        <slot></slot>
      </div>
    `;
  }
}
