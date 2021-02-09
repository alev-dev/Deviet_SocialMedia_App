import { useEffect, useState } from "react";
import Link from "next/link";
import Back from "../../../icons/Back";
import Avatar from "../../../components/Avatar";
import Deveet from "../../../components/Deveet";
import axios from "axios";
import { useUser } from "../../../context/useUser";
import Delete from "../../../icons/Delete";
import Navbar from "../../../components/Navbar";

export default function Profile({ userProfile }) {
  const [timeLine, settimeLine] = useState([]);
  const { user } = useUser();
  const [loading, setloading] = useState(undefined);
  useEffect(() => {
    if (userProfile) {
      if (userProfile.username) {
        setloading(null);
        getDeveets();
      }
    }
  }, [userProfile]);

  const deleteDeveet = (id, index) => {
    var aux = deveets;
    aux.splice(index, 1);

    axios
      .delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deveet/${id}`)
      .then((res) => {
        getDeveets();
      });
  };

  const getDeveets = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deveet/user/${userProfile.googleId}`
    );
    settimeLine(data);
    setloading(1);
  };

  return (
    <>
      {user && (
        <header>
          <Link href="/timeline">
            <a>
              <Back width={32} height={32} />
            </a>
          </Link>
          {userProfile !== undefined && userProfile !== null && (
            <Avatar avatar={userProfile.avatar}></Avatar>
          )}
          {userProfile && (
            <div className="name">
              <h4>{userProfile.username}</h4>
              <p>{timeLine.length} Deveets</p>
            </div>
          )}
        </header>
      )}

      {timeLine && loading ? (
        timeLine.map((deveet, index) => (
          <Deveet key={deveet._id} {...deveet}>
            <label
              className="delete"
              onClick={() => deleteDeveet(deveet._id, index)}
            ></label>
          </Deveet>
        ))
      ) : (
        <div className="loader"></div>
      )}

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
          label {
            margin-left: 12px;
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
      userProfile: data,
    },
  };
};
