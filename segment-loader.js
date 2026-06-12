/* Lore Faire — Segment analytics loader (shared by every page).

   HOW TO ACTIVATE:
   1. In Segment, create a source named "LoreFaire".
   2. Copy its Write Key.
   3. Replace the placeholder on the WRITE_KEY line below.

   Until a real key is in place this file is INERT: it defines the analytics
   buffer but makes no network calls and sends nothing — so it is completely
   safe to have live on the site before the Segment source even exists. */
!function () {
  var i = "analytics", analytics = window[i] = window[i] || [];
  if (analytics.initialize) return;
  if (analytics.invoked) { window.console && console.error && console.error("Segment snippet included twice."); return; }
  analytics.invoked = true;
  analytics.methods = ["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];
  analytics.factory = function (e) { return function () { var n = Array.prototype.slice.call(arguments); n.unshift(e); analytics.push(n); return analytics; }; };
  for (var n = 0; n < analytics.methods.length; n++) { var k = analytics.methods[n]; analytics[k] = analytics.factory(k); }
  analytics.load = function (key, opts) { var t = document.createElement("script"); t.type = "text/javascript"; t.async = true; t.setAttribute("data-global-segment-analytics-key", i); t.src = "https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js"; var first = document.getElementsByTagName("script")[0]; first.parentNode.insertBefore(t, first); analytics._loadOptions = opts; };
  analytics.SNIPPET_VERSION = "5.2.0";

  /* ─────────── PASTE YOUR SEGMENT WRITE KEY HERE ─────────── */
  var WRITE_KEY = "LORE_FAIRE_WRITE_KEY";

  /* Inert guard: do nothing until the placeholder is replaced with a real key
     (prevents a failed request to a bogus key while the branch is unconfigured). */
  if (WRITE_KEY && WRITE_KEY.indexOf("LORE_FAIRE") !== 0) {
    analytics._writeKey = WRITE_KEY;
    analytics.load(WRITE_KEY);
    analytics.page();   // baseline page view — the "is anything flowing?" signal
  }
}();
