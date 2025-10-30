/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar } from "lucide-react";
import { useBorrowBookMutation } from "@/redux/featured/borrow.api";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface BorrowModalProps {
  book?: any;
}

const BorrowModal = ({ book }: BorrowModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) return toast.success("Please select a book");
    if (!dueDate) return toast.success("Please select a due date");

    

    const borrowData = {
      book,
      quantity,
      dueDate,
    };

    try {
      await borrowBook(borrowData).unwrap();
      navigate("/borrow");
      toast.success("Book borrowed successfully!");
      setQuantity(0);
      setDueDate("");
      setOpen(false);
    } catch (err) {
      console.error("Borrow failed:", err);
     if(book.copies < quantity){
      toast.error("Ops! Unavailable")
    }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <BookOpen size={20} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Borrow a Book</DialogTitle>
          <DialogDescription>
            Fill in the details to borrow a book from the library.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
          <div className="grid gap-1 w-full">
            <Label htmlFor="book">Book Title</Label>
            <Input
              id="book"
              value={book.title}
              readOnly
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="Enter quantity"
            />
          </div>

          {/* Due Date */}
          <div className="grid gap-1">
            <Label htmlFor="dueDate">Due Date</Label>
            <div className="flex items-center gap-2">
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full"
                placeholder="Pick a date"
              />
              <Calendar size={20} className="text-muted-foreground" />
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full mt-2" disabled={isLoading}>
            {isLoading ? "Borrowing..." : "Confirm Borrow"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowModal;
