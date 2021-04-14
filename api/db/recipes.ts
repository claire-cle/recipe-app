import  {PoolClient}  from 'pg'
import bcrypt from 'bcrypt'
import { v1 as uuid } from 'uuid'

//adding something
export default  function (conn: PoolClient) {
    return{
        async getAll ( ) {
            return conn.query({
                text: 'SELECT * FROM recipes'
            })
        },
        async getRecipe (recepeId: string ) {
            return conn.query({
                text: 'SELECT * FROM recipes WHERE id = $1',
                values: [
                    recepeId
                ]

            })
        },
        async getUserRecipes (username: string ) {
            return conn.query({
                text: 'SELECT * FROM recipes WHERE username = $1',
                values: [
                    username
                ]

            })
        },
        async addRecipe (username: string, name: string, season:string, rating:number, preptime:any, ingridients:any, steps: any) {
            return conn.query({
                text: 'INSERT INTO recipes (id, username, name, season, rating, preptime, ingridients, steps) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                values: [
                    uuid(),
                    username,
                    name,
                    season,
                    rating,
                    preptime,
                    JSON.stringify(ingridients),
                    JSON.stringify(steps)
                ]

            })
        },
        async deleteRecipe (recepeId: string) {
            return conn.query({
                text: 'DELETE FROM recipes WHERE id = $1',
                values: [
                    recepeId
                ]

            })
        },
        async updateRecipe (recepeId: string, name: string, season:string, rating:number, preptime: any, ingridients: any, steps: any) {
            return conn.query({
                text: 'UPDATE recipes  SET name = $2, season = $3, rating = $4, preptime = $5, ingridients = $6, steps = $7 where id = $1',
                values: [
                    recepeId,
                    name,
                    season,
                    rating,
                    preptime,
                    JSON.stringify(ingridients),
                    JSON.stringify(steps)
                ]

            })
        }
    }
}
