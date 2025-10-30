import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import AllBooks from "@/pages/AllBooks";
import AddBook from "@/pages/AddBook";
import BorrowSummery from "@/pages/BorrowSummery";
import BookDetails from "@/pages/BookDetails";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: App, 
    children: [
      { index:true, Component: AllBooks },
      { path:"/", Component: AddBook },
      { path:"/books/:id", Component: BookDetails },
      { path: "borrow", Component: BorrowSummery },
    ],
  },
]);

