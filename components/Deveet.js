import Avatar from "./Avatar";
import Link from "next/link";
import useTimeAgo from "../hooks/useTimeAgo";
import ReactPlayer from "react-player";
import CommentIcon from "../icons/Comment";
import Ok from "../icons/Ok";
import { useEffect, useState } from "react";
import { useUser } from "../context/useUser";
import Comment from "../components/Comment";
import axios from "axios";
import Delete from "../icons/Delete";
import Like from "../icons/Like";

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
  children,
}) {
  const { user } = useUser();
  const timeago = useTimeAgo(new Date(createdAt));
  const [comment, setcomment] = useState("");
  const [commentsState, setCommentsState] = useState(comments);
  const [inputVisible, setinputVisible] = useState(false);
  const [likesState, setlikesState] = useState([]);

  useEffect(() => {
    setlikesState(likes);
  }, []);

  const sendComment = async () => {
    var newComment = {
      idDeveet: _id,
      idUser: user.googleId,
      username: user.username,
      avatar: user.avatar,
      content: comment,
      createdAt: new Date(),
    };
    await axios
      .put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deveet/${_id}`, {
        comments: [...comments, newComment],
        likes: likesState,
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
        comments: res,
        likes: likesState,
      })
      .then((res) => {
        setCommentsState(res);
        console.log("updated");
      });
  };
  const handleLikeButton = async () => {
    const pos = likesState.findIndex((like) => like.userId === user.googleId);
    var aux = likesState;
    if (pos === -1) {
      setlikesState([
        ...likesState,
        { userId: user.googleId, avatar: user.avatar, name: user.username },
      ]);
      await axios
        .put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deveet/${_id}`, {
          comments: comments,
          likes: [
            ...likesState,
            { userId: user.googleId, avatar: user.avatar, name: user.username },
          ],
        })
        .then((res) => {});
    } else {
      aux.splice(pos, 1);
      setlikesState([...aux]);
      await axios
        .put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deveet/${_id}`, {
          comments: comments,
          likes: aux,
        })
        .then(() => {});
    }
  };

  return (
    <div className="card">
      <article>
        <div id="profile">
          <Avatar avatar={avatar} alt={username} />
        </div>

        <section>
          <header>
            <Link
              htmlFor="profile"
              href={
                user.googleId === idUser ? "/myprofile" : `/profile/${idUser}`
              }
            >
              <a>
                <strong>{username}</strong>
              </a>
            </Link>
            <span> . </span>
            <Link href={`/${username}/status/${_id}`}>
              <a className="backgroundLink">
                <time>{timeago}</time>
              </a>
            </Link>
            {children}
          </header>
          <p>{content}</p>
          {img && (
            <Link href={img}>
              <a>
                <img className="imgDeveet" src={img} />
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
        <div className="sectionLike">
          <label onClick={() => handleLikeButton()}>
            <Like
              fill={
                likesState.findIndex((like) => like.userId === user.googleId) !=
                -1
                  ? "#e90a0a"
                  : "none"
              }
            />
          </label>
          <strong>{likesState.length}</strong>
        </div>
        <div className="sectionComment">
          <label onClick={() => setinputVisible(!inputVisible)}>
            <CommentIcon />
          </label>
          {!inputVisible && <strong>{commentsState.length}</strong>}
        </div>
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
      <div className="likesUser">
        {likesState.length > 0 &&
          likesState.map((item, index) => (
            <img
              key={index}
              className="likeImg"
              src={item.avatar}
              height="22"
            ></img>
          ))}
      </div>
      <div className="areaComments">
        {user &&
          commentsState.length > 0 &&
          commentsState.map((item, index) => (
            <Comment key={index} {...item}>
              <label className="delete" onClick={() => deleteComment(index)}>
                {user.googleId === item.idUser && (
                  <Delete width={21} height={21} />
                )}
              </label>
            </Comment>
          ))}
      </div>

      <style jsx>
        {`
          .comments {
            max-height: 200px;
          }
          .delete,
          .sectionComment {
            margin-left: 10px;
          }
          .areaComments {
            overflow-y: scroll;
            max-height: 200px;
          }
          .backgroundLink {
          }
          .sectionLike {
            display: flex;
            align-items: center;
          }
          .sectionComment {
            display: flex;
            align-items: center;
          }
          .likesUser {
            display: flex;
          }
          .likeImg {
            border-radius: 999px;
            margin-left: 8px;
            margin-bottom: 2px;
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
          .imgDeveet {
            width: 100%;
            height: auto;
            border-radius: 16px;
            margin-top: 10px;
          }
          section {
            width: 100%;
          }
          a {
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
