// //OBJECT DESTRUCTURING 1
// console.log(numPlanets); // 8
// console.log(yearNeptuneDiscovered); // 1846

// //OBJECT DESTRUCTURING 2
// console.log(discoveryYears); // {yearNeptuneDiscovered: 1846, yearMarsDiscovered: 1659}

// //OBJECT DESTRUCTURING 3
// getUserData({ firstName: "Alejandro", favoriteColor: "purple" }); // "Your name is Alejandro and you like purple"
// getUserData({ firstName: "Melissa" }); // "Your name is Melissa and you like green"
// getUserData({}); // "Your name is undefined and you like green"

// //ARRAY DESTRUCTURING 1
// console.log(first); // Maya
// console.log(second); // Marisa
// console.log(third); // Chi

// //ARRAY DESTRUCTURING 2
// console.log(raindrops); // "Raindrops on roses"
// console.log(whiskers); // "whiskers on kittens"
// console.log(aFewOfMyFavoriteThings); // ['Bright copper kettles', 'warm woolen mittens', 'Brown paper packages tied up with strings']

// //ARRAY DESTRUCTURING 3
// console.log(numbers); // [10, 30, 20]

// ES2015 REFACTORING
//ES5 Assigning Variables to Object Properties
var obj = {
  numbers: {
    a: 1,
    b: 2,
  },
};

// var a = obj.numbers.a;
// var b = obj.numbers.b;
const {
  numbers: { a, b },
} = obj;

//ES5 Array Swap
var arr = [1, 2];
var temp = arr[0];
// arr[0] = arr[1];
// arr[1] = temp;

[arr[0], arr[1]] = [arr[1], arr[0]];

//Write a function called raceResults which accepts a single array argument. It should return an object with the keys first, second, third, and rest.

const raceResults = ([first, second, third, ...rest]) => ({
  first,
  second,
  third,
  rest,
});
