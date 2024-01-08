import teams from "@/data/teams";
import { useState } from "react";
import styles from "./Home.module.css";
import { useRouter } from "next/router";


const Home = () => {
  const [selectedTeam1, setSelectedTeam1] = useState(null);
  const [selectedTeam2, setSelectedTeam2] = useState(null);
  const [over, setOver] = useState(null);
  
  const router = useRouter();


  const handleTeamSelection = () => {
    if (selectedTeam1 && selectedTeam2 && over) {
      //onSelectTeams(selectedTeam1, selectedTeam2);
      localStorage.setItem('team1', JSON.stringify(selectedTeam1))
      localStorage.setItem('team2', JSON.stringify(selectedTeam2))
      localStorage.setItem('over', JSON.stringify(over))
      router.push("/match/toss")
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
            value={selectedTeam1 || ''}
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
            value={selectedTeam2 || ''}
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
          value={over || ''}
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
        <button
          className={styles.button}
          onClick={() => {
            handleTeamSelection();
          }}
        >
          Start Toss
        </button>
      </div>
    </div>
  );
};

export default Home;
