import { lazy } from "react";

const JournalContainer = lazy(() => import("pages/Journal/JournalContainer"));

const EditJournalColumnContainer = lazy(() =>
  import("pages/Journal/EditJournalColumn/EditJournalColumnContainer")
);

const journalRoutes = [
  {
    path: "/general-journal",
    element: JournalContainer,
    private: true,
  },
  {
    path: "/edit-journal-column",
    element: EditJournalColumnContainer,
    private: true,
  },
];

export default journalRoutes;
