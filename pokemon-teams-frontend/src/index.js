const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function fetchAllTrainers() {
  fetch(TRAINERS_URL, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      myJson.forEach(function(trainer) {
        renderTrainer(trainer);
      });
  });
}

function renderTrainer(trainerJson) {
  let div = document.createElement('div');
  div.setAttribute('class', 'card');
  div.dataset.id = trainerJson['id'];

  div.append(renderTrainerName(trainerJson));
  div.append(addTrainerPokemonButton(trainerJson));
  div.append(renderAllTrainerPokemons(trainerJson));
  document.querySelector('main').append(div);
}

function renderTrainerName(trainerJson) {
  let p = document.createElement('p');
  p.textContent = trainerJson['name'];
  return p;
}

function addTrainerPokemonButton(trainerJson) {
  let button = document.createElement('button');
  button.textContent = 'Add Pokemon';
  button.setAttribute('class', 'addPokemon')
  button.dataset.trainerId = trainerJson['id'];
  return button;
}

function removePokemonButton(pokemonId) {
  let button = document.createElement('button');
  button.textContent = "Release";
  button.setAttribute('class', 'release');
  button.dataset.pokemonId = pokemonId;
  button.addEventListener('click', function(e) {
    destroyPokemon(e.currentTarget.dataset.pokemonId);
    let parent = e.currentTarget.parentNode;
    parent.parentNode.removeChild(parent);
  });

  return button;
}

function renderAllTrainerPokemons(trainerJson) {
  let pokemons = trainerJson['pokemons']
  let ul = document.createElement('ul');
  pokemons.forEach(function(pokemon) {
    let li = renderTrainerPokemon(pokemon);
    ul.append(li);
  });
  return ul;
}

function renderTrainerPokemon(pokemon) {
  let li = document.createElement('li');
  li.textContent = `${pokemon['nickname']} (${pokemon['species']})`;
  li.append(removePokemonButton(pokemon['id']));
  return li
}

document.addEventListener('DOMContentLoaded', function(e) {
  fetchAllTrainers();
});

// Destroy

function destroyPokemon(pokemonId) {
  fetch(POKEMONS_URL + `/${pokemonId}`, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    method: 'DELETE'
  })
}

// Add
document.addEventListener('click', function(e) {
  if (e.target.className === 'addPokemon') {
    renderAddPokemonForm(e.target.parentNode);
    // e.preventDefault();
  }
});

function renderAddPokemonForm(divToRender) {
  let form = document.createElement('form');
  form.setAttribute('method', 'post');
  form.setAttribute('action', POKEMONS_URL);
  form.className = 'addPokemonForm';

  let trainerInput = document.createElement('input');
  trainerInput.setAttribute('type', 'hidden');
  trainerInput.setAttribute('name', 'pokemon[trainer_id]');
  trainerInput.value = divToRender.dataset.id;

  let nicknameInput = document.createElement('input');
  nicknameInput.setAttribute('type', 'text');
  nicknameInput.setAttribute('name', 'pokemon[nickname]');
  nicknameInput.className = 'nickname';

  let speciesInput = document.createElement('input');
  speciesInput.setAttribute('type', 'text');
  speciesInput.setAttribute('name', 'pokemon[species]');
  speciesInput.className = 'species';

  let submit = document.createElement('input');
  submit.setAttribute('type', 'submit');
  submit.setAttribute('value', 'Add Pokemon! <3 u');

  form.append(nicknameInput);
  form.append(speciesInput);
  form.append(trainerInput);
  form.append(submit);


  divToRender.append(form);
}

document.addEventListener('submit', function(e) {
  if (e.target.className === 'addPokemonForm') {
    setTimeout(function() {
      window.location.reload();
    }, 100)
  }
});
