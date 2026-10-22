import { defineRoom } from '@parti/worker-sdk';

/* ============================================================
   TABLERO
   ============================================================ */
const BOARD = [
  { name: "GO", type: "go" },
  { name: "Av. Mediterráneo", type: "property", group: "brown", price: 60, rents: [2,10,30,90,160,250], houseCost: 50 },
  { name: "Caja de Comunidad", type: "chest" },
  { name: "Av. Báltica", type: "property", group: "brown", price: 60, rents: [4,20,60,180,320,450], houseCost: 50 },
  { name: "Impuesto sobre la Renta", type: "tax", amount: 200, isIncomeTax: true },
  { name: "Ferrocarril Reading", type: "railroad", price: 200 },
  { name: "Av. Oriental", type: "property", group: "lightblue", price: 100, rents: [6,30,90,270,400,550], houseCost: 50 },
  { name: "Suerte", type: "chance" },
  { name: "Av. Vermont", type: "property", group: "lightblue", price: 100, rents: [6,30,90,270,400,550], houseCost: 50 },
  { name: "Av. Connecticut", type: "property", group: "lightblue", price: 120, rents: [8,40,100,300,450,600], houseCost: 50 },
  { name: "Cárcel / Solo visitando", type: "jail" },
  { name: "Plaza San Carlos", type: "property", group: "pink", price: 140, rents: [10,50,150,450,625,750], houseCost: 100 },
  { name: "Compañía Eléctrica", type: "utility", price: 150 },
  { name: "Av. Estados Unidos", type: "property", group: "pink", price: 140, rents: [10,50,150,450,625,750], houseCost: 100 },
  { name: "Av. Virginia", type: "property", group: "pink", price: 160, rents: [12,60,180,500,700,900], houseCost: 100 },
  { name: "Ferrocarril Pensilvania", type: "railroad", price: 200 },
  { name: "Plaza San Jaime", type: "property", group: "orange", price: 180, rents: [14,70,200,550,750,950], houseCost: 100 },
  { name: "Caja de Comunidad", type: "chest" },
  { name: "Av. Tennessee", type: "property", group: "orange", price: 180, rents: [14,70,200,550,750,950], houseCost: 100 },
  { name: "Av. Nueva York", type: "property", group: "orange", price: 200, rents: [16,80,220,600,800,1000], houseCost: 100 },
  { name: "Parking Gratuito", type: "parking" },
  { name: "Av. Kentucky", type: "property", group: "red", price: 220, rents: [18,90,250,700,875,1050], houseCost: 150 },
  { name: "Suerte", type: "chance" },
  { name: "Av. Indiana", type: "property", group: "red", price: 220, rents: [18,90,250,700,875,1050], houseCost: 150 },
  { name: "Av. Illinois", type: "property", group: "red", price: 240, rents: [20,100,300,750,925,1100], houseCost: 150 },
  { name: "Ferrocarril B&O", type: "railroad", price: 200 },
  { name: "Av. Atlántico", type: "property", group: "yellow", price: 260, rents: [22,110,330,800,975,1150], houseCost: 150 },
  { name: "Av. Ventnor", type: "property", group: "yellow", price: 260, rents: [22,110,330,800,975,1150], houseCost: 150 },
  { name: "Compañía de Agua", type: "utility", price: 150 },
  { name: "Av. Marvin Gardens", type: "property", group: "yellow", price: 280, rents: [24,120,360,850,1025,1200], houseCost: 150 },
  { name: "Ve a la Cárcel", type: "gotojail" },
  { name: "Av. Pacífico", type: "property", group: "green", price: 300, rents: [26,130,390,900,1100,1275], houseCost: 200 },
  { name: "Av. Carolina del Norte", type: "property", group: "green", price: 300, rents: [26,130,390,900,1100,1275], houseCost: 200 },
  { name: "Caja de Comunidad", type: "chest" },
  { name: "Av. Pensilvania", type: "property", group: "green", price: 320, rents: [28,150,450,1000,1200,1400], houseCost: 200 },
  { name: "Ferrocarril Short Line", type: "railroad", price: 200 },
  { name: "Suerte", type: "chance" },
  { name: "Plaza Park", type: "property", group: "darkblue", price: 350, rents: [35,175,500,1100,1300,1500], houseCost: 200 },
  { name: "Impuesto de Lujo", type: "tax", amount: 100, isIncomeTax: false },
  { name: "Paseo del Tablero", type: "property", group: "darkblue", price: 400, rents: [50,200,600,1400,1700,2000], houseCost: 200 }
];

const PLAYER_COLORS = [
  "#e63946","#457b9d","#2a9d8f","#e9c46a","#f4a261","#9b5de5",
  "#f15bb5","#00bbf9","#00f5d4","#fee440","#ff006e","#8338ec"
];

const CHANCE_CARDS = [
  { id: "advance_go", text: "Avanza a GO. Cobra $200." },
  { id: "to_illinois", text: "Avanza a Av. Illinois. Si pasas por GO, cobra $200." },
  { id: "to_stcharles", text: "Avanza a Plaza San Carlos. Si pasas por GO, cobra $200." },
  { id: "to_utility", text: "Avanza a la compañía más cercana. Si tiene dueño, tira los dados y paga 10 veces el resultado." },
  { id: "to_rail_1", text: "Avanza al ferrocarril más cercano. Si tiene dueño, paga el doble del alquiler." },
  { id: "to_rail_2", text: "Avanza al ferrocarril más cercano. Si tiene dueño, paga el doble del alquiler." },
  { id: "to_reading", text: "Haz un viaje al Ferrocarril Reading. Si pasas por GO, cobra $200." },
  { id: "to_boardwalk", text: "Avanza al Paseo del Tablero." },
  { id: "gain_50", text: "El banco te paga un dividendo de $50." },
  { id: "get_out_jail", text: "Salir de la Cárcel gratis. Guarda esta carta." },
  { id: "back_3", text: "Retrocede 3 casillas." },
  { id: "go_jail", text: "Ve directamente a la Cárcel. No pases por GO." },
  { id: "repairs", text: "Reparaciones generales: paga $25 por casa y $100 por hotel." },
  { id: "pay_15", text: "Multa por exceso de velocidad: paga $15." },
  { id: "chairman", text: "Eres presidente de la junta: paga $50 a cada jugador." },
  { id: "gain_150", text: "Tu préstamo de construcción madura. Cobra $150." }
];

const CHEST_CARDS = [
  { id: "advance_go", text: "Avanza a GO. Cobra $200." },
  { id: "gain_200", text: "Error bancario a tu favor. Cobra $200." },
  { id: "pay_50", text: "Honorarios del médico: paga $50." },
  { id: "gain_50b", text: "Vendes acciones y ganas $50." },
  { id: "get_out_jail", text: "Salir de la Cárcel gratis. Guarda esta carta." },
  { id: "go_jail", text: "Ve directamente a la Cárcel. No pases por GO." },
  { id: "gain_100", text: "Fondo de vacaciones. Cobra $100." },
  { id: "gain_20", text: "Devolución de impuestos. Cobra $20." },
  { id: "birthday", text: "Es tu cumpleaños: cada jugador te paga $10." },
  { id: "gain_100b", text: "Tu seguro de vida madura. Cobra $100." },
  { id: "pay_100", text: "Gastos del hospital: paga $100." },
  { id: "pay_50b", text: "Cuota escolar: paga $50." },
  { id: "gain_25", text: "Cobras $25 por consultoría." },
  { id: "repairs_chest", text: "Reparaciones de calles: paga $40 por casa y $115 por hotel." },
  { id: "gain_10", text: "Segundo premio en un concurso de belleza. Cobra $10." },
  { id: "gain_100c", text: "Recibes una herencia de $100." }
];

/* ============================================================
   HELPERS
   ============================================================ */
const rand6 = () => Math.floor(Math.random() * 6) + 1;
const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const playerById = (s, id) => s.players.find(p => p.id === id);
const currentPlayer = (s) => s.players[s.turn];
const activePlayers = (s) => s.players.filter(p => !p.bankrupt);

function addLog(state, msg) {
  state.log.unshift(msg);
  if (state.log.length > 100) state.log.pop();
}

function ownsGroup(state, playerId, group) {
  return state.board
    .filter(b => b.type === "property" && b.group === group)
    .every(b => b.owner === playerId);
}

function calcRent(state, b, opts) {
  const o = opts || {};
  if (b.type === "property") {
    if (b.houses === 0 && ownsGroup(state, b.owner, b.group)) return b.rents[0] * 2;
    return b.rents[Math.min(b.houses, 5)];
  }
  if (b.type === "railroad") {
    const c = state.board.filter(x => x.type === "railroad" && x.owner === b.owner).length;
    return 25 * Math.pow(2, Math.max(0, c - 1)) * (o.rentMult || 1);
  }
  if (b.type === "utility") {
    const c = state.board.filter(x => x.type === "utility" && x.owner === b.owner).length;
    if (o.utilTen) {
      const d1 = rand6(), d2 = rand6();
      addLog(state, `Dados de la carta: ${d1}+${d2}=${d1 + d2}.`);
      return 10 * (d1 + d2);
    }
    return (c >= 2 ? 10 : 4) * (state.dice[0] + state.dice[1]);
  }
  return 0;
}

function calcNetWorth(state, playerId) {
  const p = playerById(state, playerId);
  if (!p) return 0;
  let worth = p.money;
  state.board.forEach(b => {
    if (b.owner === playerId) {
      if (!b.mortgaged) worth += b.price;
      worth += b.houses * b.houseCost;
    }
  });
  return worth;
}

function movePlayer(state, p, steps) {
  for (let i = 0; i < steps; i++) {
    p.pos = (p.pos + 1) % 40;
    if (p.pos === 0) {
      p.money += 200;
      addLog(state, `${p.name} pasa por GO y cobra $200.`);
    }
  }
}

function sendToJail(state, p) {
  p.pos = 10;
  p.inJail = true;
  p.jailTurns = 0;
  state.doubles = 0;
  addLog(state, `${p.name} va a la cárcel.`);
}

function tryPay(ctx, fromId, amount, toId) {
  const state = ctx.state;
  const p = playerById(state, fromId);
  if (p.money >= amount) {
    p.money -= amount;
    if (toId !== null) playerById(state, toId).money += amount;
    addLog(state, `${p.name} paga $${amount}${toId !== null ? ` a ${playerById(state, toId).name}` : " a la banca"}.`);
    return true;
  }
  state.debt = { fromId, amount, toId };
  state.phase = "debt";
  addLog(state, `${p.name} no puede pagar $${amount}. Debe hipotecar/vender o declararse en bancarrota.`);
  return false;
}

function checkWinner(state) {
  const alive = activePlayers(state);
  if (alive.length === 1) {
    state.winner = alive[0].id;
    state.phase = "gameover";
    addLog(state, `¡${alive[0].name} gana la partida!`);
  }
}

function nextPlayer(state) {
  let guard = 0;
  const anyConnected = state.players.some(q => !q.bankrupt && !q.disconnected);
  do {
    state.turn = (state.turn + 1) % state.players.length;
    guard++;
  } while (guard < state.players.length * 2 &&
           (state.players[state.turn].bankrupt || (anyConnected && state.players[state.turn].disconnected)));
  state.phase = "roll";
  state.current = null;
  state.dice = [0, 0];
  state.doubles = 0;
}

// La carta de salir de la cárcel vuelve al mazo al que le falta
function returnJailCard(state) {
  const inChance = state.chanceDeck.concat(state.chanceDiscard).includes("get_out_jail");
  (inChance ? state.chestDiscard : state.chanceDiscard).push("get_out_jail");
}

function clearBuildings(state, b) {
  if (b.houses === 5) state.bank.hotels++; else state.bank.houses += b.houses;
  b.houses = 0;
}

function bankruptPlayer(state, p, creditorId) {
  p.bankrupt = true;
  const c = (creditorId !== null && creditorId !== undefined) ? playerById(state, creditorId) : null;
  if (c) {
    c.money += Math.max(0, p.money); c.getOut += p.getOut;
    p.money = 0; p.getOut = 0;
    state.board.forEach(b => {
      if (b.owner !== p.id) return;
      clearBuildings(state, b);
      b.owner = c.id;
      if (b.mortgaged) c.money -= Math.min(c.money, Math.ceil(b.price / 20)); // 10% por heredar hipoteca
    });
    addLog(state, `${p.name} quiebra. Sus propiedades pasan a ${c.name}.`);
  } else {
    state.board.forEach(b => {
      if (b.owner !== p.id) return;
      clearBuildings(state, b);
      b.owner = null; b.mortgaged = false;
    });
    for (let i = 0; i < p.getOut; i++) returnJailCard(state);
    p.getOut = 0; p.money = 0;
    addLog(state, `${p.name} quiebra. Sus propiedades vuelven a la banca.`);
  }
  state.debt = null;
  state.phase = "end";
  checkWinner(state);
  if (state.phase !== "gameover") nextPlayer(state);
}

// Resuelve lo que quede pendiente de jugadores desconectados (subasta, deuda, impuesto, turno)
function settleDisconnected(state) {
  const ctx = { state };
  const gone = (id) => { const q = playerById(state, id); return !!q && !!q.disconnected && !q.bankrupt; };
  for (let g = 0; g < 60 && state.phase !== "gameover"; g++) {
    if (state.phase === "auction" && state.auction) {
      const a = state.auction, id = a.order[a.idx];
      if (!gone(id)) break;
      if (!a.passed.includes(id)) a.passed.push(id);
      addLog(state, `${playerById(state, id).name} pasa (desconectado).`);
      auctionNext(state);
    } else if (state.phase === "initroll" && state.initRoll) {
      const id = state.initRoll.pending.find(i => !state.initRoll.rolls[i] && gone(i));
      if (!id) break;
      rollInitial(state, id);
    } else if (state.phase === "debt" && state.debt) {
      const p = playerById(state, state.debt.fromId);
      if (!p || !gone(p.id)) break;
      bankruptPlayer(state, p, state.debt.toId);
    } else if (state.phase === "tax" && state.taxChoice) {
      const id = state.taxChoice.playerId, amt = state.taxChoice.flatAmount;
      if (!gone(id)) break;
      state.taxChoice = null;
      if (tryPay(ctx, id, amt, null)) state.phase = "action";
    } else if (["roll", "action", "end"].includes(state.phase)) {
      const p = currentPlayer(state);
      if (!p || !gone(p.id) || !state.players.some(q => !q.bankrupt && !q.disconnected)) break;
      nextPlayer(state);
    } else break;
  }
}

// ---- Inicio de partida: todos listos -> tirada inicial -> 5 s de aviso -> turno 1 ----
function tryAutoStart(state) {
  if (state.phase !== "waiting" || state.started) return;
  if (state.players.length < 2 || !state.players.every(p => p.ready)) return;
  state.chanceDeck = shuffle(CHANCE_CARDS.map(c => c.id));
  state.chanceDiscard = [];
  state.chestDeck = shuffle(CHEST_CARDS.map(c => c.id));
  state.chestDiscard = [];
  state.started = true;
  state.phase = "initroll";
  state.initRoll = { round: 1, pending: state.players.map(p => p.id), rolls: {}, last: {}, tie: null, winner: null, doneAt: 0 };
  addLog(state, "¡Todos listos! Cada jugador tira los dados para decidir quién empieza.");
}

function rollInitial(state, id) {
  const r = state.initRoll, p = playerById(state, id);
  if (!r || !p || !r.pending.includes(id) || r.rolls[id]) return;
  const d1 = rand6(), d2 = rand6();
  r.rolls[id] = { d: [d1, d2], total: d1 + d2 };
  r.last[id] = r.rolls[id];
  state.dice = [d1, d2];
  addLog(state, `${p.name} tira ${d1}+${d2}=${d1 + d2} para decidir quién empieza.`);
  if (!r.pending.every(i => r.rolls[i])) return;

  const max = Math.max(...r.pending.map(i => r.rolls[i].total));
  const lead = r.pending.filter(i => r.rolls[i].total === max);
  if (lead.length > 1) {
    addLog(state, `Empate con ${max} entre ${lead.map(i => playerById(state, i).name).join(" y ")}: vuelven a tirar.`);
    r.tie = { total: max, ids: lead };
    r.round++; r.pending = lead; r.rolls = {};
    return;
  }
  const idx = state.players.findIndex(q => q.id === lead[0]);
  state.players = state.players.slice(idx).concat(state.players.slice(0, idx));
  state.turn = 0;
  r.winner = lead[0]; r.tie = null; r.doneAt = Date.now();
  state.phase = "initresult";
  addLog(state, `${playerById(state, lead[0]).name} inicia la partida (sacó ${max}).`);
}

function validTrade(state, t) {
  const from = playerById(state, t.fromId), to = playerById(state, t.toId);
  if (!from || !to || from.bankrupt || to.bankrupt || from.id === to.id) return false;
  const ok = (i, owner) => {
    const b = state.board[i];
    if (!b || !b.price || b.owner !== owner) return false;
    if (b.type === "property" && state.board.some(x => x.type === "property" && x.group === b.group && x.houses > 0)) return false;
    return true;
  };
  if (!t.offerProps.every(i => ok(i, t.fromId)) || !t.requestProps.every(i => ok(i, t.toId))) return false;
  if (new Set(t.offerProps.concat(t.requestProps)).size !== t.offerProps.length + t.requestProps.length) return false;
  const fee = (list) => list.reduce((s, i) => s + (state.board[i].mortgaged ? Math.ceil(state.board[i].price / 20) : 0), 0);
  if (from.money < t.offerMoney || to.money < t.requestMoney) return false;
  if (from.money - t.offerMoney + t.requestMoney < fee(t.requestProps)) return false;
  if (to.money - t.requestMoney + t.offerMoney < fee(t.offerProps)) return false;
  if (from.getOut < t.offerJailCards || to.getOut < t.requestJailCards) return false;
  return true;
}

function resolveLanding(ctx, p, opts) {
  const state = ctx.state;
  const b = state.board[p.pos];
  state.current = p.pos;
  addLog(state, `${p.name} cae en ${b.name}.`);

  if (b.type === "property" || b.type === "railroad" || b.type === "utility") {
    if (b.owner === null || b.owner === p.id) { state.phase = "action"; return; }
    if (b.mortgaged) { addLog(state, `${b.name} está hipotecada. Sin alquiler.`); state.phase = "action"; return; }
    const rent = calcRent(state, b, opts);
    addLog(state, `Alquiler de ${b.name}: $${rent} para ${playerById(state, b.owner).name}.`);
    if (tryPay(ctx, p.id, rent, b.owner)) state.phase = "action";
    return;
  }

  if (b.type === "tax") {
    if (b.isIncomeTax) {
      state.taxChoice = { playerId: p.id, flatAmount: b.amount };
      state.phase = "tax";
      addLog(state, `${p.name} debe elegir: pagar $${b.amount} o 10% de su patrimonio.`);
      return;
    }
    addLog(state, `${p.name} paga $${b.amount} de impuesto de lujo.`);
    if (tryPay(ctx, p.id, b.amount, null)) state.phase = "action";
    return;
  }

  if (b.type === "chance") { drawCard(ctx, p, "chance"); return; }
  if (b.type === "chest") { drawCard(ctx, p, "chest"); return; }
  if (b.type === "gotojail") { sendToJail(state, p); state.phase = "end"; return; }

  state.phase = "action";
}

function drawCard(ctx, p, deckType) {
  const state = ctx.state;
  const isChance = deckType === "chance";
  const deckKey = isChance ? "chanceDeck" : "chestDeck";
  const discardKey = isChance ? "chanceDiscard" : "chestDiscard";
  const cards = isChance ? CHANCE_CARDS : CHEST_CARDS;

  if (state[deckKey].length === 0) { state[deckKey] = shuffle(state[discardKey]); state[discardKey] = []; }
  if (state[deckKey].length === 0) { state.phase = "action"; return; }

  const cardId = state[deckKey].pop();
  const card = cards.find(c => c.id === cardId);
  addLog(state, `${p.name} saca carta: ${card.text}`);
  state.lastCard = { deck: deckType, id: card.id, text: card.text, forPlayer: p.id, forName: p.name, forColor: p.color, nonce: Date.now() + "-" + Math.random() };
  if (card.id === "get_out_jail") p.getOut++; else state[discardKey].push(card.id);

  const id = card.id;
  const MOVES = { to_illinois: 24, to_stcharles: 11, to_reading: 5, to_boardwalk: 39 };
  const near = (type) => { let i = p.pos; do { i = (i + 1) % 40; } while (state.board[i].type !== type); return i; };
  const moveTo = (i) => movePlayer(state, p, (i - p.pos + 40) % 40);

  if (MOVES[id] !== undefined) { moveTo(MOVES[id]); resolveLanding(ctx, p); return; }
  if (id === "to_rail_1" || id === "to_rail_2") { moveTo(near("railroad")); resolveLanding(ctx, p, { rentMult: 2 }); return; }
  if (id === "to_utility") { moveTo(near("utility")); resolveLanding(ctx, p, { utilTen: true }); return; }
  if (id === "back_3") { p.pos = (p.pos + 37) % 40; resolveLanding(ctx, p); return; }
  if (id === "go_jail") { sendToJail(state, p); state.phase = "end"; return; }

  if (id === "advance_go") moveTo(0);
  else if (id === "repairs" || id === "repairs_chest") {
    const ph = id === "repairs" ? 25 : 40, pho = id === "repairs" ? 100 : 115;
    const amt = state.board.reduce((s, b) => b.owner === p.id && b.type === "property" ? s + (b.houses === 5 ? pho : b.houses * ph) : s, 0);
    if (amt > 0) tryPay(ctx, p.id, amt, null); else addLog(state, `${p.name} no tiene edificios y no paga nada.`);
  } else if (id === "chairman") {
    for (const q of activePlayers(state)) { if (q.id !== p.id && !tryPay(ctx, p.id, 50, q.id)) break; }
  } else if (id === "birthday") {
    for (const q of activePlayers(state)) {
      if (q.id === p.id) continue;
      const a = Math.min(10, q.money); q.money -= a; p.money += a;
    }
    addLog(state, `Todos le pagan $10 a ${p.name}.`);
  } else {
    const g = /^gain_(\d+)/.exec(id), pay = /^pay_(\d+)/.exec(id);
    if (g) p.money += +g[1]; else if (pay) tryPay(ctx, p.id, +pay[1], null);
  }

  if (!["debt", "auction", "gameover", "tax"].includes(state.phase)) state.phase = "action";
}

function jailRoll(ctx, p) {
  const state = ctx.state;
  const d1 = rand6(), d2 = rand6();
  state.dice = [d1, d2];

  if (d1 === d2) {
    p.inJail = false; p.jailTurns = 0;
    addLog(state, `${p.name} saca dobles y sale de la cárcel.`);
    movePlayer(state, p, d1 + d2);
    resolveLanding(ctx, p);
    return;
  }

  p.jailTurns++;
  if (p.jailTurns >= 3) {
    addLog(state, `${p.name} falla 3 veces y paga $50.`);
    if (tryPay(ctx, p.id, 50, null)) {
      p.inJail = false; p.jailTurns = 0;
      movePlayer(state, p, d1 + d2);
      resolveLanding(ctx, p);
    } else {
      p.inJail = false; p.jailTurns = 0; // sale después de pagar deuda
    }
  } else {
    addLog(state, `${p.name} no saca dobles (intento ${p.jailTurns}/3).`);
    state.phase = "end";
  }
}

function canBuildUniform(state, playerId, idx) {
  const b = state.board[idx];
  if (b.type !== "property" || b.owner !== playerId) return false;
  if (b.mortgaged || b.houses >= 5) return false;
  if (b.houses < 4 ? state.bank.houses <= 0 : state.bank.hotels <= 0) return false;
  const groupProps = state.board.filter(x => x.type === "property" && x.group === b.group);
  if (!groupProps.every(x => x.owner === playerId)) return false;
  if (groupProps.some(x => x.mortgaged)) return false;
  const minH = Math.min(...groupProps.map(x => x.houses));
  if (b.houses !== minH) return false;
  const p = playerById(state, playerId);
  return p.money >= b.houseCost;
}

function auctionNext(state) {
  const a = state.auction;
  if (!a) return;
  if (a.passed.length >= a.order.length || (a.high !== null && a.passed.length >= a.order.length - 1)) {
    finishAuction(state);
    return;
  }
  let guard = 0;
  do {
    a.idx = (a.idx + 1) % a.order.length;
    guard++;
  } while (a.passed.includes(a.order[a.idx]) && guard < 100);
  if (guard >= 100) finishAuction(state);
}

function finishAuction(state) {
  const a = state.auction;
  if (!a) return;
  const b = state.board[a.prop];
  if (a.high !== null) {
    const w = playerById(state, a.high);
    w.money -= a.bid;
    b.owner = w.id;
    addLog(state, `${w.name} gana la subasta de ${b.name} por $${a.bid}.`);
  } else {
    addLog(state, `Nadie puja por ${b.name}. Queda en la banca.`);
  }
  state.auction = null;
  state.phase = "action";
}

/* ============================================================
   WORKER
   ============================================================ */
export default defineRoom({
  meta: { name: "Monopoly 12 Jugadores", minPlayers: 2, maxPlayers: 12 },

  initialState() {
    return {
      board: BOARD.map(b => ({ ...b, owner: null, houses: 0, mortgaged: false })),
      players: [],
      turn: 0,
      dice: [0, 0],
      doubles: 0,
      phase: "waiting",
      current: null,
      debt: null,
      auction: null,
      trade: null,
      taxChoice: null,
      winner: null,
      started: false,
      log: ["Esperando jugadores..."],
      chanceDeck: [],
      chanceDiscard: [],
      chestDeck: [],
      chestDiscard: [],
      lastCard: null,
      initRoll: null,
      bank: { houses: 32, hotels: 12 },
      nextNum: 0
    };
  },

  onJoin(ctx, player) {
    const state = ctx.state;
    const ex = playerById(state, player.id);
    if (ex) {
      if (ex.disconnected) { ex.disconnected = false; addLog(state, `${ex.name} se reconectó.`); }
      ctx.broadcast("welcome", { playerId: player.id });
      return;
    }
    if (state.started || state.players.length >= 12) return; // después de iniciar solo se puede volver a entrar
    const used = state.players.map(p => p.color);
    const color = PLAYER_COLORS.find(c => !used.includes(c)) || PLAYER_COLORS[0];
    state.nextNum = (state.nextNum || 0) + 1;
    state.players.push({
      id: player.id,
      name: `Jugador ${state.nextNum}`,
      color,
      money: 1500, pos: 0,
      inJail: false, jailTurns: 0, getOut: 0,
      bankrupt: false, disconnected: false, ready: false
    });
    addLog(state, `Jugador ${state.nextNum} se ha unido.`);
    ctx.broadcast("welcome", { playerId: player.id });
  },

  onLeave(ctx, player) {
    const state = ctx.state;
    const p = playerById(state, player.id);
    if (!p) return;
    if (state.trade && (state.trade.fromId === p.id || state.trade.toId === p.id)) state.trade = null;
    if (!state.started) {
      state.players = state.players.filter(x => x.id !== p.id);
      addLog(state, `${p.name} salió de la sala.`);
      tryAutoStart(state);
      return;
    }
    if (p.bankrupt) return;
    p.disconnected = true;
    addLog(state, `${p.name} se desconectó. Puede volver a entrar y conserva todo.`);
    settleDisconnected(state);
  },

  actions: {
    /* ---------- INICIO ---------- */
    SET_READY(ctx, { player, payload }) {
      const state = ctx.state;
      if (state.phase !== "waiting" || state.started) return;
      const p = playerById(state, player.id);
      if (!p) return;
      p.ready = typeof payload?.ready === "boolean" ? payload.ready : !p.ready;
      addLog(state, p.ready ? `${p.name} está listo.` : `${p.name} ya no está listo.`);
      tryAutoStart(state);
    },

    ROLL_INITIAL(ctx, { player }) {
      const state = ctx.state;
      if (state.phase !== "initroll") return;
      rollInitial(state, player.id);
    },

    // Se llama pasados 5 s del anuncio de quién empieza (cualquier cliente puede pedirlo)
    BEGIN_GAME(ctx) {
      const state = ctx.state;
      if (state.phase !== "initresult" || !state.initRoll) return;
      if (Date.now() - state.initRoll.doneAt < 4500) return;
      state.phase = "roll";
      state.turn = 0;
      state.dice = [0, 0];
      state.doubles = 0;
      state.current = null;
      addLog(state, `¡Comienza la partida! Orden: ${state.players.map(p => p.name).join(", ")}`);
      settleDisconnected(state);
    },

    /* ---------- DADOS ---------- */
    ROLL_DICE(ctx, { player }) {
      const state = ctx.state;
      if (state.phase !== "roll") return;
      const p = currentPlayer(state);
      if (!p || p.id !== player.id) return;
      if (p.inJail) { jailRoll(ctx, p); return; }

      const d1 = rand6(), d2 = rand6();
      state.dice = [d1, d2];

      if (d1 === d2) {
        state.doubles++;
        if (state.doubles === 3) {
          addLog(state, `${p.name} saca 3 dobles y va a la cárcel.`);
          sendToJail(state, p);
          state.phase = "end";
          return;
        }
      } else {
        state.doubles = 0;
      }

      addLog(state, `${p.name} tira ${d1}+${d2}=${d1 + d2}`);
      movePlayer(state, p, d1 + d2);
      resolveLanding(ctx, p);
    },

    /* ---------- COMPRA ---------- */
    BUY_PROPERTY(ctx, { player }) {
      const state = ctx.state;
      if (state.phase !== "action") return;
      const p = currentPlayer(state);
      if (!p || p.id !== player.id) return;
      const b = state.board[state.current];
      if (!b || b.owner !== null || !b.price) return;
      if (p.money < b.price) return;
      p.money -= b.price;
      b.owner = p.id;
      addLog(state, `${p.name} compra ${b.name} por $${b.price}.`);
    },

    /* ---------- SUBASTA ---------- */
    START_AUCTION(ctx, { player }) {
      const state = ctx.state;
      if (state.phase !== "action") return;
      const p = currentPlayer(state);
      if (!p || p.id !== player.id) return;
      const idx = state.current;
      const b = state.board[idx];
      if (!b || b.owner !== null || !b.price) return;

      const activeIds = activePlayers(state).map(x => x.id);
      const start = activeIds.indexOf(p.id);
      const order = activeIds.slice(start).concat(activeIds.slice(0, start));
      state.auction = { prop: idx, order, idx: 0, bid: 0, high: null, passed: [] };
      state.phase = "auction";
      addLog(state, `Subasta de ${b.name}.`);
      settleDisconnected(state);
    },

    AUCTION_BID(ctx, { player, payload }) {
      const state = ctx.state;
      if (state.phase !== "auction" || !state.auction) return;
      const a = state.auction;
      if (a.order[a.idx] !== player.id) return;
      const inc = payload?.amount === 50 ? 50 : 10;
      const p = playerById(state, player.id);
      const amount = a.bid + inc;
      if (p.money < amount) return;
      a.bid = amount; a.high = player.id;
      addLog(state, `${p.name} puja $${amount}.`);
      auctionNext(state);
      settleDisconnected(state);
    },

    AUCTION_PASS(ctx, { player }) {
      const state = ctx.state;
      if (state.phase !== "auction" || !state.auction) return;
      const a = state.auction;
      if (a.order[a.idx] !== player.id) return;
      if (!a.passed.includes(player.id)) a.passed.push(player.id);
      addLog(state, `${playerById(state, player.id).name} pasa.`);
      auctionNext(state);
      settleDisconnected(state);
    },

    /* ---------- TURNO ---------- */
    END_TURN(ctx, { player }) {
      const state = ctx.state;
      if (state.phase !== "action" && state.phase !== "end") return;
      const p = currentPlayer(state);
      if (!p || p.id !== player.id) return;
      if (!p.inJail && state.dice[0] === state.dice[1] && state.doubles > 0 && state.doubles < 3) {
        state.phase = "roll";
        addLog(state, `${p.name} sacó dobles y vuelve a tirar.`);
        return;
      }
      nextPlayer(state);
    },

    /* ---------- DEUDAS ---------- */
    PAY_DEBT(ctx, { player }) {
      const state = ctx.state;
      if (state.phase !== "debt" || !state.debt) return;
      const d = state.debt;
      if (d.fromId !== player.id) return;
      const p = playerById(state, d.fromId);
      if (p.money < d.amount) return;
      p.money -= d.amount;
      if (d.toId !== null) playerById(state, d.toId).money += d.amount;
      addLog(state, `${p.name} paga la deuda de $${d.amount}.`);
      state.debt = null;
      state.phase = "action";
    },

    DECLARE_BANKRUPT(ctx, { player }) {
      const state = ctx.state;
      if (state.phase !== "debt" || !state.debt) return;
      const d = state.debt;
      if (d.fromId !== player.id) return;
      bankruptPlayer(state, playerById(state, d.fromId), d.toId);
    },

    /* ---------- IMPUESTO ---------- */
    PAY_TAX(ctx, { player, payload }) {
      const state = ctx.state;
      if (state.phase !== "tax" || !state.taxChoice) return;
      if (state.taxChoice.playerId !== player.id) return;
      const p = playerById(state, player.id);
      const choice = payload?.choice;
      let amount;
      if (choice === "percent") {
        amount = Math.floor(calcNetWorth(state, player.id) * 0.10);
      } else {
        amount = state.taxChoice.flatAmount;
      }
      addLog(state, `${p.name} paga $${amount} de impuesto.`);
      state.taxChoice = null;
      if (tryPay(ctx, player.id, amount, null)) state.phase = "action";
    },

    /* ---------- CONSTRUCCIÓN UNIFORME ---------- */
    BUILD_HOUSE(ctx, { player, payload }) {
      const state = ctx.state;
      if (["debt","auction","tax","gameover"].includes(state.phase)) return;
      const idx = payload?.index;
      if (!canBuildUniform(state, player.id, idx)) return;
      const b = state.board[idx];
      const p = playerById(state, player.id);
      p.money -= b.houseCost;
      if (b.houses < 4) state.bank.houses--; else { state.bank.hotels--; state.bank.houses += 4; }
      b.houses++;
      addLog(state, `${p.name} construye en ${b.name}. ${b.houses === 5 ? "Hotel" : "Casas: " + b.houses}.`);
    },

    SELL_HOUSE(ctx, { player, payload }) {
      const state = ctx.state;
      const b = state.board[payload?.index];
      const p = playerById(state, player.id);
      if (!b || b.owner !== player.id || b.houses <= 0) return;
      const groupProps = state.board.filter(x => x.type === "property" && x.group === b.group);
      const maxH = Math.max(...groupProps.map(x => x.houses));
      if (b.houses !== maxH) return;
      if (b.houses === 5) {
        if (state.bank.houses < 4) { addLog(state, "No hay casas suficientes en la banca para bajar el hotel."); return; }
        state.bank.hotels++; state.bank.houses -= 4;
      } else state.bank.houses++;
      b.houses--;
      p.money += Math.floor(b.houseCost / 2);
      addLog(state, `${p.name} vende casa en ${b.name}.`);
    },

    MORTGAGE(ctx, { player, payload }) {
      const state = ctx.state;
      const b = state.board[payload?.index];
      const p = playerById(state, player.id);
      if (!b || b.owner !== player.id || b.mortgaged) return;
      if (b.type === "property" && b.houses > 0) return;
      if (b.type === "property") {
        const groupProps = state.board.filter(x => x.type === "property" && x.group === b.group);
        if (groupProps.some(x => x.houses > 0)) return;
      }
      b.mortgaged = true;
      p.money += Math.floor(b.price / 2);
      addLog(state, `${p.name} hipoteca ${b.name}.`);
    },

    UNMORTGAGE(ctx, { player, payload }) {
      const state = ctx.state;
      const b = state.board[payload?.index];
      const p = playerById(state, player.id);
      if (!b || b.owner !== player.id || !b.mortgaged) return;
      const cost = Math.ceil((b.price / 2) * 1.1);
      if (p.money < cost) return;
      p.money -= cost;
      b.mortgaged = false;
      addLog(state, `${p.name} deshipoteca ${b.name} por $${cost}.`);
    },

    /* ---------- CÁRCEL ---------- */
    PAY_JAIL(ctx, { player }) {
      const state = ctx.state;
      const p = playerById(state, player.id);
      if (state.phase !== "roll" || currentPlayer(state)?.id !== player.id) return;
      if (!p || !p.inJail || p.money < 50) return;
      p.money -= 50; p.inJail = false; p.jailTurns = 0;
      addLog(state, `${p.name} paga fianza y sale.`);
    },

    USE_JAIL_CARD(ctx, { player }) {
      const state = ctx.state;
      const p = playerById(state, player.id);
      if (state.phase !== "roll" || currentPlayer(state)?.id !== player.id) return;
      if (!p || !p.inJail || p.getOut <= 0) return;
      p.getOut--; p.inJail = false; p.jailTurns = 0;
      returnJailCard(state);
      addLog(state, `${p.name} usa carta de salir de la cárcel.`);
    },

    /* ---------- TRUEQUES ---------- */
    PROPOSE_TRADE(ctx, { player, payload }) {
      const state = ctx.state;
      if (["debt", "auction", "tax", "gameover", "waiting"].includes(state.phase)) return;
      const n = (v) => Math.max(0, Math.floor(Number(v) || 0));
      const arr = (v) => Array.isArray(v) ? v.map(Number).filter(Number.isInteger) : [];
      const t = {
        fromId: player.id, toId: payload?.toId,
        offerProps: arr(payload?.offerProps), requestProps: arr(payload?.requestProps),
        offerMoney: n(payload?.offerMoney), requestMoney: n(payload?.requestMoney),
        offerJailCards: n(payload?.offerJailCards), requestJailCards: n(payload?.requestJailCards)
      };
      if (!validTrade(state, t)) return;
      state.trade = t;
      addLog(state, `${playerById(state, t.fromId).name} propone trueque a ${playerById(state, t.toId).name}.`);
    },

    ACCEPT_TRADE(ctx, { player }) {
      const state = ctx.state;
      if (!state.trade || state.trade.toId !== player.id) return;
      const t = state.trade;
      if (!validTrade(state, t)) {
        addLog(state, "El trueque ya no es válido y se canceló.");
        state.trade = null;
        return;
      }
      const from = playerById(state, t.fromId);
      const to = playerById(state, t.toId);
      const fee = (i) => state.board[i].mortgaged ? Math.ceil(state.board[i].price / 20) : 0;
      t.requestProps.forEach(i => { from.money -= fee(i); });
      t.offerProps.forEach(i => { to.money -= fee(i); });

      for (const i of t.offerProps) state.board[i].owner = t.toId;
      for (const i of t.requestProps) state.board[i].owner = t.fromId;
      from.money -= t.offerMoney; to.money += t.offerMoney;
      to.money -= t.requestMoney; from.money += t.requestMoney;
      from.getOut -= t.offerJailCards; to.getOut += t.offerJailCards;
      to.getOut -= t.requestJailCards; from.getOut += t.requestJailCards;

      addLog(state, `Trueque aceptado entre ${from.name} y ${to.name}.`);
      state.trade = null;
    },

    REJECT_TRADE(ctx, { player }) {
      const state = ctx.state;
      if (!state.trade || state.trade.toId !== player.id) return;
      addLog(state, `Trueque rechazado por ${playerById(state, player.id).name}.`);
      state.trade = null;
    },

    CANCEL_TRADE(ctx, { player }) {
      const state = ctx.state;
      if (!state.trade || state.trade.fromId !== player.id) return;
      addLog(state, `Trueque cancelado.`);
      state.trade = null;
    }
  }
});