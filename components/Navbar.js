import Link from "next/link";
import { useRouter } from "next/router";
import Home from "../icons/Home";
import Logout from "../icons/Logout";
import Search from "../icons/Search";

export default function Navbar() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <nav>
      <Link href="/timeline">
        <a>
          <Home />
        </a>
      </Link>

      <Link href="/">
        <a>
          <Search />
        </a>
      </Link>

      <label onClick={logout}>
        <Logout />
      </label>

      <style jsx>
        {`
          nav {
            top: 0;
            display: flex;
            justify-content: space-between;
            background: #ffffffaa;
            backdrop-filter: blur(5px);
            position: sticky;
            border-bottom: 1px solid #eee;
          }
        `}
      </style>
    </nav>
  );
}
