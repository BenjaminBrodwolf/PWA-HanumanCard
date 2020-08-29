const http = require('http');
const host = 'localhost';
const port = 8000;

const imgFolder = '../assets/img/';
const fs = require('fs');

const listOfFiles = []
fs.readdirSync(imgFolder).forEach(file => {
    console.log(file);
    listOfFiles.push(file)

});

const onRequest = (req, res) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write('<p>Here is a paragraph of <strong>HTML</strong>!</p>');
    listOfFiles.forEach(pose => res.write(poseCard(pose)))
    res.end();
}

const poseCard = poseID => `
    <div class="card"> 
        <h4>ID: ${poseID}</h4>
        <img src="./img/${poseID}" alt="${poseID}">
    </div>
`


const server = http.createServer(onRequest).listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

