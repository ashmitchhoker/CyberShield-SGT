import re

with open('js/game-engine.js', 'r', encoding='utf-8') as f:
    engine = f.read()

# 1. Add pool
pool_init = """  let wordIdCounter = 0;

  // --- Object Pool (Caching for Performance) ---
  const POOL_SIZE = 15;
  const capsulePool = [];

  function initObjectPool() {
    for (let i = 0; i < POOL_SIZE; i++) {
        const capsule = document.createElement("div");
        capsule.className = "word-capsule";
        capsule.style.display = "none";
        capsule.style.transform = "translate3d(-50%, -200px, 0)";
        capsule.dataset.poolIndex = i;
        
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
  }
  
  function releaseCapsule(poolItem) {
    poolItem.isActive = false;
    poolItem.element.style.display = "none";
    poolItem.element.style.transform = "translate3d(-50%, -200px, 0)";
    poolItem.element.style.pointerEvents = "none";
  }
"""
engine = engine.replace("  let wordIdCounter = 0;", pool_init)

# Call init pool in DOMContentLoaded
engine = engine.replace("document.fonts.ready.then(() => {", "document.fonts.ready.then(() => {\n    initObjectPool();")


# 2. spawnWord replacement (including collision logic)
spawn_old = re.search(r'  // --- Spawn Word ---.*?// --- Handle Tap ---', engine, re.DOTALL).group(0)

spawn_new = """  // --- Spawn Word ---
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
        const isHindi = /[\\u0900-\\u097F]/.test(word);
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
    
    capsule.innerHTML = `
            <div class="orb-base ${orbClass} w-[6.5rem] h-[6.5rem] sm:w-[8rem] sm:h-[8rem] flex flex-col items-center justify-center shadow-2xl transition-all p-2">
                <div class="font-headline font-bold text-white uppercase tracking-wide drop-shadow-lg text-center break-words w-full px-1">
                    ${displayHtml}
                </div>
            </div>
        `;

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

  // --- Handle Tap ---"""
engine = engine.replace(spawn_old, spawn_new)


# 3. Handle Tap Replacement (use pool release instead of remove)
engine = engine.replace("el.remove();", "releaseCapsule(wordObj.poolItem);")
engine = engine.replace("playground.appendChild(capsule);", "") # Handled in initPool now
# Note: we had two remove() in HandleTap and one in tick(). `el.remove()` works nicely with `releaseCapsule`. 
# Wait, el.remove is also tied to `activeWords.splice`. That happens later.

# In tick(): 
# Find: w.element.style.top = w.y + "px";
engine = engine.replace("w.element.style.top = w.y + \"px\";", "w.poolItem.element.style.transform = `translate3d(-50%, ${w.y}px, 0)`;")
# Find: w.element.remove()
engine = engine.replace("w.element.remove();", "releaseCapsule(w.poolItem);")


with open('js/game-engine.js', 'w', encoding='utf-8') as f:
    f.write(engine)

