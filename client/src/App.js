import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import EditPage from "./components/edit/EditPage";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Post from "./components/post/Post";
import PostListing from "./components/post/PostListing";

const App = () => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [isOpenPost, setIsOpenPost] = React.useState(false);

  const pending = useSelector((state) => state.user.pending);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    setIsOpenPost(false);
  }, [isEdit]);

  return (
    <div className="App">
      {isEdit ? (
        <EditPage setEdit={setIsEdit} />
      ) : !isEdit && !isOpenPost ? (
        <>
          <Header setEdit={setIsEdit} />
          <div className="post-container ">
            <PostListing />
          </div>
          <Footer isOpenPost={isOpenPost} setIsOpenPost={setIsOpenPost} />
        </>
      ) : isOpenPost ? (
        <Post setIsOpenPost={setIsOpenPost} />
      ) : (
        ""
      )}
      {!isEdit && pending && <div className="loading">Loading...</div>}
      {!isEdit && error && (
        <div className="error">Error something wrong happen</div>
      )}
    </div>
  );
};

export default App;
