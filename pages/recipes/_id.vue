<template>
    <v-app class="main-background-color">
        <v-container class="recipeBlock" pa-16>
            <v-row>
            <v-col md="9">
            <v-row>
                <!-- <div>{{this.$route.params.id}}</div> -->
                <v-col>
                    <h1> {{findrecipe.name}}
                    </h1>
                    <h2>
                        Estimated Preparation Time: {{findrecipe.preptime.value}}
                    </h2>
                    <h2>
                        Added by: {{findrecipe.username}}
                    </h2>
                    <nuxt-link class=tag :to="'edit/' + `${this.$route.params.id}`" icon>
                    <!-- <v-btn class="tag" to="/recipes/editRecipe" icon> -->
                        <v-icon>mdi-pencil</v-icon>
                    <!-- </v-btn> -->
                    </nuxt-link>
                    <v-btn class="tag" @click="deleteRecipe()" icon>
                        <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                </v-col>
                <v-col>
                    <v-img
                        lazy-src="https://picsum.photos/id/11/10/6"
                        max-height="300"
                        max-width="500"
                        src="https://picsum.photos/id/11/500/300"
                    ></v-img>
                </v-col>
            </v-row>
            
            
            <h3>
                Ingredients:
            </h3>
            <ul>
                <li v-for="item in findrecipe.ingridients" v-bind:key="item.ingredient">{{ item.ingredient }}</li>
            </ul>
            <br>
            <h3>
                Steps:
            </h3>
            <ul>
                <li v-for="item in findrecipe.steps" v-bind:key="item.step">{{ item.step }}</li>
            </ul>
            </v-col>
            </v-row>
        </v-container>
        
    </v-app>
</template>

<script>
// import AppNavigation from '@/components/AppNavigation';
import { mapState } from "vuex";



export default {

    computed: mapState({
    findrecipe (state) {
        return this.$store.state.recipes.recipes.find(el => el.id === this.id);
    }
}),
methods: {
        deleteRecipe () {
            console.log( "Inside vue page, delete function, data is: ", this.$route.params.id)
            const result = this.$store.dispatch('recipes/remove', this.$route.params.id)
            // this.$notify(result.message)
            // if (result[DELETED]) this.$router.push('/discover')
            if (result) this.$router.push('/recipes/discover')
        }
},

//     data: () => ({
//         id: this.$route.params.id,
//         title: 'Pesto-Pasta', 
//         user: 'Claire', 
//         time: '30 minutes', 
//         src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', 
//         ingredients: [
//             {ingredient: '1 squash'},
//             {ingredient: '2 cans black beans'},
//             {ingredient: 'handful of frozen peas'},
//             {ingredient: '2 cups cooked rice'},
//             {ingredient: '1 can coconut milk'},
//         ],
//         steps: [
//             {step: 'Mix some stuff together'},
//             {step: 'Then cook it all up'},
//             {step: 'Then let it cool'},
//             {step: 'Enjoy it thoroughly'},
//             {step: 'Digest'},
//             {step: 'Do the neverending dishes'},
//         ],
//         // flex: 4
//   }),
data() {
    return {
      id: this.$route.params.id,
    };
  },
}
</script>

<style scoped>
    
    .main-background-color{
    background-color: #fbe9e7
  }
  a{
      color: black;
  }
  .recipeBlock{
      
  }
</style>




