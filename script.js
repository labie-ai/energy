/* =========================================================
   ENERGY MISSION — SCRIPT.JS
   Vanilla JavaScript — tanpa framework
   ========================================================= */

/* ---------------------------------------------------------
   1. STATE & PERSISTENCE (localStorage)
   --------------------------------------------------------- */
const STORAGE_KEY = "energyMissionState_v1";

const DEFAULT_STATE = {
  playerName: "Petualang Energi",
  playerClass: "",
  xp: 0,
  score: 0,
  completed: { misi1: false, misi2: false, misi3: false, misi4: false, misi5: false },
  bestScores: { misi1: 0, misi2: 0, misi3: 0, misi4: 0, misi5: 0 },
  badges: {},
  settings: { musicVol: 60, sfxVol: 80, muted: false },
  leaderboard: []
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    return Object.assign(structuredClone(DEFAULT_STATE), parsed);
  } catch (e) {
    return structuredClone(DEFAULT_STATE);
  }
}
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE));
}

let STATE = loadState();

function levelFromXP(xp) { return Math.floor(xp / 100) + 1; }
function xpIntoLevel(xp) { return xp % 100; }

/* ---------------------------------------------------------
   2. SOUND ENGINE (Web Audio API — tanpa file eksternal)
   --------------------------------------------------------- */
const SoundEngine = (() => {
  let ctx = null;
  let bgmAudio = null;
  let bgmNodes = null;
  let currentBgmKind = null;
  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }
  function sfxGain() { return STATE.settings.muted ? 0 : STATE.settings.sfxVol / 100; }
  function musicGain() { return STATE.settings.muted ? 0 : STATE.settings.musicVol / 100 * 0.25; }

  function tone(freq, start, dur, type = "sine", peak = 0.22) {
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, c.currentTime + start);
    gain.gain.linearRampToValueAtTime(peak * sfxGain(), c.currentTime + start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
    osc.connect(gain).connect(c.destination);
    osc.start(c.currentTime + start);
    osc.stop(c.currentTime + start + dur + 0.05);
  }

  return {
    click() { tone(520, 0, 0.08, "square", 0.15); },
    correct() { tone(660, 0, 0.12, "sine"); tone(880, 0.1, 0.18, "sine"); },
    wrong() { tone(220, 0, 0.14, "sawtooth", 0.18); tone(160, 0.1, 0.2, "sawtooth", 0.16); },
    reward() { [523, 659, 784, 1046].forEach((f, i) => tone(f, i * 0.09, 0.2, "triangle")); },
    victory() { [523, 659, 784, 1046, 1318].forEach((f, i) => tone(f, i * 0.12, 0.3, "triangle", 0.2)); },
    gameover() { [400, 320, 240, 160].forEach((f, i) => tone(f, i * 0.15, 0.3, "sawtooth", 0.16)); },
    countdown() { tone(880, 0, 0.08, "square", 0.18); },
    startBgm(kind) {
      this.stopBgm();
      if (!bgmAudio) {
        bgmAudio = new Audio("assets/audio/cyberwave-orchestra-puzzle-game-bright-casual-video-game-music-249202.mp3");
        bgmAudio.loop = true;
        bgmAudio.preload = "auto";
      }
      bgmAudio.volume = musicGain();
      if (STATE.settings.muted) return;
      bgmAudio.currentTime = 0;
      bgmAudio.play().catch(() => {});
      currentBgmKind = kind;
      bgmNodes = bgmAudio;
    },
    stopBgm() {
      if (bgmAudio) {
        bgmAudio.pause();
        bgmNodes = null;
      }
    },
    refreshBgmVolume() {
      if (bgmAudio) {
        bgmAudio.volume = musicGain();
        if (STATE.settings.muted) bgmAudio.pause();
        else bgmAudio.play().catch(() => {});
      }
    }
  };
})();

/* ---------------------------------------------------------
   3. NAVIGATION
   --------------------------------------------------------- */
const screens = document.querySelectorAll(".screen");
const topbar = document.getElementById("topbar");
const GAME_SCREENS = ["misi1", "misi2", "misi3", "misi4", "misi5"];

function showScreen(name) {
  screens.forEach(s => s.classList.remove("active"));
  const target = document.getElementById("screen-" + name);
  if (target) target.classList.add("active");
  const isGame = GAME_SCREENS.includes(name);
  topbar.classList.toggle("hidden", !isGame);
  SoundEngine.startBgm(isGame ? "game" : "menu");
  if (name === "home") renderHome();
  if (name === "mission-select") renderMissionSelect();
  if (name === "badge") renderBadges();
  if (name === "certificate") renderCertificate();
  if (name === "score") renderScoreboard();
  if (name === "profile") renderProfile();
  window.scrollTo(0, 0);
}

document.querySelectorAll("[data-nav]").forEach(btn => {
  btn.addEventListener("click", () => {
    SoundEngine.click();
    if (btn.dataset.nav === "mission-select" && !isProfileComplete()) {
    showToast("Isi nama dan kelas terlebih dahulu untuk memulai.");
    showScreen("profile");

    } else {
      showScreen(btn.dataset.nav);
    }
  });
});
document.getElementById("btn-home").addEventListener("click", () => { SoundEngine.click(); confirmQuitIfPlaying(() => showScreen("home")); });
const btnExit = document.getElementById("btn-exit");
if (btnExit) {
  btnExit.addEventListener("click", () => {
    SoundEngine.click();
    showToast("Terima kasih sudah bermain Energy Mission! 🌍");
  });
}
document.querySelectorAll(".screen-quit").forEach(btn => {
  btn.addEventListener("click", () => { SoundEngine.click(); showScreen("home"); });
});

document.getElementById("btn-start-game").addEventListener("click", () => {
  const nameInput = document.getElementById("start-name");
  const classInput = document.getElementById("start-class");
  const name = nameInput.value.trim();
  const cls = classInput.value.trim();
  if (!name || !cls) {
    showToast("Nama dan kelas harus diisi.");
    return;
  }
  STATE.playerName = name;
  STATE.playerClass = cls;
  saveState();
  renderHome();
  SoundEngine.click();
  showScreen("home");
});

function isProfileComplete() {
  return STATE.playerName && STATE.playerName !== "Petualang Energi" && STATE.playerClass;
}

function renderProfile() {
  document.getElementById("start-name").value = STATE.playerName === "Petualang Energi" ? "" : STATE.playerName;
  document.getElementById("start-class").value = STATE.playerClass || "";
}

function askPlayerName(onDone) {
  if (isProfileComplete()) {
    if (typeof onDone === "function") onDone();
    return;
  }
  showScreen("profile");
}

function confirmQuitIfPlaying(cb) { cb(); }

/* ---------------------------------------------------------
   4. HUD (XP / Level / Score)
   --------------------------------------------------------- */
function updateHUD() {
  document.getElementById("hud-level").textContent = "Lv. " + levelFromXP(STATE.xp);
  document.getElementById("hud-score").textContent = "⭐ " + STATE.score;
  document.getElementById("hud-xp-fill").style.width = xpIntoLevel(STATE.xp) + "%";
}

function addXP(amount) {
  STATE.xp += amount;
  STATE.score += amount;
  saveState();
  updateHUD();
}

/* ---------------------------------------------------------
   5. HOME / MISSION SELECT / BADGE / MATERI RENDER
   --------------------------------------------------------- */
const MISSION_META = [
  { key: "misi1", title: "Identifikasi Energi Fosil", desc: "Kenali sumber energi fosil di sekitarmu", icon: "🔍" },
  { key: "misi2", title: "Pasangkan Pemanfaatan", desc: "Seret & pasangkan sumber energi", icon: "🧩" },
  { key: "misi3", title: "Studi Kasus", desc: "Analisis dampak & solusi", icon: "🕵️" },
  { key: "misi4", title: "Pilih Solusi Terbaik", desc: "Pilih semua solusi yang tepat", icon: "✅" },
  { key: "misi5", title: "Escape Challenge", desc: "Jawab cepat sebelum waktu habis!", icon: "⏱️" }
];

function renderHome() {
  document.getElementById("home-player-name").textContent = STATE.playerName;
  document.getElementById("home-player-class").textContent = STATE.playerClass || "-";
  document.getElementById("home-level").textContent = levelFromXP(STATE.xp);
  document.getElementById("range-music").value = STATE.settings.musicVol;
  document.getElementById("range-sfx").value = STATE.settings.sfxVol;
  document.getElementById("toggle-mute").checked = STATE.settings.muted;
  updateHUD();
}

function renderMissionSelect() {
  const wrap = document.getElementById("mission-list");
  wrap.innerHTML = "";
  const missionImages = ["assets/images/misi1.png", "assets/images/misi2.png", "assets/images/misi3.png", "assets/images/misi4.png", "assets/images/misi5.png"];
  MISSION_META.forEach((m, idx) => {
    const locked = idx > 0 && !STATE.completed[MISSION_META[idx - 1].key];
    const item = document.createElement("div");
    item.className = "mission-item" + (locked ? " locked" : "");
    const stars = STATE.completed[m.key] ? `<div class="mission-stars">⭐ ${STATE.bestScores[m.key]}</div>` : "";
    item.innerHTML = `
      <img src="${missionImages[idx]}" class="mission-image" alt="${m.title}">
      <div class="mission-overlay">
        <h4>${m.title}</h4>
        <p>${m.desc}</p>
        ${stars}
        <button class="mission-play" ${locked ? "disabled" : ""}>${STATE.completed[m.key] ? "Ulangi" : "Main"}</button>
      </div>
    `;
    if (!locked) {
      const playBtn = item.querySelector(".mission-play");
      playBtn.addEventListener("click", () => { SoundEngine.click(); startMission(m.key); });
    }
    wrap.appendChild(item);
  });
}

const BADGE_META = [
  { key: "misi1", icon: "assets/images/icon_correct.png", title: "Detektif Fosil", desc: "Selesaikan Misi 1" },
  { key: "misi2", icon: "assets/images/coin.png", title: "Master Pasangan", desc: "Selesaikan Misi 2" },
  { key: "misi3", icon: "assets/images/icon_correct.png", title: "Analis Kasus", desc: "Selesaikan Misi 3" },
  { key: "misi4", icon: "assets/images/icon_correct.png", title: "Pemecah Solusi", desc: "Selesaikan Misi 4" },
  { key: "misi5", icon: "assets/images/timer.png", title: "Pelari Waktu", desc: "Selesaikan Misi 5" },
  { key: "perfect", icon: "assets/images/icon_star.png", title: "Sempurna", desc: "Jawab semua benar dalam 1 misi" },
  { key: "allmissions", icon: "assets/images/victory.png", title: "Juara Energi", desc: "Selesaikan seluruh misi" },
  { key: "level5", icon: "assets/images/bolt.png", title: "Level 5", desc: "Capai level 5" }
];

function renderBadges() {
  const wrap = document.getElementById("badge-grid");
  wrap.innerHTML = "";
  BADGE_META.forEach(b => {
    const unlocked = !!STATE.badges[b.key];
    const el = document.createElement("div");
    el.className = "badge-item" + (unlocked ? "" : " locked");
    el.innerHTML = `<img src="${b.icon}" alt="${b.title}" class="badge-icon"><h4>${b.title}</h4><p>${b.desc}</p>`;
    wrap.appendChild(el);
  });
}

function unlockBadge(key) {
  if (!STATE.badges[key]) {
    STATE.badges[key] = true;
    saveState();
    showToast("Badge baru: " + (BADGE_META.find(b => b.key === key)?.title || key));
  }
}

function renderScoreboard() {
  const body = document.getElementById("score-table-body");
  const rows = [...STATE.leaderboard].sort((a, b) => b.score - a.score).slice(0, 10);
  body.innerHTML = rows.length ? "" : `<tr><td colspan="6">Belum ada data skor.</td></tr>`;
  rows.forEach((r, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${i + 1}</td><td>${r.name}</td><td>${r.class}</td><td>${r.score}</td><td>${r.level}</td><td>${r.date}</td>`;
    body.appendChild(tr);
  });
}

function pushLeaderboardEntry() {
  STATE.leaderboard.push({
    name: STATE.playerName, class: STATE.playerClass || "-", score: STATE.score, level: levelFromXP(STATE.xp),
    date: new Date().toLocaleDateString("id-ID")
  });
  if (STATE.leaderboard.length > 50) STATE.leaderboard.shift();
  saveState();
}

/* ---------------------------------------------------------
   6. SETTINGS
   --------------------------------------------------------- */
document.getElementById("range-music").addEventListener("input", e => {
  STATE.settings.musicVol = +e.target.value; saveState(); SoundEngine.refreshBgmVolume();
});
document.getElementById("range-sfx").addEventListener("input", e => {
  STATE.settings.sfxVol = +e.target.value; saveState();
});
document.getElementById("toggle-mute").addEventListener("change", e => {
  STATE.settings.muted = e.target.checked; saveState(); SoundEngine.refreshBgmVolume();
});
// Open reset confirmation modal instead of native confirm
document.getElementById("btn-reset-progress").addEventListener("click", () => {
  const overlay = document.getElementById("confirm-reset-overlay");
  overlay.classList.remove("hidden");
  overlay.setAttribute('aria-hidden', 'false');
});

// Wire cancel/confirm buttons in modal
document.getElementById("confirm-reset-cancel").addEventListener("click", () => {
  const o = document.getElementById("confirm-reset-overlay");
  o.classList.add("hidden"); o.setAttribute('aria-hidden', 'true');
});
document.getElementById("confirm-reset-ok").addEventListener("click", () => {
  // perform reset
  STATE = structuredClone(DEFAULT_STATE);
  saveState();
  const o = document.getElementById("confirm-reset-overlay");
  o.classList.add("hidden"); o.setAttribute('aria-hidden', 'true');
  showToast("Progres berhasil direset.", { center: true });
  renderHome();
});
document.getElementById("btn-mute").addEventListener("click", () => {
  STATE.settings.muted = !STATE.settings.muted; saveState(); SoundEngine.refreshBgmVolume();
  const muteBtn = document.getElementById("btn-mute");
  const img = muteBtn.querySelector("img") || muteBtn;
  if (img.tagName === "IMG") {
    img.src = STATE.settings.muted ? "assets/images/btn_music_off.png" : "assets/images/btn_music_on.png";
  } else {
    muteBtn.innerHTML = `<img src="${STATE.settings.muted ? 'assets/images/btn_music_off.png' : 'assets/images/btn_music_on.png'}" alt="Musik" class="icon-img">`;
  }
});
document.getElementById("btn-fullscreen").addEventListener("click", () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
  else document.exitFullscreen();
});

/* ---------------------------------------------------------
   7. PAUSE / RESUME
   --------------------------------------------------------- */
const pauseOverlay = document.getElementById("pause-overlay");
let isPaused = false;
document.getElementById("btn-pause").addEventListener("click", () => {
  isPaused = true;
  pauseOverlay.classList.remove("hidden");
  if (currentSession.mission === "misi5") clearInterval(currentSession.timerId);
});
document.getElementById("btn-resume").addEventListener("click", () => {
  isPaused = false;
  pauseOverlay.classList.add("hidden");
  if (currentSession.mission === "misi5") resumeMisi5Timer();
});
document.getElementById("btn-restart").addEventListener("click", () => {
  pauseOverlay.classList.add("hidden");
  isPaused = false;
  startMission(currentSession.mission);
});
document.getElementById("btn-quit-to-home").addEventListener("click", () => {
  pauseOverlay.classList.add("hidden");
  isPaused = false;
  if (currentSession.mission === "misi5") clearInterval(currentSession.timerId);
  showScreen("home");
});

/* ---------------------------------------------------------
   8. TOAST
   --------------------------------------------------------- */
let toastTimer = null;
function showToast(msg, opts = {}) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  // Jika opts.center true, toast tampil seperti pop-up di tengah layar
  t.classList.toggle("center", !!opts.center);

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    t.classList.add("hidden");
    t.classList.remove("center");
  }, 2600);
}


/* ---------------------------------------------------------
   9. RESULT POPUP
   --------------------------------------------------------- */
const popupOverlay = document.getElementById("popup-overlay");
function showResultPopup({ correct, total, xp, onRetry, onContinue }) {
  document.getElementById("popup-correct").textContent = `${correct}/${total}`;
  document.getElementById("popup-xp").textContent = "+" + xp;
  document.getElementById("popup-score").textContent = STATE.score;
  const perfect = correct === total;
  const iconImg = perfect ? "assets/images/victory.png" : (correct >= total / 2 ? "assets/images/icon_star.png" : "assets/images/thinking.png");
  document.getElementById("popup-icon").innerHTML = `<img src="${iconImg}" alt="Result" style="width:3rem; height:3rem; object-fit:contain;">`;
  document.getElementById("popup-title").textContent = perfect ? "Sempurna!" : "Misi Selesai!";
  document.getElementById("popup-desc").textContent = perfect
    ? "Kamu menjawab semua dengan benar!"
    : "Terus berlatih untuk hasil lebih baik!";
  popupOverlay.classList.remove("hidden");
  spawnConfetti();
  SoundEngine.reward();
  const retryBtn = document.getElementById("popup-retry");
  const contBtn = document.getElementById("popup-continue");
  const retryHandler = () => { cleanup(); onRetry(); };
  const contHandler = () => { cleanup(); onContinue(); };
  function cleanup() {
    popupOverlay.classList.add("hidden");
    retryBtn.removeEventListener("click", retryHandler);
    contBtn.removeEventListener("click", contHandler);
  }
  retryBtn.addEventListener("click", retryHandler);
  contBtn.addEventListener("click", contHandler);
}

/* ---------------------------------------------------------
   10. CONFETTI / PARTICLE EFFECT (Canvas)
   --------------------------------------------------------- */
const fxCanvas = document.getElementById("fx-canvas");
const fxCtx = fxCanvas.getContext("2d");
function resizeFxCanvas() { fxCanvas.width = window.innerWidth; fxCanvas.height = window.innerHeight; }
resizeFxCanvas();
window.addEventListener("resize", resizeFxCanvas);

let particles = [];
function spawnConfetti() {
  const colors = ["#FFC947", "#3FBF8F", "#4FC3F7", "#FF6B4A", "#FFFFFF"];
  for (let i = 0; i < 90; i++) {
    particles.push({
      x: fxCanvas.width / 2, y: fxCanvas.height / 3,
      vx: (Math.random() - 0.5) * 10, vy: Math.random() * -8 - 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 4, life: 100, rot: Math.random() * 360
    });
  }
  if (!fxLoopRunning) runFxLoop();
}
let fxLoopRunning = false;
function runFxLoop() {
  fxLoopRunning = true;
  function loop() {
    fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
    particles.forEach(p => {
      p.vy += 0.25; p.x += p.vx; p.y += p.vy; p.life -= 1.4; p.rot += 6;
      fxCtx.save();
      fxCtx.translate(p.x, p.y);
      fxCtx.rotate(p.rot * Math.PI / 180);
      fxCtx.fillStyle = p.color;
      fxCtx.globalAlpha = Math.max(p.life / 100, 0);
      fxCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      fxCtx.restore();
    });
    particles = particles.filter(p => p.life > 0);
    if (particles.length > 0) requestAnimationFrame(loop);
    else fxLoopRunning = false;
  }
  loop();
}

/* ---------------------------------------------------------
   11. MISSION SESSION MANAGER
   --------------------------------------------------------- */
let currentSession = { mission: null };

function startMission(key) {
  showScreen(key);
  const starters = { misi1: startMisi1, misi2: startMisi2, misi3: startMisi3, misi4: startMisi4, misi5: startMisi5 };
  starters[key]();
}

function finishMission(key, correct, total) {
  const xpGained = Math.round((correct / total) * 60) + 20;
  addXP(xpGained);
  const wasFirstTime = !STATE.completed[key];
  STATE.completed[key] = true;
  STATE.bestScores[key] = Math.max(STATE.bestScores[key], correct);
  saveState();
  unlockBadge(key);
  if (correct === total) unlockBadge("perfect");
  if (levelFromXP(STATE.xp) >= 5) unlockBadge("level5");
  if (Object.values(STATE.completed).every(Boolean)) {
    unlockBadge("allmissions");
    pushLeaderboardEntry();
  }
  showResultPopup({
    correct, total, xp: xpGained,
    onRetry: () => startMission(key),
    onContinue: () => showScreen("mission-select")
  });
}

/* ---------------------------------------------------------
   12. MISI 1 — PILIHAN GANDA (Identifikasi)
   --------------------------------------------------------- */
function startMisi1() {
  currentSession = { mission: "misi1", questions: fisherYatesShuffle(QUESTION_BANK.misi1).slice(0, 10), index: 0, correct: 0 };
  renderMisi1Question();
}
function renderMisi1Question() {
  const s = currentSession;
  const q = s.questions[s.index];
  document.getElementById("m1-progress").textContent = `Soal ${s.index + 1}/${s.questions.length}`;
  const img = document.getElementById("m1-image");
  if (q.img) { img.src = q.img; img.classList.remove("hidden"); } else { img.classList.add("hidden"); }
  document.getElementById("m1-question").textContent = q.question;
  const optWrap = document.getElementById("m1-options");
  optWrap.innerHTML = "";
  const nextBtn = document.getElementById("m1-next");
  nextBtn.disabled = true;

  const shuffledIdx = fisherYatesShuffle(q.options.map((opt, i) => i));
  shuffledIdx.forEach(origIdx => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = q.options[origIdx];
    btn.addEventListener("click", () => {
      SoundEngine.click();
      [...optWrap.children].forEach(b => b.disabled = true);
      if (origIdx === q.answer) {
        btn.classList.add("correct"); s.correct++; SoundEngine.correct();
      } else {
        btn.classList.add("wrong"); SoundEngine.wrong();
        [...optWrap.children].forEach(b => { if (+b.dataset.idx === q.answer) b.classList.add("correct"); });
      }
      nextBtn.disabled = false;
    });
    btn.dataset.idx = origIdx;
    optWrap.appendChild(btn);
  });

  nextBtn.onclick = () => {
    SoundEngine.click();
    s.index++;
    if (s.index >= s.questions.length) finishMission("misi1", s.correct, s.questions.length);
    else renderMisi1Question();
  };
}

/* ---------------------------------------------------------
   13. MISI 2 — DRAG AND DROP
   --------------------------------------------------------- */
function startMisi2() {
  const pairs = fisherYatesShuffle(QUESTION_BANK.misi2).slice(0, 8);
  currentSession = { mission: "misi2", pairs, matched: 0, wrong: 0 };
  renderMisi2();
}
function renderMisi2() {
  const s = currentSession;
  document.getElementById("m2-progress").textContent = `Pasangan tersisa: ${s.pairs.length - s.matched}`;
  const sourcesWrap = document.getElementById("dnd-sources");
  const targetsWrap = document.getElementById("dnd-targets");
  sourcesWrap.innerHTML = ""; targetsWrap.innerHTML = "";

  const shuffledUsages = fisherYatesShuffle(s.pairs);
  shuffledUsages.forEach(p => {
    const card = document.createElement("div");
    card.className = "dnd-card";
    card.textContent = p.usage;
    card.draggable = true;
    card.dataset.id = p.id;
    card.addEventListener("dragstart", e => { e.dataTransfer.setData("text/plain", p.id); card.classList.add("dragging"); });
    card.addEventListener("dragend", () => card.classList.remove("dragging"));
    sourcesWrap.appendChild(card);
  });

  const shuffledSources = fisherYatesShuffle(s.pairs);
  shuffledSources.forEach(p => {
    const target = document.createElement("div");
    target.className = "dnd-target";
    target.textContent = p.source;
    target.dataset.id = p.id;
    target.addEventListener("dragover", e => { e.preventDefault(); target.classList.add("dragover"); });
    target.addEventListener("dragleave", () => target.classList.remove("dragover"));
    target.addEventListener("drop", e => {
      e.preventDefault();
      target.classList.remove("dragover");
      if (target.classList.contains("filled")) return;
      const draggedId = e.dataTransfer.getData("text/plain");
      const draggedCard = sourcesWrap.querySelector(`[data-id="${draggedId}"]`);
      if (draggedId === target.dataset.id) {
        target.classList.add("filled");
        target.textContent = `${p.source} → ${p.usage}`;
        draggedCard.remove();
        SoundEngine.correct();
        s.matched++;
        document.getElementById("m2-progress").textContent = `Pasangan tersisa: ${s.pairs.length - s.matched}`;
        if (s.matched >= s.pairs.length) {
          document.getElementById("m2-next").classList.remove("hidden");
        }
      } else {
        SoundEngine.wrong();
        s.wrong++;
        target.classList.add("wrong-flash");
        setTimeout(() => target.classList.remove("wrong-flash"), 400);
      }
    });
    targetsWrap.appendChild(target);
  });

  document.getElementById("m2-next").classList.add("hidden");
  document.getElementById("m2-next").onclick = () => {
    SoundEngine.click();
    const total = s.pairs.length;
    const correct = Math.max(total - Math.floor(s.wrong / 2), Math.ceil(total * 0.4));
    finishMission("misi2", Math.min(correct, total), total);
  };
}

/* ---------------------------------------------------------
   14. MISI 3 — STUDI KASUS
   --------------------------------------------------------- */
function startMisi3() {
  currentSession = { mission: "misi3", questions: fisherYatesShuffle(QUESTION_BANK.misi3).slice(0, 8), index: 0, correct: 0 };
  renderMisi3Question();
}
function renderMisi3Question() {
  const s = currentSession;
  const q = s.questions[s.index];
  document.getElementById("m3-progress").textContent = `Kasus ${s.index + 1}/${s.questions.length}`;
  const img = document.getElementById("m3-image");
  if (q.img) { img.src = q.img; img.classList.remove("hidden"); } else { img.classList.add("hidden"); }
  document.getElementById("m3-case").textContent = q.case;
  document.getElementById("m3-question").textContent = q.question;
  const optWrap = document.getElementById("m3-options");
  optWrap.innerHTML = "";
  const nextBtn = document.getElementById("m3-next");
  nextBtn.disabled = true;

  const shuffledIdx = fisherYatesShuffle(q.options.map((opt, i) => i));
  shuffledIdx.forEach(origIdx => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = q.options[origIdx];
    btn.dataset.idx = origIdx;
    btn.addEventListener("click", () => {
      SoundEngine.click();
      [...optWrap.children].forEach(b => b.disabled = true);
      if (origIdx === q.answer) {
        btn.classList.add("correct"); s.correct++; SoundEngine.correct();
      } else {
        btn.classList.add("wrong"); SoundEngine.wrong();
        [...optWrap.children].forEach(b => { if (+b.dataset.idx === q.answer) b.classList.add("correct"); });
      }
      nextBtn.disabled = false;
    });
    optWrap.appendChild(btn);
  });

  nextBtn.onclick = () => {
    SoundEngine.click();
    s.index++;
    if (s.index >= s.questions.length) finishMission("misi3", s.correct, s.questions.length);
    else renderMisi3Question();
  };
}

/* ---------------------------------------------------------
   15. MISI 4 — CHECKBOX (Pilih Solusi Terbaik)
   --------------------------------------------------------- */
function startMisi4() {
  currentSession = { mission: "misi4", questions: fisherYatesShuffle(QUESTION_BANK.misi4).slice(0, 8), index: 0, correct: 0 };
  renderMisi4Question();
}
function renderMisi4Question() {
  const s = currentSession;
  const q = s.questions[s.index];
  document.getElementById("m4-progress").textContent = `Kasus ${s.index + 1}/${s.questions.length}`;
  document.getElementById("m4-case").textContent = q.case;
  document.getElementById("m4-question").textContent = q.question;
  const optWrap = document.getElementById("m4-options");
  optWrap.innerHTML = "";
  const submitBtn = document.getElementById("m4-submit");
  const nextBtn = document.getElementById("m4-next");
  submitBtn.style.display = "inline-block";
  submitBtn.disabled = false;
  nextBtn.classList.add("hidden");

  let selected = new Set();
  const idxMap = fisherYatesShuffle(q.options.map((opt, i) => i));
  idxMap.forEach(origIdx => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = q.options[origIdx];
    btn.dataset.idx = origIdx;
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      SoundEngine.click();
      btn.classList.toggle("selected");
      if (selected.has(origIdx)) selected.delete(origIdx); else selected.add(origIdx);
    });
    optWrap.appendChild(btn);
  });

  submitBtn.onclick = () => {
    SoundEngine.click();
    const correctSet = new Set(q.correct);
    let isRight = selected.size === correctSet.size && [...selected].every(v => correctSet.has(v));
    [...optWrap.children].forEach(b => {
      b.disabled = true;
      const idx = +b.dataset.idx;
      if (correctSet.has(idx)) b.classList.add("correct");
      else if (selected.has(idx)) b.classList.add("wrong");
    });
    if (isRight) { s.correct++; SoundEngine.correct(); } else SoundEngine.wrong();
    submitBtn.style.display = "none";
    nextBtn.classList.remove("hidden");
  };

  nextBtn.onclick = () => {
    SoundEngine.click();
    s.index++;
    if (s.index >= s.questions.length) finishMission("misi4", s.correct, s.questions.length);
    else renderMisi4Question();
  };
}

/* ---------------------------------------------------------
   16. MISI 5 — ESCAPE CHALLENGE (Timer 60 detik)
   --------------------------------------------------------- */
function startMisi5() {
  currentSession = {
    mission: "misi5",
    questions: fisherYatesShuffle(QUESTION_BANK.misi5),
    index: 0, correct: 0, wrong: 0, timeLeft: 60, timerId: null
  };
  document.getElementById("m5-score-line").textContent = "Skor cepat: 0";
  renderMisi5Statement();
  runMisi5Timer();
}
function runMisi5Timer() {
  const s = currentSession;
  updateMisi5TimerUI();
  s.timerId = setInterval(() => {
    if (isPaused) return;
    s.timeLeft--;
    updateMisi5TimerUI();
    if (s.timeLeft <= 10 && s.timeLeft > 0) SoundEngine.countdown();
    if (s.timeLeft <= 0) endMisi5();
  }, 1000);
}
function resumeMisi5Timer() { runMisi5Timer(); }
function updateMisi5TimerUI() {
  const chip = document.getElementById("m5-timer");
  chip.innerHTML = '<img src="assets/images/timer.png" alt="Timer" style="width:1.1rem; height:1.1rem; margin-right:4px; vertical-align:middle;"> ' + currentSession.timeLeft;
  chip.classList.toggle("warning", currentSession.timeLeft <= 10);
}
function renderMisi5Statement() {
  const s = currentSession;
  if (s.index >= s.questions.length) s.index = 0; // loop bank soal jika waktu masih ada
  const q = s.questions[s.index];
  document.getElementById("m5-statement").textContent = q.statement;
  document.getElementById("m5-score-line").textContent = `Skor cepat: ${s.correct}`;
}
function answerMisi5(userAnswer) {
  const s = currentSession;
  if (s.timeLeft <= 0) return;
  const q = s.questions[s.index];
  if (userAnswer === q.answer) { s.correct++; SoundEngine.correct(); }
  else { s.wrong++; SoundEngine.wrong(); }
  s.index++;
  renderMisi5Statement();
}
document.getElementById("m5-true").addEventListener("click", () => answerMisi5(true));
document.getElementById("m5-false").addEventListener("click", () => answerMisi5(false));

function endMisi5() {
  clearInterval(currentSession.timerId);
  SoundEngine.gameover();
  const total = currentSession.correct + currentSession.wrong || 1;
  finishMission("misi5", currentSession.correct, Math.max(total, currentSession.correct));
}

/* ---------------------------------------------------------
   17. CERTIFICATE (Canvas render + PNG/PDF export tanpa library)
   --------------------------------------------------------- */
function renderCertificate() {
  const allDone = Object.values(STATE.completed).every(Boolean);
  const statusEl = document.getElementById("cert-status");
  const pngBtn = document.getElementById("btn-download-cert-png");
  const pdfBtn = document.getElementById("btn-download-cert-pdf");
  const canvas = document.getElementById("cert-canvas");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, "#EAF7EA"); grad.addColorStop(1, "#DFF6FF");
  ctx.fillStyle = grad; ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#FFC947"; ctx.lineWidth = 14;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
  ctx.strokeStyle = "#4FC3F7"; ctx.lineWidth = 4;
  ctx.strokeRect(38, 38, canvas.width - 76, canvas.height - 76);

  ctx.textAlign = "center";
  ctx.fillStyle = "#123A5E";
  ctx.font = "bold 30px 'Baloo 2', sans-serif";
  ctx.fillText("SERTIFIKAT PENGHARGAAN", canvas.width / 2, 140);
  ctx.font = "20px 'Nunito', sans-serif";
  ctx.fillText("ENERGY MISSION: Selamatkan Kota dengan Energi Bijak", canvas.width / 2, 175);
  ctx.font = "16px 'Nunito', sans-serif";
  ctx.fillText("Dengan bangga diberikan kepada:", canvas.width / 2, 260);

// Nama & kelas: gunakan ukuran font dinamis agar tidak menumpuk saat teks panjang
  const nameText = STATE.playerName || "-";
  const clsText = `Kelas: ${STATE.playerClass || '-'}`;
  const centerX = canvas.width / 2;
  // Nama (target lebar maksimal agar muat)
  let nameFontSize = 44;
  ctx.fillStyle = "#1F8E63";
  while (nameFontSize > 22) {
    ctx.font = `bold ${nameFontSize}px 'Baloo 2', sans-serif`;
    if (ctx.measureText(nameText).width <= 640) break;
    nameFontSize -= 2;
  }
  ctx.font = `bold ${nameFontSize}px 'Baloo 2', sans-serif`;
  ctx.fillText(nameText, centerX, 320);

  // Kelas (lebih kecil dan diposisikan mengikuti tinggi font nama)
  let clsFontSize = 24;
  ctx.fillStyle = "#123A5E";
  while (clsFontSize > 16) {
    ctx.font = `bold ${clsFontSize}px 'Nunito', sans-serif`;
    if (ctx.measureText(clsText).width <= 640) break;
    clsFontSize -= 1;
  }
  ctx.font = `bold ${clsFontSize}px 'Nunito', sans-serif`;
  // Geser Y kelas berdasarkan ukuran nama supaya tidak tabrakan
  const yClass = 320 + Math.max(34, nameFontSize * 0.62);
  ctx.fillText(clsText, centerX, yClass);
  
  ctx.fillStyle = "#123A5E";
  ctx.font = "16px 'Nunito', sans-serif";
  const msg = allDone
    ? "atas keberhasilannya menyelesaikan seluruh misi dan menjadi Penyelamat Kota Energi!"
    : "atas partisipasinya dalam pembelajaran Energy Mission. Selesaikan semua misi untuk sertifikat penuh!";
  wrapText(ctx, msg, canvas.width / 2, 370, 700, 26);

  ctx.font = "bold 18px 'Nunito', sans-serif";
  ctx.fillText(`Skor Akhir: ${STATE.score}   |   Level: ${levelFromXP(STATE.xp)}`, canvas.width / 2, 460);
  ctx.font = "14px 'Nunito', sans-serif";
  ctx.fillText("Tanggal: " + new Date().toLocaleDateString("id-ID"), canvas.width / 2, 500);

  ctx.font = "bold 16px 'Baloo 2', sans-serif";
  ctx.fillStyle = "#E8502F";
  ctx.fillText("🌍 Energy Mission — Media Pembelajaran IPA", canvas.width / 2, 640);

  statusEl.textContent = allDone
    ? "Selamat! Sertifikatmu sudah siap diunduh."
    : `Selesaikan seluruh misi untuk membuka sertifikat penuh. (${Object.values(STATE.completed).filter(Boolean).length}/5 misi selesai)`;
  pngBtn.disabled = false; // tetap izinkan unduh draft
  pdfBtn.disabled = false;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "", lines = [];
  words.forEach(w => {
    const test = line + w + " ";
    if (ctx.measureText(test).width > maxWidth && line !== "") { lines.push(line); line = w + " "; }
    else line = test;
  });
  lines.push(line);
  lines.forEach((l, i) => ctx.fillText(l.trim(), x, y + i * lineHeight));
}

document.getElementById("btn-download-cert-png").addEventListener("click", () => {
  SoundEngine.click();
  const canvas = document.getElementById("cert-canvas");
  const link = document.createElement("a");
  link.download = "Sertifikat_Energy_Mission.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

document.getElementById("btn-download-cert-pdf").addEventListener("click", () => {
  SoundEngine.click();
  const canvas = document.getElementById("cert-canvas");
  const jpegData = canvas.toDataURL("image/jpeg", 0.92);
  const pdfBlob = buildSimplePdfFromJpeg(jpegData, canvas.width, canvas.height);
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement("a");
  link.download = "Sertifikat_Energy_Mission.pdf";
  link.href = url;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
});

/* Minimal single-image PDF builder (tanpa library eksternal) */
function buildSimplePdfFromJpeg(dataUrl, width, height) {
  const base64 = dataUrl.split(",")[1];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

  const pageW = 612, pageH = 792; // US Letter in points
  const scale = Math.min(pageW / width, pageH / height) * 0.92;
  const imgW = width * scale, imgH = height * scale;
  const x = (pageW - imgW) / 2, y = (pageH - imgH) / 2;

  const enc = new TextEncoder();
  const parts = [];
  const offsets = [];
  let currentLength = 0;
  function pushStr(str) { const b = enc.encode(str); parts.push(b); currentLength += b.length; }
  function pushBytes(b) { parts.push(b); currentLength += b.length; }
  function markOffset() { offsets.push(currentLength); }

  pushStr("%PDF-1.4\n");
  markOffset();
  pushStr(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`);
  markOffset();
  pushStr(`2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`);
  markOffset();
  pushStr(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>\nendobj\n`);
  markOffset();
  const content = `q ${imgW.toFixed(2)} 0 0 ${imgH.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm /Im0 Do Q`;
  pushStr(`4 0 obj\n<< /Length ${content.length} >>\nstream\n${content}\nendstream\nendobj\n`);
  markOffset();
  pushStr(`5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${bytes.length} >>\nstream\n`);
  pushBytes(bytes);
  pushStr(`\nendstream\nendobj\n`);
  const xrefStart = currentLength;
  let xref = "xref\n0 6\n0000000000 65535 f \n";
  offsets.forEach(off => { xref += String(off).padStart(10, "0") + " 00000 n \n"; });
  pushStr(xref);
  pushStr(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`);

  return new Blob(parts, { type: "application/pdf" });
}

/* ---------------------------------------------------------
   18. LOADING SEQUENCE
   --------------------------------------------------------- */
window.addEventListener("load", () => {
  let progress = 0;
  const fill = document.getElementById("loading-fill");
  const text = document.getElementById("loading-text");
  const msgs = ["Menyiapkan kota...", "Mengumpulkan energi...", "Memuat bank soal...", "Hampir siap..."];
  const iv = setInterval(() => {
    progress += 8 + Math.random() * 10;
    if (progress >= 100) {
      progress = 100;
      fill.style.width = "100%";
      clearInterval(iv);
      setTimeout(() => showScreen(isProfileComplete() ? "home" : "profile"), 350);
      return;
    }
    fill.style.width = progress + "%";
    text.textContent = msgs[Math.min(Math.floor(progress / 26), msgs.length - 1)];
  }, 180);
});

/* First user interaction unlocks Web Audio (browser autoplay policy) */
document.body.addEventListener("click", function unlockAudioOnce() {
  SoundEngine.click();
  document.body.removeEventListener("click", unlockAudioOnce);
}, { once: true });
