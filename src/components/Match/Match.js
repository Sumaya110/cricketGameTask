import React, { useEffect, useState } from "react";
import teams from "@/data/teams";
import styles from "./Match.module.css";
import { useRouter } from "next/router";
import { updateMatch, getMatch } from "@/libs/action/matchAction";
// import axios from 'axios';

const Match = () => {
  const router = useRouter();

  // const [yourState, setYourState] = useState({
  //   battingOrder: [],
  //   bowlers: [],
  //   currentBatsman: null,
  //   currentBowler: null,
  //   lastBowler: nul,
  //   run: 0,
  //   score: 0,
  //   wickets: 0,
  //   balls: 0,
  //   curOver: 0,
  //   selectedBatsmen: [],
  //   selectedOvers: null,
  //   switchTeamFlag: null,
  //   target: null,
  //   matchStarted:null,
  //   end: null,
  //   switchTeamDone: null,
  //   batsmen: [],
  //   bowlerArray: [],
  //   overHistory: [],
  // });

  const [battingTeam, setBattingTeam] = useState(null);
  const [bowlingTeam, setBowlingTeam] = useState(null);

  const [battingOrder, setBattingOrder] = useState([]);
  const [bowlers, setBowlers] = useState([]);

  const [currentBatsman, setCurrentBatsman] = useState(null);
  const [currentBowler, setCurrentBowler] = useState(null);
  const [lastBowler, setLastBowler] = useState(null);

  const [tossWinner, setTossWinner] = useState(null);
  const [tossDecision, setTossDecision] = useState(null);

  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);

  const [run, setRun] = useState(0);
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [balls, setBalls] = useState(0);
  const [curOver, setCurOver] = useState(0);

  const [selectedBatsmen, setSelectedBatsmen] = useState([]);
  const [selectedOvers, setSelectedOvers] = useState(null);
  const [switchTeamFlag, setSwitchTeamFlag] = useState(null);

  const [target, setTarget] = useState(null);
  const [matchStarted, setMatchStarted] = useState(null);

  const [end, setEnd] = useState(null);
  const [switchTeamDone, setSwitchTeamDone] = useState(null);

  const [batsmen, setBatsmen] = useState([]);
  const [bowlerArray, setBowlerArray] = useState([]);
  const [overHistry, setOverHistry] = useState([]);

  const { matchId } = router.query;

  useEffect(() => {
    const team1 = JSON.parse(localStorage.getItem("battingTeam"));
    const team2 = JSON.parse(localStorage.getItem("bowlingTeam"));
    const over = JSON.parse(localStorage.getItem("over"));

    setSelectedOvers(over);
    setBattingTeam(team1);
    setBowlingTeam(team2);
  }, []);

  useEffect(() => {
    setCurrentBatsman(battingOrder[0]);
  }, [battingOrder]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("match id from use effect  ", matchId);
        await updateMatch(matchId, {
          battingOrder: battingOrder,
          bowlers: bowlers,
          currentBatsman: currentBatsman,
          currentBowler: currentBowler,
          lastBowler: lastBowler,
          run: run,
          score: score,
          wickets: wickets,
          balls: balls,
          curOver: curOver,
          selectedBatsmen: selectedBatsmen,
          selectedOvers: selectedOvers,
          switchTeamFlag: switchTeamFlag,
          target: target,
          matchStarted: matchStarted,
          end: end,
          switchTeamDone: switchTeamDone,
          batsmen: batsmen,
          bowlerArray: bowlerArray,
          overHistory: overHistry,
        });
      } catch (error) {
        console.error("Error updating all data :", error);
      }

      const updatedData = await getMatch(matchId);
      // setBattingOrder(updatedData.battingOrder)
    };

    fetchData();
  }, [matchId, balls, battingOrder, currentBowler]);

  //getBatsmanScore
  const getBatsmanScore = (run) => {
    // console.log("current batsman", currentBatsman);
    // console.log("batting order", battingOrder[0], battingOrder[1]);

    // console.log("batsmen....", batsmen);

    const updatedBatsmen = [...batsmen];
    const currentBatsmanIndex = updatedBatsmen.findIndex(
      (batsman) => batsman.name === currentBatsman
    );

    if (currentBatsmanIndex !== -1) {
      if (run != "w") {
        updatedBatsmen[currentBatsmanIndex].balls += 1;
        updatedBatsmen[currentBatsmanIndex].runs += run;
        if (run === 4) updatedBatsmen[currentBatsmanIndex].four += 1;
        if (run === 6) updatedBatsmen[currentBatsmanIndex].six += 1;
      } else updatedBatsmen[currentBatsmanIndex].out = "OUT";
    } else {
      // console.log("inserting current batsman");

      updatedBatsmen.push({
        name: currentBatsman,
        runs: 0,
        balls: 0,
        six: 0,
        four: 0,
        out: "Not Out",
      });

      const currentBatsmanIndex = updatedBatsmen.findIndex(
        (batsman) => batsman.name === currentBatsman
      );

      if (run != "w") {
        updatedBatsmen[currentBatsmanIndex].balls += 1;
        updatedBatsmen[currentBatsmanIndex].runs += run;
        if (run === 4) updatedBatsmen[currentBatsmanIndex].four += 1;
        if (run === 6) updatedBatsmen[currentBatsmanIndex].six += 1;
      } else updatedBatsmen[currentBatsmanIndex].out = "OUT";
    }

    // console.log("balls", balls);
    // console.log("runs", run);
    // console.log("updated batsmen array", updatedBatsmen); // Log the updated state

    return updatedBatsmen;
  };

  useEffect(() => {
    setBatsmen(getBatsmanScore(run));
    setBowlerArray(updatePlayerStats(currentBowler));

    localStorage.setItem("batsmen", JSON.stringify(batsmen));
    localStorage.setItem("bowlerArray", JSON.stringify(bowlerArray));

    if (balls === 0) setCurrentBowler(null);

    if (balls === 1) {
      const newArray = [run];
      setOverHistry(newArray);
    } else {
      const newArray = [...(overHistry || []), run];
      setOverHistry(newArray);
    }

    // console.log("overHistory !!! ", overHistry);

    if (run != "w" && run % 2) {
      if (!(balls === 0 && curOver)) switchBatsman();
    }

    // console.log("ballssssssss  ....", balls);
  }, [balls]);

  const handleBattingOrderChange = (player) => {
    if (battingOrder.length < 2 && !selectedBatsmen.includes(player)) {
      setBattingOrder((prevOrder) => [...prevOrder, player]);

      setSelectedBatsmen((prevBatsmen) => [...prevBatsmen, player]);
    }
  };

  // now handle bowler change

  const handleBowlersChange = (player) => {
    setOverHistry(null);
    if (bowlers.length === 0 || bowlers[bowlers.length - 1] !== player) {
      setCurrentBowler(player);
      setLastBowler(player);

      setBowlers((prevBowlers) => {
        const newBowlers = [...prevBowlers, player];

        return newBowlers;
      });
    } else {
      alert("Cannot choose the same bowler for consecutive overs.");
    }
  };

  const updatePlayerStats = (player) => {
    // console.log("current player", player);
    // console.log("stats", stats);

    const updatedBowlerArray = [...bowlerArray];
    const currentPlayerIndex = updatedBowlerArray.findIndex(
      (item) => item.name === player
    );

    if (currentPlayerIndex !== -1) {
      if (run !== "w") {
        updatedBowlerArray[currentPlayerIndex].runs += run;
      } else {
        updatedBowlerArray[currentPlayerIndex].wicket += 1;
      }

      updatedBowlerArray[currentPlayerIndex].balls += 1;
      updatedBowlerArray[currentPlayerIndex].over = Math.floor(
        updatedBowlerArray[currentPlayerIndex].balls / 6
      );

      if (updatedBowlerArray[currentPlayerIndex].balls % 6)
        updatedBowlerArray[currentPlayerIndex].over +=
          updatedBowlerArray[currentPlayerIndex].balls / 10;
    } else {
      // console.log("inserting current bowler");

      updatedBowlerArray.push({
        name: player,

        balls: 0,
        over: 0,
        runs: 0,
        wicket: 0,
      });

      const currentPlayerIndex = updatedBowlerArray.findIndex(
        (item) => item.name === player
      );

      if (run !== "w") {
        updatedBowlerArray[currentPlayerIndex].runs += run;
      } else {
        updatedBowlerArray[currentPlayerIndex].wicket += 1;
      }

      updatedBowlerArray[currentPlayerIndex].balls += 1;
      updatedBowlerArray[currentPlayerIndex].over = Math.floor(
        updatedBowlerArray[currentPlayerIndex].balls / 6
      );

      if (updatedBowlerArray[currentPlayerIndex].balls % 6)
        updatedBowlerArray[currentPlayerIndex].over +=
          updatedBowlerArray[currentPlayerIndex].balls / 10;
    }

    console.log("updated stats array", updatedBowlerArray); // Log the updated state

    return updatedBowlerArray;
  };

  //simulate ball
  const simulateBall = () => {
    const isWicket = Math.random() < 0.1;

    if (isWicket) {
      setWickets(wickets + 1);

      if (wickets === 10) {
        if (switchTeamFlag) setEnd(1);
        else {
          setSwitchTeamFlag(1);
        }
      } else {
        setBattingOrder((prevOrder) => prevOrder.slice(1));
        newBatsman();
      }

      setRun("w");

      // console.log("batsmen array", batsmen);
      localStorage.setItem("batsmen", JSON.stringify(batsmen));
    } else {
      const runs = Math.floor(Math.random() * 7);

      setScore((prevScore) => prevScore + runs);
      setRun(runs);

      if (target && score > target) {
        setEnd(1);
        alert(" Target fullfilled");
      }
    }

    const curBalls = balls + 1;

    if (curBalls === 6) {
      setCurOver(curOver + 1);
      setBalls(0);
    } else setBalls(curBalls);

    if (curBalls === 6) {
      if (curOver + 1 == selectedOvers) {
        // console.log("lalala", curOver, selectedOvers);

        if (switchTeamFlag) setEnd(1);
        else {
          setSwitchTeamFlag(1);
        }
      } else {
        setMatchStarted(false);
      }
    }
    // }
  };

  const switchBatsman = () => {
    if (battingOrder.length === 2) {
      // Swap the positions of the two batsmen

      const [batsman1, batsman2] = battingOrder;
      setBattingOrder([batsman2, batsman1]);

      console.log("Batsmen swapped:", battingOrder);
      // setCurrentBatsman(battingOrder[1]);
    } else {
      console.log("Insufficient batsmen in the batting order");
    }
  };

  const newBatsman = () => {
    // Find the next available batsman who hasn't been selected
    const remainingBatsmen = teams[battingTeam].filter(
      (player) => !selectedBatsmen.includes(player)
    );

    if (remainingBatsmen.length > 0) {
      const nextBatsman = remainingBatsmen[0];

      const [batsman1, batsman2] = battingOrder;

      setBattingOrder([nextBatsman, batsman2]);

      // Add the next batsman to the selected batsmen list
      setSelectedBatsmen((prevBatsmen) => [...prevBatsmen, nextBatsman]);
    }
  };

  const switchTeam = () => {
    setOverHistry(null);
    setSwitchTeamDone(1);

    localStorage.setItem("switchTeamDone", JSON.stringify(true));
    alert("team switched");
    // if (switchTeamFlag) setEnd(1)

    setSwitchTeamFlag(1);

    setTarget(score + 1);
    // setOverFill(null)

    setCurrentBatsman(null);
    setCurrentBowler(null);
    setCurOver(0);
    setRun(0);
    setBattingOrder([]);
    setBowlers([]);

    setScore(0);
    setWickets(0);

    const curBattingTeam = battingTeam;
    const curBowlingTeam = bowlingTeam;

    setBattingTeam(curBowlingTeam);
    setBowlingTeam(curBattingTeam);
    setMatchStarted(false);
  };

  const startMatch = () => {
    // console.log("over  ", selectedOvers);
    // console.log("batsman  ", battingOrder.length);

    if (battingOrder.length >= 2 && currentBowler && selectedOvers) {
      setMatchStarted(true);
    } else {
      if (battingOrder.length == 0) alert("select two batsman");
      else if (battingOrder.length == 1) alert("select second batsman");

      if (!currentBowler) alert("select a bowler");
    }
  };

  const endMatch = () => {
    setMatchStarted(false);
    alert("End of the match.");

    router.push("/match/match-end");
  };

  const matchSummary = () => {
    router.push("/match/match-summary");
  };

  return (
    <div>
      <div className={styles.matchButton}>
        <button className={styles.button} onClick={matchSummary}>
          Match Summary
        </button>
      </div>

      {switchTeamFlag && switchTeamDone && (
        <p className={styles.tossResult}>Second Innings Started!!</p>
      )}

      {tossWinner && tossDecision && !switchTeamFlag && (
        <p className={styles.tossResult}>
          {tossWinner} won the toss and choose to {tossDecision}.
        </p>
      )}

      {bowlingTeam && battingTeam && teams[battingTeam] ? (
        <>
          <div className={styles.flexContainer}>
            {/* left Column*/}
            <div className={styles.leftColumn}>
              <h2>Batting Team: {battingTeam}</h2>
              <table>
                <tbody>
                  {teams[battingTeam].map((player, index) => (
                    <tr key={index}>
                      <td>
                        <button
                          className={`${styles.cell} ${
                            selectedBatsmen.includes(player)
                              ? styles.selected
                              : ""
                          }`}
                          onClick={() => handleBattingOrderChange(player)}
                          disabled={selectedBatsmen.includes(player)}
                        >
                          {player}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/*middle column*/}

            <div className={styles.centeredContainer}>
              <div className={styles.centeredContainer}>
                {switchTeamFlag && switchTeamDone && (
                  <p className={styles.button}>Target: {target}</p>
                )}

                {overHistry && bowlers.length > 0 && (
                  <div className={styles.myDiv}>
                    <p>Over History: {overHistry?.join(", ")}</p>
                  </div>
                )}
                <div className={styles.tableContainer}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Selected Batsmen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {battingOrder.map((player, index) => (
                        <tr key={index}>
                          <td>{player}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>PlayerName</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentBatsman && (
                        <tr>
                          <td>Current Batsman</td>
                          <td>{currentBatsman}</td>
                        </tr>
                      )}
                      {currentBowler && (
                        <tr>
                          <td>Current Bowler</td>
                          <td>{currentBowler}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className={styles.lowerDiv}>
                <div>
                  <p className={styles.myDiv}>
                    Score: {score}, Run: {run} ,wicket: {wickets}, ball: {balls}
                    , over: {curOver}
                  </p>

                  <div className={styles.align}>
                    {!matchStarted && curOver > 0 && (
                      <button className={styles.button4} onClick={startMatch}>
                        Select a bowler and click it
                      </button>
                    )}

                    {!matchStarted && !curOver && (
                      <button className={styles.button3} onClick={startMatch}>
                        Play
                      </button>
                    )}
                  </div>

                  {matchStarted &&
                    !end &&
                    (!switchTeamFlag || (switchTeamFlag && switchTeamDone)) && (
                      <button className={styles.button3} onClick={simulateBall}>
                        Simulate Ball
                      </button>
                    )}

                  {matchStarted &&
                    !end &&
                    switchTeamFlag &&
                    !switchTeamDone && (
                      <button className={styles.button3} onClick={switchTeam}>
                        Second Innings
                      </button>
                    )}

                  {matchStarted && end && (
                    <button className={styles.button3} onClick={endMatch}>
                      Game End
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* right Column  */}
            <div className={styles.rightColumn}>
              <h2>Bowling Team: {bowlingTeam}</h2>
              <table>
                <tbody>
                  {teams[bowlingTeam].map((player, index) => (
                    <tr key={index}>
                      <td>
                        <button
                          className={`${styles.cell} ${
                            lastBowler === player ? styles.selected : ""
                          }`}
                          onClick={() => handleBowlersChange(player)}
                        >
                          {player}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Match;
