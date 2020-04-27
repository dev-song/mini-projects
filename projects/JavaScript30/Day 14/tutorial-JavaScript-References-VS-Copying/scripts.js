// start with strings, numbers and booleans
let age = 100;
let age2 = age;
console.log(age, age2);     // 100 100
age = 200;
console.log(age, age2);     // 200 100

let name = 'Rad';
let name2 = name;
console.log(name, name2);   // Rad Rad
name = "Rosch";
console.log(name, name2);   // Rosch Rad

// Let's say we have an array
    // and we want to make a copy of it.
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team = players;
console.log(players, team);

// however what happens when we update that array?
team[3] = "lux";
console.log(players);       // ['Wes', 'Sarah', 'Ryan', 'Lux']
    // now here is the problem! we have edited the ORIGINAL array too!
    // Why? It's because that is an array reference, not an array copy. They both point to the same array!

// So, how do we fix this? We take a copy instead!
    // one way
const team2 = players.slice();
    // or create a new array and concat the old one in
const team3 = [].concat(players);
    // or use the new ES6 Spread
const team4 = [...players];
const team5 = Array.from(players);
    // now when we update it, the original one isn't changed

// The same thing goes for objects, let's say we have a person object
    // and think we make a copy:
const person = {
    name: 'Rad Rosch',
    age: 80
};
const captain = person;
captain.number = 99;
console.log(person.number);     // 99
    // it's also an object reference!

    // how do we take a copy instead?
const captain2 = Object.assign({}, person, { age: 12, number: 99 });
console.log(person.age);        // 80
console.log(person.number);     // undefined

const captain3 = {...person};

// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.
const rad = {
    name: 'Rad',
    age: 100,
    social: {
        twitter: '@rad',
        facebook: 'rad.developer'
    }
}
const dev = Object.assign({}, rad);
dev.social.twitter = "@rosch";
console.log(rad.social.twitter);    // @rosch - affected

// ※ poor man's deepClone - simpler, but not recommended
const dev2 = JSON.parse(JSON.stringify(rad));
dev2.social.twitter = "@radrosch"
console.log(rad.social.twitter);    // @rosch - unaffected
  