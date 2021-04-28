import axios from "axios";
import { useEffect, useState } from "react";
import Deveet from "../../components/Deveet";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useUser } from "../../context/useUser";

export default function Timeline() {
  const [deveets, setdeveets] = useState([]);
  const { user, socket } = useUser();
  const [online, setonline] = useState([]);

  useEffect(() => {
    getDeveets();

    if (socket) {
      socket.on("userslogged", (data) => {
        setonline(data);
      });
    }
  }, []);

  const getDeveets = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deveet`
    );
    setdeveets(data);
    const users = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userlogged`
    );
    setonline(users.data);
  };

  return (
    <div>
      <Navbar pos={0} />
      <nav>
        {online.map((user, index) => (
          <img key={index} src={user.avatar} alt="" width={25} height={25} />
        ))}
      </nav>
      <section>
        {user && deveets.length > 0 ? (
          deveets.map((deveet, index) => <Deveet key={index} {...deveet} />)
        ) : (
          <div className="loader"></div>
        )}
      </section>
      <Footer />
      <style jsx>
        {`
          section {
            flex: 1;
          }
          nav {
            width: 100%;
            display: flex;
          }
          img {
            border-radius: 999px;
          }
        `}
      </style>
    </div>
  );
}
