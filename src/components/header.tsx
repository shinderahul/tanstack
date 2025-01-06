import { NavLink } from "react-router";

export const Header = () => {
  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/fetchrq" end>
        Fetch React Query
      </NavLink>
      <NavLink to="/infinite-scroll">Infinite Scroll</NavLink>
    </nav>
  );
};
