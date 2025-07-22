let promise = new Promise((resolve, reject)=>{
    setTimeout(() => {
        resolve("Govind")
    }, 3000);
});

function getname(){
    promise.then(data=> console.log(data));
    //..........then makes is asynchronous...............//
    console.log("After")
}


async function getname1() {
    let pr = await promise;
    console.log(pr)
    //.........Pauses until execution and then prints.............//
    console.log("After promise")
}
// getname()
// getname1()


