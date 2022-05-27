import React from "react";
import { Container, Fab } from "@material-ui/core";
import Header from "../components/Header";
import PostList from "../components/PostList";
import { Add as AddIcon } from "@material-ui/icons";
import useStyles from "./styles";
import CreatePostModal from "../components/CreatePostModal";
import { useDispatch } from "react-redux";
import { showModal } from "../redux/actions";

export default function HomePage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const openCreateModal = React.useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" className={""}>
      <Header />
      <PostList />

      <CreatePostModal />

      <Fab color="primary" className={classes.fab} onClick={openCreateModal}>
        <AddIcon />
      </Fab>
    </Container>
  );
}
