import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Character.module.css";
// import BackButton from "../../components/BackButton/backButton";

export default function Character() {
  const { ID } = useParams();
  const [character, setCharacter] = useState(null);
  const [characterPronoun, setCharacterPronoun] = useState(null);
  // const [father, setFather] = useState(null);

  useEffect(() => {
    async function fetchCharacterDetails() {
      const response = await axios.get(
        `https://anapioficeandfire.com/api/characters/${ID}`
      );
      setCharacter(response.data);
    }
    fetchCharacterDetails();
  }, [ID]);

  useEffect(() => {
    if (character && character.gender) {
      const genderLowerCase = character.gender.toLowerCase();
      if (genderLowerCase === "male") {
        setCharacterPronoun("He");
      } else if (genderLowerCase === "female") {
        setCharacterPronoun("She");
      }
    }
  }, [character]);

  return (
    <>
      {character && (
        <div className={styles.character}>
          <h2>{character.name}</h2>
          <p>
            This Character's name is {character.name}.{" "}
            {character.born && (
              <span>
                {characterPronoun} was born in {character.born}.{" "}
              </span>
            )}
            {character.aliases[0] && (
              <span>
                {characterPronoun} is also known as {character.aliases[0]}
                {". "}
              </span>
            )}
            {/* {character.father && (
              <span>
                {character.name} father name is {character.father}.{" "}
              </span>
            )}
            {character.mother && (
              <span>
                {character.name} mother name is {character.mother}.{" "}
              </span>
            )}
            {character.spouse && (
              <span>
                {characterPronoun} is married to {character.spouse}.{" "}
              </span>
            )} */}
            {character.tvSeries[0] && (
              <span>
                In the TV Series, {character.name} appears in the following
                Seasons: {character.tvSeries.map((v) => v).join(", ")}
              </span>
            )}
            <span>
              {character.died
                ? `. ${characterPronoun} is still alive.`
                : ` Unfortunately, ${characterPronoun} is dead now.`}
            </span>
          </p>
          {console.log(character)}
          {/* <BackButton /> */}
        </div>
      )}
    </>
  );
}
