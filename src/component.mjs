import { agent } from "./main.mjs";

class LoadModule extends HTMLElement {
  constructor(...args) {
    super(...args);

    this._init();
  }

  _init() {
    let src = this.getAttribute("src");

    if (!src) {
      return;
      // throw `The ${this.tagName.toLowerCase()} element requires the src attribut `;
    }
    this.__initSrc = src;
    src = new URL(src, location.href, src).href;
    agent(src, {
      element: this,
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src") {
      if (newValue && oldValue === null) {
        this._init();
      } else if (this.__initSrc && oldValue && newValue !== this.__initSrc) {
        console.warn(
          `${this.tagName.toLowerCase()} change src is invalid, only the first change will be loaded`
        );
        this.setAttribute("src", this.__initSrc);
      }
    }
  }

  static get observedAttributes() {
    return ["src"];
  }
}

class LM extends LoadModule {
  constructor(...args) {
    super(...args);
  }
}

customElements.define("load-module", LoadModule);
customElements.define("l-m", LM);
