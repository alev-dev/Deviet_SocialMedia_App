import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useUser } from "../context/useUser";
export default function Home() {
  const router = useRouter();
  const { user, getUser } = useUser();

  useEffect(() => {
    getUser(() => {
      if (router.pathname === "/") {
        router.replace("/timeline");
      }
    });
  }, []);

  const responseGoogle = ({ tokenId, profileObj }) => {
    const { name, imageUrl, email, googleId } = profileObj;
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`, {
        username: name,
        email,
        googleId,
        avatar: imageUrl,
      })
      .then((res) => {
        console.log("user created");
      })
      .catch((err) => {
        console.log("user exist");
      });
    localStorage.setItem("token", tokenId);
    getUser(() => {
      router.replace("/timeline");
    });
  };

  return (
    <div>
      <img src="img/logo.png" alt="" />
      <h2>Welcome to Devit</h2>
      <h3>A site social to talk about development with developers</h3>

      {user === null ? (
        <GoogleLogin
          clientId="365928965363-tiqenhoq6ifss2r9jighm1d0lhvinnlr.apps.googleusercontent.com"
          buttonText="Login"
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <h4> Iniciar sesion con google</h4>
            </button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      ) : (
        <div className="loader"></div>
      )}

      <style jsx>
        {`
          div {
            display: grid;
            height: 100%;
            place-items: center;
            place-content: center;
          }
          h3 {
            text-align: center;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-style: italic;
          }
          h2 {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-style: italic;
            font-size: x-large;
            text-shadow: 1px 1px #09f;
          }
          button {
            background-color: #09f;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            decoration: none;
            transition: all ease-in 0.7s;
            margin-top: 10px;
            box-shadow: 1px 5px 10px grey;
          }
          button:hover {
            background-color: #07f;
          }
        `}
      </style>
    </div>
  );
}
