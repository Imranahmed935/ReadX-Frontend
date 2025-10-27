/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAllBorrowBooksQuery } from "@/redux/featured/borrow.api";


const BorrowSummery = () => {
  const { data: allBorrowBooks, isLoading } = useAllBorrowBooksQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Borrow Summary</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-border rounded-lg bg-card">
          <thead className="bg-secondary text-secondary-foreground">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">ISBN</th>
              <th className="px-4 py-2 text-left">Total Quantity</th>

            </tr>
          </thead>

          <tbody>
            {allBorrowBooks?.data?.map((borrow: any, index: number) => (
              <tr key={index} className="hover:bg-muted/20 transition">
                <td className="px-4 py-2">{borrow.book.title}</td>
                <td className="px-4 py-2">{borrow.book.isbn}</td>
                <td className="px-4 py-2">{borrow.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowSummery;
