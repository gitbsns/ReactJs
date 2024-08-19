import billRoutes from "./billRoutes";
import invoiceRoutes from "./invoiceRoutes";
import journalRoutes from "./journalRoutes";
import landingRoutes from "./landingRoutes";

const routes = Object.freeze([
  ...landingRoutes,
  ...invoiceRoutes,
  ...billRoutes,
  ...journalRoutes,
]);

export default routes;
