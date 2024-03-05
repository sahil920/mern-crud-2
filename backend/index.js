const express = require("express")
const clientRoute = require("./route/clientRoute")
const client = require("./controller/client")
const mongoose = require("mongoose")
const app = express()
const PORT= 5004
const cors = require("cors")

const url = `mongodb+srv://nazim:nazim1908@nazim-crud.jvsy7bg.mongodb.net/MyPortfolio?retryWrites=true&w=majority`

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database==============')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
app.use(cors({
    origin:"*",

}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/client", clientRoute)


app.get("/", (req, res)=>{
    res.send(`<h1>Server is up</h1>`)
})

app.listen(PORT, ()=>{
    console.log(`app is listening on the port of ${PORT}`)
})