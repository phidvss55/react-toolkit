import React from "react";
import {
  Card,
  Avatar,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { MoreVert, Favorite } from "@material-ui/icons";
import moment from "moment";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { deletePost, updatePost } from "../../../redux/actions";

export default function Post({ post }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLikeClick = React.useCallback(() => {
    dispatch(
      updatePost.updatePostRequest({ ...post, likeCount: post.likeCount++ })
    );
  }, [dispatch, post]);

  const handleDeletePost = React.useCallback(() => {
    dispatch(deletePost.deletePostRequest(post._id));
  }, [dispatch, post]);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar>A</Avatar>}
        title={post.author}
        subheader={moment(post.updatedAt).format("HH:MM MMM DD, YYYY")}
        action={
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVert />
          </IconButton>
        }
      ></CardHeader>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 150,
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
      </Menu>

      <CardMedia
        image={post.attachment || ""}
        title={post.title}
        className={classes.media}
      />
      <CardContent>
        <Typography variant="h5" color="textPrimary">
          {post.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.content}
        </Typography>
        <CardActions>
          <IconButton onClick={onLikeClick}>
            <Favorite />
            <Typography component="span" color="textSecondary">
              {post.likeCount} likes
            </Typography>
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
}
