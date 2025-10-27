import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import AllBooks from "@/pages/AllBooks";
import AddBook from "@/pages/AddBook";
import BorrowSummery from "@/pages/BorrowSummery";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: App, 
    children: [
      { path: "all", Component: AllBooks },
      { path: "add", Component: AddBook },
      { path: "borrow", Component: BorrowSummery },
    ],
  },
]);

