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

  let remaining = computerDeck.length;
  let decision;
  decision = remaining > 1 ? Math.round(Math.random() * remaining) : decision = 0;
  creature = computerDeck[decision];
  document.getElementById('computer-card-zone').innerHTML = `<img src="assets/images/${creature}.webp" alt="${creature} card">`;
  computerDeck.splice(decision, 1);
}