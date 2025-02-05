import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();
const API_URL = process.env.SECRETS_API_URL;

// For reference, we can use the axios documentation via the link below.
// https://axios-http.com/docs/post_example
// We must use the Secrets API documentation to figure out what each route expects and how to work with each route.
// https://secrets-api.appbrewery.com/

// Our bearer token generated from the secrets API.
const ourBearerToken = process.env.SECRETS_API_BEARER_TOKEN;

const config = {
  headers: { Authorization: `Bearer ${ourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  // We use axios to POST the data from req.body to the secrets api servers.
  const { id, secret, score } = req.body;
  try {
    const response = await axios.post(
      API_URL + "/secrets",
      {
        id: id,
        secret: secret,
        score: score,
      },
      config
    );
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/put-secret", async (req, res) => {
  // We use axios to PUT the data from req.body to the secrets api servers.
  const searchId = req.body.id;
  const { id, secret, score } = req.body;

  try {
    const response = await axios.put(
      API_URL + "/secrets/" + searchId,
      {
        id: id,
        secret: secret,
        score: score,
      },
      config
    );
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/patch-secret", async (req, res) => {
  // We use axios to PATCH the data from req.body to the secrets api servers.
  const searchId = req.body.id;
  const { id, secret, score } = req.body;

  try {
    const response = await axios.patch(
      API_URL + "/secrets/" + searchId,
      {
        id: id,
        secret: secret,
        score: score,
      },
      config
    );
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/delete-secret", async (req, res) => {
  //We use axios to DELETE the item with searchId from the secrets api servers.

  const searchId = req.body.id;

  try {
    const response = await axios.delete(
      API_URL + "/secrets/" + searchId,
      config
    );
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
