import{i as L,a as I,C as $,O as u,R as f,b as A,x as l,d as P,n as U,o as F,A as d,l as E,h as b,p as N,e as p,q as W,S as v,s as D,M as O,T as S}from"./index-CbAbe3F4.js";import{n as j,r as c,c as _,o as y}from"./if-defined-kwG2YDzm.js";import{O as R}from"./index-CGq9_go9.js";import{e as q}from"./index-DFDOu6TU.js";import"./index-BXkptxUt.js";import"./index-6F3tGgom.js";import"./index-BVfNOmew.js";import"./index-DqftWg1Y.js";import"./index-CyMtzEZR.js";import"./index-DMyGazCI.js";import"./index-D5qoL1H6.js";import"./ref-Nua0ym4G.js";import"./ConstantsUtil-Dmg8YACJ.js";import"./index-DDr5qZGp.js";import"./index-MPoemy6E.js";import"./index-D_sE5vDe.js";const M=L`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var x=function(n,e,t,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(n,e,t,o);else for(var a=n.length-1;a>=0;a--)(s=n[a])&&(i=(r<3?s(i):r>3?s(e,t,i):s(e,t))||i);return r>3&&i&&Object.defineProperty(e,t,i),i};let w=class extends I{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=$.state.connectors,this.authConnector=this.connectors.find(e=>e.type==="AUTH"),this.remoteFeatures=u.state.remoteFeatures,this.isPwaLoading=!1,this.unsubscribe.push($.subscribeKey("connectors",e=>{this.connectors=e,this.authConnector=this.connectors.find(t=>t.type==="AUTH")}),u.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}connectedCallback(){super.connectedCallback(),this.handlePwaFrameLoad()}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.remoteFeatures?.socials||[];const t=!!this.authConnector,o=e?.length,r=f.state.view==="ConnectSocials";return(!t||!o)&&!r?null:(r&&!o&&(e=A.DEFAULT_SOCIALS),l` <wui-flex flexDirection="column" gap="xs">
      ${e.map(i=>l`<wui-list-social
            @click=${()=>{this.onSocialClick(i)}}
            data-testid=${`social-selector-${i}`}
            name=${i}
            logo=${i}
            ?disabled=${this.isPwaLoading}
          ></wui-list-social>`)}
    </wui-flex>`)}async onSocialClick(e){e&&await q(e)}async handlePwaFrameLoad(){if(P.isPWA()){this.isPwaLoading=!0;try{this.authConnector?.provider instanceof U&&await this.authConnector.provider.init()}catch(e){F.open({shortMessage:"Error loading embedded wallet in PWA",longMessage:e.message},"error")}finally{this.isPwaLoading=!1}}}};w.styles=M;x([j()],w.prototype,"tabIdx",void 0);x([c()],w.prototype,"connectors",void 0);x([c()],w.prototype,"authConnector",void 0);x([c()],w.prototype,"remoteFeatures",void 0);x([c()],w.prototype,"isPwaLoading",void 0);w=x([_("w3m-social-login-list")],w);const z=L`
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
`;var T=function(n,e,t,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(n,e,t,o);else for(var a=n.length-1;a>=0;a--)(s=n[a])&&(i=(r<3?s(i):r>3?s(e,t,i):s(e,t))||i);return r>3&&i&&Object.defineProperty(e,t,i),i};let k=class extends I{constructor(){super(),this.unsubscribe=[],this.checked=R.state.isLegalCheckboxChecked,this.unsubscribe.push(R.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{termsConditionsUrl:e,privacyPolicyUrl:t}=u.state,o=u.state.features?.legalCheckbox,i=!!(e||t)&&!!o,s=i&&!this.checked,a=s?-1:void 0;return l`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${i?["0","s","s","s"]:"s"}
        gap="xs"
        class=${y(s?"disabled":void 0)}
      >
        <w3m-social-login-list tabIdx=${y(a)}></w3m-social-login-list>
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}};k.styles=z;T([c()],k.prototype,"checked",void 0);k=T([_("w3m-connect-socials-view")],k);const B=L`
  wui-logo {
    width: 80px;
    height: 80px;
    border-radius: var(--wui-border-radius-m);
  }
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
    transition: all var(--wui-ease-out-power-2) var(--wui-duration-lg);
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
  .capitalize {
    text-transform: capitalize;
  }
`;var g=function(n,e,t,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(n,e,t,o);else for(var a=n.length-1;a>=0;a--)(s=n[a])&&(i=(r<3?s(i):r>3?s(e,t,i):s(e,t))||i);return r>3&&i&&Object.defineProperty(e,t,i),i};let h=class extends I{constructor(){super(),this.unsubscribe=[],this.socialProvider=d.state.socialProvider,this.socialWindow=d.state.socialWindow,this.error=!1,this.connecting=!1,this.message="Connect in the provider window",this.remoteFeatures=u.state.remoteFeatures,this.address=d.state.address,this.connectionsByNamespace=E.getConnections(b.state.activeChain),this.hasMultipleConnections=this.connectionsByNamespace.length>0,this.authConnector=$.getAuthConnector(),this.handleSocialConnection=async t=>{if(t.data?.resultUri)if(t.origin===N.SECURE_SITE_ORIGIN){window.removeEventListener("message",this.handleSocialConnection,!1);try{if(this.authConnector&&!this.connecting){this.socialWindow&&(this.socialWindow.close(),d.setSocialWindow(void 0,b.state.activeChain)),this.connecting=!0,this.updateMessage();const o=t.data.resultUri;this.socialProvider&&p.sendEvent({type:"track",event:"SOCIAL_LOGIN_REQUEST_USER_DATA",properties:{provider:this.socialProvider}}),await E.connectExternal({id:this.authConnector.id,type:this.authConnector.type,socialUri:o},this.authConnector.chain),this.socialProvider&&(W.setConnectedSocialProvider(this.socialProvider),p.sendEvent({type:"track",event:"SOCIAL_LOGIN_SUCCESS",properties:{provider:this.socialProvider,caipNetworkId:b.getActiveCaipNetwork()?.caipNetworkId}}))}}catch{this.error=!0,this.updateMessage(),this.socialProvider&&p.sendEvent({type:"track",event:"SOCIAL_LOGIN_ERROR",properties:{provider:this.socialProvider}})}}else f.goBack(),v.showError("Untrusted Origin"),this.socialProvider&&p.sendEvent({type:"track",event:"SOCIAL_LOGIN_ERROR",properties:{provider:this.socialProvider}})},D.EmbeddedWalletAbortController.signal.addEventListener("abort",()=>{this.socialWindow&&(this.socialWindow.close(),d.setSocialWindow(void 0,b.state.activeChain))}),this.unsubscribe.push(d.subscribe(t=>{t.socialProvider&&(this.socialProvider=t.socialProvider),t.socialWindow&&(this.socialWindow=t.socialWindow)}),u.subscribeKey("remoteFeatures",t=>{this.remoteFeatures=t}),d.subscribeKey("address",t=>{const o=this.remoteFeatures?.multiWallet;t&&t!==this.address&&(this.hasMultipleConnections&&o?(f.replace("ProfileWallets"),v.showSuccess("New Wallet Added")):(O.state.open||u.state.enableEmbedded)&&O.close())})),this.authConnector&&this.connectSocial()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),window.removeEventListener("message",this.handleSocialConnection,!1),this.socialWindow?.close(),d.setSocialWindow(void 0,b.state.activeChain)}render(){return l`
      <wui-flex
        data-error=${y(this.error)}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-logo logo=${y(this.socialProvider)}></wui-logo>
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
          <wui-text align="center" variant="paragraph-500" color="fg-100"
            >Log in with
            <span class="capitalize">${this.socialProvider??"Social"}</span></wui-text
          >
          <wui-text align="center" variant="small-400" color=${this.error?"error-100":"fg-200"}
            >${this.message}</wui-text
          ></wui-flex
        >
      </wui-flex>
    `}loaderTemplate(){const e=S.state.themeVariables["--w3m-border-radius-master"],t=e?parseInt(e.replace("px",""),10):4;return l`<wui-loading-thumbnail radius=${t*9}></wui-loading-thumbnail>`}connectSocial(){const e=setInterval(()=>{this.socialWindow?.closed&&(!this.connecting&&f.state.view==="ConnectingSocial"&&(this.socialProvider&&p.sendEvent({type:"track",event:"SOCIAL_LOGIN_CANCELED",properties:{provider:this.socialProvider}}),f.goBack()),clearInterval(e))},1e3);window.addEventListener("message",this.handleSocialConnection,!1)}updateMessage(){this.error?this.message="Something went wrong":this.connecting?this.message="Retrieving user data":this.message="Connect in the provider window"}};h.styles=B;g([c()],h.prototype,"socialProvider",void 0);g([c()],h.prototype,"socialWindow",void 0);g([c()],h.prototype,"error",void 0);g([c()],h.prototype,"connecting",void 0);g([c()],h.prototype,"message",void 0);g([c()],h.prototype,"remoteFeatures",void 0);h=g([_("w3m-connecting-social-view")],h);const V=L`
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

  wui-logo {
    width: 80px;
    height: 80px;
    border-radius: var(--wui-border-radius-m);
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
    transition: all var(--wui-ease-out-power-2) var(--wui-duration-lg);
  }
`;var C=function(n,e,t,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(n,e,t,o);else for(var a=n.length-1;a>=0;a--)(s=n[a])&&(i=(r<3?s(i):r>3?s(e,t,i):s(e,t))||i);return r>3&&i&&Object.defineProperty(e,t,i),i};let m=class extends I{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.socialProvider=d.state.socialProvider,this.uri=d.state.farcasterUrl,this.ready=!1,this.loading=!1,this.remoteFeatures=u.state.remoteFeatures,this.authConnector=$.getAuthConnector(),this.forceUpdate=()=>{this.requestUpdate()},this.unsubscribe.push(d.subscribeKey("farcasterUrl",e=>{e&&(this.uri=e,this.connectFarcaster())}),d.subscribeKey("socialProvider",e=>{e&&(this.socialProvider=e)}),u.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e})),window.addEventListener("resize",this.forceUpdate)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.timeout),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),l`${this.platformTemplate()}`}platformTemplate(){return P.isMobile()?l`${this.mobileTemplate()}`:l`${this.desktopTemplate()}`}desktopTemplate(){return this.loading?l`${this.loadingTemplate()}`:l`${this.qrTemplate()}`}qrTemplate(){return l` <wui-flex
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
    </wui-flex>`}loadingTemplate(){return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-logo logo="farcaster"></wui-logo>
          ${this.loaderTemplate()}
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
          <wui-text align="center" variant="paragraph-500" color="fg-100">
            Loading user data
          </wui-text>
          <wui-text align="center" variant="small-400" color="fg-200">
            Please wait a moment while we load your data.
          </wui-text>
        </wui-flex>
      </wui-flex>
    `}mobileTemplate(){return l` <wui-flex
      flexDirection="column"
      alignItems="center"
      .padding=${["3xl","xl","xl","xl"]}
      gap="xl"
    >
      <wui-flex justifyContent="center" alignItems="center">
        <wui-logo logo="farcaster"></wui-logo>
        ${this.loaderTemplate()}
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
        <wui-text align="center" variant="paragraph-500" color="fg-100"
          >Continue in Farcaster</span></wui-text
        >
        <wui-text align="center" variant="small-400" color="fg-200"
          >Accept connection request in the app</wui-text
        ></wui-flex
      >
      ${this.mobileLinkTemplate()}
    </wui-flex>`}loaderTemplate(){const e=S.state.themeVariables["--w3m-border-radius-master"],t=e?parseInt(e.replace("px",""),10):4;return l`<wui-loading-thumbnail radius=${t*9}></wui-loading-thumbnail>`}async connectFarcaster(){if(this.authConnector)try{await this.authConnector?.provider.connectFarcaster(),this.socialProvider&&(W.setConnectedSocialProvider(this.socialProvider),p.sendEvent({type:"track",event:"SOCIAL_LOGIN_REQUEST_USER_DATA",properties:{provider:this.socialProvider}})),this.loading=!0;const t=E.getConnections(this.authConnector.chain).length>0;await E.connectExternal(this.authConnector,this.authConnector.chain);const o=this.remoteFeatures?.multiWallet;this.socialProvider&&p.sendEvent({type:"track",event:"SOCIAL_LOGIN_SUCCESS",properties:{provider:this.socialProvider,caipNetworkId:b.getActiveCaipNetwork()?.caipNetworkId}}),this.loading=!1,t&&o?(f.replace("ProfileWallets"),v.showSuccess("New Wallet Added")):O.close()}catch(e){this.socialProvider&&p.sendEvent({type:"track",event:"SOCIAL_LOGIN_ERROR",properties:{provider:this.socialProvider}}),f.goBack(),v.showError(e)}}mobileLinkTemplate(){return l`<wui-button
      size="md"
      ?loading=${this.loading}
      ?disabled=${!this.uri||this.loading}
      @click=${()=>{this.uri&&P.openHref(this.uri,"_blank")}}
    >
      Open farcaster</wui-button
    >`}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;const e=this.getBoundingClientRect().width-40;return l` <wui-qr-code
      size=${e}
      theme=${S.state.themeMode}
      uri=${this.uri}
      ?farcaster=${!0}
      data-testid="wui-qr-code"
      color=${y(S.state.themeVariables["--w3m-qr-color"])}
    ></wui-qr-code>`}copyTemplate(){const e=!this.uri||!this.ready;return l`<wui-link
      .disabled=${e}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}onCopyUri(){try{this.uri&&(P.copyToClopboard(this.uri),v.showSuccess("Link copied"))}catch{v.showError("Failed to copy")}}};m.styles=V;C([c()],m.prototype,"socialProvider",void 0);C([c()],m.prototype,"uri",void 0);C([c()],m.prototype,"ready",void 0);C([c()],m.prototype,"loading",void 0);C([c()],m.prototype,"remoteFeatures",void 0);m=C([_("w3m-connecting-farcaster-view")],m);export{k as W3mConnectSocialsView,m as W3mConnectingFarcasterView,h as W3mConnectingSocialView};
