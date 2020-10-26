import {Application} from "https://deno.land/x/abc@v1.1.0/mod.ts";

const path = Deno.cwd()
console.log(path)

const listOfFiles = []
for await (const dirEntry of Deno.readDir("../assets/poses")) {
    listOfFiles.push(dirEntry.name);
}

await Deno.writeTextFile("./public/poseUrl.js", `const poseUrl = [ "${listOfFiles.join('", "')}"]`)
    .then(() => console.log("PoseUrl.js File is written for WebApp"))

const app = new Application();

app.static("/poses", "../assets/poses");
app.post("/cards", async c => {
    const body = await c.body;
    console.log(body)
    await Deno.writeTextFile("./public/hanucards.json", JSON.stringify(body))
        .then(() => console.log("Hanujson is written/updated in HanuCreator"))

    await Deno.writeTextFile("../js/hanucards.js", `const hanucardObjects =  ${JSON.stringify(body)}`)
        .then(() => console.log("Hanucard JS Object is written for WebApp"))


    const posesPathTextedFiles = body["hanucards"].filter(e => e.deutsch && e.sanskrit).map(e => `"assets/poses/${e.image}"`).join(", ")
    await Deno.writeTextFile("../posesPathForCaching.txt", posesPathTextedFiles)
        .then(() => console.log("posesPathForCaching Text-File is written"))

    return body
}).static("/", "./public")
    .start({port: 8080});

console.log(`server listening on http://localhost:8080/index.html`);
