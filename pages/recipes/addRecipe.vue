<template>
    <v-app class="main-background-color">
        <div id='login'>
            <h1>Add a Recipe</h1>
	    </div>

        <v-form
        ref="form"
        lazy-validation
        >

        <v-text-field
        v-model="form.name"
        label="Recipe name"
        required
        ></v-text-field>
        
        Estimated Preparation Time:
        <v-select label="Select Time" outlined v-model="form.prepTime" :hint="`${form.prepTime.name}, ${form.prepTime.value}`" :items="items" item-text="name" item-value="value" return-object
            single-line>
            <!-- <option disabled value="">Time</option>
            <option>5 Min</option>
            <option>10 Min</option>
            <option>15 Min</option>
            <option>30 Min</option>
            <option>45 Min</option>
            <option>1 Hr</option>
            <option>1 Hr 5 Min</option>
            <option>1 Hr 10 Min</option> -->
        </v-select>
        <!-- <span>{{ selected }}</span> -->
        <!-- <v-col
          cols="12"
          sm="6"
          md="4"
        >
        <v-text-field
        v-model="form.ingredients"
        label="Ingredients"
        required
        filled
        dense
        ></v-text-field>
        </v-col> -->

        <label class="text-gray-600 font-semibold text-lg">Ingredients</label>
        <div
          v-for="(input, index) in form.ingridients"
          :key="`ingredientInput-${index}`"
          class="input wrapper flex items-center"
        >
          <input 
               v-model="input.ingredient"
               type="text" 
               class="h-10 rounded-lg outline-none p-2" 
               placeholder=" Enter Ingredient"     
          />
           <!--          Add Svg Icon-->
          <svg

            @click="addField(input, form.ingridients)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="ml-2 cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="green"
              d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
            />
          </svg>

          <!--          Remove Svg Icon-->
          <svg
            v-show="form.ingridients.length > 1"
            @click="removeField(index, form.ingridients)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="ml-2 cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="#EC4899"
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
            />
          </svg>
        </div> 

        <!-- <div
                v-for="(ingredient, counter) in form.ingredients"
                v-bind:key="counter">
            <span @click="deleteIngredient(counter)">x</span>
            <label>Ingredient {{counter+1}}</label>
            <input type="text" v-model="ingredient.previous" required> 
        </div> -->

        <label class="text-gray-600 font-semibold text-lg">Steps</label>
        <div
          v-for="(input, index) in form.steps"
          :key="`stepInput-${index}`"
          class="input wrapper flex items-center"
        >
          <input 
               v-model="input.step"
               type="text" 
               class="h-10 rounded-lg outline-none p-2" 
               placeholder=" Enter Step"     
          />
           <!--          Add Svg Icon-->
          <svg

            @click="addField(input, form.steps)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="ml-2 cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="green"
              d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
            />
          </svg>

          <!--          Remove Svg Icon-->
          <svg
            v-show="form.steps.length > 1"
            @click="removeField(index, form.steps)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="ml-2 cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="#EC4899"
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
            />
          </svg>
        </div> 

        Add image
        <v-btn
        >
        Upload from Computer
        </v-btn>

        <v-btn
        color="success"
        class="mr-4"
        @click="createRecipe()"
        >
        Submit Recipe
        </v-btn>

  </v-form>
    </v-app>
</template>

<script>
import AppNavigation from '@/components/AppNavigation';

export default {
    name: 'App',
    components: {
        AppNavigation
    },
    methods: {
        createRecipe () {
          const { name, prepTime, ingridients, steps } = this.form
          const username = this.$store.state.accounts.username
            // console.log("inside createrecipe function on addrecipe page: ", prepTime, prepTime.name, prepTime.value)
            const success = this.$store.dispatch('recipes/addRecipe', {
              name,
              prepTime,
              ingridients,
              steps,
              username
            })
            if (success) {
                    // this.$notify({
                    // type: 'success',
                    // title: 'Success',
                    // message: 'Account created.'
                    // })
                    this.$router.push('/recipes/myRecipe')
                }
        },
        deleteIngredient(counter){
            this.form.ingridients.splice(counter,1);
        },
        addField(value, fieldType) {
            fieldType.push({ value: "" });
        },
        removeField(index, fieldType) {
            //type.splice(index, 1);
            fieldType.splice(index, 1);
        }
        
    },
    data () { 
        return {
            // items: ['5 min', '10 min', '15 min', '20 min', '25 min', '30 min', '35 min', '40 min', '45 min', '50 min', '55 min', '1 hr'],
            items: [
                { name: '5 min', value: 5},
                { name: '10 min', value: 10},
                { name: '15 min', value: 15},
                { name: '20 min', value: 20},
                { name: '25 min', value: 25},
                { name: '30 min', value: 30},
                { name: '35 min', value: 35},
                { name: '40 min', value: 40},
                { name: '45 min', value:45},
                { name: '50 min', value: 50},
                { name: '55 min', value: 55},
                { name: '1 hr', value: 60}
            ],
            form: {
                name: "",
                prepTime: { name: '', value: null},
                ingridients: [
                    {ingredient: ''},
                ],
                steps: [
                    {step: ''},
                ]
            },
            
        }
    }
}

</script>

<style scoped>
    #login {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		/* height: 10%; */
	}
    .main-background-color{
    background-color: #fbe9e7
  }
  a{
      color: black
  }
</style>