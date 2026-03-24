// ============================================================
// CYBER SHIELD: TOXIC RAIN — Game Data & State Management
// ============================================================

const GameData = (() => {
  // --- Word Banks ---
  const TOXIC_WORDS = [
    'UGLY', 'STUPID', 'TRASH', 'LOSER', 'WORTHLESS', 'IDIOT',
    'HATE', 'DUMB', 'FREAK', 'PATHETIC', 'KILL', 'NOBODY',
    'LAME', 'CREEP', 'GROSS', 'TOXIC', 'WEAK', 'USELESS',
    'BULLY', 'MORON', 'SHAME', 'DISGUST', 'REJECT', 'FAILURE',
    'TROLL', 'HARASS', 'ABUSE', 'THREAT', 'MOCK', 'INSULT'
  ];

  const SAFE_WORDS = [
    'KIND', 'HELP', 'LOVE', 'BRAVE', 'FRIEND', 'RESPECT',
    'STRONG', 'SUPPORT', 'CARE', 'SMILE', 'HOPE', 'PEACE',
    'TRUST', 'SAFE', 'GENTLE', 'SHARE', 'LISTEN', 'HERO',
    'EMPATHY', 'UPLIFT', 'ALLY', 'INCLUDE', 'UNITY', 'COURAGE',
    'PROTECT', 'KINDNESS', 'INSPIRE', 'SHINE', 'WELCOME', 'CHEER'
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
  function getRandomWord(isToxic) {
    const list = isToxic ? TOXIC_WORDS : SAFE_WORDS;
    return list[Math.floor(Math.random() * list.length)];
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

  return {
    TOXIC_WORDS, SAFE_WORDS, LEVELS, DEFAULT_SETTINGS,
    getSettings, saveSettings,
    getHighScores, saveHighScore, clearAllData,
    setGameState, getGameState, clearGameState,
    getRandomWord, getLevelConfig, calculateStars
  };
})();
