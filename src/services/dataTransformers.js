/**
 * Data Transformers — maps Sportradar API responses to the existing
 * UI component data shapes so components don't need changes.
 */

import { getCountryFlag, getTeamAbbr } from './api';

/**
 * Transform a sport_event + sport_event_status into MatchHeader-compatible shape
 */
export const transformMatchToCard = (sportEvent, sportEventStatus) => {
  const competitors = sportEvent?.competitors || [];
  const team1Raw = competitors[0] || {};
  const team2Raw = competitors[1] || {};
  const venue = sportEvent?.venue || {};
  const tournament = sportEvent?.tournament || {};

  // Parse display_score: "3/176 2/201" -> team scores
  const displayScore = sportEventStatus?.display_score || '';
  const scores = displayScore.split(' ');

  // Determine match status — API puts status at top-level sport_event.status
  // for schedule endpoints, and inside sport_event_status for summary endpoints
  const matchStatus = sportEventStatus?.status
    || sportEventStatus?.match_status
    || sportEvent?.status
    || 'not_started';
  const detailStatus = sportEventStatus?.match_status || '';

  let status = 'upcoming';
  let statusText = 'Upcoming';

  const liveStatuses = ['live', 'started', 'inprogress'];
  const liveDetailStatuses = ['innings_break', 'interrupted', 'rain_delay'];

  if (liveStatuses.includes(matchStatus) || liveDetailStatuses.includes(detailStatus)) {
    status = 'live';
    statusText = 'Live';
  } else if (['ended', 'closed', 'complete'].includes(matchStatus)) {
    status = 'completed';
    statusText = 'Completed';
  }

  // Build result text
  let result = '';
  if (sportEventStatus?.result?.description) {
    result = sportEventStatus.result.description;
  } else if (sportEventStatus?.toss_won_by && sportEventStatus?.toss_decision) {
    const tossWinner = competitors.find(c => c.id === sportEventStatus.toss_won_by);
    const winnerName = tossWinner ? tossWinner.name : 'Unknown';
    result = `${winnerName} won toss and chose to ${sportEventStatus.toss_decision}`;
  } else if (status === 'upcoming') {
    const startTime = sportEvent?.scheduled;
    if (startTime) {
      const d = new Date(startTime);
      result = `Starts at ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  }

  // Helper to find the period (inning) where a particular team batted
  const getTeamBattingPeriod = (qualifier) => {
    const periodScores = sportEventStatus?.period_scores || [];
    return periodScores.filter(p => {
      const myScore = p[`${qualifier}_score`] || 0;
      const otherScore = p[qualifier === 'home' ? 'away_score' : 'home_score'] || 0;
      // Heuristic to detect if they batted in this period
      return myScore > 0 || p[`${qualifier}_wickets`] !== undefined || (myScore === 0 && otherScore === 0 && p.display_score);
    }).pop(); // take the latest period
  };

  const getTeamScore = (competitor) => {
    if (!competitor?.qualifier) return '0/0';
    const period = getTeamBattingPeriod(competitor.qualifier);
    if (period && period.display_score) {
      return period.display_score;
    }
    // Fallback naive split if no period scores
    const scores = (sportEventStatus?.display_score || '').split(' ');
    if (competitor.qualifier === 'home' && scores[0]) return scores[0];
    if (competitor.qualifier === 'away' && scores[1]) return scores[1];
    
    return '0/0';
  };

  const getTeamOvers = (competitor) => {
    if (!competitor?.qualifier) return '';
    const period = getTeamBattingPeriod(competitor.qualifier);
    
    if (period) {
      // If they are currently batting
      if (period.number === sportEventStatus?.current_inning && sportEventStatus?.display_overs !== undefined) {
        return sportEventStatus.display_overs.toString();
      }
      // If inning is completed
      if (period.overs !== undefined) {
        return period.overs.toString();
      }
    }
    return '';
  };

  return {
    id: sportEvent?.id,
    matchInfo: tournament?.name || sportEvent?.season?.name || '',
    status,
    statusText,
    result,
    venue: venue?.name || '',
    tournament: tournament?.name || '',
    team1: {
      name: team1Raw?.name || 'TBD',
      code: team1Raw?.abbreviation || getTeamAbbr(team1Raw?.name),
      flag: getCountryFlag(team1Raw?.name || team1Raw?.abbreviation || ''),
      score: getTeamScore(team1Raw),
      overs: getTeamOvers(team1Raw),
      form: [],
    },
    team2: {
      name: team2Raw?.name || 'TBD',
      code: team2Raw?.abbreviation || getTeamAbbr(team2Raw?.name),
      flag: getCountryFlag(team2Raw?.name || team2Raw?.abbreviation || ''),
      score: getTeamScore(team2Raw),
      overs: getTeamOvers(team2Raw),
      form: [],
    },
    result,
    status,
    rr: sportEventStatus?.run_rate || '0.0',
    rrr: sportEventStatus?.required_run_rate || '0.0',
    statusText,
  };
};

/**
 * Transform match summary into scorecard data shape
 */
export const transformSummaryToScorecard = (summaryData) => {
  const sportEvent = summaryData?.sport_event || {};
  const status = summaryData?.sport_event_status || {};
  const statistics = summaryData?.statistics || {};
  const innings = statistics?.innings || [];

  const transformInnings = (inningData, inningIndex) => {
    if (!inningData) return null;
    const teams = inningData?.teams || [];

    // Find batting team and bowling team
    let battingTeamData = null;
    let bowlingTeamData = null;

    teams.forEach(team => {
      if (team?.statistics?.batting) {
        battingTeamData = team;
      }
      if (team?.statistics?.bowling) {
        bowlingTeamData = team;
      }
    });

    // If both bat and bowl exist on same team, use first as batting
    if (!battingTeamData && teams[0]) battingTeamData = teams[0];
    if (!bowlingTeamData && teams[1]) bowlingTeamData = teams[1];

    const battingPlayers = battingTeamData?.statistics?.batting?.players || [];
    const bowlingPlayers = bowlingTeamData?.statistics?.bowling?.players || [];

    const batting = battingPlayers.map(p => ({
      name: p.name || 'Unknown',
      howOut: p.statistics?.dismissal?.type || 'not out',
      r: p.statistics?.runs || 0,
      b: p.statistics?.balls_faced || 0,
      m: p.statistics?.minutes || 0,
      fours: p.statistics?.fours || 0,
      sixes: p.statistics?.sixes || 0,
      sr: p.statistics?.strike_rate || 0,
      isHighlight: (p.statistics?.runs || 0) >= 50,
      playerId: p.id,
    }));

    const bowling = bowlingPlayers.map(p => ({
      name: p.name || 'Unknown',
      o: p.statistics?.overs_bowled || 0,
      m: p.statistics?.maidens || 0,
      r: p.statistics?.conceded_runs || 0,
      w: p.statistics?.wickets || 0,
      wd: p.statistics?.wides || 0,
      nb: p.statistics?.no_balls || 0,
      isHighlight: (p.statistics?.wickets || 0) >= 3,
      playerId: p.id,
    }));

    const totalOvers = inningData?.overs_completed || '0';
    const totalRuns = battingTeamData?.statistics?.batting?.runs || 0;
    const totalWickets = battingTeamData?.statistics?.batting?.wickets || 0;
    const runRate = totalOvers > 0 ? (totalRuns / parseFloat(totalOvers)).toFixed(2) : '0.00';

    const extras = battingTeamData?.statistics?.batting?.extras || {};
    const extrasTotal = extras.total || 0;
    const extrasDetail = [
      extras.wides && `w${extras.wides}`,
      extras.no_balls && `nb${extras.no_balls}`,
      extras.lb && `lb${extras.lb}`,
      extras.b && `b${extras.b}`,
    ].filter(Boolean).join(', ');

    const partnerships = battingTeamData?.statistics?.batting?.partnerships || [];
    const fallOfWickets = partnerships.map(p => {
      const dismissedPlayer = battingPlayers.find(bp => bp.id === p.dismissed_player);
      return {
        score: `${p.wicket_number}-${p.runs}`,
        player: dismissedPlayer?.name || 'Unknown',
        overs: `(${p.end || '0.0'} ov)`,
      };
    });

    const didNotBat = (battingTeamData?.statistics?.batting?.did_not_bat || []).map(p => p.name);

    return {
      team: battingTeamData?.name || `Innings ${inningIndex + 1}`,
      flag: getCountryFlag(battingTeamData?.name || ''),
      maxOvers: '20 ovs maximum',
      target: inningIndex > 0 && status.target ? `T:${status.target} runs from 20 ovs` : null,
      totalScore: `${totalRuns}/${totalWickets}`,
      totalOvers: `${totalOvers} Ov (RR: ${runRate})`,
      batting,
      bowling,
      extras: {
        total: extrasTotal,
        detail: extrasDetail ? `(${extrasDetail})` : '',
      },
      fallOfWickets,
      didNotBat,
    };
  };

  const firstInnings = transformInnings(innings[0], 0);
  const secondInnings = transformInnings(innings[1], 1);

  return {
    firstInnings: firstInnings || {
      team: 'Innings 1', flag: '🏏', totalScore: '0/0', totalOvers: '0 Ov',
      batting: [], bowling: [], extras: { total: 0, detail: '' },
    },
    secondInnings: secondInnings || {
      team: 'Innings 2', flag: '🏏', totalScore: '0/0', totalOvers: '0 Ov',
      batting: [], bowling: [], extras: { total: 0, detail: '' },
    },
  };
};

/**
 * Transform lineups response to squad data shape
 */
export const transformLineupsToSquad = (lineupsData) => {
  const lineups = lineupsData?.lineups || [];
  const result = {};

  lineups.forEach((lineup, idx) => {
    const teamName = lineup?.team?.name || `Team ${idx + 1}`;
    const teamKey = teamName.toLowerCase().replace(/\s+/g, '');
    const players = lineup?.starting_lineup || [];

    result[teamKey] = {
      name: teamName,
      flag: getCountryFlag(teamName),
      players: players.map(p => {
        let suffix = '';
        if (p.is_captain) suffix += ' (c)';
        if (p.is_wicketkeeper) suffix += ' (wk)';
        return `${p.name || 'Unknown'}${suffix}`;
      }),
      rawPlayers: players,
    };
  });

  return result;
};

/**
 * Transform timeline data into past overs shape
 */
export const transformTimelineToPastOvers = (timelineData, sportEventStatus) => {
  const timeline = timelineData?.timeline || [];
  const oversMap = {};

  // Filter to ball deliveries
  const ballEvents = timeline.filter(e =>
    e.type === 'delivery' || e.type === 'dismissal' || e.type === 'ball' || e.batting_params
  );

  ballEvents.forEach(event => {
    const overNumber = event.over_number !== undefined ? event.over_number : 0;
    if (!oversMap[overNumber]) {
      oversMap[overNumber] = {
        over: overNumber,
        runs: 0,
        wickets: 0,
        teamScore: event.display_score || '',
        bowler: event?.bowling_params?.bowler?.name || 'Unknown',
        balls: [],
        commentary: [],
      };
    }

    const runsScored = event?.batting_params?.runs_scored || 0;
    const isWicket = event?.type === 'dismissal' || !!event?.dismissal_params;
    const extraType = event?.bowling_params?.extra_runs_type;
    const isWide = extraType === 'wide';
    const isNoBall = extraType === 'no_ball';
    const extraRuns = event?.bowling_params?.extra_runs_conceded || 0;

    let ballType = 'run';
    let ballRuns = runsScored + extraRuns;

    if (isWicket) {
      ballType = 'wicket';
      ballRuns = 'W';
      oversMap[overNumber].wickets += 1;
    } else if (isWide) {
      ballType = 'wide';
      ballRuns = `${ballRuns}w`;
    } else if (isNoBall) {
      ballType = 'wide';
      ballRuns = `${ballRuns}nb`;
    } else if (runsScored === 0) {
      ballType = 'dot';
    } else if (runsScored === 4) {
      ballType = 'four';
    } else if (runsScored === 6) {
      ballType = 'six';
    }

    oversMap[overNumber].runs += runsScored;
    oversMap[overNumber].balls.push({ runs: ballRuns, type: ballType });

    if (event?.commentary?.text) {
      oversMap[overNumber].commentary.push(event.commentary.text);
    }
  });

  // Convert to array sorted descending
  return Object.values(oversMap)
    .sort((a, b) => b.over - a.over)
    .map(over => ({
      ...over,
      runs: `${over.runs} - ${over.wickets}`,
    }));
};

/**
 * Transform timeline for Wagon Wheel data
 * Filters by batsman ID
 */
export const transformTimelineToWagonWheel = (timelineData, playerId) => {
  const timeline = timelineData?.timeline || [];
  const ballEvents = timeline.filter(e =>
    (e.type === 'delivery' || e.type === 'dismissal' || e.type === 'ball' || e.batting_params) &&
    e?.batting_params?.striker?.id === playerId
  );

  return ballEvents.map(event => {
    const bp = event?.batting_params || {};
    return {
      zone: bp.zone_played_in || '',
      angle: bp.angle_traversed || 0,
      runs: bp.runs_scored || 0,
      isBoundary: bp.hit_to_boundary || false,
      stroke: bp.stroke || '',
      trace: bp.trace || '',
    };
  });
};

/**
 * Transform timeline for Line and Length data
 * Filters by bowler ID
 */
export const transformTimelineToLineAndLength = (timelineData, bowlerId) => {
  const timeline = timelineData?.timeline || [];
  const ballEvents = timeline.filter(e =>
    (e.type === 'delivery' || e.type === 'dismissal' || e.type === 'ball' || e.bowling_params) &&
    e?.bowling_params?.bowler?.id === bowlerId
  );

  return ballEvents.map(event => {
    const bowlParams = event?.bowling_params || {};
    const batParams = event?.batting_params || {};
    const isWicket = event?.type === 'dismissal' || !!event?.dismissal_params;
    const isBoundary = batParams.hit_to_boundary || false;
    const runs = batParams.runs_scored || 0;

    let resultType = 'run';
    if (isWicket) resultType = 'wicket';
    else if (isBoundary) resultType = 'boundary';
    else if (runs === 0) resultType = 'dot';

    return {
      pitchX: bowlParams.pitch_x || 0,
      pitchY: bowlParams.pitch_y || 0,
      deliveryType: bowlParams.delivery_type || 'stock',
      bowlingFrom: bowlParams.bowling_from || 'over',
      resultType,
      runs,
      extraRuns: bowlParams.extra_runs_conceded || 0,
      extraType: bowlParams.extra_runs_type || '',
    };
  });
};

/**
 * Transform match summary for stadium detail data
 */
export const transformSummaryToStadium = (summaryData) => {
  const sportEvent = summaryData?.sport_event || {};
  const venue = sportEvent?.venue || {};
  const conditions = sportEvent?.sport_event_conditions || {};
  const pitchInfo = conditions?.pitch_info || {};
  const weatherInfo = conditions?.weather_info || {};

  return {
    name: venue?.name || 'Unknown Stadium',
    location: [venue?.city_name, venue?.country_name].filter(Boolean).join(', ') || 'Unknown',
    capacity: venue?.capacity || 'N/A',
    bowlingEnds: venue?.bowling_ends?.map(e => e.name) || [],
    pitchReport: [
      pitchInfo.pitch_quality && `Quality: ${pitchInfo.pitch_quality}`,
      pitchInfo.grass_cover && `Grass: ${pitchInfo.grass_cover}`,
      pitchInfo.pitch_moisture && `Moisture: ${pitchInfo.pitch_moisture}`,
      pitchInfo.boundary_position && `Boundary: ${pitchInfo.boundary_position}`,
    ].filter(Boolean).join(' | ') || 'Pitch report not available',
    weather: [
      weatherInfo.sky_conditions && `Sky: ${weatherInfo.sky_conditions}`,
      weatherInfo.temperature_range && `Temp: ${weatherInfo.temperature_range}`,
      weatherInfo.rain_conditions && `Rain: ${weatherInfo.rain_conditions}`,
    ].filter(Boolean).join(' | ') || 'Weather info not available',
    dayNight: conditions?.day_night || 'day',
    history: '',
    lastMatches: [],
  };
};

/**
 * Transform player profile API response
 */
export const transformPlayerProfile = (profileData) => {
  const player = profileData?.player || {};
  return {
    id: player.id,
    name: player.name || 'Unknown',
    battingStyle: player.batting_style || '',
    bowlingStyle: player.bowling_style || '',
    nationality: player.nationality || '',
    dateOfBirth: player.date_of_birth || '',
    country: getCountryFlag(player.nationality || ''),
  };
};

/**
 * Extract an individual player's stats from a match summary
 */
export const transformPlayerMatchStats = (summaryData, playerId) => {
  if (!summaryData || !playerId) return null;
  const innings = summaryData?.statistics?.innings || [];
  let battingStats = null;
  let bowlingStats = null;

  innings.forEach(inning => {
    const teams = inning?.teams || [];
    teams.forEach(team => {
      if (team.statistics?.batting) {
        const batter = team.statistics.batting.players?.find(p => p.id === playerId);
        if (batter) battingStats = batter.statistics;
      }
      if (team.statistics?.bowling) {
        const bowler = team.statistics.bowling.players?.find(p => p.id === playerId);
        if (bowler) bowlingStats = bowler.statistics;
      }
    });
  });

  return { batting: battingStats, bowling: bowlingStats };
};

/**
 * Transform match summary to extract live dashboard stats
 * (batsmen, bowler, weather for GodsEyeView)
 */
export const transformLiveMatchStats = (summaryData) => {
  const sportEvent = summaryData?.sport_event || {};
  const status = summaryData?.sport_event_status || {};
  const statistics = summaryData?.statistics || {};
  const innings = statistics?.innings || [];

  const weather = sportEvent?.sport_event_conditions?.weather_info || {};
  
  // Basic weather mappings
  let temp = weather.temperature_range === 'warm' ? '28°C' : weather.temperature_range === 'hot' ? '32°C' : '20°C';
  let humidity = '60%'; // Not in API, mocked
  let rainProb = weather.rain_conditions === 'no_rain' ? '0%' : '50%';

  const godsEyeData = {
    temp, humidity, rainProb, timing: '75%', control: '80%'
  };

  let batsmenData = [];
  let bowlerData = null;

  // Find current inning based on length or current_inning field
  const currentInningIdx = (status.current_inning || 1) - 1;
  const currentInning = innings[currentInningIdx];

  if (currentInning) {
    const teams = currentInning.teams || [];
    let battingTeam = teams.find(t => t.statistics?.batting);
    let bowlingTeam = teams.find(t => t.statistics?.bowling);

    // If active batting team found
    if (battingTeam) {
      const allBatsmen = battingTeam.statistics?.batting?.players || [];
      const latestBall = summaryData?.timeline?.[summaryData.timeline.length - 1];
      const strikerId = latestBall?.batting_params?.striker?.id;
      const nonStrikerId = latestBall?.batting_params?.non_striker?.id;

      let activeBatsmen = [];
      if (strikerId || nonStrikerId) {
        activeBatsmen = allBatsmen.filter(p => p.id === strikerId || p.id === nonStrikerId);
      }
      
      if (activeBatsmen.length < 2) {
        const notOutPlayers = allBatsmen.filter(p => !p.statistics?.dismissal);
        activeBatsmen = notOutPlayers.length > 0 ? notOutPlayers.slice(-2) : allBatsmen.slice(-2);
      }

      batsmenData = activeBatsmen.map(p => ({
        playerId: p.id,
        name: p.name || 'Unknown',
        r: p.statistics?.runs || 0,
        b: p.statistics?.balls_faced || 0,
        fours: p.statistics?.fours || 0,
        sixes: p.statistics?.sixes || 0,
        impact: Math.round((p.statistics?.strike_rate || 100) * 0.6),
        impactColor: '#52B4F5'
      }));
    }

    // If active bowling team found
    if (bowlingTeam) {
      const allBowlers = bowlingTeam.statistics?.bowling?.players || [];
      const latestBall = summaryData?.timeline?.[summaryData.timeline.length - 1];
      const bowlerId = latestBall?.bowling_params?.bowler?.id;

      let current = bowlerId ? allBowlers.find(p => p.id === bowlerId) : null;
      if (!current) current = allBowlers[allBowlers.length - 1]; 
      
      if (current) {
        bowlerData = {
          playerId: current.id,
          name: current.name || 'Unknown',
          o: current.statistics?.overs_bowled || '0.0',
          r: current.statistics?.conceded_runs || '0',
          w: current.statistics?.wickets || '0',
          zeros: current.statistics?.dot_balls || 0,
          fours: 0,
          sixes: 0,
          ex: (current.statistics?.wides || 0) + (current.statistics?.no_balls || 0),
          ss: '3°',
          pace: '135 km/h',
          impact: Math.max(10, 100 - (current.statistics?.economy_rate || 8) * 5),
          country: getCountryFlag(bowlingTeam.name || ''),
          ...current.statistics,
        };
      }
    }
  }

  // Extract Chart Data
  const charts = transformMatchToCharts(summaryData);

  return { godsEyeData, batsmenData, bowlerData, ...charts };
};

/**
 * Transform timeline into Manhattan and Worm data
 */
export const transformMatchToCharts = (summaryData) => {
  const timeline = summaryData?.timeline || [];
  const status = summaryData?.sport_event_status || {};
  
  const manhattan = [];
  const worm = { team1: [], team2: [] };

  // Group by inning and then over
  const inningsMap = {};
  
  timeline.forEach(event => {
    if (!event.inning || event.over_number === undefined) return;
    if (!inningsMap[event.inning]) inningsMap[event.inning] = {};
    if (!inningsMap[event.inning][event.over_number]) {
      inningsMap[event.inning][event.over_number] = { runs: 0, wickets: 0 };
    }
    
    inningsMap[event.inning][event.over_number].runs += (event.batting_params?.runs_scored || 0) + (event.bowling_params?.extra_runs_conceded || 0);
    if (event.type === 'dismissal' || !!event.dismissal_params) {
        inningsMap[event.inning][event.over_number].wickets += 1;
    }
  });

  // Current inning's manhattan
  const currInning = status.current_inning || 1;
  const currInningOvers = inningsMap[currInning] || {};
  Object.keys(currInningOvers).sort((a, b) => a - b).forEach(ov => {
    manhattan.push({
      r: currInningOvers[ov].runs,
      w: currInningOvers[ov].wickets,
      ov: ov
    });
  });

  // Worm data
  [1, 2].forEach(inn => {
    const innOvers = inningsMap[inn] || {};
    let total = 0;
    const teamKey = `team${inn}`;
    Object.keys(innOvers).sort((a, b) => a - b).forEach(ov => {
        total += innOvers[ov].runs;
        worm[teamKey].push({ ov: ov, runs: total });
    });
  });

  return { manhattan, worm };
};

export default {
  transformMatchToCard,
  transformSummaryToScorecard,
  transformLineupsToSquad,
  transformTimelineToPastOvers,
  transformTimelineToWagonWheel,
  transformTimelineToLineAndLength,
  transformSummaryToStadium,
  transformPlayerProfile,
  transformLiveMatchStats,
};
