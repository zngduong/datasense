// Currency Converter — "Bảng kê ngoại tệ"

/* ------------------------------------------------------------------
   CONFIG — chỉnh tỷ giá ở đây. Mỗi loại tiền là một mảng `tiers`.
   Loại nào chỉ có một giá thì để đúng 1 tier.
   ⚠️ Số liệu dưới đây là VÍ DỤ, thay bằng biểu giá thật của quầy.
------------------------------------------------------------------- */
const CONFIG = {
    effective: "05/08/2026",
    currencies: [
        {
            code: "USD", flag: "🇺🇸", name: "Đô la Mỹ", decimals: 2,
            tiers: [
                { id: "usd_100_50", label: "100 / 50", rate: 26150 },
                { id: "usd_20_10", label: "20 / 10", rate: 25800 },
                { id: "usd_5_1", label: "5 / 2 / 1", rate: 25400 },
            ],
        },
        {
            code: "EUR", flag: "🇪🇺", name: "Euro", decimals: 2,
            tiers: [{ id: "eur_all", label: "Mọi mệnh giá", rate: 28900 }],
        },
        {
            code: "JPY", flag: "🇯🇵", name: "Yên Nhật", decimals: 0,
            tiers: [
                { id: "jpy_note", label: "Tiền giấy", rate: 172 },
                { id: "jpy_coin", label: "Tiền xu", rate: 148 },
            ],
        },
        {
            code: "TWD", flag: "🇹🇼", name: "Đài tệ", decimals: 0,
            tiers: [{ id: "twd_all", label: "Mọi mệnh giá", rate: 815 }],
        },
        {
            code: "CAD", flag: "🇨🇦", name: "Đô la Canada", decimals: 2,
            tiers: [{ id: "cad_all", label: "Mọi mệnh giá", rate: 18500 }],
        },
        {
            code: "KRW", flag: "🇰🇷", name: "Won Hàn Quốc", decimals: 0,
            tiers: [
                { id: "krw_50k_10k", label: "50.000 / 10.000", rate: 18.4 },
                { id: "krw_5k_1k", label: "5.000 / 1.000", rate: 17.1 },
            ],
        },
    ],
};

/* ---------------------------- helpers --------------------------- */
function parseAmount(s) {
    if (!s) return 0;
    const cleaned = String(s).replace(/[^0-9.,]/g, "").replace(/,/g, ".");
    const parts = cleaned.split(".");
    const norm = parts.length > 1 ? parts[0] + "." + parts.slice(1).join("") : cleaned;
    const n = parseFloat(norm);
    return isNaN(n) ? 0 : n;
}

const vnd = (n) => Math.round(n).toLocaleString("vi-VN");

const rateLabel = (r) =>
    r >= 100 ? r.toLocaleString("vi-VN") : r.toLocaleString("vi-VN", { maximumFractionDigits: 2 });

/* ---------------------------- state ---------------------------- */
const values = {}; // tierId -> raw input string
let note = "";
let noteTimeoutId = null;
let displayedTotal = 0;
let totalRAF = null;

const tierIndex = {}; // tierId -> { tier, currency }
CONFIG.currencies.forEach((currency) => {
    currency.tiers.forEach((tier) => {
        tierIndex[tier.id] = { tier, currency };
    });
});

/* ---------------------------- DOM refs --------------------------- */
const cardsContainer = document.getElementById("currencyCards");
const noteEl = document.getElementById("currencyNote");
const totalEl = document.getElementById("currencyTotal");
const btnCopy = document.getElementById("btnCopy");
const btnClear = document.getElementById("btnClear");

/* ---------------------------- rendering --------------------------- */
function buildCards() {
    cardsContainer.innerHTML = CONFIG.currencies.map((currency) => `
        <section class="cur-card" data-code="${currency.code}">
            <div class="cur-card-header">
                <span class="cur-flag">${currency.flag}</span>
                <div class="cur-info">
                    <div class="cur-code">${currency.code}</div>
                    <div class="cur-name">${currency.name}</div>
                </div>
                <div class="cur-subtotal" data-subtotal-for="${currency.code}">0 ₫</div>
            </div>
            <div class="cur-tiers">
                ${currency.tiers.map((tier) => `
                    <div class="tier-row">
                        <div class="tier-label-col">
                            <div class="tier-label" data-tier-label="${tier.id}">${tier.label}</div>
                            <div class="tier-rate">× ${rateLabel(tier.rate)}</div>
                        </div>
                        <div class="tier-input-col">
                            <div class="tier-input-wrap" data-tier-wrap="${tier.id}">
                                <span class="tier-currency-code">${currency.code}</span>
                                <input
                                    class="amt"
                                    type="text"
                                    inputmode="decimal"
                                    enterkeyhint="done"
                                    placeholder="0"
                                    data-tier-input="${tier.id}"
                                    aria-label="Số tiền ${currency.code} mệnh giá ${tier.label}"
                                >
                            </div>
                            <div class="tier-converted" data-tier-converted="${tier.id}">0 ₫</div>
                        </div>
                    </div>
                `).join("")}
            </div>
        </section>
    `).join("");
}

function updateTierDisplay(tierId) {
    const { tier } = tierIndex[tierId];
    const amount = parseAmount(values[tierId]);
    const converted = amount * tier.rate;
    const active = amount > 0;

    document.querySelector(`[data-tier-label="${tierId}"]`).classList.toggle("active", active);
    document.querySelector(`[data-tier-wrap="${tierId}"]`).classList.toggle("active", active);
    document.querySelector(`[data-tier-input="${tierId}"]`).classList.toggle("active", active);

    const convertedEl = document.querySelector(`[data-tier-converted="${tierId}"]`);
    convertedEl.textContent = `${vnd(converted)} ₫`;
    convertedEl.classList.toggle("active", active);
}

function updateSubtotal(code) {
    const currency = CONFIG.currencies.find((c) => c.code === code);
    const subtotal = currency.tiers.reduce((s, t) => s + parseAmount(values[t.id]) * t.rate, 0);
    const el = document.querySelector(`[data-subtotal-for="${code}"]`);
    el.textContent = `${vnd(subtotal)} ₫`;
    el.classList.toggle("active", subtotal > 0);
}

/* ---------------------------- totals ---------------------------- */
function computeTotal() {
    let total = 0;
    CONFIG.currencies.forEach((c) => c.tiers.forEach((t) => {
        total += parseAmount(values[t.id]) * t.rate;
    }));
    return total;
}

function computeFilledCount() {
    return CONFIG.currencies.filter((c) => c.tiers.some((t) => parseAmount(values[t.id]) > 0)).length;
}

function animateTotalTo(target) {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
        displayedTotal = target;
        totalEl.textContent = vnd(displayedTotal);
        return;
    }

    if (totalRAF) cancelAnimationFrame(totalRAF);
    const start = displayedTotal;
    const delta = target - start;
    const t0 = performance.now();

    function tick(t) {
        const p = Math.min(1, (t - t0) / 400);
        const eased = 1 - Math.pow(1 - p, 3);
        displayedTotal = start + delta * eased;
        totalEl.textContent = vnd(displayedTotal);
        if (p < 1) {
            totalRAF = requestAnimationFrame(tick);
        } else {
            displayedTotal = target;
            totalEl.textContent = vnd(displayedTotal);
        }
    }
    totalRAF = requestAnimationFrame(tick);
}

function defaultNoteText() {
    return `Biểu giá ${CONFIG.effective} · ${computeFilledCount()}/${CONFIG.currencies.length} loại`;
}

function refreshNote() {
    if (note) return;
    noteEl.textContent = defaultNoteText();
}

function showNote(text) {
    note = text;
    noteEl.textContent = text;
    if (noteTimeoutId) clearTimeout(noteTimeoutId);
    noteTimeoutId = setTimeout(() => {
        note = "";
        noteEl.textContent = defaultNoteText();
    }, 2200);
}

function refreshTotal() {
    animateTotalTo(computeTotal());
    refreshNote();
}

/* ---------------------------- actions ---------------------------- */
function clearAll() {
    const total = computeTotal();
    if (total > 0 && !window.confirm("Xoá toàn bộ số đã nhập?")) return;

    Object.keys(values).forEach((k) => delete values[k]);
    document.querySelectorAll("[data-tier-input]").forEach((input) => { input.value = ""; });
    CONFIG.currencies.forEach((currency) => {
        currency.tiers.forEach((tier) => updateTierDisplay(tier.id));
        updateSubtotal(currency.code);
    });
    refreshTotal();
    showNote("Đã xoá bảng kê");
}

async function copySheet() {
    const lines = [`BẢNG KÊ NGOẠI TỆ — tỷ giá ${CONFIG.effective}`];
    CONFIG.currencies.forEach((currency) => {
        currency.tiers.forEach((tier) => {
            const a = parseAmount(values[tier.id]);
            if (a > 0) lines.push(`${currency.code} ${tier.label}: ${a} × ${rateLabel(tier.rate)} = ${vnd(a * tier.rate)} đ`);
        });
    });
    lines.push(`TỔNG CỘNG: ${vnd(computeTotal())} đ`);
    const text = lines.join("\n");

    try {
        await navigator.clipboard.writeText(text);
        showNote("Đã sao chép bảng kê");
    } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand("copy");
            showNote("Đã sao chép bảng kê");
        } catch {
            showNote("Trình duyệt chặn sao chép — hãy chọn và chép thủ công");
        }
        document.body.removeChild(ta);
    }
}

/* ---------------------------- init ---------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    buildCards();
    noteEl.textContent = defaultNoteText();
    totalEl.textContent = vnd(0);

    cardsContainer.addEventListener("input", (e) => {
        const input = e.target;
        if (!input.matches("[data-tier-input]")) return;
        const tierId = input.dataset.tierInput;
        values[tierId] = input.value;
        updateTierDisplay(tierId);
        updateSubtotal(tierIndex[tierId].currency.code);
        refreshTotal();
    });

    btnCopy.addEventListener("click", copySheet);
    btnClear.addEventListener("click", clearAll);
});
