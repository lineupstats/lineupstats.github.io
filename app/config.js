// The ONLY file you edit when LineUp is connected to a new Google account.
// 1) After you deploy the Apps Script web app, paste its address here (it ends in /exec).
// 2) Leave GOOGLE_CLIENT_ID empty to use email-code sign-in only. Add a Client ID later to switch on Google sign-in.
//
// TESTING THE NEW SERVER (Supabase):
//   Everyone uses Apps Script as normal. To try the new server on ONE device, open any
//   LineUp page with &backend=new (or ?backend=new) at the end of the address. That device
//   keeps using the new server, with a small "Test server" label in the corner, until you
//   open a page with backend=old. Nobody else is affected.
(function () {
  var APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbwDNAfUEHzo0o10cfuN7kODq7Qpx0K9GZyVAuHauvgtcR4c6umfDXwpGRxxFZbDuAwcXA/exec";
  var SUPABASE = "https://ybvkujfzgdqzmgtkcmdw.supabase.co/functions/v1/api";

  var useNew = false;
  try {
    var asked = new URLSearchParams(location.search).get("backend");
    if (asked === "new") localStorage.setItem("lineupBackend", "new");
    if (asked === "old") localStorage.removeItem("lineupBackend");
    useNew = localStorage.getItem("lineupBackend") === "new";
  } catch (e) { useNew = false; }

  window.LINEUP_CONFIG = {
    APPS_SCRIPT_URL: useNew ? SUPABASE : APPS_SCRIPT,
    GOOGLE_CLIENT_ID: "",
    BACKEND: useNew ? "new" : "old"
  };

  if (useNew) {
    document.addEventListener("DOMContentLoaded", function () {
      var tag = document.createElement("div");
      tag.textContent = "Test server";
      tag.setAttribute("aria-hidden", "true");
      tag.style.cssText = "position:fixed;left:8px;bottom:calc(8px + env(safe-area-inset-bottom,0px));z-index:99999;" +
        "background:#F47A12;color:#0A0B0C;font:700 11px/1 -apple-system,Segoe UI,Roboto,sans-serif;" +
        "padding:5px 8px;border-radius:99px;pointer-events:none;opacity:.9";
      document.body.appendChild(tag);
    });
  }
})();
