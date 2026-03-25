// ============================================================
// CYBER SHIELD: TOXIC RAIN — Game Data & State Management
// ============================================================

const GameData = (() => {
  // --- Word Banks ---
  const TOXIC_WORDS = [
    // Easy
    'UGLY', 'HATE', 'DUMB', 'KILL', 'LAME', 'WEAK', 'MOCK', 'BAD', 'MEAN', 'RUDE', 'SCUM', 'LIAR', 'FAKE', 'POOR', 'SLOW', 'MAD', 'FOOL', 'CRUEL', 'BRAT', 'PEST', 'SNOB', 'MUTT', 'RAT', 'SOB', 'CRY', 'SHUT UP', 'GO AWAY', 'UR UGLY',
    // Medium
    'STUPID', 'TRASH', 'LOSER', 'IDIOT', 'FREAK', 'CREEP', 'GROSS', 'TOXIC', 'BULLY', 'MORON', 'SHAME', 'TROLL', 'ABUSE', 'COWARD', 'CRAZY', 'NASTY', 'SICK', 'SLIME', 'JERK', 'PIG', 'AWFUL', 'DIRTY', 'GARBAGE', 'PITIFUL', 'MORBID', 'WEIRDO', 'SNAKE', 'WIMP', 'BOGUS', 'CHUMP', 'BULL', 'PUNK', 'SNOOTY', 'CHEAP', 'DUMMY', 'FLOP', 'CLOWN', 'SPAM', 'HACK', 'SPITE', 'GRUB', 'BRUTE', 'FIEND', 'SNOOP', 'YOU SUCK', 'EAT SHIT', 'GET LOST', 'DIE NOW', 'SO DUMB', 'LOSER FR', 'FAT ASS', 'U TRASH',
    // Hard
    'WORTHLESS', 'PATHETIC', 'USELESS', 'DISGUST', 'REJECT', 'FAILURE', 'HARASS', 'THREAT', 'INSULT', 'ISOLATE', 'TORMENT', 'INTIMIDATE', 'BLACKMAIL', 'MOCKERY', 'DESPAIR', 'RUIN', 'HUMILIATE', 'DEGRADE', 'EXPOSE', 'CANCEL', 'SABOTAGE', 'MANIPULATE', 'GASLIGHT', 'OSTRACIZE', 'BELITTLE', 'TERRORIZE', 'DOX', 'DEFAME', 'VICIOUS', 'MALICIOUS', 'HOSTILE', 'ABUSIVE', 'VENOMOUS', 'FUCK YOU', 'FUCK OFF', 'NO CARES', 'KILL URSELF'
  ];

  const SAFE_WORDS = [
    // Easy
    'KIND', 'HELP', 'LOVE', 'CARE', 'HOPE', 'SAFE', 'HERO', 'GOOD', 'NICE', 'HUG', 'WARN', 'CHEER', 'OKAY', 'CALM', 'NEAT', 'TEAM', 'PAL', 'GIFT', 'WISE', 'WARM', 'FAIR', 'REAL', 'PALS', 'JOY', 'FUN', 'YOU ROCK', 'HUG U', 'SO KIND',
    // Medium
    'SMILE', 'PEACE', 'TRUST', 'SHARE', 'ALLY', 'UNITY', 'BRAVE', 'FRIEND', 'STRONG', 'LISTEN', 'SHINE', 'HEART', 'LAUGH', 'PRAISE', 'EQUAL', 'TRUTH', 'VALUE', 'PROUD', 'HONEST', 'GENTLE', 'SECURE', 'CANDID', 'LOVING', 'TENDER', 'GRACE', 'DECENT', 'BELIEF', 'SHELTER', 'MORAL', 'PROPER', 'WORTHY', 'NOBLE', 'MILD', 'FOND', 'BRIGHT', 'GUIDE', 'DEFEND', 'MEND', 'LOVE YOU', 'GOOD JOB', 'WELL DONE', 'I CARE', 'BE BRAVE', 'KEEP GOING', 'SHINE ON',
    // Hard
    'RESPECT', 'SUPPORT', 'EMPATHY', 'UPLIFT', 'INCLUDE', 'COURAGE', 'PROTECT', 'KINDNESS', 'INSPIRE', 'WELCOME', 'ENCOURAGE', 'COMPASSION', 'GENEROUS', 'HARMONY', 'POSITIVE', 'VALIDATE', 'ACCEPT', 'SYMPATHY', 'REASSURE', 'TOLERANCE', 'AFFECTION', 'SOLIDARITY', 'NURTURE', 'GRATITUDE', 'RESILIENCE', 'APPRECIATE', 'ATTENTIVE', 'THOUGHTFUL', 'FORGIVENESS', 'INTEGRITY', 'ADVOCATE', 'CHAMPION', 'EMPOWER', 'FORTITUDE', 'COURTEOUS', 'STAY SAFE', 'U MATTER', 'STAY STRONG', 'YOU BELONG', 'WE CARE'
  ];

  const CYBER_TIPS = [
    { title: "Block & Report", text: "If someone sends you hateful messages online, don't reply. <span class='text-on-surface font-semibold text-primary'>Block and report them</span> to keep your digital space secure." },
    { title: "IT Act Section 67", text: "Under <strong>Section 67 of the Indian IT Act</strong>, publishing or transmitting obscene material in electronic form is a punishable offense." },
    { title: "Save Evidence", text: "Take screenshots of abusive messages or comments before blocking the user. It serves as strong evidence when reporting cyberbullying." },
    { title: "Report Cyber Crime", text: "You can report cyberstalking and online harassment anonymously to the National Cyber Crime Reporting Portal at <span class='text-on-surface font-semibold text-primary'>cybercrime.gov.in</span>." },
    { title: "Protect Your Peace", text: "You have the right to be safe online. <strong>Section 354D of the Indian Penal Code</strong> makes cyberstalking a criminal offense." },
    { title: "Think Before You Share", text: "Once something is posted online, it's hard to take back. Be mindful of sharing personal information that could be used for harassment." },
    { title: "Stand Up for Others", text: "If you see someone being cyberbullied, don't join in. Offer them support and encourage them to report the abuse." }
  ];

  // --- Level Configurations ---
  const LEVELS = [
    { level: 1,  name: 'Sector 01', duration: 45, spawnInterval: 2000, fallSpeed: 1.2, toxicRatio: 0.6, wordsToComplete: 10 },
    { level: 2,  name: 'Sector 02', duration: 50, spawnInterval: 1800, fallSpeed: 1.5, toxicRatio: 0.55, wordsToComplete: 14 },
    { level: 3,  name: 'Sector 03', duration: 55, spawnInterval: 1600, fallSpeed: 1.8, toxicRatio: 0.5,  wordsToComplete: 18 },
    { level: 4,  name: 'Sector 04', duration: 55, spawnInterval: 1400, fallSpeed: 2.0, toxicRatio: 0.5,  wordsToComplete: 22 },
    { level: 5,  name: 'Sector 05', duration: 60, spawnInterval: 1200, fallSpeed: 2.3, toxicRatio: 0.45, wordsToComplete: 26 },
    { level: 6,  name: 'Sector 06', duration: 60, spawnInterval: 1100, fallSpeed: 2.5, toxicRatio: 0.45, wordsToComplete: 28 },
    { level: 7,  name: 'Sector 07', duration: 60, spawnInterval: 1000, fallSpeed: 2.8, toxicRatio: 0.4,  wordsToComplete: 30 },
    { level: 8,  name: 'Sector 08', duration: 65, spawnInterval: 900,  fallSpeed: 3.0, toxicRatio: 0.4,  wordsToComplete: 32 },
    { level: 9,  name: 'Sector 09', duration: 65, spawnInterval: 800,  fallSpeed: 3.2, toxicRatio: 0.4,  wordsToComplete: 34 },
    { level: 10, name: 'Sector 10', duration: 70, spawnInterval: 700,  fallSpeed: 3.5, toxicRatio: 0.35, wordsToComplete: 36 },
  ];

  // --- Settings defaults ---
  const DEFAULT_SETTINGS = {
    soundEffects: true,
    music: true,
    vibration: false,
    darkMode: true
  };

  // --- localStorage helpers ---
  function getSettings() {
    try {
      const s = JSON.parse(localStorage.getItem('cyberShield_settings'));
      return s ? { ...DEFAULT_SETTINGS, ...s } : { ...DEFAULT_SETTINGS };
    } catch { return { ...DEFAULT_SETTINGS }; }
  }

  function saveSettings(settings) {
    localStorage.setItem('cyberShield_settings', JSON.stringify(settings));
  }

  function getHighScores() {
    try {
      return JSON.parse(localStorage.getItem('cyberShield_highscores')) || [];
    } catch { return []; }
  }

  function saveHighScore(entry) {
    // entry: { score, level, stars, accuracy, date, timePlayed }
    const scores = getHighScores();
    scores.push(entry);
    scores.sort((a, b) => b.score - a.score);
    if (scores.length > 20) scores.length = 20;
    localStorage.setItem('cyberShield_highscores', JSON.stringify(scores));
    return scores;
  }

  function clearAllData() {
    localStorage.removeItem('cyberShield_settings');
    localStorage.removeItem('cyberShield_highscores');
  }

  // --- Session helpers (for passing state between pages) ---
  function setGameState(state) {
    sessionStorage.setItem('cyberShield_gameState', JSON.stringify(state));
  }

  function getGameState() {
    try {
      return JSON.parse(sessionStorage.getItem('cyberShield_gameState')) || null;
    } catch { return null; }
  }

  function clearGameState() {
    sessionStorage.removeItem('cyberShield_gameState');
  }

  // --- Utility ---
  function getRandomWord(isToxic, levelNum = 1) {
    const list = isToxic ? TOXIC_WORDS : SAFE_WORDS;
    let windowSize = 12;
    let startIndex = (levelNum - 1) * 8;
    if (startIndex + windowSize > list.length) {
        startIndex = list.length - windowSize;
    }
    if (startIndex < 0) startIndex = 0;
    const pool = list.slice(startIndex, startIndex + windowSize);
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function getLevelConfig(levelNum) {
    const idx = Math.min(levelNum - 1, LEVELS.length - 1);
    return { ...LEVELS[Math.max(0, idx)], level: levelNum };
  }

  function calculateStars(accuracy) {
    if (accuracy >= 90) return 3;
    if (accuracy >= 70) return 2;
    return 1;
  }

  function getRandomTip() {
    return CYBER_TIPS[Math.floor(Math.random() * CYBER_TIPS.length)];
  }

  return {
    TOXIC_WORDS, SAFE_WORDS, LEVELS, DEFAULT_SETTINGS, CYBER_TIPS,
    getSettings, saveSettings,
    getHighScores, saveHighScore, clearAllData,
    setGameState, getGameState, clearGameState,
    getRandomWord, getLevelConfig, calculateStars, getRandomTip
  };
})();
