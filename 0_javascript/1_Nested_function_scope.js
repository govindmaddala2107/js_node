const a = 10;
const outerFxn = () => {
    const b = 20;
    const innerFxn = () => {
        const c = 30;
        console.log(a, b, c)
    }
    innerFxn();
}
outerFxn();