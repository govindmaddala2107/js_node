function* gen() {
    yield 1;
    yield 2;
    yield 3;
}

const g = gen();
let x = 1;
while (true) {
    console.log(x++)
    if (!g.next().value) break;
}