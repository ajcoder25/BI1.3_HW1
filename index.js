const Book = require("./model/book.model");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

// connect to the database

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("unable to connect to databse", error.message);
  }
};

connect();

//1. Add book to the database

const addNewBook = async (newBook) => {
  try {
    const bookData = new Book(newBook);
    const saveBook = await bookData.save();

    return saveBook;
  } catch (error) {
    console.log(error.message);
  }
};

app.post("/books", async (req, res) => {
  try {
    // Wathever user request in body I need to save it
    const saveBook = await addNewBook(req.body);
    if (saveBook) {
      res
        .status(201)
        .json({ message: "Sucessfully Saved", savedData: saveBook });
    }
  } catch (error) {
    res.status(404).json({ error: "Something is wrong" });
  }
});

// Q-3 Get all the books

const getAllBooks = async () => {
  try {
    const getBook = await Book.find();

    return getBook;
  } catch (error) {
    console.log("Unable to get the data from the database");
  }
};

// create a route to check all the books

app.get("/books", async (req, res) => {
  try {
    const showAllBooks = await getAllBooks();

    if (showAllBooks) {
      res.json(showAllBooks);
    } else {
      res.status(400).json({ error: "Something is wrong in route" });
    }
  } catch (error) {
    console.log("Issue in your API");
  }
});

// Q-4 Book's details by it's title

const bookdetailsByTitle = async (booktitle) => {
  try {
    const getBookTitle = await Book.findOne({ title: booktitle });
    return getBookTitle;
  } catch (error) {
    console.log(error.message);
  }
};

app.get("/books/:booktitle", async (req, res) => {
  try {
    const getBookValue = await bookdetailsByTitle(req.params.booktitle);
    if (getBookValue) {
      res
        .status(201)
        .json({ message: "Here is the data", bookvalue: getBookValue });
    } else {
      res.status(404).json({ error: "Data not found " });
    }
  } catch (error) {
    res.status(404).json({ error: "Unable to get the data" });
  }
});

//Q-5 Get details of author

const bookdetailsByAuthor = async (authorName) => {
  try {
    const getBook = await Book.find({ author: authorName });
    return getBook;
  } catch (error) {
    error: "Not able to fetch the data from database";
  }
};

app.get("/books/author/:authorName", async (req, res) => {
  try {
    const bookValue = await bookdetailsByAuthor(req.params.authorName);

    if (bookValue) {
      res.json(bookValue);
    } else {
      res.status(400).json({ error: "Not able to found data that is passed" });
    }
  } catch (error) {
    res.status(404).json({ error: "Not able to get the data" });
  }
});

//Q-6 Get all the books using Business genre

const bookByGenre = async (genreName) => {
  try {
    const getBookGenre = await Book.find({ genre: genreName });

    return getBookGenre;
  } catch (error) {
    console.log(error.message);
  }
};

app.get("/books/bookgenre/:bookgenre", async (req, res) => {
  try {
    const genreValue = await bookByGenre(req.params.bookgenre);
    if (genreValue && genreValue.length > 0) {
      res.json(genreValue);
    } else {
      res.status(404).json({ error: "Unable to find the data" });
    }
  } catch (error) {
    res.status(404).json({ error: "unable to find the genre passed" });
  }
});

// Q-7

// get all the books which is released in year 2012

const bookreleasedCheck = async (bookdate) => {
  try {
    const getReleased = await Book.find({ publishedYear: bookdate });
    return getReleased;
  } catch (error) {
    console.log(error.message);
  }
};

app.get("/books/publishedYear/:year", async (req, res) => {
  try {
    const checkBookYear = await bookreleasedCheck(req.params.year);

    if (checkBookYear && checkBookYear.length > 0) {
      res
        .status(200)
        .json({ message: "Sucessfully Done", bookYear: checkBookYear });
    } else {
      res.status(400).json({ error: "Not able to find the data " });
    }
  } catch (error) {
    console.log("Somethin wrong in the API");
  }
});

// Q-8 Update a book's rating with the help of its ID

const updateRating = async (bookId, dateUpdated) => {
  try {
    const findData = await Book.findByIdAndUpdate(bookId, dateUpdated, {
      new: true,
    });
    return findData;
  } catch (error) {
    console.log(error.message);
  }
};

app.post("/book/bookid/:bookId", async (req, res) => {
  try {
    const findBookId = await updateRating(req.params.bookId, req.body);

    console.log(findBookId);

    if (findBookId) {
      res
        .status(201)
        .json({ message: "sucessfully Updated", updatedData: findBookId });
    } else {
      res.status(404).json({ error: "Book does not exist" });
    }
  } catch (error) {
    res.status(404).json({ error: "something is wrong in the API" });
  }
});

// Question 9
const updateBookByTitle = async (title, updatedValue) => {
  try {
    const bookUpdate = await Book.findOneAndUpdate({ title }, updatedValue, {
      new: true,
    });
    return bookUpdate;
  } catch (error) {
    console.log(error.message);
  }
};

app.post("/book/booktitle/:title", async (req, res) => {
  try {
    const booktitle = await updateBookByTitle(req.params.title, req.body);

    if (booktitle) {
      res
        .status(201)
        .json({ message: "sucessfully updated", updatedData: booktitle });
    } else {
      res.status(404).json({ error: "Book doesn't exist" });
    }
  } catch (error) {
    res.status(404).json({ error: "Error in your route" });
  }
});

// Q-10

const bookDeleteUpdate = async (bookId) => {
  try {
    const bookDelete = await Book.findByIdAndDelete(bookId);

    return bookDelete;
  } catch (error) {
    console.log(error.message);
  }
};

app.delete("/book/bookdelete/:bookDelete", async (req, res) => {
  try {
    const deletedBookDetail = await bookDeleteUpdate(
      req.params.bookDelete,
      req.body
    );

    if (deletedBookDetail) {
      res
        .status(201)
        .json({ message: "Sucessfully deleted", book: deletedBookDetail });
    } else {
      res.status(404).json({ error: "Book not found " });
    }
  } catch (error) {
    res.status.json({ error: "Book not found" });
  }
});
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`You have connected to ${PORT}`);
// });

module.exports = app;
