import type { FC } from "react";
import { Link } from "react-router-dom";

export const NavBar: FC = () => (
  <nav>
    <section>
      <Link to="/">Dashboard</Link>
      <Link to="/posts">Posts</Link>
    </section>
  </nav>
);
