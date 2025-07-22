function highlight(strings, ...values) {
    return strings.reduce((acc, str, i) => acc + str +(values[i] || ''), 'Hello, ');
}
const name = "JS"
console.log(highlight`Welcome to ${name}`)