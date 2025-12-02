import type { FC } from "react";
import { Link } from "react-router-dom";

const DashboardPage: FC = () => (
  <section>
    <h2>Dashboard</h2>
    <p>This is the dashboard page</p>

    <Link to="/posts" className="button">
      View Posts
    </Link>
  </section>
);

export default DashboardPage;
