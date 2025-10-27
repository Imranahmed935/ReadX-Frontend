import { useState } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [available, setAvailable] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const bookData = { title, author, isbn, genre, copies, available };
    console.log("Book Data:", bookData);

    // Reset form
    setTitle("");
    setAuthor("");
    setIsbn("");
    setGenre("");
    setCopies(1);
    setAvailable(true);
    setErrors({});
  };

  return (
    <Dialog>
      <DialogTrigger>
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
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              className={errors.isbn ? "border-red-500" : ""}
            />
            {errors.isbn && <p className="text-red-500 text-sm">{errors.isbn}</p>}
          </div>

          <div className="grid gap-1">
            <Label htmlFor="genre">Genre</Label>
            <Select onValueChange={(value) => setGenre(value)} value={genre}>
              <SelectTrigger className={errors.genre ? "border-red-500" : ""}>
                <SelectValue placeholder="Select a genre" />
              </SelectTrigger>
              <SelectContent>
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
              value={copies}
              min={1}
              onChange={(e) => setCopies(Number(e.target.value))}
              className={errors.copies ? "border-red-500" : ""}
            />
            {errors.copies && <p className="text-red-500 text-sm">{errors.copies}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="available"
              checked={available}
              onCheckedChange={(checked) => setAvailable(!!checked)}
            />
            <Label htmlFor="available">Available</Label>
          </div>

          <Button type="submit" className="mt-2">
            Add Book
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookModal;
