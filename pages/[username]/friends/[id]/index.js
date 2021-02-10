import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../../../../components/Navbar";
import { useUser } from "../../../../context/useUser";
import AddFriend from "../../../../icons/AddFriend";
import Empty from "../../../../svg/Empty";
import Cancel from "../../../../icons/Cancel";
import Message from "../../../../icons/Message";
export default function Friends() {
  const [others, setothers] = useState([]);
  const { user } = useUser();
  const [userData, setuserData] = useState(null);
  useEffect(() => {
    getUsers();
    if (user) {
      if (user.googleId) {
        setuserData(user);
      }
    }
  }, [user]);
  const getUsers = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`
    );
    setothers(data);
  };

  const sendRequest = async (pos) => {
    var aux = others[pos];
    var listSend = userData.friendsendquest;
    listSend.push({
      name: aux.username,
      id: aux._id,
      avatar: aux.avatar,
      googleId: aux.googleId,
    });
    setuserData({ ...userData, friendsendquest: listSend });
    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${userData._id}`,
      { ...userData, friendsendquest: listSend }
    );
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${aux.googleId}`
    );
    var requestlist = data.friendrequests;
    requestlist.push({
      name: userData.username,
      id: userData._id,
      avatar: userData.avatar,
      googleId: userData.googleId,
    });
    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${data._id}`,
      { ...data, friendrequests: requestlist }
    );
  };

  const cancelRequest = async (pos) => {
    var aux = others[pos];
    const exits = userData.friendsendquest.findIndex(
      (item) => item.id === aux._id
    );
    if (exits !== -1) {
      var newSendReq = userData.friendsendquest;
      newSendReq.splice(exits, 1);
      setuserData({ ...userData, friendsendquest: newSendReq });
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${userData._id}`,
        { ...userData, friendsendquest: newSendReq }
      );
    }
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${aux.googleId}`
    );
    var requestlist = data.friendrequests;
    const exits2 = requestlist.findIndex((item) => item.id === userData._id);
    if (exits2 !== -1) {
      requestlist.splice(exits2, 1);
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${data._id}`,
        { ...data, friendrequests: requestlist }
      );
    }
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
                <div className="imageEmpty">
                  <Empty />
                  <h4>No tienes amigos aun</h4>
                </div>
              ) : (
                userData.friends.map((item, index) => (
                  <div className="userData">
                    <div className="friendName">
                      <img src={item.avatar} alt="" width={42} height={42} />
                      <h4>{item.name}</h4>
                    </div>
                    <Link href={`/chat/${item.googleId}`}>
                      <a>
                        <Message />
                      </a>
                    </Link>
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
                  userData.googleId !== item.googleId &&
                  userData.friends.findIndex(
                    (fr) => fr.googleId === item.googleId
                  ) === -1 && (
                    <div key={index} className="user">
                      <div className="userData">
                        <img src={item.avatar} alt="" width={42} height={42} />
                        <h4>{item.username}</h4>
                      </div>
                      {userData.friendsendquest.findIndex(
                        (userI) => userI.id === item._id
                      ) === -1 ? (
                        <label onClick={() => sendRequest(index)}>
                          <AddFriend />
                        </label>
                      ) : (
                        <label onClick={() => cancelRequest(index)}>
                          <Cancel />
                        </label>
                      )}
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
          .friendName {
            display: flex;
          }
          label {
            margin-right: 10px;
          }
          .imageEmpty {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
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
            justify-content: space-between;
            margin: 4px 8px;
          }
        `}
      </style>
    </>
  );
}
