import express, { response } from "express";
import router from "./routes/index.mjs";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(router);

app.get("/", (request, response) => {
  response.status(201).send({ message: "welcome to the woorld of express" });
});

app.listen(PORT, () => {
  console.log(`server is lisening on port ${PORT}`);
});
