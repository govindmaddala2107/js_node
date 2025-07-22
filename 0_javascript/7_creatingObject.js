const obj = {
    name: "govind",
    age: 29,
    hobbies: []
}

const d2 = Object.assign({}, obj)
const d3 = obj; //only for this only values are changed
const d4 = { ...obj }
const d5 = structuredClone(obj) //deep copy, so even after pushing into array, that value is not shown
obj.age = 30;
obj.hobbies.push("1")

console.log(d2)
console.log(d3)
console.log(d4)
console.log(d5)
console.log(obj)