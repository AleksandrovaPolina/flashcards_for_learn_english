import styles from "./header.module.scss";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.wrapper__links}>
        <Link className={styles.link} to="/">
          Home
        </Link>
        <Link className={styles.link} to="/table">
          Table
        </Link>
        <Link className={styles.link} to="/game">
          Game
        </Link>
      </nav>
    </div>
  );
}
