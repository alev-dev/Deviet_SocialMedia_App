import Link from "next/link";
import Error from "../../svg/Error";
export default function ErrorPage() {
  return (
    <>
      <div>
        <h2>Ha ocurrido un error en la red</h2>
        <Error />
        <Link href="/timeline">
          <button>
            <h4>Volver al inicio</h4>
          </button>
        </Link>
      </div>
      <style jsx>{`
        div {
          display: grid;
          place-items: center;
          place-content: center;
          height: 100%;
        }
        button {
          padding: 8px 12px;
          border: 1px solid #eee;
          margin-top: 40px;
          background-color: #383838;
          color: #09f;
        }
        h2 {
          margin-bottom: 25px;
        }
        h4 {
          margin: 0;
        }
      `}</style>
    </>
  );
}
