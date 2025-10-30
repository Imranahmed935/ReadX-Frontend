/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateBookMutation } from "@/redux/featured/allBook.api";
import { toast } from "sonner"; 

interface FormErrors {
  title?: string;
  author?: string;
  isbn?: string;
  genre?: string;
  copies?: string;
}

const genres = ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"];

const AddBookModal = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [genre, setGenre] = useState("");
  const [copies, setCopies] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const [createBook, { isLoading }] = useCreateBookMutation();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!author.trim()) newErrors.author = "Author is required";
    if (!isbn.trim()) newErrors.isbn = "ISBN is required";
    if (!genre) newErrors.genre = "Genre is required";
    if (copies < 1) newErrors.copies = "Copies must be at least 1";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const bookData = { title, author, isbn, genre, copies };

    try {
      await createBook(bookData).unwrap();
      toast.success("Book added successfully!");
      setOpen(false); 
      navigate("/"); 
    } catch (error: any) {
      console.error("Failed to add book:", error);
      toast.error("Failed to add book. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a New Book</DialogTitle>
          <DialogDescription>
            Fill out the information below to add a new book to the library.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
          <div className="grid gap-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div className="grid gap-1">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={errors.author ? "border-red-500" : ""}
            />
            {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
          </div>

          <div className="grid gap-1">
            <Label htmlFor="isbn">ISBN</Label>
            <Input
              id="isbn"
              placeholder="Enter ISBN number"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              className={errors.isbn ? "border-red-500" : ""}
            />
            {errors.isbn && <p className="text-red-500 text-sm">{errors.isbn}</p>}
          </div>

          <div className="grid gap-1 w-full">
            <Label htmlFor="genre">Genre</Label>
            <Select onValueChange={(value) => setGenre(value)} value={genre}>
              <SelectTrigger
                className={`w-full ${errors.genre ? "border-red-500" : ""}`}
              >
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
            {errors.genre && <p className="text-red-500 text-sm">{errors.genre}</p>}
          </div>

          <div className="grid gap-1">
            <Label htmlFor="copies">Copies</Label>
            <Input
              id="copies"
              type="number"
              placeholder="Enter number of copies"
              value={copies}
              min={1}
              onChange={(e) => setCopies(Number(e.target.value))}
              className={errors.copies ? "border-red-500" : ""}
            />
            {errors.copies && <p className="text-red-500 text-sm">{errors.copies}</p>}
          </div>

          <Button type="submit" className="mt-2 w-full" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Book"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookModal;
