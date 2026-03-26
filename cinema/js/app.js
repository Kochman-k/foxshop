// ===== State =====
const state = {
  selectedSeats: [],
  ticketPrice: 28,
  vipPrice: 42,
  serviceFee: 2,
};

// ===== Screen Navigation =====
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ===== Screen 1: Movie List =====
// Date chip selection
document.querySelectorAll('.chip-row .chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip-row .chip').forEach(c => c.classList.remove('chip--selected'));
    chip.classList.add('chip--selected');
  });
});

// Session button → go to seat selection
document.querySelectorAll('.session-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.movie-card');
    const title = card.querySelector('.movie-card__title').textContent;
    const meta = card.querySelector('.movie-card__meta').textContent;
    const time = btn.dataset.time;

    document.getElementById('seatScreenTitle').textContent = title;
    document.getElementById('seatScreenSubtitle').textContent = `Dzis, ${time} \u2022 Sala 3`;

    document.getElementById('summaryTitle').textContent = title;
    document.getElementById('summaryMeta').textContent = meta;
    document.getElementById('summaryDate').textContent = `Wt, 25 marca 2026 \u2022 ${time}`;

    document.getElementById('confirmMovie').textContent = title;
    document.getElementById('confirmDetail').textContent = `Wt, 25.03 \u2022 ${time} \u2022 Sala 3`;

    resetSeats();
    showScreen('screen-seats');
  });
});

// ===== Screen 2: Seat Selection =====
function resetSeats() {
  state.selectedSeats = [];
  document.querySelectorAll('.seat--selected').forEach(s => s.classList.remove('seat--selected'));
  updateSelectionBar();
}

document.querySelectorAll('.seat:not(.seat--taken)').forEach(seat => {
  seat.addEventListener('click', () => {
    const seatId = seat.dataset.seat;
    const isVip = seat.classList.contains('seat--vip');

    if (seat.classList.contains('seat--selected')) {
      seat.classList.remove('seat--selected');
      state.selectedSeats = state.selectedSeats.filter(s => s.id !== seatId);
    } else {
      seat.classList.add('seat--selected');
      state.selectedSeats.push({ id: seatId, vip: isVip });
    }
    updateSelectionBar();
  });
});

function updateSelectionBar() {
  const label = document.getElementById('selectedSeatsLabel');
  const price = document.getElementById('selectedPrice');
  const btn = document.getElementById('confirmSeatsBtn');

  if (state.selectedSeats.length === 0) {
    label.textContent = 'Wybierz miejsca';
    price.textContent = '';
    btn.disabled = true;
    btn.classList.add('btn--disabled');
  } else {
    const seatNames = state.selectedSeats.map(s => s.id).join(', ');
    const total = state.selectedSeats.reduce((sum, s) => sum + (s.vip ? state.vipPrice : state.ticketPrice), 0);
    label.textContent = `Miejsca: ${seatNames}`;
    price.textContent = `${total},00 zl`;
    btn.disabled = false;
    btn.classList.remove('btn--disabled');
  }
}

document.getElementById('confirmSeatsBtn').addEventListener('click', () => {
  buildSummary();
  showScreen('screen-summary');
});

document.getElementById('backToMovies').addEventListener('click', () => {
  showScreen('screen-movies');
});

// ===== Screen 3: Summary =====
function buildSummary() {
  const seatsLabel = state.selectedSeats.map(s => s.id).join(', ');
  document.getElementById('summarySeats').textContent = seatsLabel;

  const typesContainer = document.getElementById('ticketTypes');
  typesContainer.innerHTML = '';

  state.selectedSeats.forEach(s => {
    const type = s.vip ? 'VIP' : 'Normalny';
    const price = s.vip ? state.vipPrice : state.ticketPrice;

    const el = document.createElement('div');
    el.className = 'ticket-type';
    el.innerHTML = `
      <div class="ticket-type__info">
        <span class="ticket-type__name">Miejsce ${s.id} — ${type}</span>
        <span class="ticket-type__price">${price},00 zl</span>
      </div>
    `;
    typesContainer.appendChild(el);
  });

  const ticketsTotal = state.selectedSeats.reduce((sum, s) => sum + (s.vip ? state.vipPrice : state.ticketPrice), 0);
  const total = ticketsTotal + state.serviceFee;

  document.getElementById('priceTickets').textContent = `${ticketsTotal},00 zl`;
  document.getElementById('priceTotal').textContent = `${total},00 zl`;
  document.getElementById('totalPayment').textContent = `${total},00 zl`;
}

document.getElementById('backToSeats').addEventListener('click', () => {
  showScreen('screen-seats');
});

// ===== Screen 4: Confirmation =====
document.getElementById('payBtn').addEventListener('click', () => {
  const seatsLabel = state.selectedSeats.map(s => s.id).join(', ');
  document.getElementById('confirmSeats').textContent = `Miejsca: ${seatsLabel}`;
  showScreen('screen-confirm');
});

document.getElementById('closeConfirm').addEventListener('click', () => {
  showScreen('screen-movies');
});

document.getElementById('backToHome').addEventListener('click', () => {
  showScreen('screen-movies');
});
