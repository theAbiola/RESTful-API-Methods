import express from "express";
import {
    getHomepage,
    getSecret,
    postSecret,
    putSecret,
    patchSecret,
    deleteSecret
} from "../controllers/secretApiController.js"

const router = express.Router()

router.get("/", getHomepage);

router.post("/get-secret", getSecret);

router.post("/post-secret", postSecret);

router.post("/put-secret", putSecret);

router.post("/patch-secret", patchSecret);

router.post("/delete-secret", deleteSecret);

export default router;