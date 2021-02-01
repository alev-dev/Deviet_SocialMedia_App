export default function AppLayout({ children }) {
  return (
    <div>
      <main>{children}</main>
      <style jsx>
        {`
          div {
            height: 100vh;
            width: 100vw;
            display: grid;
            place-items: center;
          }
          main {
            width: 100%;
            height: 100%;
            box-shadow: 0 5px 15px grey;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            border-radius: 10px;
          }

          @media (min-width: 520px) {
            main {
              width: 80%;
              height: 90%;
            }
          }
          @media (min-width: 920px) {
            main {
              width: 50%;
              height: 90%;
            }
          }
        `}
      </style>
    </div>
  );
}
