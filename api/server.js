import mongoose from "mongoose";
import app from "./app.js";

// The server will start only if the connection to database is established
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(process.env.PORT || "3000", () => {
            console.log(`Server started on port ${process.env.PORT || "3000"}`)
        })
    })
    .catch(err => {
        console.log(err);
    });
