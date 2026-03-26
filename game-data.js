// ============================================================
// CYBER SHIELD: TOXIC RAIN — Game Data & State Management
// ============================================================

const GameData = (() => {
  // --- Word Banks ---
  const TOXIC_WORDS = [
    // Medium (stronger language, multi-word slurs)
    'STUPID🧠🚫', 'TRASH🗑️', 'LOSER👎', 'IDIOT🤪', 'FREAK👽', 'CREEP🕵️‍♂️', 'GROSS🤢', 'TOXIC☢️', 'BULLY🐂',
    'MORON', 'SHAME🫣', 'TROLL🧌', 'ABUSE👊', 'COWARD🐥', 'CRAZY🌀', 'NASTY', 'SICK🤢', 'SLIME🧪',
    'JERK✊', 'PIG🐷', 'AWFUL🤮', 'DIRTY💩', 'GARBAGE🚮', 'PITIFUL', 'MORBID💀', 'WEIRDO🛸', 'SNAKE🐍',
    'WIMP', 'BOGUS🚫', 'CHUMP', 'BULL', 'PUNK🎸', 'SNOOTY', 'CHEAP', 'DUMMY', 'FLOP👎',
    'CLOWN🤡', 'SPAM📧', 'HACK💻', 'SPITE💢', 'GRUB', 'BRUTE🦍', 'FIEND🧛', 'SNOOP', 'YOU SUCK🤮',
    'EAT SHIT💩', 'GET LOST🗺️', 'DIE NOW⚰️', 'SO DUMB', 'LOSER FR�', 'FAT ASS🍑', 'U TRASH🚮',
    'SCUMBAG', 'PSYCHO', 'SICKO🤮', 'DEVIANT🧬', 'HATER🤬', 'LEECH🦟', 'VERMIN🐀', 'PLAGUE🦠',
    'GREEDY💰', 'PETTY🤏', 'BITTER', 'SHADY🕶️', 'PHONY📵', 'SLEAZY🤮', 'SMUG', 'SAVAGE🦁',
    'MENACE🌩️', 'ROTTEN🍎', 'CURSED', 'WICKED🧹', 'SKANK', 'GHOUL👻', 'DEMON👿', 'STINK🦨',
    'NOBODY ASKED', 'SO FAKE🎭', 'UR DONE🏁', 'BACK OFF✋', 'STAY MAD😤', 'ATTENTION-SEEKER🤳',
    'BACKSTABBER🗡️', 'IRRITATING🦟', 'NONSENSE', 'DESPERATE🥺', 'HOPELESS🥀', 'SHAMELESS🦁',
    'SPINELESS🐛', 'BLOCKHEAD🧱', 'AIRHEAD🎈', 'BONEHEAD🦴', 'NINCOMPOOP🤡', 'HALF-WIT',
    'DEADWEIGHT⚓', 'BURDEN🎒', 'LIABILITY⚠️', 'POINTLESS', 'HOLLOW🕳️', 'GUTLESS',
    'WEAKLING🐜', 'DRAMATIC🎭', 'CHAOTIC🌪️', 'SELFISH🤳', 'IMMATURE🍭', 'CARELESS🏎️',
    'COPYCAT🐱', 'WANNABE', 'TRY-HARD🧗', 'SHOW-OFF🏎️', 'MISFIT🧩', 'UNWANTED🗑️', 'INVISIBLE',
    'IGNORANT🙈', 'SPOILED🍰', 'USELESS🔧🚫', 'TRIVIAL🤏', 'SHAMEFUL🫣',
    // Hard (extreme cyberbullying, longer phrases)
    'WORTHLESS', 'PATHETIC🥺', 'USELESS', 'DISGUST🤢', 'REJECT❌', 'FAILURE🚫', 'HARASS📞',
    'THREAT🚨', 'INSULT', 'ISOLATE⛓️', 'TORMENT🧨', 'INTIMIDATE👺', 'BLACKMAIL📧', 'MOCKERY🎭',
    'DESPAIR🌑', 'RUIN🏚️', 'HUMILIATE🫵', 'DEGRADE📉', 'EXPOSE📸', 'CANCEL🚫', 'SABOTAGE🧨',
    'MANIPULATE🧵', 'GASLIGHT', 'OSTRACIZE🧊', 'BELITTLE🤏', 'TERRORIZE😱', 'DOX', 'DEFAME📰',
    'VICIOUS🐺', 'MALICIOUS🦂', 'HOSTILE⚔️', 'ABUSIVE⚠️', 'VENOMOUS🐍', 'FUCK YOU🖕', 'FUCK OFF🖕',
    'NO CARES', 'KILL URSELF💀', 'PREDATOR🦈', 'STALKER👁️', 'OPPRESSOR⛓️', 'DESTROYER☄️',
    'EXPLOITER💰', 'DECEIVER👺', 'BETRAYER🗡️', 'COERCION', 'EXTORTION💰', 'SLANDER🗣️',
    'PERSECUTE🏹', 'VICTIMIZE🎯', 'DEHUMANIZE🤖', 'OBJECTIFY', 'DISRESPECT😤', 'DEVASTATE💥',
    'ANNIHILATE☄️', 'DEMOLISH🔨', 'OBLITERATE🧨', 'CORRUPT💵', 'DISGRACE🤦', 'BRUTALIZE👊',
    'GO DIE⚰️', 'END IT🏁', 'UR NOTHING', 'U DESERVE IT🫵', 'DROP DEAD⚰️', 'HATE U🖤',
    'DISGUSTING🤮', 'ILLITERATE', 'UNEDUCATED', 'INCOMPETENT📉', 'INEPT🐢',
    'GOOD-FOR-NOTHING🚮', 'MEANINGLESS', 'EMPTY-HEADED🎈', 'OVERSENSITIVE😭',
    'OVERREACTING🤯', 'DELUSIONAL😵‍💫', 'PARANOID👁️‍🗨️', 'UNSTABLE⚖️', 'PROBLEMATIC⚠️',
    'DISRUPTIVE📢', 'OBNOXIOUS🎺', 'ARROGANT👑', 'SELF-CENTERED🤳', 'NARCISSISTIC🪞',
    'IRRESPONSIBLE🎢', 'RECKLESS🏎️', 'UNRELIABLE', 'TWO-FACED🎭', 'CONTROLLING🎮',
    'DOMINATING🥊', 'FAKE FRIEND👥🚫', 'ATTENTION-HUNGRY🍽️', 'IRRELEVANT', 'OUTCAST🏝️',
    'REPLACEABLE♻️', 'FORGETTABLE🌫️', 'NO ONE CARES', 'NOT GOOD ENOUGH📉',
    'DOESNT MATTER', 'WASTE OF TIME⏳', 'WASTE OF SPACE🌌', 'CRIMINAL⛓️', 'DEPRAVED🌑'
  ];

  const SAFE_WORDS = [
    // Medium (supportive actions, phrases)
    'SMILE😊', 'PEACE☮️', 'TRUST🤝', 'SHARE', 'ALLY✊', 'UNITY🔗', 'BRAVE狮', 'FRIEND👫', 'STRONG💪',
    'LISTEN👂', 'SHINE✨', 'HEART❤️', 'LAUGH😂', 'PRAISE🙌', 'EQUAL⚖️', 'TRUTH📜', 'VALUE💎', 'PROUD🦚',
    'HONEST😇', 'GENTLE🦋', 'SECURE🔐', 'CANDID', 'LOVING🥰', 'TENDER🧸', 'GRACE', 'DECENT👍',
    'BELIEF🕯️', 'SHELTER🏠', 'MORAL🎖️', 'PROPER', 'WORTHY🏆', 'NOBLE👑', 'MILD☁️', 'FOND💓', 'BRIGHT💡',
    'GUIDE', 'DEFEND🛡️', 'MEND🧵', 'LOVE YOU💖', 'GOOD JOB👏', 'WELL DONE🌟', 'I CARE', 'BE BRAVE',
    'KEEP GOING🏁', 'SHINE ON✨', 'DREAM💭', 'BLESS✨', 'MERCY🕊️', 'LOYAL🐕', 'SANE🧠', 'STEADY⚓',
    'ANCHOR⚓', 'SERENE🌊', 'ADORE😍', 'DEVOTE🙏', 'BLOOM🌺', 'THRIVE🌿', 'EVOLVE🧬', 'RELATE🤝',
    'MENTOR🎓', 'RESCUE🚁', 'REVIVE⚡', 'REFORM🔨', 'ASSIST🆘', 'UPLIFT🎈',
    'IM HERE🫂', 'GOT YOU✊', 'NO FEAR🛡️', 'HOLD ON🤝', 'ALL GOOD👌',
    // Hard (deep empathy, longer phrases)
    'RESPECT🫡', 'SUPPORT🏗️', 'EMPATHY💖', 'UPLIFT🎈', 'INCLUDE🫂', 'COURAGE🦸', 'PROTECT🛡️',
    'KINDNESS🍬', 'INSPIRE💡', 'WELCOME🤝', 'ENCOURAGE📣', 'COMPASSION🫂', 'GENEROUS🎁', 'HARMONY🎶',
    'POSITIVE➕', 'VALIDATE✅', 'ACCEPT🫂', 'SYMPATHY🕊️', 'REASSURE😌', 'TOLERANCE🤝', 'AFFECTION🥰',
    'SOLIDARITY✊', 'NURTURE🌱', 'GRATITUDE 🙏', 'RESILIENCE💎', 'APPRECIATE💐', 'ATTENTIVE👂',
    'THOUGHTFUL🧠', 'FORGIVENESS🕊️', 'INTEGRITY📜', 'ADVOCATE📢', 'CHAMPION🏆', 'EMPOWER⚡',
    'FORTITUDE🏰', 'COURTEOUS🎩', 'STAY SAFE🛡️', 'U MATTER💖', 'STAY STRONG✊', 'YOU BELONG🫂',
    'WE CARE❤️', 'BENEVOLENT👼', 'ALTRUISTIC🎁', 'DIGNIFIED🎖️', 'GRACIOUS', 'PRINCIPLED📜',
    'STEADFAST⚓', 'AUTHENTIC💯', 'VISIONARY', 'COMMITTED💍', 'HONORABLE⚔️', 'SELFLESS🎁',
    'LIBERATOR🔓', 'PEACEMAKER🕊️', 'SANCTUARY🏰', 'GUARDIAN🛡️', 'VOLUNTEER🙋', 'HUMANIZE👨‍👩‍👧‍👦',
    'RECONCILE🤝', 'CELEBRATE🎉', 'ENLIGHTEN💡', 'SAFEGUARD🛡️', 'PERSEVERE🧗', 'OVERCOME🏔️',
    'UR VALID✅', 'NOT ALONE🫂', 'I BELIEVE U🤝', 'SPEAK UP📢', 'UR ENOUGH💖', 'BE PROUD🌈'
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

  // --- Level Configurations (4 levels) ---
  const LEVELS = [
    { level: 1, name: 'Sector 01', duration: 55,  spawnInterval: 1800, fallSpeed: 1.4, toxicRatio: 0.6,  wordsToComplete: 14 },
    { level: 2, name: 'Sector 02', duration: 60,  spawnInterval: 1400, fallSpeed: 1.8, toxicRatio: 0.55, wordsToComplete: 18 },
    { level: 3, name: 'Sector 03', duration: 65,  spawnInterval: 1100, fallSpeed: 2.4, toxicRatio: 0.5,  wordsToComplete: 24 },
    { level: 4, name: 'Sector 04', duration: 70,  spawnInterval: 850,  fallSpeed: 3.0, toxicRatio: 0.45, wordsToComplete: 30 },
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
    const totalLevels = LEVELS.length;
    const step = Math.floor(list.length / totalLevels);
    let windowSize = step + 5; // slight overlap for variety
    let startIndex = (levelNum - 1) * step;
    if (startIndex + windowSize > list.length) {
        windowSize = list.length - startIndex;
    }
    if (startIndex < 0) startIndex = 0;
    if (windowSize < 1) windowSize = 1;
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
