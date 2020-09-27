const wrapper = document.getElementById("wrapper")

const poseCard = (poseImage, {deutsch, sanskrit}) => `
    <div class="card" id="${poseImage}">
        <h5>${poseImage}</h5>
        <img src="poses/${poseImage}" alt="${poseImage}">

        <label for="nameDeutsch">Pose Name:</label>
        <input name="nameDeutsch" value="${deutsch}">
        <br>
        <label for="nameSanskrit">Pose in Sanskrit:</label>
        <input name="nameSanskrit" value="${sanskrit}">
    </div>`


const start = async () => {
    const json = await getHanucard()
    const hanucards = json.hanucards
    console.log(hanucards)

    let result = ""
    await poseUrl.forEach(poseImage => {
        const poseInfos = (hanucards.filter(f => f.image === poseImage))[0]
        if (poseInfos) {
            result += poseCard(poseImage, poseInfos)
        } else {
            result += poseCard(poseImage, {deutsch: "", sanskrit: ""})
        }
    })
    wrapper.innerHTML = result
}

const saveAll = async () => {
    const allNodeCards = document.querySelectorAll(".card")

    let cards = {
        hanucards: []
    }

    allNodeCards.forEach(node => {
        cards.hanucards.push({
            "image": node.children[0].innerText,
            "deutsch": node.children[3].value,
            "sanskrit": node.children[6].value
        })
    })

    console.log(cards)

    const rawResponse = await fetch('/cards', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cards)
    });
    const content = await rawResponse.json();

    console.log(content);
}

const getHanucard = async () =>
    await (await fetch("./hanucards.json")).json()


start()