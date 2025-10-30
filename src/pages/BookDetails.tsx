import { useBooksDetailsQuery } from "@/redux/featured/allBook.api";
import { useParams, useNavigate } from "react-router";
import { BookOpen, User, Bookmark, Layers, Hash, ArrowLeft } from "lucide-react";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: bookDetails, isLoading } = useBooksDetailsQuery(id);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[80vh] text-gray-600 text-lg">
        Loading book details...
      </div>
    );

  const book = bookDetails?.data;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-md rounded-xl border border-gray-200">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-700 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition mb-6"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {book?.title}
      </h1>

      <div className="grid md:grid-cols-2 gap-6 text-gray-700">
        <div className="space-y-3">
          <p className="flex items-center gap-2">
            <User className="text-blue-600" size={18} />{" "}
            <span className="font-semibold">Author:</span> {book?.author}
          </p>
          <p className="flex items-center gap-2">
            <Bookmark className="text-green-600" size={18} />{" "}
            <span className="font-semibold">Genre:</span> {book?.genre}
          </p>
          <p className="flex items-center gap-2">
            <Layers className="text-purple-600" size={18} />{" "}
            <span className="font-semibold">Copies:</span> {book?.copies}
          </p>
          <p className="flex items-center gap-2">
            <BookOpen className="text-orange-600" size={18} />{" "}
            <span className="font-semibold">Available:</span>{" "}
            {book?.available ? "Yes" : "No"}
          </p>
          <p className="flex items-center gap-2">
            <Hash className="text-gray-600" size={18} />{" "}
            <span className="font-semibold">ISBN:</span> {book?.isbn}
          </p>
        </div>

        <div className="border-l pl-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-600">
            {book?.description
              ? book?.description
              : "No description available for this book."}
          </p>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Created at: {new Date(book?.createdAt).toLocaleString()}</p>
        <p>Last updated: {new Date(book?.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default BookDetails;
