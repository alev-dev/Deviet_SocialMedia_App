import Avatar from "./Avatar";
import Link from "next/link";
import useTimeAgo from "../hooks/useTimeAgo";
import Share from "../icons/Share";
import Star from "../icons/Star";
import ReactPlayer from "react-player";

export default function Deveet({
  avatar,
  username,
  content,
  id,
  img,
  video,
  idUser,
  createdAt,
  likes,
}) {
  const timeago = useTimeAgo(new Date(createdAt));

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
            <Link href={`/${username}/status/${id}`}>
              <a>
                <time>{timeago}</time>
              </a>
            </Link>
          </header>
          <p>{content}</p>
          {img && <img src={img} />}

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

      <style jsx>
        {`
          article {
            padding: 10px 15px;
            display: flex;
          }

          article:hover {
            background-color: #d8d8d8;
          }
          div {
            padding-right: 10px;
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
        `}
      </style>
    </div>
  );
}

/* export default function Deveet({
  avatar,
  username,
  idUser,
  content,
  likes,
  mediaUrl,
}) {
  return (
    <div className="card">
      <article>
        <div>
          <Avatar avatar={avatar} username={username} />
        </div>
        <section>
          <header>
            <Link href="/">
              <a>
                <strong>{username}</strong>
              </a>
            </Link>
            <span>.</span>
          </header>
          <p>{content}</p>
          <nav>
            <p>{likes}</p>
          </nav>
        </section>
      </article>
    </div>
  );
}
 */
