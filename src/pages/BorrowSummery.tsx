/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAllBorrowBooksQuery } from "@/redux/featured/borrow.api";

const BorrowSummary = () => {
  const { data: allBorrowBooks, isLoading } = useAllBorrowBooksQuery();

  if (isLoading)
    return <div className="text-center py-20 text-gray-500">Loading...</div>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Borrow Summary</h1>

      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3 text-center border border-gray-300">Title</th>
              <th className="px-4 py-3 text-center border border-gray-300">ISBN</th>
              <th className="px-4 py-3 text-center border border-gray-300">Total Quantity</th>
            </tr>
          </thead>

          <tbody>
            {allBorrowBooks?.data?.map((borrow: any, index: number) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition border-b border-gray-200"
              >
                <td className="px-4 py-3 text-center border border-gray-200">{borrow.book.title}</td>
                <td className="px-4 py-3 text-center border border-gray-200">{borrow.book.isbn}</td>
                <td className="px-4 py-3 text-center border border-gray-200">{borrow.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowSummary;
