const personDetails = {
    name: "govind",
    greet: function () {
        console.log("Hello " + this.name)
    }
}


personDetails.greet(); // Hello Govind

const greetFxn = personDetails.greet;
greetFxn(); // Hello undefined
const boundFxn = greetFxn.bind(); // Hello undefined
const boundFxn1 = greetFxn.bind(personDetails); // Hello govind
boundFxn()
boundFxn1()