import { html, css, LitElement } from 'lit-element';
import typography from './styles/typography.js';

export class RulesPoc2 extends LitElement {
  static get styles() {
    return [
      typography,
      css`
        :host {
          display: block;
          padding: 25px;
          color: var(--rules-poc-text-color);
          font-family: 'Source Sans Pro', sans-serif;
        }

        #canvas {
          width: 900px;
          height: 900px;
        }

        #builder {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(5, 1fr);
          grid-column-gap: 0px;
          grid-row-gap: 0px;
        }

        #toolbar {
          grid-area: 1 / 1 / 2 / 6;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-column-gap: 15px;
        }

        #leftcolumn {
          grid-area: 2 / 1 / 6 / 2;
        }
        #rightcolumn {
          grid-area: 2 / 5 / 6 / 6;
        }
        #canvas {
          grid-area: 2 / 2 / 6 / 5;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(5, 1fr);
          grid-gap: 20px;
        }

        div {
          padding: 10px;
        }

        .outlined {
          border: 1px dashed lightgray;
        }

        .nodetype {
          border: 3px solid lightgray;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
          border-radius: 5px;
          height: 70%;
          width: 150px;
          padding-top: 0px;
          margin-top: 30px;
          line-height: 0.3;
        }

        .nodetype:hover {
          cursor: pointer;
          border: 3px solid gray;
        }

        .nodetype[focused] {
          border: 3px solid hsl(209, 61%, 16%);
        }

        .key {
          display: grid;
          grid-template-columns: 1fr 4fr;
        }

        #key-command {
          text-align: right;
          margin-right: 5px;
        }
      `,
    ];
  }

  static get properties() {
    return {
      nodes: { type: Array },
      edges: { type: Array },
      focusedNodeTypeIndex: { type: Number },
    };
  }

  constructor() {
    super();
    this.nodes = [];
    this.edges = [];
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.nodeTypes = [
      {
        name: 'Behavior',
        fields: {
          tags: { required: false, default: [] },
          uuid: { required: true },
          fromDate: { required: true },
          thruDate: { required: false },
          ingestByDate: { required: false },
          behaviorType: { required: true, default: '' },
          tenantId: { required: true, default: '' },
        },
      },
      {
        name: 'Behavior Field Check',
        fields: {
          tags: { required: false, default: [] },
          uuid: { required: true },
          fieldName: { required: true },
          fieldType: { required: true },
          operator: { required: true },
          operand: { required: true },
        },
      },
      {
        name: 'Accumulator',
        fields: {
          tags: { required: false, default: [] },
          uuid: { required: true },
          fireOnAmount: { required: true },
        },
      },
      {
        name: 'Payout',
        fields: {
          tags: { required: false, default: [] },
          uuid: { required: true },
          amount: { required: true },
        },
      },
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this.handleKeyPress);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    // add a
    if (e.keyCode === 65) {
      if (typeof this.focusedNodeTypeIndex === 'number') {
        this.nodes = [...this.nodes, this.nodeTypes[this.focusedNodeTypeIndex]];
      }
    }

    // edit e
    if (e.keycode === 69) {
    }

    // connect x
    if (e.keycode === 88) {
    }

    // delete backspace
    if (e.keycode === 8) {
    }
  }

  selectNodeType(e) {
    Object.values(e.composedPath()).forEach(el => {
      if (el.hasAttribute && el.hasAttribute('selectable')) {
        this.focusedNodeTypeIndex = parseInt(el.dataset.index, 10);
      }
    });
  }

  render() {
    return html`
      <section id="builder">
        <div id="toolbar" class="outlined">
          ${this.nodeTypes.map(
            (nodeType, index) => html`
              <div
                class="nodetype"
                @click="${this.selectNodeType}"
                ?focused="${index === this.focusedNodeTypeIndex}"
                selectable
                data-index="${index}"
              >
                <p>${nodeType.name}</p>
                ${Object.keys(nodeType.fields).map(
                  key => html`
                    <p class="font-small font-secondary">${key}</p>
                  `,
                )}
              </div>
            `,
          )}
        </div>
        <div id="leftcolumn" class="outlined">
          <table id="key">
            <tr>
              <th id="key-command"></th>
              <th id="key-label"></th>
            </tr>
            <tr>
              <td></td>
              <td class="font-underline">ALL</td>
            </tr>
            <tr>
              <td class="font-secondary font-heavy">a</td>
              <td>node type</td>
            </tr>
            <tr>
              <td class="font-secondary font-heavy">e</td>
              <td>edit</td>
            </tr>
            <tr>
              <td class="font-secondary font-heavy">x</td>
              <td>connect</td>
            </tr>
          </table>
        </div>
        <div id="canvas">
          ${this.nodes.map(
            node => html`
              <box-node>
                <p class="font-small font-secondary">${node.name}</p>
                ${Object.entries(node.fields).map(
                  field =>
                    html`
                      <label class="font-small">${field[0]}</label> <input />
                    `,
                )}
              </box-node>
            `,
          )}
        </div>
        <div id="rightcolumn" class="outlined">
          <code>
            <pre>
${JSON.stringify(this.nodes, null, 2)}
            </pre
            >
          </code>
        </div>
      </section>
    `;
  }
}
