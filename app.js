import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import apiRoutes from "./routes/secretApiRoutes.js";

const app = express();
env.config();
const port = process.env.APPLICATION_PORT;

// For reference, we can use the axios documentation via the link below.
// https://axios-http.com/docs/post_example
// We must use the Secrets API documentation to figure out what each route expects and how to work with each route.
// https://secrets-api.appbrewery.com/

app.use(bodyParser.urlencoded({ extended: true }));

app.use(apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
