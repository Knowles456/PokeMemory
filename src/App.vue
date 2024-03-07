<template>
  <div class="app">
    <div class="poke-header">PokeMemory</div>
    <h2 class="info-text">Remember every card you've clicked and be sure to only click each card once</h2>
    <h2 class="score-counter">Score: {{ score }}</h2>
    <h2 class="high-score-counter">High Score: {{ highScore }}</h2>
    <div class="poke-cards">
      <div v-for="(card, index) in pokemonCards" :key="index" class="poke-card" @click="handleClick(card)">
        <h1>{{ card.name }}</h1>
        <img :src="card.image" alt="Pokemon Image">
      </div>
    </div>
  </div>
</template>

<script>
import PokemonCard from '@/pokemoncard.js';

export default {
  data() {
    return {
      pokemon: null,
      pokemonCards: [],
      shuffledCards: [],
      score: 0,
      highScore: 0,
      scored: false,
      mistake: false,


    };
  },
  methods: {
    async getRandomPokemon() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + this.getRandomNumber());
        const data = await response.json();
        const capitalizedName = data.name.charAt(0).toUpperCase()+data.name.slice(1);
        this.pokemon = {
          name: capitalizedName,
          image: data.sprites.front_default
        };
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    getRandomNumber() {
      return Math.floor(Math.random() * 150) + 1; 
    },

    async addCards(){
      let loops = 0;
      while(loops < 16){
        await this.getRandomPokemon();
        console.log(this.pokemon);
        if (!this.pokemonCards.some(card => card.name === this.pokemon.name)) {
          const newCard = new PokemonCard(this.pokemon.name, this.pokemon.image)
          this.pokemonCards.push(newCard);
          loops++;
        }
      }
    },

    handleClick(card){
      if(card.clicked){
        console.log("Reset Game")
        this.resetGame()
      }
      else{
        card.beenClicked();
        this.score++;
        this.shuffleCards(this.pokemonCards)
      }
    },
    
    shuffleCards(cards) {
      let currentIndex = cards.length,  randomIndex;
      while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [cards[currentIndex], cards[randomIndex]] = [
        cards[randomIndex], cards[currentIndex]];
      }
      return cards;
    },

    resetGame(){
      if(this.score > this.highScore){
        this.highScore = this.score;
      }
      this.score = 0;
      this.pokemonCards = [];
      this.addCards();
    }

  },

  mounted(){
      this.addCards();
    }
};
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative; 
  background: linear-gradient(135deg, #f5d12b, #f03e3e, #4cb0ef, #71e7a8);
  background-size: 600% 600%;
  animation: gradientAnimation 15s ease infinite;
}

.poke-header {
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  font-size: 3.5em;
  background: linear-gradient(135deg, #f4b400, #ff5f52, #1a82c4, #59cb92); 
  -webkit-background-clip: text; 
  -webkit-text-fill-color: transparent; 
}

.info-text {
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 20px;
  color: white;
}

.score-counter {
  position: absolute;
  top: 5px; 
  right: 20px; 
  color: white; 
}

.high-score-counter {
  position: absolute;
  top: 35px; 
  right: 20px; 
  color: white; 
}

.poke-cards {
  display: flex;
  flex-direction: row; 
  justify-content: center;
  flex-wrap: wrap; 
}

.poke-card {
  padding: 20px;
  border-radius: 10px;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  background: transparent; 
  border: 2px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: box-shadow 0.3s ease; 
}

.poke-card:hover {
  box-shadow: 0 0 20px 0 rgba(255, 255, 255, 0.5); /* Add glow effect on hover */
}

.poke-card h1 {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  color: white; /* Set text color to white */
}

.poke-card img {
  width: 150px; 
  height: 150px; 
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
img {
  width: 200px;
  height: 200px;
  margin-top: 20px;
}
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>