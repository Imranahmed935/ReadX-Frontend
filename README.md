
# 📚 Minimal Library Management System (readX)

A clean, responsive, and minimal **Library Management System** built using **React, TypeScript, Redux Toolkit Query (RTK Query)**, and **Tailwind CSS**.  
This frontend application allows users to manage books, perform CRUD operations, borrow books, and view borrow summaries — all without authentication.

---

## 🚀 Project Overview

This project demonstrates a fully functional **client-side application** interacting with a RESTful API.  
It focuses on **clean UI**, **efficient state management**, and **type-safe API integration** using RTK Query.

---

## ✨ Features

### 🔓 Public Access
All routes are open — no authentication required.

### 📘 Book Management
- View all books in a responsive table
- Add new books via modal or page form
- Edit existing book details instantly (with real-time updates)
- Delete books with confirmation dialog
- Borrow books directly from the list
- View individual book details

### 💼 Borrow Management
- Borrow books with quantity and due date
- Quantity cannot exceed available copies
- Automatically mark book as unavailable when copies reach zero
- Success notification after borrowing

### 📊 Borrow Summary
- Displays a summary of all borrowed books
- Columns: **Book Title**, **ISBN**, **Total Quantity Borrowed**

---

## 🧱 Pages & Routes

| Path | Description |
|------|--------------|
| `/books` | View all books with CRUD and borrow actions |
| `/books/:id` | Detailed view of a specific book |
| `/create-book` | Add a new book |
| `/edit-book/:id` | Edit an existing book |
| `/borrow/create` | Borrow a selected book |
| `/borrow` | View summary of all borrowed books |

---

## 🖥️ UI/UX & Design

- **Framework:** Tailwind CSS  
- **Style:** Clean, minimal, and fully responsive  
- **Experience:** Intuitive navigation, clearly labeled buttons, and simple forms  
- **Extras:** Rounded corners, subtle hover effects, and mobile-optimized layout  

---

## ⚙️ Technology Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React + TypeScript |
| State Management | Redux Toolkit + RTK Query |
| Styling | Tailwind CSS |
| Backend API | Node.js + Express.js + MongoDB (Mongoose) |

---

## 🧩 Folder Structure

```

src/
├── components/       # Reusable UI components (Navbar, Modals, Tables)
├── pages/            # Main pages (AllBooks, BorrowSummary, BookDetails)
├── redux/
│   ├── app/          # Store configuration
│   └── featured/     # RTK Query API slices
├── types/            # TypeScript types and interfaces
├── hooks/            # Custom hooks (if any)
└── main.tsx          # App entry point

````

---

## 🔗 API Integration

All API endpoints are consumed using **RTK Query** with type-safe requests and responses.  
Example:

```ts
booksDetails: builder.query({
  query: (id) => ({
    url: `/books/${id}`,
    method: "GET",
  }),
  providesTags: ["Books"],
});
````

---

## 🧠 Bonus Features

| Feature               | Description                             | Points |
| --------------------- | --------------------------------------- | ------ |
| Optimistic UI Updates | Instant updates without waiting for API | +2     |
| Toast Notifications   | SweetAlert2 / Toastify feedback         | +2     |
| Responsive Layout     | Fully mobile-friendly                   | +4     |
| Type-Safe Forms       | Ensured with TypeScript                 | +2     |

---

## 🧪 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/readX-Frontend.git
cd readx
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Create `.env` File

```bash
VITE_API_URL=https://assignment-3-murex-eta.vercel.app/api/v1
```

### 4️⃣ Run the Project

```bash
npm run dev
```

Visit: **[https://readx-alpha.vercel.app](https://readx-alpha.vercel.app)**

---

## 🌍 Deployment

This project is optimized for **Vercel deployment**.

Build Command:

```bash
vite build
```

Output Directory:

```
dist
```

---

## 🧾 Example API Endpoints

| Action          | Method | Endpoint          |
| --------------- | ------ | ----------------- |
| Get all books   | GET    | `/books/create`          |
| Get single book | GET    | `/books/:id`      |
| Add new book    | POST   | `/books`          |
| Update book     | PUT    | `/books/:id`      |
| Delete book     | DELETE | `/books/:id`      |
| Borrow book     | POST   | `/borrow/create`         |
| Borrow summary  | GET    | `/borrow` |

---

## 👨‍💻 Author

**Billionaire (Imran Ahmed)**
Frontend Developer — React, TailwindCSS, and TypeScript
📧 [imrantahir9918@gmail.com](mailto:imrantahir9918@gmail.com)
🌐 [GitHub Profile](https://github.com/Imranahmed935)

---
### ⭐ If you like this project, give it a star on GitHub!


