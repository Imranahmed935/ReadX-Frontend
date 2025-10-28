/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAllBooksQuery, useDeleteBookMutation } from "@/redux/featured/allBook.api";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import AddBookModal from "@/components/AddBookModal";
import BookUpdateModal from "@/components/BookUpdateModal";
import BorrowModal from "@/components/BorrowModal";

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

  if (isLoading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
  <div className="flex justify-between items-center py-4">
    <h1 className="text-2xl font-bold mb-6">All Books</h1>
    <AddBookModal />
  </div>

  <div className="overflow-x-auto border rounded-xl">
    <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white">
      <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
        <tr>
          <th className="px-4 py-3 text-left border border-gray-300">Title</th>
          <th className="px-4 py-3 text-left border border-gray-300">Author</th>
          <th className="px-4 py-3 text-left border border-gray-300">Genre</th>
          <th className="px-4 py-3 text-left border border-gray-300">Copies</th>
          <th className="px-4 py-3 text-left border border-gray-300">Available</th>
          <th className="px-4 py-3 text-center border border-gray-300">Actions</th>
        </tr>
      </thead>

      <tbody>
        {allBook?.data?.map((book: any) => (
          <tr key={book._id} className="hover:bg-gray-50 transition border-b border-gray-200">
            <td className="px-4 py-3 border border-gray-200">{book.title}</td>
            <td className="px-4 py-3 border border-gray-200">{book.author}</td>
            <td className="px-4 py-3 border border-gray-200">{book.genre}</td>
            <td className="px-4 py-3 border border-gray-200">{book.copies}</td>
            <td className="px-4 py-3 border border-gray-200">{book.available ? "Available" : "Unavailable"}</td>
            <td className="px-4 py-3 border border-gray-200 text-center flex justify-center gap-2">
              <button
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={() => handleDelete(book._id)}
              >
                <Trash2 size={18} />
              </button>
              <BookUpdateModal book={book} />
              <BorrowModal book={book} /> 
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Pagination */}
  <div className="flex justify-center gap-3 mt-6">
    <button
      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
      className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition disabled:opacity-50"
      disabled={page === 1}
    >
      Prev
    </button>
    <span className="px-4 py-2 bg-gray-100 rounded">{page}</span>
    <button
      onClick={() => setPage((prev) => prev + 1)}
      className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition disabled:opacity-50"
      disabled={allBook?.data?.length < limit}
    >
      Next
    </button>
  </div>
</div>

  );
};

export default AllBooks;
