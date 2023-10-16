import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Pagination from "../../components/Pagination/Pagination";
import styles from "./Houses.module.css";

export default function Houses() {
  const [houses, setHouses] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getHouses() {
      const response = await axios.get(
        `https://anapioficeandfire.com/api/houses?pageSize=24&page=${page}`
      );
      setHouses(response.data);
    }
    getHouses();
  }, [page]);

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  return (
    <>
      <section className={styles.houseImg}>
        <img src="https://c4.wallpaperflare.com/wallpaper/66/691/581/game-of-thrones-a-song-of-ice-and-fire-house-stark-house-baratheon-wallpaper-preview.jpg" />
      </section>
      <h2>Houses</h2>
      <p>
        Game of Thrones features several noble houses vying for power in the
        fictional world of Westeros. House Stark, known for its honor and
        resilience, contends with House Lannister, renowned for their wealth and
        political intrigue. Meanwhile, House Targaryen, with its dragon legacy,
        seeks to reclaim the Iron Throne, setting the stage for a gripping and
        complex political struggle.
      </p>

      <h5>
        {" "}
        Please click on Red house cards for the details on its current lord.{" "}
        Grey cards do not have house loards.
      </h5>

      <div className="House-List">
        {houses &&
          houses.map((house, index) => {
            if (house.name !== "") {
              let ID = "";
              if (house.currentLord !== "") {
                const arr = house.currentLord.split("/");
                ID = arr.pop();
              }

              return (
                <Link
                  key={index}
                  className={
                    house.currentLord !== ""
                      ? styles.HouseCardID
                      : styles.HouseCard
                  }
                  to={`/characters/${ID}`}
                >
                  {house.name}
                </Link>
              );
            }
            return null;
          })}
      </div>

      <Pagination currentPage={page} onPageChange={handlePageChange} />
    </>
  );
}
