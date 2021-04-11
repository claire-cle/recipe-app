<template>
    <v-container fluid>
        <v-layout justify-center column pa-12>
            
            <v-row pa-12>

            <v-container fluid>
              <v-row dense>
                <v-col
                  v-for="card in cards"
                  :key="card.recipeId"
                  :cols=4
                >
                <recipe-card @bookmark='console.log($event)' 
                  v-bind:name="card.name"
                  v-bind:user="card.user"
                  v-bind:prepTime="card.prepTime"
                  v-bind:flex=4
                  ></recipe-card>
          </v-col>
        </v-row>
      </v-container>
            </v-row>
        </v-layout>
    </v-container>
    
</template>

<script>
import recipeCard from "~/components/recipeCard.vue";

export default {
    // computed: {
    // authenticated () {
    //   return this.$store.state.accounts.token
    //   }
    // },

    name: 'app',
    components: {
      recipeCard
    },
    // data: () => ({
    data () {
      this.$store.dispatch('recipes/get')
      return {
        cards: this.$store.state.recipes.recipes,
        // modalIsVisible: false
        alignments: [
          'start',
          'center',
          'end',
        ],
        random: this.$store.state
      }
    
    // cards: [
    //   { recipeId: 1, name: 'Pesto-Pasta', user: 'Not Claire', prepTime: '30 minutes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'},
    //   { recipeId: 2, name: 'Lemon Icecream', user: 'Claire', prepTime: '40 minutes', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg'},
    //   { recipeId: 3, name: 'Baked Oatmeal', user: 'Claire', prepTime: '45 minutes', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'},
    //   { recipeId: 4, name: 'Vegetable Gallete', user: 'Claire', prepTime: '45 minutes', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'},
    //   { recipeId: 5, name: 'Sweet Potatoe Gnocchi', user: 'Claire',  prepTime: '45 minutes', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'},
    //   { recipeId: 6, name: 'Sweet Coconut Rice', user: 'Claire', prepTime: '45 minutes', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'},
    //   { recipeId: 7, name: 'Basil ice cream', user: 'Claire', prepTime: '45 minutes', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'},
    //   { recipeId: 8, name: 'Lotz of pizza', user: 'Claire',  prepTime: '45 minutes', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'},
    //   { recipeId: 9, name: 'Za with corn', user: 'Claire', prepTime: '45 minutes', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'},
    // ],
  // }),
  },
  computed: {
    recipes () {
      return this.$store.state.recipes
    }
  },

  filters: {
    pretty: function(value) {
      return JSON.stringify(value) 
    }
  }
};
</script>

<style scoped>

</style>