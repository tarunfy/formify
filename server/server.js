import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import users from "./routes/users.js";
import forms from "./routes/forms.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 6000;

//global middlewares
app.use(
  cors({
    origin: "https://formifyy.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes:
app.get("/", (req, res) => {
  res.send("Hello");
});

app.use(users);
app.use(forms);

mongoose
  .connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
