import express from "express";
import {
  getPosts,
  createPosts,
  updatePosts,
  deletePosts,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);

router.post("/", createPosts);

router.post("/update", updatePosts);

router.delete("/:id", deletePosts);

export default router;
