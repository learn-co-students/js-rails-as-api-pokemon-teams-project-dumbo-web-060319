const BASE_URL = 'http://localhost:3000';
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

function fetchTrainer() {
  fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(showTrainer);
}

function catchPokemon() {
  let buttons = document.querySelectorAll('.catch');
  buttons.forEach(button => {
    // console.log(button);
    button.addEventListener('click', event => {
      let trainerId = event.target.dataset;
      addPokemon(trainerId);
    });
  });
}

function addPokemon(trainerId) {
  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      trainer_id: trainerId
    })
  })
    .then(response => response.json())
    .then(showPokemon);
}

function throwPokemonInTrash() {
  const buttons = document.querySelectorAll('.release');
  buttons.forEach(button => {
    button.addEventListener('click', function(event) {
      console.log(event.target);
      let pokemonId = event.target.dataset;
      let id = pokemonId['pokemonId'];
      console.log(pokemonId['pokemonId']);
      fetch(`${POKEMONS_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: pokemonId
        })
      })
        .then(response => response.json())
        .then(removePokemon);
    });
  });
}

function removePokemon(json) {
  console.log(json);
  let li = document.querySelector(`#poke-list-item-${json.id}`);
  li.remove();
  // document.querySelector
}

function showPokemon(pokemon) {
  const ul = document.querySelector(`#poke-list-${pokemon.trainer_id}`);
  let li = document.createElement('li');
  ul.append(li);
  li.id = `poke-list-item-${pokemon.id}`;
  li.innerHTML = `
          ${pokemon.nickname} (${
    pokemon.species
  }) <button class="release" data-pokemon-id=${pokemon.id}>Release</button>
        `;
}

function showTrainer(json) {
  const main = document.querySelector('main');
  json.forEach(trainer => {
    let card = document.createElement('div');
    main.append(card);
    card.classList = 'card';
    card.dataset.dataId = `${trainer.id}`;
    card.innerHTML = `
    <p>${trainer.name}</p>
    <button data-trainer-id="${trainer.id}" class="catch">Add Pokemon</button>
    <ul id="poke-list-${trainer.id}">
    </ul>
    `;
    trainer.pokemons.forEach(pokemon => {
      const ul = document.querySelector(`#poke-list-${trainer.id}`);
      let li = document.createElement('li');
      ul.append(li);
      li.id = `poke-list-item-${pokemon.id}`;
      li.innerHTML = `
      ${pokemon.nickname} (${
        pokemon.species
      }) <button class="release" data-pokemon-id="${
        pokemon.id
      }">Release</button>
      `;
    });
  });
  throwPokemonInTrash();
  catchPokemon();
}

document.addEventListener('DOMContentLoaded', () => {
  fetchTrainer();
});

/*
<div class="card" data-id="1"><p>Prince</p>
  <button data-trainer-id="1">Add Pokemon</button>
  <ul>
    <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  </ul>
</div>
*/
