// ============================================================
// CYBER SHIELD: TOXIC RAIN — Game Data & State Management
// ============================================================

const GameData = (() => {
  // --- Word Banks ---
  const TOXIC_WORDS = [
  "बेवकूफ | Stupid",
  "मूर्ख | Idiot",
  "बेवकूफ | Fool",
  "मंदबुद्धि | Dumb",
  "कमजोर | Weak",
  "बेकार | Useless",
  "आलसी | Lazy",
  "बदसूरत | Ugly",
  "मोटा | Fat",
  "दुबला | Thin",
  "पागल | Psycho",
  "अजीब | Weird",
  "भद्दा | Clumsy",
  "कायर | Coward",
  "धोखेबाज़ | Cheat",
  "झूठा | Liar",
  "निकम्मा | Worthless",
  "बकवास | Nonsense",
  "मूर्ख | Dummy",
  "घटिया | Rotten",
  "कचरा | Trash",
  "कूड़ा | Garbage",
  "मसखरा | Joker",
  "जोकर | Clown",
  "सूअर | Pig",
  "गधा | Donkey",
  "बंदर | Monkey",
  "साँप | Snake",
  "चूहा | Rat",
  "कीड़ा | Worm",
  "कुत्ता | Dog",
  "भैंस | Buffalo",
  "निराशाजनक | Hopeless",
  "दयनीय | Pathetic",
  "शर्मनाक | Shameful",
  "गंदा | Dirty",
  "बदबूदार | Smelly",
  "विचित्र | Freakish",
  "बेकार | Hopeless",
  "अशिष्ट | Rude",
  "मूर्खतापूर्ण | Foolish",
  "मूर्ख | Silly",
  "पागल | Crazy",
  "पागल | Mad",
  "कायर | Coward",
  "बुद्धू | Dummy",
  "मंदबुद्धि | Blockhead",
  "बेकार | Useless",
  "निकम्मा | Worthless",
  "कचरा | Garbage",
  "घटिया | Trashy",
  "गंदा | Dirty",
  "बदबूदार | Smelly",
  "बदसूरत | Ugly",
  "घिनौना | Gross",
  "घृणित | Disgusting",
  "बिगड़ैल | Brat",
  "निराशाजनक | Hopeless",
  "दयनीय | Pathetic",
  "भद्दा | Clumsy",
  "अजीब | Awkward",
  "अशिष्ट | Rude",
  "कठोर | Harsh",
  "निर्दयी | Cruel",
  "निर्दयी | Heartless",
  "कटु | Bitter",
  "घमंडी | Arrogant",
  "मूर्ख | Idiot",
  "मंदबुद्धि | Moron",
  "बेवकूफ | Fool",
  "बुद्धू | Dimwit",
  "बेवकूफ | Dumb",
  "दिमागहीन | Brainless",
  "बुद्धिहीन | Witless",
  "घटिया | Rotten",
  "गंदा | Dirty",
  "बदबूदार | Smelly",
  "घिनौना | Gross",
  "भयानक | Awful",
  "भयानक | Horrible",
  "बदसूरत | Ugly",
  "कमजोर | Weak",
  "कायर | Coward",
  "असहाय | Helpless",
  "बेकार | Useless",
  "निकम्मा | Worthless",
  "निराशाजनक | Hopeless",
  "असफल | Failure",
  "मोटा | Fat",
  "मोटा-ताज़ा | Chunky",
  "गोल-मटोल | Chubby",
  "नाटा | Shorty",
  "जोकर | Clown",
  "मसखरा | Joker",
  "बिगड़ैल | Brat",
  "झुंझलाहट | Annoyance",
  "उपद्रवी | Troublemaker",
  "अत्याचारी | Tyrant",
  "दिमागहीन | Brain-dead",
  "मूर्ख | Bonehead",
  "जड़बुद्धि | Thickheaded",
  "बुद्धू | Nitwit",
  "बदसूरत | Ugly",
  "विचित्र | Freakish",
  "अजीब | Weird",
  "सनकी | Oddball",
  "बहिष्कृत | Outcast",
  "कमजोर | Weak",
  "रीढ़हीन | Spineless",
  "डरपोक | Timid",
  "डरपोक | Chicken",
  "कमजोर | Frail",
  "नाजुक | Fragile",
  "शक्तिहीन | Powerless",
  "निराशाजनक | Hopeless",
  "पराजित | Defeated",
  "बेवकूफ | Stupid",
  "मूर्खतापूर्ण | Foolish",
  "दिमागहीन | Mindless",
  "अज्ञानी | Ignorant"
];

  const SAFE_WORDS = [
  "दयालु | Kind",
  "सहायक | Helpful",
  "ईमानदार | Honest",
  "बहादुर | Brave",
  "विनम्र | Polite",
  "सम्मानजनक | Respectful",
  "मित्रवत | Friendly",
  "बुद्धिमान | Smart",
  "कोमल | Gentle",
  "खुश | Happy",
  "मजबूत | Strong",
  "वफादार | Loyal",
  "रचनात्मक | Creative",
  "शांत | Calm",
  "बुद्धिमान | Wise",
  "धैर्यवान | Patient",
  "प्रेमपूर्ण | Loving",
  "सहयोगी | Supportive",
  "आत्मविश्वासी | Confident",
  "ईमानदार | Honest",
  "आनंदित | Joyful",
  "जिम्मेदार | Responsible",
  "सच्चा | Sincere",
  "मददगार | Helpful",
  "बुद्धिमान | Intelligent",
  "सकारात्मक | Positive",
  "सम्मानपूर्ण | Respectful",
  "प्रेरित | Motivated",
  "समर्पित | Dedicated",
  "नेता | Leader",
  "विद्वान | Scholar",
  "मार्गदर्शक | Mentor",
  "नायक | Hero",
  "विजेता | Champion",
  "सच्चा | Honest",
  "महान | Noble",
  "विनम्र | Humble",
  "भरोसेमंद | Reliable",
  "विश्वसनीय | Trustworthy",
  "सुखद | Pleasant",
  "प्रसन्न | Cheerful",
  "प्यारा | Lovely",
  "सुंदर | Beautiful",
  "सुंदर | Handsome",
  "प्रतिभाशाली | Talented",
  "कुशल | Skilled",
  "मेहनती | Hardworking",
  "केंद्रित | Focused",
  "ईमानदार | Honest",
  "सहायक | Helpful",
  "सम्मानपूर्ण | Respectful",
  "उदार | Generous",
  "सच्चा | Sincere",
  "प्रसन्न | Cheerful",
  "सुखद | Pleasant",
  "आशावादी | Optimistic",
  "सहयोगी | Supportive",
  "बहादुर | Brave",
  "निडर | Fearless",
  "मजबूत | Strong",
  "ऊर्जावान | Energetic",
  "सक्रिय | Active",
  "प्रतिभाशाली | Talented",
  "कुशल | Skilled",
  "रचनात्मक | Creative",
  "नवाचारी | Innovative",
  "समर्पित | Dedicated",
  "योग्य | Worthy",
  "भरोसेमंद | Reliable",
  "विश्वसनीय | Trustworthy",
  "वफादार | Loyal",
  "निष्ठावान | Faithful",
  "सच्चा | Honest",
  "महान | Noble",
  "कोमल | Gentle",
  "विनम्र | Humble",
  "बुद्धिमान | Wise",
  "होशियार | Smart",
  "बुद्धिमान | Intelligent",
  "प्रतिभाशाली | Brilliant",
  "प्रतिभावान | Genius",
  "सतर्क | Alert",
  "विचारशील | Thoughtful",
  "प्रेमपूर्ण | Loving",
  "सकारात्मक | Positive",
  "प्रेरणादायक | Inspiring",
  "प्रेरक | Motivating",
  "मददगार | Helpful",
  "सहयोगी | Cooperative",
  "मित्रवत | Friendly",
  "स्नेही | Warm",
  "सहानुभूतिपूर्ण | Sympathetic",
  "सफल | Successful",
  "विजयी | Victorious",
  "नेता | Leader",
  "विजेता | Winner",
  "चैंपियन | Champion",
  "नायक | Hero",
  "मार्गदर्शक | Mentor",
  "विद्वान | Scholar",
  "विनम्र | Polite",
  "शिष्ट | Courteous",
  "सम्मानजनक | Respectful",
  "ईमानदार | Honest",
  "सत्यवादी | Truthful",
  "वफादार | Loyal",
  "भरोसेमंद | Reliable",
  "विश्वसनीय | Dependable",
  "जिम्मेदार | Responsible",
  "परिपक्व | Mature",
  "सहायक | Helpful",
  "प्रेमपूर्ण | Loving",
  "स्नेही | Affectionate",
  "कोमल | Gentle",
  "मधुरभाषी | Soft-spoken",
  "मित्रवत | Friendly",
  "प्रसन्न | Cheerful",
  "आनंदित | Joyful",
  "खुश | Happy",
  "प्रतिभाशाली | Brilliant"
];

  const CYBER_TIPS = [
    {
      title: "Block & Report",
      text: "If someone sends you hateful messages online, don't reply. <span class='text-on-surface font-semibold text-primary'>Block and report them</span> to keep your digital space secure.",
    },
    {
      title: "Defamation (BNS 356)",
      text: "Under <strong>Section 356 of Bharatiya Nyaya Sanhita (BNS)</strong>, making or publishing false statements to harm someone's reputation is a criminal offense.",
    },
    {
      title: "Save Evidence",
      text: "Take screenshots of abusive messages or comments before blocking the user. It serves as strong evidence when reporting cyberbullying.",
    },
    {
      title: "Report Cyber Crime",
      text: "You can report cyberbullying and online harassment anonymously to the National Cyber Crime Reporting Portal at <a href='https://cybercrime.gov.in' target='_blank' class='text-primary underline hover:text-white transition-colors font-bold'>cybercrime.gov.in</a>.",
    },
    {
      title: "Criminal Intimidation",
      text: "<strong>Section 351 of BNS</strong> covers criminal intimidation, including threats sent over the internet to cause alarm or harm.",
    },
    {
      title: "Think Before You Share",
      text: "Once something is posted online, it's hard to take back. Be mindful of sharing personal information that could be used for harassment.",
    },
    {
      title: "Stand Up for Others",
      text: "If you see someone being cyberbullied, don't join in. Offer them support and encourage them to report the abuse.",
    },
  ];

  // --- Level Configurations (4 levels) ---
  const LEVELS = [
    {
      level: 1,
      name: "Level 01",
      duration: 45,
      spawnInterval: 2200,
      fallSpeed: 1.0,
      toxicRatio: 0.65,
      wordsToComplete: 8,
    },
    {
      level: 2,
      name: "Level 02",
      duration: 50,
      spawnInterval: 1800,
      fallSpeed: 1.3,
      toxicRatio: 0.6,
      wordsToComplete: 12,
    },
    {
      level: 3,
      name: "Level 03",
      duration: 55,
      spawnInterval: 1500,
      fallSpeed: 1.6,
      toxicRatio: 0.55,
      wordsToComplete: 16,
    },
    {
      level: 4,
      name: "Level 04",
      duration: 60,
      spawnInterval: 1200,
      fallSpeed: 2.0,
      toxicRatio: 0.5,
      wordsToComplete: 20,
    },
  ];

  // --- Settings defaults ---
  const DEFAULT_SETTINGS = {
    soundEffects: true,
    music: true,
    musicVolume: 0.2,
    vibration: false,
    darkMode: true,
  };

  // --- localStorage helpers ---
  function getSettings() {
    try {
      const s = JSON.parse(localStorage.getItem("cyberShield_settings"));
      return s ? { ...DEFAULT_SETTINGS, ...s } : { ...DEFAULT_SETTINGS };
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }

  function saveSettings(settings) {
    localStorage.setItem("cyberShield_settings", JSON.stringify(settings));
  }

  function getHighScores() {
    try {
      return JSON.parse(localStorage.getItem("cyberShield_highscores")) || [];
    } catch {
      return [];
    }
  }

  function saveHighScore(entry) {
    const scores = getHighScores();
    scores.push(entry);
    scores.sort((a, b) => b.score - a.score);
    if (scores.length > 20) scores.length = 20;
    localStorage.setItem("cyberShield_highscores", JSON.stringify(scores));
    return scores;
  }

  function clearAllData() {
    localStorage.removeItem("cyberShield_settings");
    localStorage.removeItem("cyberShield_highscores");
  }

  function setGameState(state) {
    sessionStorage.setItem("cyberShield_gameState", JSON.stringify(state));
  }

  function getGameState() {
    try {
      return JSON.parse(sessionStorage.getItem("cyberShield_gameState")) || null;
    } catch {
      return null;
    }
  }

  function clearGameState() {
    sessionStorage.removeItem("cyberShield_gameState");
    sessionStorage.removeItem("cyberShield_musicTime");
  }

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

  function getRandomTip() {
    return CYBER_TIPS[Math.floor(Math.random() * CYBER_TIPS.length)];
  }

  return {
    TOXIC_WORDS,
    SAFE_WORDS,
    LEVELS,
    DEFAULT_SETTINGS,
    CYBER_TIPS,
    getSettings,
    saveSettings,
    getHighScores,
    saveHighScore,
    clearAllData,
    setGameState,
    getGameState,
    clearGameState,
    getRandomWord,
    getLevelConfig,
    calculateStars,
    getRandomTip,
  };
})();
