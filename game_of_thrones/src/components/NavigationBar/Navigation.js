import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const routes = [
    { to: "/", text: "HOME" },
    { to: "/characters", text: "CHARACTERS" },
    { to: "/Houses", text: "HOUSES" }
  ];

  return (
    <div>
      <img
        className={styles.navlogo}
        src="https://static.hbo.com/content/dam/hbodata/series/game-of-thrones/series_logos_game-of-thrones.jpg"
        alt="Logo"
      />
      <nav>
        {routes.map((v, i) => (
          <NavLink className={styles["nav-link"]} key={i} to={v.to}>
            {v.text}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
