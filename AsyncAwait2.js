let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise 1")
    }, 10000);
});

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise 2")
    }, 5000);
});


async function handlePromise(){
    console.log("Before awaiting P1");
    const promise1 = await p1;
    console.log(promise1)

    console.log("Before awaiting P2");
    const promise2 = await p2;
    console.log(promise2)
}

handlePromise();
console.log("After all promises")