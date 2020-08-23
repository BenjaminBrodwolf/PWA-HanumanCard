const fcAmount = document.getElementById("fcStat")
const correctAmount = document.getElementById("correctStat")
const wrongAmount = document.getElementById("wrongStat")
const view = document.getElementById("flashCard")

let correctCount = 0;
let wrongList = []


const poses = [
    "Balancierender_Krieger_I",
    "Chaturanga_Tiefes_Brett",
    "Knielend",
    "Umkehrter_Krieger",
    "Virabadhrasana_II_Krieger_II"
]


let randomPoses = shuffleArray(poses);
let posesIndex = 0;

const flashCard = pose => {
    view.innerHTML = `
            <h5>Welche Pose ist das?</h5>
            <div class="fc" id="${pose}">
                <img src="assets/img/${pose}.png">
            </div>

            <div id="showAnswer" onclick="showAnswer()" style="display: block">
                <p>Klicke hier für die Kontroller</p>
            </div>

            <div id="hiddenAnswer" style="display: none">
                <div class="answer">
                    <p>${pose.replace(/_/g, " ")}</p>
                </div>
                <h4>Hast du es gewusst?</h4>
                <div class="controls">

                    <div class="correct" onclick="correctAnswer(${pose})">
                        <p> &#x2714;
                        </p>
                    </div>
                    <div class="wrong" onclick="wrongAnswer(${pose})">
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
    answer.style.display = "block"
}

const correctAnswer = pose => {
    correctAmount.innerText = ++correctCount;
    nextCard();
}

const wrongAnswer = pose => {
    wrongList.push(pose)
    wrongAmount.innerText = wrongList.length;
    nextCard();
}

const nextCard = () => {
    posesIndex++
    if (posesIndex < randomPoses.length) {
        flashCard(randomPoses[posesIndex])
    } else {
        // ist jetzt alle einmal Durch
        randomPoses = shuffleArray(wrongList)
        wrongList = []
    }
}

const repeatLearning = () =>{

}

const start = () => {
    flashCard(randomPoses[0])
    fcAmount.innerText = randomPoses.length;
}

