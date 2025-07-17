import{A as d,h as w,e as _,R as f,C as v,S as m,d as c,q as E,c as $,i as y,r as b,a as x,x as h,j as R}from"./index-Chvk4rWc.js";import{n as u,c as C,o as j}from"./if-defined-Cbz5qxpD.js";function O(){try{return c.returnOpenHref(`${$.SECURE_SITE_SDK_ORIGIN}/loading`,"popupWindow","width=600,height=800,scrollbars=yes")}catch{throw new Error("Could not open social popup")}}async function T(){f.push("ConnectingFarcaster");const e=v.getAuthConnector();if(e&&!d.state.farcasterUrl)try{const{url:t}=await e.provider.getFarcasterUri();d.setFarcasterUrl(t,w.state.activeChain)}catch(t){f.goBack(),m.showError(t)}}async function U(e){f.push("ConnectingSocial");const t=v.getAuthConnector();let o=null;try{const i=setTimeout(()=>{throw new Error("Social login timed out. Please try again.")},45e3);if(t&&e){if(c.isTelegram()||(o=O()),o)d.setSocialWindow(o,w.state.activeChain);else if(!c.isTelegram())throw new Error("Could not create social popup");const{uri:n}=await t.provider.getSocialRedirectUri({provider:e});if(!n)throw o?.close(),new Error("Could not fetch the social redirect uri");if(o&&(o.location.href=n),c.isTelegram()){E.setTelegramSocialProvider(e);const r=c.formatTelegramSocialLoginUrl(n);c.openHref(r,"_top")}clearTimeout(i)}}catch(i){o?.close(),m.showError(i?.message)}}async function P(e){d.setSocialProvider(e,w.state.activeChain),_.sendEvent({type:"track",event:"SOCIAL_LOGIN_STARTED",properties:{provider:e}}),e==="farcaster"?await T():await U(e)}const L=y`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-005);
    overflow: hidden;
  }

  wui-icon {
    width: 100%;
    height: 100%;
  }
`;var S=function(e,t,o,i){var n=arguments.length,r=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let g=class extends x{constructor(){super(...arguments),this.logo="google"}render(){return h`<wui-icon color="inherit" size="inherit" name=${this.logo}></wui-icon> `}};g.styles=[b,L];S([u()],g.prototype,"logo",void 0);g=S([C("wui-logo")],g);const W=y`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    justify-content: flex-start;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-text[data-align='left'] {
    display: flex;
    flex: 1;
  }

  wui-text[data-align='center'] {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  .invisible {
    opacity: 0;
    pointer-events: none;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }
`;var p=function(e,t,o,i){var n=arguments.length,r=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let l=class extends x{constructor(){super(...arguments),this.logo="google",this.name="Continue with google",this.align="left",this.disabled=!1}render(){return h`
      <button ?disabled=${this.disabled} tabindex=${j(this.tabIdx)}>
        <wui-logo logo=${this.logo}></wui-logo>
        <wui-text
          data-align=${this.align}
          variant="paragraph-500"
          color="inherit"
          align=${this.align}
          >${this.name}</wui-text
        >
        ${this.templatePlacement()}
      </button>
    `}templatePlacement(){return this.align==="center"?h` <wui-logo class="invisible" logo=${this.logo}></wui-logo>`:null}};l.styles=[b,R,W];p([u()],l.prototype,"logo",void 0);p([u()],l.prototype,"name",void 0);p([u()],l.prototype,"align",void 0);p([u()],l.prototype,"tabIdx",void 0);p([u({type:Boolean})],l.prototype,"disabled",void 0);l=p([C("wui-list-social")],l);export{P as e};
