import axios from "axios";
import env from "dotenv"
env.config()

// Our bearer token generated from the secrets API.
const ourBearerToken = process.env.SECRETS_API_BEARER_TOKEN;
const API_URL = process.env.SECRETS_API_URL;

const config = {
    headers: { Authorization: `Bearer ${ourBearerToken}` },
};

const getHomepage = (req, res) => {
    res.render("index.ejs", { content: "Waiting for data..." });
}

const getSecret = async (req, res) => {
    const searchId = req.body.id;
    try {
        const result = await axios.get(API_URL + "/secrets/" + searchId, config);
        res.render("index.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
}

const postSecret = async (req, res) => {
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
}

const putSecret = async (req, res) => {
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
}

const patchSecret = async (req, res) => {
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
}

const deleteSecret = async (req, res) => {
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
}

export { getHomepage, getSecret, postSecret, putSecret, patchSecret, deleteSecret }