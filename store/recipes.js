import axios from 'axios'
// import ingridients from '~/api/db/ingridients'

export const CREATED = 'recipe.created'
export const GET = 'recipe.get'
export const DELETED = 'recipe.delete'

export const state = function () {
    return {
      recipes: []
      /*recipes: [{
        recipe: {
          id: 2,
          name: null,
          season: null,
          preptime: null,
          rating: null,
          ingredients: [
            {ingredient: null}
          ]
        }
      }]*/
    }
  }

export const getters = {
    // ...
    // recipeById (state, id) {
    //   return state.recipes.recipes.filter(id = id)
    // }
}

export const mutations = {
  add (state, { id, name, preptime, rating, ingredients }) {
    state.recipes.push({ id, name, preptime, rating, ingredients })
  },
//   remove (state, id) {
//     const index = state.lists.findIndex(list => list.id === id)
//     if (index !== -1) state.lists.splice(index, 1)
//   },
  set (state, recipes) {
    state.recipes = [...recipes]
  },
  update (state, id, name, preptime, ingredients) {
    const index = state.recipes.recipes.findIndex(recipe => recipe.id === id)
    if (index !== -1){
      state.recipes[index].name = name
      state.recipes[index].preptime = preptime
      state.recipes[index].ingredients = ingredients
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
    async add ({ commit, dispatch }, {name, prepTime, ingridients}) {
      console.log("Inside add function, data is:", name, prepTime, ingridients)
      let res = await axios
        ({
          headers: {
            Authorization: 'Bearer '+this.state.accounts.token
          },
          url: '/api/recipe',
          method: 'POST',
          data: {
            name: name,
            preptime: prepTime,
            season: "winter",
            rating: 5,
            // ingridients: [
            //   {ingredient: "cheese"}
            // ]
            ingridients
          }
        }).then(function (response){
          console.log('response is : ' + response.data);
        if (respose.status === 201) {
        // res = await axios.get(res.headers.Location)
        if (respose.status === 200) {
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
        console.log("entered code to set recipe data")
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

  //update recipe
  async update ({ commit, dispatch }, {id, name, preptime, ingridients}) {
    console.log("Inside add function, data is:", id, name, preptime, ingridients)
    let res = await axios
      ({
        headers: {
          Authorization: 'Bearer '+this.state.accounts.token
        },
        url: '/api/recipe/' + id,
        method: 'PUT',
        data: {
          name: name,
          preptime: preptime,
          season: "winter",
          rating: 5,
          // ingridients: [
          //   {ingredient: "cheese"}
          // ]
          ingridients: ingridients
        }
      }).then(function (response){
        console.log('response is : ' + response.data);
      if (respose.status === 201) {
      // res = await axios.get(res.headers.Location)
      if (respose.status === 200) {
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