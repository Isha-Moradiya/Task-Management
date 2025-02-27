require("dotenv").config();
const cors = require("cors");

const express = require("express");
const app = express();

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

const authRoute = require("./router/auth-router");
app.use("/api/auth", authRoute);

const taskRoute = require("./router/task-router");
app.use("/api/task", taskRoute);

const errorMiddleware = require("./middleware/error-middleware");
app.use(errorMiddleware);

const connectDb = require("./utils/db");
const PORT = process.env.PORT || 3000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port:${PORT}`);
  });
});
