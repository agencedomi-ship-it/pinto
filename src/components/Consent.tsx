import { Link } from "@tanstack/react-router";
import { SITE } from "@/data/site";

/**
 * Consentement cookies et Google Tag Manager sans React côté client : le bandeau est rendu en HTML,
 * masqué, et un court script inline le pilote. GTM n'est chargé qu'après accord, et en différé.
 */
const btn = "h-11 rounded-full px-5 text-sm font-semibold";

export function ConsentBanner() {
  return (
    <div
      id="consent-banner"
      hidden
      role="dialog"
      aria-labelledby="consent-title"
      className="fixed inset-x-3 bottom-24 z-50 mx-auto max-w-xl rounded-2xl border border-border bg-card p-5 text-foreground shadow-xl"
    >
      <p id="consent-title" className="font-semibold">Mesure de nos annonces</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Avec votre accord, nous utilisons des cookies Google pour savoir si vous venez d'une de nos annonces. Aucun cookie n'est déposé sans
        votre choix. <Link to="/cookies" className="underline">En savoir plus</Link>.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" data-consent="granted" className={`${btn} bg-foreground text-background`}>Accepter</button>
        <button type="button" data-consent="denied" className={`${btn} border border-border`}>Refuser</button>
      </div>
    </div>
  );
}

/** Boutons de la page Cookies. */
export function ConsentControls() {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <button type="button" data-consent="granted" className={`${btn} bg-foreground text-background`}>Accepter</button>
      <button type="button" data-consent="denied" className={`${btn} border border-border`}>Refuser</button>
      <span className="text-sm text-muted-foreground">Choix actuel : <span id="consent-state">aucun</span>.</span>
    </div>
  );
}

const script = `(function(){var K="pinto-consent",ID=${JSON.stringify(SITE.gtmId)},MAX=15552e6,loaded=false;
function read(){try{var r=localStorage.getItem(K);if(!r)return null;var o=JSON.parse(r);return Date.now()-o.at>MAX?null:o.value}catch(e){return null}}
function gtm(){if(loaded||!ID||read()!=="granted")return;loaded=true;window.dataLayer=window.dataLayer||[];window.dataLayer.push({"gtm.start":Date.now(),event:"gtm.js"});var s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtm.js?id="+ID;document.head.appendChild(s)}
function apply(){var c=read(),b=document.getElementById("consent-banner");if(b)b.hidden=c!==null;var s=document.getElementById("consent-state");if(s)s.textContent=c==="granted"?"accepté":c==="denied"?"refusé":"aucun"}
document.addEventListener("click",function(e){var t=e.target&&e.target.closest&&e.target.closest("[data-consent]");if(!t)return;try{localStorage.setItem(K,JSON.stringify({value:t.getAttribute("data-consent"),at:Date.now()}))}catch(x){}apply();gtm()});
["pointerdown","keydown","scroll","touchstart"].forEach(function(n){addEventListener(n,gtm,{once:true,passive:true})});setTimeout(gtm,3000);apply()})();`;

export function ConsentScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
