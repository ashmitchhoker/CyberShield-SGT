(() => {
  // --- DOM refs ---
  const playground = document.getElementById("playground");
  const cyberAlertBar = document.getElementById("cyber-alert-bar");
  const cyberAlertText = document.getElementById("cyber-alert-text");
  const timerDisplay = document.getElementById("timer-display");
  const livesDisplay = document.getElementById("lives-display");
  const shieldStatus = document.getElementById("shield-status");
  const levelLabel = document.getElementById("level-label");
  const pauseBtn = document.getElementById("pause-btn");
  const shieldBarrier = document.getElementById("shield-barrier");
  const progressCounter = document.getElementById("progress-counter");
  const introOverlay = document.getElementById("intro-overlay");
  const startGameBtn = document.getElementById("start-game-btn");
  const hud = document.getElementById("hud");

  // --- Parse level from URL ---
  const params = new URLSearchParams(window.location.search);
  const levelNum = parseInt(params.get("level")) || 1;
  const config = GameData.getLevelConfig(levelNum);

  // --- Game State ---
  let score = 0;
  let lives = 5;
  let maxLives = 5;
  let combo = 0;
  let timeLeft = config.duration;
  let wordsZapped = 0;
  let totalToxicSpawned = 0;
  let totalWordsSpawned = 0;
  let correctZaps = 0;
  let wrongZaps = 0;
  let isPaused = false;
  let isGameOver = false;
  let activeWords = [];
  let spawnTimer = null;
  let gameLoop = null;
  let countdownTimer = null;
  let wordIdCounter = 0;

  // --- Game Audio ---
  let bgMusic = null;
  const settings = GameData.getSettings();

  function initMusic() {
    if (settings.music) {
      bgMusic = new Audio("music.mp3");
      bgMusic.loop = true;
      bgMusic.volume =
        settings.musicVolume !== undefined ? settings.musicVolume : 0.2;
      const savedTime = sessionStorage.getItem("cyberShield_musicTime");
      if (savedTime) {
        bgMusic.currentTime = parseFloat(savedTime);
      }
      bgMusic.play().catch((e) => console.log("Audio play blocked", e));
    }
  }

  function saveMusicState() {
    if (bgMusic) {
      sessionStorage.setItem("cyberShield_musicTime", bgMusic.currentTime);
    }
  }

  // --- Init ---
  levelLabel.textContent = `${config.name} / 0${GameData.LEVELS.length}`;
  updateLivesDisplay();
  updateTimer();
  updateProgress();

  // Set intro target count
  const introTarget = document.getElementById("intro-target");
  if (introTarget) introTarget.textContent = config.wordsToComplete;

  // --- Lives Display ---
  function updateLivesDisplay() {
    livesDisplay.innerHTML = "";
    for (let i = 0; i < maxLives; i++) {
      const span = document.createElement("span");
      span.className = "material-symbols-outlined text-xl";
      if (i < lives) {
        span.className +=
          " text-primary drop-shadow-[0_0_10px_rgba(168,232,255,0.8)]";
        span.style.fontVariationSettings = "'FILL' 1";
      } else {
        span.className += " text-outline/20";
      }
      span.textContent = "shield";
      livesDisplay.appendChild(span);
    }
    if (lives <= 1) {
      shieldStatus.textContent = "Shield Status: CRITICAL";
      shieldStatus.className =
        "text-[10px] font-headline font-bold text-error/80 tracking-widest uppercase";
    } else if (lives <= 2) {
      shieldStatus.textContent = "Shield Status: Damaged";
      shieldStatus.className =
        "text-[10px] font-headline font-bold text-amber-400/80 tracking-widest uppercase";
    } else {
      shieldStatus.textContent = "Shield Status: Optimized";
      shieldStatus.className =
        "text-[10px] font-headline font-bold text-primary/60 tracking-widest uppercase";
    }
  }

  // --- Score & Progress ---
  function updateScore() {
    /* score tracked internally for results screen */
  }
  function updateProgress() {
    const left = Math.max(0, config.wordsToComplete - wordsZapped);
    progressCounter.textContent = `${wordsZapped} / ${config.wordsToComplete} ZAPPED`;
  }

  // --- Cyberbullying Alert Flash ---
  const CYBER_MESSAGES = [
    "🚨 CYBERBULLYING DETECTED 🚨",
    "⛔ REPORT ONLINE HATE ⛔",
    "🔴 STAND AGAINST BULLYING 🔴",
    "⚠️ HATE SPEECH = CRIME ⚠️",
    "🚫 BLOCK & REPORT ABUSE 🚫",
    "💔 WORDS CAN HURT 💔",
    "🛑 SAY NO TO TOXICITY 🛑",
    "📢 SPEAK UP AGAINST HATE 📢",
  ];
  let alertTimeout = null;

  function flashCyberAlert() {
    const msg =
      CYBER_MESSAGES[Math.floor(Math.random() * CYBER_MESSAGES.length)];
    cyberAlertText.textContent = msg;

    // Flash red glow with scale animation
    const bar = cyberAlertBar.querySelector("div");
    bar.style.borderColor = "rgba(255, 50, 50, 0.9)";
    bar.style.boxShadow =
      "0 0 35px rgba(255, 50, 50, 0.7), 0 0 60px rgba(255, 50, 50, 0.3), inset 0 0 20px rgba(255, 50, 50, 0.15)";
    bar.style.background =
      "linear-gradient(135deg, rgba(255,50,50,0.15) 0%, rgba(200,0,0,0.1) 50%, rgba(255,50,50,0.15) 100%)";
    cyberAlertBar.style.filter = "drop-shadow(0 0 20px rgba(255, 50, 50, 0.5))";
    cyberAlertText.style.color = "#ff3333";
    cyberAlertText.style.textShadow =
      "0 0 12px rgba(255,50,50,0.8), 0 0 35px rgba(255,50,50,0.4)";

    // CSS scale bounce
    cyberAlertBar.classList.remove("cyber-flash");
    void cyberAlertBar.offsetWidth;
    cyberAlertBar.classList.add("cyber-flash");

    if (alertTimeout) clearTimeout(alertTimeout);
    alertTimeout = setTimeout(() => {
      bar.style.borderColor = "rgba(0,212,255,0.4)";
      bar.style.boxShadow =
        "0 0 20px rgba(0,212,255,0.15), inset 0 0 20px rgba(0,212,255,0.05)";
      bar.style.background =
        "linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(120,0,255,0.06) 50%, rgba(0,212,255,0.1) 100%)";
      cyberAlertBar.style.filter =
        "drop-shadow(0 0 12px rgba(0, 212, 255, 0.3))";
      cyberAlertText.textContent = "\u26a1 SAY NO TO CYBERBULLYING \u26a1";
      cyberAlertText.style.color = "#00d4ff";
      cyberAlertText.style.textShadow =
        "0 0 10px rgba(0,212,255,0.6), 0 0 30px rgba(0,212,255,0.2)";
    }, 1800);
  }

  // --- Timer ---
  function updateTimer() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timerDisplay.textContent = `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  // --- Spawn Word ---
  function spawnWord() {
    if (isPaused || isGameOver) return;

    const isToxic = Math.random() < config.toxicRatio;
    const word = GameData.getRandomWord(isToxic, levelNum);
    if (isToxic) totalToxicSpawned++;
    totalWordsSpawned++;

    const id = wordIdCounter++;
    const xPos = 15 + Math.random() * 70; // 15% to 85% from left (centered via CSS)

    const capsule = document.createElement("div");
    capsule.className = "word-capsule";
    capsule.dataset.id = id;
    capsule.dataset.toxic = isToxic;
    capsule.style.left = xPos + "%";
    capsule.style.top = "-60px";

    const borderClass = "neon-border-cyan";

    capsule.innerHTML = `
            <div class="capsule-glass ${borderClass} w-[6.5rem] h-[6.5rem] sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center shadow-2xl backdrop-blur-md transition-all p-3">
                <span class="font-headline font-bold text-on-surface uppercase tracking-wide text-sm sm:text-base drop-shadow-lg text-center leading-snug hover:scale-105 transition-transform cursor-pointer break-words hyphens-auto w-full px-1" style="word-break: break-word;">${word}</span>
            </div>
        `;

    capsule.addEventListener("click", () => handleTap(id));
    capsule.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        handleTap(id);
      },
      { passive: false },
    );

    playground.appendChild(capsule);
    activeWords.push({
      id,
      element: capsule,
      isToxic,
      y: -60,
      speed: config.fallSpeed,
    });
  }

  // --- Handle Tap ---
  function handleTap(wordId) {
    if (isPaused || isGameOver) return;
    const idx = activeWords.findIndex((w) => w.id === wordId);
    if (idx === -1) return;

    const wordObj = activeWords[idx];
    const el = wordObj.element;

    if (wordObj.isToxic) {
      // Correct zap!
      correctZaps++;
      combo++;
      const multiplier = Math.min(combo, 5);
      const points = 10 * multiplier;
      score += points;
      wordsZapped++;
      updateProgress();

      // Show popup & flash cyberbullying bar
      showScorePopup(el, `BULLY WORD!`, "#3cd7ff");
      flashCyberAlert();

      // Zap animation
      el.querySelector(".capsule-glass").classList.add("zap-effect");
      el.style.pointerEvents = "none";
      setTimeout(() => {
        el.remove();
      }, 400);
    } else {
      // Wrong! Tapped a safe word
      wrongZaps++;
      combo = 0;
      lives--;
      updateLivesDisplay();

      showScorePopup(
        el,
        `SAFE WORD!<br><span style="font-size: 0.9rem">-1 ❤️</span>`,
        "#ffb4ab",
      );

      // Shake effect
      el.querySelector(".capsule-glass").style.border = "2px solid #ff4444";
      playground.classList.add("shake");
      setTimeout(() => playground.classList.remove("shake"), 300);

      el.style.pointerEvents = "none";
      setTimeout(() => {
        el.remove();
      }, 300);

      if (lives <= 0) {
        gameOver();
        return;
      }
    }

    activeWords.splice(idx, 1);
    updateScore();
    updateProgress();

    // Check level complete
    if (wordsZapped >= config.wordsToComplete) {
      levelComplete();
    }
  }

  // --- Score Popup ---
  function showScorePopup(el, text, color) {
    const popup = document.createElement("div");
    popup.className = "score-popup pointer-events-none text-center";
    popup.style.cssText = `
            position: absolute; left: ${el.style.left}; top: ${parseInt(el.style.top) - 30}px;
            font-family: 'Space Grotesk'; font-weight: 900; font-size: 1.2rem; line-height: 1.1;
            color: ${color}; z-index: 100; text-shadow: 0 0 10px ${color};
        `;
    popup.innerHTML = text;
    playground.appendChild(popup);
    setTimeout(() => popup.remove(), 600);
  }

  // --- Game Loop (move words down) ---
  function tick() {
    if (isPaused || isGameOver) return;

    const playgroundHeight = playground.offsetHeight;
    const shieldY = playgroundHeight - 10; // shield barrier visual hit mark

    for (let i = activeWords.length - 1; i >= 0; i--) {
      const w = activeWords[i];
      w.y += w.speed;
      w.element.style.top = w.y + "px";

      // Word reached shield barrier
      if (w.y >= shieldY) {
        if (w.isToxic) {
          // Toxic word got through — lose a life
          lives--;
          updateLivesDisplay();
          combo = 0;

          shieldBarrier.classList.add("shield-hit");
          setTimeout(() => shieldBarrier.classList.remove("shield-hit"), 400);

          if (lives <= 0) {
            w.element.remove();
            activeWords.splice(i, 1);
            gameOver();
            return;
          }
        }
        // Remove the word (safe words pass through harmlessly)
        w.element.remove();
        activeWords.splice(i, 1);
      }
    }
  }

  // --- Countdown ---
  function startCountdown() {
    countdownTimer = setInterval(() => {
      if (isPaused || isGameOver) return;
      timeLeft--;
      updateTimer();
      if (timeLeft <= 0) {
        // Time's up — if enough words zapped, level complete, else game over
        if (wordsZapped >= config.wordsToComplete) {
          levelComplete();
        } else {
          gameOver();
        }
      }
    }, 1000);
  }

  // --- Pause ---
  pauseBtn.addEventListener("click", () => {
    isPaused = true;
    saveMusicState();
    // Save state and go to pause menu
    GameData.setGameState({
      level: levelNum,
      score,
      lives,
      timeLeft,
      wordsZapped,
      totalToxicSpawned,
      correctZaps,
      wrongZaps,
      combo,
    });
    window.location.href = "pausemenu.html";
  });

  // --- Resume from pause ---
  function tryResume() {
    const state = GameData.getGameState();
    if (state && state.level === levelNum && params.get("resume") === "1") {
      score = state.score || 0;
      lives = state.lives || 5;
      timeLeft = state.timeLeft || config.duration;
      wordsZapped = state.wordsZapped || 0;
      totalToxicSpawned = state.totalToxicSpawned || 0;
      correctZaps = state.correctZaps || 0;
      wrongZaps = state.wrongZaps || 0;
      combo = state.combo || 0;
      updateLivesDisplay();
      updateScore();
      updateTimer();
      GameData.clearGameState();
    }
  }

  // --- Level Complete ---
  function levelComplete() {
    isGameOver = true;
    clearInterval(countdownTimer);
    clearInterval(spawnTimer);
    cancelAnimationFrame(gameLoop);

    const totalAttempts = correctZaps + wrongZaps;
    const accuracy =
      totalAttempts > 0 ? Math.round((correctZaps / totalAttempts) * 100) : 0;
    const stars = GameData.calculateStars(accuracy);
    const timePlayed = config.duration - timeLeft;

    GameData.setGameState({
      level: levelNum,
      score,
      wordsZapped,
      totalToxicSpawned,
      accuracy,
      stars,
      combo,
      timePlayed,
    });

    GameData.saveHighScore({
      score,
      level: levelNum,
      stars,
      accuracy,
      date: new Date().toISOString().slice(0, 10),
      timePlayed,
    });

    setTimeout(() => {
      saveMusicState();
      window.location.href = "levelcomplete.html";
    }, 500);
  }

  // --- Game Over ---
  function gameOver() {
    isGameOver = true;
    clearInterval(countdownTimer);
    clearInterval(spawnTimer);
    cancelAnimationFrame(gameLoop);

    const totalAttempts = correctZaps + wrongZaps;
    const accuracy =
      totalAttempts > 0 ? Math.round((correctZaps / totalAttempts) * 100) : 0;
    const timePlayed = config.duration - timeLeft;

    GameData.setGameState({
      level: levelNum,
      score,
      wordsZapped,
      totalToxicSpawned,
      accuracy,
      timePlayed,
    });

    GameData.saveHighScore({
      score,
      level: levelNum,
      stars: GameData.calculateStars(accuracy),
      accuracy,
      date: new Date().toISOString().slice(0, 10),
      timePlayed,
    });

    setTimeout(() => {
      saveMusicState();
      window.location.href = "gameover.html";
    }, 800);
  }

  // --- Animation Frame Loop ---
  function animationLoop() {
    if (!isGameOver) {
      tick();
      gameLoop = requestAnimationFrame(animationLoop);
    }
  }

  // --- Start Game ---
  function startGame() {
    tryResume();
    updateProgress();
    spawnTimer = setInterval(spawnWord, config.spawnInterval);
    startCountdown();
    animationLoop();
    // Spawn first word immediately
    setTimeout(spawnWord, 300);
  }

  // --- Intro Logic ---
  const isResuming = params.get("resume") === "1";

  // Wait for fonts to be ready before starting or showing the UI un-styled
  document.fonts.ready.then(() => {
    if (isResuming) {
      // Skip intro on resume
      introOverlay.style.display = "none";
      hud.style.display = "";
      initMusic();
      startGame();
    } else {
      startGameBtn.addEventListener("click", () => {
        introOverlay.style.display = "none";
        hud.style.display = "";
        initMusic();
        startGame();
      });
    }
  });
})();
