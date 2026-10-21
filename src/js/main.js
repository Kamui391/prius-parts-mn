import { getLanguage } from "./core/i18n.js";
import { initRouter } from "./core/router.js";
import { routes } from "./core/routes.js";
import { mountNavbar } from "./components/navbar.js";
import { mountFooter } from "./components/footer.js";

document.documentElement.lang = getLanguage();

mountNavbar(document.getElementById("navbar"));
mountFooter(document.getElementById("footer"));

initRouter(routes);