import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../../../../components/Navbar";
import { useUser } from "../../../../context/useUser";
import AddFriend from "../../../../icons/AddFriend";
import Empty from "../../../../svg/Empty";

export default function Friends() {
  const [others, setothers] = useState([]);
  const { user } = useUser();
  const [userData, setuserData] = useState(null);
  useEffect(() => {
    getUsers();
    if (user) {
      if (user.id) {
        getDataUser();
      }
    }
  }, [user]);
  const getUsers = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`
    );
    setothers(data);
  };

  const getDataUser = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${user.id}`
    );
    setuserData(data);
  };

  return (
    <>
      <Navbar pos={1} />
      {userData && (
        <div>
          <main>
            <div className="friends">
              <h3>Amigos</h3>
              {userData.friends.length === 0 ? (
                <div>
                  <Empty />
                  <h4>No tienes amigos aun</h4>
                </div>
              ) : (
                userData.friends.map((item, index) => (
                  <div className="userData">
                    <img src={item.avatar} alt="" width={42} height={42} />
                    <h4>{item.username}</h4>
                  </div>
                ))
              )}
            </div>
          </main>
          <main>
            <h4>Otras personas</h4>
            <div className="others">
              {others.map(
                (item, index) =>
                  userData.googleId !== item.googleId && (
                    <div key={index} className="user">
                      <div className="userData">
                        <img src={item.avatar} alt="" width={42} height={42} />
                        <h4>{item.username}</h4>
                      </div>
                      <Link href="/working">
                        <label>
                          <AddFriend />
                        </label>
                      </Link>
                    </div>
                  )
              )}
            </div>
          </main>
        </div>
      )}
      <style jsx>
        {`
          .others {
            display: flex;
            flex-direction: column;
          }
          img {
            border-radius: 999px;
          }
          label {
            margin-right: 10px;
          }
          h4,
          h3 {
            text-align: center;
            margin: 10px 8px;
          }
          main {
            border-bottom: 1px solid #eee;
          }
          .user {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .userData {
            display: flex;
            align-items: center;
            margin: 4px 8px;
          }
        `}
      </style>
    </>
  );
}
