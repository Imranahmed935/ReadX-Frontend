/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAllBooksQuery, useDeleteBookMutation } from "@/redux/featured/allBook.api";
import { Trash2, Edit, BookOpen } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Button } from "@/components/ui/button";
import AddBookModal from "@/components/AddBookModal";


const AllBooks = () => {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data: allBook, isLoading } = useAllBooksQuery({ page, limit });
  const [deleteBook] = useDeleteBookMutation(); 


  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBook(id).unwrap(); 
          Swal.fire("Deleted!", "The book has been deleted.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Failed to delete the book.", "error");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "The book is safe :)", "info");
      }
    });
  };

  if (isLoading) return <div className=" text-center py-20">Loading...</div>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
<div className="flex justify-between items-center py-4">
      <h1 className="text-2xl font-bold mb-6">All Books</h1>
      <Button><AddBookModal/></Button>
</div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-border rounded-lg bg-card">
          <thead className="bg-secondary text-secondary-foreground">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Author</th>
              <th className="px-4 py-2 text-left">Genre</th>
              <th className="px-4 py-2 text-left">Copies</th>
              <th className="px-4 py-2 text-left">Available</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {allBook?.data?.map((book: any) => (
              <tr key={book.isbn} className="hover:bg-muted/20 transition">
                <td className="px-4 py-2">{book.title}</td>
                <td className="px-4 py-2">{book.author}</td>
                <td className="px-4 py-2">{book.genre}</td>
                <td className="px-4 py-2">{book.copies}</td>
                <td className="px-4 py-2">{book.available ? "Available" : "Unavailable"}</td>
                <td className="px-4 py-2 text-center flex justify-center gap-4">
                  <button
                    className="hover:text-destructive transition"
                    onClick={() => handleDelete(book._id)}
                  >
                    <Trash2 size={20} />
                  </button>
                  <button className="hover:text-accent transition">
                    <Edit size={20} />
                  </button>
                  <button className="hover:text-primary transition">
                    <BookOpen size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-muted transition"
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="px-4 py-2">{page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-muted transition"
          disabled={allBook?.data?.length < limit}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllBooks;
