import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields';
// import ingridients from '~/api/db/ingridients'

export const CREATED = 'recipe.created'
export const GET = 'recipe.get'
export const DELETED = 'recipe.delete'

export const state = function () {
    return {
      recipes: [],
      // recipes: [
      //   {
          singleRecipe: {
            // id: "",
            // name: "",
            // season: "",
            // preptime: null,
            // rating: "",
            // ingredients: [
            //   {ingredient: ""}
            // ]
          }
      //   }
      // ]
    }
  }

export const getters = {
    // ...
    // recipeById (state, id) {
    //   return state.recipes.recipes.filter(id = id)
    // }
    getField,
}

export const mutations = {
  updateField,
  add (state, { id, username, name, preptime, rating, ingredients, steps }) {
    state.recipes.push({ id, username, name, preptime, rating, ingredients, steps })
  },
//   remove (state, id) {
//     const index = state.lists.findIndex(list => list.id === id)
//     if (index !== -1) state.lists.splice(index, 1)
//   },
  set (state, recipes) {
    state.recipes = [...recipes]
  },
  setSingle (state, recipes) {
    state.singleRecipe = [...recipes]
  },
  update (state, { id, name, preptime, season, rating, ingredients }) {
    // console.log("data in updateName mutation is: ", id, "and ", value)
    // console.log("data #2 in updateName mutation is: ", state, "and", value, "and ", id)
    // console.log(value.state.accounts.token)
    // console.log("value.id = ", value.id)
    const index = state.recipes.findIndex(recipe => recipe.id === id)
    console.log("index: ", index)
    if (index !== -1){
      // console.log("recipe name:", state.state.recipes.recipes[index].name) //undefined
      // console.log("trying to access store state:", $store.state.recipes.recipes[index].name)
      // console.log("new name (value name):", value.value)
      state.recipes[index].name = name
      state.recipes[index].preptime = preptime
      state.recipes[index].ingredients = ingredients
      // state.recipes[index].season = season
      // state.recipes[index].rating = rating
    }
  },
  updateTime (state, {value, id}) {
    const index = state.recipes.findIndex(recipe => recipe.id === id)
    console.log("index: ", index)
    if (index !== -1){
      state.recipes[index].preptime = value
    } 
  },
  updateIngredients (state, {value, id}) {
    const index = state.recipes.findIndex(recipe => recipe.id === id)
    console.log("index: ", index)
    if (index !== -1){
      state.recipes[index].ingredients = value
    } 
  },
  delete (state, {id}) {
    console.log("inside delete mutation")
    const index = state.recipes.recipes.findIndex(recipe => recipe.id === id)
    console.log("index is")
    if (index !== -1) state.recipes.recipes.splice(index, 1)
  }
}

export const actions = {
    // create and retrieve a task list
    async addRecipe ({ commit, dispatch }, {username, name, prepTime, ingridients, steps}) {
      console.log("Inside add function, data is:", username, name, prepTime, prepTime.name, prepTime.value, ingridients, steps)
      let res = await axios
        ({
          headers: {
            Authorization: 'Bearer '+this.state.accounts.token
          },
          url: '/api/recipe',
          method: 'POST',
          data: {
            username: username,
            name: name,
            preptime: prepTime,
            season: "winter",
            rating: 5,
            // ingridients: [
            //   {ingredient: "cheese"}
            // ]
            ingridients: ingridients,
            steps: steps
          }
        }).then(function (response){
          console.log('response is : ' + response.data);
        if (response.status === 201) {
        // res = await axios.get(res.headers.Location)
        if (response.status === 200) {
          commit('add', res.data)
          return {
            message: {
              type: 'success',
              title: 'Recipe Created',
              message: 'The recipe "' + name + '" was created.'
            },
            [CREATED]: true,
            [GET]: true
          }
        } else {
          return {
            message: {
              type: 'success',
              title: 'Recipe Created',
              message: 'The recipe "' + name + '" was created.'
            },
            [CREATED]: true,
            [GET]: false
          }
        }
      } else {
        return {
          message: {
            type: 'error',
            title: 'Recipe Not Created',
            message: 'Unable to create recipe "' + name + '".'
          },
          [CREATED]: false,
          [GET]: false
        }
      } //last else
    }).catch(error => {
      console.log(error.response)
    });
    }, //.then

    // retrieve all recipes
  async get ({ commit }) {
    // if (this.state.accounts.token) {
      console.log("entered get action in recipes.js")
      let res = await axios
        ({
          headers: {
            Authorization: 'Bearer '+this.state.accounts.token
        },
        url: '/api/recipe',
        method: 'GET'
  }).then(function (response) {
    console.log('response is : ', JSON.stringify(response.data, null, 2));
      if (response.status === 200) {
        console.log("entered code to set recipe data in get block")
        let recipes = response.data
        console.log('inside 200 status block, response is : ', recipes)
        commit('set', recipes)
        return {
          message: {
            type: 'success',
            title: 'Recipes Retrieved',
            message: 'Recipes successfully retrieved.'
          },
          [GET]: true
        }
      } else {
        return {
          message: {
            type: 'error',
            title: 'Unable to Get Recipes',
            message: 'The recipes could not be loaded. Error: ' + res.statusCode
          },
          [GET]: false
        }
      }
    // } else {
    //   return {
    //     message: {
    //       type: 'error',
    //       title: 'Unable to Get Recipes',
    //       message: 'You must be authenticated to retrieve recipes.'
    //     },
    //     [GET]: false
    //   }
    // }
  }).catch(error => {
    console.log(error.response)
  });
  },

    // retrieve all recipes
    async getUserRecipes ({ commit }, username) {
      // if (this.state.accounts.token) {
        console.log("entered get user recipes action in recipes.js", username)
        let res = await axios
          ({
            headers: {
              Authorization: 'Bearer '+this.state.accounts.token
          },
          url: '/api/recipe/get/' +username,
          method: 'GET'
    }).then(function (response) {
      console.log('response is : ', JSON.stringify(response.data, null, 2));
        if (response.status === 200) {
          console.log("entered code to set recipe data in get block")
          let recipes = response.data
          console.log('inside 200 status block, response is : ', recipes)
          commit('set', recipes)
          return {
            message: {
              type: 'success',
              title: 'Recipes Retrieved',
              message: 'Recipes successfully retrieved.'
            },
            [GET]: true
          }
        } else {
          return {
            message: {
              type: 'error',
              title: 'Unable to Get Recipes',
              message: 'The recipes could not be loaded. Error: ' + res.statusCode
            },
            [GET]: false
          }
        }
      // } else {
      //   return {
      //     message: {
      //       type: 'error',
      //       title: 'Unable to Get Recipes',
      //       message: 'You must be authenticated to retrieve recipes.'
      //     },
      //     [GET]: false
      //   }
      // }
    }).catch(error => {
      console.log(error.response)
    });
    },

    // retrieve one recipe by id
    async getRecipe ({ commit, dispatch }, id) {
      // if (this.state.accounts.token) {
        console.log("entered get one recipe action in recipes.js")
        let res = await axios
          ({
            headers: {
              Authorization: 'Bearer '+this.state.accounts.token
          },
          url: '/api/recipe/' + id,
          method: 'GET'
    }).then(function (response) {
      console.log('response is : ', JSON.stringify(response.data, null, 2));
        if (response.status === 200) {
          console.log("entered code to set recipe data in getRecipe")
          let recipes = response.data
          console.log('inside 200 status block, response is : ', recipes)
          commit('setSingle', recipes)
          return {
            message: {
              type: 'success',
              title: 'Recipes Retrieved',
              message: 'Recipes successfully retrieved.'
            },
            [GET]: true
          }
        } else {
          return {
            message: {
              type: 'error',
              title: 'Unable to Get Recipes',
              message: 'The recipes could not be loaded. Error: ' + res.statusCode
            },
            [GET]: false
          }
        }
      // } else {
      //   return {
      //     message: {
      //       type: 'error',
      //       title: 'Unable to Get Recipes',
      //       message: 'You must be authenticated to retrieve recipes.'
      //     },
      //     [GET]: false
      //   }
      // }
    }).catch(error => {
      console.log(error.response)
    });
    },

  //update recipe
  async updateRecipe ({ commit }, {id, name, prepTime, ingridients, steps}) {
    console.log("Inside updateRecipe function, data is:", id, name, prepTime, ingridients, steps)
    let res = await axios
      ({
        headers: {
          Authorization: 'Bearer '+this.state.accounts.token
        },
        url: '/api/recipe/' + id,
        method: 'PUT',
        data: {
          name: name,
          preptime: prepTime,
          season: "winters",
          rating: 6,
          // ingridients: [
          //   {ingredient: "cheesees"}
          // ]
          ingridients: ingridients,
          steps: steps
        }
      }).then(function (response){
        console.log('response data in updateRecipe is : ' + response.data);
        console.log('response status in updateRecipe is : ' + response.status);
      // res = await axios.get(res.headers.Location)
      if (response.status === 204) {
        commit('update', {id, name, prepTime, ingridients})
        return {
          message: {
            type: 'success',
            title: 'Recipe Updated',
            message: 'The recipe "' + name + '" was updated.'
          },
          [UPDATED]: true,
          // [GET]: true
        }
      } else {
      return {
        message: {
          type: 'error',
          title: 'Recipe Not Updated',
          message: 'Unable to update recipe "' + name + '".'
        },
        [UPDATED]: false,
        // [GET]: false
      }
    } //last else
  }).catch(error => {
    console.log(error.response)
  });
  }, //.then

  //delete recipe
  async remove ({ commit, dispatch }, id) {
    console.log("Inside delete function, data is:", id)
    let res = await axios
      ({
        headers: {
          Authorization: 'Bearer '+this.state.accounts.token
        },
        url: '/api/recipe/' + id,
        method: 'DELETE'
      }).then(function (response){
        console.log('response is : ' + response.status);
      if (response.status === 200) {
        console.log('Going into 200 delete block');
        commit('delete', id)
        return {
          message: {
            type: 'success',
            title: 'Recipe Removed',
            message: 'The recipe "' + '" was deleted.'
          },
          // [DELETED]: true,
        }
      } else {
      return {
        message: {
          type: 'error',
          title: 'Recipe Not Deleted',
          message: 'Unable to delete recipe.'
        },
        // [DELETED]: false,
      }
    } //last else
  }).catch(error => {
    console.log(error.response)
  });
  }, //.then

}