require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors"); // <--- Import cors
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth");
const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/orders");
const tableRoutes = require("./routes/tables");

const app = express();

// Middleware
app.use(helmet());
app.use(cors()); // <--- Enable CORS for all origins by default
app.use(morgan("dev"));
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/tables", tableRoutes);

// Error handler (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));