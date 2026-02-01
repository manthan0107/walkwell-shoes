const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const dotenv = require("dotenv");
const path = require("path");

// Load env vars from the parent directory (server root)
dotenv.config({ path: path.join(__dirname, "../.env") });

const seedAdmin = async () => {
    try {
        // Connect to MongoDB
        const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shoes-comet";
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected for seeding");

        // Check if user exists by email
        const existingUser = await User.findOne({ email: "admin@gmail.com" });
        const hashedPassword = await bcrypt.hash("admin123", 12);

        if (existingUser) {
            existingUser.password = hashedPassword;
            existingUser.role = "admin";
            await existingUser.save();
            console.log("Existing user updated to admin role!");
        } else {
            const newAdmin = new User({
                userName: "Admin",
                email: "admin@gmail.com",
                password: hashedPassword,
                role: "admin",
            });
            await newAdmin.save();
            console.log("Admin user created successfully!");
        }

        console.log("Email: admin@gmail.com");
        console.log("Password: admin123");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

seedAdmin();
