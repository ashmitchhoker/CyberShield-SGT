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
  let lastRenderedLives = -1;
  let lastFrameTime = 0;

  // --- Object Pool (Caching for Performance) ---
  const POOL_SIZE = 15;
  const capsulePool = [];

  // --- Cached layout values (avoid per-frame reflow) ---
  let cachedPlaygroundHeight = 0;
  function updatePlaygroundHeight() {
    cachedPlaygroundHeight = playground.offsetHeight;
  }
  window.addEventListener("resize", updatePlaygroundHeight);

  // --- Score Popup Pool ---
  const POPUP_POOL_SIZE = 6;
  const popupPool = [];
  function initPopupPool() {
    for (let i = 0; i < POPUP_POOL_SIZE; i++) {
      const popup = document.createElement("div");
      popup.className = "score-popup pointer-events-none text-center w-[150px]";
      popup.style.position = "absolute";
      popup.style.fontFamily = "'Space Grotesk'";
      popup.style.fontWeight = "900";
      popup.style.fontSize = "1.2rem";
      popup.style.lineHeight = "1.1";
      popup.style.zIndex = "100";
      popup.style.display = "none";
      popup.style.willChange = "transform, opacity";
      playground.appendChild(popup);
      popupPool.push({ element: popup, timer: null });
    }
  }

  function initObjectPool() {
    for (let i = 0; i < POOL_SIZE; i++) {
        const capsule = document.createElement("div");
        capsule.className = "word-capsule";
        capsule.style.display = "none";
        capsule.style.transform = "translate3d(-50%, -200px, 0)";
        capsule.dataset.poolIndex = i;
        
        // Pre-build inner DOM structure (avoid innerHTML on every spawn)
        const orbBase = document.createElement("div");
        orbBase.className = "orb-base w-[6.5rem] h-[6.5rem] sm:w-[8rem] sm:h-[8rem] flex flex-col items-center justify-center shadow-2xl p-2";
        const textContainer = document.createElement("div");
        textContainer.className = "font-headline font-bold text-white uppercase tracking-wide drop-shadow-lg text-center break-words w-full px-1";
        orbBase.appendChild(textContainer);
        capsule.appendChild(orbBase);

        capsule.addEventListener("click", () => {
            const id = parseInt(capsule.dataset.id);
            if (!isNaN(id)) handleTap(id);
        });
        capsule.addEventListener("touchstart", (e) => {
            e.preventDefault();
            const id = parseInt(capsule.dataset.id);
            if (!isNaN(id)) handleTap(id);
        }, { passive: false });

        playground.appendChild(capsule);
        
        capsulePool.push({
            element: capsule,
            isActive: false
        });
    }
    updatePlaygroundHeight();
    initPopupPool();
  }
  
  function releaseCapsule(poolItem) {
    poolItem.isActive = false;
    poolItem.element.style.display = "none";
    poolItem.element.style.transform = "translate3d(-50%, -200px, 0)";
    poolItem.element.style.pointerEvents = "none";
  }


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

  // --- Lives Display (cached — only rebuild when lives actually change) ---
  function updateLivesDisplay() {
    if (lives === lastRenderedLives) return;
    lastRenderedLives = lives;

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
    const statusPill = document.getElementById("shield-status-pill");
    const statusIcon = document.getElementById("shield-status-icon");
    const statusText = document.getElementById("shield-status");

    if (lives <= 1) {
      if (statusText) statusText.textContent = "CRITICAL";
      if (statusIcon) statusIcon.textContent = "warning";
      if (statusPill) statusPill.className = "border border-[#ff0055] bg-[#330011] text-[#ff0055] px-2 py-0.5 rounded-md flex items-center gap-1 text-[10px] sm:text-xs font-headline font-bold uppercase w-fit shadow-[0_0_10px_rgba(255,0,85,0.2)]";
    } else if (lives <= 2) {
      if (statusText) statusText.textContent = "DAMAGED";
      if (statusIcon) statusIcon.textContent = "error";
      if (statusPill) statusPill.className = "border border-[#ff9d00] bg-[#332200] text-[#ff9d00] px-2 py-0.5 rounded-md flex items-center gap-1 text-[10px] sm:text-xs font-headline font-bold uppercase w-fit shadow-[0_0_10px_rgba(255,157,0,0.2)]";
    } else {
      if (statusText) statusText.textContent = "OPTIMIZED";
      if (statusIcon) statusIcon.textContent = "check";
      if (statusPill) statusPill.className = "border border-[#00ff66] bg-[#002211] text-[#00ff66] px-2 py-0.5 rounded-md flex items-center gap-1 text-[10px] sm:text-xs font-headline font-bold uppercase w-fit shadow-[0_0_10px_rgba(0,255,102,0.2)]";
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

    const poolItem = capsulePool.find(c => !c.isActive);
    if (!poolItem) return;

    const isToxic = Math.random() < config.toxicRatio;
    const word = GameData.getRandomWord(isToxic, levelNum);
    if (isToxic) totalToxicSpawned++;
    totalWordsSpawned++;

    const id = wordIdCounter++;
    
    let xPos = 15 + Math.random() * 70;
    
    // Anti-collision / merging logic
    let attempts = 0;
    while(attempts < 10) {
        let overlap = false;
        for (const w of activeWords) {
            // Check recently spawned orbs at the top
            if (w.y < 200 && Math.abs(w.xPos - xPos) < 28) { 
                overlap = true;
                break;
            }
        }
        if (!overlap) break;
        
        if (xPos > 50) xPos = 15 + Math.random() * 30; // Switch sides
        else xPos = 55 + Math.random() * 30;
        attempts++;
    }

    const orbColors = ['orb-orange', 'orb-purple', 'orb-cyan', 'orb-red'];
    const orbClass = orbColors[Math.floor(Math.random() * orbColors.length)];

    const parts = word.split(" | ");
    let displayHtml = "";
    if (parts.length === 2) {
        const hindi = parts[0];
        const english = parts[1];
        displayHtml = `
            <span class="block text-[18px] sm:text-[24px] leading-tight mb-1">${hindi}</span>
            <span class="block text-[12px] sm:text-[14px] opacity-80 font-normal">${english}</span>
        `;
    } else {
        const isHindi = /[\u0900-\u097F]/.test(word);
        const fontSizeClass = isHindi ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl";
        displayHtml = `<span class="${fontSizeClass}">${word}</span>`;
    }

    const capsule = poolItem.element;
    capsule.dataset.id = id;
    capsule.dataset.toxic = isToxic;
    
    capsule.style.left = xPos + "%";
    capsule.style.transform = `translate3d(-50%, -100px, 0)`;
    capsule.style.display = "block";
    capsule.style.pointerEvents = "auto";
    
    // Reuse pre-built DOM — just update class and text (no innerHTML rewrite)
    const orbEl = capsule.querySelector(".orb-base");
    orbEl.className = "orb-base " + orbClass + " w-[6.5rem] h-[6.5rem] sm:w-[8rem] sm:h-[8rem] flex flex-col items-center justify-center shadow-2xl p-2";
    orbEl.classList.remove("zap-effect");
    orbEl.style.border = "";
    orbEl.querySelector("div").innerHTML = displayHtml;

    poolItem.isActive = true;
    activeWords.push({
      id,
      poolItem,
      isToxic,
      xPos,
      y: -100,
      speed: config.fallSpeed,
    });
  }

  // --- Handle Tap ---
  function handleTap(wordId) {
    if (isPaused || isGameOver) return;
    const idx = activeWords.findIndex((w) => w.id === wordId);
    if (idx === -1) return;

    const wordObj = activeWords[idx];
    const el = wordObj.poolItem.element;

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
      showScorePopup(wordObj, `BULLY WORD!`, "#3cd7ff");
      flashCyberAlert();

      // Zap animation
      el.querySelector(".orb-base").classList.add("zap-effect");
      el.style.pointerEvents = "none";
      setTimeout(() => {
        releaseCapsule(wordObj.poolItem);
      }, 400);
    } else {
      // Wrong! Tapped a safe word
      wrongZaps++;
      combo = 0;
      lives--;
      updateLivesDisplay();

      showScorePopup(
        wordObj,
        `SAFE WORD!<br><span style="font-size: 0.9rem">-1 ❤️</span>`,
        "#ffb4ab",
      );

      // Shake effect
      el.querySelector(".orb-base").style.border = "2px solid #ff4444";
      playground.classList.add("shake");
      setTimeout(() => playground.classList.remove("shake"), 300);

      el.style.pointerEvents = "none";
      setTimeout(() => {
        releaseCapsule(wordObj.poolItem);
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

  // --- Score Popup (pooled — no DOM creation/removal during gameplay) ---
  function showScorePopup(wordObj, text, color) {
    const poolItem = popupPool.find(p => p.element.style.display === "none");
    if (!poolItem) return;
    
    const popup = poolItem.element;
    popup.style.left = wordObj.xPos + "%";
    popup.style.top = (wordObj.y - 30) + "px";
    popup.style.transform = "translateX(-50%)";
    popup.style.color = color;
    popup.style.textShadow = "0 0 10px " + color;
    popup.innerHTML = text;
    
    // Re-trigger animation without reflow (use display toggle)
    popup.style.display = "none";
    // Force style recalc via rAF instead of offsetWidth reflow
    requestAnimationFrame(() => {
      popup.style.display = "";
      popup.classList.remove("score-popup");
      popup.classList.add("score-popup");
    });
    
    if (poolItem.timer) clearTimeout(poolItem.timer);
    poolItem.timer = setTimeout(() => {
      popup.style.display = "none";
    }, 650);
  }

  // --- Game Loop (move words down — delta-time normalized) ---
  function tick(deltaTime) {
    if (isPaused || isGameOver) return;

    const shieldY = cachedPlaygroundHeight - 10;

    for (let i = activeWords.length - 1; i >= 0; i--) {
      const w = activeWords[i];
      // deltaTime-normalized: speed is consistent regardless of frame rate
      w.y += w.speed * deltaTime * 60;
      w.poolItem.element.style.transform = `translate3d(-50%, ${w.y}px, 0)`;

      // Word reached shield barrier
      if (w.y >= shieldY) {
        if (w.isToxic) {
          lives--;
          updateLivesDisplay();
          combo = 0;

          shieldBarrier.classList.add("shield-hit");
          setTimeout(() => shieldBarrier.classList.remove("shield-hit"), 400);

          if (lives <= 0) {
            releaseCapsule(w.poolItem);
            activeWords.splice(i, 1);
            gameOver();
            return;
          }
        }
        releaseCapsule(w.poolItem);
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

  // --- Animation Frame Loop (delta-time based) ---
  function animationLoop(timestamp) {
    if (!isGameOver) {
      if (!timestamp || !lastFrameTime) {
        lastFrameTime = timestamp || performance.now();
        gameLoop = requestAnimationFrame(animationLoop);
        return;
      }
      const deltaTime = Math.min((timestamp - lastFrameTime) / 1000, 0.1);
      lastFrameTime = timestamp;
      tick(deltaTime);
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
    initObjectPool();
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
