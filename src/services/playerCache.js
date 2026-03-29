/**
 * Player Cache — stores lineup player info locally for search
 * Uses a simple in-memory + JSON persistence approach since
 * Sportradar has no "search all players" endpoint.
 */

// In-memory cache
let playerCache = {};

/**
 * Cache players from a lineup response
 * @param {object} lineupsData - Response from getMatchLineups
 */
export const cacheLineupsPlayers = (lineupsData) => {
  try {
    const lineups = lineupsData?.lineups || [];
    lineups.forEach(lineup => {
      const teamName = lineup?.team?.name || 'Unknown';
      const players = lineup?.starting_lineup || [];
      players.forEach(p => {
        if (p?.id) {
          playerCache[p.id] = {
            id: p.id,
            name: p.name || 'Unknown',
            jersey_number: p.jersey_number,
            is_captain: p.is_captain || false,
            is_wicketkeeper: p.is_wicketkeeper || false,
            type: p.type || 'unknown',
            team: teamName,
          };
        }
      });
    });
  } catch (error) {
    console.warn('[PlayerCache] Failed to cache lineups:', error);
  }
};

/**
 * Cache players from match summary statistics
 * @param {object} summaryData - Response from getMatchSummary
 */
export const cacheSummaryPlayers = (summaryData) => {
  try {
    const statistics = summaryData?.statistics || {};
    const innings = statistics?.innings || [];
    innings.forEach(inning => {
      const teams = inning?.teams || [];
      teams.forEach(team => {
        const teamName = team?.name || 'Unknown';
        // Cache batting players
        const battingPlayers = team?.statistics?.batting?.players || [];
        battingPlayers.forEach(p => {
          if (p?.id) {
            playerCache[p.id] = {
              ...playerCache[p.id],
              id: p.id,
              name: p.name || playerCache[p.id]?.name || 'Unknown',
              team: teamName,
            };
          }
        });
        // Cache bowling players
        const bowlingPlayers = team?.statistics?.bowling?.players || [];
        bowlingPlayers.forEach(p => {
          if (p?.id) {
            playerCache[p.id] = {
              ...playerCache[p.id],
              id: p.id,
              name: p.name || playerCache[p.id]?.name || 'Unknown',
              team: teamName,
            };
          }
        });
      });
    });
  } catch (error) {
    console.warn('[PlayerCache] Failed to cache summary players:', error);
  }
};

/**
 * Search cached players by name
 * @param {string} query - Search query
 * @returns {Array} Matching players
 */
export const searchCachedPlayers = (query) => {
  if (!query || query.length === 0) return [];
  const lowerQuery = query.toLowerCase();
  return Object.values(playerCache).filter(p =>
    p.name.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Get all cached players
 * @returns {Array}
 */
export const getAllCachedPlayers = () => Object.values(playerCache);

/**
 * Get cached player by ID
 * @param {string} playerId
 * @returns {object|null}
 */
export const getCachedPlayer = (playerId) => playerCache[playerId] || null;

export default {
  cacheLineupsPlayers,
  cacheSummaryPlayers,
  searchCachedPlayers,
  getAllCachedPlayers,
  getCachedPlayer,
};
