import { useEffect, useState } from "react";
import Link from "next/link";
import Back from "../../../icons/Back";
import Avatar from "../../../components/Avatar";
import Deveet from "../../../components/Deveet";
import axios from "axios";

export default function Profile({ user }) {
  const [timeLine, settimeLine] = useState([]);

  useEffect(() => {
    if (user) {
      if (user.username) {
        getDeveets();
      }
    }
  }, []);

  const getDeveets = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deveet/user/${user.googleId}`
    );
    settimeLine(data);
  };

  return (
    <>
      <header>
        <Link href="/timeline">
          <a>
            <Back width={32} height={32} />
          </a>
        </Link>
        {user !== undefined && user !== null && (
          <Avatar avatar={user.avatar}></Avatar>
        )}
        {user && (
          <div className="name">
            <h4>{user.username}</h4>
            <p>{timeLine.length} Deveets</p>
          </div>
        )}
      </header>

      {timeLine &&
        timeLine.map((deveet, index) => (
          <Deveet key={deveet._id} {...deveet} />
        ))}
      <style jsx>
        {`
          header {
            display: flex;
            align-items: center;
            background: #ffffffaa;
            backdrop-filter: blur(5px);
            height: 49px;
            width: 100%;
            position: sticky;
            top: 0;
            border-bottom: 1px solid #eee;
            z-index: 10;
          }
          .name {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            position: relative;
            margin-left: 20px;
          }
          h4,
          p {
            margin: 0;
          }
          a {
            margin-left: 20px;
            margin-right: 20px;
          }
        `}
      </style>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${id}`
  );
  return {
    props: {
      user: data,
    },
  };
};
