function calculateUserStats(jsonData) {
    const userStats = {};
  
    // Iterate through each bet in the JSON data
    jsonData.forEach((pint) => {
      const ownerUsername = pint.owner.username;
      const ownerUserID = pint.owner._id;
      const owedByUsername = pint.owed_by.username;
      const owedByID = pint.owed_by._id;
  
      // Initialize user stats if not already present
      if (!userStats[ownerUsername]) {
        userStats[ownerUsername] = {
          ID: ownerUserID,
          betsWon: 0,
          betsLost: 0,
          pintsOwnedClaimed: 0,
          pintsOwnedNotClaimed: 0,
          pintsOwedClaimed: 0,
          pintsOwedNotClaimed: 0,
        };
      }
  
      if (!userStats[owedByUsername]) {
        userStats[owedByUsername] = {
          ID: owedByID,
          betsWon: 0,
          betsLost: 0,
          pintsOwnedClaimed: 0,
          pintsOwnedNotClaimed: 0,
          pintsOwedClaimed: 0,
          pintsOwedNotClaimed: 0,
        };
      }
  
      userStats[ownerUsername].betsWon++;
      userStats[owedByUsername].betsLost++;
  
      if (pint.claimed) {
        userStats[ownerUsername].pintsOwnedClaimed++;
        userStats[owedByUsername].pintsOwedClaimed++;
      } else {
        userStats[ownerUsername].pintsOwnedNotClaimed++;
        userStats[owedByUsername].pintsOwedNotClaimed++;
      }
    });
  
    // Convert user stats to an array of objects
    const result = Object.keys(userStats).map((username) => {
      const { ID, betsWon, betsLost } = userStats[username];
  
      return {
        ID,
        username,
        betsWon,
        betsLost,
        pintsOwnedClaimed: userStats[username].pintsOwnedClaimed,
        pintsOwnedNotClaimed: userStats[username].pintsOwnedNotClaimed,
        pintsOwedClaimed: userStats[username].pintsOwedClaimed,
        pintsOwedNotClaimed: userStats[username].pintsOwedNotClaimed,
        winPercentage: ((betsWon / (betsWon + betsLost)) * 100).toFixed(2),
      };
    });
  
    return result;
  }
  
  module.exports = calculateUserStats;