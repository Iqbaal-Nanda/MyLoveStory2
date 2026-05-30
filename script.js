// Counter Logic
// Tanggal jadian: 25 maret 2020
const startDate = new Date('2020-03-25T00:00:00');

function updateCounter() {
    const now = new Date();
    const difference = now.getTime() - startDate.getTime();

    // Perhitungan unit waktu dasar
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Perhitungan tahun dan bulan awal
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();

    if (months < 0 || (months === 0 && now.getDate() < startDate.getDate())) {
        years--;
        months += 12;
    }

    let totalDays = now.getDate() - startDate.getDate();
    if (totalDays < 0) {
        // PERBAIKAN: Ambil total hari dari bulan sebelum bulan 'now' yang sebenarnya
        const previousMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        totalDays += previousMonthDays;
        months--;
    }

    // Hitung minggu dan sisa hari dari total hari yang tersisa
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays % 7;

    const counterHTML = `
        <div class="time-box">
            <span class="num">${years}</span>
            <span class="text">Tahun</span>
        </div>
        <div class="time-box">
            <span class="num">${months}</span>
            <span class="text">Bulan</span>
        </div>
        <div class="time-box">
            <span class="num">${weeks}</span>
            <span class="text">Minggu</span>
        </div>
        <div class="time-box">
            <span class="num">${days}</span>
            <span class="text">Hari</span>
        </div>
        <div class="time-box">
            <span class="num">${hours.toString().padStart(2, '0')}</span>
            <span class="text">Jam</span>
        </div>
        <div class="time-box">
            <span class="num">${minutes.toString().padStart(2, '0')}</span>
            <span class="text">Menit</span>
        </div>
        <div class="time-box">
            <span class="num">${seconds.toString().padStart(2, '0')}</span>
            <span class="text">Detik</span>
        </div>
    `;

    const counterElement = document.getElementById('counter');
    if (counterElement) {
        counterElement.innerHTML = counterHTML;
    }
}

// Update counter every second
setInterval(updateCounter, 1000);
updateCounter();

// Interactive Heart Button Logic
const loveBtn = document.getElementById('loveBtn');
const floatingHearts = document.getElementById('floating-hearts');

if (loveBtn) {
    loveBtn.addEventListener('click', () => {
        createHearts(20); // Generate 20 hearts

        const originalText = loveBtn.textContent;
        loveBtn.textContent = "I Love You More! ❤️";
        loveBtn.style.transform = "scale(1.1)";

        setTimeout(() => {
            loveBtn.textContent = "Tekan Lagi";
            loveBtn.style.transform = "scale(1)";
        }, 3000);
    });
}

function createHearts(count) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('i');
        heart.classList.add('fa-solid', 'fa-heart');

        // Randomize styles for variety
        const size = Math.random() * 25 + 15; // 15px to 40px
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 3; // 3s to 6s

        heart.style.position = 'absolute';
        heart.style.bottom = '-20px';
        heart.style.left = `${left}%`;
        heart.style.fontSize = `${size}px`;

        // Mix of pinks and reds
        const colors = ['#ff4b72', '#ff8fa3', '#ff2e5b', '#ff6b8b'];
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];

        heart.style.opacity = Math.random() * 0.6 + 0.4;
        heart.style.animation = `floatUp ${animationDuration}s ease-in forwards`;
        heart.style.zIndex = '0';

        floatingHearts.appendChild(heart);

        // Remove heart element after animation completes to keep DOM clean
        setTimeout(() => {
            heart.remove();
        }, animationDuration * 1000);
    }
}

// Add animation keyframes dynamically to head
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
        50% { transform: translateY(-150px) scale(1.2) rotate(20deg); opacity: 0.8; }
        100% { transform: translateY(-300px) scale(0.5) rotate(-20deg); opacity: 0; }
    }
    
    @keyframes floatBgHeart {
        0% { transform: translateY(110vh) scale(0.5) rotate(-20deg); opacity: 0; }
        10% { opacity: 0.4; }
        90% { opacity: 0.4; }
        100% { transform: translateY(-20vh) scale(1.5) rotate(20deg); opacity: 0; }
    }
    .bg-heart {
        position: absolute;
        color: var(--primary-color);
        filter: drop-shadow(0 0 10px var(--secondary-color));
        animation: floatBgHeart linear forwards;
        z-index: -1;
    }
`;
document.head.appendChild(style);

// ----------------------------------------------------
// CONTINUOUS BACKGROUND HEARTS
// ----------------------------------------------------
const bgHeartsContainer = document.createElement('div');
bgHeartsContainer.style.position = 'fixed';
bgHeartsContainer.style.top = '0';
bgHeartsContainer.style.left = '0';
bgHeartsContainer.style.width = '100vw';
bgHeartsContainer.style.height = '100vh';
bgHeartsContainer.style.zIndex = '-1';
bgHeartsContainer.style.pointerEvents = 'none';
bgHeartsContainer.style.overflow = 'hidden';
document.body.appendChild(bgHeartsContainer);

function spawnBackgroundHeart() {
    const heart = document.createElement('i');
    heart.className = 'fa-solid fa-heart bg-heart';

    // Randomize properties
    const size = Math.random() * 25 + 10; // 10px - 35px
    const left = Math.random() * 100; // 0% - 100%
    const duration = Math.random() * 15 + 10; // 10s - 25s lambat

    heart.style.fontSize = `${size}px`;
    heart.style.left = `${left}%`;
    heart.style.animationDuration = `${duration}s`;

    // Kadang agak transparan
    heart.style.opacity = Math.random() * 0.5 + 0.2;

    bgHeartsContainer.appendChild(heart);

    // Hapus dari DOM setelah animasi selesai
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Mulai spawn setiap 1.5 detik
setInterval(spawnBackgroundHeart, 1500);

// Initial hearts saat pertama kali load
for (let i = 0; i < 15; i++) {
    setTimeout(spawnBackgroundHeart, Math.random() * 5000);
}

// Smooth scrolling dinonaktifkan di sini karena sudah di-handle penuh oleh showPage()
// untuk mencegah bentrok dan layar melompat-lompat saat ganti fitur.

// ----------------------------------------------------
// FITUR LUCU-LUCU (GOMBALAN & TOMBOL LARI)
// ----------------------------------------------------

// 1. Mantra Kangen (Gombalan Generator)
const gombalans = [
    "Website ini dibuat khusus untukmu sebagai pengingat bahwa rasa sayangku akan terus tumbuh setiap harinya.",
    "Bumi butuh matahari untuk terang, kalau aku cuma butuh kamu buat tersenyum. 🌞",
    "Kamu tahu bedanya kamu sama modem? Kalau modem connect-nya ke internet, kalau kamu ke hatiku. 💻❤️",
    "Aku rela jadi ojol, asalkan yang dianterin itu kamu ke pelaminan. 🛵👰",
    "Cintaku ke kamu itu kayak ombak 3D di background ini, nggak akan pernah berhenti! 🌊✨",
    "Kalau rindu itu bayar, aku pasti udah bangkrut dari dulu mikirin kamu. 🥺",
    "Silvi, kamu itu kayak password wifi. Bikin aku nggak mau pindah ke tempat lain. 📶💖",
    "Coba kamu hitung rasi bintang di background itu. Begitulah cintaku ke kamu, nggak bisa dihitung! 🌌",
    "Eh, jangan senyum-senyum sendiri bacanya. I love you! 😘"
];

const btnGombal = document.getElementById('btn-gombal');
const gombalText = document.getElementById('gombal-text');

if (btnGombal && gombalText) {
    btnGombal.addEventListener('click', () => {
        // Efek transisi hilang
        gombalText.style.opacity = 0;
        gombalText.style.transform = 'translateY(10px)';

        // Acak gombalan yang beda dari sebelumnya
        setTimeout(() => {
            let random;
            do {
                random = Math.floor(Math.random() * gombalans.length);
            } while (gombalText.textContent === gombalans[random]);

            gombalText.textContent = gombalans[random];

            // Efek muncul lagi
            gombalText.style.opacity = 1;
            gombalText.style.transform = 'translateY(0)';

            // Reaksi Vanta WebGL jadi cepat sebentar (Hiper-drive!)
            if (window.vantaEffect) {
                window.vantaEffect.setOptions({ waveSpeed: 3.5 });
                setTimeout(() => window.vantaEffect.setOptions({ waveSpeed: 0.85 }), 1500);
            }
        }, 300);

        createHearts(5); // Spawn sedikit love
    });
}

// 2. Tombol Lari-larian (Jangan Ditekan)
const btnRunaway = document.getElementById('btn-runaway');
if (btnRunaway) {
    let runawayCount = 0;

    const runawayAction = () => {
        runawayCount++;
        if (runawayCount > 7) {
            btnRunaway.textContent = "Ya Ampun Maksa! 😭";
        }

        const x = Math.random() * 200 - 100; // Bergerak acak X (-100 s/d 100px)
        const y = Math.random() * 100 - 50;  // Bergerak acak Y (-50 s/d 50px)

        btnRunaway.style.transform = `translate(${x}px, ${y}px) scale(0.9)`;
    };

    btnRunaway.addEventListener('mouseover', runawayAction);
    btnRunaway.addEventListener('touchstart', (e) => {
        runawayAction();
        // Hanya cegah default kalau belum ketangkep
        if (runawayCount < 10) {
            e.preventDefault();
        }
    });

    btnRunaway.addEventListener('click', () => {
        showToast("Wahahaha ketangkep juga! Emang bandel ya! I Love You! 😝❤️", "success");
        btnRunaway.style.transform = `translate(0px, 0px) scale(1)`;
        runawayCount = 0;
        btnRunaway.textContent = "Jangan Ditekan 😡";
        createHearts(25); // Ledakan love
    });
}

// ----------------------------------------------------
// MINI GAME: ARCADE CINTA
// ----------------------------------------------------

// Inject CSS untuk Game Board & Menu
const gameStyle = document.createElement('style');
gameStyle.textContent = `
    .game-card {
        width: 160px;
        padding: 20px 15px;
        text-align: center;
        cursor: pointer;
        transition: transform 0.3s;
        border: 2px solid transparent;
    }
    .game-card:hover {
        transform: translateY(-10px);
        border-color: var(--primary-color);
        box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    }
    .game-cell {
        background: rgba(255,255,255,0.05);
        border: 2px solid rgba(255,255,255,0.15);
        border-radius: 15px;
        height: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3.5rem;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        box-shadow: inset 0 0 15px rgba(0,0,0,0.2);
    }
    .game-cell:hover {
        background: rgba(255,255,255,0.15);
        transform: scale(1.05);
        border-color: var(--primary-color);
    }
    .mem-card {
        background: rgba(255,255,255,0.1);
        border: 2px solid rgba(255,255,255,0.2);
        height: 65px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        cursor: pointer;
        transition: transform 0.3s, background 0.3s;
    }
    .mem-card.flipped {
        background: var(--primary-color);
        transform: rotateY(180deg);
        border-color: white;
    }
    .mem-card.matched {
        opacity: 0.3;
        cursor: default;
        transform: scale(0.9);
    }
`;
document.head.appendChild(gameStyle);

// --- Game Menu Controller ---
window.openGame = function (gameId) {
    document.getElementById('game-menu').style.display = 'none';
    document.getElementById('active-game-container').style.display = 'block';

    // Hide all
    ['tictactoe', 'suit', 'memory', 'aim', 'calc', 'tod', 'roulette', 'quiz', 'gacha', 'mine'].forEach(id => {
        const el = document.getElementById('game-' + id);
        if (el) el.style.display = 'none';
    });

    document.getElementById('game-' + gameId).style.display = 'block';

    if (gameId === 'memory') initMemoryGame();
    if (gameId === 'mine') initMineGame();
}

window.backToMenu = function () {
    // ANTI-LAG: Bersihkan interval jika sedang berjalan
    if (window.aimInterval) clearInterval(window.aimInterval);

    document.getElementById('game-menu').style.display = 'flex';
    document.getElementById('active-game-container').style.display = 'none';
}

// --- 1. Tic-Tac-Love Logic ---

let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = '❤️'; // Iqbaal Nanda
let gameActive = true;
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6] // diagonal
];

const statusDisplay = document.getElementById('game-status');
const cells = document.querySelectorAll('.game-cell');
const resetBtnGame = document.getElementById('btn-reset-game');

function handleCellClick(e) {
    const clickedCell = e.target;
    // Cegah klik ikon di dalam div
    if (clickedCell.classList.contains('fa-heart') || clickedCell.classList.contains('fa-crown')) return;

    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameBoard[clickedIndex] !== '' || !gameActive) return;

    gameBoard[clickedIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    // Animasi pop
    clickedCell.style.transform = 'scale(1.2)';
    setTimeout(() => clickedCell.style.transform = 'scale(1)', 200);

    checkWin();
}

function checkWin() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]];
        if (a === '' || b === '' || c === '') continue;
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        let winnerName = currentPlayer === '❤️' ? 'Iqbaal Nanda' : 'Silvi';
        statusDisplay.innerHTML = `🎉 Yeay! ${winnerName} Menang! 🎉`;
        statusDisplay.style.color = '#00e676';
        showToast(`${winnerName} menang! Minta traktir jajan! 🍦`, 'success');
        gameActive = false;
        createHearts(20);
        return;
    }

    let roundDraw = !gameBoard.includes('');
    if (roundDraw) {
        statusDisplay.innerHTML = `Yah, Seri! Pelukan aja deh 🤗`;
        statusDisplay.style.color = '#f77f00';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === '❤️' ? '👑' : '❤️';
    let nextName = currentPlayer === '❤️' ? 'Iqbaal Nanda' : 'Silvi';
    statusDisplay.innerHTML = `Giliran: ${nextName} (${currentPlayer})`;
    statusDisplay.style.color = 'var(--text-light)';
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = '❤️';
    gameActive = true;
    statusDisplay.innerHTML = `Giliran: Iqbaal Nanda (❤️)`;
    statusDisplay.style.color = 'var(--text-light)';
    cells.forEach(cell => cell.innerHTML = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
if (resetBtnGame) resetBtnGame.addEventListener('click', resetGame);

// --- 2. Suit Jari Logic ---
window.playSuit = function (playerChoice) {
    const choices = ['✌️', '✊', '✋'];
    const botChoice = choices[Math.floor(Math.random() * choices.length)];

    document.getElementById('suit-player').textContent = playerChoice;
    document.getElementById('suit-player').style.transform = 'scale(1.3) rotate(-10deg)';

    document.getElementById('suit-bot').textContent = '🔄';
    document.getElementById('suit-result').textContent = 'Ayang sedang mikir...';
    document.getElementById('suit-result').style.color = 'var(--text-light)';

    setTimeout(() => {
        document.getElementById('suit-player').style.transform = 'scale(1)';
        document.getElementById('suit-bot').textContent = botChoice;
        document.getElementById('suit-bot').style.transform = 'scale(1.3) rotate(10deg)';

        setTimeout(() => document.getElementById('suit-bot').style.transform = 'scale(1)', 300);

        let result = '';
        if (playerChoice === botChoice) {
            result = 'Seri! Hati kalian sehati 💖';
            document.getElementById('suit-result').style.color = '#f77f00';
        } else if (
            (playerChoice === '✌️' && botChoice === '✋') ||
            (playerChoice === '✊' && botChoice === '✌️') ||
            (playerChoice === '✋' && botChoice === '✊')
        ) {
            result = 'Kamu Menang! Ayang harus beliin makanan! 🍕';
            document.getElementById('suit-result').style.color = '#00e676';
            createHearts(10);
            showToast('Menang euy! 🎉', 'success');
        } else {
            result = 'Ayang Menang! Kamu yang bayar kencan hari ini! 💸';
            document.getElementById('suit-result').style.color = '#ff4b72';
        }

        document.getElementById('suit-result').textContent = result;
    }, 1000);
}

// --- 3. Kartu Memori Logic ---
const memEmojis = ['🐶', '🐱', '🍔', '🍕', '🌸', '🌻', '🚗', '✈️'];
let memCards = [];
let flippedCards = [];
let matchedCount = 0;
let memMoves = 0;

window.initMemoryGame = function () {
    const board = document.getElementById('memory-board');
    if (!board) return;
    board.innerHTML = '';
    flippedCards = [];
    matchedCount = 0;
    memMoves = 0;
    document.getElementById('memory-moves').textContent = `Langkah: 0`;

    // Duplicate and shuffle
    memCards = [...memEmojis, ...memEmojis].sort(() => 0.5 - Math.random());

    memCards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'mem-card';
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.innerHTML = '❓'; // Hidden state
        card.addEventListener('click', flipMemCard);
        board.appendChild(card);
    });
}

function flipMemCard() {
    if (flippedCards.length >= 2) return; // Maksimal 2 kartu terbuka bersamaan
    if (this.classList.contains('flipped') || this.classList.contains('matched')) return;

    this.classList.add('flipped');
    this.innerHTML = this.dataset.emoji;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        memMoves++;
        document.getElementById('memory-moves').textContent = `Langkah: ${memMoves}`;
        checkMemMatch();
    }
}

function checkMemMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCount += 2;
        flippedCards = [];
        createHearts(5);
        if (matchedCount === memCards.length) {
            showToast(`Yeay! Kamu berhasil dalam ${memMoves} langkah! 🎉`);
            createHearts(25);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card1.innerHTML = '❓';
            card2.classList.remove('flipped');
            card2.innerHTML = '❓';
            flippedCards = [];
        }, 800);
    }
}

// --- 4. Tangkap Cinta (Aim Trainer) ---
let aimScore = 0;
let aimTime = 15;
let aimInterval = null;
let aimTarget = null;
const aimArea = document.getElementById('aim-area');
const aimTimeEl = document.getElementById('aim-time');
const aimScoreEl = document.getElementById('aim-score');
const aimStartBtn = document.getElementById('aim-start-btn');

if (aimStartBtn) {
    aimStartBtn.addEventListener('click', () => {
        aimStartBtn.style.display = 'none';
        aimScore = 0;
        aimTime = 15;
        aimScoreEl.textContent = aimScore;
        aimTimeEl.textContent = aimTime;
        spawnAimTarget();

        aimInterval = setInterval(() => {
            aimTime--;
            aimTimeEl.textContent = aimTime;
            if (aimTime <= 0) {
                clearInterval(aimInterval);
                if (aimTarget) aimTarget.remove();
                aimStartBtn.style.display = 'block';
                aimStartBtn.textContent = 'Main Lagi';
                showToast(`Game Over! Skor kamu: ${aimScore} klik!`, 'success');
            }
        }, 1000);
    });
}

function spawnAimTarget() {
    if (aimTarget) aimTarget.remove();

    aimTarget = document.createElement('div');
    aimTarget.innerHTML = '💖';
    aimTarget.style.position = 'absolute';
    aimTarget.style.fontSize = '3.5rem';
    aimTarget.style.cursor = 'pointer';
    aimTarget.style.userSelect = 'none';
    aimTarget.style.transition = 'transform 0.1s';

    // Size is approx 56px
    const maxX = aimArea.clientWidth - 60;
    const maxY = aimArea.clientHeight - 60;

    aimTarget.style.left = Math.max(0, Math.random() * maxX) + 'px';
    aimTarget.style.top = Math.max(0, Math.random() * maxY) + 'px';

    const hitTarget = (e) => {
        if (e) e.preventDefault();
        aimScore++;
        aimScoreEl.textContent = aimScore;
        aimTarget.style.transform = 'scale(1.5)';
        createHearts(2);
        setTimeout(spawnAimTarget, 50); // Instantly move!
    };

    aimTarget.addEventListener('mousedown', hitTarget);
    aimTarget.addEventListener('touchstart', hitTarget);

    aimArea.appendChild(aimTarget);
}

// --- 5. Kalkulator Jodoh ---
window.calculateLove = function () {
    const n1 = document.getElementById('calc-name1').value.trim().toLowerCase();
    const n2 = document.getElementById('calc-name2').value.trim().toLowerCase();

    if (!n1 || !n2) {
        showToast("Tulis nama yang bener dong!", "error");
        return;
    }

    const resultDiv = document.getElementById('calc-result');
    const percentEl = document.getElementById('calc-percent');
    const msgEl = document.getElementById('calc-msg');

    resultDiv.style.display = 'block';
    percentEl.textContent = "Menghitung...";
    percentEl.style.fontSize = '2rem';
    msgEl.textContent = "Memindai satelit NASA...";

    // Fake loading delay
    setTimeout(() => {
        let percentage = 0;
        let msg = "";

        const isIqbaal = n1.includes('iqbaal') || n2.includes('iqbaal');
        const isSilvi = n1.includes('silvi') || n2.includes('silvi');

        if (isIqbaal && isSilvi) {
            percentage = 1000000;
            msg = "WADUH! Sistem error! Tingkat kecocokan melebihi batas alam semesta! 🌌 Langsung nikah aja ini mah! 💍";
            createHearts(30);
        } else {
            // Random fake calculation
            percentage = Math.floor(Math.random() * 98) + 1;
            if (percentage < 30) msg = "Waduh, kayaknya mending cari yang lain deh... 😅";
            else if (percentage < 70) msg = "Lumayan lah, tapi masih kurang greget. 😌";
            else msg = "Wah! Cukup cocok nih! Boleh lah dicoba. 😉";
        }

        percentEl.style.fontSize = '4rem';
        percentEl.textContent = percentage === 1000000 ? "∞%" : `${percentage}%`;
        msgEl.textContent = msg;
    }, 1500);
}

// --- 6. Truth or Dare ---
const truths = [
    "Apa hal pertama yang bikin kamu naksir aku?",
    "Pernah nggak sih bohong soal hal kecil ke aku?",
    "Sebutkan 3 kebiasaanku yang paling kamu suka!",
    "Apa ketakutan terbesarmu dalam hubungan ini?",
    "Pernah cemburu tapi gengsi buat bilang?"
];
const dares = [
    "Post foto aibku di status WA/IG mu selama 1 jam!",
    "Tatap mataku selama 1 menit tanpa senyum/tertawa.",
    "Bikinin aku kopi/teh atau pesenin makanan sekarang!",
    "Telepon aku sekarang dan nyanyi lagu romantis walau fals.",
    "Cium pipi aku! (Kalau lagi jauhan, kirim VN bilang 'I Love You')."
];

window.playToD = function (type) {
    const card = document.getElementById('tod-card');
    card.style.transform = 'scale(0.8)';
    card.style.opacity = '0.5';

    setTimeout(() => {
        let array = type === 'truth' ? truths : dares;
        let random = Math.floor(Math.random() * array.length);
        card.textContent = array[random];
        card.style.transform = 'scale(1)';
        card.style.opacity = '1';
        card.style.borderColor = type === 'truth' ? '#00b4d8' : '#ff4b72';
    }, 300);
}

// --- 7. Roulette Makan ---
const makananList = ["Nasi Goreng", "Mie Ayam / Bakso", "Ayam McD/KFC", "Sushi / Ramen", "Sate Ayam", "Pecel Lele"];
let currentRotation = 0;

window.spinRoulette = function () {
    const wheel = document.getElementById('roulette-wheel');
    const result = document.getElementById('roulette-result');
    const btn = document.getElementById('btn-spin');

    btn.disabled = true;
    result.textContent = "Berputar...";

    // Putar 5 sampai 10 kali putaran penuh + random derajat
    const randomDeg = Math.floor(Math.random() * 360);
    const extraSpins = (Math.floor(Math.random() * 5) + 5) * 360;
    currentRotation += extraSpins + randomDeg;

    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        // Kalkulasi bagian mana yang kena atas (Top)
        // 1 sector = 60 derajat (karena ada 6 warna)
        const normalizedDeg = currentRotation % 360;
        // Pointers are at top, but gradient starts from top right basically.
        // Array maps to sectors reversed
        const index = Math.floor((360 - normalizedDeg) / 60) % 6;

        result.textContent = "Beli " + makananList[index] + "!";
        createHearts(10);
        btn.disabled = false;
        showToast("Masalah mau makan apa sudah terpecahkan!", "success");
    }, 3000);
}

// --- 8. Kuis Bucin ---
const quizData = [
    { q: "Siapa yang paling sering ngambek?", opts: ["Iqbaal", "Silvi", "Dua-duanya"], a: 1 },
    { q: "Siapa yang paling rakus kalau makan?", opts: ["Iqbaal", "Silvi"], a: 0 },
    { q: "Siapa yang lebih bucin?", opts: ["Iqbaal", "Silvi"], a: 0 }
];
let currentQ = 0;
let scoreQuiz = 0;

window.startQuiz = function () {
    currentQ = 0;
    scoreQuiz = 0;
    renderQuiz();
}

function renderQuiz() {
    const qEl = document.getElementById('quiz-question');
    const optsEl = document.getElementById('quiz-options');
    const statusEl = document.getElementById('quiz-status');

    if (currentQ >= quizData.length) {
        qEl.textContent = `Kuis Selesai! Skor kecocokan kalian: ${scoreQuiz}/${quizData.length}`;
        optsEl.innerHTML = `<button class="btn pulse-btn" onclick="startQuiz()" style="width:100%;">Ulang Kuis</button>`;
        statusEl.textContent = "Wah ketahuan aslinya!";
        if (scoreQuiz === quizData.length) createHearts(20);
        return;
    }

    statusEl.textContent = `Pertanyaan ${currentQ + 1} dari ${quizData.length}`;
    qEl.textContent = quizData[currentQ].q;
    optsEl.innerHTML = '';

    quizData[currentQ].opts.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.style.width = '100%';
        btn.style.textAlign = 'left';
        btn.style.background = 'rgba(255,255,255,0.1)';
        btn.textContent = opt;
        btn.onclick = () => {
            if (idx === quizData[currentQ].a) {
                scoreQuiz++;
                showToast("Benaaar! 💖", "success");
            } else {
                showToast("Salah woy! 😡", "error");
            }
            currentQ++;
            renderQuiz();
        };
        optsEl.appendChild(btn);
    });
}

// --- 9. Gacha Hadiah ---
const gachaPrizes = [
    "Tiket Nonton Bioskop Bareng 🍿",
    "Voucher Traktir Makanan Bebas 🍣",
    "Kupon Pelukan 10 Menit 🤗",
    "Bebas Marah Sehari Penuh 👑",
    "Zona Nyaman (Aku pijitin kamu!) 💆‍♀️",
    "Zonk! Cium aku dulu buat gacha lagi 💋"
];

window.openGacha = function () {
    const box = document.getElementById('gacha-box');
    const resultDiv = document.getElementById('gacha-result');
    const prizeEl = document.getElementById('gacha-prize');

    if (resultDiv.style.display === 'block') return; // already opened

    // Shake animation
    box.style.animation = 'pulse 0.1s 5 alternate';

    setTimeout(() => {
        box.style.animation = '';
        box.textContent = '🎉';

        const prize = gachaPrizes[Math.floor(Math.random() * gachaPrizes.length)];
        prizeEl.textContent = prize;
        resultDiv.style.display = 'block';
        createHearts(15);
    }, 500);
}

window.resetGacha = function () {
    document.getElementById('gacha-box').textContent = '🎁';
    document.getElementById('gacha-result').style.display = 'none';
}

// --- 10. Ranjau Hati (Minesweeper Lite) ---
let mineScore = 0;
let mineGameActive = true;

window.initMineGame = function () {
    const board = document.getElementById('mine-board');
    if (!board) return;
    board.innerHTML = '';
    mineScore = 0;
    mineGameActive = true;
    document.getElementById('mine-score').textContent = mineScore;

    let boxes = Array(16).fill('💖');
    // Taruh 4 ranjau patah hati
    for (let i = 0; i < 4; i++) boxes[i] = '💔';
    boxes.sort(() => Math.random() - 0.5);

    boxes.forEach((item, index) => {
        const btn = document.createElement('div');
        btn.className = 'mem-card';
        btn.style.background = 'rgba(255,255,255,0.05)';
        btn.innerHTML = '❓';
        btn.dataset.item = item;

        btn.onclick = function () {
            if (!mineGameActive || this.innerHTML !== '❓') return;

            this.innerHTML = this.dataset.item;
            this.style.transform = 'rotateY(180deg)';

            if (this.dataset.item === '💔') {
                this.style.background = '#ff4b72';
                showToast("Kena Ranjau Patah Hati! Game Over 😭", "error");
                mineGameActive = false;
                // Reveal all
                Array.from(board.children).forEach(c => {
                    c.innerHTML = c.dataset.item;
                    c.style.opacity = 0.5;
                });
            } else {
                this.style.background = '#00e676';
                mineScore++;
                document.getElementById('mine-score').textContent = mineScore;
                createHearts(2);
                if (mineScore === 12) {
                    showToast("Hebat! Hatimu terselamatkan sepenuhnya! 🎉💖", "success");
                    mineGameActive = false;
                    createHearts(30);
                }
            }
        };
        board.appendChild(btn);
    });
}

// ----------------------------------------------------
// TOAST NOTIFICATION SYSTEM
// ----------------------------------------------------
window.showToast = function (message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    if (!toast) return;

    toastMsg.textContent = message;

    if (type === 'error') {
        toast.style.background = 'rgba(255, 75, 114, 0.95)';
        toastIcon.className = 'fa-solid fa-circle-exclamation';
    } else {
        toast.style.background = 'rgba(0, 230, 118, 0.95)';
        toastIcon.className = 'fa-solid fa-circle-check';
    }

    toast.style.top = '30px'; // Muncul

    // Bersihkan timeout sebelumnya agar tidak ngestak
    if (window.toastTimeout) clearTimeout(window.toastTimeout);

    window.toastTimeout = setTimeout(() => {
        toast.style.top = '-100px'; // Hilang
    }, 3000);
};

// ----------------------------------------------------
// MODAL & AUTH LOGIC
// ----------------------------------------------------
const pinModal = document.getElementById('pinModal');
const btnUnlockList = document.querySelectorAll('.btn-unlock-akses');
const btnLockAkses = document.getElementById('btn-lock-akses');
const closePinModal = document.getElementById('closePinModal');
const pinInput = document.getElementById('pin-input');
const btnCheckPin = document.getElementById('btn-check-pin');
const pinError = document.getElementById('pin-error');
const adminDashboard = document.getElementById('admin-dashboard');
const uploadForm = document.getElementById('uploadForm');

// Toggle PIN modal / Lock
btnUnlockList.forEach(btn => {
    btn.addEventListener('click', () => {
        if (window.isAdmin) {
            // Proses Tutup Mode Edit (Lock)
            window.isAdmin = false;
            adminDashboard.style.display = 'none';
            const adminReelsDashboard = document.getElementById('admin-reels-dashboard');
            if (adminReelsDashboard) adminReelsDashboard.style.display = 'none';
            const adminGaleriDashboard = document.getElementById('admin-galeri-dashboard');
            if (adminGaleriDashboard) adminGaleriDashboard.style.display = 'none';

            // Kembalikan teks button ke semula
            btnUnlockList.forEach(b => {
                const origText = b.getAttribute('data-original-text');
                if (origText) b.innerHTML = origText;
                b.style.background = ''; // Kembalikan ke warna default (CSS)
                b.style.border = '';
            });

            loadGallery();
            loadReels();
            loadKoleksiGaleri();
            loadProfiles();
            const btnAddNovel = document.getElementById('btn-add-novel');
            if (btnAddNovel) btnAddNovel.style.display = 'none';
            if (typeof renderNovel === 'function') renderNovel();

            showToast("Mode Edit ditutup.");
        } else {
            // Buka Modal untuk Unlock
            pinModal.style.display = 'flex';
            pinInput.value = '';
            pinError.style.display = 'none';
        }
    });
});

// Close PIN modal
if (closePinModal) {
    closePinModal.addEventListener('click', () => {
        pinModal.style.display = 'none';
    });
}

// Close clicking outside for all modals
window.addEventListener('click', (e) => {
    if (e.target == pinModal) {
        pinModal.style.display = 'none';
    }
    if (e.target == deleteModal) {
        deleteModal.style.display = 'none';
    }
});

// Check PIN untuk Auth
window.isAdmin = false;

if (btnCheckPin) {
    btnCheckPin.addEventListener('click', () => {
        if (pinInput.value === '25032020') {
            window.isAdmin = true; // Unlock all features
            pinModal.style.display = 'none';

            // Ubah teks semua button menjadi Tutup Mode Edit
            btnUnlockList.forEach(btn => {
                btn.innerHTML = '<i class="fa-solid fa-lock-open"></i> Tutup Mode Edit';
                btn.style.background = 'rgba(255, 255, 255, 0.2)';
                btn.style.border = '1px solid rgba(255, 255, 255, 0.4)';
            });

            adminDashboard.style.display = 'block'; // Show inline dashboard
            const adminReelsDashboard = document.getElementById('admin-reels-dashboard');
            if (adminReelsDashboard) adminReelsDashboard.style.display = 'block';
            const adminGaleriDashboard = document.getElementById('admin-galeri-dashboard');
            if (adminGaleriDashboard) adminGaleriDashboard.style.display = 'block';

            loadGallery(); // Reload gallery to show trash cans
            loadReels(); // Reload reels to show trash cans
            loadKoleksiGaleri(); // Reload koleksi galeri
            loadProfiles(); // Show profile edit buttons
            const btnAddNovel = document.getElementById('btn-add-novel');
            if (btnAddNovel) btnAddNovel.style.display = 'inline-block';
            if (typeof renderNovel === 'function') renderNovel();

            showToast("Mode Edit berhasil dibuka!");
        } else {
            pinError.style.display = 'block';
        }
    });
}

// Handle Upload Form
const IMGBB_API_KEY = "a0d56b0156ab8cb6cb1775e3e0b19767"; // <-- ISI DENGAN API KEY KAMU

if (uploadForm) {
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (IMGBB_API_KEY === "MASUKKAN_API_KEY_IMGBB_DISINI") {
            alert("⚠️ Kamu belum memasukkan API Key ImgBB di dalam file script.js!");
            return;
        }

        const fileInput = document.getElementById('photo-file');
        const captionInput = document.getElementById('photo-caption');
        const submitBtn = document.getElementById('btn-submit-upload');

        if (fileInput.files.length === 0) return;

        // Siapkan data untuk ImgBB
        const formData = new FormData();
        formData.append('image', fileInput.files[0]); // ImgBB API butuh parameter bernama 'image'

        submitBtn.textContent = "Mengupload ke Cloud...";
        submitBtn.disabled = true;

        try {
            // 1. Upload ke ImgBB API
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });
            const result = await response.json();

            if (result.success) {
                const imageUrl = result.data.url; // Link gambar publik dari ImgBB
                const caption = captionInput.value;

                // 2. Simpan Data
                saveToGallery(imageUrl, caption);

                showToast('Kenangan berhasil diupload! ❤️');
                uploadForm.reset();
                loadGallery(); // Reload gallery
            } else {
                showToast("Gagal upload: " + result.error.message, 'error');
            }
        } catch (error) {
            console.error(error);
            showToast('Terjadi kesalahan koneksi internet.', 'error');
        } finally {
            submitBtn.textContent = "Upload Sekarang";
            submitBtn.disabled = false;
        }
    });
}

function saveToGallery(imageUrl, caption) {
    // Saat ini tersimpan di LocalStorage browser
    let gallery = JSON.parse(localStorage.getItem('cinta_gallery')) || [];
    gallery.unshift({ image: imageUrl, caption: caption });
    localStorage.setItem('cinta_gallery', JSON.stringify(gallery));
}

// ----------------------------------------------------
// OUR STORY CAROUSEL LOGIC
// ----------------------------------------------------
window.currentStoryIndex = 0;

// Load dynamic gallery
function loadGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    if (!galleryContainer) return;

    // Ambil data dari LocalStorage
    let items = JSON.parse(localStorage.getItem('cinta_gallery')) || [];

    galleryContainer.innerHTML = ''; // Clear loading text

    if (items.length === 0) {
        galleryContainer.innerHTML = '<div style="text-align: center; color: rgba(255,255,255,0.5);">Belum ada kenangan. Aktifkan Mode Edit.</div>';
        return;
    }

    items.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'story-polaroid carousel-item';
        // width and absolute positioning handled by CSS now for responsiveness
        div.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.6s ease, filter 0.6s ease';
        div.style.willChange = 'transform, opacity';

        // Gunakan proxy wsrv.nl untuk membypass blokir ISP (IndiHome/Telkomsel)
        const proxyUrl = "https://wsrv.nl/?url=" + encodeURIComponent(item.image) + "&w=600";

        // Tombol hapus HANYA muncul jika mode Edit/Admin sudah terbuka
        const deleteBtnHTML = window.isAdmin ? `<button class="btn-delete" style="position:absolute; top:-15px; right:-15px; z-index:10; background:rgba(255,0,0,0.9); color:white; border:none; width: 40px; height: 40px; border-radius:50%; cursor:pointer; box-shadow: 0 5px 15px rgba(255,0,0,0.5);" onclick="event.stopPropagation(); deletePhoto(${index})" title="Hapus Foto"><i class="fa-solid fa-trash"></i></button>` : '';

        div.innerHTML = `
            ${deleteBtnHTML}
            <div class="polaroid-img-wrap">
                <img src="${proxyUrl}" alt="Memory" loading="lazy">
            </div>
            <div class="polaroid-caption">
                ${item.caption}
            </div>
        `;

        galleryContainer.appendChild(div);
    });

    updateStoryCarousel();
}

window.updateStoryCarousel = function () {
    const items = document.querySelectorAll('#gallery-container .carousel-item');
    if (items.length === 0) return;
    const isMobileStory = window.matchMedia('(max-width: 768px)').matches;
    if (isMobileStory) {
        items.forEach((item) => {
            item.classList.remove('is-active', 'is-prev', 'is-next', 'is-hidden-story');
            item.style.transform = 'none';
            item.style.setProperty('--story-transform', 'none');
            item.style.zIndex = '1';
            item.style.opacity = '1';
            item.style.filter = 'none';
            item.style.pointerEvents = 'auto';
            item.onclick = null;
        });
        return;
    }
    const activeTransform = isMobileStory
        ? 'translateX(-50%) translateY(-50%) translateZ(0) scale(1)'
        : 'translateX(-50%) translateY(-50%) translateZ(60px) scale(1)';
    const prevTransform = isMobileStory
        ? 'translateX(-50%) translateY(-50%) translateZ(0) scale(0.92)'
        : 'translateX(-118%) translateY(-50%) translateZ(-30px) rotateY(10deg) scale(0.78)';
    const nextTransform = isMobileStory
        ? 'translateX(-50%) translateY(-50%) translateZ(0) scale(0.92)'
        : 'translateX(18%) translateY(-50%) translateZ(-30px) rotateY(-10deg) scale(0.78)';
    const hiddenLeftTransform = isMobileStory
        ? 'translateX(-50%) translateY(-50%) translateZ(0) scale(0.86)'
        : 'translateX(-160%) translateY(-50%) translateZ(-80px) scale(0.55)';
    const hiddenRightTransform = isMobileStory
        ? 'translateX(-50%) translateY(-50%) translateZ(0) scale(0.86)'
        : 'translateX(60%) translateY(-50%) translateZ(-80px) scale(0.55)';

    items.forEach((item, index) => {
        let diff = index - currentStoryIndex;
        if (items.length > 2) {
            const half = items.length / 2;
            if (diff > half) diff -= items.length;
            if (diff < -half) diff += items.length;
        }

        item.classList.remove('is-active', 'is-prev', 'is-next', 'is-hidden-story');
        item.style.zIndex = '1';
        item.style.opacity = '0';
        item.style.pointerEvents = 'none';
        item.style.filter = 'blur(8px)';
        item.onclick = null;

        if (isMobileStory) {
            if (diff === 0) {
                item.classList.add('is-active');
                item.style.transform = activeTransform;
                item.style.setProperty('--story-transform', activeTransform);
                item.style.zIndex = '4';
                item.style.opacity = '1';
                item.style.filter = 'blur(0px)';
                item.style.pointerEvents = 'auto';
                return;
            }

            item.classList.add('is-hidden-story');
            const transform = diff < 0 ? hiddenLeftTransform : hiddenRightTransform;
            item.style.opacity = '0';
            item.style.pointerEvents = 'none';
            item.style.filter = 'blur(0px)';
            item.style.transform = transform;
            item.style.setProperty('--story-transform', transform);
            return;
        }

        if (diff === 0) {
            // Center Item
            const transform = activeTransform;
            item.classList.add('is-active');
            item.style.transform = transform;
            item.style.setProperty('--story-transform', transform);
            item.style.zIndex = '4';
            item.style.opacity = '1';
            item.style.filter = 'blur(0px)';
            item.style.pointerEvents = 'auto';
        } else if (diff === -1) {
            // Left Item
            const transform = prevTransform;
            item.classList.add('is-prev');
            item.style.transform = transform;
            item.style.setProperty('--story-transform', transform);
            item.style.zIndex = '2';
            item.style.opacity = isMobileStory ? '0' : '0.62';
            item.style.filter = isMobileStory ? 'blur(0px)' : 'blur(1.5px)';
            item.style.pointerEvents = isMobileStory ? 'none' : 'auto';
            item.onclick = isMobileStory ? null : prevStory;
        } else if (diff === 1) {
            // Right Item
            const transform = nextTransform;
            item.classList.add('is-next');
            item.style.transform = transform;
            item.style.setProperty('--story-transform', transform);
            item.style.zIndex = '2';
            item.style.opacity = isMobileStory ? '0' : '0.62';
            item.style.filter = isMobileStory ? 'blur(0px)' : 'blur(1.5px)';
            item.style.pointerEvents = isMobileStory ? 'none' : 'auto';
            item.onclick = isMobileStory ? null : nextStory;
        } else {
            // Hidden Items
            item.classList.add('is-hidden-story');
            const transform = diff < 0
                ? hiddenLeftTransform
                : hiddenRightTransform;
            item.style.transform = transform;
            item.style.setProperty('--story-transform', transform);
        }
    });
}

window.addEventListener('resize', () => {
    clearTimeout(window.storyResizeTimer);
    window.storyResizeTimer = setTimeout(() => {
        if (typeof updateStoryCarousel === 'function') updateStoryCarousel();
    }, 150);
});

window.nextStory = function () {
    const items = JSON.parse(localStorage.getItem('cinta_gallery')) || [];
    if (items.length > 0) {
        currentStoryIndex = (currentStoryIndex + 1) % items.length;
        updateStoryCarousel();
    }
}

window.prevStory = function () {
    const items = JSON.parse(localStorage.getItem('cinta_gallery')) || [];
    if (items.length > 0) {
        currentStoryIndex = (currentStoryIndex - 1 + items.length) % items.length;
        updateStoryCarousel();
    }
}

// Fungsi Hapus Foto dengan Custom Pop-Up
const deleteModal = document.getElementById('deleteModal');
const btnCancelDelete = document.getElementById('btn-cancel-delete');
const btnConfirmDelete = document.getElementById('btn-confirm-delete');
let photoIndexToDelete = null;

window.deletePhoto = function (index) {
    if (!window.isAdmin) return; // Keamanan ganda
    photoIndexToDelete = index;

    document.getElementById('delete-modal-title').textContent = "Hapus Kenangan?";
    document.getElementById('delete-modal-desc').textContent = "Kamu yakin ingin menghapus momen ini selamanya?";

    if (deleteModal) deleteModal.style.display = 'flex';
};

// Event listener batal hapus
if (btnCancelDelete) {
    btnCancelDelete.addEventListener('click', () => {
        deleteModal.style.display = 'none';
        photoIndexToDelete = null;
    });
}

// Event listener konfirmasi hapus (Bisa hapus foto galeri atau reset foto profil)
if (btnConfirmDelete) {
    btnConfirmDelete.addEventListener('click', () => {
        if (photoIndexToDelete !== null) {
            if (typeof photoIndexToDelete === 'string') {
                // Berarti ini string nama person ('Iqbaal Nanda' atau 'Silvi')
                localStorage.removeItem(`cinta_profile_${photoIndexToDelete}`);
                loadProfiles();
                showToast(`Foto profil berhasil direset!`);
            } else {
                // Berarti ini angka index array galeri
                let gallery = JSON.parse(localStorage.getItem('cinta_gallery')) || [];
                gallery.splice(photoIndexToDelete, 1);
                localStorage.setItem('cinta_gallery', JSON.stringify(gallery));

                if (currentStoryIndex >= gallery.length) {
                    currentStoryIndex = Math.max(0, gallery.length - 1);
                }

                loadGallery(); // Reload galeri
                showToast("Kenangan berhasil dihapus!");
            }

            deleteModal.style.display = 'none';
            photoIndexToDelete = null;
        }
    });
}

// Initialize gallery loading
document.addEventListener('DOMContentLoaded', loadGallery);

/* -----------------------------------------
   Gen Z 8D/3D Animation Logics
----------------------------------------- */

// 1. Mouse Aura Glow
const cursorGlow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    // Gunakan requestAnimationFrame agar animasinya super smooth (60fps)
    requestAnimationFrame(() => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
});

document.addEventListener('mousedown', () => {
    cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.3)';
    cursorGlow.style.background = 'radial-gradient(circle, rgba(139, 34, 255, 0.25) 0%, rgba(255, 75, 114, 0.15) 40%, rgba(0,0,0,0) 70%)';
});

document.addEventListener('mouseup', () => {
    cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorGlow.style.background = 'radial-gradient(circle, rgba(255, 75, 114, 0.15) 0%, rgba(139, 34, 255, 0.1) 40%, rgba(0,0,0,0) 70%)';
});

// 2. Scroll Reveal Animations (Elemen muncul dari bawah saat di-scroll)
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); // Jalankan sekali saat load

window.vantaEffect = null;

// 3. Vanta.js 3D WebGL Background (Rasi Bintang 3D Estetik)
if (window.VANTA) {
    window.vantaEffect = VANTA.NET({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: true,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xff2e5b, // Warna garis & titik
        backgroundColor: 0x1a0b2e, // Warna latar
        points: 14.00,
        maxDistance: 24.00,
        spacing: 18.00,
        showDots: true
    });
}

// ----------------------------------------------------
// THEME SWITCHER LOGIC
// ----------------------------------------------------
const themes = {
    pink: { primary: '#ff4b72', secondary: '#ff8fa3', vantaColor: 0xff2e5b, vantaBg: 0x1a0b2e },
    ocean: { primary: '#00b4d8', secondary: '#90e0ef', vantaColor: 0x90e0ef, vantaBg: 0x001d3d },
    sunset: { primary: '#f77f00', secondary: '#fcbf49', vantaColor: 0xfcbf49, vantaBg: 0x370617 },
    emerald: { primary: '#2a9d8f', secondary: '#e9c46a', vantaColor: 0xe9c46a, vantaBg: 0x013a20 }
};

window.applyTheme = function (themeName) {
    const theme = themes[themeName];
    if (!theme) return;

    // Update CSS Variables
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--secondary-color', theme.secondary);

    // Update Vanta 3D Background Color
    if (window.vantaEffect) {
        window.vantaEffect.setOptions({
            color: theme.vantaColor,
            backgroundColor: theme.vantaBg
        });
    }

    // Update Buttons UI
    document.querySelectorAll('.theme-btn').forEach(btn => {
        if (btn.dataset.theme === themeName) {
            btn.style.border = '2px solid white';
        } else {
            btn.style.border = 'none';
        }
    });

    localStorage.setItem('cinta_theme', themeName);
};

document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        applyTheme(btn.dataset.theme);
        showToast("Tema berhasil diubah!", "success");
    });
});

const savedTheme = localStorage.getItem('cinta_theme') || 'pink';
applyTheme(savedTheme);

// ----------------------------------------------------
// LOGIC PROFILE PICTURES
// ----------------------------------------------------

window.loadProfiles = function () {
    let urlIqbaal = localStorage.getItem('cinta_profile_iqbaal');
    let urlSilvi = localStorage.getItem('cinta_profile_silvi');

    const imgA = document.getElementById('img-profile-iqbaal');
    const imgS = document.getElementById('img-profile-silvi');

    if (urlIqbaal) {
        imgA.src = "https://wsrv.nl/?url=" + encodeURIComponent(urlIqbaal) + "&w=400";
        imgA.style.display = 'block';
    } else {
        imgA.style.display = 'none';
    }

    if (urlSilvi) {
        imgS.src = "https://wsrv.nl/?url=" + encodeURIComponent(urlSilvi) + "&w=400";
        imgS.style.display = 'block';
    } else {
        imgS.style.display = 'none';
    }

    // Toggle Tombol Edit Profil
    document.querySelectorAll('.btn-edit-profile, .btn-delete-profile').forEach(btn => {
        btn.style.display = window.isAdmin ? 'flex' : 'none';
    });
};

window.uploadProfile = async function (input, person) {
    if (input.files.length === 0) return;

    const imgElement = document.getElementById(`img-profile-${person}`);
    const originalSrc = imgElement.src;
    imgElement.src = 'https://placehold.co/400x400/333333/white?text=Uploading...';
    imgElement.style.display = 'block';

    const formData = new FormData();
    formData.append('image', input.files[0]);

    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: 'POST',
            body: formData
        });
        const result = await response.json();

        if (result.success) {
            localStorage.setItem(`cinta_profile_${person}`, result.data.url);
            loadProfiles();
            showToast("Foto profil berhasil diubah!");
        } else {
            showToast("Gagal upload: " + result.error.message, 'error');
            imgElement.src = originalSrc;
        }
    } catch (error) {
        showToast("Terjadi kesalahan jaringan.", 'error');
        imgElement.src = originalSrc;
    }
};

window.deleteProfile = function (person) {
    photoIndexToDelete = person; // simpan nama person ke variabel global

    document.getElementById('delete-modal-title').textContent = "Reset Profil?";
    document.getElementById('delete-modal-desc').textContent = "Yakin ingin menghapus foto ini dan kembali ke ikon bawaan?";

    if (deleteModal) deleteModal.style.display = 'flex';
};

// Initialize Dummy Data if completely empty
function initDummyData() {
    // 1. Our Story (cinta_gallery)
    if (!localStorage.getItem('cinta_gallery_initialized')) {
        let storyDummy = [
            { image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800", caption: "Pertemuan Pertama Kita ❤️" },
            { image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800", caption: "Kencan di Taman Bunga" },
            { image: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=800", caption: "Merayakan Ulang Tahunmu 🎂" }
        ];
        localStorage.setItem('cinta_gallery', JSON.stringify(storyDummy));
        localStorage.setItem('cinta_gallery_initialized', 'true');
    }

    // 2. Reels (cinta_reels)
    if (!localStorage.getItem('cinta_reels_initialized')) {
        let reelsDummy = [
            { url: "https://youtube.com/shorts/3iV_W4_11fQ", caption: "Kenangan Pendek yang Manis" }
        ];
        localStorage.setItem('cinta_reels', JSON.stringify(reelsDummy));
        localStorage.setItem('cinta_reels_initialized', 'true');
    }

    // 3. Galeri Foto (cinta_koleksi_galeri)
    if (!localStorage.getItem('cinta_koleksi_galeri_initialized')) {
        let galeriDummy = [
            { image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600", caption: "" },
            { image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600", caption: "" },
            { image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600", caption: "" },
            { image: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=600", caption: "" },
            { image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=600", caption: "" }
        ];
        localStorage.setItem('cinta_koleksi_galeri', JSON.stringify(galeriDummy));
        localStorage.setItem('cinta_koleksi_galeri_initialized', 'true');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initDummyData();
    window.reelsData = JSON.parse(localStorage.getItem('cinta_reels')) || [];
    loadProfiles();
    loadGallery(); // Our Story
    loadReels();
    loadKoleksiGaleri(); // Koleksi Galeri
    if (typeof renderNovel === 'function') renderNovel();
});

// ----------------------------------------------------
// BUKU NOVEL CINTA (3D FLIP BOOK)
// ----------------------------------------------------
const bookStyle = document.createElement('style');
bookStyle.textContent = `
    .book-scaler {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 320px;
        transition: transform 0.8s ease;
    }
    .book {
        position: relative;
        width: 320px;
        height: 450px;
        perspective: 2500px;
        transform-style: preserve-3d;
        transition: transform 0.8s ease;
    }
    .book-leaf {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0; left: 0;
        transform-origin: left center;
        transform-style: preserve-3d;
        transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .book-leaf .page {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        background: #fdfaf6;
        color: #333;
        padding: 20px;
        display: flex;
        flex-direction: column;
    }
    .book-leaf .page.front {
        transform: rotateY(0deg);
        border-radius: 5px 15px 15px 5px;
        box-shadow: inset 2px 0 10px rgba(0,0,0,0.1), 0 0 5px rgba(0,0,0,0.2);
        border: 1px solid #e0d4c8;
    }
    .book-leaf .page.back {
        transform: rotateY(180deg);
        border-radius: 15px 5px 5px 15px;
        box-shadow: inset -2px 0 10px rgba(0,0,0,0.1), 0 0 5px rgba(0,0,0,0.2);
        border: 1px solid #e0d4c8;
    }
    .book-leaf .page.cover {
        background: linear-gradient(135deg, var(--bg-gradient-1, #1a0b2e), var(--primary-color));
        color: white;
        justify-content: center;
        align-items: center;
        text-align: center;
        border: 2px solid var(--secondary-color);
        box-shadow: inset 4px 0 20px rgba(0,0,0,0.5);
    }
    .book-leaf .page.back.cover {
        box-shadow: inset -4px 0 20px rgba(0,0,0,0.5);
    }
    .book-page img {
        width: 100%;
        height: 180px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 15px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    .book-text {
        font-size: 0.9rem;
        line-height: 1.6;
        flex-grow: 1;
        overflow-y: auto;
        font-family: 'Georgia', serif;
        white-space: pre-wrap;
    }
    .page-num {
        text-align: center;
        font-size: 0.8rem;
        color: #999;
        margin-top: 10px;
        border-top: 1px dashed #ccc;
        padding-top: 5px;
    }
    .delete-page-btn {
        position: absolute;
        top: 10px; right: 10px;
        background: #ff4b72;
        color: white;
        border: none;
        width: 30px; height: 30px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 100;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    }
    .book-nav-btn {
        background: rgba(255,255,255,0.1);
        width: 45px; height: 45px;
        border-radius: 50%;
        display: flex; justify-content: center; align-items: center;
        border: 1px solid rgba(255,255,255,0.3);
        z-index: 10;
        cursor: pointer;
    }
    .book-nav-btn:hover { background: var(--primary-color); }
    @media(max-width: 768px) {
        .book-scaler {
            --book-scale: min(1, calc((100vw - 24px) / 320));
            width: 320px;
            height: calc(450px * var(--book-scale));
            transform: scale(var(--book-scale));
            transform-origin: top center;
        }
        .book-scaler.open-mobile {
        }
        .book-scaler.open-mobile .book-leaf .page {
            padding: 16px;
        }
        .book-scaler.open-mobile .book-page img {
            height: 135px;
            margin-bottom: 12px;
        }
        .book-scaler.open-mobile .book-text {
            font-size: 1.45rem;
            line-height: 1.35;
        }
        .book-scaler.open-mobile .page-num {
            font-size: 1rem;
            margin-top: 6px;
        }
    }
    @media(max-width: 400px) {
        .book-scaler {
            --book-scale: calc((100vw - 18px) / 320);
            width: 320px;
            height: calc(450px * var(--book-scale));
            transform: scale(var(--book-scale));
            transform-origin: top center;
        }
        .book-scaler.open-mobile {
        }
        .book-scaler.open-mobile .book-text {
            font-size: 1.55rem;
        }
    }
`;
document.head.appendChild(bookStyle);

const defaultNovel = [
    {
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600",
        text: "Bab 1: Awal Bertemu\\n\\nSemuanya dimulai dari ketidaksengajaan. Tatapan pertama yang canggung, dan senyum malu-malu yang disembunyikan. Siapa sangka dari obrolan singkat hari itu, kita menemukan tempat paling nyaman untuk pulang."
    },
    {
        image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600",
        text: "Bab 2: Senyum Pertama\\n\\nHari itu kita pergi berdua untuk pertama kalinya. Meski awalnya kaku, tapi tawa kita akhirnya memecah keheningan. Di titik itulah aku tahu, aku jatuh cinta dan ingin melihat senyum itu setiap hari."
    },
    {
        image: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=600",
        text: "Bab 3: Melangkah Bersama\\n\\nBanyak rintangan yang telah kita lewati, tapi tangan kita tak pernah melepaskan genggaman. Terima kasih sudah bertahan, bersabar, dan mau terus belajar menjadi yang terbaik untuk cerita kita."
    }
];

let novelData = JSON.parse(localStorage.getItem('cinta_novel')) || defaultNovel;
let currentNovelPage = 0;
let mobileNovelTurnDirection = 'next';
let mobileNovelOpenTimer = null;
let mobileNovelPendingPage = null;
let mobileNovelIsTurning = false;

window.renderNovel = function () {
    const book = document.getElementById('novel-book');
    if (!book) return;
    book.innerHTML = '';

    let pages = [];

    // Page 0: Front Cover
    pages.push({
        type: 'cover',
        content: `<i class="fa-solid fa-book-heart" style="font-size: 4rem; margin-bottom:20px;"></i><h2 style="font-family:'Dancing Script', cursive; font-size:2.5rem; text-shadow:0 0 10px rgba(0,0,0,0.5);">Perjalanan<br>Cinta Kita</h2><p style="margin-top:30px; font-size:0.9rem; opacity:0.8; border-top: 1px solid rgba(255,255,255,0.3); padding-top:10px;">Buka buku untuk membaca.</p>`
    });

    // Page 1: Inside Front Cover
    pages.push({
        type: 'content',
        content: `<div style="display:flex; height:100%; justify-content:center; align-items:center; text-align:center; opacity:0.5; font-family:'Dancing Script', cursive; font-size:2rem;">Untukmu...</div>`
    });

    novelData.forEach((item, i) => {
        const proxyUrl = "https://wsrv.nl/?url=" + encodeURIComponent(item.image);
        const displayBtn = window.isAdmin ? 'flex' : 'none';
        const actions = `<div style="display:${displayBtn}; gap: 5px; position:absolute; top:10px; right:10px; z-index:100;">
            <button onclick="editNovelPage(${i})" title="Edit Halaman" style="background:#00e676; border:none; color:white; width:30px; height:30px; border-radius:50%; cursor:pointer; box-shadow:0 4px 10px rgba(0,0,0,0.3);"><i class="fa-solid fa-pen"></i></button>
            <button onclick="deleteNovelPage(${i})" title="Hapus Halaman" style="background:#ff4b72; border:none; color:white; width:30px; height:30px; border-radius:50%; cursor:pointer; box-shadow:0 4px 10px rgba(0,0,0,0.3);"><i class="fa-solid fa-trash"></i></button>
        </div>`;

        pages.push({
            type: 'content',
            content: `${actions}<div class="book-page" style="position:relative; width:100%; height:100%; padding:0; box-shadow:none; border:none; background:transparent;"><img src="${proxyUrl}" alt="Chapter ${i + 1}"><div class="book-text">${item.text.replace(/\\n/g, '<br>')}</div><div class="page-num">- Halaman ${i + 1} -</div></div>`
        });
    });

    if (pages.length % 2 !== 0) {
        pages.push({
            type: 'content',
            content: `<div style="display:flex; height:100%; justify-content:center; align-items:center; text-align:center; opacity:0.5;">Halaman Kosong</div>`
        });
    }

    pages.push({
        type: 'content',
        content: `<div style="display:flex; height:100%; justify-content:center; align-items:center; text-align:center; opacity:0.5; font-family:'Dancing Script', cursive; font-size:1.5rem;">Selesai.</div>`
    });

    pages.push({
        type: 'cover',
        content: `<i class="fa-solid fa-heart" style="font-size:3rem; margin-bottom:20px;"></i><h2 style="font-family:'Dancing Script', cursive; font-size:3rem;">Tamat</h2><p style="margin-top:20px; font-size:0.9rem;">(Bersambung di kehidupan nyata...)</p>`
    });
    window.novelFlatPages = pages;

    const totalLeaves = Math.ceil(pages.length / 2);
    book.dataset.leaves = totalLeaves;

    for (let i = 0; i < totalLeaves; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'book-leaf';
        leaf.id = 'leaf-' + i;
        leaf.style.zIndex = totalLeaves - i;

        const frontPage = pages[i * 2];
        const frontDiv = document.createElement('div');
        frontDiv.className = 'page front ' + (frontPage.type === 'cover' ? 'cover' : '');
        frontDiv.innerHTML = frontPage.content;

        const backPage = pages[i * 2 + 1];
        const backDiv = document.createElement('div');
        backDiv.className = 'page back ' + (backPage && backPage.type === 'cover' ? 'cover' : '');
        backDiv.innerHTML = backPage ? backPage.content : '';

        leaf.appendChild(frontDiv);
        leaf.appendChild(backDiv);
        book.appendChild(leaf);
    }

    updateBookTransform();

    for (let i = 0; i < currentNovelPage; i++) {
        const leaf = document.getElementById('leaf-' + i);
        if (leaf) {
            leaf.style.transform = 'rotateY(-180deg)';
            leaf.style.zIndex = i + 1;
        }
    }
}

function updateBookTransform() {
    const book = document.getElementById('novel-book');
    const scaler = document.querySelector('.book-scaler');
    if (!book || !scaler) return;

    const totalLeaves = parseInt(book.dataset.leaves);

    if (currentNovelPage === 0) {
        book.style.transform = 'translateX(0)';
        scaler.classList.remove('open-mobile');
    } else if (currentNovelPage >= totalLeaves) {
        book.style.transform = 'translateX(100%)';
        scaler.classList.remove('open-mobile');
    } else {
        book.style.transform = 'translateX(50%)';
        scaler.classList.add('open-mobile');
    }
    renderMobileNovelSpread();
}

function renderMobileNovelSpread() {
    const spread = document.getElementById('mobile-novel-spread');
    const scaler = document.querySelector('.book-scaler');
    const pages = window.novelFlatPages || [];
    if (!spread || !scaler || pages.length === 0) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const book = document.getElementById('novel-book');
    const totalLeaves = book ? parseInt(book.dataset.leaves) : 0;
    const isOpen = currentNovelPage > 0 && currentNovelPage < totalLeaves;

    if (!isMobile || !isOpen) {
        if (mobileNovelOpenTimer) {
            clearTimeout(mobileNovelOpenTimer);
            mobileNovelOpenTimer = null;
        }
        spread.innerHTML = '';
        spread.classList.remove('active', 'opening', 'turn-open', 'turn-next', 'turn-prev');
        return;
    }

    const leftPage = pages[currentNovelPage * 2] || { content: '' };
    const rightPage = pages[currentNovelPage * 2 + 1] || { content: '' };
    spread.innerHTML = `
        <div class="mobile-novel-page">${leftPage.content}</div>
        <div class="mobile-novel-page">${rightPage.content}</div>
    `;
    spread.classList.remove('turn-open', 'turn-next', 'turn-prev');

    if (mobileNovelTurnDirection === 'open') {
        spread.classList.remove('active');
        spread.classList.add('opening');
        if (mobileNovelOpenTimer) clearTimeout(mobileNovelOpenTimer);
        mobileNovelOpenTimer = setTimeout(() => {
            spread.classList.remove('opening');
            spread.classList.add('active', 'turn-open');
        }, 520);
        return;
    }

    spread.classList.add('active');
    void spread.offsetWidth;
    spread.classList.add('turn-open');
}

window.addEventListener('resize', () => {
    if (typeof renderMobileNovelSpread === 'function') renderMobileNovelSpread();
});

window.nextNovelPage = function () {
    const book = document.getElementById('novel-book');
    if (!book) return;
    const totalLeaves = parseInt(book.dataset.leaves);

    if (window.matchMedia('(max-width: 768px)').matches && currentNovelPage > 0 && currentNovelPage < totalLeaves) {
        if (mobileNovelIsTurning) return;
        if (currentNovelPage < totalLeaves) {
            animateMobileNovelTurn(currentNovelPage + 1, 'next');
        } else {
            showToast("Ini halaman terakhir sayang!", "error");
        }
        return;
    }

    if (currentNovelPage < totalLeaves) {
        mobileNovelTurnDirection = currentNovelPage === 0 ? 'open' : 'next';
        const leaf = document.getElementById('leaf-' + currentNovelPage);
        if (leaf) {
            leaf.style.transform = 'rotateY(-180deg)';
            leaf.style.zIndex = currentNovelPage + 1;
            currentNovelPage++;
            updateBookTransform();
        }
    } else {
        showToast("Ini halaman terakhir sayang!", "error");
    }
}

window.prevNovelPage = function () {
    const book = document.getElementById('novel-book');
    const totalLeaves = book ? parseInt(book.dataset.leaves) : 0;
    if (window.matchMedia('(max-width: 768px)').matches && currentNovelPage > 0 && currentNovelPage < totalLeaves) {
        if (mobileNovelIsTurning) return;
        animateMobileNovelTurn(currentNovelPage - 1, 'prev');
        return;
    }

    if (currentNovelPage > 0) {
        mobileNovelTurnDirection = 'prev';
        currentNovelPage--;
        const leaf = document.getElementById('leaf-' + currentNovelPage);
        const book = document.getElementById('novel-book');
        const totalLeaves = parseInt(book.dataset.leaves);
        if (leaf) {
            leaf.style.transform = 'rotateY(0deg)';
            leaf.style.zIndex = totalLeaves - currentNovelPage;
            updateBookTransform();
        }
    }
}

function animateMobileNovelTurn(nextPage, direction) {
    const spread = document.getElementById('mobile-novel-spread');
    const book = document.getElementById('novel-book');
    if (!spread || !book) return;
    const totalLeaves = parseInt(book.dataset.leaves);
    if (nextPage < 0 || nextPage > totalLeaves) return;

    mobileNovelIsTurning = true;
    mobileNovelTurnDirection = direction;
    mobileNovelPendingPage = nextPage;
    spread.classList.remove('page-turn-next', 'page-turn-prev', 'turn-open', 'turn-next', 'turn-prev');
    void spread.offsetWidth;
    spread.classList.add(direction === 'prev' ? 'page-turn-prev' : 'page-turn-next');

    setTimeout(() => {
        currentNovelPage = mobileNovelPendingPage;
        mobileNovelPendingPage = null;
        if (direction === 'next') {
            const leaf = document.getElementById('leaf-' + (currentNovelPage - 1));
            if (leaf) {
                leaf.style.transform = 'rotateY(-180deg)';
                leaf.style.zIndex = currentNovelPage + 1;
            }
        } else {
            const leaf = document.getElementById('leaf-' + currentNovelPage);
            if (leaf) {
                leaf.style.transform = 'rotateY(0deg)';
                leaf.style.zIndex = totalLeaves - currentNovelPage;
            }
        }
        spread.classList.remove('page-turn-next', 'page-turn-prev');
        updateBookTransform();
        mobileNovelIsTurning = false;
    }, 430);
}

window.deleteNovelPage = function (index) {
    if (confirm("Yakin ingin merobek (menghapus) halaman ini dari buku?")) {
        novelData.splice(index, 1);
        localStorage.setItem('cinta_novel', JSON.stringify(novelData));
        currentNovelPage = 0;
        renderNovel();
        showToast("Halaman berhasil dirobek!", "success");
    }
}

// Modal Logic
let editingNovelIndex = null;
const novelModal = document.getElementById('novelModal');
const btnAddNovel = document.getElementById('btn-add-novel');
const btnCancelNovel = document.getElementById('btn-novel-cancel');
const btnSubmitNovel = document.getElementById('btn-novel-submit');

if (btnAddNovel) {
    btnAddNovel.onclick = () => {
        editingNovelIndex = null;
        document.getElementById('novel-modal-title').textContent = "Tulis Cerita Baru";
        document.getElementById('novel-modal-desc').textContent = "Halaman ini akan diletakkan setelah halaman terakhir yang sudah ada.";
        document.getElementById('novel-file').required = true;
        document.getElementById('novel-file').value = '';
        document.getElementById('novel-text').value = '';
        novelModal.style.display = 'flex';
    };
}

window.editNovelPage = function (index) {
    editingNovelIndex = index;
    const item = novelData[index];

    document.getElementById('novel-modal-title').textContent = "Edit Halaman Cerita";
    document.getElementById('novel-modal-desc').textContent = "Biarkan foto kosong jika tidak ingin mengubah foto sebelumnya.";
    document.getElementById('novel-file').required = false; // Foto tidak wajib jika hanya ubah teks
    document.getElementById('novel-text').value = item.text.replace(/<br>/g, '\\n');

    novelModal.style.display = 'flex';
}

if (btnCancelNovel) btnCancelNovel.onclick = () => novelModal.style.display = 'none';

if (btnSubmitNovel) {
    btnSubmitNovel.onclick = async () => {
        const fileInput = document.getElementById('novel-file');
        const textInput = document.getElementById('novel-text');

        if (!textInput.value) {
            showToast("Harap tulis ceritanya!", "error");
            return;
        }

        if (editingNovelIndex === null && !fileInput.files[0]) {
            showToast("Harap pilih foto untuk cerita baru!", "error");
            return;
        }

        btnSubmitNovel.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...';
        btnSubmitNovel.disabled = true;

        try {
            let imageUrl = null;

            if (fileInput.files[0]) {
                const formData = new FormData();
                formData.append("image", fileInput.files[0]);

                const response = await fetch('https://api.imgbb.com/1/upload?key=' + IMGBB_API_KEY, {
                    method: "POST",
                    body: formData
                });
                const data = await response.json();

                if (data.success) {
                    imageUrl = data.data.url;
                } else {
                    throw new Error("Upload gagal");
                }
            }

            if (editingNovelIndex !== null) {
                // Edit mode
                novelData[editingNovelIndex].text = textInput.value;
                if (imageUrl) {
                    novelData[editingNovelIndex].image = imageUrl;
                }
                showToast("Halaman berhasil diperbarui!", "success");
            } else {
                // Add mode
                novelData.push({
                    image: imageUrl,
                    text: textInput.value
                });
                showToast("Halaman baru berhasil ditulis!", "success");
            }

            localStorage.setItem('cinta_novel', JSON.stringify(novelData));

            fileInput.value = '';
            textInput.value = '';
            novelModal.style.display = 'none';

            renderNovel();
        } catch (error) {
            showToast("Gagal menyimpan cerita! Coba lagi.", "error");
        } finally {
            btnSubmitNovel.innerHTML = 'Simpan Cerita';
            btnSubmitNovel.disabled = false;
        }
    };
}

// ----------------------------------------------------
// FORCE INJECT CSS (BYPASS CACHE)
// ----------------------------------------------------
const trashStyle = document.createElement('style');
trashStyle.textContent = `
    .btn-delete {
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(255, 75, 114, 0.8);
        border: none;
        color: white;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        backdrop-filter: blur(5px);
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    }
    .btn-delete:hover {
        background: #ff2e5b;
        transform: scale(1.15) rotate(10deg);
    }
    
    .btn-edit-profile {
        position: absolute;
        bottom: 10px;
        right: 10px;
        background: #00e676;
        border: none;
        color: white;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    }
    .btn-edit-profile:hover {
        background: #00c853;
        transform: scale(1.15);
    }
    
    .btn-delete-profile {
        position: absolute;
        bottom: 10px;
        left: 10px;
        background: rgba(255, 75, 114, 0.8);
        border: none;
        color: white;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    }
    .btn-delete-profile:hover {
        background: #ff2e5b;
        transform: scale(1.15);
    }
    
    /* SPA Page Section Styles */
    .page-section {
        display: none;
        animation: fadeIn 0.5s ease-in;
    }
    .page-section.active {
        display: block;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    /* Glassmorphism Story Cards */
    .story-polaroid {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 15px 15px 25px 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        border-radius: 15px;
        position: relative;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
        transform-style: preserve-3d;
        cursor: pointer;
    }
    /* Subtle scattering */
    .story-polaroid:nth-child(even) {
        transform: translateY(10px);
    }
    .story-polaroid:nth-child(odd) {
        transform: translateY(-10px);
    }
    .story-polaroid:hover {
        transform: scale(1.05) translateY(0) !important;
        z-index: 10;
        box-shadow: 0 15px 40px var(--primary-color-glow, rgba(255,75,114,0.3));
        border: 1px solid var(--primary-color, #ff4b72);
    }
    .polaroid-img-wrap {
        width: 100%;
        aspect-ratio: 1 / 1;
        overflow: hidden;
        border-radius: 10px;
        box-shadow: inset 0 0 20px rgba(0,0,0,0.8);
    }
    .polaroid-img-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }
    .story-polaroid:hover .polaroid-img-wrap img {
        transform: scale(1.1);
    }
    .polaroid-caption {
        font-family: 'Poppins', sans-serif;
        color: rgba(255,255,255,0.9);
        font-size: 1.1rem;
        font-weight: 500;
        text-align: center;
        margin-top: 20px;
        text-shadow: 0 2px 10px rgba(0,0,0,0.5);
    }
    .story-polaroid .btn-delete {
        position: absolute;
        top: -15px;
        right: -15px;
        background: #ff4b72;
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(255,75,114,0.5);
        z-index: 20;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s, background 0.2s;
    }
    .story-polaroid .btn-delete:hover {
        transform: scale(1.15) rotate(15deg);
        background: #ff1f50;
    }
`;
document.head.appendChild(trashStyle);

// ----------------------------------------------------
// REELS LOGIC
// ----------------------------------------------------
window.reelsData = JSON.parse(localStorage.getItem('cinta_reels')) || [];

window.parseEmbedUrl = function (url) {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        let videoId = '';
        if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1].split('?')[0];
        else if (url.includes('v=')) videoId = url.split('v=')[1].split('&')[0];
        else if (url.includes('shorts/')) videoId = url.split('shorts/')[1].split('?')[0];
        return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('tiktok.com')) {
        let videoId = url.split('/video/')[1]?.split('?')[0];
        if (!videoId) return null;
        return `https://www.tiktok.com/embed/v2/${videoId}`;
    }
    if (url.includes('instagram.com')) {
        let idPart = url.split('/reel/')[1] || url.split('/p/')[1];
        if (!idPart) return null;
        let shortcode = idPart.split('/')[0];
        return `https://www.instagram.com/p/${shortcode}/embed`;
    }
    return null;
}

window.loadReels = function () {
    const container = document.getElementById('reels-container');
    if (!container) return;

    if (reelsData.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: rgba(255,255,255,0.5);">Belum ada video. Aktifkan Mode Edit untuk menambah link video!</div>';
        return;
    }

    container.innerHTML = '';
    reelsData.forEach((reel, index) => {
        const embedUrl = parseEmbedUrl(reel.url);

        let iframeHtml = '';
        if (embedUrl) {
            iframeHtml = `<iframe src="${embedUrl}" width="100%" height="450" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border-radius: 10px; pointer-events: none;"></iframe>`;
        } else {
            iframeHtml = `<div style="height: 450px; display:flex; align-items:center; justify-content:center; background: rgba(0,0,0,0.5); border-radius: 10px; padding: 20px;">
                <p>Link tidak didukung. <br><br><a href="${reel.url}" target="_blank" style="color: var(--primary-color);">Buka Link</a></p>
            </div>`;
        }

        const card = document.createElement('div');
        card.className = 'glass-card';
        card.style.position = 'relative';

        // Render click overlay for lightbox
        card.innerHTML = `
            <div style="position: relative; cursor: zoom-in;" onclick="openReelsLightbox('${embedUrl || ''}', '${reel.caption}', '${reel.url}')">
                <div style="position: absolute; top:0; left:0; width:100%; height:100%; z-index:5;"></div>
                ${iframeHtml}
            </div>
            <p style="margin-top: 5px; font-weight: bold; text-align: center; font-size: 0.85rem;">${reel.caption}</p>
            ${window.isAdmin ? `<button class="btn btn-delete-profile" style="display: flex; position: absolute; top: -10px; right: -10px; width: 35px; height: 35px; background: #ff4b72; align-items: center; justify-content: center; z-index: 10;" onclick="event.stopPropagation(); deleteReel(${index})" title="Hapus Video"><i class="fa-solid fa-trash"></i></button>` : ''}
        `;

        container.appendChild(card);
    });
}

// Reels Lightbox Logic
window.openReelsLightbox = function (embedUrl, caption, originalUrl) {
    const lightboxModal = document.getElementById('reels-lightbox-modal');
    const lightboxIframe = document.getElementById('reels-lightbox-iframe');
    const lightboxCaption = document.getElementById('reels-lightbox-caption');

    if (lightboxModal && lightboxIframe) {
        if (embedUrl) {
            lightboxIframe.src = embedUrl;
            lightboxIframe.style.display = 'block';
        } else {
            lightboxIframe.style.display = 'none';
        }

        let captionHtml = caption;
        if (!embedUrl) {
            captionHtml += `<br><a href="${originalUrl}" target="_blank" style="color: #ff4b72; margin-top: 10px; display: inline-block;">Buka Video di Tab Baru</a>`;
        }
        if (lightboxCaption) lightboxCaption.innerHTML = captionHtml;

        lightboxModal.style.display = 'flex';
    }
}

const closeReelsLightboxBtn = document.getElementById('close-reels-lightbox');
if (closeReelsLightboxBtn) {
    closeReelsLightboxBtn.addEventListener('click', () => {
        const modal = document.getElementById('reels-lightbox-modal');
        const iframe = document.getElementById('reels-lightbox-iframe');
        if (modal) modal.style.display = 'none';
        if (iframe) iframe.src = ''; // Stop video playback
    });
}

const reelsLightboxModal = document.getElementById('reels-lightbox-modal');
if (reelsLightboxModal) {
    reelsLightboxModal.addEventListener('click', (e) => {
        // If they click outside the iframe container
        if (e.target === reelsLightboxModal) {
            reelsLightboxModal.style.display = 'none';
            const iframe = document.getElementById('reels-lightbox-iframe');
            if (iframe) iframe.src = ''; // Stop video
        }
    });
}

window.deleteReel = function (index) {
    if (confirm("Yakin ingin menghapus video ini?")) {
        reelsData.splice(index, 1);
        localStorage.setItem('cinta_reels', JSON.stringify(reelsData));
        loadReels();
        showToast("Video berhasil dihapus.");
    }
}

const uploadReelsForm = document.getElementById('uploadReelsForm');
if (uploadReelsForm) {
    uploadReelsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const url = document.getElementById('reels-url').value;
        const caption = document.getElementById('reels-caption').value;

        if (!parseEmbedUrl(url)) {
            if (!confirm("Format URL sepertinya bukan dari YouTube, TikTok, atau Instagram. Video mungkin tidak bisa diputar langsung (hanya jadi tombol link). Tetap tambahkan?")) return;
        }

        reelsData.unshift({ url, caption });
        localStorage.setItem('cinta_reels', JSON.stringify(reelsData));
        loadReels();
        showToast("Video Reels berhasil ditambahkan!");
        uploadReelsForm.reset();
    });
}

// ----------------------------------------------------
// KOLEKSI GALERI LOGIC
// ----------------------------------------------------
window.loadKoleksiGaleri = function () {
    const container = document.getElementById('koleksi-galeri-container');
    if (!container) return;

    let items = JSON.parse(localStorage.getItem('cinta_koleksi_galeri')) || [];

    if (items.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: rgba(255,255,255,0.5);">Belum ada foto. Aktifkan Mode Edit untuk mulai mengupload!</div>';
        return;
    }

    container.innerHTML = '';

    items.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'glass-card';
        div.style.position = 'relative';
        div.style.padding = '10px';
        div.style.borderRadius = '10px';
        div.style.overflow = 'hidden';

        const proxyUrl = "https://wsrv.nl/?url=" + encodeURIComponent(item.image) + "&w=400";
        const deleteBtnHTML = window.isAdmin ? `<button class="btn-delete" style="position:absolute; top:15px; right:15px; z-index:10; background:rgba(255,75,114,0.9); color:white; border:none; width:35px; height:35px; border-radius:50%; cursor:pointer;" onclick="event.stopPropagation(); deleteKoleksiGaleri(${index})" title="Hapus Foto"><i class="fa-solid fa-trash"></i></button>` : '';

        let captionHtml = item.caption ? `<div style="padding: 10px 5px 5px; font-size: 0.9rem; text-align: center; color: rgba(255,255,255,0.8);">${item.caption}</div>` : '';

        div.innerHTML = `
            ${deleteBtnHTML}
            <div style="width: 100%; aspect-ratio: 1/1; overflow: hidden; border-radius: 8px; cursor: zoom-in;" onclick="openLightbox('${item.image}', '${item.caption || ''}')">
                <img src="${proxyUrl}" alt="Galeri" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
            </div>
            ${captionHtml}
        `;

        container.appendChild(div);
    });
}

// Lightbox Logic
window.openLightbox = function (imageUrl, captionText) {
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    if (lightboxModal && lightboxImg) {
        lightboxImg.src = imageUrl;
        if (lightboxCaption) lightboxCaption.innerHTML = captionText;
        lightboxModal.style.display = 'flex';
    }
}

const closeLightboxBtn = document.getElementById('close-lightbox');
if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener('click', () => {
        document.getElementById('lightbox-modal').style.display = 'none';
    });
}

const lightboxModal = document.getElementById('lightbox-modal');
if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
        if (e.target !== document.getElementById('lightbox-img')) {
            lightboxModal.style.display = 'none';
        }
    });
}

window.deleteKoleksiGaleri = function (index) {
    if (confirm("Yakin ingin menghapus foto dari galeri ini?")) {
        let items = JSON.parse(localStorage.getItem('cinta_koleksi_galeri')) || [];
        items.splice(index, 1);
        localStorage.setItem('cinta_koleksi_galeri', JSON.stringify(items));
        loadKoleksiGaleri();
        showToast("Foto berhasil dihapus dari galeri.");
    }
}

const uploadGaleriForm = document.getElementById('uploadGaleriForm');
if (uploadGaleriForm) {
    uploadGaleriForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fileInput = document.getElementById('galeri-file');
        const captionInput = document.getElementById('galeri-caption');
        const submitBtn = document.getElementById('btn-submit-galeri');

        if (fileInput.files.length === 0) return;

        submitBtn.textContent = "Mengupload...";
        submitBtn.disabled = true;

        const formData = new FormData();
        formData.append('image', fileInput.files[0]);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });
            const result = await response.json();

            if (result.success) {
                const imageUrl = result.data.url;
                const caption = captionInput.value;

                let items = JSON.parse(localStorage.getItem('cinta_koleksi_galeri')) || [];
                items.unshift({ image: imageUrl, caption: caption });
                localStorage.setItem('cinta_koleksi_galeri', JSON.stringify(items));

                showToast('Foto berhasil ditambahkan ke Galeri! ❤️');
                uploadGaleriForm.reset();
                loadKoleksiGaleri();
            } else {
                showToast("Gagal upload: " + result.error.message, 'error');
            }
        } catch (error) {
            console.error(error);
            showToast('Terjadi kesalahan koneksi internet.', 'error');
        } finally {
            submitBtn.textContent = "Upload Foto";
            submitBtn.disabled = false;
        }
    });
}

// Initial page load based on URL hash or default to beranda
window.showPage = function (pageId) {
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(page => {
        page.style.display = 'none';
        page.classList.remove('active');
    });

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        link.style.borderBottom = ''; // Hapus sisa inline style kalau ada
        link.style.color = '';
        if (link.getAttribute('href') === '#' + pageId) {
            link.classList.add('active');
        }
    });

    // Show target page
    const target = document.getElementById('page-' + pageId);
    if (target) {
        target.style.display = 'block';

        // Timeout to allow display block to render before animation
        setTimeout(() => {
            target.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Trigger scroll reveal for elements in the new page
            if (typeof reveal === 'function') {
                setTimeout(reveal, 100);
            }
        }, 50);
    }
};

// Initial page load based on URL hash or default to beranda
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById('page-' + hash)) {
        showPage(hash);
    } else {
        showPage('beranda');
    }
});
