import styles from "./Home.module.css";

export default function Home() {
  return (
    <div>
      <section className={styles.homeImg}>
        <img
          src="https://static.hbo.com/game-of-thrones-1-1920x1080.jpg"
          alt="picture"
        />
      </section>

      <section className={styles["home-sec1"]}>
        <h2>Background</h2>
        <p>
          "Game of Thrones" is a critically acclaimed fantasy television series
          based on George R.R. Martin's book series "A Song of Ice and Fire."
          Set in the fictional continents of Westeros and Essos, the show
          combines political intrigue, epic battles, and supernatural elements
          in a richly detailed world. Known for its complex characters and
          willingness to kill off major figures, "Game of Thrones" became a
          cultural phenomenon during its run, sparking discussions about power,
          morality, and the human condition.
        </p>
      </section>
    </div>
  );
}
