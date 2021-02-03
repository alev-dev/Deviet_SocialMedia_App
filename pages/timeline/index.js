import axios from "axios";
import { useEffect, useState } from "react";
import Deveet from "../../components/Deveet";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useUser } from "../../context/useUser";
import Delete from "../../icons/Delete";

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

  const deleteDeveet = (id, index) => {
    var aux = deveets;
    aux.splice(index, 1);

    axios
      .delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deveet/${id}`)
      .then((res) => {
        getDeveets();
      });
  };

  return (
    <div>
      <Navbar />
      <section>
        {user ? (
          deveets.map((deveet, index) => (
            <Deveet key={index} {...deveet}>
              <label
                className="delete"
                onClick={() => deleteDeveet(deveet._id, index)}
              >
                {user.id === deveet.idUser && <Delete width={21} height={21} />}
              </label>
            </Deveet>
          ))
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
          label {
            margin-left: 12px;
          }
        `}
      </style>
    </div>
  );
}
