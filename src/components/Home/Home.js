import teams from "@/data/teams";
import { useState } from "react";
import styles from "./Home.module.css";
import { useRouter } from "next/router";
import { createMatch, updateMatch } from "@/libs/action/matchAction";

const Home = () => {
  const [selectedTeam1, setSelectedTeam1] = useState(null);
  const [selectedTeam2, setSelectedTeam2] = useState(null);
  const [over, setOver] = useState(null);

  const router = useRouter();

  const handleToss = async () => {
  if (selectedTeam1 && selectedTeam2 && over) {
    const teams = [selectedTeam1, selectedTeam2];
    const randomIndex = Math.floor(Math.random() * 2);
    const winner = teams[randomIndex];
    const decision = Math.random() < 0.5 ? "bat" : "bowl";

    try {
      if (winner) {
        const winnerTeam = winner.split(" ")[0];
        const otherTeam = [selectedTeam1, selectedTeam2].find(
          (team) => team !== winnerTeam
        );

        const id = await createMatch({});

        console.log("id from home ", id);

        await updateMatch(id, {
          tossWinner: winner,
          tossDecision: decision,
        });

        if (decision === "bat") {
          console.log("match idddd!!! bat ", id);

          await updateMatch(id, {
            battingTeam: winnerTeam,
            bowlingTeam: otherTeam,
          });

          localStorage.setItem("battingTeam", JSON.stringify(winnerTeam));
          localStorage.setItem("bowlingTeam", JSON.stringify(otherTeam));
        } else {
          console.log("match idddd!!! ball ", id);
          await updateMatch(id, {
            battingTeam: otherTeam,
            bowlingTeam: winnerTeam,
          });

          localStorage.setItem("battingTeam", JSON.stringify(otherTeam));
          localStorage.setItem("bowlingTeam", JSON.stringify(winnerTeam));
        }

        router.push(`/match?matchId=${id}`);
      }

     
    } catch (error) {
      console.error("Error in handleToss:", error);
    }
  }
};


  // Filter teams for Team2 based on the selectedTeam1
  const team2Options = Object.keys(teams).filter(
    (teamName) => teamName !== selectedTeam1
  );

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.selectContainer}>
          <select
            className={styles.select}
            value={selectedTeam1 || ""}
            onChange={(e) => setSelectedTeam1(e.target.value)}
          >
            <option value="">Select Team 1</option>
            {Object.keys(teams).map((teamName, index) => (
              <option key={index} value={teamName}>
                {teamName}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.selectContainer}>
          <select
            className={styles.select}
            value={selectedTeam2 || ""}
            onChange={(e) => setSelectedTeam2(e.target.value)}
          >
            <option value="">Select Team 2</option>

            {team2Options.map((teamName, index) => (
              <option key={index} value={teamName}>
                {teamName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.chooseOversContainer}>
        <h1 className={styles.chooseOversTitle}>Choose Overs!!</h1>
        <select
          className={styles.select}
          value={over || ""}
          onChange={(e) => setOver(e.target.value)}
        >
          <option value="">Select Overs</option>
          {[1, 2, 3, 4, 5].map((over) => (
            <option key={over} value={over}>
              {over} Overs
            </option>
          ))}
        </select>
      </div>

      <div>
        <button className={styles.button} onClick={handleToss}>
          TOSS
        </button>
      </div>
    </div>
  );
};

export default Home;
