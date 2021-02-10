import axios from "axios";
import { useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import { useUser } from "../../context/useUser";
import Ok from "../../icons/Ok";
export default function Chat({ receptor }) {
  const [chatting, setchatting] = useState([]);
  const { user, socket } = useUser();
  const [message, setmessage] = useState("");

  useEffect(() => {
    if (receptor) {
      if (user) {
        if (user._id) {
          console.log(user.chats);
          const exist = user.chats.findIndex(
            (item) => item.receptor === receptor._id
          );
          exist !== -1 && setchatting(user.chats[exist].chat);
          var element = document.getElementById("chatwindow");
          element.scrollTop = element.scrollHeight;
          console.log(chatting);
        }
      }
    }
    if (socket) {
      socket.on("newChatmessage", ({ receptor, messages }) => {
        console.log(chatting);

        if (user) {
          if (receptor === user._id) {
            update(messages);
            var element = document.getElementById("chatwindow");
            element.scrollTop = element.scrollHeight;
          }
        }
      });
    }
  }, [socket, user]);

  const update = (data) => {
    setchatting((chatting) => [...chatting, data]);
  };

  const SendMessage = async (event) => {
    console.log(user.chats);

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${receptor.googleId}`
    );

    var chatRecep = data.chats;

    const exist = chatRecep.findIndex((item) => item.receptor === user._id);
    console.log(exist);
    exist === -1
      ? chatRecep.push({
          receptor: user._id,
          chat: [
            {
              id: user._id,
              username: user.username,
              avatar: user.avatar,
              message,
            },
          ],
        })
      : chatRecep[exist].chat.push({
          id: user._id,
          username: user.username,
          avatar: user.avatar,
          message,
        });

    console.log(chatRecep);
    console.log(data);

    await axios
      .put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${data._id}`, {
        ...data,
        chats: chatRecep,
      })
      .then((res) => console.log("done"))
      .catch((err) => console.log("err"));
    console.log(chatRecep);

    setchatting([
      ...chatting,
      {
        id: user._id,
        username: user.username,
        avatar: user.avatar,
        message,
      },
    ]);
    var element = document.getElementById("chatwindow");
    element.scrollTop = element.scrollHeight;

    var chatSender = user.chats;
    const pos = chatSender.findIndex((item) => item.receptor === receptor._id);
    pos === -1
      ? chatSender.push({
          receptor: receptor._id,
          chat: [
            {
              id: user._id,
              username: user.username,
              avatar: user.avatar,
              message,
            },
          ],
        })
      : chatSender[pos].chat.push({
          id: user._id,
          username: user.username,
          avatar: user.avatar,
          message,
        });
    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${user._id}`,
      {
        ...user,
        chats: chatSender,
      }
    );
    socket.emit("newChatmessageSend", {
      receptor: receptor._id,
      messages: {
        id: user._id,
        username: user.username,
        avatar: user.avatar,
        message,
      },
    });
    setmessage("");
  };

  return (
    <>
      <nav>
        <Avatar avatar={receptor.avatar} />
        <h3>{receptor.username}</h3>
      </nav>
      <section id="chatwindow">
        {chatting.map((text, index) => (
          <div className="message" key={index}>
            <img src={text.avatar} width={36} height={36} alt="" />
            <div>
              <strong className="userText">{text.username}</strong>
              <h5 className="messageText">{text.message}</h5>
            </div>
          </div>
        ))}
      </section>

      <footer>
        <div className="form">
          <input
            type="text"
            name=""
            id=""
            value={message}
            onChange={(e) => setmessage(e.target.value)}
          />
          <label onClick={() => SendMessage()}>
            <Ok />
          </label>
        </div>
      </footer>
      <style jsx>{`
        nav {
          display: flex;
        }
        section {
          height: 400px;
          background-color: #eee;
          display: flex;
          flex-direction: column;
          overflow-y: scroll;
        }
        .message {
          display: flex;
          flex-direction: row-reverse;
        }
        .messageText,
        .userText {
          display: flex;
          flex-direction: row-reverse;
          padding: 4px 5px;
        }
        h5 {
          margin: 0;
          border-radius: 20px;
          background-color: #0ef;
        }
        .form {
          margin-top: 20px;
          display: flex;
          justify-content: center;
        }
        img {
          border-radius: 999px;
          margin-left: 10px;
          margin-right: 10px;
        }
      `}</style>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const { idReceptor } = ctx.params;
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${idReceptor}`
  );
  return {
    props: {
      receptor: data,
    },
  };
};
