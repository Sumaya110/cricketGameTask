import React from "react";
import styles from "./MatchEnd.module.css"; // Import your CSS module
import { useRouter } from "next/router";

const MatchEnd = () => {
  const router = useRouter();
  const newGame = () => {
    router.push("/");
  };

  return (
    <div className={styles.matchEndContainer}>
      <h2 className={styles.heading}>Match Ended</h2>
      <p className={styles.message}>Thanks for playing!</p>

      <button className={`${styles.button}`} onClick={() => newGame()}>
        New Game
      </button>
    </div>
  );
};

export default MatchEnd;
