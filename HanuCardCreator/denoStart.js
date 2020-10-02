import {Application} from "https://deno.land/x/abc@v1.1.0/mod.ts";



const listOfFiles = []
let posesPathTextFile = ""
for await (const dirEntry of Deno.readDir("../assets/poses")) {
    listOfFiles.push(dirEntry.name);

    posesPathTextFile += `./assets/poses/${dirEntry.name},`
}
console.log(posesPathTextFile)
await Deno.writeTextFile("./public/poseUrl.js", `const poseUrl = [ "${listOfFiles.join('", "')}"]`).then(() => console.log("PoseUrl File is written"))
await Deno.writeTextFile("../posesPath.txt", posesPathTextFile).then(() => console.log("PosesPathTextFile is written"))

// const cards = JSON.parse( await Deno.readTextFile("./public/hanucards.json") )

const app = new Application();

app.static("/poses", "../assets/poses");
app.post("/cards", async c => {
    const body = await c.body;
    console.log(body)
    await Deno.writeTextFile("./public/hanucards.json", JSON.stringify(body)).then(() => console.log("Hanujson is written"))
    await Deno.writeTextFile("../assets/hanucards.json", JSON.stringify(body)).then(() => console.log("Hanujson is written in assets Folder"))
    return body
}).static("/", "./public")
    .start({port: 8080});

console.log(`server listening on http://localhost:8080/`);
