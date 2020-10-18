const fcAmountDOM = document.getElementById("fcStat")
const correctAmountDOM = document.getElementById("correctStat")
const wrongAmountDOM = document.getElementById("wrongStat")
const flashCardDOM = document.getElementById("flashCard")

const imgFolder = "./assets/poses/"

let correctCount;
let wrongList = []

let poses = []


let randomPoses;
let posesIndex;

const flashCard = ({image, deutsch, sanskrit}) => {
    flashCardDOM.innerHTML = `
            <h5>Welche Pose ist das?</h5>
            <div class="fc" id="${image}">
                <img src="${imgFolder}${image}" alt="${deutsch || sanskrit}">
            </div>

            <div id="showAnswer" onclick="showAnswer()">
                <p>Lösung anzeigen</p>
            </div>

            <div id="hiddenAnswer" style="visibility: hidden">
                <div class="answer">
                    <p>${deutsch} ${deutsch && sanskrit ? "|" : ""} ${sanskrit}</p>
                </div>
                <h6>Hast du es gewusst?</h6>
                <div class="controls">

                    <div class="correct" onclick="correctAnswer()">
                        <p> &#x2714;
                        </p>
                    </div>
                    <div class="wrong" onclick="wrongAnswer('${image}')">
                        <p>&#10006;</p>
                    </div>
                </div>
            </div>
        `
}

const showAnswer = () => {
    const x = document.getElementById("showAnswer")
    const answer = document.getElementById("hiddenAnswer")

    x.style.display = "none"
    answer.style.visibility = "visible"
}

const correctAnswer = () => {
    correctAmountDOM.innerText = ++correctCount;
    nextCard();
}

let test = {}
const wrongAnswer = pose => {
    test = pose
    wrongList.push(pose)
    wrongAmountDOM.innerText = wrongList.length;
    nextCard();
}

const nextCard = () => {
    posesIndex++
    if (posesIndex < randomPoses.length) {
        flashCard(randomPoses[posesIndex])
    } else {
        repeatLearning()
    }
}

const repeatLearning = () => {
    let result = `
        <div class="result"> 
            <h4>Dein Resultat</h4>
            <p>
                Du hast von insgesamt ${randomPoses.length} Fragen <br> 
                <span style="color: #7dce90">&#x2714; ${correctCount} </span> richtig und 
                 <span style="color: #dc7a6b">&#10006; ${wrongList.length} </span> falsch.
             </p>

            <div onclick="newStart()"> 
                <h5 class="button">Alle nochmal wiederholen </h5>
            </div>
        `

    if (wrongList.length > 0) {
        result += `
            <p>oder</p>
           <div onclick="newStart(poses.filter(p => wrongList.includes(p.image)))"> 
                 <h5 class="button">Nur die falschen wiederholen (${wrongList.length})</h5>
           </div>
        `
    }
    result += `</div>`

    flashCardDOM.innerHTML = result
}


const newStart = (flashCards = poses) => {
    randomPoses = shuffleArray(flashCards);
    wrongList = []
    correctCount = 0;
    posesIndex = 0;
    correctAmountDOM.innerText = 0;
    wrongAmountDOM.innerText = 0;
    fcAmountDOM.innerText = randomPoses.length;
    flashCard(randomPoses[0])
}


const startApp = async () => {
    // const json = await (await fetch("./assets/hanucards.json")).json()

    poses = hanucardObjects.hanucards.filter(p => p.deutsch.length > 0 || p.sanskrit.length > 0)
    newStart(poses)
}
