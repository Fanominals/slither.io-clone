import{i as x,r as I,j as N,a as w,x as l,h as d,O as v,I as We,u as S,A as C,d as b,M as P,e as k,q as re,C as m,c as $,R as f,b as V,S as W,f as xe,W as se,l as g,t as hn,p as Ai,L as _e,Q as Ee,U as Q,P as wn,V as fn,X as A,Y as je,n as mn,o as bn,m as gn,T as Xt,Z as vn,_ as xn,$ as Ii}from"./index-CbAbe3F4.js";import{n as c,c as h,o as p,U as F,r as u,e as Qt}from"./if-defined-kwG2YDzm.js";import"./index-MPoemy6E.js";import"./index-DDr5qZGp.js";import"./index-BrsNkGad.js";import"./index-BXkptxUt.js";import{W as ur}from"./index-DbMQpGX1.js";import"./index-CHtQ1Gkz.js";import"./index-BIFFUsyn.js";import"./index-BVfNOmew.js";import"./index-CpTut_Mg.js";import{n as yn}from"./index-DHpdlNL0.js";import"./index-CZi_lVha.js";import"./index-DqftWg1Y.js";import{M as mt}from"./index-DEBBuWrY.js";import"./index-BAFvBQJb.js";import"./index-BhiSlUFg.js";import{e as di,n as pi}from"./ref-Nua0ym4G.js";import"./index-D1NJaBtG.js";import"./index-DMyGazCI.js";import"./index-BfE7AneJ.js";import{O as bt}from"./index-CGq9_go9.js";import{e as Cn}from"./index-DFDOu6TU.js";import{N as $n}from"./index-N8Wd5HpY.js";import"./index-6F3tGgom.js";import"./index-Dfe0DKt8.js";import"./index-CyMtzEZR.js";import"./index-Cy-MNjpk.js";import"./index-D5qoL1H6.js";import"./ConstantsUtil-Dmg8YACJ.js";import"./index-D_sE5vDe.js";const Sn=x`
  :host {
    display: block;
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
    background: var(--wui-color-gray-glass-002);
    display: flex;
    gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-3xs) var(--wui-spacing-xs) var(--wui-spacing-3xs)
      var(--wui-spacing-xs);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  button:disabled {
    background: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-image,
  button:disabled > wui-flex > wui-avatar {
    filter: grayscale(1);
  }

  button:has(wui-image) {
    padding: var(--wui-spacing-3xs) var(--wui-spacing-3xs) var(--wui-spacing-3xs)
      var(--wui-spacing-xs);
  }

  wui-text {
    color: var(--wui-color-fg-100);
  }

  wui-flex > wui-text {
    color: var(--wui-color-fg-200);
  }

  wui-image,
  wui-icon-box {
    border-radius: var(--wui-border-radius-3xl);
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  wui-flex {
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-005);
    background: var(--wui-color-gray-glass-005);
    padding: 4px var(--wui-spacing-m) 4px var(--wui-spacing-xxs);
  }

  button.local-no-balance {
    border-radius: 0px;
    border: none;
    background: transparent;
  }

  wui-avatar {
    width: 20px;
    height: 20px;
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-010);
  }

  @media (max-width: 500px) {
    button {
      gap: 0px;
      padding: var(--wui-spacing-3xs) var(--wui-spacing-xs) !important;
      height: 32px;
    }
    wui-image,
    wui-icon-box,
    button > wui-text {
      visibility: hidden;
      width: 0px;
      height: 0px;
    }
    button {
      border-radius: 0px;
      border: none;
      background: transparent;
      padding: 0px;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled > wui-flex > wui-text {
      color: var(--wui-color-fg-175);
    }

    button:active:enabled > wui-flex > wui-text {
      color: var(--wui-color-fg-175);
    }
  }
`;var ce=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Z=class extends w{constructor(){super(...arguments),this.networkSrc=void 0,this.avatarSrc=void 0,this.balance=void 0,this.isUnsupportedChain=void 0,this.disabled=!1,this.loading=!1,this.address="",this.profileName="",this.charsStart=4,this.charsEnd=6}render(){return l`
      <button
        ?disabled=${this.disabled}
        class=${p(this.balance?void 0:"local-no-balance")}
      >
        ${this.balanceTemplate()}
        <wui-flex gap="xxs" alignItems="center">
          <wui-avatar
            .imageSrc=${this.avatarSrc}
            alt=${this.address}
            address=${this.address}
          ></wui-avatar>
          <wui-text variant="paragraph-600" color="inherit">
            ${this.address?F.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?18:this.charsStart,charsEnd:this.profileName?0:this.charsEnd,truncate:this.profileName?"end":"middle"}):null}
          </wui-text>
        </wui-flex>
      </button>
    `}balanceTemplate(){if(this.isUnsupportedChain)return l` <wui-icon-box
          size="sm"
          iconColor="error-100"
          backgroundColor="error-100"
          icon="warningCircle"
          data-testid="wui-account-button-unsupported-chain"
        ></wui-icon-box>
        <wui-text variant="paragraph-600" color="inherit"> Switch Network</wui-text>`;if(this.balance){const e=this.networkSrc?l`<wui-image src=${this.networkSrc}></wui-image>`:l`
            <wui-icon-box
              size="sm"
              iconColor="fg-200"
              backgroundColor="fg-300"
              icon="networkPlaceholder"
            ></wui-icon-box>
          `,i=this.loading?l`<wui-loading-spinner size="md" color="fg-200"></wui-loading-spinner>`:l`<wui-text variant="paragraph-600" color="inherit"> ${this.balance}</wui-text>`;return l`${e} ${i}`}return null}};Z.styles=[I,N,Sn];ce([c()],Z.prototype,"networkSrc",void 0);ce([c()],Z.prototype,"avatarSrc",void 0);ce([c()],Z.prototype,"balance",void 0);ce([c({type:Boolean})],Z.prototype,"isUnsupportedChain",void 0);ce([c({type:Boolean})],Z.prototype,"disabled",void 0);ce([c({type:Boolean})],Z.prototype,"loading",void 0);ce([c()],Z.prototype,"address",void 0);ce([c()],Z.prototype,"profileName",void 0);ce([c()],Z.prototype,"charsStart",void 0);ce([c()],Z.prototype,"charsEnd",void 0);Z=ce([h("wui-account-button")],Z);var U=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};class z extends w{constructor(){super(...arguments),this.unsubscribe=[],this.disabled=!1,this.balance="show",this.charsStart=4,this.charsEnd=6,this.namespace=void 0,this.isSupported=v.state.allowUnsupportedChain?!0:d.state.activeChain?d.checkIfSupportedNetwork(d.state.activeChain):!0}connectedCallback(){super.connectedCallback(),this.setAccountData(d.getAccountData(this.namespace)),this.setNetworkData(d.getNetworkData(this.namespace))}firstUpdated(){const e=this.namespace;e?this.unsubscribe.push(d.subscribeChainProp("accountState",i=>{this.setAccountData(i)},e),d.subscribeChainProp("networkState",i=>{this.setNetworkData(i),this.isSupported=d.checkIfSupportedNetwork(e,i?.caipNetwork)},e)):this.unsubscribe.push(We.subscribeNetworkImages(()=>{this.networkImage=S.getNetworkImage(this.network)}),d.subscribeKey("activeCaipAddress",i=>{this.caipAddress=i}),C.subscribeKey("balance",i=>this.balanceVal=i),C.subscribeKey("balanceSymbol",i=>this.balanceSymbol=i),C.subscribeKey("profileName",i=>this.profileName=i),C.subscribeKey("profileImage",i=>this.profileImage=i),d.subscribeKey("activeCaipNetwork",i=>{this.network=i,this.networkImage=S.getNetworkImage(i),this.isSupported=i?.chainNamespace?d.checkIfSupportedNetwork(i?.chainNamespace):!0,this.fetchNetworkImage(i)}))}updated(){this.fetchNetworkImage(this.network)}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!d.state.activeChain)return null;const e=this.balance==="show",i=typeof this.balanceVal!="string";return l`
      <wui-account-button
        .disabled=${!!this.disabled}
        .isUnsupportedChain=${v.state.allowUnsupportedChain?!1:!this.isSupported}
        address=${p(b.getPlainAddress(this.caipAddress))}
        profileName=${p(this.profileName)}
        networkSrc=${p(this.networkImage)}
        avatarSrc=${p(this.profileImage)}
        balance=${e?b.formatBalance(this.balanceVal,this.balanceSymbol):""}
        @click=${this.onClick.bind(this)}
        data-testid=${`account-button${this.namespace?`-${this.namespace}`:""}`}
        .charsStart=${this.charsStart}
        .charsEnd=${this.charsEnd}
        ?loading=${i}
      >
      </wui-account-button>
    `}onClick(){this.isSupported||v.state.allowUnsupportedChain?P.open({namespace:this.namespace}):P.open({view:"UnsupportedChain"})}async fetchNetworkImage(e){e?.assets?.imageId&&(this.networkImage=await S.fetchNetworkImage(e?.assets?.imageId))}setAccountData(e){e&&(this.caipAddress=e.caipAddress,this.balanceVal=e.balance,this.balanceSymbol=e.balanceSymbol,this.profileName=e.profileName,this.profileImage=e.profileImage)}setNetworkData(e){e&&(this.network=e.caipNetwork,this.networkImage=S.getNetworkImage(e.caipNetwork))}}U([c({type:Boolean})],z.prototype,"disabled",void 0);U([c()],z.prototype,"balance",void 0);U([c()],z.prototype,"charsStart",void 0);U([c()],z.prototype,"charsEnd",void 0);U([c()],z.prototype,"namespace",void 0);U([u()],z.prototype,"caipAddress",void 0);U([u()],z.prototype,"balanceVal",void 0);U([u()],z.prototype,"balanceSymbol",void 0);U([u()],z.prototype,"profileName",void 0);U([u()],z.prototype,"profileImage",void 0);U([u()],z.prototype,"network",void 0);U([u()],z.prototype,"networkImage",void 0);U([u()],z.prototype,"isSupported",void 0);let Ei=class extends z{};Ei=U([h("w3m-account-button")],Ei);let Wi=class extends z{};Wi=U([h("appkit-account-button")],Wi);const kn=x`
  :host {
    display: block;
    width: max-content;
  }
`;var ue=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};class ie extends w{constructor(){super(...arguments),this.unsubscribe=[],this.disabled=!1,this.balance=void 0,this.size=void 0,this.label=void 0,this.loadingLabel=void 0,this.charsStart=4,this.charsEnd=6,this.namespace=void 0}connectedCallback(){super.connectedCallback(),this.caipAddress=this.namespace?d.state.chains.get(this.namespace)?.accountState?.caipAddress:d.state.activeCaipAddress}firstUpdated(){this.namespace?this.unsubscribe.push(d.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress},this.namespace)):this.unsubscribe.push(d.subscribeKey("activeCaipAddress",e=>this.caipAddress=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return this.caipAddress?l`
          <appkit-account-button
            .disabled=${!!this.disabled}
            balance=${p(this.balance)}
            .charsStart=${p(this.charsStart)}
            .charsEnd=${p(this.charsEnd)}
            namespace=${p(this.namespace)}
          >
          </appkit-account-button>
        `:l`
          <appkit-connect-button
            size=${p(this.size)}
            label=${p(this.label)}
            loadingLabel=${p(this.loadingLabel)}
            namespace=${p(this.namespace)}
          ></appkit-connect-button>
        `}}ie.styles=kn;ue([c({type:Boolean})],ie.prototype,"disabled",void 0);ue([c()],ie.prototype,"balance",void 0);ue([c()],ie.prototype,"size",void 0);ue([c()],ie.prototype,"label",void 0);ue([c()],ie.prototype,"loadingLabel",void 0);ue([c()],ie.prototype,"charsStart",void 0);ue([c()],ie.prototype,"charsEnd",void 0);ue([c()],ie.prototype,"namespace",void 0);ue([u()],ie.prototype,"caipAddress",void 0);let _i=class extends ie{};_i=ue([h("w3m-button")],_i);let Ti=class extends ie{};Ti=ue([h("appkit-button")],Ti);const An=x`
  :host {
    position: relative;
    display: block;
  }

  button {
    background: var(--wui-color-accent-100);
    border: 1px solid var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-m);
    gap: var(--wui-spacing-xs);
  }

  button.loading {
    background: var(--wui-color-gray-glass-010);
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    border: 1px solid var(--wui-color-gray-glass-010);
  }

  button:disabled > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button:active:enabled {
      background-color: var(--wui-color-accent-080);
    }
  }

  button:focus-visible {
    border: 1px solid var(--wui-color-gray-glass-010);
    background-color: var(--wui-color-accent-090);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  button[data-size='sm'] {
    padding: 6.75px 10px 7.25px;
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
    color: var(--wui-color-inverse-100);
  }

  button[data-size='md'] {
    padding: 9px var(--wui-spacing-l) 9px var(--wui-spacing-l);
  }

  button[data-size='md'] + wui-text {
    padding-left: var(--wui-spacing-3xs);
  }

  @media (max-width: 500px) {
    button[data-size='md'] {
      height: 32px;
      padding: 5px 12px;
    }

    button[data-size='md'] > wui-text > slot {
      font-size: 14px !important;
    }
  }

  wui-loading-spinner {
    width: 14px;
    height: 14px;
  }

  wui-loading-spinner::slotted(svg) {
    width: 10px !important;
    height: 10px !important;
  }

  button[data-size='sm'] > wui-loading-spinner {
    width: 12px;
    height: 12px;
  }
`;var hi=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Je=class extends w{constructor(){super(...arguments),this.size="md",this.loading=!1}render(){const e=this.size==="md"?"paragraph-600":"small-600";return l`
      <button data-size=${this.size} ?disabled=${this.loading}>
        ${this.loadingTemplate()}
        <wui-text variant=${e} color=${this.loading?"accent-100":"inherit"}>
          <slot></slot>
        </wui-text>
      </button>
    `}loadingTemplate(){return this.loading?l`<wui-loading-spinner size=${this.size} color="accent-100"></wui-loading-spinner>`:null}};Je.styles=[I,N,An];hi([c()],Je.prototype,"size",void 0);hi([c({type:Boolean})],Je.prototype,"loading",void 0);Je=hi([h("wui-connect-button")],Je);var Se=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};class ke extends w{constructor(){super(),this.unsubscribe=[],this.size="md",this.label="Connect Wallet",this.loadingLabel="Connecting...",this.open=P.state.open,this.loading=this.namespace?P.state.loadingNamespaceMap.get(this.namespace):P.state.loading,this.unsubscribe.push(P.subscribe(e=>{this.open=e.open,this.loading=this.namespace?e.loadingNamespaceMap.get(this.namespace):e.loading}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return l`
      <wui-connect-button
        size=${p(this.size)}
        .loading=${this.loading}
        @click=${this.onClick.bind(this)}
        data-testid=${`connect-button${this.namespace?`-${this.namespace}`:""}`}
      >
        ${this.loading?this.loadingLabel:this.label}
      </wui-connect-button>
    `}onClick(){this.open?P.close():this.loading||P.open({view:"Connect",namespace:this.namespace})}}Se([c()],ke.prototype,"size",void 0);Se([c()],ke.prototype,"label",void 0);Se([c()],ke.prototype,"loadingLabel",void 0);Se([c()],ke.prototype,"namespace",void 0);Se([u()],ke.prototype,"open",void 0);Se([u()],ke.prototype,"loading",void 0);let Ni=class extends ke{};Ni=Se([h("w3m-connect-button")],Ni);let Ri=class extends ke{};Ri=Se([h("appkit-connect-button")],Ri);const In=x`
  :host {
    display: block;
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
    display: flex;
    gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-2xs) var(--wui-spacing-s) var(--wui-spacing-2xs)
      var(--wui-spacing-xs);
    border: 1px solid var(--wui-color-gray-glass-010);
    background-color: var(--wui-color-gray-glass-005);
    color: var(--wui-color-fg-100);
  }

  button:disabled {
    border: 1px solid var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-gray-glass-010);
    }

    button:active:enabled {
      background-color: var(--wui-color-gray-glass-015);
    }
  }

  wui-image,
  wui-icon-box {
    border-radius: var(--wui-border-radius-3xl);
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }
`;var Ot=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Le=class extends w{constructor(){super(...arguments),this.imageSrc=void 0,this.isUnsupportedChain=void 0,this.disabled=!1}render(){return l`
      <button data-testid="wui-network-button" ?disabled=${this.disabled}>
        ${this.visualTemplate()}
        <wui-text variant="paragraph-600" color="inherit">
          <slot></slot>
        </wui-text>
      </button>
    `}visualTemplate(){return this.isUnsupportedChain?l`
        <wui-icon-box
          size="sm"
          iconColor="error-100"
          backgroundColor="error-100"
          icon="warningCircle"
        ></wui-icon-box>
      `:this.imageSrc?l`<wui-image src=${this.imageSrc}></wui-image>`:l`
      <wui-icon-box
        size="sm"
        iconColor="inverse-100"
        backgroundColor="fg-100"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `}};Le.styles=[I,N,In];Ot([c()],Le.prototype,"imageSrc",void 0);Ot([c({type:Boolean})],Le.prototype,"isUnsupportedChain",void 0);Ot([c({type:Boolean})],Le.prototype,"disabled",void 0);Le=Ot([h("wui-network-button")],Le);const En=x`
  :host {
    display: block;
    width: max-content;
  }
`;var ve=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};class fe extends w{constructor(){super(),this.unsubscribe=[],this.disabled=!1,this.network=d.state.activeCaipNetwork,this.networkImage=S.getNetworkImage(this.network),this.caipAddress=d.state.activeCaipAddress,this.loading=P.state.loading,this.isSupported=v.state.allowUnsupportedChain?!0:d.state.activeChain?d.checkIfSupportedNetwork(d.state.activeChain):!0,this.unsubscribe.push(We.subscribeNetworkImages(()=>{this.networkImage=S.getNetworkImage(this.network)}),d.subscribeKey("activeCaipAddress",e=>{this.caipAddress=e}),d.subscribeKey("activeCaipNetwork",e=>{this.network=e,this.networkImage=S.getNetworkImage(e),this.isSupported=e?.chainNamespace?d.checkIfSupportedNetwork(e.chainNamespace):!0,S.fetchNetworkImage(e?.assets?.imageId)}),P.subscribeKey("loading",e=>this.loading=e))}firstUpdated(){S.fetchNetworkImage(this.network?.assets?.imageId)}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.network?d.checkIfSupportedNetwork(this.network.chainNamespace):!0;return l`
      <wui-network-button
        .disabled=${!!(this.disabled||this.loading)}
        .isUnsupportedChain=${v.state.allowUnsupportedChain?!1:!e}
        imageSrc=${p(this.networkImage)}
        @click=${this.onClick.bind(this)}
        data-testid="w3m-network-button"
      >
        ${this.getLabel()}
        <slot></slot>
      </wui-network-button>
    `}getLabel(){return this.network?!this.isSupported&&!v.state.allowUnsupportedChain?"Switch Network":this.network.name:this.label?this.label:this.caipAddress?"Unknown Network":"Select Network"}onClick(){this.loading||(k.sendEvent({type:"track",event:"CLICK_NETWORKS"}),P.open({view:"Networks"}))}}fe.styles=En;ve([c({type:Boolean})],fe.prototype,"disabled",void 0);ve([c({type:String})],fe.prototype,"label",void 0);ve([u()],fe.prototype,"network",void 0);ve([u()],fe.prototype,"networkImage",void 0);ve([u()],fe.prototype,"caipAddress",void 0);ve([u()],fe.prototype,"loading",void 0);ve([u()],fe.prototype,"isSupported",void 0);let Oi=class extends fe{};Oi=ve([h("w3m-network-button")],Oi);let Pi=class extends fe{};Pi=ve([h("appkit-network-button")],Pi);const Wn=x`
  :host {
    display: block;
  }

  button {
    width: 100%;
    display: block;
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    padding-left: var(--wui-spacing-s);
    padding-right: var(--wui-spacing-2l);
    border-radius: var(--wui-border-radius-s);
    background-color: var(--wui-color-accent-glass-010);
  }

  button:hover {
    background-color: var(--wui-color-accent-glass-015) !important;
  }

  button:active {
    background-color: var(--wui-color-accent-glass-020) !important;
  }
`;var Pt=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Be=class extends w{constructor(){super(...arguments),this.label="",this.description="",this.icon="wallet"}render(){return l`
      <button>
        <wui-flex gap="m" alignItems="center" justifyContent="space-between">
          <wui-icon-box
            size="lg"
            iconcolor="accent-100"
            backgroundcolor="accent-100"
            icon=${this.icon}
            background="transparent"
          ></wui-icon-box>

          <wui-flex flexDirection="column" gap="3xs">
            <wui-text variant="paragraph-500" color="fg-100">${this.label}</wui-text>
            <wui-text variant="small-400" color="fg-200">${this.description}</wui-text>
          </wui-flex>

          <wui-icon size="md" color="fg-200" name="chevronRight"></wui-icon>
        </wui-flex>
      </button>
    `}};Be.styles=[I,N,Wn];Pt([c()],Be.prototype,"label",void 0);Pt([c()],Be.prototype,"description",void 0);Pt([c()],Be.prototype,"icon",void 0);Be=Pt([h("wui-notice-card")],Be);var qi=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Zt=class extends w{constructor(){super(),this.unsubscribe=[],this.socialProvider=re.getConnectedSocialProvider(),this.socialUsername=re.getConnectedSocialUsername(),this.namespace=d.state.activeChain,this.unsubscribe.push(d.subscribeKey("activeChain",e=>{this.namespace=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=m.getConnectorId(this.namespace),i=m.getAuthConnector();if(!i||e!==$.CONNECTOR_ID.AUTH)return this.style.cssText="display: none",null;const n=i.provider.getEmail()??"";return!n&&!this.socialUsername?(this.style.cssText="display: none",null):l`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon=${this.socialProvider??"mail"}
        iconSize=${this.socialProvider?"xxl":"sm"}
        data-testid="w3m-account-email-update"
        ?chevron=${!this.socialProvider}
        @click=${()=>{this.onGoToUpdateEmail(n,this.socialProvider)}}
      >
        <wui-text variant="paragraph-500" color="fg-100">${this.getAuthName(n)}</wui-text>
      </wui-list-item>
    `}onGoToUpdateEmail(e,i){i||f.push("UpdateEmailWallet",{email:e,redirectView:"Account"})}getAuthName(e){return this.socialUsername?this.socialProvider==="discord"&&this.socialUsername.endsWith("0")?this.socialUsername.slice(0,-1):this.socialUsername:e.length>30?`${e.slice(0,-3)}...`:e}};qi([u()],Zt.prototype,"namespace",void 0);Zt=qi([h("w3m-account-auth-button")],Zt);var me=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let le=class extends w{constructor(){super(),this.usubscribe=[],this.networkImages=We.state.networkImages,this.address=C.state.address,this.profileImage=C.state.profileImage,this.profileName=C.state.profileName,this.network=d.state.activeCaipNetwork,this.disconnecting=!1,this.loading=!1,this.switched=!1,this.text="",this.remoteFeatures=v.state.remoteFeatures,this.usubscribe.push(C.subscribe(e=>{e.address&&(this.address=e.address,this.profileImage=e.profileImage,this.profileName=e.profileName)}),d.subscribeKey("activeCaipNetwork",e=>{e?.id&&(this.network=e)}),v.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e}))}disconnectedCallback(){this.usubscribe.forEach(e=>e())}render(){if(!this.address)throw new Error("w3m-account-settings-view: No account provided");const e=this.networkImages[this.network?.assets?.imageId??""];return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="l"
        .padding=${["0","xl","m","xl"]}
      >
        <wui-avatar
          alt=${this.address}
          address=${this.address}
          imageSrc=${p(this.profileImage)}
          size="2lg"
        ></wui-avatar>
        <wui-flex flexDirection="column" alignItems="center">
          <wui-flex gap="3xs" alignItems="center" justifyContent="center">
            <wui-text variant="title-6-600" color="fg-100" data-testid="account-settings-address">
              ${F.getTruncateString({string:this.address,charsStart:4,charsEnd:6,truncate:"middle"})}
            </wui-text>
            <wui-icon-link
              size="md"
              icon="copy"
              iconColor="fg-200"
              @click=${this.onCopyAddress}
            ></wui-icon-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
      <wui-flex flexDirection="column" gap="m">
        <wui-flex flexDirection="column" gap="xs" .padding=${["0","l","m","l"]}>
          ${this.authCardTemplate()}
          <w3m-account-auth-button></w3m-account-auth-button>
          <wui-list-item
            .variant=${e?"image":"icon"}
            iconVariant="overlay"
            icon="networkPlaceholder"
            imageSrc=${p(e)}
            ?chevron=${this.isAllowedNetworkSwitch()}
            @click=${this.onNetworks.bind(this)}
            data-testid="account-switch-network-button"
          >
            <wui-text variant="paragraph-500" color="fg-100">
              ${this.network?.name??"Unknown"}
            </wui-text>
          </wui-list-item>
          ${this.togglePreferredAccountBtnTemplate()} ${this.chooseNameButtonTemplate()}
          <wui-list-item
            variant="icon"
            iconVariant="overlay"
            icon="disconnect"
            ?chevron=${!1}
            .loading=${this.disconnecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `}chooseNameButtonTemplate(){const e=this.network?.chainNamespace,i=m.getConnectorId(e),n=m.getAuthConnector();return!d.checkIfNamesSupported()||!n||i!==$.CONNECTOR_ID.AUTH||this.profileName?null:l`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="id"
        iconSize="sm"
        ?chevron=${!0}
        @click=${this.onChooseName.bind(this)}
        data-testid="account-choose-name-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Choose account name </wui-text>
      </wui-list-item>
    `}authCardTemplate(){const e=m.getConnectorId(this.network?.chainNamespace),i=m.getAuthConnector(),{origin:n}=location;return!i||e!==$.CONNECTOR_ID.AUTH||n.includes(V.SECURE_SITE)?null:l`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `}isAllowedNetworkSwitch(){const e=d.getAllRequestedCaipNetworks(),i=e?e.length>1:!1,n=e?.find(({id:o})=>o===this.network?.id);return i||!n}onCopyAddress(){try{this.address&&(b.copyToClopboard(this.address),W.showSuccess("Address copied"))}catch{W.showError("Failed to copy")}}togglePreferredAccountBtnTemplate(){const e=this.network?.chainNamespace,i=d.checkIfSmartAccountEnabled(),n=m.getConnectorId(e);return!m.getAuthConnector()||n!==$.CONNECTOR_ID.AUTH||!i?null:(this.switched||(this.text=xe(e)===se.ACCOUNT_TYPES.SMART_ACCOUNT?"Switch to your EOA":"Switch to your Smart Account"),l`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="swapHorizontalBold"
        iconSize="sm"
        ?chevron=${!0}
        ?loading=${this.loading}
        @click=${this.changePreferredAccountType.bind(this)}
        data-testid="account-toggle-preferred-account-type"
      >
        <wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text>
      </wui-list-item>
    `)}onChooseName(){f.push("ChooseAccountName")}async changePreferredAccountType(){const e=this.network?.chainNamespace,i=d.checkIfSmartAccountEnabled(),n=xe(e)===se.ACCOUNT_TYPES.SMART_ACCOUNT||!i?se.ACCOUNT_TYPES.EOA:se.ACCOUNT_TYPES.SMART_ACCOUNT;m.getAuthConnector()&&(this.loading=!0,await g.setPreferredAccountType(n,e),this.text=n===se.ACCOUNT_TYPES.SMART_ACCOUNT?"Switch to your EOA":"Switch to your Smart Account",this.switched=!0,hn.resetSend(),this.loading=!1,this.requestUpdate())}onNetworks(){this.isAllowedNetworkSwitch()&&f.push("Networks")}async onDisconnect(){try{this.disconnecting=!0;const e=this.network?.chainNamespace,n=g.getConnections(e).length>0,o=e&&m.state.activeConnectorIds[e],t=this.remoteFeatures?.multiWallet;await g.disconnect(t?{id:o,namespace:e}:{}),n&&t&&(f.push("ProfileWallets"),W.showSuccess("Wallet deleted"))}catch{k.sendEvent({type:"track",event:"DISCONNECT_ERROR"}),W.showError("Failed to disconnect")}finally{this.disconnecting=!1}}onGoToUpgradeView(){k.sendEvent({type:"track",event:"EMAIL_UPGRADE_FROM_MODAL"}),f.push("UpgradeEmailWallet")}};me([u()],le.prototype,"address",void 0);me([u()],le.prototype,"profileImage",void 0);me([u()],le.prototype,"profileName",void 0);me([u()],le.prototype,"network",void 0);me([u()],le.prototype,"disconnecting",void 0);me([u()],le.prototype,"loading",void 0);me([u()],le.prototype,"switched",void 0);me([u()],le.prototype,"text",void 0);me([u()],le.prototype,"remoteFeatures",void 0);le=me([h("w3m-account-settings-view")],le);const _n=x`
  :host {
    display: inline-flex;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    padding: var(--wui-spacing-3xs);
    position: relative;
    height: 36px;
    min-height: 36px;
    overflow: hidden;
  }

  :host::before {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 4px;
    left: 4px;
    display: block;
    width: var(--local-tab-width);
    height: 28px;
    border-radius: var(--wui-border-radius-3xl);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transform: translateX(calc(var(--local-tab) * var(--local-tab-width)));
    transition: transform var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  :host([data-type='flex'])::before {
    left: 3px;
    transform: translateX(calc((var(--local-tab) * 34px) + (var(--local-tab) * 4px)));
  }

  :host([data-type='flex']) {
    display: flex;
    padding: 0px 0px 0px 12px;
    gap: 4px;
  }

  :host([data-type='flex']) > button > wui-text {
    position: absolute;
    left: 18px;
    opacity: 0;
  }

  button[data-active='true'] > wui-icon,
  button[data-active='true'] > wui-text {
    color: var(--wui-color-fg-100);
  }

  button[data-active='false'] > wui-icon,
  button[data-active='false'] > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='true']:disabled,
  button[data-active='false']:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  button[data-active='true']:disabled > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='false']:disabled > wui-text {
    color: var(--wui-color-fg-300);
  }

  button > wui-icon,
  button > wui-text {
    pointer-events: none;
    transition: color var(--wui-e ase-out-power-1) var(--wui-duration-md);
    will-change: color;
  }

  button {
    width: var(--local-tab-width);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  :host([data-type='flex']) > button {
    width: 34px;
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  button:hover:enabled,
  button:active:enabled {
    background-color: transparent !important;
  }

  button:hover:enabled > wui-icon,
  button:active:enabled > wui-icon {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button:hover:enabled > wui-text,
  button:active:enabled > wui-text {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
  }
`;var Ae=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let he=class extends w{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.buttons=[],this.disabled=!1,this.localTabWidth="100px",this.activeTab=0,this.isDense=!1}render(){return this.isDense=this.tabs.length>3,this.style.cssText=`
      --local-tab: ${this.activeTab};
      --local-tab-width: ${this.localTabWidth};
    `,this.dataset.type=this.isDense?"flex":"block",this.tabs.map((e,i)=>{const n=i===this.activeTab;return l`
        <button
          ?disabled=${this.disabled}
          @click=${()=>this.onTabClick(i)}
          data-active=${n}
          data-testid="tab-${e.label?.toLowerCase()}"
        >
          ${this.iconTemplate(e)}
          <wui-text variant="small-600" color="inherit"> ${e.label} </wui-text>
        </button>
      `})}firstUpdated(){this.shadowRoot&&this.isDense&&(this.buttons=[...this.shadowRoot.querySelectorAll("button")],setTimeout(()=>{this.animateTabs(0,!0)},0))}iconTemplate(e){return e.icon?l`<wui-icon size="xs" color="inherit" name=${e.icon}></wui-icon>`:null}onTabClick(e){this.buttons&&this.animateTabs(e,!1),this.activeTab=e,this.onTabChange(e)}animateTabs(e,i){const n=this.buttons[this.activeTab],o=this.buttons[e],t=n?.querySelector("wui-text"),a=o?.querySelector("wui-text"),r=o?.getBoundingClientRect(),y=a?.getBoundingClientRect();n&&t&&!i&&e!==this.activeTab&&(t.animate([{opacity:0}],{duration:50,easing:"ease",fill:"forwards"}),n.animate([{width:"34px"}],{duration:500,easing:"ease",fill:"forwards"})),o&&r&&y&&a&&(e!==this.activeTab||i)&&(this.localTabWidth=`${Math.round(r.width+y.width)+6}px`,o.animate([{width:`${r.width+y.width}px`}],{duration:i?0:500,fill:"forwards",easing:"ease"}),a.animate([{opacity:1}],{duration:i?0:125,delay:i?0:200,fill:"forwards",easing:"ease"}))}};he.styles=[I,N,_n];Ae([c({type:Array})],he.prototype,"tabs",void 0);Ae([c()],he.prototype,"onTabChange",void 0);Ae([c({type:Array})],he.prototype,"buttons",void 0);Ae([c({type:Boolean})],he.prototype,"disabled",void 0);Ae([c()],he.prototype,"localTabWidth",void 0);Ae([u()],he.prototype,"activeTab",void 0);Ae([u()],he.prototype,"isDense",void 0);he=Ae([h("wui-tabs")],he);const Tn=x`
  button {
    display: flex;
    align-items: center;
    padding: var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-xxs);
    column-gap: var(--wui-spacing-xs);
  }

  wui-image,
  .icon-box {
    width: var(--wui-spacing-xxl);
    height: var(--wui-spacing-xxl);
    border-radius: var(--wui-border-radius-3xs);
  }

  wui-text {
    flex: 1;
  }

  .icon-box {
    position: relative;
  }

  .icon-box[data-active='true'] {
    background-color: var(--wui-color-gray-glass-005);
  }

  .circle {
    position: absolute;
    left: 16px;
    top: 15px;
    width: var(--wui-spacing-1xs);
    height: var(--wui-spacing-1xs);
    background-color: var(--wui-color-success-100);
    border: 2px solid var(--wui-color-modal-bg);
    border-radius: 50%;
  }
`;var be=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let te=class extends w{constructor(){super(...arguments),this.address="",this.profileName="",this.alt="",this.imageSrc="",this.icon=void 0,this.iconSize="md",this.loading=!1,this.charsStart=4,this.charsEnd=6}render(){return l`
      <button>
        ${this.leftImageTemplate()} ${this.textTemplate()} ${this.rightImageTemplate()}
      </button>
    `}leftImageTemplate(){const e=this.icon?l`<wui-icon
          size=${this.iconSize}
          color="fg-200"
          name=${this.icon}
          class="icon"
        ></wui-icon>`:l`<wui-image src=${this.imageSrc} alt=${this.alt}></wui-image>`;return l`
      <wui-flex
        alignItems="center"
        justifyContent="center"
        class="icon-box"
        data-active=${!!this.icon}
      >
        ${e}
        <wui-flex class="circle"></wui-flex>
      </wui-flex>
    `}textTemplate(){return l`
      <wui-text variant="paragraph-500" color="fg-100">
        ${F.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?16:this.charsStart,charsEnd:this.profileName?0:this.charsEnd,truncate:this.profileName?"end":"middle"})}
      </wui-text>
    `}rightImageTemplate(){return l`<wui-icon name="chevronBottom" size="xs" color="fg-200"></wui-icon>`}};te.styles=[I,N,Tn];be([c()],te.prototype,"address",void 0);be([c()],te.prototype,"profileName",void 0);be([c()],te.prototype,"alt",void 0);be([c()],te.prototype,"imageSrc",void 0);be([c()],te.prototype,"icon",void 0);be([c()],te.prototype,"iconSize",void 0);be([c({type:Boolean})],te.prototype,"loading",void 0);be([c({type:Number})],te.prototype,"charsStart",void 0);be([c({type:Number})],te.prototype,"charsEnd",void 0);te=be([h("wui-wallet-switch")],te);const Nn=x`
  wui-flex {
    width: 100%;
  }

  :host > wui-flex:first-child {
    transform: translateY(calc(var(--wui-spacing-xxs) * -1));
  }

  wui-icon-link {
    margin-right: calc(var(--wui-icon-box-size-md) * -1);
  }

  wui-notice-card {
    margin-bottom: var(--wui-spacing-3xs);
  }

  wui-list-item > wui-text {
    flex: 1;
  }

  w3m-transactions-view {
    max-height: 200px;
  }

  .tab-content-container {
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .tab-content-container::-webkit-scrollbar {
    display: none;
  }

  .account-button {
    width: auto;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-s);
    height: 48px;
    padding: var(--wui-spacing-xs);
    padding-right: var(--wui-spacing-s);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: 24px;
    transition: background-color 0.2s linear;
  }

  .account-button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }

  .avatar-container {
    position: relative;
  }

  wui-avatar.avatar {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  wui-wallet-switch {
    margin-top: var(--wui-spacing-xs);
  }

  wui-avatar.network-avatar {
    width: 16px;
    height: 16px;
    position: absolute;
    left: 100%;
    top: 100%;
    transform: translate(-75%, -75%);
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  .account-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .account-links wui-flex {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    background: red;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 10px;
    flex: 1 0 0;
    border-radius: var(--XS, 16px);
    border: 1px solid var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    background: var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    transition:
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md),
      opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  .account-links wui-flex:hover {
    background: var(--dark-accent-glass-015, rgba(71, 161, 255, 0.15));
  }

  .account-links wui-flex wui-icon {
    width: var(--S, 20px);
    height: var(--S, 20px);
  }

  .account-links wui-flex wui-icon svg path {
    stroke: #667dff;
  }
`;var ne=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let G=class extends w{constructor(){super(),this.unsubscribe=[],this.caipAddress=C.state.caipAddress,this.address=b.getPlainAddress(C.state.caipAddress),this.profileImage=C.state.profileImage,this.profileName=C.state.profileName,this.disconnecting=!1,this.balance=C.state.balance,this.balanceSymbol=C.state.balanceSymbol,this.features=v.state.features,this.remoteFeatures=v.state.remoteFeatures,this.namespace=d.state.activeChain,this.activeConnectorIds=m.state.activeConnectorIds,this.unsubscribe.push(C.subscribeKey("caipAddress",e=>{this.address=b.getPlainAddress(e),this.caipAddress=e}),C.subscribeKey("balance",e=>this.balance=e),C.subscribeKey("balanceSymbol",e=>this.balanceSymbol=e),C.subscribeKey("profileName",e=>this.profileName=e),C.subscribeKey("profileImage",e=>this.profileImage=e),v.subscribeKey("features",e=>this.features=e),v.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e),m.subscribeKey("activeConnectorIds",e=>{this.activeConnectorIds=e}),d.subscribeKey("activeChain",e=>this.namespace=e),d.subscribeKey("activeCaipNetwork",e=>{e?.chainNamespace&&(this.namespace=e?.chainNamespace)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!this.caipAddress||!this.namespace)return null;const e=this.activeConnectorIds[this.namespace],i=e?m.getConnectorById(e):void 0,n=S.getConnectorImage(i);return l`<wui-flex
        flexDirection="column"
        .padding=${["0","xl","m","xl"]}
        alignItems="center"
        gap="s"
      >
        <wui-avatar
          alt=${p(this.caipAddress)}
          address=${p(b.getPlainAddress(this.caipAddress))}
          imageSrc=${p(this.profileImage===null?void 0:this.profileImage)}
          data-testid="single-account-avatar"
        ></wui-avatar>
        <wui-wallet-switch
          profileName=${this.profileName}
          address=${this.address}
          imageSrc=${n}
          alt=${i?.name}
          @click=${this.onGoToProfileWalletsView.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>
        <wui-flex flexDirection="column" alignItems="center">
          <wui-text variant="paragraph-500" color="fg-200">
            ${b.formatBalance(this.balance,this.balanceSymbol)}
          </wui-text>
        </wui-flex>
        ${this.explorerBtnTemplate()}
      </wui-flex>

      <wui-flex flexDirection="column" gap="xs" .padding=${["0","s","s","s"]}>
        ${this.authCardTemplate()} <w3m-account-auth-button></w3m-account-auth-button>
        ${this.orderedFeaturesTemplate()} ${this.activityTemplate()}
        <wui-list-item
          variant="icon"
          iconVariant="overlay"
          icon="disconnect"
          ?chevron=${!1}
          .loading=${this.disconnecting}
          @click=${this.onDisconnect.bind(this)}
          data-testid="disconnect-button"
        >
          <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
        </wui-list-item>
      </wui-flex>`}onrampTemplate(){if(!this.namespace)return null;const e=this.remoteFeatures?.onramp,i=V.ONRAMP_SUPPORTED_CHAIN_NAMESPACES.includes(this.namespace);return!e||!i?null:l`
      <wui-list-item
        data-testid="w3m-account-default-onramp-button"
        iconVariant="blue"
        icon="card"
        ?chevron=${!0}
        @click=${this.handleClickPay.bind(this)}
      >
        <wui-text variant="paragraph-500" color="fg-100">Buy crypto</wui-text>
      </wui-list-item>
    `}orderedFeaturesTemplate(){return(this.features?.walletFeaturesOrder||V.DEFAULT_FEATURES.walletFeaturesOrder).map(i=>{switch(i){case"onramp":return this.onrampTemplate();case"swaps":return this.swapsTemplate();case"send":return this.sendTemplate();default:return null}})}activityTemplate(){return this.namespace&&this.remoteFeatures?.activity&&V.ACTIVITY_ENABLED_CHAIN_NAMESPACES.includes(this.namespace)?l` <wui-list-item
          iconVariant="blue"
          icon="clock"
          iconSize="sm"
          ?chevron=${!0}
          @click=${this.onTransactions.bind(this)}
          data-testid="w3m-account-default-activity-button"
        >
          <wui-text variant="paragraph-500" color="fg-100">Activity</wui-text>
        </wui-list-item>`:null}swapsTemplate(){const e=this.remoteFeatures?.swaps,i=d.state.activeChain===$.CHAIN.EVM;return!e||!i?null:l`
      <wui-list-item
        iconVariant="blue"
        icon="recycleHorizontal"
        ?chevron=${!0}
        @click=${this.handleClickSwap.bind(this)}
        data-testid="w3m-account-default-swaps-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Swap</wui-text>
      </wui-list-item>
    `}sendTemplate(){const e=this.features?.send,i=d.state.activeChain;if(!i)throw new Error("SendController:sendTemplate - namespace is required");const n=V.SEND_SUPPORTED_NAMESPACES.includes(i);return!e||!n?null:l`
      <wui-list-item
        iconVariant="blue"
        icon="send"
        ?chevron=${!0}
        @click=${this.handleClickSend.bind(this)}
        data-testid="w3m-account-default-send-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Send</wui-text>
      </wui-list-item>
    `}authCardTemplate(){const e=d.state.activeChain;if(!e)throw new Error("AuthCardTemplate:authCardTemplate - namespace is required");const i=m.getConnectorId(e),n=m.getAuthConnector(),{origin:o}=location;return!n||i!==$.CONNECTOR_ID.AUTH||o.includes(V.SECURE_SITE)?null:l`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `}handleClickPay(){f.push("OnRampProviders")}handleClickSwap(){f.push("Swap")}handleClickSend(){f.push("WalletSend")}explorerBtnTemplate(){return C.state.addressExplorerUrl?l`
      <wui-button size="md" variant="neutral" @click=${this.onExplorer.bind(this)}>
        <wui-icon size="sm" color="inherit" slot="iconLeft" name="compass"></wui-icon>
        Block Explorer
        <wui-icon size="sm" color="inherit" slot="iconRight" name="externalLink"></wui-icon>
      </wui-button>
    `:null}onTransactions(){k.sendEvent({type:"track",event:"CLICK_TRANSACTIONS",properties:{isSmartAccount:xe(d.state.activeChain)===se.ACCOUNT_TYPES.SMART_ACCOUNT}}),f.push("Transactions")}async onDisconnect(){try{this.disconnecting=!0;const i=g.getConnections(this.namespace).length>0,n=this.namespace&&m.state.activeConnectorIds[this.namespace],o=this.remoteFeatures?.multiWallet;await g.disconnect(o?{id:n,namespace:this.namespace}:{}),i&&o&&(f.push("ProfileWallets"),W.showSuccess("Wallet deleted"))}catch{k.sendEvent({type:"track",event:"DISCONNECT_ERROR"}),W.showError("Failed to disconnect")}finally{this.disconnecting=!1}}onExplorer(){const e=C.state.addressExplorerUrl;e&&b.openHref(e,"_blank")}onGoToUpgradeView(){k.sendEvent({type:"track",event:"EMAIL_UPGRADE_FROM_MODAL"}),f.push("UpgradeEmailWallet")}onGoToProfileWalletsView(){f.push("ProfileWallets")}};G.styles=Nn;ne([u()],G.prototype,"caipAddress",void 0);ne([u()],G.prototype,"address",void 0);ne([u()],G.prototype,"profileImage",void 0);ne([u()],G.prototype,"profileName",void 0);ne([u()],G.prototype,"disconnecting",void 0);ne([u()],G.prototype,"balance",void 0);ne([u()],G.prototype,"balanceSymbol",void 0);ne([u()],G.prototype,"features",void 0);ne([u()],G.prototype,"remoteFeatures",void 0);ne([u()],G.prototype,"namespace",void 0);ne([u()],G.prototype,"activeConnectorIds",void 0);G=ne([h("w3m-account-default-widget")],G);const Rn=x`
  span {
    font-weight: 500;
    font-size: 40px;
    color: var(--wui-color-fg-100);
    line-height: 130%; /* 52px */
    letter-spacing: -1.6px;
    text-align: center;
  }

  .pennies {
    color: var(--wui-color-fg-200);
  }
`;var wi=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let et=class extends w{constructor(){super(...arguments),this.dollars="0",this.pennies="00"}render(){return l`<span>$${this.dollars}<span class="pennies">.${this.pennies}</span></span>`}};et.styles=[I,Rn];wi([c()],et.prototype,"dollars",void 0);wi([c()],et.prototype,"pennies",void 0);et=wi([h("wui-balance")],et);const On=x`
  :host {
    display: block;
    padding: 9px var(--wui-spacing-s) 10px var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);

    color: var(--wui-color-bg-100);
    position: relative;
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-bg-150);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  :host([data-variant='shade']) > wui-text {
    color: var(--wui-color-fg-150);
  }

  :host([data-variant='fill']) {
    background-color: var(--wui-color-fg-100);
    border: none;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }
`;var Dt=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ue=class extends w{constructor(){super(...arguments),this.placement="top",this.variant="fill",this.message=""}render(){return this.dataset.variant=this.variant,l`<wui-icon
        data-placement=${this.placement}
        color="fg-100"
        size="inherit"
        name=${this.variant==="fill"?"cursor":"cursorTransparent"}
      ></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>`}};Ue.styles=[I,N,On];Dt([c()],Ue.prototype,"placement",void 0);Dt([c()],Ue.prototype,"variant",void 0);Dt([c()],Ue.prototype,"message",void 0);Ue=Dt([h("wui-tooltip")],Ue);const Pn={getTabsByNamespace(s){return!!s&&s===$.CHAIN.EVM?v.state.remoteFeatures?.activity===!1?Ai.ACCOUNT_TABS.filter(i=>i.label!=="Activity"):Ai.ACCOUNT_TABS:[]}},Dn=x`
  :host {
    width: 100%;
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  :host::-webkit-scrollbar {
    display: none;
  }
`;var jn=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Jt=class extends w{render(){return l`<w3m-activity-list page="account"></w3m-activity-list>`}};Jt.styles=Dn;Jt=jn([h("w3m-account-activity-widget")],Jt);const Ln=x`
  .contentContainer {
    height: 280px;
  }

  .contentContainer > wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }

  .contentContainer > .textContent {
    width: 65%;
  }
`;var Bn=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ei=class extends w{render(){return l`${this.nftTemplate()}`}nftTemplate(){return l` <wui-flex
      class="contentContainer"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="l"
    >
      <wui-icon-box
        icon="wallet"
        size="inherit"
        iconColor="fg-200"
        backgroundColor="fg-200"
        iconSize="lg"
      ></wui-icon-box>
      <wui-flex
        class="textContent"
        gap="xs"
        flexDirection="column"
        justifyContent="center"
        flexDirection="column"
      >
        <wui-text
          variant="paragraph-500"
          align="center"
          color="fg-100"
          data-testid="nft-template-title"
          >Coming soon</wui-text
        >
        <wui-text
          variant="small-400"
          align="center"
          color="fg-200"
          data-testid="nft-template-description"
          >Stay tuned for our upcoming NFT feature</wui-text
        >
      </wui-flex>
      <wui-link @click=${this.onReceiveClick.bind(this)} data-testid="link-receive-funds"
        >Receive funds</wui-link
      >
    </wui-flex>`}onReceiveClick(){f.push("WalletReceive")}};ei.styles=Ln;ei=Bn([h("w3m-account-nfts-widget")],ei);const Un=x`
  button {
    width: 100%;
    display: flex;
    gap: var(--wui-spacing-s);
    align-items: center;
    justify-content: flex-start;
    padding: var(--wui-spacing-s) var(--wui-spacing-m) var(--wui-spacing-s) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon-box {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
  }

  wui-flex {
    width: auto;
  }
`;var Ie=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let we=class extends w{constructor(){super(...arguments),this.icon="card",this.text="",this.description="",this.tag=void 0,this.iconBackgroundColor="accent-100",this.iconColor="accent-100",this.disabled=!1}render(){return l`
      <button ?disabled=${this.disabled}>
        <wui-icon-box
          iconColor=${this.iconColor}
          backgroundColor=${this.iconBackgroundColor}
          size="inherit"
          icon=${this.icon}
          iconSize="md"
        ></wui-icon-box>
        <wui-flex flexDirection="column" justifyContent="spaceBetween">
          ${this.titleTemplate()}
          <wui-text variant="small-400" color="fg-200"> ${this.description}</wui-text></wui-flex
        >
      </button>
    `}titleTemplate(){return this.tag?l` <wui-flex alignItems="center" gap="xxs"
        ><wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text
        ><wui-tag tagType="main" size="md">${this.tag}</wui-tag>
      </wui-flex>`:l`<wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text>`}};we.styles=[I,N,Un];Ie([c()],we.prototype,"icon",void 0);Ie([c()],we.prototype,"text",void 0);Ie([c()],we.prototype,"description",void 0);Ie([c()],we.prototype,"tag",void 0);Ie([c()],we.prototype,"iconBackgroundColor",void 0);Ie([c()],we.prototype,"iconColor",void 0);Ie([c({type:Boolean})],we.prototype,"disabled",void 0);we=Ie([h("wui-list-description")],we);const zn=x`
  :host {
    width: 100%;
  }

  wui-flex {
    width: 100%;
  }

  .contentContainer {
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  .contentContainer::-webkit-scrollbar {
    display: none;
  }
`;var fi=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let tt=class extends w{constructor(){super(),this.unsubscribe=[],this.tokenBalance=C.state.tokenBalance,this.remoteFeatures=v.state.remoteFeatures,this.unsubscribe.push(C.subscribe(e=>{this.tokenBalance=e.tokenBalance}),v.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return l`${this.tokenTemplate()}`}tokenTemplate(){return this.tokenBalance&&this.tokenBalance?.length>0?l`<wui-flex class="contentContainer" flexDirection="column" gap="xs">
        ${this.tokenItemTemplate()}
      </wui-flex>`:l` <wui-flex flexDirection="column" gap="xs"
      >${this.onRampTemplate()}
      <wui-list-description
        @click=${this.onReceiveClick.bind(this)}
        text="Receive funds"
        description="Transfer tokens on your wallet"
        icon="arrowBottomCircle"
        iconColor="fg-200"
        iconBackgroundColor="fg-200"
        data-testid="receive-funds"
      ></wui-list-description
    ></wui-flex>`}onRampTemplate(){return this.remoteFeatures?.onramp?l`<wui-list-description
        @click=${this.onBuyClick.bind(this)}
        text="Buy Crypto"
        description="Easy with card or bank account"
        icon="card"
        iconColor="success-100"
        iconBackgroundColor="success-100"
        tag="popular"
        data-testid="buy-crypto"
      ></wui-list-description>`:l``}tokenItemTemplate(){return this.tokenBalance?.map(e=>l`<wui-list-token
          tokenName=${e.name}
          tokenImageUrl=${e.iconUrl}
          tokenAmount=${e.quantity.numeric}
          tokenValue=${e.value}
          tokenCurrency=${e.symbol}
        ></wui-list-token>`)}onReceiveClick(){f.push("WalletReceive")}onBuyClick(){k.sendEvent({type:"track",event:"SELECT_BUY_CRYPTO",properties:{isSmartAccount:xe(d.state.activeChain)===se.ACCOUNT_TYPES.SMART_ACCOUNT}}),f.push("OnRampProviders")}};tt.styles=zn;fi([u()],tt.prototype,"tokenBalance",void 0);fi([u()],tt.prototype,"remoteFeatures",void 0);tt=fi([h("w3m-account-tokens-widget")],tt);const Mn=x`
  wui-flex {
    width: 100%;
  }

  wui-promo {
    position: absolute;
    top: -32px;
  }

  wui-profile-button {
    margin-top: calc(-1 * var(--wui-spacing-2l));
  }

  wui-promo + wui-profile-button {
    margin-top: var(--wui-spacing-2l);
  }

  wui-tabs {
    width: 100%;
  }

  .contentContainer {
    height: 280px;
  }

  .contentContainer > wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }

  .contentContainer > .textContent {
    width: 65%;
  }
`;var de=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const Fn=48,Vn=430;let J=class extends w{constructor(){super(),this.unsubscribe=[],this.address=C.state.address,this.profileName=C.state.profileName,this.network=d.state.activeCaipNetwork,this.currentTab=C.state.currentTab,this.tokenBalance=C.state.tokenBalance,this.features=v.state.features,this.namespace=d.state.activeChain,this.activeConnectorIds=m.state.activeConnectorIds,this.remoteFeatures=v.state.remoteFeatures,this.unsubscribe.push(C.subscribe(e=>{e.address?(this.address=e.address,this.profileName=e.profileName,this.currentTab=e.currentTab,this.tokenBalance=e.tokenBalance):P.close()}),m.subscribeKey("activeConnectorIds",e=>{this.activeConnectorIds=e}),d.subscribeKey("activeChain",e=>this.namespace=e),d.subscribeKey("activeCaipNetwork",e=>this.network=e),v.subscribeKey("features",e=>this.features=e),v.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e)),this.watchSwapValues()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),clearInterval(this.watchTokenBalance)}firstUpdated(){C.fetchTokenBalance()}render(){if(!this.address)throw new Error("w3m-account-view: No account provided");if(!this.namespace)return null;const e=this.activeConnectorIds[this.namespace],i=e?m.getConnectorById(e):void 0,{icon:n,iconSize:o}=this.getAuthData();return l`<wui-flex
      flexDirection="column"
      .padding=${["0","xl","m","xl"]}
      alignItems="center"
      gap="m"
      data-testid="w3m-account-wallet-features-widget"
    >
      <wui-flex flexDirection="column" justifyContent="center" alignItems="center" gap="xs">
        <wui-wallet-switch
          profileName=${this.profileName}
          address=${this.address}
          icon=${n}
          iconSize=${o}
          alt=${i?.name}
          @click=${this.onGoToProfileWalletsView.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>

        ${this.tokenBalanceTemplate()}
      </wui-flex>
      ${this.orderedWalletFeatures()} ${this.tabsTemplate()} ${this.listContentTemplate()}
    </wui-flex>`}orderedWalletFeatures(){const e=this.features?.walletFeaturesOrder||V.DEFAULT_FEATURES.walletFeaturesOrder;return e.every(n=>n==="send"||n==="receive"?!this.features?.[n]:n==="swaps"||n==="onramp"?!this.remoteFeatures?.[n]:!0)?null:l`<wui-flex gap="s">
      ${e.map(n=>{switch(n){case"onramp":return this.onrampTemplate();case"swaps":return this.swapsTemplate();case"receive":return this.receiveTemplate();case"send":return this.sendTemplate();default:return null}})}
    </wui-flex>`}onrampTemplate(){return this.remoteFeatures?.onramp?l`
      <w3m-tooltip-trigger text="Buy">
        <wui-icon-button
          data-testid="wallet-features-onramp-button"
          @click=${this.onBuyClick.bind(this)}
          icon="card"
        ></wui-icon-button>
      </w3m-tooltip-trigger>
    `:null}swapsTemplate(){const e=this.remoteFeatures?.swaps,i=d.state.activeChain===$.CHAIN.EVM;return!e||!i?null:l`
      <w3m-tooltip-trigger text="Swap">
        <wui-icon-button
          data-testid="wallet-features-swaps-button"
          @click=${this.onSwapClick.bind(this)}
          icon="recycleHorizontal"
        >
        </wui-icon-button>
      </w3m-tooltip-trigger>
    `}receiveTemplate(){return this.features?.receive?l`
      <w3m-tooltip-trigger text="Receive">
        <wui-icon-button
          data-testid="wallet-features-receive-button"
          @click=${this.onReceiveClick.bind(this)}
          icon="arrowBottomCircle"
        >
        </wui-icon-button>
      </w3m-tooltip-trigger>
    `:null}sendTemplate(){const e=this.features?.send,i=d.state.activeChain,n=V.SEND_SUPPORTED_NAMESPACES.includes(i);return!e||!n?null:l`
      <w3m-tooltip-trigger text="Send">
        <wui-icon-button
          data-testid="wallet-features-send-button"
          @click=${this.onSendClick.bind(this)}
          icon="send"
        ></wui-icon-button>
      </w3m-tooltip-trigger>
    `}watchSwapValues(){this.watchTokenBalance=setInterval(()=>C.fetchTokenBalance(e=>this.onTokenBalanceError(e)),1e4)}onTokenBalanceError(e){e instanceof Error&&e.cause instanceof Response&&e.cause.status===$.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE&&clearInterval(this.watchTokenBalance)}listContentTemplate(){return this.currentTab===0?l`<w3m-account-tokens-widget></w3m-account-tokens-widget>`:this.currentTab===1?l`<w3m-account-nfts-widget></w3m-account-nfts-widget>`:this.currentTab===2?l`<w3m-account-activity-widget></w3m-account-activity-widget>`:l`<w3m-account-tokens-widget></w3m-account-tokens-widget>`}tokenBalanceTemplate(){if(this.tokenBalance&&this.tokenBalance?.length>=0){const e=b.calculateBalance(this.tokenBalance),{dollars:i="0",pennies:n="00"}=b.formatTokenBalance(e);return l`<wui-balance dollars=${i} pennies=${n}></wui-balance>`}return l`<wui-balance dollars="0" pennies="00"></wui-balance>`}tabsTemplate(){const e=Pn.getTabsByNamespace(d.state.activeChain);if(e.length===0)return null;const i=b.isMobile()&&window.innerWidth<Vn;let n="104px";return i?n=`${(window.innerWidth-Fn)/e.length}px`:e.length===2?n="156px":n="104px",l`<wui-tabs
      .onTabChange=${this.onTabChange.bind(this)}
      .activeTab=${this.currentTab}
      localTabWidth=${n}
      .tabs=${e}
    ></wui-tabs>`}onTabChange(e){C.setCurrentTab(e)}onBuyClick(){f.push("OnRampProviders")}onSwapClick(){this.network?.caipNetworkId&&!V.SWAP_SUPPORTED_NETWORKS.includes(this.network?.caipNetworkId)?f.push("UnsupportedChain",{swapUnsupportedChain:!0}):(k.sendEvent({type:"track",event:"OPEN_SWAP",properties:{network:this.network?.caipNetworkId||"",isSmartAccount:xe(d.state.activeChain)===se.ACCOUNT_TYPES.SMART_ACCOUNT}}),f.push("Swap"))}getAuthData(){const e=re.getConnectedSocialProvider(),i=re.getConnectedSocialUsername(),o=m.getAuthConnector()?.provider.getEmail()??"";return{name:_e.getAuthName({email:o,socialUsername:i,socialProvider:e}),icon:e??"mail",iconSize:e?"xl":"md"}}onReceiveClick(){f.push("WalletReceive")}onGoToProfileWalletsView(){f.push("ProfileWallets")}onSendClick(){k.sendEvent({type:"track",event:"OPEN_SEND",properties:{network:this.network?.caipNetworkId||"",isSmartAccount:xe(d.state.activeChain)===se.ACCOUNT_TYPES.SMART_ACCOUNT}}),f.push("WalletSend")}};J.styles=Mn;de([u()],J.prototype,"watchTokenBalance",void 0);de([u()],J.prototype,"address",void 0);de([u()],J.prototype,"profileName",void 0);de([u()],J.prototype,"network",void 0);de([u()],J.prototype,"currentTab",void 0);de([u()],J.prototype,"tokenBalance",void 0);de([u()],J.prototype,"features",void 0);de([u()],J.prototype,"namespace",void 0);de([u()],J.prototype,"activeConnectorIds",void 0);de([u()],J.prototype,"remoteFeatures",void 0);J=de([h("w3m-account-wallet-features-widget")],J);var Yi=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ti=class extends w{constructor(){super(),this.unsubscribe=[],this.namespace=d.state.activeChain,this.unsubscribe.push(d.subscribeKey("activeChain",e=>{this.namespace=e}))}render(){if(!this.namespace)return null;const e=m.getConnectorId(this.namespace),i=m.getAuthConnector();return l`
      ${i&&e===$.CONNECTOR_ID.AUTH?this.walletFeaturesTemplate():this.defaultTemplate()}
    `}walletFeaturesTemplate(){return l`<w3m-account-wallet-features-widget></w3m-account-wallet-features-widget>`}defaultTemplate(){return l`<w3m-account-default-widget></w3m-account-default-widget>`}};Yi([u()],ti.prototype,"namespace",void 0);ti=Yi([h("w3m-account-view")],ti);const Gn=x`
  wui-image {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
    border-radius: var(--wui-border-radius-3xs);
  }

  wui-image,
  .icon-box {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
    border-radius: var(--wui-border-radius-3xs);
  }

  wui-icon:not(.custom-icon, .icon-badge) {
    cursor: pointer;
  }

  .icon-box {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
  }

  .icon-badge {
    position: absolute;
    top: 18px;
    left: 23px;
    z-index: 3;
    background-color: var(--wui-color-gray-glass-005);
    border: 2px solid var(--wui-color-modal-bg);
    border-radius: 50%;
    padding: var(--wui-spacing-4xs);
  }
`;var q=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let D=class extends w{constructor(){super(...arguments),this.address="",this.profileName="",this.content=[],this.alt="",this.imageSrc="",this.icon=void 0,this.iconSize="md",this.iconBadge=void 0,this.iconBadgeSize="md",this.buttonVariant="neutral",this.enableMoreButton=!1,this.charsStart=4,this.charsEnd=6}render(){return l`
      <wui-flex flexDirection="column" rowGap="xs">
        ${this.topTemplate()} ${this.bottomTemplate()}
      </wui-flex>
    `}topTemplate(){return l`
      <wui-flex alignItems="flex-start" justifyContent="space-between">
        ${this.imageOrIconTemplate()}
        <wui-icon-link
          iconColor="fg-200"
          size="sm"
          icon="copy"
          @click=${this.dispatchCopyEvent}
        ></wui-icon-link>
        <wui-icon-link
          iconColor="fg-200"
          size="sm"
          icon="externalLink"
          @click=${this.dispatchExternalLinkEvent}
        ></wui-icon-link>
        ${this.enableMoreButton?l`<wui-icon-link
              iconColor="fg-200"
              size="sm"
              icon="threeDots"
              @click=${this.dispatchMoreButtonEvent}
              data-testid="wui-active-profile-wallet-item-more-button"
            ></wui-icon-link>`:null}
      </wui-flex>
    `}bottomTemplate(){return l` <wui-flex flexDirection="column">${this.contentTemplate()}</wui-flex> `}imageOrIconTemplate(){return this.icon?l`
        <wui-flex flexGrow="1" alignItems="center">
          <wui-flex alignItems="center" justifyContent="center" class="icon-box">
            <wui-icon
              size=${this.iconSize}
              color="fg-200"
              name=${this.icon}
              class="custom-icon"
            ></wui-icon>

            ${this.iconBadge?l`<wui-icon
                  color="fg-175"
                  size=${this.iconBadgeSize}
                  name=${this.iconBadge}
                  class="icon-badge"
                ></wui-icon>`:null}
          </wui-flex>
        </wui-flex>
      `:l`
      <wui-flex flexGrow="1" alignItems="center">
        <wui-image objectFit="contain" src=${this.imageSrc} alt=${this.alt}></wui-image>
      </wui-flex>
    `}contentTemplate(){return this.content.length===0?null:l`
      <wui-flex flexDirection="column" rowGap="s">
        ${this.content.map(e=>this.labelAndTagTemplate(e))}
      </wui-flex>
    `}labelAndTagTemplate({address:e,profileName:i,label:n,description:o,enableButton:t,buttonType:a,buttonLabel:r,buttonVariant:y,tagVariant:E,tagLabel:_,alignItems:M="flex-end"}){return l`
      <wui-flex justifyContent="space-between" alignItems=${M} columnGap="3xs">
        <wui-flex flexDirection="column" rowGap="4xs">
          ${n?l`<wui-text variant="micro-600" color="fg-200">${n}</wui-text>`:null}

          <wui-flex alignItems="center" columnGap="3xs">
            <wui-text variant="small-500" color="fg-100">
              ${F.getTruncateString({string:i||e,charsStart:i?16:this.charsStart,charsEnd:i?0:this.charsEnd,truncate:i?"end":"middle"})}
            </wui-text>

            ${E&&_?l`<wui-tag variant=${E} size="xs">${_}</wui-tag>`:null}
          </wui-flex>

          ${o?l`<wui-text variant="tiny-500" color="fg-200">${o}</wui-text>`:null}
        </wui-flex>

        ${t?this.buttonTemplate({buttonType:a,buttonLabel:r,buttonVariant:y}):null}
      </wui-flex>
    `}buttonTemplate({buttonType:e,buttonLabel:i,buttonVariant:n}){return l`
      <wui-button
        size="xs"
        variant=${n}
        @click=${e==="disconnect"?this.dispatchDisconnectEvent.bind(this):this.dispatchSwitchEvent.bind(this)}
        data-testid=${e==="disconnect"?"wui-active-profile-wallet-item-disconnect-button":"wui-active-profile-wallet-item-switch-button"}
      >
        ${i}
      </wui-button>
    `}dispatchDisconnectEvent(){this.dispatchEvent(new CustomEvent("disconnect",{bubbles:!0,composed:!0}))}dispatchSwitchEvent(){this.dispatchEvent(new CustomEvent("switch",{bubbles:!0,composed:!0}))}dispatchExternalLinkEvent(){this.dispatchEvent(new CustomEvent("externalLink",{bubbles:!0,composed:!0}))}dispatchMoreButtonEvent(){this.dispatchEvent(new CustomEvent("more",{bubbles:!0,composed:!0}))}dispatchCopyEvent(){this.dispatchEvent(new CustomEvent("copy",{bubbles:!0,composed:!0}))}};D.styles=[I,N,Gn];q([c()],D.prototype,"address",void 0);q([c()],D.prototype,"profileName",void 0);q([c({type:Array})],D.prototype,"content",void 0);q([c()],D.prototype,"alt",void 0);q([c()],D.prototype,"imageSrc",void 0);q([c()],D.prototype,"icon",void 0);q([c()],D.prototype,"iconSize",void 0);q([c()],D.prototype,"iconBadge",void 0);q([c()],D.prototype,"iconBadgeSize",void 0);q([c()],D.prototype,"buttonVariant",void 0);q([c({type:Boolean})],D.prototype,"enableMoreButton",void 0);q([c({type:Number})],D.prototype,"charsStart",void 0);q([c({type:Number})],D.prototype,"charsEnd",void 0);D=q([h("wui-active-profile-wallet-item")],D);const Kn=x`
  wui-image,
  .icon-box {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
    border-radius: var(--wui-border-radius-3xs);
  }

  .right-icon {
    cursor: pointer;
  }

  .icon-box {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
  }

  .icon-badge {
    position: absolute;
    top: 18px;
    left: 23px;
    z-index: 3;
    background-color: var(--wui-color-gray-glass-005);
    border: 2px solid var(--wui-color-modal-bg);
    border-radius: 50%;
    padding: var(--wui-spacing-4xs);
  }
`;var B=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let R=class extends w{constructor(){super(...arguments),this.address="",this.profileName="",this.alt="",this.buttonLabel="",this.buttonVariant="accent",this.imageSrc="",this.icon=void 0,this.iconSize="md",this.iconBadgeSize="md",this.rightIcon="off",this.rightIconSize="md",this.loading=!1,this.charsStart=4,this.charsEnd=6}render(){return l`
      <wui-flex alignItems="center" columnGap="xs">
        ${this.imageOrIconTemplate()} ${this.labelAndDescriptionTemplate()}
        ${this.buttonActionTemplate()}
      </wui-flex>
    `}imageOrIconTemplate(){return this.icon?l`
        <wui-flex alignItems="center" justifyContent="center" class="icon-box">
          <wui-flex alignItems="center" justifyContent="center" class="icon-box">
            <wui-icon
              size=${this.iconSize}
              color="fg-200"
              name=${this.icon}
              class="custom-icon"
            ></wui-icon>
            ${this.iconBadge?l`<wui-icon
                  color="fg-175"
                  size=${this.iconBadgeSize}
                  name=${this.iconBadge}
                  class="icon-badge"
                ></wui-icon>`:null}
          </wui-flex>
        </wui-flex>
      `:l`<wui-image objectFit="contain" src=${this.imageSrc} alt=${this.alt}></wui-image>`}labelAndDescriptionTemplate(){return l`
      <wui-flex
        flexDirection="column"
        flexGrow="1"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <wui-text variant="small-500" color="fg-100">
          ${F.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?16:this.charsStart,charsEnd:this.profileName?0:this.charsEnd,truncate:this.profileName?"end":"middle"})}
        </wui-text>
      </wui-flex>
    `}buttonActionTemplate(){return l`
      <wui-flex columnGap="3xs" alignItems="center" justifyContent="center">
        <wui-button
          size="xs"
          variant=${this.buttonVariant}
          .loading=${this.loading}
          @click=${this.handleButtonClick}
          data-testid="wui-inactive-profile-wallet-item-button"
        >
          ${this.buttonLabel}
        </wui-button>

        <wui-icon-link
          iconColor="fg-200"
          size=${this.rightIconSize}
          icon=${this.rightIcon}
          class="right-icon"
          @click=${this.handleIconClick}
        ></wui-icon-link>
      </wui-flex>
    `}handleButtonClick(){this.dispatchEvent(new CustomEvent("buttonClick",{bubbles:!0,composed:!0}))}handleIconClick(){this.dispatchEvent(new CustomEvent("iconClick",{bubbles:!0,composed:!0}))}};R.styles=[I,N,Kn];B([c()],R.prototype,"address",void 0);B([c()],R.prototype,"profileName",void 0);B([c()],R.prototype,"alt",void 0);B([c()],R.prototype,"buttonLabel",void 0);B([c()],R.prototype,"buttonVariant",void 0);B([c()],R.prototype,"imageSrc",void 0);B([c()],R.prototype,"icon",void 0);B([c()],R.prototype,"iconSize",void 0);B([c()],R.prototype,"iconBadge",void 0);B([c()],R.prototype,"iconBadgeSize",void 0);B([c()],R.prototype,"rightIcon",void 0);B([c()],R.prototype,"rightIconSize",void 0);B([c({type:Boolean})],R.prototype,"loading",void 0);B([c({type:Number})],R.prototype,"charsStart",void 0);B([c({type:Number})],R.prototype,"charsEnd",void 0);R=B([h("wui-inactive-profile-wallet-item")],R);const qt={getAuthData(s){const e=s.connectorId===$.CONNECTOR_ID.AUTH;if(!e)return{isAuth:!1,icon:void 0,iconSize:void 0,name:void 0};const i=s?.auth?.name??re.getConnectedSocialProvider(),n=s?.auth?.username??re.getConnectedSocialUsername(),t=m.getAuthConnector()?.provider.getEmail()??"";return{isAuth:!0,icon:i??"mail",iconSize:i?"xl":"md",name:e?_e.getAuthName({email:t,socialUsername:n,socialProvider:i}):void 0}}},Hn=x`
  :host {
    --connect-scroll--top-opacity: 0;
    --connect-scroll--bottom-opacity: 0;
  }

  .balance-amount {
    flex: 1;
  }

  .wallet-list {
    scrollbar-width: none;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, calc(1 - var(--connect-scroll--top-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--connect-scroll--top-opacity))) 1px,
      black 40px,
      black calc(100% - 40px),
      rgba(155, 155, 155, calc(1 - var(--connect-scroll--bottom-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--connect-scroll--bottom-opacity))) 100%
    );
  }

  .active-wallets {
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  .active-wallets-box {
    height: 330px;
  }

  .empty-wallet-list-box {
    height: 400px;
  }

  .empty-box {
    width: 100%;
    padding: var(--wui-spacing-l);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  wui-separator {
    margin: var(--wui-spacing-xs) 0 var(--wui-spacing-xs) 0;
  }

  .active-connection {
    padding: var(--wui-spacing-xs);
  }

  .recent-connection {
    padding: var(--wui-spacing-xs) 0 var(--wui-spacing-xs) 0;
  }

  @media (max-width: 430px) {
    .active-wallets-box,
    .empty-wallet-list-box {
      height: auto;
      max-height: clamp(360px, 470px, 80vh);
    }
  }
`;var Y=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const qn=16,Yn=4,ee={ADDRESS_DISPLAY:{START:4,END:6},BADGE:{SIZE:"md",ICON:"lightbulb"},SCROLL_THRESHOLD:50,OPACITY_RANGE:[0,1]},Ze={eip155:"ethereum",solana:"solana",bip122:"bitcoin"},Di=[{namespace:"eip155",icon:Ze.eip155,label:"EVM"},{namespace:"solana",icon:Ze.solana,label:"Solana"},{namespace:"bip122",icon:Ze.bip122,label:"Bitcoin"}],Xn={eip155:{title:"Add EVM Wallet",description:"Add your first EVM wallet"},solana:{title:"Add Solana Wallet",description:"Add your first Solana wallet"},bip122:{title:"Add Bitcoin Wallet",description:"Add your first Bitcoin wallet"}};let j=class extends w{constructor(){super(),this.unsubscribers=[],this.currentTab=0,this.namespace=d.state.activeChain,this.namespaces=Array.from(d.state.chains.keys()),this.caipAddress=void 0,this.profileName=void 0,this.activeConnectorIds=m.state.activeConnectorIds,this.lastSelectedAddress="",this.lastSelectedConnectorId="",this.isSwitching=!1,this.caipNetwork=d.state.activeCaipNetwork,this.user=C.state.user,this.remoteFeatures=v.state.remoteFeatures,this.tabWidth="",this.currentTab=this.namespace?this.namespaces.indexOf(this.namespace):0,this.caipAddress=d.getAccountData(this.namespace)?.caipAddress,this.profileName=d.getAccountData(this.namespace)?.profileName,this.unsubscribers.push(g.subscribeKey("connections",()=>this.requestUpdate()),g.subscribeKey("recentConnections",()=>this.requestUpdate()),m.subscribeKey("activeConnectorIds",e=>{this.activeConnectorIds=e}),d.subscribeKey("activeCaipNetwork",e=>this.caipNetwork=e),C.subscribeKey("user",e=>this.user=e),v.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e)),this.chainListener=d.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress,this.profileName=e?.profileName},this.namespace)}disconnectedCallback(){this.unsubscribers.forEach(e=>e()),this.resizeObserver?.disconnect(),this.tabsResizeObserver?.disconnect(),this.removeScrollListener(),this.chainListener?.()}firstUpdated(){const e=this.shadowRoot?.querySelector(".wallet-list"),i=this.shadowRoot?.querySelector("wui-tabs");if(!e)return;const n=()=>this.updateScrollOpacity(e);if(requestAnimationFrame(n),e.addEventListener("scroll",n),this.resizeObserver=new ResizeObserver(n),this.resizeObserver.observe(e),n(),i){const o=()=>{const a=Di.filter(r=>this.namespaces.includes(r.namespace)).length;if(a>1){const r=this.getBoundingClientRect()?.width,y=Yn*2,E=qn*2,M=(r-E-y)/a;this.tabWidth=`${M}px`,this.requestUpdate()}};this.tabsResizeObserver=new ResizeObserver(o),this.tabsResizeObserver.observe(this),o()}}render(){const e=this.namespace;if(!e)throw new Error("Namespace is not set");return l`
      <wui-flex flexDirection="column" .padding=${["0","l","l","l"]} gap="l">
        ${this.renderTabs()} ${this.renderHeader(e)} ${this.renderConnections(e)}
        ${this.renderAddConnectionButton(e)}
      </wui-flex>
    `}renderTabs(){const e=Di.filter(n=>this.namespaces.includes(n.namespace));return e.length>1?l`
        <wui-tabs
          .onTabChange=${n=>this.handleTabChange(n)}
          .activeTab=${this.currentTab}
          localTabWidth=${this.tabWidth}
          .tabs=${e}
        ></wui-tabs>
      `:null}renderHeader(e){const n=this.getActiveConnections(e).flatMap(({accounts:o})=>o).length+(this.caipAddress?1:0);return l`
      <wui-flex alignItems="center" columnGap="3xs">
        <wui-icon
          name=${Ze[e]??Ze.eip155}
          size="lg"
        ></wui-icon>
        <wui-text color="fg-200" variant="small-400"
          >${n>1?"Wallets":"Wallet"}</wui-text
        >
        <wui-text
          color="fg-100"
          variant="small-400"
          class="balance-amount"
          data-testid="balance-amount"
        >
          ${n}
        </wui-text>
        <wui-link
          color="fg-200"
          @click=${()=>g.disconnect({namespace:e})}
          ?disabled=${!this.hasAnyConnections(e)}
          data-testid="disconnect-all-button"
        >
          Disconnect All
        </wui-link>
      </wui-flex>
    `}renderConnections(e){const i=this.hasAnyConnections(e);return l`
      <wui-flex flexDirection="column" class=${Qt({"wallet-list":!0,"active-wallets-box":i,"empty-wallet-list-box":!i})} rowGap="s">
        ${i?this.renderActiveConnections(e):this.renderEmptyState(e)}
      </wui-flex>
    `}renderActiveConnections(e){const i=this.getActiveConnections(e),n=this.activeConnectorIds[e],o=this.getPlainAddress();return l`
      ${o||n||i.length>0?l`<wui-flex
            flexDirection="column"
            .padding=${["l","0","xs","0"]}
            class="active-wallets"
          >
            ${this.renderActiveProfile(e)} ${this.renderActiveConnectionsList(e)}
          </wui-flex>`:null}
      ${this.renderRecentConnections(e)}
    `}renderActiveProfile(e){const i=this.activeConnectorIds[e];if(!i)return null;const{connections:n}=Ee.getConnectionsData(e),o=m.getConnectorById(i),t=S.getConnectorImage(o),a=this.getPlainAddress();if(!a)return null;const r=e===$.CHAIN.BITCOIN,y=qt.getAuthData({connectorId:i,accounts:[]}),E=this.getActiveConnections(e).flatMap(T=>T.accounts).length>0,_=n.find(T=>T.connectorId===i),M=_?.accounts.filter(T=>!Q.isLowerCaseMatch(T.address,a));return l`
      <wui-flex flexDirection="column" .padding=${["0","l","0","l"]}>
        <wui-active-profile-wallet-item
          address=${a}
          alt=${o?.name}
          .content=${this.getProfileContent({address:a,connections:n,connectorId:i,namespace:e})}
          .charsStart=${ee.ADDRESS_DISPLAY.START}
          .charsEnd=${ee.ADDRESS_DISPLAY.END}
          .icon=${y.icon}
          .iconSize=${y.iconSize}
          .iconBadge=${this.isSmartAccount(a)?ee.BADGE.ICON:void 0}
          .iconBadgeSize=${this.isSmartAccount(a)?ee.BADGE.SIZE:void 0}
          imageSrc=${t}
          ?enableMoreButton=${y.isAuth}
          @copy=${()=>this.handleCopyAddress(a)}
          @disconnect=${()=>this.handleDisconnect(e,{id:i})}
          @switch=${()=>{r&&_&&M?.[0]&&this.handleSwitchWallet(_,M[0].address,e)}}
          @externalLink=${()=>this.handleExternalLink(a)}
          @more=${()=>this.handleMore()}
          data-testid="wui-active-profile-wallet-item"
        ></wui-active-profile-wallet-item>
        ${E?l`<wui-separator></wui-separator>`:null}
      </wui-flex>
    `}renderActiveConnectionsList(e){const i=this.getActiveConnections(e);return i.length===0?null:l`
      <wui-flex flexDirection="column" .padding=${["0","xs","0","xs"]}>
        ${this.renderConnectionList(i,!1,e)}
      </wui-flex>
    `}renderRecentConnections(e){const{recentConnections:i}=Ee.getConnectionsData(e);return i.flatMap(o=>o.accounts).length===0?null:l`
      <wui-flex flexDirection="column" .padding=${["0","xs","0","xs"]} rowGap="xs">
        <wui-text color="fg-200" variant="micro-500" data-testid="recently-connected-text"
          >RECENTLY CONNECTED</wui-text
        >
        <wui-flex flexDirection="column" .padding=${["0","xs","0","xs"]}>
          ${this.renderConnectionList(i,!0,e)}
        </wui-flex>
      </wui-flex>
    `}renderConnectionList(e,i,n){return e.filter(o=>o.accounts.length>0).map((o,t)=>{const a=m.getConnectorById(o.connectorId),r=S.getConnectorImage(a)??"",y=qt.getAuthData(o);return o.accounts.map((E,_)=>{const M=t!==0||_!==0,T=this.isAccountLoading(o.connectorId,E.address);return l`
            <wui-flex flexDirection="column">
              ${M?l`<wui-separator></wui-separator>`:null}
              <wui-inactive-profile-wallet-item
                address=${E.address}
                alt=${o.connectorId}
                buttonLabel=${i?"Connect":"Switch"}
                buttonVariant=${i?"neutral":"accent"}
                rightIcon=${i?"bin":"off"}
                rightIconSize="sm"
                class=${i?"recent-connection":"active-connection"}
                data-testid=${i?"recent-connection":"active-connection"}
                imageSrc=${r}
                .iconBadge=${this.isSmartAccount(E.address)?ee.BADGE.ICON:void 0}
                .iconBadgeSize=${this.isSmartAccount(E.address)?ee.BADGE.SIZE:void 0}
                .icon=${y.icon}
                .iconSize=${y.iconSize}
                .loading=${T}
                .showBalance=${!1}
                .charsStart=${ee.ADDRESS_DISPLAY.START}
                .charsEnd=${ee.ADDRESS_DISPLAY.END}
                @buttonClick=${()=>this.handleSwitchWallet(o,E.address,n)}
                @iconClick=${()=>this.handleWalletAction({connection:o,address:E.address,isRecentConnection:i,namespace:n})}
              ></wui-inactive-profile-wallet-item>
            </wui-flex>
          `})})}renderAddConnectionButton(e){if(!this.isMultiWalletEnabled()&&this.caipAddress||!this.hasAnyConnections(e))return null;const{title:i}=this.getChainLabelInfo(e);return l`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="plus"
        iconSize="sm"
        ?chevron=${!0}
        @click=${()=>this.handleAddConnection(e)}
        data-testid="add-connection-button"
      >
        <wui-text variant="paragraph-500" color="fg-200">${i}</wui-text>
      </wui-list-item>
    `}renderEmptyState(e){const{title:i,description:n}=this.getChainLabelInfo(e);return l`
      <wui-flex alignItems="flex-start" class="empty-template" data-testid="empty-template">
        <wui-flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          rowGap="s"
          class="empty-box"
        >
          <wui-icon-box
            size="lg"
            icon="wallet"
            background="gray"
            iconColor="fg-200"
            backgroundColor="glass-002"
          ></wui-icon-box>

          <wui-flex flexDirection="column" alignItems="center" justifyContent="center" gap="3xs">
            <wui-text color="fg-100" variant="paragraph-500" data-testid="empty-state-text"
              >No wallet connected</wui-text
            >
            <wui-text color="fg-200" variant="tiny-500" data-testid="empty-state-description"
              >${n}</wui-text
            >
          </wui-flex>

          <wui-button
            variant="neutral"
            size="md"
            @click=${()=>this.handleAddConnection(e)}
            data-testid="empty-state-button"
          >
            <wui-icon color="inherit" slot="iconLeft" name="plus"></wui-icon>
            ${i}
          </wui-button>
        </wui-flex>
      </wui-flex>
    `}handleTabChange(e){const i=this.namespaces[e];i&&(this.chainListener?.(),this.currentTab=this.namespaces.indexOf(i),this.namespace=i,this.caipAddress=d.getAccountData(i)?.caipAddress,this.profileName=d.getAccountData(i)?.profileName,this.chainListener=d.subscribeChainProp("accountState",n=>{this.caipAddress=n?.caipAddress},i))}async handleSwitchWallet(e,i,n){try{this.isSwitching=!0,this.lastSelectedConnectorId=e.connectorId,this.lastSelectedAddress=i,await g.switchConnection({connection:e,address:i,namespace:n,closeModalOnConnect:!1,onChange({hasSwitchedAccount:o,hasSwitchedWallet:t}){t?W.showSuccess("Wallet switched"):o&&W.showSuccess("Account switched")}})}catch{W.showError("Failed to switch wallet")}finally{this.isSwitching=!1}}handleWalletAction(e){const{connection:i,address:n,isRecentConnection:o,namespace:t}=e;o?(re.deleteAddressFromConnection({connectorId:i.connectorId,address:n,namespace:t}),g.syncStorageConnections(),W.showSuccess("Wallet deleted")):this.handleDisconnect(t,{id:i.connectorId})}async handleDisconnect(e,{id:i}){try{await g.disconnect({id:i,namespace:e}),W.showSuccess("Wallet disconnected")}catch{W.showError("Failed to disconnect wallet")}}handleCopyAddress(e){b.copyToClopboard(e),W.showSuccess("Address copied")}handleMore(){f.push("AccountSettings")}handleExternalLink(e){const i=this.caipNetwork?.blockExplorers?.default.url;i&&b.openHref(`${i}/address/${e}`,"_blank")}handleAddConnection(e){m.setFilterByNamespace(e),f.push("Connect")}getChainLabelInfo(e){return Xn[e]??{title:"Add Wallet",description:"Add your first wallet"}}isSmartAccount(e){if(!this.namespace)return!1;const i=this.user?.accounts?.find(n=>n.type==="smartAccount");return i&&e?Q.isLowerCaseMatch(i.address,e):!1}getPlainAddress(){return this.caipAddress?b.getPlainAddress(this.caipAddress):void 0}getActiveConnections(e){const i=this.activeConnectorIds[e],{connections:n}=Ee.getConnectionsData(e),[o]=n.filter(y=>Q.isLowerCaseMatch(y.connectorId,i));if(!i)return n;const t=e===$.CHAIN.BITCOIN,{address:a}=this.caipAddress?wn.parseCaipAddress(this.caipAddress):{};let r=[...a?[a]:[]];return t&&o&&(r=o.accounts.map(y=>y.address)||[]),Ee.excludeConnectorAddressFromConnections({connectorId:i,addresses:r,connections:n})}hasAnyConnections(e){const i=this.getActiveConnections(e),{recentConnections:n}=Ee.getConnectionsData(e);return!!this.caipAddress||i.length>0||n.length>0}isAccountLoading(e,i){return Q.isLowerCaseMatch(this.lastSelectedConnectorId,e)&&Q.isLowerCaseMatch(this.lastSelectedAddress,i)&&this.isSwitching}getProfileContent(e){const{address:i,connections:n,connectorId:o,namespace:t}=e,[a]=n.filter(y=>Q.isLowerCaseMatch(y.connectorId,o));if(t===$.CHAIN.BITCOIN&&a?.accounts.every(y=>typeof y.type=="string"))return this.getBitcoinProfileContent(a.accounts,i);const r=qt.getAuthData({connectorId:o,accounts:[]});return[{address:i,tagLabel:"Active",tagVariant:"success",enableButton:!0,profileName:this.profileName,buttonType:"disconnect",buttonLabel:"Disconnect",buttonVariant:"neutral",...r.isAuth?{description:this.isSmartAccount(i)?"Smart Account":"EOA Account"}:{}}]}getBitcoinProfileContent(e,i){const n=e.length>1,o=this.getPlainAddress();return e.map(t=>{const a=Q.isLowerCaseMatch(t.address,o);let r="PAYMENT";return t.type==="ordinal"&&(r="ORDINALS"),{address:t.address,tagLabel:Q.isLowerCaseMatch(t.address,i)?"Active":void 0,tagVariant:Q.isLowerCaseMatch(t.address,i)?"success":void 0,enableButton:!0,...n?{label:r,alignItems:"flex-end",buttonType:a?"disconnect":"switch",buttonLabel:a?"Disconnect":"Switch",buttonVariant:a?"neutral":"accent"}:{alignItems:"center",buttonType:"disconnect",buttonLabel:"Disconnect",buttonVariant:"neutral"}}})}removeScrollListener(){const e=this.shadowRoot?.querySelector(".wallet-list");e&&e.removeEventListener("scroll",()=>this.handleConnectListScroll())}handleConnectListScroll(){const e=this.shadowRoot?.querySelector(".wallet-list");e&&this.updateScrollOpacity(e)}isMultiWalletEnabled(){return!!this.remoteFeatures?.multiWallet}updateScrollOpacity(e){e.style.setProperty("--connect-scroll--top-opacity",mt.interpolate([0,ee.SCROLL_THRESHOLD],ee.OPACITY_RANGE,e.scrollTop).toString()),e.style.setProperty("--connect-scroll--bottom-opacity",mt.interpolate([0,ee.SCROLL_THRESHOLD],ee.OPACITY_RANGE,e.scrollHeight-e.scrollTop-e.offsetHeight).toString())}};j.styles=Hn;Y([u()],j.prototype,"currentTab",void 0);Y([u()],j.prototype,"namespace",void 0);Y([u()],j.prototype,"namespaces",void 0);Y([u()],j.prototype,"caipAddress",void 0);Y([u()],j.prototype,"profileName",void 0);Y([u()],j.prototype,"activeConnectorIds",void 0);Y([u()],j.prototype,"lastSelectedAddress",void 0);Y([u()],j.prototype,"lastSelectedConnectorId",void 0);Y([u()],j.prototype,"isSwitching",void 0);Y([u()],j.prototype,"caipNetwork",void 0);Y([u()],j.prototype,"user",void 0);Y([u()],j.prototype,"remoteFeatures",void 0);Y([u()],j.prototype,"tabWidth",void 0);j=Y([h("w3m-profile-wallets-view")],j);const Qn=x`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 22px;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--wui-color-blue-100);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-002);
    border-radius: 999px;
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color;
  }

  span:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
    background-color: var(--wui-color-inverse-100);
    transition: transform var(--wui-ease-inout-power-1) var(--wui-duration-lg);
    will-change: transform;
    border-radius: 50%;
  }

  input:checked + span {
    border-color: var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-blue-100);
  }

  input:not(:checked) + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }
`;var Xi=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let gt=class extends w{constructor(){super(...arguments),this.inputElementRef=di(),this.checked=void 0}render(){return l`
      <label>
        <input
          ${pi(this.inputElementRef)}
          type="checkbox"
          ?checked=${p(this.checked)}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent("switchChange",{detail:this.inputElementRef.value?.checked,bubbles:!0,composed:!0}))}};gt.styles=[I,N,fn,Qn];Xi([c({type:Boolean})],gt.prototype,"checked",void 0);gt=Xi([h("wui-switch")],gt);const Zn=x`
  :host {
    height: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: var(--wui-spacing-1xs);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`;var Qi=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let vt=class extends w{constructor(){super(...arguments),this.checked=void 0}render(){return l`
      <button>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-switch ?checked=${p(this.checked)}></wui-switch>
      </button>
    `}};vt.styles=[I,N,Zn];Qi([c({type:Boolean})],vt.prototype,"checked",void 0);vt=Qi([h("wui-certified-switch")],vt);const Jn=x`
  button {
    background-color: var(--wui-color-fg-300);
    border-radius: var(--wui-border-radius-4xs);
    width: 16px;
    height: 16px;
  }

  button:disabled {
    background-color: var(--wui-color-bg-300);
  }

  wui-icon {
    color: var(--wui-color-bg-200) !important;
  }

  button:focus-visible {
    background-color: var(--wui-color-fg-250);
    border: 1px solid var(--wui-color-accent-100);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-fg-250);
    }

    button:active:enabled {
      background-color: var(--wui-color-fg-225);
    }
  }
`;var Zi=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let xt=class extends w{constructor(){super(...arguments),this.icon="copy"}render(){return l`
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `}};xt.styles=[I,N,Jn];Zi([c()],xt.prototype,"icon",void 0);xt=Zi([h("wui-input-element")],xt);const eo=x`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`;var to=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ii=class extends w{constructor(){super(...arguments),this.inputComponentRef=di()}render(){return l`
      <wui-input-text
        ${pi(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `}clearValue(){const i=this.inputComponentRef.value?.inputElementRef.value;i&&(i.value="",i.focus(),i.dispatchEvent(new Event("input")))}};ii.styles=[I,eo];ii=to([h("wui-search-bar")],ii);const io=x`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) 10px;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--wui-path-network);
    clip-path: var(--wui-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: var(--wui-color-gray-glass-010);
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`;var Ji=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let yt=class extends w{constructor(){super(...arguments),this.type="wallet"}render(){return l`
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `}shimmerTemplate(){return this.type==="network"?l` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${yn}`:l`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}};yt.styles=[I,N,io];Ji([c()],yt.prototype,"type",void 0);yt=Ji([h("wui-card-select-loader")],yt);const no=x`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;var oe=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let K=class extends w{render(){return this.style.cssText=`
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&F.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&F.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&F.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&F.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&F.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&F.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&F.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&F.getSpacingStyles(this.margin,3)};
    `,l`<slot></slot>`}};K.styles=[I,no];oe([c()],K.prototype,"gridTemplateRows",void 0);oe([c()],K.prototype,"gridTemplateColumns",void 0);oe([c()],K.prototype,"justifyItems",void 0);oe([c()],K.prototype,"alignItems",void 0);oe([c()],K.prototype,"justifyContent",void 0);oe([c()],K.prototype,"alignContent",void 0);oe([c()],K.prototype,"columnGap",void 0);oe([c()],K.prototype,"rowGap",void 0);oe([c()],K.prototype,"gap",void 0);oe([c()],K.prototype,"padding",void 0);oe([c()],K.prototype,"margin",void 0);K=oe([h("wui-grid")],K);const oo=x`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-s) var(--wui-spacing-0);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: var(--wui-color-fg-100);
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  [data-selected='true'] {
    background-color: var(--wui-color-accent-glass-020);
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }
  }

  [data-selected='true']:active:enabled {
    background-color: var(--wui-color-accent-glass-010);
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`;var pt=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Te=class extends w{constructor(){super(),this.observer=new IntersectionObserver(()=>{}),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.wallet=void 0,this.observer=new IntersectionObserver(e=>{e.forEach(i=>{i.isIntersecting?(this.visible=!0,this.fetchImageSrc()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){const e=this.wallet?.badge_type==="certified";return l`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="3xs">
          <wui-text
            variant="tiny-500"
            color="inherit"
            class=${p(e?"certified":void 0)}
            >${this.wallet?.name}</wui-text
          >
          ${e?l`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){return!this.visible&&!this.imageSrc||this.imageLoading?this.shimmerTemplate():l`
      <wui-wallet-image
        size="md"
        imageSrc=${p(this.imageSrc)}
        name=${this.wallet?.name}
        .installed=${this.wallet?.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `}shimmerTemplate(){return l`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}async fetchImageSrc(){this.wallet&&(this.imageSrc=S.getWalletImage(this.wallet),!this.imageSrc&&(this.imageLoading=!0,this.imageSrc=await S.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}};Te.styles=oo;pt([u()],Te.prototype,"visible",void 0);pt([u()],Te.prototype,"imageSrc",void 0);pt([u()],Te.prototype,"imageLoading",void 0);pt([c()],Te.prototype,"wallet",void 0);Te=pt([h("w3m-all-wallets-list-item")],Te);const ao=x`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;var He=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const ji="local-paginator";let ye=class extends w{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!A.state.wallets.length,this.wallets=A.state.wallets,this.recommended=A.state.recommended,this.featured=A.state.featured,this.filteredWallets=A.state.filteredWallets,this.unsubscribe.push(A.subscribeKey("wallets",e=>this.wallets=e),A.subscribeKey("recommended",e=>this.recommended=e),A.subscribeKey("featured",e=>this.featured=e),A.subscribeKey("filteredWallets",e=>this.filteredWallets=e))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.paginationObserver?.disconnect()}render(){return l`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0","s","s","s"]}
        columnGap="xxs"
        rowGap="l"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){this.loading=!0;const e=this.shadowRoot?.querySelector("wui-grid");e&&(await A.fetchWalletsByPage({page:1}),await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.loading=!1,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(e,i){return[...Array(e)].map(()=>l`
        <wui-card-select-loader type="wallet" id=${p(i)}></wui-card-select-loader>
      `)}walletsTemplate(){const e=this.filteredWallets?.length>0?b.uniqueBy([...this.featured,...this.recommended,...this.filteredWallets],"id"):b.uniqueBy([...this.featured,...this.recommended,...this.wallets],"id");return je.markWalletsAsInstalled(e).map(n=>l`
        <w3m-all-wallets-list-item
          @click=${()=>this.onConnectWallet(n)}
          .wallet=${n}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){const{wallets:e,recommended:i,featured:n,count:o}=A.state,t=window.innerWidth<352?3:4,a=e.length+i.length;let y=Math.ceil(a/t)*t-a+t;return y-=e.length?n.length%t:0,o===0&&n.length>0?null:o===0||[...n,...e,...i].length<o?this.shimmerTemplate(y,ji):null}createPaginationObserver(){const e=this.shadowRoot?.querySelector(`#${ji}`);e&&(this.paginationObserver=new IntersectionObserver(([i])=>{if(i?.isIntersecting&&!this.loading){const{page:n,count:o,wallets:t}=A.state;t.length<o&&A.fetchWalletsByPage({page:n+1})}}),this.paginationObserver.observe(e))}onConnectWallet(e){m.selectWalletConnector(e)}};ye.styles=ao;He([u()],ye.prototype,"loading",void 0);He([u()],ye.prototype,"wallets",void 0);He([u()],ye.prototype,"recommended",void 0);He([u()],ye.prototype,"featured",void 0);He([u()],ye.prototype,"filteredWallets",void 0);ye=He([h("w3m-all-wallets-list")],ye);const so=x`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;var jt=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ze=class extends w{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.query=""}render(){return this.onSearch(),this.loading?l`<wui-loading-spinner color="accent-100"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){(this.query.trim()!==this.prevQuery.trim()||this.badge!==this.prevBadge)&&(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await A.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){const{search:e}=A.state,i=je.markWalletsAsInstalled(e);return e.length?l`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","s","s","s"]}
        rowGap="l"
        columnGap="xs"
        justifyContent="space-between"
      >
        ${i.map(n=>l`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(n)}
              .wallet=${n}
              data-testid="wallet-search-item-${n.id}"
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:l`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="s"
          flexDirection="column"
        >
          <wui-icon-box
            size="lg"
            iconColor="fg-200"
            backgroundColor="fg-300"
            icon="wallet"
            background="transparent"
          ></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="fg-200" variant="paragraph-500">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(e){m.selectWalletConnector(e)}};ze.styles=so;jt([u()],ze.prototype,"loading",void 0);jt([c()],ze.prototype,"query",void 0);jt([c()],ze.prototype,"badge",void 0);ze=jt([h("w3m-all-wallets-search")],ze);var mi=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ct=class extends w{constructor(){super(...arguments),this.search="",this.onDebouncedSearch=b.debounce(e=>{this.search=e})}render(){const e=this.search.length>=2;return l`
      <wui-flex .padding=${["0","s","s","s"]} gap="xs">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge}
          @click=${this.onClick.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${e||this.badge?l`<w3m-all-wallets-search
            query=${this.search}
            badge=${p(this.badge)}
          ></w3m-all-wallets-search>`:l`<w3m-all-wallets-list badge=${p(this.badge)}></w3m-all-wallets-list>`}
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}onClick(){if(this.badge==="certified"){this.badge=void 0;return}this.badge="certified",W.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})}qrButtonTemplate(){return b.isMobile()?l`
        <wui-icon-box
          size="lg"
          iconSize="xl"
          iconColor="accent-100"
          backgroundColor="accent-100"
          icon="qrCode"
          background="transparent"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){f.push("ConnectingWalletConnect")}};mi([u()],Ct.prototype,"search",void 0);mi([u()],Ct.prototype,"badge",void 0);Ct=mi([h("w3m-all-wallets-view")],Ct);const ro=x`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 16.5px var(--wui-spacing-l) 16.5px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
    justify-content: center;
    align-items: center;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }
`;var Lt=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Me=class extends w{constructor(){super(...arguments),this.text="",this.disabled=!1,this.tabIdx=void 0}render(){return l`
      <button ?disabled=${this.disabled} tabindex=${p(this.tabIdx)}>
        <wui-text align="center" variant="paragraph-500" color="inherit">${this.text}</wui-text>
      </button>
    `}};Me.styles=[I,N,ro];Lt([c()],Me.prototype,"text",void 0);Lt([c({type:Boolean})],Me.prototype,"disabled",void 0);Lt([c()],Me.prototype,"tabIdx",void 0);Me=Lt([h("wui-list-button")],Me);const lo=x`
  wui-separator {
    margin: var(--wui-spacing-s) calc(var(--wui-spacing-s) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }

  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }

  wui-icon-link,
  wui-loading-spinner {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  wui-icon-link {
    right: var(--wui-spacing-xs);
  }

  wui-loading-spinner {
    right: var(--wui-spacing-m);
  }

  wui-text {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }
`;var qe=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ce=class extends w{constructor(){super(),this.unsubscribe=[],this.formRef=di(),this.email="",this.loading=!1,this.error="",this.remoteFeatures=v.state.remoteFeatures,this.unsubscribe.push(v.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}firstUpdated(){this.formRef.value?.addEventListener("keydown",e=>{e.key==="Enter"&&this.onSubmitEmail(e)})}render(){const e=g.hasAnyConnection($.CONNECTOR_ID.AUTH);return l`
      <form ${pi(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
        <wui-email-input
          @focus=${this.onFocusEvent.bind(this)}
          .disabled=${this.loading}
          @inputChange=${this.onEmailInputChange.bind(this)}
          tabIdx=${p(this.tabIdx)}
          ?disabled=${e}
        >
        </wui-email-input>

        ${this.submitButtonTemplate()}${this.loadingTemplate()}
        <input type="submit" hidden />
      </form>
      ${this.templateError()}
    `}submitButtonTemplate(){return!this.loading&&this.email.length>3?l`
          <wui-icon-link
            size="sm"
            icon="chevronRight"
            iconcolor="accent-100"
            @click=${this.onSubmitEmail.bind(this)}
          >
          </wui-icon-link>
        `:null}loadingTemplate(){return this.loading?l`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:null}templateError(){return this.error?l`<wui-text variant="tiny-500" color="error-100">${this.error}</wui-text>`:null}onEmailInputChange(e){this.email=e.detail.trim(),this.error=""}async onSubmitEmail(e){if(!$.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(n=>n===d.state.activeChain)){const n=d.getFirstCaipNetworkSupportsAuthConnector();if(n){f.push("SwitchNetwork",{network:n});return}}try{if(this.loading)return;this.loading=!0,e.preventDefault();const n=m.getAuthConnector();if(!n)throw new Error("w3m-email-login-widget: Auth connector not found");const{action:o}=await n.provider.connectEmail({email:this.email});if(k.sendEvent({type:"track",event:"EMAIL_SUBMITTED"}),o==="VERIFY_OTP")k.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}),f.push("EmailVerifyOtp",{email:this.email});else if(o==="VERIFY_DEVICE")f.push("EmailVerifyDevice",{email:this.email});else if(o==="CONNECT"){const t=this.remoteFeatures?.multiWallet;await g.connectExternal(n,d.state.activeChain),t?(f.replace("ProfileWallets"),W.showSuccess("New Wallet Added")):f.replace("Account")}}catch(n){b.parseError(n)?.includes("Invalid email")?this.error="Invalid email. Try again.":W.showError(n)}finally{this.loading=!1}}onFocusEvent(){k.sendEvent({type:"track",event:"EMAIL_LOGIN_SELECTED"})}};Ce.styles=lo;qe([c()],Ce.prototype,"tabIdx",void 0);qe([u()],Ce.prototype,"email",void 0);qe([u()],Ce.prototype,"loading",void 0);qe([u()],Ce.prototype,"error",void 0);qe([u()],Ce.prototype,"remoteFeatures",void 0);Ce=qe([h("w3m-email-login-widget")],Ce);const co=x`
  :host {
    display: block;
    width: 100%;
  }

  button {
    width: 100%;
    height: 56px;
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`;var Bt=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Fe=class extends w{constructor(){super(...arguments),this.logo="google",this.disabled=!1,this.tabIdx=void 0}render(){return l`
      <button ?disabled=${this.disabled} tabindex=${p(this.tabIdx)}>
        <wui-logo logo=${this.logo}></wui-logo>
      </button>
    `}};Fe.styles=[I,N,co];Bt([c()],Fe.prototype,"logo",void 0);Bt([c({type:Boolean})],Fe.prototype,"disabled",void 0);Bt([c()],Fe.prototype,"tabIdx",void 0);Fe=Bt([h("wui-logo-select")],Fe);const uo=x`
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-m)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var De=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const Li=2,Bi=6;let ge=class extends w{constructor(){super(),this.unsubscribe=[],this.walletGuide="get-started",this.tabIdx=void 0,this.connectors=m.state.connectors,this.remoteFeatures=v.state.remoteFeatures,this.authConnector=this.connectors.find(e=>e.type==="AUTH"),this.isPwaLoading=!1,this.unsubscribe.push(m.subscribeKey("connectors",e=>{this.connectors=e,this.authConnector=this.connectors.find(i=>i.type==="AUTH")}),v.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}connectedCallback(){super.connectedCallback(),this.handlePwaFrameLoad()}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return l`
      <wui-flex
        class="container"
        flexDirection="column"
        gap="xs"
        data-testid="w3m-social-login-widget"
      >
        ${this.topViewTemplate()}${this.bottomViewTemplate()}
      </wui-flex>
    `}topViewTemplate(){const e=this.walletGuide==="explore";let i=this.remoteFeatures?.socials;return!i&&e?(i=V.DEFAULT_SOCIALS,this.renderTopViewContent(i)):i?this.renderTopViewContent(i):null}renderTopViewContent(e){return e.length===2?l` <wui-flex gap="xs">
        ${e.slice(0,Li).map(i=>l`<wui-logo-select
              data-testid=${`social-selector-${i}`}
              @click=${()=>{this.onSocialClick(i)}}
              logo=${i}
              tabIdx=${p(this.tabIdx)}
              ?disabled=${this.isPwaLoading||this.hasConnection()}
            ></wui-logo-select>`)}
      </wui-flex>`:l` <wui-list-social
      data-testid=${`social-selector-${e[0]}`}
      @click=${()=>{this.onSocialClick(e[0])}}
      logo=${p(e[0])}
      align="center"
      name=${`Continue with ${e[0]}`}
      tabIdx=${p(this.tabIdx)}
      ?disabled=${this.isPwaLoading||this.hasConnection()}
    ></wui-list-social>`}bottomViewTemplate(){let e=this.remoteFeatures?.socials;const i=this.walletGuide==="explore";return(!this.authConnector||!e||e.length===0)&&i&&(e=V.DEFAULT_SOCIALS),!e||e.length<=Li?null:e&&e.length>Bi?l`<wui-flex gap="xs">
        ${e.slice(1,Bi-1).map(o=>l`<wui-logo-select
              data-testid=${`social-selector-${o}`}
              @click=${()=>{this.onSocialClick(o)}}
              logo=${o}
              tabIdx=${p(this.tabIdx)}
              ?focusable=${this.tabIdx!==void 0&&this.tabIdx>=0}
              ?disabled=${this.isPwaLoading||this.hasConnection()}
            ></wui-logo-select>`)}
        <wui-logo-select
          logo="more"
          tabIdx=${p(this.tabIdx)}
          @click=${this.onMoreSocialsClick.bind(this)}
          ?disabled=${this.isPwaLoading||this.hasConnection()}
          data-testid="social-selector-more"
        ></wui-logo-select>
      </wui-flex>`:e?l`<wui-flex gap="xs">
      ${e.slice(1,e.length).map(o=>l`<wui-logo-select
            data-testid=${`social-selector-${o}`}
            @click=${()=>{this.onSocialClick(o)}}
            logo=${o}
            tabIdx=${p(this.tabIdx)}
            ?focusable=${this.tabIdx!==void 0&&this.tabIdx>=0}
            ?disabled=${this.isPwaLoading||this.hasConnection()}
          ></wui-logo-select>`)}
    </wui-flex>`:null}onMoreSocialsClick(){f.push("ConnectSocials")}async onSocialClick(e){if(!$.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(n=>n===d.state.activeChain)){const n=d.getFirstCaipNetworkSupportsAuthConnector();if(n){f.push("SwitchNetwork",{network:n});return}}e&&await Cn(e)}async handlePwaFrameLoad(){if(b.isPWA()){this.isPwaLoading=!0;try{this.authConnector?.provider instanceof mn&&await this.authConnector.provider.init()}catch(e){bn.open({shortMessage:"Error loading embedded wallet in PWA",longMessage:e.message},"error")}finally{this.isPwaLoading=!1}}}hasConnection(){return g.hasAnyConnection($.CONNECTOR_ID.AUTH)}};ge.styles=uo;De([c()],ge.prototype,"walletGuide",void 0);De([c()],ge.prototype,"tabIdx",void 0);De([u()],ge.prototype,"connectors",void 0);De([u()],ge.prototype,"remoteFeatures",void 0);De([u()],ge.prototype,"authConnector",void 0);De([u()],ge.prototype,"isPwaLoading",void 0);ge=De([h("w3m-social-login-widget")],ge);const po=x`
  wui-flex {
    width: 100%;
  }

  .wallet-guide {
    width: 100%;
  }

  .chip-box {
    width: fit-content;
    background-color: var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }
`;var bi=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let it=class extends w{constructor(){super(...arguments),this.walletGuide="get-started"}render(){return this.walletGuide==="explore"?l`<wui-flex
          class="wallet-guide"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          rowGap="xs"
          data-testid="w3m-wallet-guide-explore"
        >
          <wui-text variant="small-400" color="fg-200" align="center">
            Looking for a self-custody wallet?
          </wui-text>

          <wui-flex class="chip-box">
            <wui-chip
              imageIcon="walletConnectLightBrown"
              icon="externalLink"
              variant="transparent"
              href="https://walletguide.walletconnect.network"
              title="Find one on WalletGuide"
            ></wui-chip>
          </wui-flex>
        </wui-flex>`:l`<wui-flex
          columnGap="4xs"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          .padding=${["s","0","s","0"]}
        >
          <wui-text variant="small-400" class="title" color="fg-200"
            >Haven't got a wallet?</wui-text
          >
          <wui-link
            data-testid="w3m-wallet-guide-get-started"
            color="blue-100"
            class="get-started-link"
            @click=${this.onGetStarted}
            tabIdx=${p(this.tabIdx)}
          >
            Get started
          </wui-link>
        </wui-flex>`}onGetStarted(){f.push("Create")}};it.styles=po;bi([c()],it.prototype,"tabIdx",void 0);bi([c()],it.prototype,"walletGuide",void 0);it=bi([h("w3m-wallet-guide")],it);const ho=x`
  :host {
    position: relative;
    border-radius: var(--wui-border-radius-xxs);
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wui-spacing-4xs);
    padding: 3.75px !important;
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host > wui-flex {
    padding: 2px;
    position: fixed;
    overflow: hidden;
    left: 34px;
    bottom: 8px;
    background: var(--dark-background-150, #1e1f1f);
    border-radius: 50%;
    z-index: 2;
    display: flex;
  }
`;var en=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const Yt=4;let $t=class extends w{constructor(){super(...arguments),this.walletImages=[]}render(){const e=this.walletImages.length<Yt;return l`${this.walletImages.slice(0,Yt).map(({src:i,walletName:n})=>l`
            <wui-wallet-image
              size="inherit"
              imageSrc=${i}
              name=${p(n)}
            ></wui-wallet-image>
          `)}
      ${e?[...Array(Yt-this.walletImages.length)].map(()=>l` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`):null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`}};$t.styles=[I,ho];en([c({type:Array})],$t.prototype,"walletImages",void 0);$t=en([h("wui-all-wallets-image")],$t);const wo=x`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }

  wui-icon {
    color: var(--wui-color-fg-200) !important;
  }
`;var X=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let L=class extends w{constructor(){super(...arguments),this.walletImages=[],this.imageSrc="",this.name="",this.tabIdx=void 0,this.installed=!1,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100"}render(){return l`
      <button ?disabled=${this.disabled} tabindex=${p(this.tabIdx)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `}templateAllWallets(){return this.showAllWallets&&this.imageSrc?l` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `:this.showAllWallets&&this.walletIcon?l` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `:null}templateWalletImage(){return!this.showAllWallets&&this.imageSrc?l`<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`:!this.showAllWallets&&!this.imageSrc?l`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`:null}templateStatus(){return this.loading?l`<wui-loading-spinner
        size="lg"
        color=${this.loadingSpinnerColor}
      ></wui-loading-spinner>`:this.tagLabel&&this.tagVariant?l`<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`:this.icon?l`<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`:null}};L.styles=[I,N,wo];X([c({type:Array})],L.prototype,"walletImages",void 0);X([c()],L.prototype,"imageSrc",void 0);X([c()],L.prototype,"name",void 0);X([c()],L.prototype,"tagLabel",void 0);X([c()],L.prototype,"tagVariant",void 0);X([c()],L.prototype,"icon",void 0);X([c()],L.prototype,"walletIcon",void 0);X([c()],L.prototype,"tabIdx",void 0);X([c({type:Boolean})],L.prototype,"installed",void 0);X([c({type:Boolean})],L.prototype,"disabled",void 0);X([c({type:Boolean})],L.prototype,"showAllWallets",void 0);X([c({type:Boolean})],L.prototype,"loading",void 0);X([c({type:String})],L.prototype,"loadingSpinnerColor",void 0);L=X([h("wui-list-wallet")],L);var Ye=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ne=class extends w{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=m.state.connectors,this.count=A.state.count,this.filteredCount=A.state.filteredWallets.length,this.isFetchingRecommendedWallets=A.state.isFetchingRecommendedWallets,this.unsubscribe.push(m.subscribeKey("connectors",e=>this.connectors=e),A.subscribeKey("count",e=>this.count=e),A.subscribeKey("filteredWallets",e=>this.filteredCount=e.length),A.subscribeKey("isFetchingRecommendedWallets",e=>this.isFetchingRecommendedWallets=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.find(E=>E.id==="walletConnect"),{allWallets:i}=v.state;if(!e||i==="HIDE"||i==="ONLY_MOBILE"&&!b.isMobile())return null;const n=A.state.featured.length,o=this.count+n,t=o<10?o:Math.floor(o/10)*10,a=this.filteredCount>0?this.filteredCount:t;let r=`${a}`;this.filteredCount>0?r=`${this.filteredCount}`:a<o&&(r=`${a}+`);const y=g.hasAnyConnection($.CONNECTOR_ID.WALLET_CONNECT);return l`
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${r}
        tagVariant="shade"
        data-testid="all-wallets"
        tabIdx=${p(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        loadingSpinnerColor=${this.isFetchingRecommendedWallets?"fg-300":"accent-100"}
        ?disabled=${y}
      ></wui-list-wallet>
    `}onAllWallets(){k.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),f.push("AllWallets")}};Ye([c()],Ne.prototype,"tabIdx",void 0);Ye([u()],Ne.prototype,"connectors",void 0);Ye([u()],Ne.prototype,"count",void 0);Ye([u()],Ne.prototype,"filteredCount",void 0);Ye([u()],Ne.prototype,"isFetchingRecommendedWallets",void 0);Ne=Ye([h("w3m-all-wallets-widget")],Ne);var Ut=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let nt=class extends w{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=m.state.connectors,this.connections=g.state.connections,this.unsubscribe.push(m.subscribeKey("connectors",e=>this.connectors=e),g.subscribeKey("connections",e=>this.connections=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.filter(i=>i.type==="ANNOUNCED");return e?.length?l`
      <wui-flex flexDirection="column" gap="xs">
        ${e.filter(_e.showConnector).map(i=>{const o=(this.connections.get(i.chain)??[]).some(t=>Q.isLowerCaseMatch(t.connectorId,i.id));return l`
            <wui-list-wallet
              imageSrc=${p(S.getConnectorImage(i))}
              name=${i.name??"Unknown"}
              @click=${()=>this.onConnector(i)}
              tagVariant=${o?"shade":"success"}
              tagLabel=${o?"connected":"installed"}
              data-testid=${`wallet-selector-${i.id}`}
              .installed=${!0}
              tabIdx=${p(this.tabIdx)}
            >
            </wui-list-wallet>
          `})}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){e.id==="walletConnect"?b.isMobile()?f.push("AllWallets"):f.push("ConnectingWalletConnect"):f.push("ConnectingExternal",{connector:e})}};Ut([c()],nt.prototype,"tabIdx",void 0);Ut([u()],nt.prototype,"connectors",void 0);Ut([u()],nt.prototype,"connections",void 0);nt=Ut([h("w3m-connect-announced-widget")],nt);var zt=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ot=class extends w{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=m.state.connectors,this.loading=!1,this.unsubscribe.push(m.subscribeKey("connectors",e=>this.connectors=e)),b.isTelegram()&&b.isIos()&&(this.loading=!g.state.wcUri,this.unsubscribe.push(g.subscribeKey("wcUri",e=>this.loading=!e)))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{customWallets:e}=v.state;if(!e?.length)return this.style.cssText="display: none",null;const i=this.filterOutDuplicateWallets(e),n=g.hasAnyConnection($.CONNECTOR_ID.WALLET_CONNECT);return l`<wui-flex flexDirection="column" gap="xs">
      ${i.map(o=>l`
          <wui-list-wallet
            imageSrc=${p(S.getWalletImage(o))}
            name=${o.name??"Unknown"}
            @click=${()=>this.onConnectWallet(o)}
            data-testid=${`wallet-selector-${o.id}`}
            tabIdx=${p(this.tabIdx)}
            ?loading=${this.loading}
            ?disabled=${n}
          >
          </wui-list-wallet>
        `)}
    </wui-flex>`}filterOutDuplicateWallets(e){const i=re.getRecentWallets(),n=this.connectors.map(r=>r.info?.rdns).filter(Boolean),o=i.map(r=>r.rdns).filter(Boolean),t=n.concat(o);if(t.includes("io.metamask.mobile")&&b.isMobile()){const r=t.indexOf("io.metamask.mobile");t[r]="io.metamask"}return e.filter(r=>!t.includes(String(r?.rdns)))}onConnectWallet(e){this.loading||f.push("ConnectingWalletConnect",{wallet:e})}};zt([c()],ot.prototype,"tabIdx",void 0);zt([u()],ot.prototype,"connectors",void 0);zt([u()],ot.prototype,"loading",void 0);ot=zt([h("w3m-connect-custom-widget")],ot);var gi=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let St=class extends w{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=m.state.connectors,this.unsubscribe.push(m.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const n=this.connectors.filter(t=>t.type==="EXTERNAL").filter(_e.showConnector).filter(t=>t.id!==$.CONNECTOR_ID.COINBASE_SDK);if(!n?.length)return this.style.cssText="display: none",null;const o=g.hasAnyConnection($.CONNECTOR_ID.WALLET_CONNECT);return l`
      <wui-flex flexDirection="column" gap="xs">
        ${n.map(t=>l`
            <wui-list-wallet
              imageSrc=${p(S.getConnectorImage(t))}
              .installed=${!0}
              name=${t.name??"Unknown"}
              data-testid=${`wallet-selector-external-${t.id}`}
              @click=${()=>this.onConnector(t)}
              tabIdx=${p(this.tabIdx)}
              ?disabled=${o}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnector(e){f.push("ConnectingExternal",{connector:e})}};gi([c()],St.prototype,"tabIdx",void 0);gi([u()],St.prototype,"connectors",void 0);St=gi([h("w3m-connect-external-widget")],St);var vi=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let kt=class extends w{constructor(){super(...arguments),this.tabIdx=void 0,this.wallets=[]}render(){if(!this.wallets.length)return this.style.cssText="display: none",null;const e=g.hasAnyConnection($.CONNECTOR_ID.WALLET_CONNECT);return l`
      <wui-flex flexDirection="column" gap="xs">
        ${this.wallets.map(i=>l`
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${i.id}`}
              imageSrc=${p(S.getWalletImage(i))}
              name=${i.name??"Unknown"}
              @click=${()=>this.onConnectWallet(i)}
              tabIdx=${p(this.tabIdx)}
              ?disabled=${e}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnectWallet(e){m.selectWalletConnector(e)}};vi([c()],kt.prototype,"tabIdx",void 0);vi([c()],kt.prototype,"wallets",void 0);kt=vi([h("w3m-connect-featured-widget")],kt);var Mt=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let at=class extends w{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=[],this.connections=g.state.connections,this.unsubscribe.push(g.subscribeKey("connections",e=>this.connections=e))}render(){const e=this.connectors.filter(_e.showConnector);return e.length===0?(this.style.cssText="display: none",null):l`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(i=>{const o=(this.connections.get(i.chain)??[]).some(t=>Q.isLowerCaseMatch(t.connectorId,i.id));return l`
            <wui-list-wallet
              imageSrc=${p(S.getConnectorImage(i))}
              .installed=${!0}
              name=${i.name??"Unknown"}
              tagVariant=${o?"shade":"success"}
              tagLabel=${o?"connected":"installed"}
              data-testid=${`wallet-selector-${i.id}`}
              @click=${()=>this.onConnector(i)}
              tabIdx=${p(this.tabIdx)}
            >
            </wui-list-wallet>
          `})}
      </wui-flex>
    `}onConnector(e){m.setActiveConnector(e),f.push("ConnectingExternal",{connector:e})}};Mt([c()],at.prototype,"tabIdx",void 0);Mt([c()],at.prototype,"connectors",void 0);Mt([u()],at.prototype,"connections",void 0);at=Mt([h("w3m-connect-injected-widget")],at);var xi=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let At=class extends w{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=m.state.connectors,this.unsubscribe.push(m.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.filter(i=>i.type==="MULTI_CHAIN"&&i.name!=="WalletConnect");return e?.length?l`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(i=>l`
            <wui-list-wallet
              imageSrc=${p(S.getConnectorImage(i))}
              .installed=${!0}
              name=${i.name??"Unknown"}
              tagVariant="shade"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${i.id}`}
              @click=${()=>this.onConnector(i)}
              tabIdx=${p(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){m.setActiveConnector(e),f.push("ConnectingMultiChain")}};xi([c()],At.prototype,"tabIdx",void 0);xi([u()],At.prototype,"connectors",void 0);At=xi([h("w3m-connect-multi-chain-widget")],At);var Ft=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let st=class extends w{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=m.state.connectors,this.loading=!1,this.unsubscribe.push(m.subscribeKey("connectors",e=>this.connectors=e)),b.isTelegram()&&b.isIos()&&(this.loading=!g.state.wcUri,this.unsubscribe.push(g.subscribeKey("wcUri",e=>this.loading=!e)))}render(){const i=re.getRecentWallets().filter(o=>!je.isExcluded(o)).filter(o=>!this.hasWalletConnector(o)).filter(o=>this.isWalletCompatibleWithCurrentChain(o));if(!i.length)return this.style.cssText="display: none",null;const n=g.hasAnyConnection($.CONNECTOR_ID.WALLET_CONNECT);return l`
      <wui-flex flexDirection="column" gap="xs">
        ${i.map(o=>l`
            <wui-list-wallet
              imageSrc=${p(S.getWalletImage(o))}
              name=${o.name??"Unknown"}
              @click=${()=>this.onConnectWallet(o)}
              tagLabel="recent"
              tagVariant="shade"
              tabIdx=${p(this.tabIdx)}
              ?loading=${this.loading}
              ?disabled=${n}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnectWallet(e){this.loading||m.selectWalletConnector(e)}hasWalletConnector(e){return this.connectors.some(i=>i.id===e.id||i.name===e.name)}isWalletCompatibleWithCurrentChain(e){const i=d.state.activeChain;return i&&e.chains?e.chains.some(n=>{const o=n.split(":")[0];return i===o}):!0}};Ft([c()],st.prototype,"tabIdx",void 0);Ft([u()],st.prototype,"connectors",void 0);Ft([u()],st.prototype,"loading",void 0);st=Ft([h("w3m-connect-recent-widget")],st);var Vt=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let rt=class extends w{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.wallets=[],this.loading=!1,b.isTelegram()&&b.isIos()&&(this.loading=!g.state.wcUri,this.unsubscribe.push(g.subscribeKey("wcUri",e=>this.loading=!e)))}render(){const{connectors:e}=m.state,{customWallets:i,featuredWalletIds:n}=v.state,o=re.getRecentWallets(),t=e.find(T=>T.id==="walletConnect"),r=e.filter(T=>T.type==="INJECTED"||T.type==="ANNOUNCED"||T.type==="MULTI_CHAIN").filter(T=>T.name!=="Browser Wallet");if(!t)return null;if(n||i||!this.wallets.length)return this.style.cssText="display: none",null;const y=r.length+o.length,E=Math.max(0,2-y),_=je.filterOutDuplicateWallets(this.wallets).slice(0,E);if(!_.length)return this.style.cssText="display: none",null;const M=g.hasAnyConnection($.CONNECTOR_ID.WALLET_CONNECT);return l`
      <wui-flex flexDirection="column" gap="xs">
        ${_.map(T=>l`
            <wui-list-wallet
              imageSrc=${p(S.getWalletImage(T))}
              name=${T?.name??"Unknown"}
              @click=${()=>this.onConnectWallet(T)}
              tabIdx=${p(this.tabIdx)}
              ?loading=${this.loading}
              ?disabled=${M}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnectWallet(e){if(this.loading)return;const i=m.getConnector(e.id,e.rdns);i?f.push("ConnectingExternal",{connector:i}):f.push("ConnectingWalletConnect",{wallet:e})}};Vt([c()],rt.prototype,"tabIdx",void 0);Vt([c()],rt.prototype,"wallets",void 0);Vt([u()],rt.prototype,"loading",void 0);rt=Vt([h("w3m-connect-recommended-widget")],rt);var Gt=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let lt=class extends w{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=m.state.connectors,this.connectorImages=We.state.connectorImages,this.unsubscribe.push(m.subscribeKey("connectors",e=>this.connectors=e),We.subscribeKey("connectorImages",e=>this.connectorImages=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(b.isMobile())return this.style.cssText="display: none",null;const e=this.connectors.find(o=>o.id==="walletConnect");if(!e)return this.style.cssText="display: none",null;const i=e.imageUrl||this.connectorImages[e?.imageId??""],n=g.hasAnyConnection($.CONNECTOR_ID.WALLET_CONNECT);return l`
      <wui-list-wallet
        imageSrc=${p(i)}
        name=${e.name??"Unknown"}
        @click=${()=>this.onConnector(e)}
        tagLabel="qr code"
        tagVariant="main"
        tabIdx=${p(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
        ?disabled=${n}
      >
      </wui-list-wallet>
    `}onConnector(e){m.setActiveConnector(e),f.push("ConnectingWalletConnect")}};Gt([c()],lt.prototype,"tabIdx",void 0);Gt([u()],lt.prototype,"connectors",void 0);Gt([u()],lt.prototype,"connectorImages",void 0);lt=Gt([h("w3m-connect-walletconnect-widget")],lt);const fo=x`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var ht=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Re=class extends w{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=m.state.connectors,this.recommended=A.state.recommended,this.featured=A.state.featured,this.unsubscribe.push(m.subscribeKey("connectors",e=>this.connectors=e),A.subscribeKey("recommended",e=>this.recommended=e),A.subscribeKey("featured",e=>this.featured=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return l`
      <wui-flex flexDirection="column" gap="xs"> ${this.connectorListTemplate()} </wui-flex>
    `}connectorListTemplate(){const{custom:e,recent:i,announced:n,injected:o,multiChain:t,recommended:a,featured:r,external:y}=_e.getConnectorsByType(this.connectors,this.recommended,this.featured);return _e.getConnectorTypeOrder({custom:e,recent:i,announced:n,injected:o,multiChain:t,recommended:a,featured:r,external:y}).map(_=>{switch(_){case"injected":return l`
            ${t.length?l`<w3m-connect-multi-chain-widget
                  tabIdx=${p(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>`:null}
            ${n.length?l`<w3m-connect-announced-widget
                  tabIdx=${p(this.tabIdx)}
                ></w3m-connect-announced-widget>`:null}
            ${o.length?l`<w3m-connect-injected-widget
                  .connectors=${o}
                  tabIdx=${p(this.tabIdx)}
                ></w3m-connect-injected-widget>`:null}
          `;case"walletConnect":return l`<w3m-connect-walletconnect-widget
            tabIdx=${p(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;case"recent":return l`<w3m-connect-recent-widget
            tabIdx=${p(this.tabIdx)}
          ></w3m-connect-recent-widget>`;case"featured":return l`<w3m-connect-featured-widget
            .wallets=${r}
            tabIdx=${p(this.tabIdx)}
          ></w3m-connect-featured-widget>`;case"custom":return l`<w3m-connect-custom-widget
            tabIdx=${p(this.tabIdx)}
          ></w3m-connect-custom-widget>`;case"external":return l`<w3m-connect-external-widget
            tabIdx=${p(this.tabIdx)}
          ></w3m-connect-external-widget>`;case"recommended":return l`<w3m-connect-recommended-widget
            .wallets=${a}
            tabIdx=${p(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;default:return console.warn(`Unknown connector type: ${_}`),null}})}};Re.styles=fo;ht([c()],Re.prototype,"tabIdx",void 0);ht([u()],Re.prototype,"connectors",void 0);ht([u()],Re.prototype,"recommended",void 0);ht([u()],Re.prototype,"featured",void 0);Re=ht([h("w3m-connector-list")],Re);var tn=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ni=class extends w{constructor(){super(...arguments),this.tabIdx=void 0}render(){return l`
      <wui-flex flexDirection="column" gap="xs">
        <w3m-connector-list tabIdx=${p(this.tabIdx)}></w3m-connector-list>
        <w3m-all-wallets-widget tabIdx=${p(this.tabIdx)}></w3m-all-wallets-widget>
      </wui-flex>
    `}};tn([c()],ni.prototype,"tabIdx",void 0);ni=tn([h("w3m-wallet-login-list")],ni);const mo=x`
  :host {
    --connect-scroll--top-opacity: 0;
    --connect-scroll--bottom-opacity: 0;
    --connect-mask-image: none;
  }

  .connect {
    max-height: clamp(360px, 470px, 80vh);
    scrollbar-width: none;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    mask-image: var(--connect-mask-image);
  }

  .guide {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  .connect::-webkit-scrollbar {
    display: none;
  }

  .all-wallets {
    flex-flow: column;
  }

  .connect.disabled,
  .guide.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }

  wui-separator {
    margin: var(--wui-spacing-s) calc(var(--wui-spacing-s) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var ae=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const bo=470;let H=class extends w{constructor(){super(),this.unsubscribe=[],this.connectors=m.state.connectors,this.authConnector=this.connectors.find(e=>e.type==="AUTH"),this.features=v.state.features,this.remoteFeatures=v.state.remoteFeatures,this.enableWallets=v.state.enableWallets,this.noAdapters=d.state.noAdapters,this.walletGuide="get-started",this.checked=bt.state.isLegalCheckboxChecked,this.isEmailEnabled=this.remoteFeatures?.email&&!d.state.noAdapters,this.isSocialEnabled=this.remoteFeatures?.socials&&this.remoteFeatures.socials.length>0&&!d.state.noAdapters,this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors),this.unsubscribe.push(m.subscribeKey("connectors",e=>{this.connectors=e,this.authConnector=this.connectors.find(i=>i.type==="AUTH"),this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors)}),v.subscribeKey("features",e=>{this.features=e}),v.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e,this.setEmailAndSocialEnableCheck(this.noAdapters,this.remoteFeatures)}),v.subscribeKey("enableWallets",e=>this.enableWallets=e),d.subscribeKey("noAdapters",e=>this.setEmailAndSocialEnableCheck(e,this.remoteFeatures)),bt.subscribeKey("isLegalCheckboxChecked",e=>this.checked=e))}disconnectedCallback(){this.unsubscribe.forEach(i=>i()),this.resizeObserver?.disconnect(),this.shadowRoot?.querySelector(".connect")?.removeEventListener("scroll",this.handleConnectListScroll.bind(this))}firstUpdated(){const e=this.shadowRoot?.querySelector(".connect");e&&(requestAnimationFrame(this.handleConnectListScroll.bind(this)),e?.addEventListener("scroll",this.handleConnectListScroll.bind(this)),this.resizeObserver=new ResizeObserver(()=>{this.handleConnectListScroll()}),this.resizeObserver?.observe(e),this.handleConnectListScroll())}render(){const{termsConditionsUrl:e,privacyPolicyUrl:i}=v.state,n=v.state.features?.legalCheckbox,a=!!(e||i)&&!!n&&this.walletGuide==="get-started"&&!this.checked,r={connect:!0,disabled:a},y=v.state.enableWalletGuide,E=this.enableWallets,_=this.isSocialEnabled||this.authConnector,M=a?-1:void 0;return l`
      <wui-flex flexDirection="column">
        ${this.legalCheckboxTemplate()}
        <wui-flex
          data-testid="w3m-connect-scroll-view"
          flexDirection="column"
          class=${Qt(r)}
        >
          <wui-flex
            class="connect-methods"
            flexDirection="column"
            gap="s"
            .padding=${_&&E&&y&&this.walletGuide==="get-started"?["3xs","s","0","s"]:["3xs","s","s","s"]}
          >
            ${this.renderConnectMethod(M)}
          </wui-flex>
        </wui-flex>
        ${this.guideTemplate(a)}
        <w3m-legal-footer></w3m-legal-footer>
      </wui-flex>
    `}setEmailAndSocialEnableCheck(e,i){this.isEmailEnabled=i?.email&&!e,this.isSocialEnabled=i?.socials&&i.socials.length>0&&!e,this.remoteFeatures=i,this.noAdapters=e}checkIfAuthEnabled(e){const i=e.filter(o=>o.type===gn.CONNECTOR_TYPE_AUTH).map(o=>o.chain);return $.AUTH_CONNECTOR_SUPPORTED_CHAINS.some(o=>i.includes(o))}renderConnectMethod(e){const i=je.getConnectOrderMethod(this.features,this.connectors);return l`${i.map((n,o)=>{switch(n){case"email":return l`${this.emailTemplate(e)} ${this.separatorTemplate(o,"email")}`;case"social":return l`${this.socialListTemplate(e)}
          ${this.separatorTemplate(o,"social")}`;case"wallet":return l`${this.walletListTemplate(e)}
          ${this.separatorTemplate(o,"wallet")}`;default:return null}})}`}checkMethodEnabled(e){switch(e){case"wallet":return this.enableWallets;case"social":return this.isSocialEnabled&&this.isAuthEnabled;case"email":return this.isEmailEnabled&&this.isAuthEnabled;default:return null}}checkIsThereNextMethod(e){const n=je.getConnectOrderMethod(this.features,this.connectors)[e+1];return n?this.checkMethodEnabled(n)?n:this.checkIsThereNextMethod(e+1):void 0}separatorTemplate(e,i){const n=this.checkIsThereNextMethod(e),o=this.walletGuide==="explore";switch(i){case"wallet":return this.enableWallets&&n&&!o?l`<wui-separator data-testid="wui-separator" text="or"></wui-separator>`:null;case"email":{const t=n==="social";return this.isAuthEnabled&&this.isEmailEnabled&&!t&&n?l`<wui-separator
              data-testid="w3m-email-login-or-separator"
              text="or"
            ></wui-separator>`:null}case"social":{const t=n==="email";return this.isAuthEnabled&&this.isSocialEnabled&&!t&&n?l`<wui-separator data-testid="wui-separator" text="or"></wui-separator>`:null}default:return null}}emailTemplate(e){return!this.isEmailEnabled||!this.isAuthEnabled?null:l`<w3m-email-login-widget
      walletGuide=${this.walletGuide}
      tabIdx=${p(e)}
    ></w3m-email-login-widget>`}socialListTemplate(e){return!this.isSocialEnabled||!this.isAuthEnabled?null:l`<w3m-social-login-widget
      walletGuide=${this.walletGuide}
      tabIdx=${p(e)}
    ></w3m-social-login-widget>`}walletListTemplate(e){const i=this.enableWallets,n=this.features?.emailShowWallets===!1,o=this.features?.collapseWallets,t=n||o;return!i||(b.isTelegram()&&(b.isSafari()||b.isIos())&&g.connectWalletConnect().catch(r=>({})),this.walletGuide==="explore")?null:this.isAuthEnabled&&(this.isEmailEnabled||this.isSocialEnabled)&&t?l`<wui-list-button
        data-testid="w3m-collapse-wallets-button"
        tabIdx=${p(e)}
        @click=${this.onContinueWalletClick.bind(this)}
        text="Continue with a wallet"
      ></wui-list-button>`:l`<w3m-wallet-login-list tabIdx=${p(e)}></w3m-wallet-login-list>`}guideTemplate(e=!1){if(!v.state.enableWalletGuide)return null;const n={guide:!0,disabled:e},o=e?-1:void 0;return!this.authConnector&&!this.isSocialEnabled?null:l`
      ${this.walletGuide==="explore"&&!d.state.noAdapters?l`<wui-separator data-testid="wui-separator" id="explore" text="or"></wui-separator>`:null}
      <w3m-wallet-guide
        class=${Qt(n)}
        tabIdx=${p(o)}
        walletGuide=${this.walletGuide}
      ></w3m-wallet-guide>
    `}legalCheckboxTemplate(){return this.walletGuide==="explore"?null:l`<w3m-legal-checkbox data-testid="w3m-legal-checkbox"></w3m-legal-checkbox>`}handleConnectListScroll(){const e=this.shadowRoot?.querySelector(".connect");if(!e)return;e.scrollHeight>bo?(e.style.setProperty("--connect-mask-image",`linear-gradient(
          to bottom,
          rgba(0, 0, 0, calc(1 - var(--connect-scroll--top-opacity))) 0px,
          rgba(200, 200, 200, calc(1 - var(--connect-scroll--top-opacity))) 1px,
          black 40px,
          black calc(100% - 40px),
          rgba(155, 155, 155, calc(1 - var(--connect-scroll--bottom-opacity))) calc(100% - 1px),
          rgba(0, 0, 0, calc(1 - var(--connect-scroll--bottom-opacity))) 100%
        )`),e.style.setProperty("--connect-scroll--top-opacity",mt.interpolate([0,50],[0,1],e.scrollTop).toString()),e.style.setProperty("--connect-scroll--bottom-opacity",mt.interpolate([0,50],[0,1],e.scrollHeight-e.scrollTop-e.offsetHeight).toString())):(e.style.setProperty("--connect-mask-image","none"),e.style.setProperty("--connect-scroll--top-opacity","0"),e.style.setProperty("--connect-scroll--bottom-opacity","0"))}onContinueWalletClick(){f.push("ConnectWallets")}};H.styles=mo;ae([u()],H.prototype,"connectors",void 0);ae([u()],H.prototype,"authConnector",void 0);ae([u()],H.prototype,"features",void 0);ae([u()],H.prototype,"remoteFeatures",void 0);ae([u()],H.prototype,"enableWallets",void 0);ae([u()],H.prototype,"noAdapters",void 0);ae([c()],H.prototype,"walletGuide",void 0);ae([u()],H.prototype,"checked",void 0);ae([u()],H.prototype,"isEmailEnabled",void 0);ae([u()],H.prototype,"isSocialEnabled",void 0);ae([u()],H.prototype,"isAuthEnabled",void 0);H=ae([h("w3m-connect-view")],H);const go=x`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`;var Kt=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ve=class extends w{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return l`
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${["1xs","2l","1xs","2l"]}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `}};Ve.styles=[I,N,go];Kt([c({type:Boolean})],Ve.prototype,"disabled",void 0);Kt([c()],Ve.prototype,"label",void 0);Kt([c()],Ve.prototype,"buttonLabel",void 0);Ve=Kt([h("wui-cta-button")],Ve);const vo=x`
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`;var nn=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let It=class extends w{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;const{name:e,app_store:i,play_store:n,chrome_store:o,homepage:t}=this.wallet,a=b.isMobile(),r=b.isIos(),y=b.isAndroid(),E=[i,n,t,o].filter(Boolean).length>1,_=F.getTruncateString({string:e,charsStart:12,charsEnd:0,truncate:"end"});return E&&!a?l`
        <wui-cta-button
          label=${`Don't have ${_}?`}
          buttonLabel="Get"
          @click=${()=>f.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!E&&t?l`
        <wui-cta-button
          label=${`Don't have ${_}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:i&&r?l`
        <wui-cta-button
          label=${`Don't have ${_}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:n&&y?l`
        <wui-cta-button
          label=${`Don't have ${_}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){this.wallet?.app_store&&b.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&b.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&b.openHref(this.wallet.homepage,"_blank")}};It.styles=[vo];nn([c({type:Object})],It.prototype,"wallet",void 0);It=nn([h("w3m-mobile-download-links")],It);const xo=x`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-2);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }
`;var pe=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};class O extends w{constructor(){super(),this.wallet=f.state.data?.wallet,this.connector=f.state.data?.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=S.getWalletImage(this.wallet)??S.getConnectorImage(this.connector),this.name=this.wallet?.name??this.connector?.name??"Wallet",this.isRetrying=!1,this.uri=g.state.wcUri,this.error=g.state.wcError,this.ready=!1,this.showRetry=!1,this.label=void 0,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(g.subscribeKey("wcUri",e=>{this.uri=e,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,this.onConnect?.())}),g.subscribeKey("wcError",e=>this.error=e)),(b.isTelegram()||b.isSafari())&&b.isIos()&&g.state.wcUri&&this.onConnect?.()}firstUpdated(){this.onAutoConnect?.(),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),g.setWcError(!1),clearTimeout(this.timeout)}render(){this.onRender?.(),this.onShowRetry();const e=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel;let i="";return this.label?i=this.label:(i=`Continue in ${this.name}`,this.error&&(i="Connection declined")),l`
      <wui-flex
        data-error=${p(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${p(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text
            align="center"
            variant="paragraph-500"
            color=${this.error?"error-100":"fg-100"}
          >
            ${i}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${e}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?l`
              <wui-button
                variant="accent"
                size="md"
                ?disabled=${this.isRetrying||this.isLoading}
                @click=${this.onTryAgain.bind(this)}
                data-testid="w3m-connecting-widget-secondary-button"
              >
                <wui-icon color="inherit" slot="iconLeft" name=${this.secondaryBtnIcon}></wui-icon>
                ${this.secondaryBtnLabel}
              </wui-button>
            `:null}
      </wui-flex>

      ${this.isWalletConnect?l`
            <wui-flex .padding=${["0","xl","xl","xl"]} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200" data-testid="wui-link-copy">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onShowRetry(){this.error&&!this.showRetry&&(this.showRetry=!0,this.shadowRoot?.querySelector("wui-button")?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"}))}onTryAgain(){g.setWcError(!1),this.onRetry?(this.isRetrying=!0,this.onRetry?.()):this.onConnect?.()}loaderTemplate(){const e=Xt.state.themeVariables["--w3m-border-radius-master"],i=e?parseInt(e.replace("px",""),10):4;return l`<wui-loading-thumbnail radius=${i*9}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(b.copyToClopboard(this.uri),W.showSuccess("Link copied"))}catch{W.showError("Failed to copy")}}}O.styles=xo;pe([u()],O.prototype,"isRetrying",void 0);pe([u()],O.prototype,"uri",void 0);pe([u()],O.prototype,"error",void 0);pe([u()],O.prototype,"ready",void 0);pe([u()],O.prototype,"showRetry",void 0);pe([u()],O.prototype,"label",void 0);pe([u()],O.prototype,"secondaryBtnLabel",void 0);pe([u()],O.prototype,"secondaryLabel",void 0);pe([u()],O.prototype,"isLoading",void 0);pe([c({type:Boolean})],O.prototype,"isMobile",void 0);pe([c()],O.prototype,"onRetry",void 0);var yo=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ui=class extends O{constructor(){if(super(),this.externalViewUnsubscribe=[],this.connectionsByNamespace=g.getConnections(this.connector?.chain),this.hasMultipleConnections=this.connectionsByNamespace.length>0,this.remoteFeatures=v.state.remoteFeatures,this.currentActiveConnectorId=m.state.activeConnectorIds[this.connector?.chain],!this.connector)throw new Error("w3m-connecting-view: No connector provided");const e=this.connector?.chain;this.isAlreadyConnected(this.connector)&&(this.secondaryBtnLabel=void 0,this.label=`This account is already linked, change your account in ${this.connector.name}`,this.secondaryLabel=`To link a new account, open ${this.connector.name} and switch to the account you want to link`),k.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.connector.name??"Unknown",platform:"browser"}}),this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),this.isWalletConnect=!1,this.externalViewUnsubscribe.push(m.subscribeKey("activeConnectorIds",i=>{const n=i[e],o=this.remoteFeatures?.multiWallet;n!==this.currentActiveConnectorId&&(this.hasMultipleConnections&&o?(f.replace("ProfileWallets"),W.showSuccess("New Wallet Added")):P.close())}),g.subscribeKey("connections",this.onConnectionsChange.bind(this)))}disconnectedCallback(){this.externalViewUnsubscribe.forEach(e=>e())}async onConnectProxy(){try{if(this.error=!1,this.connector){if(this.isAlreadyConnected(this.connector))return;(this.connector.id!==$.CONNECTOR_ID.COINBASE_SDK||!this.error)&&(await g.connectExternal(this.connector,this.connector.chain),k.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:this.connector.name||"Unknown",caipNetworkId:d.getActiveCaipNetwork()?.caipNetworkId}}))}}catch(e){k.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),this.error=!0}}onConnectionsChange(e){if(this.connector?.chain&&e.get(this.connector.chain)&&this.isAlreadyConnected(this.connector)){const i=e.get(this.connector.chain)??[],n=this.remoteFeatures?.multiWallet;if(i.length===0)f.replace("Connect");else{const o=Ee.getConnectionsByConnectorId(this.connectionsByNamespace,this.connector.id).flatMap(a=>a.accounts),t=Ee.getConnectionsByConnectorId(i,this.connector.id).flatMap(a=>a.accounts);t.length===0?this.hasMultipleConnections&&n?(f.replace("ProfileWallets"),W.showSuccess("Wallet deleted")):P.close():!o.every(r=>t.some(y=>Q.isLowerCaseMatch(r.address,y.address)))&&n&&f.replace("ProfileWallets")}}}isAlreadyConnected(e){return!!e&&this.connectionsByNamespace.some(i=>Q.isLowerCaseMatch(i.connectorId,e.id))}};Ui=yo([h("w3m-connecting-external-view")],Ui);const Co=x`
  wui-flex,
  wui-list-wallet {
    width: 100%;
  }
`;var on=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Et=class extends w{constructor(){super(),this.unsubscribe=[],this.activeConnector=m.state.activeConnector,this.unsubscribe.push(m.subscribeKey("activeConnector",e=>this.activeConnector=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["m","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image
            size="lg"
            imageSrc=${p(S.getConnectorImage(this.activeConnector))}
          ></wui-wallet-image>
        </wui-flex>
        <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="xs"
          .padding=${["0","s","0","s"]}
        >
          <wui-text variant="paragraph-500" color="fg-100">
            Select Chain for ${this.activeConnector?.name}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200"
            >Select which chain to connect to your multi chain wallet</wui-text
          >
        </wui-flex>
        <wui-flex
          flexGrow="1"
          flexDirection="column"
          alignItems="center"
          gap="xs"
          .padding=${["xs","0","xs","0"]}
        >
          ${this.networksTemplate()}
        </wui-flex>
      </wui-flex>
    `}networksTemplate(){return this.activeConnector?.connectors?.map(e=>e.name?l`
            <wui-list-wallet
              imageSrc=${p(S.getChainImage(e.chain))}
              name=${$.CHAIN_NAME_MAP[e.chain]}
              @click=${()=>this.onConnector(e)}
              data-testid="wui-list-chain-${e.chain}"
            ></wui-list-wallet>
          `:null)}onConnector(e){const i=this.activeConnector?.connectors?.find(n=>n.chain===e.chain);if(!i){W.showError("Failed to find connector");return}i.id==="walletConnect"?b.isMobile()?f.push("AllWallets"):f.push("ConnectingWalletConnect"):f.push("ConnectingExternal",{connector:i})}};Et.styles=Co;on([u()],Et.prototype,"activeConnector",void 0);Et=on([h("w3m-connecting-multi-chain-view")],Et);var yi=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Wt=class extends w{constructor(){super(...arguments),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.generateTabs();return l`
      <wui-flex justifyContent="center" .padding=${["0","0","l","0"]}>
        <wui-tabs .tabs=${e} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `}generateTabs(){const e=this.platforms.map(i=>i==="browser"?{label:"Browser",icon:"extension",platform:"browser"}:i==="mobile"?{label:"Mobile",icon:"mobile",platform:"mobile"}:i==="qrcode"?{label:"Mobile",icon:"mobile",platform:"qrcode"}:i==="web"?{label:"Webapp",icon:"browser",platform:"web"}:i==="desktop"?{label:"Desktop",icon:"desktop",platform:"desktop"}:{label:"Browser",icon:"extension",platform:"unsupported"});return this.platformTabs=e.map(({platform:i})=>i),e}onTabChange(e){const i=this.platformTabs[e];i&&this.onSelectPlatfrom?.(i)}};yi([c({type:Array})],Wt.prototype,"platforms",void 0);yi([c()],Wt.prototype,"onSelectPlatfrom",void 0);Wt=yi([h("w3m-connecting-header")],Wt);var $o=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let zi=class extends O{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),k.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}async onConnectProxy(){try{this.error=!1;const{connectors:e}=m.state,i=e.find(n=>n.type==="ANNOUNCED"&&n.info?.rdns===this.wallet?.rdns||n.type==="INJECTED"||n.name===this.wallet?.name);if(i)await g.connectExternal(i,i.chain);else throw new Error("w3m-connecting-wc-browser: No connector found");P.close(),k.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:this.wallet?.name||"Unknown",caipNetworkId:d.getActiveCaipNetwork()?.caipNetworkId}})}catch(e){k.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),this.error=!0}}};zi=$o([h("w3m-connecting-wc-browser")],zi);var So=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Mi=class extends O{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),k.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop"}})}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onConnectProxy(){if(this.wallet?.desktop_link&&this.uri)try{this.error=!1;const{desktop_link:e,name:i}=this.wallet,{redirect:n,href:o}=b.formatNativeUrl(e,this.uri);g.setWcLinking({name:i,href:o}),g.setRecentWallet(this.wallet),b.openHref(n,"_blank")}catch{this.error=!0}}};Mi=So([h("w3m-connecting-wc-desktop")],Mi);var Xe=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Oe=class extends O{constructor(){if(super(),this.btnLabelTimeout=void 0,this.redirectDeeplink=void 0,this.redirectUniversalLink=void 0,this.target=void 0,this.preferUniversalLinks=v.state.experimental_preferUniversalLinks,this.isLoading=!0,this.onConnect=()=>{if(this.wallet?.mobile_link&&this.uri)try{this.error=!1;const{mobile_link:e,link_mode:i,name:n}=this.wallet,{redirect:o,redirectUniversalLink:t,href:a}=b.formatNativeUrl(e,this.uri,i);this.redirectDeeplink=o,this.redirectUniversalLink=t,this.target=b.isIframe()?"_top":"_self",g.setWcLinking({name:n,href:a}),g.setRecentWallet(this.wallet),this.preferUniversalLinks&&this.redirectUniversalLink?b.openHref(this.redirectUniversalLink,this.target):b.openHref(this.redirectDeeplink,this.target)}catch(e){k.sendEvent({type:"track",event:"CONNECT_PROXY_ERROR",properties:{message:e instanceof Error?e.message:"Error parsing the deeplink",uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw new Error("w3m-connecting-wc-mobile: No wallet provided");this.secondaryBtnLabel="Open",this.secondaryLabel=V.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.onHandleURI(),this.unsubscribe.push(g.subscribeKey("wcUri",()=>{this.onHandleURI()})),k.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile"}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.btnLabelTimeout)}onHandleURI(){this.isLoading=!this.uri,!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onTryAgain(){g.setWcError(!1),this.onConnect?.()}};Xe([u()],Oe.prototype,"redirectDeeplink",void 0);Xe([u()],Oe.prototype,"redirectUniversalLink",void 0);Xe([u()],Oe.prototype,"target",void 0);Xe([u()],Oe.prototype,"preferUniversalLinks",void 0);Xe([u()],Oe.prototype,"isLoading",void 0);Oe=Xe([h("w3m-connecting-wc-mobile")],Oe);const ko=x`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }
`;var Ao=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let oi=class extends O{constructor(){super(),this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",this.forceUpdate),k.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet?.name??"WalletConnect",platform:"qrcode"}})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.forEach(e=>e()),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0","xl","xl","xl"]}
        gap="xl"
      >
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone
        </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;const e=this.getBoundingClientRect().width-40,i=this.wallet?this.wallet.name:void 0;return g.setWcLinking(void 0),g.setRecentWallet(this.wallet),l` <wui-qr-code
      size=${e}
      theme=${Xt.state.themeMode}
      uri=${this.uri}
      imageSrc=${p(S.getWalletImage(this.wallet))}
      color=${p(Xt.state.themeVariables["--w3m-qr-color"])}
      alt=${p(i)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){const e=!this.uri||!this.ready;return l`<wui-link
      .disabled=${e}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}};oi.styles=ko;oi=Ao([h("w3m-connecting-wc-qrcode")],oi);var Io=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Fi=class extends w{constructor(){if(super(),this.wallet=f.state.data?.wallet,!this.wallet)throw new Error("w3m-connecting-wc-unsupported: No wallet provided");k.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}render(){return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${p(S.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};Fi=Io([h("w3m-connecting-wc-unsupported")],Fi);var an=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ai=class extends O{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw new Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel=V.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(g.subscribeKey("wcUri",()=>{this.updateLoadingState()})),k.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web"}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){if(this.wallet?.webapp_link&&this.uri)try{this.error=!1;const{webapp_link:e,name:i}=this.wallet,{redirect:n,href:o}=b.formatUniversalUrl(e,this.uri);g.setWcLinking({name:i,href:o}),g.setRecentWallet(this.wallet),b.openHref(n,"_blank")}catch{this.error=!0}}};an([u()],ai.prototype,"isLoading",void 0);ai=an([h("w3m-connecting-wc-web")],ai);var wt=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ge=class extends w{constructor(){super(),this.wallet=f.state.data?.wallet,this.unsubscribe=[],this.platform=void 0,this.platforms=[],this.isSiwxEnabled=!!v.state.siwx,this.remoteFeatures=v.state.remoteFeatures,this.determinePlatforms(),this.initializeConnection(),this.unsubscribe.push(v.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return l`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `}reownBrandingTemplate(){return this.remoteFeatures?.reownBranding?l`<wui-ux-by-reown></wui-ux-by-reown>`:null}async initializeConnection(e=!1){if(!(this.platform==="browser"||v.state.manualWCControl&&!e))try{const{wcPairingExpiry:i,status:n}=g.state;if(e||v.state.enableEmbedded||b.isPairingExpired(i)||n==="connecting"){const o=g.getConnections(d.state.activeChain),t=this.remoteFeatures?.multiWallet,a=o.length>0;await g.connectWalletConnect(),this.isSiwxEnabled||(a&&t?(f.replace("ProfileWallets"),W.showSuccess("New Wallet Added")):P.close())}}catch(i){if(i instanceof Error&&i.message.includes("An error occurred when attempting to switch chain")&&!v.state.enableNetworkSwitch&&d.state.activeChain){d.setActiveCaipNetwork(vn.getUnsupportedNetwork(`${d.state.activeChain}:${d.state.activeCaipNetwork?.id}`)),d.showUnsupportedChainUI();return}k.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:i?.message??"Unknown"}}),g.setWcError(!0),W.showError(i.message??"Connection error"),g.resetWcConnection(),f.goBack()}}determinePlatforms(){if(!this.wallet){this.platforms.push("qrcode"),this.platform="qrcode";return}if(this.platform)return;const{mobile_link:e,desktop_link:i,webapp_link:n,injected:o,rdns:t}=this.wallet,a=o?.map(({injected_id:pn})=>pn).filter(Boolean),r=[...t?[t]:a??[]],y=v.state.isUniversalProvider?!1:r.length,E=e,_=n,M=g.checkInstalled(r),T=y&&M,dn=i&&!b.isMobile();T&&!d.state.noAdapters&&this.platforms.push("browser"),E&&this.platforms.push(b.isMobile()?"mobile":"qrcode"),_&&this.platforms.push("web"),dn&&this.platforms.push("desktop"),!T&&y&&!d.state.noAdapters&&this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return l`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return l`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return l`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return l`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return l`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;default:return l`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?l`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(e){const i=this.shadowRoot?.querySelector("div");i&&(await i.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=e,i.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};wt([u()],Ge.prototype,"platform",void 0);wt([u()],Ge.prototype,"platforms",void 0);wt([u()],Ge.prototype,"isSiwxEnabled",void 0);wt([u()],Ge.prototype,"remoteFeatures",void 0);Ge=wt([h("w3m-connecting-wc-view")],Ge);var sn=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let si=class extends w{constructor(){super(...arguments),this.isMobile=b.isMobile()}render(){if(this.isMobile){const{featured:e,recommended:i}=A.state,{customWallets:n}=v.state,o=re.getRecentWallets(),t=e.length||i.length||n?.length||o.length;return l`<wui-flex
        flexDirection="column"
        gap="xs"
        .margin=${["3xs","s","s","s"]}
      >
        ${t?l`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return l`<wui-flex flexDirection="column" .padding=${["0","0","l","0"]}>
      <w3m-connecting-wc-view></w3m-connecting-wc-view>
      <wui-flex flexDirection="column" .padding=${["0","m","0","m"]}>
        <w3m-all-wallets-widget></w3m-all-wallets-widget> </wui-flex
    ></wui-flex>`}};sn([u()],si.prototype,"isMobile",void 0);si=sn([h("w3m-connecting-wc-basic-view")],si);const Eo=x`
  .continue-button-container {
    width: 100%;
  }
`;var rn=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let _t=class extends w{constructor(){super(...arguments),this.loading=!1}render(){return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="xxl"
        .padding=${["0","0","l","0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${()=>{b.openHref($n.URLS.FAQ,"_blank")}}
        >
          Learn more about names
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `}onboardingTemplate(){return l` <wui-flex
      flexDirection="column"
      gap="xxl"
      alignItems="center"
      .padding=${["0","xxl","0","xxl"]}
    >
      <wui-flex gap="s" alignItems="center" justifyContent="center">
        <wui-icon-box
          icon="id"
          size="xl"
          iconSize="xxl"
          iconColor="fg-200"
          backgroundColor="fg-200"
        ></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="s">
        <wui-text align="center" variant="medium-600" color="fg-100">
          Choose your account name
        </wui-text>
        <wui-text align="center" variant="paragraph-400" color="fg-100">
          Finally say goodbye to 0x addresses, name your account to make it easier to exchange
          assets
        </wui-text>
      </wui-flex>
    </wui-flex>`}buttonsTemplate(){return l`<wui-flex
      .padding=${["0","2l","0","2l"]}
      gap="s"
      class="continue-button-container"
    >
      <wui-button
        fullWidth
        .loading=${this.loading}
        size="lg"
        borderRadius="xs"
        @click=${this.handleContinue.bind(this)}
        >Choose name
      </wui-button>
    </wui-flex>`}handleContinue(){f.push("RegisterAccountName"),k.sendEvent({type:"track",event:"OPEN_ENS_FLOW",properties:{isSmartAccount:xe(d.state.activeChain)===se.ACCOUNT_TYPES.SMART_ACCOUNT}})}};_t.styles=Eo;rn([u()],_t.prototype,"loading",void 0);_t=rn([h("w3m-choose-account-name-view")],_t);var Wo=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Vi=class extends w{constructor(){super(...arguments),this.wallet=f.state.data?.wallet}render(){if(!this.wallet)throw new Error("w3m-downloads-view");return l`
      <wui-flex gap="xs" flexDirection="column" .padding=${["s","s","l","s"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){return this.wallet?.chrome_store?l`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){return this.wallet?.app_store?l`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){return this.wallet?.play_store?l`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){return this.wallet?.homepage?l`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `:null}onChromeStore(){this.wallet?.chrome_store&&b.openHref(this.wallet.chrome_store,"_blank")}onAppStore(){this.wallet?.app_store&&b.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&b.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&b.openHref(this.wallet.homepage,"_blank")}};Vi=Wo([h("w3m-downloads-view")],Vi);var _o=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const To="https://walletconnect.com/explorer";let Gi=class extends w{render(){return l`
      <wui-flex flexDirection="column" .padding=${["0","s","s","s"]} gap="xs">
        ${this.recommendedWalletsTemplate()}
        <wui-list-wallet
          name="Explore all"
          showAllWallets
          walletIcon="allWallets"
          icon="externalLink"
          @click=${()=>{b.openHref("https://walletconnect.com/explorer?type=wallet","_blank")}}
        ></wui-list-wallet>
      </wui-flex>
    `}recommendedWalletsTemplate(){const{recommended:e,featured:i}=A.state,{customWallets:n}=v.state;return[...i,...n??[],...e].slice(0,4).map(t=>l`
        <wui-list-wallet
          name=${t.name??"Unknown"}
          tagVariant="main"
          imageSrc=${p(S.getWalletImage(t))}
          @click=${()=>{b.openHref(t.homepage??To,"_blank")}}
        ></wui-list-wallet>
      `)}};Gi=_o([h("w3m-get-wallet-view")],Gi);var ln=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ri=class extends w{constructor(){super(...arguments),this.data=[]}render(){return l`
      <wui-flex flexDirection="column" alignItems="center" gap="l">
        ${this.data.map(e=>l`
            <wui-flex flexDirection="column" alignItems="center" gap="xl">
              <wui-flex flexDirection="row" justifyContent="center" gap="1xs">
                ${e.images.map(i=>l`<wui-visual name=${i}></wui-visual>`)}
              </wui-flex>
            </wui-flex>
            <wui-flex flexDirection="column" alignItems="center" gap="xxs">
              <wui-text variant="paragraph-500" color="fg-100" align="center">
                ${e.title}
              </wui-text>
              <wui-text variant="small-500" color="fg-200" align="center">${e.text}</wui-text>
            </wui-flex>
          `)}
      </wui-flex>
    `}};ln([c({type:Array})],ri.prototype,"data",void 0);ri=ln([h("w3m-help-widget")],ri);var No=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const Ro=[{images:["login","profile","lock"],title:"One login for all of web3",text:"Log in to any app by connecting your wallet. Say goodbye to countless passwords!"},{images:["defi","nft","eth"],title:"A home for your digital assets",text:"A wallet lets you store, send and receive digital assets like cryptocurrencies and NFTs."},{images:["browser","noun","dao"],title:"Your gateway to a new web",text:"With your wallet, you can explore and interact with DeFi, NFTs, DAOs, and much more."}];let Ki=class extends w{render(){return l`
      <wui-flex
        flexDirection="column"
        .padding=${["xxl","xl","xl","xl"]}
        alignItems="center"
        gap="xl"
      >
        <w3m-help-widget .data=${Ro}></w3m-help-widget>
        <wui-button variant="main" size="md" @click=${this.onGetWallet.bind(this)}>
          <wui-icon color="inherit" slot="iconLeft" name="wallet"></wui-icon>
          Get a wallet
        </wui-button>
      </wui-flex>
    `}onGetWallet(){k.sendEvent({type:"track",event:"CLICK_GET_WALLET"}),f.push("GetWallet")}};Ki=No([h("w3m-what-is-a-wallet-view")],Ki);const Oo=x`
  wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }
  wui-flex::-webkit-scrollbar {
    display: none;
  }
  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`;var cn=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Tt=class extends w{constructor(){super(),this.unsubscribe=[],this.checked=bt.state.isLegalCheckboxChecked,this.unsubscribe.push(bt.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{termsConditionsUrl:e,privacyPolicyUrl:i}=v.state,n=v.state.features?.legalCheckbox,t=!!(e||i)&&!!n,a=t&&!this.checked,r=a?-1:void 0;return l`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${t?["0","s","s","s"]:"s"}
        gap="xs"
        class=${p(a?"disabled":void 0)}
      >
        <w3m-wallet-login-list tabIdx=${p(r)}></w3m-wallet-login-list>
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}};Tt.styles=Oo;cn([u()],Tt.prototype,"checked",void 0);Tt=cn([h("w3m-connect-wallets-view")],Tt);const Po=x`
  :host {
    display: block;
    width: var(--wui-box-size-lg);
    height: var(--wui-box-size-lg);
  }

  svg {
    width: var(--wui-box-size-lg);
    height: var(--wui-box-size-lg);
    fill: none;
    stroke: transparent;
    stroke-linecap: round;
  }

  use {
    stroke: var(--wui-color-accent-100);
    stroke-width: 2px;
    stroke-dasharray: 54, 118;
    stroke-dashoffset: 172;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;var Do=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let li=class extends w{render(){return l`
      <svg viewBox="0 0 54 59">
        <path
          id="wui-loader-path"
          d="M17.22 5.295c3.877-2.277 5.737-3.363 7.72-3.726a11.44 11.44 0 0 1 4.12 0c1.983.363 3.844 1.45 7.72 3.726l6.065 3.562c3.876 2.276 5.731 3.372 7.032 4.938a11.896 11.896 0 0 1 2.06 3.63c.683 1.928.688 4.11.688 8.663v7.124c0 4.553-.005 6.735-.688 8.664a11.896 11.896 0 0 1-2.06 3.63c-1.3 1.565-3.156 2.66-7.032 4.937l-6.065 3.563c-3.877 2.276-5.737 3.362-7.72 3.725a11.46 11.46 0 0 1-4.12 0c-1.983-.363-3.844-1.449-7.72-3.726l-6.065-3.562c-3.876-2.276-5.731-3.372-7.032-4.938a11.885 11.885 0 0 1-2.06-3.63c-.682-1.928-.688-4.11-.688-8.663v-7.124c0-4.553.006-6.735.688-8.664a11.885 11.885 0 0 1 2.06-3.63c1.3-1.565 3.156-2.66 7.032-4.937l6.065-3.562Z"
        />
        <use xlink:href="#wui-loader-path"></use>
      </svg>
    `}};li.styles=[I,Po];li=Do([h("wui-loading-hexagon")],li);const jo=x`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: 4px;
    bottom: 0;
    opacity: 0;
    transform: scale(0.5);
    z-index: 1;
  }

  wui-button {
    display: none;
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  wui-button[data-retry='true'] {
    display: block;
    opacity: 1;
  }
`;var Ci=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ct=class extends w{constructor(){super(),this.network=f.state.data?.network,this.unsubscribe=[],this.showRetry=!1,this.error=!1}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}firstUpdated(){this.onSwitchNetwork()}render(){if(!this.network)throw new Error("w3m-network-switch-view: No network provided");this.onShowRetry();const e=this.getLabel(),i=this.getSubLabel();return l`
      <wui-flex
        data-error=${this.error}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","3xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-network-image
            size="lg"
            imageSrc=${p(S.getNetworkImage(this.network))}
          ></wui-network-image>

          ${this.error?null:l`<wui-loading-hexagon></wui-loading-hexagon>`}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            ?border=${!0}
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text align="center" variant="paragraph-500" color="fg-100">${e}</wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${i}</wui-text>
        </wui-flex>

        <wui-button
          data-retry=${this.showRetry}
          variant="accent"
          size="md"
          .disabled=${!this.error}
          @click=${this.onSwitchNetwork.bind(this)}
        >
          <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
          Try again
        </wui-button>
      </wui-flex>
    `}getSubLabel(){const e=m.getConnectorId(d.state.activeChain);return m.getAuthConnector()&&e===$.CONNECTOR_ID.AUTH?"":this.error?"Switch can be declined if chain is not supported by a wallet or previous request is still active":"Accept connection request in your wallet"}getLabel(){const e=m.getConnectorId(d.state.activeChain);return m.getAuthConnector()&&e===$.CONNECTOR_ID.AUTH?`Switching to ${this.network?.name??"Unknown"} network...`:this.error?"Switch declined":"Approve in wallet"}onShowRetry(){this.error&&!this.showRetry&&(this.showRetry=!0,this.shadowRoot?.querySelector("wui-button")?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"}))}onSwitchNetwork(){try{this.error=!1,d.state.activeChain!==this.network?.chainNamespace&&d.setIsSwitchingNamespace(!0),this.network&&d.switchActiveNetwork(this.network)}catch{this.error=!0}}};ct.styles=jo;Ci([u()],ct.prototype,"showRetry",void 0);Ci([u()],ct.prototype,"error",void 0);ct=Ci([h("w3m-network-switch-view")],ct);const Lo=x`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-md);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button[data-transparent='true'] {
    pointer-events: none;
    background-color: transparent;
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  button:active {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-image {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    border-radius: 100%;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-002);
    opacity: 0.5;
    cursor: not-allowed;
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }
`;var Qe=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let $e=class extends w{constructor(){super(...arguments),this.imageSrc="",this.name="",this.disabled=!1,this.selected=!1,this.transparent=!1}render(){return l`
      <button data-transparent=${this.transparent} ?disabled=${this.disabled}>
        <wui-flex gap="s" alignItems="center">
          ${this.templateNetworkImage()}
          <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text></wui-flex
        >
        ${this.checkmarkTemplate()}
      </button>
    `}checkmarkTemplate(){return this.selected?l`<wui-icon size="sm" color="accent-100" name="checkmarkBold"></wui-icon>`:null}templateNetworkImage(){return this.imageSrc?l`<wui-image size="sm" src=${this.imageSrc} name=${this.name}></wui-image>`:this.imageSrc?null:l`<wui-network-image
        ?round=${!0}
        size="md"
        name=${this.name}
      ></wui-network-image>`}};$e.styles=[I,N,Lo];Qe([c()],$e.prototype,"imageSrc",void 0);Qe([c()],$e.prototype,"name",void 0);Qe([c({type:Boolean})],$e.prototype,"disabled",void 0);Qe([c({type:Boolean})],$e.prototype,"selected",void 0);Qe([c({type:Boolean})],$e.prototype,"transparent",void 0);$e=Qe([h("wui-list-network")],$e);const Bo=x`
  .container {
    max-height: 360px;
    overflow: auto;
  }

  .container::-webkit-scrollbar {
    display: none;
  }
`;var ft=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Pe=class extends w{constructor(){super(),this.unsubscribe=[],this.network=d.state.activeCaipNetwork,this.requestedCaipNetworks=d.getCaipNetworks(),this.search="",this.onDebouncedSearch=b.debounce(e=>{this.search=e},100),this.unsubscribe.push(We.subscribeNetworkImages(()=>this.requestUpdate()),d.subscribeKey("activeCaipNetwork",e=>this.network=e),d.subscribe(()=>{this.requestedCaipNetworks=d.getAllRequestedCaipNetworks()}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return l`
      ${this.templateSearchInput()}
      <wui-flex
        class="container"
        .padding=${["0","s","s","s"]}
        flexDirection="column"
        gap="xs"
      >
        ${this.networksTemplate()}
      </wui-flex>

      <wui-separator></wui-separator>

      <wui-flex padding="s" flexDirection="column" gap="m" alignItems="center">
        <wui-text variant="small-400" color="fg-300" align="center">
          Your connected wallet may not support some of the networks available for this dApp
        </wui-text>
        <wui-link @click=${this.onNetworkHelp.bind(this)}>
          <wui-icon size="xs" color="accent-100" slot="iconLeft" name="helpCircle"></wui-icon>
          What is a network
        </wui-link>
      </wui-flex>
    `}templateSearchInput(){return l`
      <wui-flex gap="xs" .padding=${["0","s","s","s"]}>
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="md"
          placeholder="Search network"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}onNetworkHelp(){k.sendEvent({type:"track",event:"CLICK_NETWORK_HELP"}),f.push("WhatIsANetwork")}networksTemplate(){const e=d.getAllApprovedCaipNetworkIds(),i=b.sortRequestedNetworks(e,this.requestedCaipNetworks);return this.search?this.filteredNetworks=i?.filter(n=>n?.name?.toLowerCase().includes(this.search.toLowerCase())):this.filteredNetworks=i,this.filteredNetworks?.map(n=>l`
        <wui-list-network
          .selected=${this.network?.id===n.id}
          imageSrc=${p(S.getNetworkImage(n))}
          type="network"
          name=${n.name??n.id}
          @click=${()=>this.onSwitchNetwork(n)}
          .disabled=${this.getNetworkDisabled(n)}
          data-testid=${`w3m-network-switch-${n.name??n.id}`}
        ></wui-list-network>
      `)}getNetworkDisabled(e){const i=e.chainNamespace,n=C.getCaipAddress(i),o=d.getAllApprovedCaipNetworkIds(),t=d.getNetworkProp("supportsAllNetworks",i)!==!1,a=m.getConnectorId(i),r=m.getAuthConnector(),y=a===$.CONNECTOR_ID.AUTH&&r;return!n||t||y?!1:!o?.includes(e.caipNetworkId)}onSwitchNetwork(e){xn.onSwitchNetwork({network:e})}};Pe.styles=Bo;ft([u()],Pe.prototype,"network",void 0);ft([u()],Pe.prototype,"requestedCaipNetworks",void 0);ft([u()],Pe.prototype,"filteredNetworks",void 0);ft([u()],Pe.prototype,"search",void 0);Pe=ft([h("w3m-networks-view")],Pe);const Uo=x`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-visual {
    width: var(--wui-wallet-image-size-lg);
    height: var(--wui-wallet-image-size-lg);
    border-radius: calc(var(--wui-border-radius-5xs) * 9 - var(--wui-border-radius-xxs));
    position: relative;
    overflow: hidden;
  }

  wui-visual::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(var(--wui-border-radius-5xs) * 9 - var(--wui-border-radius-xxs));
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity var(--wui-ease-out-power-2) var(--wui-duration-lg),
      transform var(--wui-ease-out-power-2) var(--wui-duration-lg);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  wui-link {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
  }

  .capitalize {
    text-transform: capitalize;
  }
`;var un=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const zo={eip155:"eth",solana:"solana",bip122:"bitcoin",polkadot:void 0};let Nt=class extends w{constructor(){super(...arguments),this.unsubscribe=[],this.switchToChain=f.state.data?.switchToChain,this.caipNetwork=f.state.data?.network,this.activeChain=d.state.activeChain}firstUpdated(){this.unsubscribe.push(d.subscribeKey("activeChain",e=>this.activeChain=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.switchToChain?$.CHAIN_NAME_MAP[this.switchToChain]:"supported";if(!this.switchToChain)return null;const i=$.CHAIN_NAME_MAP[this.switchToChain];return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" flexDirection="column" alignItems="center" gap="xl">
          <wui-visual name=${p(zo[this.switchToChain])}></wui-visual>
          <wui-text
            data-testid=${`w3m-switch-active-chain-to-${i}`}
            variant="paragraph-500"
            color="fg-100"
            align="center"
            >Switch to <span class="capitalize">${i}</span></wui-text
          >
          <wui-text variant="small-400" color="fg-200" align="center">
            Connected wallet doesn't support connecting to ${e} chain. You
            need to connect with a different wallet.
          </wui-text>
          <wui-button
            data-testid="w3m-switch-active-chain-button"
            size="md"
            @click=${this.switchActiveChain.bind(this)}
            >Switch</wui-button
          >
        </wui-flex>
      </wui-flex>
    `}async switchActiveChain(){this.switchToChain&&(d.setIsSwitchingNamespace(!0),m.setFilterByNamespace(this.switchToChain),this.caipNetwork?await d.switchActiveNetwork(this.caipNetwork):d.setActiveNamespace(this.switchToChain),f.reset("Connect"))}};Nt.styles=Uo;un([c()],Nt.prototype,"activeChain",void 0);Nt=un([h("w3m-switch-active-chain-view")],Nt);var Mo=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const Fo=[{images:["network","layers","system"],title:"The system’s nuts and bolts",text:"A network is what brings the blockchain to life, as this technical infrastructure allows apps to access the ledger and smart contract services."},{images:["noun","defiAlt","dao"],title:"Designed for different uses",text:"Each network is designed differently, and may therefore suit certain apps and experiences."}];let Hi=class extends w{render(){return l`
      <wui-flex
        flexDirection="column"
        .padding=${["xxl","xl","xl","xl"]}
        alignItems="center"
        gap="xl"
      >
        <w3m-help-widget .data=${Fo}></w3m-help-widget>
        <wui-button
          variant="main"
          size="md"
          @click=${()=>{b.openHref("https://ethereum.org/en/developers/docs/networks/","_blank")}}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-button>
      </wui-flex>
    `}};Hi=Mo([h("w3m-what-is-a-network-view")],Hi);const Vo=x`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`;var $i=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ut=class extends w{constructor(){super(),this.swapUnsupportedChain=f.state.data?.swapUnsupportedChain,this.unsubscribe=[],this.disconnecting=!1,this.remoteFeatures=v.state.remoteFeatures,this.unsubscribe.push(We.subscribeNetworkImages(()=>this.requestUpdate()),v.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return l`
      <wui-flex class="container" flexDirection="column" gap="0">
        <wui-flex
          class="container"
          flexDirection="column"
          .padding=${["m","xl","xs","xl"]}
          alignItems="center"
          gap="xl"
        >
          ${this.descriptionTemplate()}
        </wui-flex>

        <wui-flex flexDirection="column" padding="s" gap="xs">
          ${this.networksTemplate()}
        </wui-flex>

        <wui-separator text="or"></wui-separator>
        <wui-flex flexDirection="column" padding="s" gap="xs">
          <wui-list-item
            variant="icon"
            iconVariant="overlay"
            icon="disconnect"
            ?chevron=${!1}
            .loading=${this.disconnecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `}descriptionTemplate(){return this.swapUnsupportedChain?l`
        <wui-text variant="small-400" color="fg-200" align="center">
          The swap feature doesn’t support your current network. Switch to an available option to
          continue.
        </wui-text>
      `:l`
      <wui-text variant="small-400" color="fg-200" align="center">
        This app doesn’t support your current network. Switch to an available option to continue.
      </wui-text>
    `}networksTemplate(){const e=d.getAllRequestedCaipNetworks(),i=d.getAllApprovedCaipNetworkIds(),n=b.sortRequestedNetworks(i,e);return(this.swapUnsupportedChain?n.filter(t=>V.SWAP_SUPPORTED_NETWORKS.includes(t.caipNetworkId)):n).map(t=>l`
        <wui-list-network
          imageSrc=${p(S.getNetworkImage(t))}
          name=${t.name??"Unknown"}
          @click=${()=>this.onSwitchNetwork(t)}
        >
        </wui-list-network>
      `)}async onDisconnect(){try{this.disconnecting=!0;const e=d.state.activeChain,n=g.getConnections(e).length>0,o=e&&m.state.activeConnectorIds[e],t=this.remoteFeatures?.multiWallet;await g.disconnect(t?{id:o,namespace:e}:{}),n&&t&&(f.push("ProfileWallets"),W.showSuccess("Wallet deleted"))}catch{k.sendEvent({type:"track",event:"DISCONNECT_ERROR"}),W.showError("Failed to disconnect")}finally{this.disconnecting=!1}}async onSwitchNetwork(e){const i=C.state.caipAddress,n=d.getAllApprovedCaipNetworkIds(),o=d.getNetworkProp("supportsAllNetworks",e.chainNamespace),t=f.state.data;i?n?.includes(e.caipNetworkId)?await d.switchActiveNetwork(e):o?f.push("SwitchNetwork",{...t,network:e}):f.push("SwitchNetwork",{...t,network:e}):i||(d.setActiveCaipNetwork(e),f.push("Connect"))}};ut.styles=Vo;$i([u()],ut.prototype,"disconnecting",void 0);$i([u()],ut.prototype,"remoteFeatures",void 0);ut=$i([h("w3m-unsupported-chain-view")],ut);const Go=x`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-s);
    padding: var(--wui-spacing-1xs) var(--wui-spacing-s) var(--wui-spacing-1xs)
      var(--wui-spacing-1xs);
  }
`;var Si=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let dt=class extends w{constructor(){super(...arguments),this.icon="externalLink",this.text=""}render(){return l`
      <wui-flex gap="1xs" alignItems="center">
        <wui-icon-box
          size="sm"
          iconcolor="fg-200"
          backgroundcolor="fg-200"
          icon=${this.icon}
          background="transparent"
        ></wui-icon-box>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
      </wui-flex>
    `}};dt.styles=[I,N,Go];Si([c()],dt.prototype,"icon",void 0);Si([c()],dt.prototype,"text",void 0);dt=Si([h("wui-banner")],dt);const Ko=x`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`;var Ho=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ci=class extends w{constructor(){super(),this.unsubscribe=[]}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return l` <wui-flex
      flexDirection="column"
      .padding=${["xs","s","m","s"]}
      gap="xs"
    >
      <wui-banner
        icon="warningCircle"
        text="You can only receive assets on these networks"
      ></wui-banner>
      ${this.networkTemplate()}
    </wui-flex>`}networkTemplate(){const e=d.getAllRequestedCaipNetworks(),i=d.getAllApprovedCaipNetworkIds(),n=d.state.activeCaipNetwork,o=d.checkIfSmartAccountEnabled();let t=b.sortRequestedNetworks(i,e);if(o&&xe(n?.chainNamespace)===se.ACCOUNT_TYPES.SMART_ACCOUNT){if(!n)return null;t=[n]}return t.filter(r=>r.chainNamespace===n?.chainNamespace).map(r=>l`
        <wui-list-network
          imageSrc=${p(S.getNetworkImage(r))}
          name=${r.name??"Unknown"}
          ?transparent=${!0}
        >
        </wui-list-network>
      `)}};ci.styles=Ko;ci=Ho([h("w3m-wallet-compatible-networks-view")],ci);const qo=x`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--wui-icon-box-size-xl);
    height: var(--wui-icon-box-size-xl);
    box-shadow: 0 0 0 8px var(--wui-thumbnail-border);
    border-radius: var(--local-border-radius);
    overflow: hidden;
  }

  wui-icon {
    width: 32px;
    height: 32px;
  }
`;var Ht=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ke=class extends w{render(){return this.style.cssText=`--local-border-radius: ${this.borderRadiusFull?"1000px":"20px"}; background-color: var(--wui-color-modal-bg);`,l`${this.templateVisual()}`}templateVisual(){return this.imageSrc?l`<wui-image src=${this.imageSrc} alt=${this.alt??""}></wui-image>`:l`<wui-icon
      data-parent-size="md"
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};Ke.styles=[I,qo];Ht([c()],Ke.prototype,"imageSrc",void 0);Ht([c()],Ke.prototype,"alt",void 0);Ht([c({type:Boolean})],Ke.prototype,"borderRadiusFull",void 0);Ke=Ht([h("wui-visual-thumbnail")],Ke);const Yo=x`
  :host {
    display: flex;
    justify-content: center;
    gap: var(--wui-spacing-2xl);
  }

  wui-visual-thumbnail:nth-child(1) {
    z-index: 1;
  }
`;var Xo=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ui=class extends w{constructor(){super(...arguments),this.dappImageUrl=v.state.metadata?.icons,this.walletImageUrl=C.state.connectedWalletInfo?.icon}firstUpdated(){const e=this.shadowRoot?.querySelectorAll("wui-visual-thumbnail");e?.[0]&&this.createAnimation(e[0],"translate(18px)"),e?.[1]&&this.createAnimation(e[1],"translate(-18px)")}render(){return l`
      <wui-visual-thumbnail
        ?borderRadiusFull=${!0}
        .imageSrc=${this.dappImageUrl?.[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `}createAnimation(e,i){e.animate([{transform:"translateX(0px)"},{transform:i}],{duration:1600,easing:"cubic-bezier(0.56, 0, 0.48, 1)",direction:"alternate",iterations:1/0})}};ui.styles=Yo;ui=Xo([h("w3m-siwx-sign-message-thumbnails")],ui);var ki=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var r=s.length-1;r>=0;r--)(a=s[r])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Rt=class extends w{constructor(){super(...arguments),this.dappName=v.state.metadata?.name,this.isCancelling=!1,this.isSigning=!1}render(){return l`
      <wui-flex justifyContent="center" .padding=${["2xl","0","xxl","0"]}>
        <w3m-siwx-sign-message-thumbnails></w3m-siwx-sign-message-thumbnails>
      </wui-flex>
      <wui-flex
        .padding=${["0","4xl","l","4xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100"
          >${this.dappName??"Dapp"} needs to connect to your wallet</wui-text
        >
      </wui-flex>
      <wui-flex
        .padding=${["0","3xl","l","3xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="small-400" align="center" color="fg-200"
          >Sign this message to prove you own this wallet and proceed. Canceling will disconnect
          you.</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${["l","xl","xl","xl"]} gap="s" justifyContent="space-between">
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="neutral"
          ?loading=${this.isCancelling}
          @click=${this.onCancel.bind(this)}
          data-testid="w3m-connecting-siwe-cancel"
        >
          ${this.isCancelling?"Cancelling...":"Cancel"}
        </wui-button>
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="main"
          @click=${this.onSign.bind(this)}
          ?loading=${this.isSigning}
          data-testid="w3m-connecting-siwe-sign"
        >
          ${this.isSigning?"Signing...":"Sign"}
        </wui-button>
      </wui-flex>
    `}async onSign(){this.isSigning=!0,await Ii.requestSignMessage().finally(()=>this.isSigning=!1)}async onCancel(){this.isCancelling=!0,await Ii.cancelSignMessage().finally(()=>this.isCancelling=!1)}};ki([u()],Rt.prototype,"isCancelling",void 0);ki([u()],Rt.prototype,"isSigning",void 0);Rt=ki([h("w3m-siwx-sign-message-view")],Rt);export{Wi as AppKitAccountButton,Ti as AppKitButton,Ri as AppKitConnectButton,Pi as AppKitNetworkButton,Ei as W3mAccountButton,le as W3mAccountSettingsView,ti as W3mAccountView,Ct as W3mAllWalletsView,_i as W3mButton,_t as W3mChooseAccountNameView,Ni as W3mConnectButton,H as W3mConnectView,Tt as W3mConnectWalletsView,Ui as W3mConnectingExternalView,Et as W3mConnectingMultiChainView,si as W3mConnectingWcBasicView,Ge as W3mConnectingWcView,Vi as W3mDownloadsView,Gi as W3mGetWalletView,Oi as W3mNetworkButton,ct as W3mNetworkSwitchView,Pe as W3mNetworksView,j as W3mProfileWalletsView,ur as W3mRouter,Rt as W3mSIWXSignMessageView,Nt as W3mSwitchActiveChainView,ut as W3mUnsupportedChainView,ci as W3mWalletCompatibleNetworksView,Hi as W3mWhatIsANetworkView,Ki as W3mWhatIsAWalletView};
