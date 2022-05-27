import { Button, Modal, TextareaAutosize, TextField } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalState$ } from "../../redux/selectors";
import useStyles from "./styles";
import FileBase64 from "react-file-base64";
import { createPost, hideModal } from "../../redux/actions";

export default function CreatePostModal() {
  const { isShow } = useSelector(modalState$);
  const classes = useStyles();
  const dispatch = useDispatch();

  // const [title, setTitle] = React.useState("");
  // const [content, setContent] = React.useState("");
  const [data, setData] = React.useState({
    title: "",
    content: "",
    attachment: "",
  });

  const onClose = React.useCallback(() => {
    dispatch(hideModal());
    setData({
      title: "",
      content: "",
      attachment: "",
    });
  }, [dispatch]);

  const onSubmit = React.useCallback(() => {
    console.log({ data });
    dispatch(createPost.createPostRequest(data));
    onClose();
  }, [data, dispatch, onClose]);

  const body = (
    <div className={classes.paper} id="simple-modal-title">
      <h2>Create New Post</h2>
      <form noValidate autoComplete="off" className={classes.form}>
        <TextField
          className={classes.title}
          required
          label={"Title"}
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />

        <TextareaAutosize
          className={classes.textArea}
          minRows={10}
          maxRows={15}
          placeholder="Content ... "
          value={data.content}
          onChange={(e) => setData({ ...data, content: e.target.value })}
        />

        <FileBase64
          multiple={false}
          accept="image/*"
          type="file"
          value={data.attachment}
          onDone={({ base64 }) => setData({ ...data, attachment: base64 })}
        />
        <div className={classes.footer}>
          <Button
            variant="contained"
            color="primary"
            component="span"
            fullwith="true"
            onClick={onSubmit}
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <Modal open={isShow} onClose={onClose}>
        {body}
      </Modal>
    </div>
  );
}
