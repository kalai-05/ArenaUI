export const matchData = {
  // Current live match
  liveMatch: {
    matchInfo: '5th T20I',
    status: 'live',
    statusText: 'Live',
    result: 'India bowl first',
    team1: {
      name: 'South Africa',
      code: 'RSA',
      flag: '🇿🇦',
      score: '201/8',
      overs: '20.0',
      form: ['W', '4', '4', '1', 'W'],
    },
    team2: {
      name: 'India',
      code: 'IND',
      flag: '🇮🇳',
      score: '176/3',
      overs: '16.5',
      form: ['1', '4', '6', 'W', '6'],
    },
  },

  // Completed match
  completedMatch: {
    matchInfo: '4th T20I',
    status: 'completed',
    statusText: 'Completed',
    result: 'IND won by 7 wickets (25 balls left)',
    team1: {
      name: 'South Africa',
      code: 'RSA',
      flag: '🇿🇦',
      score: '117/10',
      overs: '19.4',
      form: ['0', '1', 'W', '0', 'W'],
    },
    team2: {
      name: 'India',
      code: 'IND',
      flag: '🇮🇳',
      score: '120/3',
      overs: '16.3',
      form: ['4', '6', '1', '1', '6'],
    },
  },

  // Upcoming match
  upcomingMatch: {
    matchInfo: '6th T20I',
    status: 'upcoming',
    statusText: 'Upcoming',
    result: 'Starts at 7:00PM',
    team1: {
      name: 'South Africa',
      code: 'RSA',
      flag: '🇿🇦',
      score: '0/0',
      overs: '0',
      form: [],
    },
    team2: {
      name: 'India',
      code: 'IND',
      flag: '🇮🇳',
      score: '0/0',
      overs: '0',
      form: [],
    },
  },
};

export const godsEyeView = {
  temperature: '20°C',
  humidity: '63%',
  windSpeed: '9%',
  boundaries: {
    north: '76m',
    south: '78m',
    east: '73m',
    west: '78m',
  },
};

export const timelineData = {
  currentOver: '16.5',
  totalOvers: '20',
  rr: '8.33',
  tabs: ['Past Overs', 'Ball by Ball', 'Manhattan', 'Worm'],
  bars: [
    { over: 1, runs: 12, wickets: 0 },
    { over: 2, runs: 8, wickets: 0 },
    { over: 3, runs: 15, wickets: 1 },
    { over: 4, runs: 6, wickets: 0 },
    { over: 5, runs: 10, wickets: 0 },
    { over: 6, runs: 14, wickets: 0 },
    { over: 7, runs: 9, wickets: 0 },
    { over: 8, runs: 18, wickets: 1 },
    { over: 9, runs: 7, wickets: 0 },
    { over: 10, runs: 11, wickets: 0 },
    { over: 11, runs: 16, wickets: 0 },
    { over: 12, runs: 5, wickets: 1 },
    { over: 13, runs: 13, wickets: 0 },
    { over: 14, runs: 22, wickets: 0 },
    { over: 15, runs: 8, wickets: 0 },
    { over: 16, runs: 10, wickets: 0 },
  ],
};

export const playerStats = {
  bowler: {
    name: 'M. Jansen',
    figures: '2.1 24 0 2 4 1 1 3* 137km/h',
    overs: 2.1,
    runs: 24,
    wickets: 0,
    economy: 2,
  },
  batsmen: [
    {
      name: 'H. Pandya',
      score: '67',
      balls: '31st',
      fours: 3,
      status: 'batting',
    },
    {
      name: 'T. Varma',
      score: '24',
      balls: '8th',
      fours: 1,
      status: 'batting',
    },
  ],
};

export const playersData = {
  marcoJansen: {
    name: 'Marco\nJansen',
    role: 'Left Hand Fast',
    country: '🇿🇦',
    stats: [
      { label: 'Economy', value: '12.5' },
      { label: 'Wickets', value: '0' },
      { label: 'Balls Per Boundary', value: '3' },
    ],
    xStats: [
      { label: 'xEconomy', value: '10.67' },
      { label: 'xWickets', value: '1.27' },
      { label: 'xBalls Per Boundary', value: '5.25' },
    ],
    fullStats: {
      current: {
        title: '2024/25 T20i Stats',
        data: [
          { label: 'Matches', value: '7' },
          { label: 'Innings', value: '7' },
          { label: 'Wickets', value: '11' },
          { label: 'Economy', value: '9.10' },
        ],
        xData: [
          { label: 'Economy vs RHB', value: '10.42' },
          { label: 'Economy vs LHB', value: '9.67' },
          { label: 'Average/ RHB', value: '28.47' },
          { label: 'Average/ LHB', value: '24.89' },
        ],
      },
      allTime: {
        title: 'All Time T20i Stats',
        data: [
          { label: 'Matches', value: '23' },
          { label: 'Innings', value: '23' },
          { label: 'Wickets', value: '21' },
          { label: 'Economy', value: '8.49' },
        ],
        xData: [
          { label: 'Economy vs RHB', value: '8.21' },
          { label: 'Economy vs LHB', value: '8.93' },
          { label: 'Average/ RHB', value: '23' },
          { label: 'Average/ LHB', value: '26' },
        ],
      },
      metrics: {
        current: {
          title: '2024/25 T20i Metrics',
          data: [
            { label: 'Economy', value: '9.10' },
            { label: 'Wickets', value: '11' },
            { label: 'BPB', value: '4.7' },
            { label: 'Extra per over', value: '0.47' },
          ],
          xData: [
            { label: 'xEconomy', value: '11.15' },
            { label: 'xWickets', value: '8.76' },
            { label: 'xBPM', value: '3.15' },
            { label: 'xExtra per over', value: '0.7' },
          ],
        },
        allTime: {
          title: 'All Time T20i Metrics',
          data: [
            { label: 'Economy', value: '8.49' },
            { label: 'Wickets', value: '21' },
            { label: 'BPB', value: '5.15' },
            { label: 'Extra per over', value: '0.51' },
          ],
          xData: [
            { label: 'xEconomy', value: '12.12' },
            { label: 'xWickets', value: '17.89' },
            { label: 'xBPM', value: '3.72' },
            { label: 'xExtra per over', value: '0.74' },
          ],
        },
      },
      born: 'Klerksdorp, SA',
      age: '25 May, 1995',
      bowlingStyle: 'Left Hand Fast',
    },
  },
  hardikPandya: {
    name: 'Hardik\nPandya',
    role: 'Batting All-Rounder',
    country: '🇮🇳',
    stats: [
      { label: 'Average', value: '28.6' },
      { label: 'Balls Per Boundary', value: '2' },
      { label: 'Strike Rate', value: '252' },
    ],
    xStats: [
      { label: 'xAverage', value: '22.95' },
      { label: 'xBalls Per Boundary', value: '3.21' },
      { label: 'xStrike Rate', value: '189' },
    ],
    fullStats: {
      current: {
        title: '2024/25 T20i Stats',
        data: [
          { label: 'Matches', value: '18' },
          { label: 'Innings', value: '15' },
          { label: 'Average', value: '35' },
          { label: 'Avg/Fast', value: '31' },
          { label: 'Avg/Spin', value: '40' },
        ],
        xData: [
          { label: 'BPB/Fast', value: '3.7' },
          { label: 'BPB/Spin', value: '2.27' },
          { label: 'Strike Rate', value: '155' },
          { label: 'SR/Fast', value: '151.25' },
          { label: 'SR/Spin', value: '179.8' },
        ],
      },
      allTime: {
        title: 'All Time T20i Stats',
        data: [
          { label: 'Matches', value: '124' },
          { label: 'Innings', value: '97' },
          { label: 'Average', value: '28.60' },
          { label: 'Avg/Fast', value: '30' },
          { label: 'Avg/Spin', value: '39' },
        ],
        xData: [
          { label: 'BPB/Fast', value: '4' },
          { label: 'BPB/Spin', value: '2.5' },
          { label: 'Strike Rate', value: '143.51' },
          { label: 'SR/Fast', value: '147' },
          { label: 'SR/Spin', value: '192.51' },
        ],
      },
      born: 'Baroda, India',
      age: '11 Oct, 1993',
      battingStyle: 'Right Hand',
    },
  },
  tilakVarma: {
    name: 'Tilak\nVarma',
    role: 'Left Hand Batter',
    country: '🇮🇳',
    stats: [
      { label: 'Average', value: '49.3' },
      { label: 'Balls Per Boundary', value: '3.81' },
      { label: 'Strike Rate', value: '173.8' },
    ],
    xStats: [
      { label: 'xAverage', value: '34.71' },
      { label: 'xBalls Per Boundary', value: '4.32' },
      { label: 'xStrike Rate', value: '165.3' },
    ],
    fullStats: {
      current: {
        title: '2024/25 T20i Stats',
        data: [
          { label: 'Matches', value: '14' },
          { label: 'Innings', value: '14' },
          { label: 'Average', value: '51.43' },
          { label: 'Avg/Fast', value: '38' },
          { label: 'Avg/Spin', value: '43' },
        ],
        xData: [
          { label: 'BPB/Fast', value: '3.91' },
          { label: 'BPB/Spin', value: '3.47' },
          { label: 'Strike Rate', value: '144.09' },
          { label: 'SR/Fast', value: '140' },
          { label: 'SR/Spin', value: '165' },
        ],
      },
      allTime: {
        title: 'All Time T20i Stats',
        data: [
          { label: 'Matches', value: '40' },
          { label: 'Innings', value: '37' },
          { label: 'Average', value: '49.29' },
          { label: 'Avg/Fast', value: '41' },
          { label: 'Avg/Spin', value: '53' },
        ],
        xData: [
          { label: 'BPB/Fast', value: '4.22' },
          { label: 'BPB/Spin', value: '3.79' },
          { label: 'Strike Rate', value: '144.09' },
          { label: 'SR/Fast', value: '141' },
          { label: 'SR/Spin', value: '157' },
        ],
      },
      born: 'Hyderabad, India',
      age: '08 Nov, 2002',
      battingStyle: 'Left Hand',
    },
  },
};

export const scorecardData = {
  firstInnings: {
    team: 'India',
    flag: '🇮🇳',
    maxOvers: '20 ovs maximum',
    target: null,
    totalScore: '231/5',
    totalOvers: '20 Ov (RR: 11.55)',
    batting: [
      { name: 'Sanju Samson', howOut: 'bowled', r: 73, b: 42, m: 73, fours: 10, sixes: 1, sr: 173 },
      { name: 'Abhishek Sharma', howOut: 'caught', r: 5, b: 7, m: 14, fours: 0, sixes: 0, sr: 71 },
      { name: 'Jitesh Sharma', howOut: 'run out', r: 0, b: 0, m: 1, fours: 0, sixes: 0, sr: 0 },
      { name: 'Suryakumar Yadav', howOut: 'caught', r: 10, b: 3, m: 5, fours: 1, sixes: 1, sr: 333 },
      { name: 'Shivam Dube', howOut: 'caught', r: 10, b: 3, m: 5, fours: 1, sixes: 1, sr: 333 },
      { name: 'Hardik Pandya', howOut: 'not out', r: 63, b: 25, m: 38, fours: 5, sixes: 5, sr: 252, isHighlight: true },
      { name: 'Tilak Varma', howOut: 'not out', r: 73, b: 42, m: 73, fours: 10, sixes: 1, sr: 161, isHighlight: true },
    ],
    extras: { total: 9, detail: '(lb 3, w 6)' },
    bowling: [
      { name: 'Lungi Ngidi', o: 4, m: 0, r: 29, w: 0, fours: 10, sixes: 4, wd: 0, nb: 1, isHighlight: false },
      { name: 'Marco Jansen', o: 4, m: 0, r: 50, w: 0, fours: 4, sixes: 7, wd: 1, nb: 0, isHighlight: true },
      { name: 'Ottneil Baartman', o: 3, m: 0, r: 39, w: 1, fours: 6, sixes: 6, wd: 1, nb: 3, isHighlight: false },
      { name: 'Corbin Bosch', o: 3, m: 0, r: 44, w: 2, fours: 7, sixes: 4, wd: 4, nb: 1, isHighlight: false },
      { name: 'Donovan Ferreira', o: 2, m: 0, r: 20, w: 0, fours: 2, sixes: 3, wd: 0, nb: 1, isHighlight: false },
      { name: 'George Linda', o: 4, m: 0, r: 46, w: 1, fours: 5, sixes: 2, wd: 4, nb: 0, isHighlight: false },
    ],
    fallOfWickets: [
      { score: '1-63', player: 'Abhishek Sharma', overs: '5.4 ov' },
      { score: '2-97', player: 'Sanju Samson', overs: '9.1 ov' },
      { score: '3-115', player: 'Jitesh Sharma', overs: '12.1 ov' },
      { score: '4-220', player: 'Suryakumar Yadav', overs: '19.3 ov' },
      { score: '5-227', player: 'Shivam Dube', overs: '19.5 ov' },
    ],
    didNotBat: ['Washington Sundar', 'Varun Chakravarthy', 'Arshdeep Singh', 'Jasprit Bumrah'],
  },
  secondInnings: {
    team: 'South Africa',
    flag: '🇿🇦',
    target: 'T:232 runs from 20 ovs',
    totalScore: '201/8',
    totalOvers: '20 Ov (RR: 10.05)',
    batting: [
      { name: 'Quinton de Kock', howOut: 'bowled', r: 65, b: 35, m: 54, fours: 9, sixes: 3, sr: 185 },
      { name: 'Reeza Hendricks', howOut: 'caught', r: 13, b: 12, m: 34, fours: 1, sixes: 0, sr: 108 },
      { name: 'Dewald Brevis', howOut: 'run out', r: 31, b: 17, m: 25, fours: 3, sixes: 2, sr: 182 },
      { name: 'David Miller', howOut: 'caught', r: 18, b: 14, m: 24, fours: 2, sixes: 0, sr: 128 },
      { name: 'Aiden Markram', howOut: 'not out', r: 6, b: 4, m: 6, fours: 1, sixes: 0, sr: 150 },
      { name: 'Donovan Ferreira', howOut: 'not out', r: 0, b: 1, m: 1, fours: 0, sixes: 0, sr: 0 },
      { name: 'George Linde', howOut: 'not out', r: 16, b: 8, m: 14, fours: 0, sixes: 2, sr: 200 },
      { name: 'Marco Jansen', howOut: 'not out', r: 14, b: 5, m: 9, fours: 0, sixes: 2, sr: 280 },
      { name: 'Corbin Bosch', howOut: 'not out', r: 17, b: 15, m: 22, fours: 1, sixes: 1, sr: 113 },
      { name: 'Lungi Ngidi', howOut: 'not out', r: 7, b: 9, m: 16, fours: 1, sixes: 0, sr: 77 },
    ],
    extras: { total: 14, detail: '(w 14)' },
    bowling: [
      { name: 'Arshdeep Singh', o: 4, m: 0, r: 47, w: 1, fours: 9, sixes: 7, wd: 1, nb: 4, isHighlight: false },
      { name: 'W. Sundar', o: 4, m: 0, r: 30, w: 0, fours: 7, sixes: 2, wd: 1, nb: 2, isHighlight: false },
      { name: 'Jasprit Bumrah', o: 4, m: 0, r: 17, w: 2, fours: 15, sixes: 0, wd: 0, nb: 2, isHighlight: false },
      { name: 'V. Chakravarthy', o: 4, m: 0, r: 53, w: 4, fours: 7, sixes: 3, wd: 5, nb: 2, isHighlight: false },
      { name: 'Hardik Pandya', o: 3, m: 0, r: 41, w: 1, fours: 3, sixes: 5, wd: 2, nb: 0, isHighlight: false },
      { name: 'Abhishek Sharma', o: 1, m: 0, r: 13, w: 0, fours: 1, sixes: 1, wd: 1, nb: 0, isHighlight: false },
    ],
    fallOfWickets: [
      { score: '1-69', player: 'Reeza Hendricks', overs: '6.3 ov' },
      { score: '2-120', player: 'Quinton de Kock', overs: '9.1 ov' },
      { score: '3-122', player: 'Dewald Brevis', overs: '11.1 ov' },
      { score: '4-135', player: 'Aiden Markram', overs: '12.3 ov' },
      { score: '5-135', player: 'Donovan Ferreira', overs: '12.4 ov' },
      { score: '6-154', player: 'David Miller', overs: '14.4 ov' },
      { score: '7-163', player: 'George Linde', overs: '15.2 ov' },
      { score: '8-177', player: 'Marco Jansen', overs: '16.1 ov' },
    ],
    didNotBat: ['Ottneil Baartman'],
  },
};

export const pastOversData = [
  {
    over: 15,
    runs: '12 - 0',
    teamScore: 'IND 170-3',
    bowler: 'L. Ngidi',
    balls: [
      { runs: 1, type: 'run' },
      { runs: 1, type: 'run' },
      { runs: 2, type: 'run' },
      { runs: 4, type: 'four' },
      { runs: 0, type: 'dot' },
      { runs: 4, type: 'four' },
    ],
  },
  {
    over: 14,
    runs: '27 - 0',
    teamScore: 'IND 158-3',
    bowler: 'G. Linde',
    balls: [
      { runs: 6, type: 'six' },
      { runs: 1, type: 'run' },
      { runs: 4, type: 'four' },
      { runs: 6, type: 'six' },
      { runs: 6, type: 'six' },
      { runs: 4, type: 'four' },
    ],
  },
  {
    over: 13,
    runs: '16 - 0',
    teamScore: 'IND 131-3',
    bowler: 'C. Bosch',
    balls: [
      { runs: 'W', type: 'wicket' },
      { runs: 6, type: 'six' },
      { runs: 1, type: 'run' },
      { runs: 4, type: 'four' },
      { runs: 1, type: 'run' },
      { runs: 4, type: 'four' },
    ],
  },
  {
    over: 12,
    runs: '6-0',
    teamScore: 'IND 115-2',
    bowler: 'G. Linde',
    balls: [
      { runs: 0, type: 'dot' },
      { runs: 1, type: 'run' },
      { runs: 1, type: 'run' },
      { runs: 2, type: 'run' },
      { runs: 1, type: 'run' },
      { runs: 1, type: 'run' },
    ],
  },
  {
    over: 11,
    runs: '8-0',
    teamScore: 'IND 109-2',
    bowler: 'O. Baartman',
    balls: [
      { runs: 4, type: 'four' },
      { runs: 0, type: 'dot' },
      { runs: 1, type: 'run' },
      { runs: '1w', type: 'wide' },
      { runs: 0, type: 'dot' },
      { runs: 1, type: 'run' },
      { runs: 1, type: 'run' },
    ],
  },
  {
    over: 10,
    runs: '4 - 1',
    teamScore: 'IND 101-2',
    bowler: 'G. Linde',
    balls: [
      { runs: 'W', type: 'wicket' },
      { runs: 1, type: 'run' },
      { runs: 0, type: 'dot' },
      { runs: 1, type: 'run' },
      { runs: 1, type: 'run' },
      { runs: 1, type: 'run' },
    ],
  },
  {
    over: 9,
    runs: '12-0',
    teamScore: 'IND 97-1',
    bowler: 'D. Ferreira',
    balls: [
      { runs: 4, type: 'four' },
      { runs: 4, type: 'four' },
      { runs: 1, type: 'run' },
      { runs: 1, type: 'run' },
      { runs: 1, type: 'run' },
      { runs: 1, type: 'run' },
    ],
  },
  {
    over: 8,
    runs: '9 - 0',
    teamScore: 'IND 85-1',
    bowler: 'G. Linde',
    balls: [
      { runs: 1, type: 'run' },
      { runs: 0, type: 'dot' },
      { runs: 1, type: 'run' },
      { runs: 1, type: 'run' },
      { runs: 0, type: 'dot' },
      { runs: 6, type: 'six' },
    ],
  },
];

export const inningsScoreData = {
  title: '1st Innings Score',
  rows: [
    { date: 'Dec 19, 2025', teams: 'IND Vs RSA', score: '232' },
    { date: 'Feb 01, 2023', teams: 'IND Vs NZ', score: '234' },
    { date: 'Mar 20, 2021', teams: 'IND Vs ENG', score: '224' },
    { date: 'Mar 18, 2021', teams: 'IND Vs ENG', score: '185' },
    { date: 'Mar 16, 2021', teams: 'IND Vs ENG', score: '156' },
  ],
  average: '178',
};

export const stadiumData = {
  name: 'Narendra Modi Stadium',
  location: 'Ahmedabad, Gujarat, India',
  history: 'The Narendra Modi Stadium is the largest stadium in the world, featuring a massive seating capacity of 132,000 spectators [cite]. Completely rebuilt in 2020 at a cost of ₹800 crore, this state-of-the-art venue serves as a premier hub for international cricket, hosting marquee events like the IPL and the 2023 ICC World Cup final',
  pitchReport: 'The huge Narendra Modi Stadium has typically assisted high-scoring affairs with batters getting plenty of joy in the conditions. It will also offer help to the pacers before slowing down to give spinners a chance. Dew is expected to play a factor as well.',
  lastMatches: [
    { date: 'Dec 19, 2025', team1: '🇮🇳 India', team2: 'South Africa' },
    { date: 'Feb 01, 2023', team1: '🇮🇳 India', team2: 'New Zealand' },
    { date: 'Mar 20, 2021', team1: '🇮🇳 India', team2: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England' },
    { date: 'Mar 18, 2021', team1: '🇮🇳 India', team2: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England' },
    { date: 'Mar 16, 2021', team1: '🇮🇳 India', team2: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England' },
  ],
};

export const squadData = {
  india: {
    name: 'India',
    flag: '🇮🇳',
    players: [
      'Sanju Samson', 'Abhishek Sharma', 'Tilak Varma',
      'Suryakumar Yadav', 'Hardik Pandya', 'Shivam Dube',
      'Jitesh Sharma', 'Washington Sundar', 'Varun Chakravarthy',
      'Arshdeep Singh', 'Jasprit Bumrah',
    ],
  },
  southAfrica: {
    name: 'South Africa',
    flag: '🇿🇦',
    players: [
      'Quinton de Kock', 'Reaza Hendricks', 'Dewald Brevis',
      'David Miller', 'Aiden Markram', 'Donovan Ferreira',
      'George Linde', 'Marco Jansen', 'Corbin Bosch',
      'Lungi Ngidi', 'Ottneil Baartman',
    ],
  },
};

export const teamsToFollow = [
  { name: 'India', flag: '🇮🇳' },
  { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { name: 'South Africa', flag: '🇿🇦' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'New Zealand', flag: '🇳🇿' },
  { name: 'Pakistan', flag: '🇵🇰' },
  { name: 'West Indies', flag: '🏴' },
  { name: 'Sri Lanka', flag: '🇱🇰' },
  { name: 'Bangladesh', flag: '🇧🇩' },
  { name: 'Afghanistan', flag: '🇦🇫' },
];

export const playersToFollow = [
  { name: 'Jos Buttler', country: 'England' },
  { name: 'Abhishek Sharma', country: 'India' },
  { name: 'Quinton de Kock', country: 'South Africa' },
  { name: 'Shai Hope', country: 'West Indies' },
  { name: 'Aaron Jones', country: 'USA' },
  { name: 'Travis Head', country: 'Australia' },
];

export const profileData = {
  name: 'Carlos Brathwaite',
  memberSince: '2025',
  email: 'carlos@arena.ai',
  phone: '+44 7948986354',
};

export const wagonWheelData = {
  hardik: {
    batsman: 'Hardik Pandya',
    score: '57',
    balls: '27',
    fours: 3,
    sixes: 1,
    timing: '73%',
    control: '87%',
  },
  tilak: {
    batsman: 'Tilak Varma',
    score: '24',
    balls: '8',
    fours: 1,
    sixes: 0,
    timing: '65%',
    control: '68%',
  },
};

export const lineAndLengthData = {
  marcoJansen: {
    bowler: 'Marco Jansen',
    overs: '1.2',
    wickets: 0,
    fours: 3,
    sixes: 2,
    batsmanType: ['LHB', 'RHB'],
    seamSwing: '1.3°',
    avgPace: '137 km/h',
  },
  lungiNgidi: {
    bowler: 'Lungi Ngidi',
    overs: '1',
    wickets: 0,
    fours: 2,
    sixes: 2,
    seamSwing: '2.5°',
    avgPace: '140 km/h',
  },
  georgeLinde: {
    bowler: 'George Linde',
    overs: '1.2',
    wickets: 1,
    fours: 1,
    sixes: 1,
    spin: '3.1°',
    releasePoint: 'Slider',
  },
};

export const searchPlayers = [
  'Hardik Pandya',
  'Tilak Varma',
  'Marco Jansen',
];
