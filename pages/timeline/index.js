import axios from "axios";
import { useEffect, useState } from "react";
import Deveet from "../../components/Deveet";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useUser } from "../../context/useUser";

export default function Timeline() {
  const [deveets, setdeveets] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    getDeveets();
  }, []);

  const getDeveets = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deveet`
    );
    setdeveets(data);
  };

  return (
    <div>
      <Navbar pos={0} />
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
        `}
      </style>
    </div>
  );
}
