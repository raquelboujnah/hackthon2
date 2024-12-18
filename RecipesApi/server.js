const express = require ('express')
const cors = require('cors')
const {recipeRouter} = require ('./routes/recipeRoute.js')

const app = express()

const PORT = 3000

app.listen(PORT, ()=> {
    console.log(`Listenning on port ${PORT}`)
})

app.use(express.json())

app.use (cors())

app.use('/recipes', recipeRouter)