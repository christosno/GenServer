const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require('cors');

const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

// connect to db
connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcame to support API" });
});

// User Routes
app.use("/api/users", require("./routes/userRoutes"));

// file routes
app.use("/api/files", require("./routes/fileRouts"));

// ticket routes
app.use("/api/tickets", require("./routes/ticketRoutes"));


const { errorHandler } = require("./midddlewere/errorMiddlerwere");
app.use(errorHandler);

app.listen(PORT, () => {
    console.log("server started on port:", PORT);
});