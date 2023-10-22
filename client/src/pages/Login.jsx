import { Button, Typography } from "@mui/material";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import React from "react";
import { TOKEN_KEY } from "../utils/constant";
import { Navigate } from "react-router-dom";

export default function Login() {
  const auth = getAuth();

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const res = await signInWithPopup(auth, provider);
    console.log("res", res);

    // const { data } = await graphQLRequest({
    //   query: `mutation register($uid: String!, $name: String!) {
    //   register(uid: $uid, name: $name) {
    //     uid
    //     name
    //   }
    // }`,
    //   variables: {
    //     uid,
    //     name: displayName,
    //   },
    // });
    console.log("register", { data });
  };

  if (localStorage.getItem(TOKEN_KEY)) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Welcome to Note App
      </Typography>
      <Button variant="outlined" onClick={handleLoginWithGoogle}>
        Login with Google
      </Button>
    </>
  );
}
