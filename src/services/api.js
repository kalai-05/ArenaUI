/**
 * Sportradar Cricket API (cricket-t2) Service
 * Base URL: https://api.sportradar.com/cricket-t2/en
 * All endpoints end with .json and require api_key query param
 */

const BASE_URL = 'https://api.sportradar.com/cricket-t2/en';
const API_KEY = '8BX22ANhymujY4zQKsySzdzJ1B4H6QiCdJY2RG63';

// Rate limiting: 1 second delay between API calls
let lastCallTime = 0;
const RATE_LIMIT_MS = 1000;

const rateLimitedFetch = async (url) => {
  const now = Date.now();
  const elapsed = now - lastCallTime;
  if (elapsed < RATE_LIMIT_MS) {
    await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_MS - elapsed));
  }
  lastCallTime = Date.now();

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`[CricketAPI] Fetch failed: ${url}`, error);
    throw error;
  }
};

export const cricketApi = {
  /**
   * Get live schedule — all currently live matches
   * Returns: { sport_events: [...], sport_events_created: [...] }
   */
  getLiveSchedule: () =>
    rateLimitedFetch(`${BASE_URL}/schedules/live/schedule.json?api_key=${API_KEY}`),

  /**
   * Get daily schedule for a specific date
   * @param {string} date - Format: YYYY-MM-DD
   */
  getDailySchedule: (date) =>
    rateLimitedFetch(`${BASE_URL}/schedules/${date}/schedule.json?api_key=${API_KEY}`),

  /**
   * Get match summary — scores, status, statistics
   * @param {string} eventId - sport_event.id (sr:match:XXXXX)
   */
  getMatchSummary: (eventId) =>
    rateLimitedFetch(`${BASE_URL}/matches/${eventId}/summary.json?api_key=${API_KEY}`),

  /**
   * Get full match timeline — ball-by-ball data
   * @param {string} eventId
   */
  getMatchTimeline: (eventId) =>
    rateLimitedFetch(`${BASE_URL}/matches/${eventId}/timeline.json?api_key=${API_KEY}`),

  /**
   * Get match timeline delta — only latest changes (for polling)
   * @param {string} eventId
   */
  getMatchTimelineDelta: (eventId) =>
    rateLimitedFetch(`${BASE_URL}/matches/${eventId}/timeline/delta.json?api_key=${API_KEY}`),

  /**
   * Get match lineups — playing XI for both teams
   * @param {string} eventId
   */
  getMatchLineups: (eventId) =>
    rateLimitedFetch(`${BASE_URL}/matches/${eventId}/lineups.json?api_key=${API_KEY}`),

  /**
   * Get team profile — team info, roster
   * @param {string} teamId - sr:competitor:XXXXX
   */
  getTeamProfile: (teamId) =>
    rateLimitedFetch(`${BASE_URL}/teams/${teamId}/profile.json?api_key=${API_KEY}`),

  /**
   * Get team results — past match results
   * @param {string} teamId
   */
  getTeamResults: (teamId) =>
    rateLimitedFetch(`${BASE_URL}/teams/${teamId}/results.json?api_key=${API_KEY}`),

  /**
   * Get player profile — player bio, career stats
   * @param {string} playerId - sr:player:XXXXX
   */
  getPlayerProfile: (playerId) =>
    rateLimitedFetch(`${BASE_URL}/players/${playerId}/profile.json?api_key=${API_KEY}`),
};

/**
 * Helper: Format today's date as YYYY-MM-DD
 */
export const getTodayDate = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/**
 * Helper: Check if advanced coverage is available
 * @param {object} timelineResponse - The full timeline response
 * @returns {boolean}
 */
export const hasAdvancedCoverage = (timelineResponse) => {
  const level = timelineResponse?.coverage?.sport_event_properties?.level;
  return level !== 'post';
};

/**
 * Helper: Get country flag emoji from country code or name
 */
export const getCountryFlag = (countryOrCode) => {
  const flagMap = {
    'India': '🇮🇳', 'IND': '🇮🇳',
    'South Africa': '🇿🇦', 'RSA': '🇿🇦', 'SA': '🇿🇦',
    'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'ENG': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'Australia': '🇦🇺', 'AUS': '🇦🇺',
    'New Zealand': '🇳🇿', 'NZ': '🇳🇿',
    'Pakistan': '🇵🇰', 'PAK': '🇵🇰',
    'West Indies': '🏴', 'WI': '🏴',
    'Sri Lanka': '🇱🇰', 'SL': '🇱🇰',
    'Bangladesh': '🇧🇩', 'BAN': '🇧🇩',
    'Afghanistan': '🇦🇫', 'AFG': '🇦🇫',
    'Zimbabwe': '🇿🇼', 'ZIM': '🇿🇼',
    'Ireland': '🇮🇪', 'IRE': '🇮🇪',
    'USA': '🇺🇸',
    'Netherlands': '🇳🇱', 'NED': '🇳🇱',
    'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'SCO': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    
    // IPL Teams (using distinct emojis)
    'Chennai Super Kings': '🦁', 'CSK': '🦁',
    'Mumbai Indians': '🌪️', 'MI': '🌪️',
    'Royal Challengers Bangalore': '👑', 'RCB': '👑',
    'Kolkata Knight Riders': '💜', 'KKR': '💜',
    'Sunrisers Hyderabad': '🦅', 'SRH': '🦅',
    'Delhi Capitals': '🐅', 'DC': '🐅',
    'Punjab Kings': '🛡️', 'PBKS': '🛡️',
    'Rajasthan Royals': '🏰', 'RR': '🏰',
    'Lucknow Super Giants': '🏏', 'LSG': '🏏',
    'Gujarat Titans': '⚔️', 'GT': '⚔️',
    
    // PSL Teams
    'Lahore Qalandars': '💚', 'LQA': '💚',
    'Karachi Kings': '💙', 'KKI': '💙',
    'Islamabad United': '❤️', 'ISU': '❤️',
    'Peshawar Zalmi': '💛', 'PEZ': '💛',
    'Quetta Gladiators': '💜', 'QUE': '💜',
    'Multan Sultans': '💚', 'MUL': '💚',
  };
  return flagMap[countryOrCode] || '🏏';
};

/**
 * Helper: Get team abbreviation from team name
 */
export const getTeamAbbr = (name) => {
  const abbrMap = {
    'India': 'IND',
    'South Africa': 'RSA',
    'England': 'ENG',
    'Australia': 'AUS',
    'New Zealand': 'NZ',
    'Pakistan': 'PAK',
    'West Indies': 'WI',
    'Sri Lanka': 'SL',
    'Bangladesh': 'BAN',
    'Afghanistan': 'AFG',
    'Chennai Super Kings': 'CSK',
    'Mumbai Indians': 'MI',
    'Royal Challengers Bangalore': 'RCB',
    'Kolkata Knight Riders': 'KKR',
    'Sunrisers Hyderabad': 'SRH',
    'Delhi Capitals': 'DC',
    'Punjab Kings': 'PBKS',
    'Rajasthan Royals': 'RR',
    'Lucknow Super Giants': 'LSG',
    'Gujarat Titans': 'GT',
    'Lahore Qalandars': 'LQA',
    'Karachi Kings': 'KKI',
    'Islamabad United': 'ISU',
    'Peshawar Zalmi': 'PEZ',
    'Quetta Gladiators': 'QUE',
    'Multan Sultans': 'MUL',
  };
  return abbrMap[name] || name?.substring(0, 3)?.toUpperCase() || '???';
};

export default cricketApi;
