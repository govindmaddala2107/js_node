const person = {
    name: 'Alice',
    age: 25
};


const proxy = new Proxy(person,{
    get(target, prop){
        return target[prop] || false;
    },
    set(target, prop, value){
        target[prop] = value;
        return true;
    }
});

console.log(proxy)