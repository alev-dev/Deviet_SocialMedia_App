import Link from "next/link";
import Create from "../icons/Create";

export default function Footer() {
  return (
    <nav>
      <Link href="/compoose/deveet">
        <a>
          <Create />
        </a>
      </Link>
      <style jsx>
        {`
          nav {
            border-top: 1px solid #eee;
            width: 100%;
            height: 49px;
            position: sticky;
            bottom: 0;
            background: #ffffffaa;
            backdrop-filter: blur(5px);
            display: flex;
            justify-content: center;
          }
        `}
      </style>
    </nav>
  );
}
