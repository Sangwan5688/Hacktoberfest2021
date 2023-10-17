import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination/Pagination";
import { Link } from "react-router-dom";
import styles from "./Characters.module.css";

export default function Characters() {
  const [characters, setCharacters] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getCharacters() {
      const response = await axios.get(
        `https://anapioficeandfire.com/api/characters?pageSize=24&page=${page}`
      );
      setCharacters(response.data);
    }
    getCharacters();
  }, [page]);

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  return (
    <div>
      <section className={styles.sectionImg}>
        <img
          className={styles["characters-logo"]}
          alt="character-logo"
          src="https://images.squarespace-cdn.com/content/v1/571e7cc14c2f859b347c0167/1562017078937-NMGS7QTF6MN9LEXIMBXX/blog++GoT.jpg?format=1500w"
        />
      </section>
      <section className={styles["characters-sec2"]}>
        <h2> Featured Characters</h2>
        <p>
          Game of Thrones boasts a vast array of complex characters, including
          Jon Snow, a brooding hero with a mysterious lineage; Daenerys
          Targaryen, a determined queen with dragons; Tyrion Lannister, a witty
          and underestimated strategist; and Cersei Lannister, a cunning and
          ruthless queen. Their intertwining destinies and moral ambiguity make
          the show's character dynamics as captivating as the power struggles
          themselves.Below are the full list of the Game of Thrones cast and
          characters:
        </p>
      </section>
      <h5>
        The red cards represents female characters and the grey cards represents
        male characters{" "}
      </h5>
      <div className="character-list">
        {characters &&
          characters.map((character, index) => {
            if (character.name) {
              const arr = character.url.split("/");
              let ID = arr.pop();
              return (
                <Link
                  key={index}
                  className={
                    character.gender === "Male"
                      ? styles.characterCardHe
                      : styles.characterCardShe
                  }
                  to={`/characters/${ID}`}
                >
                  {character.name}{" "}
                  {character.culture && character.culture !== "" ? (
                    <h5>Culture: {character.culture} </h5>
                  ) : (
                    ""
                  )}
                </Link>
              );
            } else {
              return null;
            }
          })}
      </div>

      <Pagination currentPage={page} onPageChange={handlePageChange} />
    </div>
  );
}
