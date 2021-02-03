import Avatar from "./Avatar";
import Link from "next/link";
import useTimeAgo from "../hooks/useTimeAgo";
import ReactPlayer from "react-player";
import CommentIcon from "../icons/Comment";
import Ok from "../icons/Ok";
import { useState } from "react";
import { useUser } from "../context/useUser";
import Comment from "../components/Comment";
import axios from "axios";
import Delete from "../icons/Delete";

export default function Deveet({
  avatar,
  username,
  content,
  _id,
  img,
  video,
  idUser,
  createdAt,
  likes,
  comments,
}) {
  const { user } = useUser();
  const timeago = useTimeAgo(new Date(createdAt));
  const [comment, setcomment] = useState("");
  const [commentsState, setCommentsState] = useState(comments);
  const [inputVisible, setinputVisible] = useState(false);

  const sendComment = async () => {
    var newComment = {
      idDeveet: _id,
      idUser: user.id,
      username: user.name,
      avatar: user.picture,
      content: comment,
      createdAt: new Date(),
    };
    await axios
      .put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deveet/${_id}`, {
        avatar,
        username,
        content,
        img,
        video,
        idUser,
        likes,
        comments: [...comments, newComment],
      })
      .then((res) => {
        setCommentsState([...commentsState, newComment]);
        setcomment("");
      });
  };

  const deleteComment = async (index) => {
    var res = comments;
    res.splice(index, 1);

    await axios
      .put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deveet/${_id}`, {
        avatar,
        username,
        content,
        img,
        video,
        idUser,
        likes,
        comments: res,
      })
      .then((res) => {
        setCommentsState(res);
        console.log("updated");
      });
  };

  return (
    <div className="card">
      <article>
        <div>
          <Avatar avatar={avatar} alt={username} />
        </div>

        <section>
          <header>
            <Link href={`/profile/${idUser}`}>
              <a>
                <strong>{username}</strong>
              </a>
            </Link>
            <span> . </span>
            <Link href={`/${username}/status/${_id}`}>
              <a>
                <time>{timeago}</time>
              </a>
            </Link>
          </header>
          <p>{content}</p>
          {img && (
            <Link href={img}>
              <a>
                <img src={img} />
              </a>
            </Link>
          )}

          {video && (
            <ReactPlayer
              url={video}
              controls={true}
              width="100%"
              height="400px"
            />
          )}
        </section>
      </article>
      <nav>
        <label onClick={() => setinputVisible(!inputVisible)}>
          <CommentIcon />
        </label>
        <form>
          <input
            type="text"
            onChange={(event) => setcomment(event.target.value)}
            value={comment}
          ></input>
          {comment.length > 0 && (
            <label onClick={(event) => sendComment()}>
              <Ok />
            </label>
          )}
        </form>
      </nav>
      <div className="areaComments">
        {user &&
          commentsState.length > 0 &&
          commentsState.map((item, index) => (
            <Comment key={index} {...item}>
              <label className="delete" onClick={() => deleteComment(index)}>
                {user.id === item.idUser && <Delete width={21} height={21} />}
              </label>
            </Comment>
          ))}
      </div>

      <style jsx>
        {`
          .comments {
            max-height: 200px;
          }
          .delete {
            margin-left: 10px;
          }
          .areaComments {
            overflow-y: scroll;
            max-height: 200px;
          }

          h5 {
            margin: 0;
            text-align: center;
          }
          article {
            padding: 10px 15px;
            display: flex;
          }
          form {
            display: flex;
            display: ${!inputVisible && "none"};
          }

          article:hover {
            background-color: #d8d8d8;
          }
          div {
            padding-right: 10px;
          }
          label {
            transition: all ease 0.8s;
          }
          .card {
            border-bottom: 1px solid #eee;
          }
          p {
            margin: 0;
          }
          time {
            color: #555;
            font-size: 14px;
          }
          img {
            width: 100%;
            height: auto;
            border-radius: 16px;
            margin-top: 10px;
          }
          section {
            width: 100%;
          }
          a: {
            text-decoration: none;
          }
          nav {
            display: flex;
            justify-content: space-around;
            transition: all ease-in 0.7s;
            margin-bottom: 4px;
          }
          .info {
            display: flex;
          }
          p {
            font-size: 15px;
          }
          .num {
            display: flex;
            justify-content: center;
            align-content: center;
            flex-direction: column;
          }
          a:hover {
            text-decoration: underline;
          }
          form {
            margin: 0;
          }
          input {
            border: 1px solid #eee;
            margin-right: 5px;
          }
        `}
      </style>
    </div>
  );
}
