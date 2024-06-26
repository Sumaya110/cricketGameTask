
import React, { useEffect, useState } from "react";
import teams from "@/data/teams";
import styles from "./MatchSummary.module.css"; 
import { getMatch } from "@/libs/action/matchAction";
import { useRouter } from 'next/router';


const MatchSummary = ({ Id }) => {
  const matchId = Id;

  const [battingTeam1, setBattingTeam1] = useState(null);
  const [bowlingTeam1, setBowlingTeam1] = useState(null);

  const [battingTeam2, setBattingTeam2] = useState(null);
  const [bowlingTeam2, setBowlingTeam2] = useState(null);

  const [batsmen, setBatsmen] = useState([]);
  const [bowlers, setBowlers] = useState([]);
  const [teamSwitched, setTeamSwitched] = useState(null);


  

  useEffect(() => {
    const battingTeam = JSON.parse(localStorage.getItem("battingTeam"));
    const bowlingTeam = JSON.parse(localStorage.getItem("bowlingTeam"));

    console.log("teamsss  ", battingTeam, bowlingTeam);

    setBattingTeam1(battingTeam);
    setBowlingTeam1(bowlingTeam);

    setBattingTeam2(bowlingTeam);
    setBowlingTeam2(battingTeam);

   

    const getData = async () => {

      console.log("match id :", matchId)
      try {
        const updatedData = await getMatch(matchId);
        console.log("from get data updated data : ", updatedData);
        setTeamSwitched(updatedData.switchTeamDone)
  
        if(teamSwitched)
        {
          setBatsmen(updatedData.batsmen)
          setBowlers(updatedData.bowlerArray)

        }
        else
        {
          setBatsmen(updatedData.batsmen)
          setBowlers(updatedData.bowlerArray)
        }
      
       
      } catch (error) {
        console.error("Error fetching match data:", error);
      }
    };

    getData()


  }, []);

 

  return (
    <div>
      <div className={styles["pp"]}>
        <p> Score of First Innings </p>
      </div>

      <div className={styles.summaryContainer}>
     

        <div className={styles.teamSummary}>
          <h2>Batting Team: {battingTeam1}</h2>
          <table className={styles.summaryTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Run</th>
                <th>Ball</th>
                <th>Six</th>
                <th>Four</th>
                <th>Out</th>
              </tr>
            </thead>
            <tbody>
              {teams[battingTeam1]?.map((playerName, index) => {
                const playerData = batsmen.find(
                  (player) => player.name === playerName
                );

                return (
                  <tr key={index}>
                    <td>{playerName}</td>
                    <td>{playerData ? playerData.runs : 0}</td>
                    <td>{playerData ? playerData.balls : 0}</td>
                    <td>{playerData ? playerData.six : 0}</td>
                    <td>{playerData ? playerData.four : 0}</td>
                    <td>{playerData ? playerData.out : "Yet to Bat"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      
        <div className={styles.teamSummary}>
          <h2>Bowling Team: {bowlingTeam1}</h2>
          <table className={styles.summaryTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Balls</th>
                <th>Over</th>
                <th>Run</th>
                <th>Wicket</th>
              </tr>
            </thead>
            <tbody>
              {teams[bowlingTeam1]?.map((playerName, index) => {
                const playerData = bowlers?.find(
                  (player) => player.name === playerName
                );

                return (
                  <tr key={index}>
                    <td>{playerName}</td>
                    <td>{playerData ? playerData.balls : 0}</td>
                    <td>{playerData ? playerData.over : 0}</td>
                    <td>{playerData ? playerData.runs : 0}</td>
                    <td>{playerData ? playerData.wicket : 0}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {teamSwitched && (
        <div>
          <div className={styles["pp"]}>
            <p> Score of Second Innings </p>
          </div>

          <div className={styles.summaryContainer}>
          

            <div className={styles.teamSummary}>
              <h2>Batting Team: {battingTeam2}</h2>
              <table className={styles.summaryTable}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Run</th>
                    <th>Ball</th>
                    <th>Six</th>
                    <th>Four</th>
                    <th>Out</th>
                  </tr>
                </thead>
                <tbody>
                  {teams[battingTeam2]?.map((playerName, index) => {
                    const playerData = batsmen.find(
                      (player) => player.name === playerName
                    );

                    return (
                      <tr key={index}>
                        <td>{playerName}</td>
                        <td>{playerData ? playerData.runs : 0}</td>
                        <td>{playerData ? playerData.balls : 0}</td>
                        <td>{playerData ? playerData.six : 0}</td>
                        <td>{playerData ? playerData.four : 0}</td>
                        <td>{playerData ? playerData.out : "Yet to Bat"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

        
            <div className={styles.teamSummary}>
              <h2>Bowling Team: {bowlingTeam2}</h2>
              <table className={styles.summaryTable}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Balls</th>
                    <th>Over</th>
                    <th>Run</th>
                    <th>Wicket</th>
                  </tr>
                </thead>
                <tbody>
                  {teams[bowlingTeam2]?.map((playerName, index) => {
                    const playerData = bowlers?.find(
                      (player) => player.name === playerName
                    );

                    return (
                      <tr key={index}>
                        <td>{playerName}</td>
                        <td>{playerData ? playerData.balls : 0}</td>
                        <td>{playerData ? playerData.over : 0}</td>
                        <td>{playerData ? playerData.runs : 0}</td>
                        <td>{playerData ? playerData.wicket : 0}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchSummary;
