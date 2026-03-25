// ============================================================
// CYBER SHIELD: TOXIC RAIN — Game Data & State Management
// ============================================================

const GameData = (() => {
  // --- Word Banks ---
  const TOXIC_WORDS = [
    // Easy (short, common insults)
    'UGLY', 'HATE', 'DUMB', 'KILL', 'LAME', 'WEAK', 'MOCK', 'BAD', 'MEAN', 'RUDE',
    'SCUM', 'LIAR', 'FAKE', 'POOR', 'SLOW', 'MAD', 'FOOL', 'CRUEL', 'BRAT', 'PEST',
    'SNOB', 'MUTT', 'RAT', 'SOB', 'CRY', 'SHUT UP', 'GO AWAY', 'UR UGLY', 'BORE',
    'DORK', 'NERD', 'WORM', 'TOAD', 'SLUG', 'MOLE', 'GOOF', 'DOLT', 'BOZO', 'OAF',
    'GOON', 'TWIT', 'PUNY', 'VOID', 'COLD', 'SORE', 'VILE', 'GRIM', 'FOUL', 'BUZZ OFF',
    'NO ONE', 'SO LAME', 'UR BAD', 'GO CRY', 'U MAD',
    // Medium (stronger language, multi-word slurs)
    'STUPID', 'TRASH', 'LOSER', 'IDIOT', 'FREAK', 'CREEP', 'GROSS', 'TOXIC', 'BULLY',
    'MORON', 'SHAME', 'TROLL', 'ABUSE', 'COWARD', 'CRAZY', 'NASTY', 'SICK', 'SLIME',
    'JERK', 'PIG', 'AWFUL', 'DIRTY', 'GARBAGE', 'PITIFUL', 'MORBID', 'WEIRDO', 'SNAKE',
    'WIMP', 'BOGUS', 'CHUMP', 'BULL', 'PUNK', 'SNOOTY', 'CHEAP', 'DUMMY', 'FLOP',
    'CLOWN', 'SPAM', 'HACK', 'SPITE', 'GRUB', 'BRUTE', 'FIEND', 'SNOOP', 'YOU SUCK',
    'EAT SHIT', 'GET LOST', 'DIE NOW', 'SO DUMB', 'LOSER FR', 'FAT ASS', 'U TRASH',
    'SCUMBAG', 'PSYCHO', 'SICKO', 'DEVIANT', 'HATER', 'LEECH', 'VERMIN', 'PLAGUE',
    'GREEDY', 'PETTY', 'BITTER', 'SHADY', 'PHONY', 'SLEAZY', 'SMUG', 'SAVAGE',
    'MENACE', 'ROTTEN', 'CURSED', 'WICKED', 'SKANK', 'GHOUL', 'DEMON', 'STINK',
    'NOBODY ASKED', 'SO FAKE', 'UR DONE', 'BACK OFF', 'STAY MAD',
    // Hard (extreme cyberbullying, longer phrases)
    'WORTHLESS', 'PATHETIC', 'USELESS', 'DISGUST', 'REJECT', 'FAILURE', 'HARASS',
    'THREAT', 'INSULT', 'ISOLATE', 'TORMENT', 'INTIMIDATE', 'BLACKMAIL', 'MOCKERY',
    'DESPAIR', 'RUIN', 'HUMILIATE', 'DEGRADE', 'EXPOSE', 'CANCEL', 'SABOTAGE',
    'MANIPULATE', 'GASLIGHT', 'OSTRACIZE', 'BELITTLE', 'TERRORIZE', 'DOX', 'DEFAME',
    'VICIOUS', 'MALICIOUS', 'HOSTILE', 'ABUSIVE', 'VENOMOUS', 'FUCK YOU', 'FUCK OFF',
    'NO CARES', 'KILL URSELF', 'PREDATOR', 'STALKER', 'OPPRESSOR', 'DESTROYER',
    'EXPLOITER', 'DECEIVER', 'BETRAYER', 'COERCION', 'EXTORTION', 'SLANDER',
    'PERSECUTE', 'VICTIMIZE', 'DEHUMANIZE', 'OBJECTIFY', 'DISRESPECT', 'DEVASTATE',
    'ANNIHILATE', 'DEMOLISH', 'OBLITERATE', 'CORRUPT', 'DISGRACE', 'BRUTALIZE',
    'GO DIE', 'END IT', 'UR NOTHING', 'U DESERVE IT', 'DROP DEAD', 'HATE U'
  ];

  const SAFE_WORDS = [
    // Easy (short, positive words)
    'KIND', 'HELP', 'LOVE', 'CARE', 'HOPE', 'SAFE', 'HERO', 'GOOD', 'NICE', 'HUG',
    'WARN', 'CHEER', 'OKAY', 'CALM', 'NEAT', 'TEAM', 'PAL', 'GIFT', 'WISE', 'WARM',
    'FAIR', 'REAL', 'PALS', 'JOY', 'FUN', 'YOU ROCK', 'HUG U', 'SO KIND', 'GLAD',
    'GLOW', 'PURE', 'REST', 'BOND', 'PEEK', 'COZY', 'FREE', 'GRIN', 'WINK', 'KEEN',
    'SURE', 'STAR', 'GROW', 'SOUL', 'RAYS', 'HEAL', 'MINT', 'LUCK', 'RISE', 'BE YOU',
    'ITS OK', 'UR COOL', 'SO NICE', 'MY PAL',
    // Medium (supportive actions, phrases)
    'SMILE', 'PEACE', 'TRUST', 'SHARE', 'ALLY', 'UNITY', 'BRAVE', 'FRIEND', 'STRONG',
    'LISTEN', 'SHINE', 'HEART', 'LAUGH', 'PRAISE', 'EQUAL', 'TRUTH', 'VALUE', 'PROUD',
    'HONEST', 'GENTLE', 'SECURE', 'CANDID', 'LOVING', 'TENDER', 'GRACE', 'DECENT',
    'BELIEF', 'SHELTER', 'MORAL', 'PROPER', 'WORTHY', 'NOBLE', 'MILD', 'FOND', 'BRIGHT',
    'GUIDE', 'DEFEND', 'MEND', 'LOVE YOU', 'GOOD JOB', 'WELL DONE', 'I CARE', 'BE BRAVE',
    'KEEP GOING', 'SHINE ON', 'DREAM', 'BLESS', 'MERCY', 'LOYAL', 'SANE', 'STEADY',
    'ANCHOR', 'SERENE', 'ADORE', 'DEVOTE', 'BLOOM', 'THRIVE', 'EVOLVE', 'RELATE',
    'MENTOR', 'RESCUE', 'REVIVE', 'REFORM', 'ASSIST', 'UPLIFT',
    'IM HERE', 'GOT YOU', 'NO FEAR', 'HOLD ON', 'ALL GOOD',
    // Hard (deep empathy, longer phrases)
    'RESPECT', 'SUPPORT', 'EMPATHY', 'UPLIFT', 'INCLUDE', 'COURAGE', 'PROTECT',
    'KINDNESS', 'INSPIRE', 'WELCOME', 'ENCOURAGE', 'COMPASSION', 'GENEROUS', 'HARMONY',
    'POSITIVE', 'VALIDATE', 'ACCEPT', 'SYMPATHY', 'REASSURE', 'TOLERANCE', 'AFFECTION',
    'SOLIDARITY', 'NURTURE', 'GRATITUDE', 'RESILIENCE', 'APPRECIATE', 'ATTENTIVE',
    'THOUGHTFUL', 'FORGIVENESS', 'INTEGRITY', 'ADVOCATE', 'CHAMPION', 'EMPOWER',
    'FORTITUDE', 'COURTEOUS', 'STAY SAFE', 'U MATTER', 'STAY STRONG', 'YOU BELONG',
    'WE CARE', 'BENEVOLENT', 'ALTRUISTIC', 'DIGNIFIED', 'GRACIOUS', 'PRINCIPLED',
    'STEADFAST', 'AUTHENTIC', 'VISIONARY', 'COMMITTED', 'HONORABLE', 'SELFLESS',
    'LIBERATOR', 'PEACEMAKER', 'SANCTUARY', 'GUARDIAN', 'VOLUNTEER', 'HUMANIZE',
    'RECONCILE', 'CELEBRATE', 'ENLIGHTEN', 'SAFEGUARD', 'PERSEVERE', 'OVERCOME',
    'UR VALID', 'NOT ALONE', 'I BELIEVE U', 'SPEAK UP', 'UR ENOUGH', 'BE PROUD'
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

  // --- Level Configurations (6 levels) ---
  const LEVELS = [
    { level: 1, name: 'Sector 01', duration: 50,  spawnInterval: 2000, fallSpeed: 1.2, toxicRatio: 0.6,  wordsToComplete: 12 },
    { level: 2, name: 'Sector 02', duration: 55,  spawnInterval: 1700, fallSpeed: 1.6, toxicRatio: 0.55, wordsToComplete: 16 },
    { level: 3, name: 'Sector 03', duration: 60,  spawnInterval: 1400, fallSpeed: 2.0, toxicRatio: 0.5,  wordsToComplete: 20 },
    { level: 4, name: 'Sector 04', duration: 60,  spawnInterval: 1100, fallSpeed: 2.4, toxicRatio: 0.5,  wordsToComplete: 24 },
    { level: 5, name: 'Sector 05', duration: 65,  spawnInterval: 900,  fallSpeed: 2.8, toxicRatio: 0.45, wordsToComplete: 28 },
    { level: 6, name: 'Sector 06', duration: 70,  spawnInterval: 750,  fallSpeed: 3.2, toxicRatio: 0.4,  wordsToComplete: 32 },
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
    let windowSize = 20;
    let startIndex = (levelNum - 1) * 20;
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
