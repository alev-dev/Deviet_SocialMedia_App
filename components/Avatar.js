export default function Avatar({ avatar, username }) {
  return (
    <div>
      <img src={avatar} alt={username} width="40px" height="40px" />
      <style jsx>
        {`
          div {
            display: flex;
            align-items: center;
          }
          img {
            border-radius: 999px;
          }
        `}
      </style>
    </div>
  );
}
