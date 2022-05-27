import { PostModel } from "../models/PostModel.js";

export const getPosts = async (req, res, next) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createPosts = async (req, res, next) => {
  try {
    const newPost = req.body;
    const post = new PostModel(newPost);
    await post.save();

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updatePosts = async (req, res, next) => {
  try {
    const updatePost = req.body;
    const post = await PostModel.findOneAndUpdate(
      {
        _id: updatePost._id,
      },
      updatePost,
      { new: true }
    );

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deletePosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    await PostModel.findOneAndDelete({ _id: id });
    res.status(200).json({ status: true, message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ status: false, error: error });
  }
};
