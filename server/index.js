const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { employeeModel, productModel } = require("./model/Employee");
const dotenv = require("dotenv");
// const jwt = require("jsonwebtoken");
const bodyparser = require("body-parser");
const multer = require("multer");
const path = require("path");

const port = process.env.PORT || 3001;

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());


//multer functionality
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  },
});

const upload = multer({ storage: storage });

// app.use("/uploads", express.static("uploads")); // for frontend to access images uploaded.

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// db connection
mongoose
  .connect("mongodb://127.0.0.1:27017/employee")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

  

// Login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Checking User Collection...");
    const user = await employeeModel.findOne({
      email: email.trim().toLowerCase(),
      password: password,
    });
    console.log("User Found in Database:", user);
    if (!user) {
      console.log("Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Role-based response
    if (user.email === "admin@gmail.com" && user.password === "admin") {
      console.log("Admin login successful");
      return res.status(200).json({
        message: "Admin login successful",
        name: user.name,
        email: user.email,
        role: "admin",
      });
    }

    console.log("User login successful");
    return res.status(200).json({
      message: "User login successful",
      name: user.name,
      email: user.email,
      role: "user",
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/register", async (req, res) => {
  try {
    const existing = await employeeModel.findOne({ email: req.body.email });
    if (existing) {
      return res.status(400).json({ alert: "User already registered" });
    }

    const newUser = await employeeModel.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//products post; create

app.post("/products", upload.single("image"), async (req, res) => {
  try {
    const { name, price } = req.body;
    const imagePath = req.file ? req.file.path : "";

    const product = new productModel({
      name,
      price,
      image: imagePath,
    });
    await product.save();
    res.status(200).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get aka read
app.get("/products", async (req, res) => {
  try {
    const productData = await productModel.find();
    if (!productData || productData.length === 0) {
      return res.status(404).json({ message: "Product data not found" });
    }
    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});


app.get("/products/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ errorMessage: error.message });
  }
});

// update
app.put("/products/:id", upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;
    let updatedData = { ...req.body };

    // If a new image is uploaded, update the image field
    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    // Find the product by its ID
    const productExist = await productModel.findById(id);
    if (!productExist) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product with the new data
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true, // This will return the updated product
      }
    );

    return res
      .status(200)
      .json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete

app.delete("/delete/product/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the product exists
    const productExist = await productModel.findById(id);
    if (!productExist) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Delete the product
    await productModel.findByIdAndDelete(id);

    // Send success response
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
