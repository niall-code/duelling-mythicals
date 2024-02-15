// When HTML has loaded, add event listener to button
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('begin').addEventListener('click', initiate);
})

/** 
 * When 'play now' button is clicked, replace start screen with game screen
*/
function initiate(event) {
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
      <button id="new" aria-label="Start a new game">NEW GAME</button>

      <button id="dragon-button" aria-label="Select a dragon card">dragon (
        <span id="dragon-count" class="count">5</span> )
      </button>
      <button id="unicorn-button" aria-label="Select a unicorn card">unicorn (
        <span id="unicorn-count" class="count">5</span> )
      </button>
      <button id="mermaid-button" aria-label="Select a mermaid card">mermaid (
        <span id="mermaid-count" class="count">5</span> )
      </button>
      <button id="elf-button" aria-label="Select an elf card">elf (
        <span id="elf-count" class="count">5</span> )
      </button>
      <button id="fairy-button" aria-label="Select a fairy card">fairy (
        <span id="fairy-count" class="count">5</span> )
      </button>

    </div>
  </main>
  `;
}