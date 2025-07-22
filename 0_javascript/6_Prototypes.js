function Details(name){
    this.name = name;
}

Details.prototype.greet = function(){
    console.log("Hello " + this.name)
}

Details.prototype.age = 10;

const details = new Details("govind");
details.greet()
console.log(details.age)
