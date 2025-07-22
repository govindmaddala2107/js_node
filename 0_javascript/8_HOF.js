const doubleNum = (num) => {
    return num * 2;
}

const hoc = (num, op) => {
    return op(num)
}

const halfNum = (num) => {
    return Math.floor(num / 2);
}

const numberDoubled = hoc(5, doubleNum)
console.log(numberDoubled)
console.log(hoc(numberDoubled, halfNum))