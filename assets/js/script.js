// Arrays that establish the start-of-game decks

let playerDeck = ['dragon', 'dragon', 'dragon', 'dragon', 'dragon',
'unicorn', 'unicorn', 'unicorn', 'unicorn', 'unicorn',
'mermaid', 'mermaid', 'mermaid', 'mermaid', 'mermaid',
'elf', 'elf', 'elf', 'elf', 'elf',
'fairy', 'fairy', 'fairy', 'fairy', 'fairy'];

let computerDeck = ['dragon', 'dragon', 'dragon', 'dragon', 'dragon',
'unicorn', 'unicorn', 'unicorn', 'unicorn', 'unicorn',
'mermaid', 'mermaid', 'mermaid', 'mermaid', 'mermaid',
'elf', 'elf', 'elf', 'elf', 'elf',
'fairy', 'fairy', 'fairy', 'fairy', 'fairy'];

// Objects containing arrays to read from when comparing cards

let dragon = {
  dragon: ['You both chose a dragon. Neither creature could gain an advantage.', 'draw'],
  unicorn: ['Your dragon won against their unicorn. It fought bravely but was outmatched.', 'win'],
  mermaid: ['Your dragon lost to their mermaid. She is in water, so fire is useless against her.', 'loss'],
  elf: ['Your dragon won against their elf. His arrows cannot pierce scales.', 'win'],
  fairy: ['Your dragon lost to their fairy. She stunned it with her magical powers.', 'loss'],
}

let unicorn = {
  dragon: ['Your unicorn lost. It fought bravely but was outmatched by their dragon.', 'loss'],
  unicorn: ['You both chose a unicorn. Neither creature could gain an advantage.', 'draw'],
  mermaid: ['Your unicorn lost to their mermaid. She would have drowned it, if it did not relent.', 'loss'],
  elf: ['Your unicorn won against their elf, beguiling him and letting him have a ride.', 'win'],
  fairy: ['Your unicorn is immune to magic. It won against their fairy.', 'win'],
}

let mermaid = {
  dragon: ['Your mermaid is in water, so fire is useless against her. She won against their dragon.', 'win'],
  unicorn: ['Your mermaid won against their unicorn, refraining from drowning it only because it relented.', 'win'],
  mermaid: ['You both chose a mermaid. Neither creature could gain an advantage.', 'draw'],
  elf: ['Your mermaid lost to their elf. He caught her in a net!', 'loss'],
  fairy: ['Your mermaid lost to their fairy, becoming stunned by her magical powers.', 'loss'],
}

let elf = {
  dragon: ['Your elf cannot pierce scales with his arrows. He lost to their dragon.', 'loss'],
  unicorn: ['Your elf lost to their unicorn, feeling enchanted by it and getting bribed with an opportunity to ride it.', 'loss'],
  mermaid: ['Your elf won against their mermaid, capturing her with a net.', 'win'],
  elf: ['You both chose an elf. Neither creature could gain an advantage.', 'draw'],
  fairy: ['Your elf managed to win against their fairy, proving himself resistant enough to magic.', 'win'],
}

let fairy = {
  dragon: ['Your fairy won against their dragon, stunning it with her magical powers.', 'win'],
  unicorn: ['Your fairy lost to their unicorn. It is immune to magic.', 'loss'],
  mermaid: ['Your fairy won against their mermaid, stunning her with her magical powers.', 'win'],
  elf: ['Your fairy lost to their elf. He proved to be sufficiently resistant to magic.', 'loss'],
  fairy: ['You both chose a fairy. Neither creature could gain an advantage.', 'draw'],
}

// Variables for score tallying

let wins = 0;
let losses = 0;
let draws = 0;

// Event listener on begin button

document.getElementById('begin').addEventListener('click', initialise);

/** 
 * When begin button is clicked, replace start screen with game screen
 * and add event listeners to buttons
*/
function initialise(event) {
  document.body.innerHTML = `
  <main>
    <div id="computer-card-zone" class="card-zone">
      <p>computer's<br>card area</p>
    </div>

    <div id="player-card-zone" class="card-zone">
      <p>player's<br>card area</p>
    </div>

    <div id="text-zone">
      <div id="inner-text-zone">
        <p>Please choose a card.</p>
      </div>
    </div>

    <div id="card-buttons">

      <button id="home" aria-label="Exit game and return to start screen">HOME</button>
      <button id="new-game" aria-label="Start a new game">NEW GAME</button>

      <button id="dragon" class="mythical" aria-label="Select a dragon card">dragon (
        <span id="dragon-count" class="count">5</span> )
      </button>
      <button id="unicorn" class="mythical" aria-label="Select a unicorn card">unicorn (
        <span id="unicorn-count" class="count">5</span> )
      </button>
      <button id="mermaid" class="mythical" aria-label="Select a mermaid card">mermaid (
        <span id="mermaid-count" class="count">5</span> )
      </button>
      <button id="elf" class="mythical" aria-label="Select an elf card">elf (
        <span id="elf-count" class="count">5</span> )
      </button>
      <button id="fairy" class="mythical" aria-label="Select a fairy card">fairy (
        <span id="fairy-count" class="count">5</span> )
      </button>

    </div>
  </main>
  `;

  let mythicals = document.getElementsByClassName('mythical');
  for (let mythical of mythicals) {
    mythical.addEventListener('click', cardChoice);
  }

  document.getElementById('home').addEventListener('click', startScreen);

  document.getElementById('new-game').addEventListener('click', newGame);
}

/** 
 * When a card selection button is clicked, display corresponding image in player's card zone,
 * remove one card of that kind from player's deck, and have computer likewise pick a card
*/
function cardChoice(event) {
  let creature = this.id;
  document.getElementById('player-card-zone').innerHTML = `<img src="assets/images/${creature}.webp" alt="${creature} card">`;
  let position = playerDeck.indexOf(creature);
  playerDeck.splice(position, 1);
  let cardCount = document.getElementById(`${creature}-count`).innerText;
  cardCount = --parseInt(cardCount);
  document.getElementById(`${creature}-count`).innerText = cardCount;
  let playerActiveCard = creature;

  let remaining = computerDeck.length;
  let decision;
  decision = remaining > 1 ? Math.round(Math.random() * remaining) : 0;
  creature = computerDeck[decision];
  document.getElementById('computer-card-zone').innerHTML = `<img src="assets/images/${creature}.webp" alt="${creature} card">`;
  computerDeck.splice(decision, 1);
  let computerActiveCard = creature;

  compareCards(playerActiveCard, computerActiveCard);
}

function compareCards(playerCard, compuCard) {
  switch (playerCard) {
    case 'dragon':
      document.getElementsByTagName('p')[0].innerText = dragon[compuCard][0];
      dragon[compuCard][1] === 'win' ? wins += 1 : dragon[compuCard][1] === 'loss' ? losses += 1 : draws += 1;
      break;
    case 'unicorn':
      document.getElementsByTagName('p')[0].innerText = unicorn[compuCard][0];
      unicorn[compuCard][1] === 'win' ? wins += 1 : unicorn[compuCard][1] === 'loss' ? losses += 1 : draws += 1;
      break;
    case 'mermaid':
      document.getElementsByTagName('p')[0].innerText = mermaid[compuCard][0];
      mermaid[compuCard][1] === 'win' ? wins += 1 : mermaid[compuCard][1] === 'loss' ? losses += 1 : draws += 1;
      break;
    case 'elf':
      document.getElementsByTagName('p')[0].innerText = elf[compuCard][0];
      elf[compuCard][1] === 'win' ? wins += 1 : elf[compuCard][1] === 'loss' ? losses += 1 : draws += 1;
      break;
    case 'fairy':
      document.getElementsByTagName('p')[0].innerText = fairy[compuCard][0];
      fairy[compuCard][1] === 'win' ? wins += 1 : fairy[compuCard][1] === 'loss' ? losses += 1 : draws += 1;
      break;
  }

  endOfGame();
}

function endOfGame() {
  if (!computerDeck.length) {

    if (wins > losses) {
      document.getElementsByTagName('p')[0].innerHTML += `
      <br>
      <strong>You are victorious! Tales will be told of you!</strong>
      `;
    } else if (wins === losses) {
      document.getElementsByTagName('p')[0].innerHTML += `
      <br>
      <strong>Neither side could overcome the other.</strong>
      `;
    } else {
      document.getElementsByTagName('p')[0].innerHTML += `
      <br>
      <strong>It appears you have been defeated, this time.</strong>
      `;
    }

    document.getElementsByTagName('p')[0].innerHTML += `
    <br>
    Wins: ${wins} - Losses: ${losses} - Draws: ${draws}
    `;
  }
}