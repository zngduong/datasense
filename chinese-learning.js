/* =====================================================
   Chinese Learning Page - Main JavaScript
   ===================================================== */

// =====================================================
// DATA
// =====================================================

const CHARACTERS = [
  // HSK 1
  { char: "你", pinyin: "nǐ", meaning: "bạn, anh, chị", hsk: 1, example: "你好！(Xin chào!)" },
  { char: "好", pinyin: "hǎo", meaning: "tốt, khỏe", hsk: 1, example: "你好！(Xin chào!)" },
  { char: "我", pinyin: "wǒ", meaning: "tôi, mình", hsk: 1, example: "我是学生。(Tôi là học sinh.)" },
  { char: "是", pinyin: "shì", meaning: "là, thì", hsk: 1, example: "我是越南人。(Tôi là người Việt.)" },
  { char: "不", pinyin: "bù", meaning: "không", hsk: 1, example: "我不知道。(Tôi không biết.)" },
  { char: "在", pinyin: "zài", meaning: "ở, đang", hsk: 1, example: "我在家。(Tôi ở nhà.)" },
  { char: "人", pinyin: "rén", meaning: "người", hsk: 1, example: "他是好人。(Anh ấy là người tốt.)" },
  { char: "有", pinyin: "yǒu", meaning: "có", hsk: 1, example: "我有朋友。(Tôi có bạn bè.)" },
  { char: "他", pinyin: "tā", meaning: "anh ấy, ông ấy", hsk: 1, example: "他很好。(Anh ấy rất tốt.)" },
  { char: "这", pinyin: "zhè", meaning: "này, đây", hsk: 1, example: "这是什么？(Đây là cái gì?)" },
  { char: "大", pinyin: "dà", meaning: "lớn, to", hsk: 1, example: "这个很大。(Cái này rất lớn.)" },
  { char: "来", pinyin: "lái", meaning: "đến, lại", hsk: 1, example: "请进来。(Xin mời vào.)" },
  { char: "上", pinyin: "shàng", meaning: "trên, lên", hsk: 1, example: "桌子上面。(Trên bàn.)" },
  { char: "国", pinyin: "guó", meaning: "nước, quốc gia", hsk: 1, example: "中国 (Trung Quốc)" },
  { char: "年", pinyin: "nián", meaning: "năm", hsk: 1, example: "今年 (năm nay)" },
  { char: "她", pinyin: "tā", meaning: "cô ấy, bà ấy", hsk: 1, example: "她是我朋友。(Cô ấy là bạn tôi.)" },
  { char: "们", pinyin: "men", meaning: "chúng (số nhiều)", hsk: 1, example: "我们 (chúng tôi)" },
  { char: "中", pinyin: "zhōng", meaning: "giữa, Trung", hsk: 1, example: "中国 (Trung Quốc)" },
  { char: "说", pinyin: "shuō", meaning: "nói", hsk: 1, example: "他说中文。(Anh ấy nói tiếng Trung.)" },
  { char: "时", pinyin: "shí", meaning: "thời gian, lúc", hsk: 1, example: "几点了？(Mấy giờ rồi?)" },
  // HSK 2
  { char: "吃", pinyin: "chī", meaning: "ăn", hsk: 2, example: "我吃饭。(Tôi ăn cơm.)" },
  { char: "喝", pinyin: "hē", meaning: "uống", hsk: 2, example: "喝水 (uống nước)" },
  { char: "看", pinyin: "kàn", meaning: "xem, nhìn", hsk: 2, example: "看书 (đọc sách)" },
  { char: "走", pinyin: "zǒu", meaning: "đi, bước", hsk: 2, example: "我们走吧。(Chúng ta đi thôi.)" },
  { char: "坐", pinyin: "zuò", meaning: "ngồi", hsk: 2, example: "请坐。(Mời ngồi.)" },
  { char: "学", pinyin: "xué", meaning: "học", hsk: 2, example: "学习 (học tập)" },
  { char: "很", pinyin: "hěn", meaning: "rất", hsk: 2, example: "很好 (rất tốt)" },
  { char: "都", pinyin: "dōu", meaning: "đều, tất cả", hsk: 2, example: "我们都来了。(Chúng tôi đều đến.)" },
  { char: "也", pinyin: "yě", meaning: "cũng", hsk: 2, example: "我也是。(Tôi cũng vậy.)" },
  { char: "和", pinyin: "hé", meaning: "và, cùng", hsk: 2, example: "你和我 (bạn và tôi)" },
  { char: "的", pinyin: "de", meaning: "của (trợ từ)", hsk: 2, example: "我的书 (sách của tôi)" },
  { char: "了", pinyin: "le", meaning: "(hoàn thành, trợ từ)", hsk: 2, example: "他来了。(Anh ấy đã đến.)" },
  { char: "日", pinyin: "rì", meaning: "ngày, mặt trời", hsk: 2, example: "今日 (hôm nay)" },
  { char: "月", pinyin: "yuè", meaning: "tháng, mặt trăng", hsk: 2, example: "几月？(Tháng mấy?)" },
  { char: "水", pinyin: "shuǐ", meaning: "nước", hsk: 2, example: "喝水 (uống nước)" },
  { char: "山", pinyin: "shān", meaning: "núi", hsk: 2, example: "爬山 (leo núi)" },
  { char: "书", pinyin: "shū", meaning: "sách", hsk: 2, example: "看书 (đọc sách)" },
  { char: "车", pinyin: "chē", meaning: "xe", hsk: 2, example: "坐车 (đi xe)" },
  { char: "家", pinyin: "jiā", meaning: "nhà, gia đình", hsk: 2, example: "回家 (về nhà)" },
  { char: "朋", pinyin: "péng", meaning: "bạn bè (朋友)", hsk: 2, example: "朋友 (bạn bè)" },
  // HSK 3
  { char: "因", pinyin: "yīn", meaning: "vì, do", hsk: 3, example: "因为 (vì, bởi vì)" },
  { char: "为", pinyin: "wèi", meaning: "vì, cho", hsk: 3, example: "因为 (vì, bởi vì)" },
  { char: "所", pinyin: "suǒ", meaning: "chỗ, nơi", hsk: 3, example: "所以 (cho nên)" },
  { char: "如", pinyin: "rú", meaning: "như, giống", hsk: 3, example: "如果 (nếu)" },
  { char: "果", pinyin: "guǒ", meaning: "quả, kết quả", hsk: 3, example: "如果 (nếu)" },
  { char: "但", pinyin: "dàn", meaning: "nhưng", hsk: 3, example: "但是 (nhưng mà)" },
  { char: "虽", pinyin: "suī", meaning: "tuy, mặc dù", hsk: 3, example: "虽然 (tuy nhiên)" },
  { char: "然", pinyin: "rán", meaning: "nhiên, như vậy", hsk: 3, example: "当然 (tất nhiên)" },
  { char: "对", pinyin: "duì", meaning: "đúng, đối với", hsk: 3, example: "对不起 (xin lỗi)" },
  { char: "问", pinyin: "wèn", meaning: "hỏi", hsk: 3, example: "请问 (xin hỏi)" },
  { char: "回", pinyin: "huí", meaning: "về, trả lời", hsk: 3, example: "回家 (về nhà)" },
  { char: "先", pinyin: "xiān", meaning: "trước, trước tiên", hsk: 3, example: "先生 (ông, thầy)" },
  { char: "生", pinyin: "shēng", meaning: "sinh, sống", hsk: 3, example: "学生 (học sinh)" },
  { char: "后", pinyin: "hòu", meaning: "sau, phía sau", hsk: 3, example: "以后 (sau này)" },
  { char: "面", pinyin: "miàn", meaning: "mặt, phía", hsk: 3, example: "里面 (bên trong)" },
  { char: "门", pinyin: "mén", meaning: "cửa", hsk: 3, example: "开门 (mở cửa)" },
  { char: "手", pinyin: "shǒu", meaning: "tay", hsk: 3, example: "握手 (bắt tay)" },
  { char: "心", pinyin: "xīn", meaning: "tim, lòng", hsk: 3, example: "开心 (vui vẻ)" },
  { char: "知", pinyin: "zhī", meaning: "biết", hsk: 3, example: "知道 (biết rõ)" },
  { char: "道", pinyin: "dào", meaning: "đường, đạo, biết", hsk: 3, example: "知道 (biết rõ)" },
];

const RADICALS = [
  // Con người
  { char: "人", pinyin: "rén", meaning: "người", group: "Con người", examples: ["你", "他", "们"] },
  { char: "女", pinyin: "nǚ", meaning: "phụ nữ", group: "Con người", examples: ["她", "妈", "好"] },
  { char: "子", pinyin: "zǐ", meaning: "con, trẻ em", group: "Con người", examples: ["字", "学", "孩"] },
  { char: "王", pinyin: "wáng", meaning: "vua", group: "Con người", examples: ["玩", "现", "班"] },
  // Tự nhiên
  { char: "日", pinyin: "rì", meaning: "mặt trời, ngày", group: "Tự nhiên", examples: ["明", "时", "晴"] },
  { char: "月", pinyin: "yuè", meaning: "mặt trăng, tháng", group: "Tự nhiên", examples: ["明", "期", "朋"] },
  { char: "山", pinyin: "shān", meaning: "núi", group: "Tự nhiên", examples: ["岁", "岛", "岸"] },
  { char: "水", pinyin: "shuǐ", meaning: "nước (氵)", group: "Tự nhiên", examples: ["河", "海", "泳"] },
  { char: "火", pinyin: "huǒ", meaning: "lửa (灬)", group: "Tự nhiên", examples: ["热", "然", "灯"] },
  { char: "土", pinyin: "tǔ", meaning: "đất", group: "Tự nhiên", examples: ["地", "坐", "场"] },
  { char: "风", pinyin: "fēng", meaning: "gió", group: "Tự nhiên", examples: ["风", "飘", "飞"] },
  // Thực vật
  { char: "木", pinyin: "mù", meaning: "cây, gỗ", group: "Thực vật", examples: ["树", "桌", "杯"] },
  { char: "草", pinyin: "cǎo", meaning: "cỏ (艹)", group: "Thực vật", examples: ["花", "茶", "菜"] },
  { char: "竹", pinyin: "zhú", meaning: "tre (⺮)", group: "Thực vật", examples: ["笑", "第", "等"] },
  // Cơ thể
  { char: "手", pinyin: "shǒu", meaning: "tay (扌)", group: "Cơ thể", examples: ["打", "找", "把"] },
  { char: "口", pinyin: "kǒu", meaning: "miệng", group: "Cơ thể", examples: ["吃", "喝", "叫"] },
  { char: "心", pinyin: "xīn", meaning: "tim (忄)", group: "Cơ thể", examples: ["想", "忙", "快"] },
  { char: "目", pinyin: "mù", meaning: "mắt", group: "Cơ thể", examples: ["看", "睡", "眼"] },
  { char: "耳", pinyin: "ěr", meaning: "tai", group: "Cơ thể", examples: ["听", "聪", "取"] },
  { char: "足", pinyin: "zú", meaning: "chân (⻊)", group: "Cơ thể", examples: ["跑", "路", "跳"] },
  // Nhà cửa
  { char: "门", pinyin: "mén", meaning: "cửa", group: "Nhà cửa", examples: ["间", "问", "闹"] },
  { char: "宀", pinyin: "mián", meaning: "mái nhà", group: "Nhà cửa", examples: ["家", "安", "室"] },
  // Động vật
  { char: "马", pinyin: "mǎ", meaning: "ngựa", group: "Động vật", examples: ["妈", "骑", "驾"] },
  { char: "鸟", pinyin: "niǎo", meaning: "chim", group: "Động vật", examples: ["鸡", "鸭", "鸽"] },
  { char: "鱼", pinyin: "yú", meaning: "cá", group: "Động vật", examples: ["鲜", "鲤", "鲸"] },
  { char: "虫", pinyin: "chóng", meaning: "sâu, côn trùng", group: "Động vật", examples: ["蚂", "蜂", "蝶"] },
];

// =====================================================
// STATE
// =====================================================

const state = {
  mode: 'flashcard',
  hskFilter: 'all',
  searchQuery: '',
  currentIndex: 0,
  isFlipped: false,
  filteredChars: [],
  quizScore: { correct: 0, wrong: 0 },
  quizCurrentChar: null,
  writingChar: null,
  hanziWriter: null,
  modalWriter: null,
  blindMode: false,      // writing: ẩn bóng mờ
};

// localStorage helpers
const STORAGE_KEYS = {
  learned: 'cl_learned',
  mastered: 'cl_mastered',
  accuracy: 'cl_accuracy',
  streak: 'cl_streak',
};

function getSet(key) {
  try {
    return new Set(JSON.parse(localStorage.getItem(key)) || []);
  } catch { return new Set(); }
}

function saveSet(key, set) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

function getAccuracy() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.accuracy)) || { correct: 0, total: 0 };
  } catch { return { correct: 0, total: 0 }; }
}

function saveAccuracy(acc) {
  localStorage.setItem(STORAGE_KEYS.accuracy, JSON.stringify(acc));
}

function getStreak() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.streak)) || { count: 0, lastDate: '' };
  } catch { return { count: 0, lastDate: '' }; }
}

function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const streak = getStreak();
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (streak.lastDate === today) return;
  if (streak.lastDate === yesterday) {
    streak.count += 1;
  } else {
    streak.count = 1;
  }
  streak.lastDate = today;
  localStorage.setItem(STORAGE_KEYS.streak, JSON.stringify(streak));
}

// =====================================================
// STATS
// =====================================================

function updateStats() {
  const learned = getSet(STORAGE_KEYS.learned);
  const mastered = getSet(STORAGE_KEYS.mastered);
  const acc = getAccuracy();
  const streak = getStreak();

  document.getElementById('stat-total-learned').textContent = learned.size;
  document.getElementById('stat-mastered').textContent = mastered.size;
  document.getElementById('stat-accuracy').textContent =
    acc.total > 0 ? Math.round((acc.correct / acc.total) * 100) + '%' : '0%';
  document.getElementById('stat-streak').textContent = streak.count;
}

// =====================================================
// FILTER
// =====================================================

function filterCharacters() {
  const q = state.searchQuery.toLowerCase();
  state.filteredChars = CHARACTERS.filter(c => {
    const matchHsk = state.hskFilter === 'all' || c.hsk === parseInt(state.hskFilter);
    const matchSearch = !q || c.char.includes(q) ||
      c.pinyin.toLowerCase().includes(q) ||
      c.meaning.toLowerCase().includes(q);
    return matchHsk && matchSearch;
  });
  state.currentIndex = 0;
  renderFlashcard(0);
}

// =====================================================
// FLASHCARD
// =====================================================

function renderFlashcard(index) {
  const chars = state.filteredChars;
  if (!chars.length) return;

  const c = chars[index];
  document.getElementById('fc-char').textContent = c.char;
  document.getElementById('fc-hsk-badge').textContent = 'HSK ' + c.hsk;
  document.getElementById('fc-pinyin').textContent = c.pinyin;
  document.getElementById('fc-meaning').textContent = c.meaning;
  document.getElementById('fc-example').textContent = c.example;

  document.getElementById('fc-current').textContent = index + 1;
  document.getElementById('fc-total').textContent = chars.length;

  const pct = chars.length > 1 ? (index / (chars.length - 1)) * 100 : 100;
  document.getElementById('fc-progress-bar').style.width = pct + '%';

  // Reset flip state
  if (state.isFlipped) {
    const card = document.getElementById('flashcard');
    card.classList.remove('is-flipped');
    state.isFlipped = false;
  }
  document.getElementById('know-btns').style.display = 'none';

  // Destroy previous writer
  if (state.hanziWriter) {
    try { state.hanziWriter = null; } catch (_) {}
    const cont = document.getElementById('fc-stroke-container');
    cont.innerHTML = '';
  }
}

function flipCard() {
  const card = document.getElementById('flashcard');
  state.isFlipped = !state.isFlipped;
  card.classList.toggle('is-flipped', state.isFlipped);

  if (state.isFlipped) {
    document.getElementById('know-btns').style.display = 'flex';
    // Load stroke animation
    const c = state.filteredChars[state.currentIndex];
    if (c && typeof HanziWriter !== 'undefined') {
      const cont = document.getElementById('fc-stroke-container');
      cont.innerHTML = '';
      try {
        state.hanziWriter = HanziWriter.create(cont, c.char, {
          width: 80,
          height: 80,
          padding: 4,
          strokeColor: '#ffffff',
          outlineColor: 'rgba(255,255,255,0.3)',
          showCharacter: false,
          showOutline: true,
        });
        state.hanziWriter.animateCharacter();
      } catch (_) {}
    }
  } else {
    document.getElementById('know-btns').style.display = 'none';
  }
}

function nextCard() {
  if (state.currentIndex < state.filteredChars.length - 1) {
    state.currentIndex++;
    renderFlashcard(state.currentIndex);
  }
}

function prevCard() {
  if (state.currentIndex > 0) {
    state.currentIndex--;
    renderFlashcard(state.currentIndex);
  }
}

function markCard(known) {
  const c = state.filteredChars[state.currentIndex];
  if (!c) return;
  const learned = getSet(STORAGE_KEYS.learned);
  const mastered = getSet(STORAGE_KEYS.mastered);
  learned.add(c.char);
  if (known) {
    mastered.add(c.char);
  } else {
    mastered.delete(c.char);
  }
  saveSet(STORAGE_KEYS.learned, learned);
  saveSet(STORAGE_KEYS.mastered, mastered);
  updateStreak();
  updateStats();
  nextCard();
}

function shuffleCards() {
  for (let i = state.filteredChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [state.filteredChars[i], state.filteredChars[j]] = [state.filteredChars[j], state.filteredChars[i]];
  }
  state.currentIndex = 0;
  renderFlashcard(0);
}

// =====================================================
// RADICALS
// =====================================================

function renderRadicals() {
  const container = document.getElementById('radicals-container');
  container.innerHTML = '';

  // Group by group field
  const groups = {};
  RADICALS.forEach(r => {
    if (!groups[r.group]) groups[r.group] = [];
    groups[r.group].push(r);
  });

  Object.keys(groups).forEach(groupName => {
    const groupEl = document.createElement('div');
    groupEl.className = 'cl-radical-group';

    const title = document.createElement('h3');
    title.className = 'cl-radical-group-title';
    title.textContent = groupName;
    groupEl.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'cl-radical-grid';

    groups[groupName].forEach(r => {
      const card = document.createElement('div');
      card.className = 'cl-radical-card';
      card.innerHTML = `
        <div class="cl-radical-char">${r.char}</div>
        <div class="cl-radical-pinyin">${r.pinyin}</div>
        <div class="cl-radical-meaning">${r.meaning}</div>
        <div class="cl-radical-examples">
          ${r.examples.map(e => `<span class="cl-radical-example-char">${e}</span>`).join('')}
        </div>
      `;
      card.addEventListener('click', () => openRadicalModal(r));
      grid.appendChild(card);
    });

    groupEl.appendChild(grid);
    container.appendChild(groupEl);
  });
}

function openRadicalModal(r) {
  // Remove existing modal
  const existing = document.getElementById('radical-modal-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.className = 'cl-radical-modal-overlay';
  overlay.id = 'radical-modal-overlay';

  overlay.innerHTML = `
    <div class="cl-radical-modal">
      <button class="cl-modal-close" onclick="closeRadicalModal()">×</button>
      <div class="cl-modal-char">${r.char}</div>
      <div class="cl-modal-pinyin">${r.pinyin}</div>
      <div class="cl-modal-meaning">${r.meaning}</div>
      <div class="cl-modal-stroke-wrap" id="modal-stroke-wrap"></div>
      <div class="cl-modal-actions">
        <button class="btn btn-secondary" onclick="replayModalStroke()">▶ Xem lại</button>
        <button class="btn btn-primary" onclick="closeRadicalModal(); switchMode('writing'); loadWritingCharByChar('${r.char}')">✏️ Luyện viết</button>
      </div>
    </div>
  `;

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeRadicalModal();
  });

  document.body.appendChild(overlay);

  // Init hanzi-writer in modal
  if (typeof HanziWriter !== 'undefined') {
    try {
      if (state.modalWriter) state.modalWriter = null;
      const wrap = document.getElementById('modal-stroke-wrap');
      state.modalWriter = HanziWriter.create(wrap, r.char, {
        width: 156,
        height: 156,
        padding: 8,
        strokeColor: '#667eea',
        outlineColor: '#e2e8f0',
        showCharacter: false,
        showOutline: true,
      });
      state.modalWriter.animateCharacter();
    } catch (_) {}
  }
}

function closeRadicalModal() {
  const overlay = document.getElementById('radical-modal-overlay');
  if (overlay) overlay.remove();
  state.modalWriter = null;
}

function replayModalStroke() {
  if (state.modalWriter) {
    try { state.modalWriter.animateCharacter(); } catch (_) {}
  }
}

// =====================================================
// WRITING MODE
// =====================================================

function populateWritingSelect() {
  const select = document.getElementById('writing-char-select');
  select.innerHTML = '';
  CHARACTERS.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.char;
    opt.textContent = `${c.char}  ${c.pinyin}  ${c.meaning}`;
    select.appendChild(opt);
  });
}

function populateWritingGrid() {
  const grid = document.getElementById('writing-char-grid');
  grid.innerHTML = '';
  CHARACTERS.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'cl-writing-grid-char';
    btn.textContent = c.char;
    btn.title = `${c.pinyin} - ${c.meaning}`;
    btn.addEventListener('click', () => {
      document.getElementById('writing-char-select').value = c.char;
      loadWritingChar();
    });
    grid.appendChild(btn);
  });
}

function loadWritingChar() {
  const char = document.getElementById('writing-char-select').value;
  loadWritingCharByChar(char);
}

function loadWritingCharByChar(char) {
  const c = CHARACTERS.find(x => x.char === char);
  if (!c) return;

  state.writingChar = c;

  // Update select
  document.getElementById('writing-char-select').value = char;

  // Update info
  document.getElementById('writing-char-label').textContent = c.char;
  document.getElementById('writing-pinyin').textContent = c.pinyin;
  document.getElementById('writing-meaning').textContent = c.meaning;

  // Update grid highlight
  document.querySelectorAll('.cl-writing-grid-char').forEach(btn => {
    btn.classList.toggle('active', btn.textContent === char);
  });

  // Clear feedback
  const fb = document.getElementById('writing-feedback');
  fb.textContent = '';
  fb.className = 'cl-writing-feedback';

  // Create hanzi-writer
  createWritingCanvas(c.char);
}

function createWritingCanvas(char) {
  const canvas = document.getElementById('writing-canvas');
  canvas.innerHTML = '';
  if (typeof HanziWriter === 'undefined') return;
  try {
    state.hanziWriter = HanziWriter.create(canvas, char, {
      width: 280,
      height: 280,
      padding: 20,
      strokeColor: '#667eea',
      outlineColor: state.blindMode ? 'rgba(0,0,0,0)' : '#e2e8f0',
      showCharacter: !state.blindMode,
      showOutline: !state.blindMode,
      drawingColor: '#1e293b',
      drawingWidth: 4,
      highlightColor: '#764ba2',
    });
  } catch (_) {}
}

function toggleBlindMode() {
  state.blindMode = !state.blindMode;
  const btn = document.getElementById('blind-mode-btn');
  const icon = document.getElementById('blind-mode-icon');
  const label = document.getElementById('blind-mode-label');
  if (state.blindMode) {
    btn.classList.add('blind-active');
    icon.textContent = '🙈';
    label.textContent = 'Chế độ mù (đang bật)';
  } else {
    btn.classList.remove('blind-active');
    icon.textContent = '👁';
    label.textContent = 'Hiện bóng mờ';
  }
  // Reload canvas with new settings
  if (state.writingChar) createWritingCanvas(state.writingChar.char);
}

function animateWriting() {
  if (state.hanziWriter) {
    try { state.hanziWriter.animateCharacter(); } catch (_) {}
  }
}

function startWritingQuiz() {
  if (!state.hanziWriter || !state.writingChar) return;
  const fb = document.getElementById('writing-feedback');
  fb.textContent = 'Hãy vẽ từng nét theo thứ tự đúng!';
  fb.className = 'cl-writing-feedback';

  try {
    state.hanziWriter.quiz({
      onMistake: () => {
        fb.textContent = 'Nét chưa đúng, thử lại!';
        fb.className = 'cl-writing-feedback error';
        setTimeout(() => {
          fb.textContent = 'Hãy vẽ từng nét theo thứ tự đúng!';
          fb.className = 'cl-writing-feedback';
        }, 1500);
      },
      onCorrectStroke: (strokeNum, numStrokes) => {
        fb.textContent = `Đúng rồi! Nét ${strokeNum + 1}/${numStrokes}`;
        fb.className = 'cl-writing-feedback success';
      },
      onComplete: () => {
        fb.textContent = `Xuất sắc! Bạn đã viết đúng chữ "${state.writingChar.char}"!`;
        fb.className = 'cl-writing-feedback success';
        // Mark as learned
        const learned = getSet(STORAGE_KEYS.learned);
        learned.add(state.writingChar.char);
        saveSet(STORAGE_KEYS.learned, learned);
        updateStreak();
        updateStats();
      },
    });
  } catch (_) {}
}

function resetWriting() {
  if (state.writingChar) {
    loadWritingCharByChar(state.writingChar.char);
  }
}

// =====================================================
// QUIZ MODE
// =====================================================

function startNewQuestion() {
  const pool = state.hskFilter === 'all'
    ? CHARACTERS
    : CHARACTERS.filter(c => c.hsk === parseInt(state.hskFilter));

  if (pool.length < 4) return;

  // Pick random character
  const correct = pool[Math.floor(Math.random() * pool.length)];
  state.quizCurrentChar = correct;

  // Generate 3 distractors
  const others = pool.filter(c => c.char !== correct.char);
  const distractors = [];
  const usedIdx = new Set();
  while (distractors.length < 3) {
    const idx = Math.floor(Math.random() * others.length);
    if (!usedIdx.has(idx)) {
      usedIdx.add(idx);
      distractors.push(others[idx]);
    }
  }

  const options = [...distractors, correct].sort(() => Math.random() - 0.5);

  // Render
  document.getElementById('quiz-char').textContent = correct.char;
  document.getElementById('quiz-hsk-badge').textContent = 'HSK ' + correct.hsk;
  document.getElementById('quiz-pinyin').style.display = 'none';
  document.getElementById('quiz-result').style.display = 'none';
  document.getElementById('quiz-next-btn').style.display = 'none';

  const optContainer = document.getElementById('quiz-options');
  optContainer.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'cl-quiz-option';
    btn.textContent = opt.meaning;
    btn.addEventListener('click', () => submitAnswer(opt.char === correct.char, btn, options, correct));
    optContainer.appendChild(btn);
  });

  updateQuizScoreDisplay();
}

function submitAnswer(isCorrect, clickedBtn, options, correct) {
  // Disable all options
  document.querySelectorAll('.cl-quiz-option').forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct.meaning) btn.classList.add('correct');
  });

  if (!isCorrect) {
    clickedBtn.classList.add('wrong');
  }

  // Show pinyin hint
  document.getElementById('quiz-pinyin').textContent = correct.pinyin;
  document.getElementById('quiz-pinyin').style.display = 'block';

  // Show result
  const result = document.getElementById('quiz-result');
  if (isCorrect) {
    result.textContent = `Chính xác! "${correct.char}" nghĩa là "${correct.meaning}"`;
    result.className = 'cl-quiz-result correct';
    state.quizScore.correct++;
  } else {
    result.textContent = `Sai rồi! "${correct.char}" (${correct.pinyin}) nghĩa là "${correct.meaning}"`;
    result.className = 'cl-quiz-result wrong';
    state.quizScore.wrong++;
  }
  result.style.display = 'block';
  document.getElementById('quiz-next-btn').style.display = 'inline-flex';

  // Save to accuracy storage
  const acc = getAccuracy();
  acc.total++;
  if (isCorrect) acc.correct++;
  saveAccuracy(acc);
  updateStats();
  updateQuizScoreDisplay();
  updateStreak();
}

function nextQuestion() {
  startNewQuestion();
}

function updateQuizScoreDisplay() {
  const total = state.quizScore.correct + state.quizScore.wrong;
  document.getElementById('quiz-correct').textContent = state.quizScore.correct;
  document.getElementById('quiz-wrong').textContent = state.quizScore.wrong;
  document.getElementById('quiz-accuracy-display').textContent =
    total > 0 ? Math.round((state.quizScore.correct / total) * 100) + '%' : '—';
}

// =====================================================
// MODE SWITCHING
// =====================================================

function switchMode(mode) {
  state.mode = mode;

  // Update mode buttons
  document.querySelectorAll('.cl-mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });

  // Show/hide areas
  const areas = ['flashcard', 'radicals', 'writing', 'quiz'];
  areas.forEach(m => {
    const el = document.getElementById('mode-' + m);
    if (el) el.style.display = m === mode ? 'block' : 'none';
  });

  // Show/hide filter bar
  const filterBar = document.getElementById('filter-bar');
  filterBar.style.display = (mode === 'flashcard' || mode === 'quiz') ? 'flex' : 'none';

  // Mode-specific initialization
  if (mode === 'flashcard') {
    filterCharacters();
  } else if (mode === 'radicals') {
    renderRadicals();
  } else if (mode === 'writing') {
    populateWritingSelect();
    populateWritingGrid();
    loadWritingChar();
  } else if (mode === 'quiz') {
    state.quizScore = { correct: 0, wrong: 0 };
    updateQuizScoreDisplay();
    startNewQuestion();
  }
}

// =====================================================
// INIT
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
  // Update streak on visit
  updateStreak();
  updateStats();

  // Initial filter
  filterCharacters();

  // Mode buttons
  document.querySelectorAll('.cl-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => switchMode(btn.dataset.mode));
  });

  // HSK filter tabs
  document.querySelectorAll('.cl-hsk-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.cl-hsk-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.hskFilter = tab.dataset.hsk;
      filterCharacters();
    });
  });

  // Search
  const searchInput = document.getElementById('search-input');
  let searchTimeout;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      state.searchQuery = searchInput.value;
      filterCharacters();
    }, 250);
  });

  // Keyboard navigation for flashcard
  document.addEventListener('keydown', (e) => {
    if (state.mode !== 'flashcard') return;
    if (e.key === 'ArrowRight' || e.key === 'l') nextCard();
    if (e.key === 'ArrowLeft' || e.key === 'h') prevCard();
    if (e.key === ' ' || e.key === 'f') { e.preventDefault(); flipCard(); }
    if (e.key === 'y' && state.isFlipped) markCard(true);
    if (e.key === 'n' && state.isFlipped) markCard(false);
  });
});
