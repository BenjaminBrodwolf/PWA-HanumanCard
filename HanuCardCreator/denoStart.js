import {Application} from "https://deno.land/x/abc@v1.1.0/mod.ts";

const path = Deno.cwd()
console.log(path)

const listOfFiles = []
let posesPathTextFile = ""
for await (const dirEntry of Deno.readDir("../assets/poses")) {
    listOfFiles.push(dirEntry.name);

    posesPathTextFile += `"assets/poses/${dirEntry.name}",`
}
console.log(posesPathTextFile)
await Deno.writeTextFile("./public/poseUrl.js", `const poseUrl = [ "${listOfFiles.join('", "')}"]`)
    .then(() => console.log("PoseUrl.js File is written for WebApp"))

await Deno.writeTextFile("../posesPathForCaching.txt", posesPathTextFile)
    .then(() => console.log("posesPathForCaching Text-File is written"))

// const cards = JSON.parse( await Deno.readTextFile("./public/hanucards.js") )

const app = new Application();

app.static("/poses", "../assets/poses");
app.post("/cards", async c => {
    const body = await c.body;
    console.log(body)
    await Deno.writeTextFile("./public/hanucards.json", JSON.stringify(body))
        .then(() => console.log("Hanujson is written/updated in HanuCreator"))

    await Deno.writeTextFile("../js/hanucards.js", `const hanucardObjects =  ${JSON.stringify(body)}`)
        .then(() => console.log("Hanucard JS Object is written for WebApp"))

    return body
}).static("/", "./public")
    .start({port: 8080});

console.log(`server listening on http://localhost:8080/index.html`);
