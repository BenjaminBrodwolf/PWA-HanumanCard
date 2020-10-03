if("serviceWorker" in navigator){
    navigator.serviceWorker.register("serviceWorker.js", {scope: "./"}).then(result => {
        console.log("Service Worker Registered")
        console.log("Scope: " + result.scope)
    }).catch( error => {
        console.error("Service Worker Registration Failed")
        console.error(error)
    })
} else {
    console.log("Service Worker Not Supported")
}