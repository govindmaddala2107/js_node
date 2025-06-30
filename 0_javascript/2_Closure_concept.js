const normalCall = ()=>{
    const outerFxn = () => {
        let counter = 0;
        const innerFxn = () => {
            counter++;
            console.log(counter)
        }
        innerFxn();
    }
    outerFxn();
    outerFxn();
    outerFxn();
}

const closureCall = ()=>{
    const outerFxn = () => {
        let counter = 0;
        return () => {
            counter++;
            console.log(counter)
        }
    }
    const fn = outerFxn();
    fn();
    fn();
    fn();    
}
const closureCallAsNormal = ()=>{
    const outerFxn = () => {
        let counter = 0;
        return () => {
            counter++;
            console.log(counter)
        }
    }
    outerFxn()();  
    outerFxn()();  
}
console.log("**--------[Normal Call]--------**")
normalCall()
console.log("**------- [Closure Call]-------**")
closureCall()
console.log("**------- [Closure Call As Normal]-------**")
closureCallAsNormal()
console.log("**--------[END]--------**")