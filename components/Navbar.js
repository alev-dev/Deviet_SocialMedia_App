import Link from "next/link";
import { useRouter } from "next/router";
import Home from "../icons/Home";
import Logout from "../icons/Logout";
import Friends from "../icons/Friends";
import Profile from "../icons/Profile";
import { useUser } from "../context/useUser";

export default function Navbar({ pos }) {
  const router = useRouter();
  const { user } = useUser();
  function logout() {
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <nav>
      <Link href="/timeline">
        <a className="home">
          <Home />
        </a>
      </Link>
      {user && (
        <Link href={`/${user.name}/friends/${user.id}`}>
          <a className="friends">
            <Friends />
          </a>
        </Link>
      )}
      {user && (
        <Link href={`/myprofile`}>
          <a className="profile">
            <Profile />
          </a>
        </Link>
      )}

      <label onClick={logout}>
        <Logout />
      </label>

      <style jsx>
        {`
          a {
            margin-top: 5px;
          }
          label {
            margin-top: 5px;
          }
          .home {
            border-bottom: ${pos === 0 && "3px solid #09f"};
          }
          .friends {
            border-bottom: ${pos === 1 && "3px solid #09f"};
          }
          .profile {
            border-bottom: ${pos === 2 && "3px solid #09f"};
          }
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
