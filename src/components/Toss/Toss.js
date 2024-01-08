import React, { useEffect } from "react";
import { useState } from "react";
// import { json } from "stream/consumers";
import styles from "./Toss.module.css";
import { useRouter } from "next/router";

function Toss() {
  const [tossWinner, setTossWinner] = useState(null);
  const [tossDecision, setTossDecision] = useState(null);
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const team1 = JSON.parse(localStorage.getItem("team1"));
    const team2 = JSON.parse(localStorage.getItem("team2"));
    setTeam1(team1);
    setTeam2(team2);
  }, []);
  const teams = [team1, team2];

  const handleToss = () => {
    // Simulate a toss and determine the winner and decision
    const randomIndex = Math.floor(Math.random() * 2);
    const winner = teams[randomIndex];
    const decision = Math.random() < 0.5 ? "bat" : "bowl";

    setTossWinner(winner);
    setTossDecision(decision);

    localStorage.setItem("winner", JSON.stringify(winner));
    localStorage.setItem("decision", JSON.stringify(decision));

    // const matchId = await createScore(score);
    router.push("/match");
    //onToss(`${winner} choose to ${decision}`);
  };


  

  return (
    <div className={styles.tossContainer}>

      <h2 className={styles["margin-top"]}> Toss Time!</h2>
      
      <button className={styles["tossButton"]} onClick={handleToss}>
        TOSS
      </button>


    </div>
  );
}

export default Toss;
