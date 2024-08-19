import { lazy } from "react";

const LandingContainer = lazy(() => import("pages/Landing/LandingContainer"));

const landingRoutes = [
  {
    path: "/",
    element: LandingContainer,
    private: false,
  },
];

export default landingRoutes;
