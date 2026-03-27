// ============================================================
// CYBER SHIELD: TOXIC RAIN — Game Data & State Management
// ============================================================

const GameData = (() => {
  // --- Word Banks ---
  const TOXIC_WORDS = [
    // --- Block 1 ---
    'STUPID🧠🚫', 'TRASH🗑️', 'LOSER👎', 'IDIOT🤪', 'FREAK👽', 'CREEP🕵️‍♂️', 'GROSS🤢', 'TOXIC☢️', 'BULLY🐂',
    'MORON🤡', 'SHAME🫣', 'TROLL🧌', 'ABUSE👊', 'COWARD🐥', 'CRAZY🌀', 'NASTY👹', 'SICK🤢', 'SLIME🧪',
    'JERK✊', 'PIG🐷', 'AWFUL🤮', 'DIRTY💩', 'GARBAGE🚮', 'PITIFUL😢', 'MORBID💀', 'WEIRDO🛸', 'SNAKE🐍',
    'WIMP🐛', 'BOGUS🚫', 'CHUMP🪵', 'BULL🐂', 'PUNK🎸', 'SNOOTY🤨', 'CHEAP💸', 'DUMMY🧵', 'FLOP👎',
    'CLOWN🤡', 'SPAM📧', 'HACK💻', 'SPITE💢', 'GRUB🪱', 'BRUTE🦍', 'FIEND🧛', 'SNOOP🔍',
    'YOU SUCK🤮', 'STAY AWAY🚫', 'GET LOST🗺️', 'DIE NOW⚰️', 'SO DUMB😵', 'U FAILED📉', 'U TRASH🚮',
    'SCUMBAG🪳', 'PSYCHO🔪', 'SICKO🤮', 'DEVIANT🧬', 'HATER🤬', 'LEECH🦟', 'VERMIN🐀', 'PLAGUE🦠',
    'GREEDY💰', 'PETTY🤏', 'BITTER🍋', 'SHADY🕶️', 'PHONY📵', 'SLEAZY🐍', 'SMUG🤨', 'SAVAGE🦁',
    // --- Block 2 ---
    'MENACE🌩️', 'ROTTEN🍎', 'CURSED🔮', 'WICKED🧹', 'SKANK🤮', 'GHOUL👻', 'DEMON👿', 'STINK🦨',
    'NOBODY ASKED🤫', 'SO FAKE🎭', 'UR DONE🏁', 'BACK OFF✋', 'STAY MAD😤', 'ATTENTION-SEEKER🤳',
    'BACKSTABBER🗡️', 'IRRITATING🦟', 'NONSENSE🧶', 'DESPERATE🥺', 'HOPELESS🥀', 'SHAMELESS🦁',
    'SPINELESS🐛', 'BLOCKHEAD🧱', 'AIRHEAD🎈', 'BONEHEAD🦴', 'NINCOMPOOP🤡', 'HALF-WIT🧠',
    'DEADWEIGHT⚓', 'BURDEN🎒', 'LIABILITY⚠️', 'POINTLESS🚫', 'HOLLOW🕳️', 'GUTLESS🐔',
    'WEAKLING🐜', 'DRAMATIC🎭', 'CHAOTIC🌪️', 'SELFISH🤳', 'IMMATURE🍭', 'CARELESS🏎️',
    'COPYCAT🐱', 'WANNABE🎭', 'TRY-HARD🧗', 'SHOW-OFF🎪', 'MISFIT🧩', 'UNWANTED🗑️', 'INVISIBLE👻',
    'IGNORANT🙈', 'SPOILED🍰', 'USELESS🔧🚫', 'TRIVIAL🤏', 'SHAMEFUL🫣',
    'HOSTILE⚔️', 'TOXIC VIBES☢️', 'CRINGE😬', 'FRAUD🎭', 'VULGAR🤮', 'OBSCENE🤢',
    'PREDATORY🦈', 'VENGEFUL🔥', 'SPITEFUL💢', 'HATEFUL🖤', 'DECEITFUL🐍',
    'CONNIVING🦊', 'SCHEMING🕸️', 'VINDICTIVE🗡️', 'RUTHLESS⚔️', 'SADISTIC😈',
    // --- Block 3 ---
    'WORTHLESS💎🚫', 'PATHETIC🥺', 'DISGUST🤢', 'REJECT❌', 'FAILURE🚫', 'HARASS📞',
    'THREAT🚨', 'INSULT🤐', 'ISOLATE⛓️', 'TORMENT🧨', 'INTIMIDATE👺', 'BLACKMAIL📧', 'MOCKERY🎭',
    'DESPAIR🌑', 'RUIN🏚️', 'HUMILIATE🫵', 'DEGRADE📉', 'EXPOSE📸', 'CANCEL🚫', 'SABOTAGE🧨',
    'MANIPULATE🧵', 'GASLIGHT🕯️', 'OSTRACIZE🧊', 'BELITTLE🤏', 'TERRORIZE😱', 'DOX📋', 'DEFAME📰',
    'VICIOUS🐺', 'MALICIOUS🦂', 'ABUSIVE⚠️', 'VENOMOUS🐍', 'NO CARES🤷', 'KILL URSELF💀',
    'PREDATOR🦈', 'STALKER👁️', 'OPPRESSOR⛓️', 'DESTROYER☄️',
    'EXPLOITER💰', 'DECEIVER👺', 'BETRAYER🗡️', 'COERCION🤝🚫', 'EXTORTION💰', 'SLANDER🗣️',
    'PERSECUTE🏹', 'VICTIMIZE🎯', 'DEHUMANIZE🤖', 'OBJECTIFY🏺', 'DISRESPECT😤', 'DEVASTATE💥',
    'ANNIHILATE☄️', 'DEMOLISH🔨', 'OBLITERATE🧨', 'CORRUPT💵', 'DISGRACE🤦', 'BRUTALIZE👊',
    'SCAPEGOAT🐐', 'VILIFY📰', 'DEMONIZE👿', 'MARGINALIZE🚧', 'SUPPRESS🤐', 'SILENCE🤫',
    'CONDEMN⚖️', 'EXCLUDE❌', 'DISCRIMINATE🚷', 'DEMEAN📉', 'DIMINISH📉', 'UNDERMINE💣',
    // --- Block 4 ---
    'GO DIE⚰️', 'END IT🏁', 'UR NOTHING💨', 'U DESERVE IT🫵', 'DROP DEAD⚰️', 'HATE U🖤',
    'DISGUSTING🤮', 'ILLITERATE📚🚫', 'UNEDUCATED🎓🚫', 'INCOMPETENT📉', 'INEPT🐢',
    'GOOD-FOR-NOTHING🚮', 'MEANINGLESS❔', 'EMPTY-HEADED🎈', 'OVERSENSITIVE😭',
    'OVERREACTING🤯', 'DELUSIONAL😵‍💫', 'PARANOID👁️‍🗨️', 'UNSTABLE⚖️', 'PROBLEMATIC⚠️',
    'DISRUPTIVE📢', 'OBNOXIOUS🎺', 'ARROGANT👑', 'SELF-CENTERED🤳', 'NARCISSISTIC🪞',
    'IRRESPONSIBLE🎢', 'RECKLESS🏎️', 'UNRELIABLE⏳', 'TWO-FACED🎭', 'CONTROLLING🎮',
    'DOMINATING🥊', 'FAKE FRIEND👥🚫', 'ATTENTION-HUNGRY🍽️', 'IRRELEVANT🗑️', 'OUTCAST🏝️',
    'REPLACEABLE♻️', 'FORGETTABLE🌫️', 'NO ONE CARES🤷', 'NOT GOOD ENOUGH📉',
    'DOESNT MATTER💨', 'WASTE OF TIME⏳', 'WASTE OF SPACE🌌', 'CRIMINAL⛓️', 'DEPRAVED🌑',
    'REPULSIVE🤮', 'ABHORRENT😡', 'VENOM🐍', 'TYRANT👑', 'AGGRESSOR⚔️',
    'OPPRESSIVE⛓️', 'DEGRADING📉', 'HUMILIATING🫵', 'REVOLTING🤢', 'LOATHSOME🪳',
    'DETESTABLE😡', 'REPUGNANT🤮', 'CONTEMPTIBLE👎', 'DEPLORABLE💀', 'INSUFFERABLE🤯',
    'TOXIC PERSON☢️', 'STAY AWAY🚫', 'U FAILED📉', 'UR WORST😤', 'NO CHANCE❌',
    'GIVE UP🏳️', 'GO HOME🏠', 'CRY MORE😭', 'SO PATHETIC🥺', 'TOTAL JOKE🤡',
    'PURE TRASH🗑️', 'BRAIN DEAD💀', 'SO CRINGE😬', 'ZERO VALUE🚫', 'COMPLETE FAILURE❌',
    // --- Block 5 (NEW) ---
    'LOWLIFE🪱', 'DIMWIT💡🚫', 'DIRTBAG🗑️', 'NUMBSKULL💀', 'IMBECILE🤪', 'BUFFOON🤡',
    'SLEAZEBALL🐀', 'SCOUNDREL🦹', 'MISCREANT👿', 'DEGENERATE📉', 'BOTTOM FEEDER🐟',
    'SLACKER😴', 'QUITTER🏳️', 'DROPOUT🎓🚫', 'SNITCH🐀', 'SELLOUT💵', 'LAPDOG🐕',
    'DOORMAT🚪', 'PUSHOVER🐑', 'SHEEP🐑', 'PARASITE🦠', 'FUNGUS🍄', 'ROACH🪳',
    'MAGGOT🪱', 'RODENT🐀', 'HYENA🦡', 'VULTURE🦅', 'JACKAL🐺', 'WEASEL🦫',
    'NO TALENT🎭🚫', 'TOTAL FRAUD🎪', 'EPIC FAIL📉', 'SO WEAK🦴', 'UR FAKE🎭',
    'NOBODY LIKES U👥🚫', 'GET REKT💀', 'STAY DOWN⬇️', 'U STINK🦨', 'SO BASIC📎',
    'BLAND🥱', 'DULL💤', 'BORING😴', 'TEDIOUS⏰', 'MEDIOCRE📊', 'AVERAGE📉',
    'SUBPAR👎', 'INFERIOR⬇️', 'SECOND-RATE🥈🚫', 'THIRD-RATE🥉🚫',
    // --- Block 6 (NEW) ---
    'TOXIC TRAIT☢️', 'RED FLAG🚩', 'WALKING L📉', 'TOTAL CLOWN🤡', 'MAIN VILLAIN😈',
    'VILLAIN ARC🦹', 'ZERO FRIENDS👥🚫', 'SO ANNOYING😤', 'UR CANCELLED🚫', 'BLOCKED🔒',
    'NO RIZZ💀', 'ABSOLUTE ZERO❄️', 'FULL OF IT💩', 'DEAD TO ME⚰️', 'NOT WANTED🗑️',
    'CORRUPTED💻', 'MALWARE🦠', 'VIRUS🧬', 'GLITCH⚡', 'ERROR❌', 'BUG🪲',
    'DEFECTIVE🔧', 'BROKEN💔', 'DAMAGED🔨', 'FLAWED💎🚫', 'TAINTED🧪',
    'POLLUTED🏭', 'CONTAMINATED☣️', 'INFECTED🤒', 'DISEASED🦠', 'POISONED☠️',
    'RANCID🤮', 'PUTRID🧟', 'FERAL🐺', 'BARBARIC⚔️', 'HEINOUS😡', 'ATROCIOUS💀',
    'NEFARIOUS👿', 'SINISTER🌑', 'DIABOLICAL😈', 'TREACHEROUS🗡️', 'VENGEANCE🔥',
    'MALEVOLENT👺', 'PERNICIOUS☠️', 'INSIDIOUS🕷️', 'DEVIOUS🦊', 'CROOKED🔀',
    // --- Block 7 (NEW) ---
    'TWISTED🌀', 'WARPED🔮', 'DERANGED🧠', 'UNHINGED⚡', 'MANIAC🤪', 'LUNATIC🌙',
    'PSYCHOPATH🔪', 'SOCIOPATH🧊', 'NIGHTMARE🌑', 'MONSTER👹', 'BEAST🐲',
    'GREMLIN👾', 'GOBLIN👺', 'OGRE👹', 'IMP😈', 'WITCH🧙', 'ZOMBIE🧟',
    'VAMPIRE🧛', 'PHANTOM👻', 'WRAITH💀', 'SPECTER👤', 'SHADOW🌑',
    'NO LIFE💀', 'GET BLOCKED🔒', 'UR TOXIC☢️', 'SO RUDE🖕', 'GROW UP👶',
    'SHUT IT🤐', 'BEAT IT🏃', 'STEP OFF🚶', 'WALK AWAY↩️', 'SCRAM🏃',
    'BYE LOSER👋', 'LATER HATER🤬', 'KICK ROCKS🪨', 'TAKE A HIKE🥾', 'POUND SAND🏖️',
    'EAT DUST💨', 'SEE YA NEVER👋', 'GOOD RIDDANCE🗑️', 'NOT MISSED💨', 'FORGOTTEN🌫️',
    // --- Block 8 (NEW) ---
    'TOXIC AF☢️', 'MEGA CRINGE😬', 'BIG YIKES😱', 'HARD PASS🚫', 'MAJOR L📉',
    'CAUGHT IN 4K📸', 'RATIO📉', 'CLOUT CHASER🏃', 'CLOWN MOVE🤡', 'FAKE NEWS📰',
    'CAP🧢', 'SUS🔍', 'SKETCHY🖊️', 'SHOOK😰', 'SALTY🧂', 'PRESSED😤',
    'TILTED😡', 'TRIGGERED💥', 'BUTTHURT😢', 'SNOWFLAKE❄️', 'KAREN👩', 'BOOMER👴',
    'TROLL FACE🧌', 'CYBER BULLY📱', 'ONLINE HATE💻', 'DIGITAL ABUSE📲',
    'SCREEN BULLY📱', 'NET TROLL🌐', 'HATE POST📝', 'TOXIC CHAT💬',
    'FLAME WAR🔥', 'HATE RAID⚔️', 'PILE ON📦', 'MOB ATTACK👥', 'GANG UP👊',
    'WITCH HUNT🧙', 'CANCEL MOB🚫', 'SHAME STORM🌩️', 'PUBLIC SHAMING📢', 'VIRAL HATE📱'
  ];

  const SAFE_WORDS = [
    // --- Block 1 ---
    'SMILE😊', 'PEACE☮️', 'TRUST🤝', 'SHARE🤲', 'ALLY✊', 'UNITY🔗', 'BRAVE🦁', 'FRIEND👫', 'STRONG💪',
    'LISTEN👂', 'SHINE✨', 'HEART❤️', 'LAUGH😂', 'PRAISE🙌', 'EQUAL⚖️', 'TRUTH📜', 'VALUE💎', 'PROUD🦚',
    'HONEST😇', 'GENTLE🦋', 'SECURE🔐', 'CANDID📸', 'LOVING🥰', 'TENDER🧸', 'GRACE🦢', 'DECENT👍',
    'BELIEF🕯️', 'SHELTER🏠', 'MORAL🎖️', 'PROPER🎩', 'WORTHY🏆', 'NOBLE👑', 'MILD☁️', 'FOND💓', 'BRIGHT💡',
    'GUIDE🗺️', 'DEFEND🛡️', 'MEND🧵', 'LOVE YOU💖', 'GOOD JOB👏', 'WELL DONE🌟', 'I CARE🫂', 'BE BRAVE💪',
    'KEEP GOING🏁', 'SHINE ON✨', 'DREAM💭', 'BLESS✨', 'MERCY🕊️', 'LOYAL🐕', 'SANE🧠', 'STEADY⚓',
    'ANCHOR⚓', 'SERENE🌊', 'ADORE😍', 'DEVOTE🙏', 'BLOOM🌺', 'THRIVE🌿', 'EVOLVE🧬', 'RELATE🤝',
    'MENTOR🎓', 'RESCUE🚁', 'REVIVE⚡', 'REFORM🔨', 'ASSIST🆘', 'UPLIFT🎈',
    'IM HERE🫂', 'GOT YOU✊', 'NO FEAR🛡️', 'HOLD ON🤝', 'ALL GOOD👌',
    'CONNECT🔗', 'CHERISH💎', 'PROSPER📈', 'ADMIRE🌟', 'COMFORT🛋️',
    'TREASURE🏆', 'EMBOLDEN💪', 'ELEVATE🚀', 'SUSTAIN🌱', 'REFRESH🌊',
    // --- Block 2 ---
    'RESPECT🫡', 'SUPPORT🏗️', 'EMPATHY💖', 'INCLUDE🫂', 'COURAGE🦸', 'PROTECT🛡️',
    'KINDNESS🍬', 'INSPIRE💡', 'WELCOME🤝', 'ENCOURAGE📣', 'COMPASSION🫂', 'GENEROUS🎁', 'HARMONY🎶',
    'POSITIVE➕', 'VALIDATE✅', 'ACCEPT🫶', 'SYMPATHY🕊️', 'REASSURE😌', 'TOLERANCE🤝', 'AFFECTION🥰',
    'SOLIDARITY✊', 'NURTURE🌱', 'GRATITUDE🙏', 'RESILIENCE💎', 'APPRECIATE💐', 'ATTENTIVE👂',
    'THOUGHTFUL🧠', 'FORGIVENESS🕊️', 'INTEGRITY📜', 'ADVOCATE📢', 'CHAMPION🏆', 'EMPOWER⚡',
    'FORTITUDE🏰', 'COURTEOUS🎩', 'STAY SAFE🛡️', 'U MATTER💖', 'STAY STRONG✊', 'YOU BELONG🫂',
    'WE CARE❤️', 'BENEVOLENT👼', 'ALTRUISTIC🎁', 'DIGNIFIED🎖️', 'GRACIOUS🦢', 'PRINCIPLED📜',
    'STEADFAST⚓', 'AUTHENTIC💯', 'VISIONARY🔭', 'COMMITTED💍', 'HONORABLE⚔️', 'SELFLESS🎁',
    'LIBERATOR🔓', 'PEACEMAKER🕊️', 'SANCTUARY🏰', 'GUARDIAN🛡️', 'VOLUNTEER🙋', 'HUMANIZE👨‍👩‍👧‍👦',
    'RECONCILE🤝', 'CELEBRATE🎉', 'ENLIGHTEN💡', 'SAFEGUARD🛡️', 'PERSEVERE🧗', 'OVERCOME🏔️',
    'UR VALID✅', 'NOT ALONE🫂', 'I BELIEVE U🤝', 'SPEAK UP📢', 'UR ENOUGH💖', 'BE PROUD🌈',
    'DIGNIFY🎖️', 'LIBERATE🔓', 'TRANSFORM🦋', 'FLOURISH🌸', 'RADIATE☀️', 'PREVAIL🏆',
    // --- Block 3 ---
    'BELONG🏠', 'UPLIFT🎈', 'UNITED✊', 'THANKFUL🙏', 'GRATEFUL💐', 'FAITHFUL💍',
    'RELIABLE⚓', 'TRUTHFUL📜', 'HOPEFUL🌅', 'PEACEFUL☮️', 'CHEERFUL🎉', 'MINDFUL🧘',
    'GRACEFUL🦢', 'WONDERFUL🌟', 'BEAUTIFUL🌺', 'POWERFUL💪', 'MEANINGFUL💎', 'PURPOSEFUL🎯',
    'RESPECTFUL🫡', 'RESOURCEFUL🧰', 'SUCCESSFUL🏆', 'DETERMINED🎯', 'MOTIVATED🔥',
    'FEARLESS🦁', 'DAUNTLESS⚔️', 'RELENTLESS🏃', 'BOUNDLESS🌌', 'LIMITLESS♾️',
    'YOU GOT THIS💪', 'KEEP SMILING😊', 'STAND TALL🧍', 'BE KIND🌸', 'LOVE WINS❤️',
    'STAY TRUE💯', 'RISE ABOVE🌅', 'DREAM BIG🚀', 'NEVER QUIT🏁', 'STAY GOLD⭐',
    'UR AMAZING🌟', 'SO BRAVE🦁', 'TRUE HERO🦸', 'REAL ONE💯', 'GOOD HEART❤️',
    // --- Block 4 (NEW) ---
    'GENEROUS SOUL🎁', 'WARM HEART🫀', 'OPEN MIND🧠', 'FREE SPIRIT🦅', 'OLD SOUL✨',
    'BRIGHT FUTURE🌅', 'FRESH START🌱', 'NEW DAY☀️', 'CLEAN SLATE📋', 'SECOND CHANCE🔄',
    'SAFE SPACE🏠', 'SOFT LANDING🛬', 'GENTLE TOUCH🤲', 'WARM SMILE😊', 'BIG HUG🤗',
    'DEEP BREATH🌬️', 'CALM MIND🧘', 'INNER PEACE☮️', 'GOOD VIBES✌️', 'PURE JOY🎉',
    'GOLDEN RULE📜', 'SILVER LINING🌤️', 'LIGHT AT END🔦', 'HOPE AHEAD🌅', 'BETTER DAYS📅',
    'HAPPY TEARS😂', 'VICTORY LAP🏆', 'SWEET WIN🏅', 'WELL EARNED🎖️', 'PROUD MOMENT🎊',
    'FOSTER🫂', 'NOURISH🍎', 'CULTIVATE🌻', 'HARVEST🌾', 'PLANT SEEDS🌱',
    'WATER ROOTS💧', 'GROW STRONG🌳', 'STAND FIRM🧱', 'HOLD STEADY⚓', 'STAY ROOTED🌿',
    'CHARITY🎗️', 'DONATE🤲', 'GIVE BACK🔄', 'PAY FORWARD⏩', 'SERVE OTHERS🤝',
    // --- Block 5 (NEW) ---
    'STRIVE💫', 'ASPIRE🚀', 'ACHIEVE🏆', 'CONQUER🏔️', 'ENDURE💎',
    'WITHSTAND🛡️', 'ADAPT🧬', 'ADJUST🔧', 'EMBRACE🤗', 'ACCEPT SELF🫶',
    'LOVE SELF❤️', 'HEAL SELF🩹', 'KNOW SELF🧠', 'GROW SELF🌱', 'FREE SELF🔓',
    'FIND JOY🎈', 'SEEK PEACE☮️', 'CHOOSE LOVE❤️', 'SHARE LIGHT💡', 'SPREAD LOVE💞',
    'BUILD UP🏗️', 'LIFT HIGH🎈', 'REACH OUT🤲', 'LEAN IN🤝', 'TEAM UP👥',
    'BAND TOGETHER🔗', 'LINK ARMS💪', 'JOIN HANDS🤝', 'WALK WITH🚶', 'STAND WITH✊',
    'SIDE BY SIDE👫', 'HAND IN HAND🤝', 'BACK TO BACK🔙', 'ARM IN ARM💪', 'HEART TO HEART❤️',
    'PATIENT🧘', 'DILIGENT📚', 'HUMBLE🙏', 'MODEST🌿', 'VIRTUOUS🌟',
    'RIGHTEOUS⚖️', 'JUST⚔️', 'FAIR PLAY🤝', 'GOOD SPORT🏅', 'TEAM PLAYER👥',
    // --- Block 6 (NEW) ---
    'DIGITAL HERO🦸', 'CYBER GUARD🛡️', 'NET SAFE🔐', 'ONLINE ALLY✊', 'WEB FRIEND🌐',
    'SAFE ONLINE🔒', 'REPORT HATE📢', 'BLOCK HATE🚫', 'STOP HATE✋', 'END HATE❌',
    'CHOOSE PEACE☮️', 'SPREAD JOY🎉', 'SHARE HOPE🌅', 'GIVE LOVE❤️', 'SHOW CARE🫂',
    'BE THERE🤝', 'REACH HIGH🚀', 'AIM HIGH🎯', 'THINK BIG💭', 'WORK HARD💪',
    'PLAY FAIR🤝', 'STAY CALM🧘', 'KEEP FAITH🙏', 'TRUST MORE🤝', 'LOVE MORE❤️',
    'CARE MORE🫂', 'GIVE MORE🎁', 'DO GOOD✨', 'BE GOOD👍', 'STAY GOOD🌟',
    'BRIGHT MIND💡', 'KIND SOUL🌸', 'BRAVE ONE🦁', 'WISE OWL🦉', 'WARM LIGHT☀️',
    'CLEAR SKY🌤️', 'CALM WATERS🌊', 'GREEN EARTH🌍', 'BLUE SKY💙', 'RAINBOW🌈',
    'SUNRISE🌅', 'STARLIGHT⭐', 'MOONLIGHT🌙', 'FIREFLY✨', 'NORTHERN LIGHTS🌌'
  ];

  const CYBER_TIPS = [
    { title: "Block & Report", text: "If someone sends you hateful messages online, don't reply. <span class='text-on-surface font-semibold text-primary'>Block and report them</span> to keep your digital space secure." },
    { title: "Defamation (BNS 356)", text: "Under <strong>Section 356 of Bharatiya Nyaya Sanhita (BNS)</strong>, making or publishing false statements to harm someone's reputation is a criminal offense." },
    { title: "Save Evidence", text: "Take screenshots of abusive messages or comments before blocking the user. It serves as strong evidence when reporting cyberbullying." },
    { title: "Report Cyber Crime", text: "You can report cyberbullying and online harassment anonymously to the National Cyber Crime Reporting Portal at <a href='https://cybercrime.gov.in' target='_blank' class='text-primary underline hover:text-white transition-colors font-bold'>cybercrime.gov.in</a>." },
    { title: "Criminal Intimidation", text: "<strong>Section 351 of BNS</strong> covers criminal intimidation, including threats sent over the internet to cause alarm or harm." },
    { title: "Think Before You Share", text: "Once something is posted online, it's hard to take back. Be mindful of sharing personal information that could be used for harassment." },
    { title: "Stand Up for Others", text: "If you see someone being cyberbullied, don't join in. Offer them support and encourage them to report the abuse." }
  ];

  // --- Level Configurations (4 levels) ---
  const LEVELS = [
    { level: 1, name: 'Level 01', duration: 55,  spawnInterval: 1800, fallSpeed: 1.4, toxicRatio: 0.6,  wordsToComplete: 14 },
    { level: 2, name: 'Level 02', duration: 60,  spawnInterval: 1400, fallSpeed: 1.8, toxicRatio: 0.55, wordsToComplete: 18 },
    { level: 3, name: 'Level 03', duration: 65,  spawnInterval: 1100, fallSpeed: 2.4, toxicRatio: 0.5,  wordsToComplete: 24 },
    { level: 4, name: 'Level 04', duration: 70,  spawnInterval: 850,  fallSpeed: 3.0, toxicRatio: 0.45, wordsToComplete: 30 },
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
