const express =  require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api", userRoutes);

// Sample Route
app.get("/", (req, res) => {
    res.send("API is running...");
});


// Connect to MongoDB
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.log(err));