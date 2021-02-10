import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { useUser } from "../../../context/useUser";
import Cancel from "../../../icons/Cancel";
import Ok from "../../../icons/Ok";
import Nothing from "../../../svg/Nothing";

export default function Request() {
  const { user } = useUser();
  const [request, setrequest] = useState([]);
  useEffect(() => {
    if (user) {
      if (user._id) {
        setrequest(user.friendrequests);
      }
    }
  }, [user]);

  const deniegRequest = (pos) => {
    var aux = request;
    aux.splice(pos, 1);
    setrequest(aux);
  };

  const acceptRequest = async (pos) => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${request[pos].googleId}`
    );
    var aux = request;
    const newReq = aux.splice(pos, 1);
    console.log(aux);
    var newFriends = user.friends;
    newFriends.push(newReq[0]);
    setrequest(aux);
    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${user._id}`,
      { ...user, friendrequests: aux, friends: newFriends }
    );
    var requestlist = data.friendsendquest;
    const exist = requestlist.findIndex((item) => item.id === user._id);
    var newfr = requestlist.splice(exist, 1);
    var listfriends = data.friends;
    listfriends.push(newfr[0]);
    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${data._id}`,
      { ...data, friendsendquest: requestlist, friends: listfriends }
    );
  };

  return (
    <div>
      <Navbar />
      <div>
        <section>
          {request.length === 0 && (
            <div className="imgNo">
              <Nothing />
              <h4>No hay movimiento por aqui</h4>
            </div>
          )}
          {request.map((item, index) => (
            <div className="user">
              <div className="userdata">
                <img src={item.avatar} width={50} alt="" />
                <strong>{item.name}</strong>
              </div>

              <div className="btn">
                <label onClick={() => acceptRequest(index)}>
                  <Ok />
                </label>
                <label onClick={() => deniegRequest(index)}>
                  <Cancel />
                </label>
              </div>
            </div>
          ))}
        </section>
      </div>

      <style jsx>{`
        section {
          display: flex;
          flex-direction: column;
        }
        .userdata {
          display: flex;
          align-items: center;
        }
        img {
          border-radius: 999px;
        }
        .imgNo {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        h4 {
          text-align: center;
        }
        .user {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        strong {
          margin-left: 10px;
        }
        label {
          margin-left: 10px;
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
}
