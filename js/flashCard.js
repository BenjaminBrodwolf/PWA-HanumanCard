const fcAmountDOM = document.getElementById("fcStat")
const correctAmountDOM = document.getElementById("correctStat")
const wrongAmountDOM = document.getElementById("wrongStat")
const flashCardDOM = document.getElementById("flashCard")

let correctCount;
let wrongList = []


const poses = [
    "Balancierender_Krieger_I",
    "Chaturanga_Tiefes_Brett",
    "Knielend",
    "Umkehrter_Krieger",
    "Virabadhrasana_II_Krieger_II"
]


let randomPoses;
let posesIndex;

const flashCard = pose => {
    console.log(pose)
    flashCardDOM.innerHTML = `
            <h5>Welche Pose ist das?</h5>
            <div class="fc" id="${pose}">
                <img src="assets/img/${pose}.png" alt="${pose}">
            </div>

            <div id="showAnswer" onclick="showAnswer()">
                <p>Klicke hier für die Kontroller</p>
            </div>

            <div id="hiddenAnswer" style="visibility: hidden">
                <div class="answer">
                    <p>${pose.replace(/_/g, " ")}</p>
                </div>
                <h6>Hast du es gewusst?</h6>
                <div class="controls">

                    <div class="correct" onclick="correctAnswer('${pose}')">
                        <p> &#x2714;
                        </p>
                    </div>
                    <div class="wrong" onclick="wrongAnswer('${pose}')">
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

const correctAnswer = pose => {
    correctAmountDOM.innerText = ++correctCount;
    nextCard();
}

const wrongAnswer = pose => {
    console.log(pose)
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

const repeatLearning = () =>{
    let result = `
        <div class="result"> 
            <h5>Resultat</h5>
            <p>
                Du hast von insgesamt ${randomPoses.length} Fragen <br> 
                <span style="color: #7dce90">&#x2714; ${correctCount} </span> richtig und 
                 <span style="color: #dc7a6b">&#10006; ${wrongList.length} </span> falsch.
             </p>

            <div onclick="newStart()"> 
                <h4>Alle nochmal wiederholen </h4>
            </div>
        `

    if(wrongList.length > 0){
        result += `
            <p>oder</p>
           <div onclick="newStart(wrongList)"> 
                 <h4>Nur die nicht gewusste wiederholen (Anzhl. ${wrongList.length})</h4>
           </div>
        `
    }
    result += `</div>`

    flashCardDOM.innerHTML = result
}

const newStart = (flashCards = poses) => {
    randomPoses = shuffleArray(flashCards);
    wrongList = []
    console.log(randomPoses)
    correctCount = 0;
    posesIndex = 0;
    correctAmountDOM.innerText = 0;
    wrongAmountDOM.innerText = 0;
    fcAmountDOM.innerText = randomPoses.length;

    flashCard(randomPoses[0])
}

