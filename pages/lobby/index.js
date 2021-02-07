import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useUser } from "../../context/useUser";
import Ok from "../../icons/Ok";

export default function Lobby() {
  const [chat, setchat] = useState([]);
  const [message, setmessage] = useState("");
  const { user, socket } = useUser();

  useEffect(() => {
    loadHistory();
    if (socket) {
      socket.on("messageReceived", (data) => {
        console.log(data);
        update(data);
        var element = document.getElementById("chatwindow");
        element.scrollTop = element.scrollHeight;
      });
    }

    const update = (data) => {
      setchat((chat) => [...chat, data]);
    };
    return () => {
      socket.off("messageReceived", (data) => {
        setchat([...chat, data]);
        var element = document.getElementById("chatwindow");
        element.scrollTop = element.scrollHeight;
        console.log(data);
      });
      socket.disconnect();
    };
  }, []);

  const loadHistory = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat`
    );
    setchat(data);
    var element = document.getElementById("chatwindow");
    element.scrollTop = element.scrollHeight;
  };

  const sendMessage = () => {
    if (socket) {
      socket.emit("newMessage", {
        avatar: user.picture,
        idUser: user.id,
        message: message,
        name: user.name,
      });
      setmessage("");
    }
  };

  return (
    <div>
      <Navbar pos={3} />
      <main id="chatwindow">
        {chat &&
          chat.map((item, index) => (
            <div className="comm" key={index}>
              <img src={item.avatar} alt="" width={30} height={30} />
              <div className="pencil">
                <strong>{item.name}</strong>
                <p>{item.message}</p>
              </div>
            </div>
          ))}
      </main>
      <section>
        <div className="message">
          <h5>Escribe tu mensaje aqui</h5>
          <div className="inputicon">
            <input
              type="text"
              onChange={(event) => setmessage(event.target.value)}
              value={message}
              id=""
            />
            <label onClick={() => sendMessage()}>
              <Ok />
            </label>
          </div>
        </div>
      </section>

      <style jsx>
        {`
          main {
            height: 400px;
            margin-left: 4px;
            margin-right: 4px;
            overflow-y: scroll;
            background-color: #eee;
          }
          .comm {
            display: flex;
            margin: 4px 2px;
          }
          .pencil {
            display: flex;
            flex-direction: column;
          }
          section {
            display: flex;
            justify-content: center;
          }
          h5 {
            text-align: center;
            margin-bottom: 5px;
          }
          strong {
            font-size: 14px;
          }
          img {
            border-radius: 999px;
          }
          .message {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .inputicon {
            width: 90%;
            display: flex;
            align-items: center;
          }
          input {
            margin-right: 10px;
            width: 90%;
            border: 1px solid #eee;
            border-radius: 5px;
            padding: 10px 5px;
            box-shadow: 1px 2px grey;
          }
          p {
            margin: 0;
          }
        `}
      </style>
    </div>
  );
}
