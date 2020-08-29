const imgFolder = 'chacheGenerate/public/img';
const fs = require('fs');

const listOfFiles = []
fs.readdirSync(imgFolder).forEach(file => {
    console.log(file);
    listOfFiles.push(file)

});



const express = require("express");
const app = express();
app.use(express.static('public'));



app.get("/", ((req, res) => {
    // res.write("Helloaowdoadlawdoa")
    res.send(getHTML())
    // listOfFiles.forEach(pose => res.send(poseCard(pose)))
}))

app.listen(8000, () =>{
    console.log("Starte on port 8000")
})

const getHTML = () =>{
    const allCards = listOfFiles.map(pose => poseCard(pose)).join(" ")
    // console.log(allCards)
    return allCards
}

const poseCard = poseID => `
    <div class="card"> 
        <h4>ID: ${poseID}</h4>
        <img src="img/${poseID}" alt="${poseID}">
        <input>
    </div>
`

getHTML()