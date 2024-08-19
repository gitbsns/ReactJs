import { lazy } from "react";

const CreateBillingContainer = lazy(() =>
  import("pages/Billing/Create/CreateBillingContainer")
);

const BillingContainer = lazy(() => import("pages/Billing/BillingContainer"));

const EditBillColumnContainer = lazy(() =>
  import("pages/Billing/EditBillColumn/EditBillColumnContainer")
);

const billRoutes = [
  {
    path: "/create-billing",
    element: CreateBillingContainer,
    private: true,
  },
  {
    path: "/billing",
    element: BillingContainer,
    private: true,
  },
  {
    path: "/edit-bill-column",
    element: EditBillColumnContainer,
    private: true,
  },
];

export default billRoutes;
