import Link from "next/link";
import { useUser } from "../context/useUser";
import useTimeAgo from "../hooks/useTimeAgo";
import Avatar from "./Avatar";

export default function Comment({
  idDeveet,
  idUser,
  username,
  avatar,
  content,
  createdAt,
  children,
}) {
  const timeago = useTimeAgo(new Date(createdAt));

  return (
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
          <Link href={`/${username}/status/${idDeveet}`}>
            <a>
              <time>{timeago}</time>
            </a>
          </Link>
        </header>
        <p>{content}</p>
      </section>
      <style jsx>{`
        article {
          padding: 10px 15px;
          display: flex;
          background-color: #ececec;
          border-radius: 10px;
        }
        p {
          margin: 0;
          margin-left: 10px;
        }
      `}</style>

      {children}
    </article>
  );
}
