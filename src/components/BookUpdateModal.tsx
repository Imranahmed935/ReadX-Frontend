/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateBookMutation } from "@/redux/featured/allBook.api";
import { Edit } from "lucide-react";
import { toast } from "sonner";

interface BookUpdateModalProps {
  book: any;
}

const genres = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

const BookUpdateModal = ({ book }: BookUpdateModalProps) => {
  const [updateBook] = useUpdateBookMutation();
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [isbn, setIsbn] = useState(book?.isbn || "");
  const [genre, setGenre] = useState(book?.genre || "");
  const [copies, setCopies] = useState(book?.copies || 1);
  const [available, setAvailable] = useState(book?.available ?? true);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setIsbn(book.isbn);
      setGenre(book.genre);
      setCopies(book.copies);
      setAvailable(book.available);
    }
  }, [book]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = { title, author, isbn, genre, copies, available };

    try {
      await updateBook({ id: book._id, data: updatedData }).unwrap();
      toast.success("Book Updated successfully")
      setOpen(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit size={20} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription>
            Update book details and save changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
          <div className="grid gap-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="isbn">ISBN</Label>
            <Input
              id="isbn"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
          </div>

          <div className="grid gap-1 w-full">
            <Label htmlFor="genre">Genre</Label>
            <Select value={genre} onValueChange={(val) => setGenre(val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a genre" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {genres.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1">
            <Label htmlFor="copies">Copies</Label>
            <Input
              id="copies"
              type="number"
              min={1}
              value={copies}
              onChange={(e) => setCopies(Number(e.target.value))}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="available"
              checked={available}
              onCheckedChange={(checked) => setAvailable(!!checked)}
            />
            <Label htmlFor="available">Available</Label>
          </div>

          <Button type="submit" className="w-full mt-2">
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookUpdateModal;
