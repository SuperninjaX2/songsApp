const express = require("express");
const path = require("path")


const app = express();
const PORT = 3000
app.use(express.static(path.join(__dirname, "frontend")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.get('/',(req,res)=>{
    res.render('index',{yes:"yes"})
})
app.get('/songs',(req,res)=>{
    res.render("hymns")
})
app.get("/songs/:id",(req,res)=>{
    const { id } = req.params;
    const filePath = path.join(__dirname,'songs',`${id}.json`);

    try {
        const songData = require(filePath);
        res.render('song',{"song":songData})
    } catch (error) {
        if (error.code === 'MODULE  NOT FOUND') {
            res.status(404).send('song not found')
        } else{
            console.log(error)
            res.status(500).send("error")
        }
    }
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
 })

 module.exports = app;