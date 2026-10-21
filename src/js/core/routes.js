import { renderHomePage } from "../pages/homePage.js";
import { renderPartsPage } from "../pages/partsPage.js";
import { renderCalculatorPage } from "../pages/calculatorPage.js";
import { renderSuppliersPage } from "../pages/suppliersPage.js";
import { renderContactPage } from "../pages/contactPage.js";
import { renderNotFoundPage } from "../pages/notFoundPage.js";

export const routes = {
  "#/home": { titleKey: "nav.home", render: renderHomePage },
  "#/parts": { titleKey: "nav.parts", render: renderPartsPage },
  "#/calculator": { titleKey: "nav.calculator", render: renderCalculatorPage },
  "#/suppliers": { titleKey: "nav.suppliers", render: renderSuppliersPage },
  "#/contact": { titleKey: "nav.contact", render: renderContactPage },
  "#/404": { titleKey: "notFound.title", render: renderNotFoundPage },
};