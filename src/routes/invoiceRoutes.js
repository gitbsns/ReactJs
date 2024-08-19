import { lazy } from "react";

const CreateInvoiceContainer = lazy(() =>
  import("pages/Invoices/Create/CreateInvoiceContainer")
);

const InvoicesContainer = lazy(() =>
  import("pages/Invoices/InvoicesContainer")
);

const EditInvoicesColumnContainer = lazy(() =>
  import("pages/Invoices/EditInvoicesColumn/EditInvoicesColumnContainer")
);

const invoiceRoutes = [
  {
    path: "/create-invoice",
    element: CreateInvoiceContainer,
    private: true,
  },
  {
    path: "/invoices",
    element: InvoicesContainer,
    private: true,
  },
  {
    path: "/edit-invoice-column",
    element: EditInvoicesColumnContainer,
    private: true,
  },
];

export default invoiceRoutes;
