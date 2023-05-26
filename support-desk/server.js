const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();

const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

// connect to db
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcame to support API" });
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));

// file routes
app.use("/api/upload", require("./routes/fileRouts"));


const { errorHandler } = require("./midddlewere/errorMiddlerwere");
app.use(errorHandler);

app.listen(PORT, () => {
    console.log("server started on port:", PORT);
});