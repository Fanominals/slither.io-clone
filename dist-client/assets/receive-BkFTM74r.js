import{i as b,r as y,j as C,a as v,x as c,A as p,h as u,S as m,u as h,T as k,f as $,W as R,R as A,d as I}from"./index-CbAbe3F4.js";import{n as x,c as N,U as T,o as S,r as f}from"./if-defined-kwG2YDzm.js";import"./index-Dfe0DKt8.js";import"./index-MPoemy6E.js";import"./index-CyMtzEZR.js";import"./index-D5qoL1H6.js";import"./index-D_sE5vDe.js";const O=b`
  button {
    display: flex;
    gap: var(--wui-spacing-xl);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    padding: var(--wui-spacing-m) var(--wui-spacing-s);
  }

  wui-text {
    width: 100%;
  }

  wui-flex {
    width: auto;
  }

  .network-icon {
    width: var(--wui-spacing-2l);
    height: var(--wui-spacing-2l);
    border-radius: calc(var(--wui-spacing-2l) / 2);
    overflow: hidden;
    box-shadow:
      0 0 0 3px var(--wui-color-gray-glass-002),
      0 0 0 3px var(--wui-color-modal-bg);
  }
`;var g=function(n,e,r,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,r):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(n,e,r,i);else for(var a=n.length-1;a>=0;a--)(s=n[a])&&(t=(o<3?s(t):o>3?s(e,r,t):s(e,r))||t);return o>3&&t&&Object.defineProperty(e,r,t),t};let w=class extends v{constructor(){super(...arguments),this.networkImages=[""],this.text=""}render(){return c`
      <button>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
        <wui-flex gap="3xs" alignItems="center">
          ${this.networksTemplate()}
          <wui-icon name="chevronRight" size="sm" color="fg-200"></wui-icon>
        </wui-flex>
      </button>
    `}networksTemplate(){const e=this.networkImages.slice(0,5);return c` <wui-flex class="networks">
      ${e?.map(r=>c` <wui-flex class="network-icon"> <wui-image src=${r}></wui-image> </wui-flex>`)}
    </wui-flex>`}};w.styles=[y,C,O];g([x({type:Array})],w.prototype,"networkImages",void 0);g([x()],w.prototype,"text",void 0);w=g([N("wui-compatible-network")],w);const _=b`
  wui-compatible-network {
    margin-top: var(--wui-spacing-l);
  }
`;var d=function(n,e,r,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,r):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(n,e,r,i);else for(var a=n.length-1;a>=0;a--)(s=n[a])&&(t=(o<3?s(t):o>3?s(e,r,t):s(e,r))||t);return o>3&&t&&Object.defineProperty(e,r,t),t};let l=class extends v{constructor(){super(),this.unsubscribe=[],this.address=p.state.address,this.profileName=p.state.profileName,this.network=u.state.activeCaipNetwork,this.unsubscribe.push(p.subscribe(e=>{e.address?(this.address=e.address,this.profileName=e.profileName):m.showError("Account not found")}),u.subscribeKey("activeCaipNetwork",e=>{e?.id&&(this.network=e)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!this.address)throw new Error("w3m-wallet-receive-view: No account provided");const e=h.getNetworkImage(this.network);return c` <wui-flex
      flexDirection="column"
      .padding=${["0","l","l","l"]}
      alignItems="center"
    >
      <wui-chip-button
        data-testid="receive-address-copy-button"
        @click=${this.onCopyClick.bind(this)}
        text=${T.getTruncateString({string:this.profileName||this.address||"",charsStart:this.profileName?18:4,charsEnd:this.profileName?0:4,truncate:this.profileName?"end":"middle"})}
        icon="copy"
        size="sm"
        imageSrc=${e||""}
        variant="gray"
      ></wui-chip-button>
      <wui-flex
        flexDirection="column"
        .padding=${["l","0","0","0"]}
        alignItems="center"
        gap="s"
      >
        <wui-qr-code
          size=${232}
          theme=${k.state.themeMode}
          uri=${this.address}
          ?arenaClear=${!0}
          color=${S(k.state.themeVariables["--w3m-qr-color"])}
          data-testid="wui-qr-code"
        ></wui-qr-code>
        <wui-text variant="paragraph-500" color="fg-100" align="center">
          Copy your address or scan this QR code
        </wui-text>
      </wui-flex>
      ${this.networkTemplate()}
    </wui-flex>`}networkTemplate(){const e=u.getAllRequestedCaipNetworks(),r=u.checkIfSmartAccountEnabled(),i=u.state.activeCaipNetwork,o=e.filter(a=>a?.chainNamespace===i?.chainNamespace);if($(i?.chainNamespace)===R.ACCOUNT_TYPES.SMART_ACCOUNT&&r)return i?c`<wui-compatible-network
        @click=${this.onReceiveClick.bind(this)}
        text="Only receive assets on this network"
        .networkImages=${[h.getNetworkImage(i)??""]}
      ></wui-compatible-network>`:null;const s=(o?.filter(a=>a?.assets?.imageId)?.slice(0,5)).map(h.getNetworkImage).filter(Boolean);return c`<wui-compatible-network
      @click=${this.onReceiveClick.bind(this)}
      text="Only receive assets on these networks"
      .networkImages=${s}
    ></wui-compatible-network>`}onReceiveClick(){A.push("WalletCompatibleNetworks")}onCopyClick(){try{this.address&&(I.copyToClopboard(this.address),m.showSuccess("Address copied"))}catch{m.showError("Failed to copy")}}};l.styles=_;d([f()],l.prototype,"address",void 0);d([f()],l.prototype,"profileName",void 0);d([f()],l.prototype,"network",void 0);l=d([N("w3m-wallet-receive-view")],l);export{l as W3mWalletReceiveView};
