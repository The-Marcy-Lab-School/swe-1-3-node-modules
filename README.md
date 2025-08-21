# swe-1-3-node-modules

- [Getting started](#getting-started)
  - [Submitting On Time](#submitting-on-time)
- [What's in an assignment?](#whats-in-an-assignment)
  - [From Scratch](#from-scratch)
  - [Debug](#debug)
  - [Modify](#modify)
- [Testing](#testing)
  - [playground.js](#playgroundjs)
  - [npm test](#npm-test)
- [Questions](#questions)
  - [Question 1: Create our files](#question-1-create-our-files)
  - [Question 2: Default Export `greet`](#question-2-default-export-greet)
  - [Question 3: Export a `helloWorld` function](#question-3-export-a-helloworld-function)
  - [Question 4: Import and export `multiply`](#question-4-import-and-export-multiply)
  - [Question 5: DEBUG](#question-5-debug)
  - [Question 6: MODIFY](#question-6-modify)
  - [Bonus: Review! ...and maybe nodemon](#bonus-review-and-maybe-nodemon)

Welcome to your fist *official* JS assignment! It may not seem exciting to you, but we sure are pumped about it. We're going to start off simple, but you'll be amazed how quickly you'll be able to carry out complex tasks in the coming weeks.

To start off, let's explain how these assignments work.

## Getting started

For guidance on setting up and submitting this assignment, refer to the Marcy lab School Docs How-To guide for [Working with Short Response and Coding Assignments](https://marcylabschool.gitbook.io/marcy-lab-school-docs/fullstack-curriculum/how-tos/working-with-assignments#how-to-work-on-assignments).

### Submitting On Time
You have to understand that "grades" don't exist at Marcy. We only need performance data in order to know how you're doing, and make sure the people who need help get it as quickly as they can. It's ok if you didn't finish by the deadline! Just show us what you have. We'll have office hours and reviews, and we want to know what you are all struggling with so we can use those meetings effectively. **This is not about grades, its about seeing what you know, and where we can help!**

## What's in an assignment?
Some of homework will be a special case, but in general there will be 3 sections.

### From Scratch
This is the bulk of the assignment. It's testing your ability to look at a blank page and create something. Usually, there will be a "from-scratch.js" file, but not always! Like in this assignment, you'll need to create your own files!

### Debug
We'll be real with you: most of this job is fixing something broken. So in this part you'll be asked to try and get something working by *mostly* relying on reading tests.

### Modify
Given some existing code, can you enhance/change it? It's similar to debug in that there's existing code, but nothing is broken.

So those are the sections. They may not be all in the assignment, but always check the `README.md` and run your tests to make sure you've done everything.

## Testing 

The most straightforward way to test your code is to test your code by hand as you work. Invoke your functions and use `console.log()` to print out the results. Then, `cd` into the `src/` directory and use the `node <file_name>` command to run your JavaScript files. 

### playground.js

You can also create what's called a "playground" (or "sandbox") file where you import any code you need, and then mess around with that file. We've included one in the `src` directory so you can see it. Run that program using `node playground.js`.

### npm test

Before submitting your code, make sure you got things right by running the provided automated tests.

You can do this using the commands:

```sh
npm test # run the automated tests
npm run test:w # run the automated tests and rerun them each time you save a change
```

You will know that you have "completed" an assignment once you have passed 75% or more of the automated tests!

## Questions

Alright! Let's get started with the actual assignment!

### Question 1: Create our files
First up, you may have noticed our `from-scratch.spec.js` test is expecting some files to exist, so let's make them! _**In the `src` folder**_ please create the following files:
  - `index.js`
  - `multiply.js`
  - `greet.js`

NOTE: This is a pretty important step! If it takes more than 20 minutes to pass the tests that check if these files exist, reach out to your teacher for help.

### Question 2: Default Export `greet`
In `greet.js`, write a function called `greet()` that takes in a `name` argument and returns a string like:

```js
greet('Jo')

Hello Jo, how are you?
```

Now, use a **default export** and export the function.

<details><summary>Hint</summary>
  
A default export is just what we call it when we export one value from a file. In Node, we do this by assigning a value directly to `module.exports`
  
  ```js
  module.exports = value;
  ```
</details>

### Question 3: Export a `helloWorld` function
Inside `index.js` write a function called `helloWorld` that **RETURNS** the string:
```bash
Hello world!
```
Now, use a _**named export**_, to export the `helloWorld` function inside of an Object for our tests to read.

<details><summary>Hint</summary>
  
A named export is just what we call it when we export one or more values inside of an Object. In Node, we do this by assigning an Object to `module.exports`
  
  ```js
  module.exports = {
    valueA,
    valueB,
    valueC
  }
  ```

It's okay to only export one thing here. We're going to add more in the next step.
</details>

### Question 4: Import and export `multiply`
Inside `multiply.js` write a function called `multiply()` that takes 2 `numbers` and **RETURNS** their product. Here's the tricky part:

- Default export the `multiply` function from `multiply.js`
- Then `require` the `multiply` function into your `index.js`
- Finally, add the `multiply` function to the named exports of `index.js`

We exported a function out of its base file, imported it into an `index` file, and then re-exported it. Why? This pattern is called a `Barrel File`. Since `index.js` is a "magic" file in node, it can help to clean up our exports by exporting everything from `index.js`.

See, if you just require a *folder* instead of a file, node will *automatically* check if theres an `index.js` file in the root of that folder, and then import from `index.js`. Look how much this feature helps us:

```js
// Doing this in a bunch of files:
const thing1 = require('./things/thing1');
const thing2 = require('./things/thing2');
const thing3 = require('./things/thing3');
const thing4 = require('./things/thing4');

// Is a lot more annoying than this
const { thing1, thing2, thing3, thing4 } = require('./things');
// Those are all exported from /things/index.js
```

This way, we get to write small, focused, well named files, and we only have to write all those `require`s once in an index. Barrel files aren't great for most simple things like these assignments, but they're a good trick to know for more complex projects.

### Question 5: DEBUG
In `debug.js` We have a function called `mirror()` that's supposed to log and return whatever we pass into it. But the test is failing. What's wrong our code? Check out the tests in `debug.spec.js` and see if you can figure out what we're missing in `debug.js`.

### Question 6: MODIFY
So we wrote a default export (not even using a named function) in `modify.js`. We did this because we *thought* it would only export one function. But now we've added `anotherFunction()`. So we have two things to do:

- rename the anonymous default export function as `liarFunction()`
- Export both `anotherFunction()` and `liarFunction()` as named exports.
-------------------------------------------------

### Bonus: Review! ...and maybe nodemon
It's day 1, so use this time to get ahead! This week we're going to review variables, data types, functions, string manipulation, and flow control. You learned all about these in the pre work, so go over your notes. Also you can take this time to experiment with Jest's watchAll mode with the npm `test:w` script.

If you *really* want something to do other than review JS, you can check out this [article on nodemon](https://www.geeksforgeeks.org/node-js-nodemon-module/). Nodemon (sounds like pokemon) automatically reruns files when they get saved. It's super handy. Also, tests will form the backbone of our assignments, so watch this video about [getting started with Jest tests](https://www.youtube.com/watch?v=FgnxcUQ5vho). Note, that is all about _writing_ tests, but all you'll need to do is _read_ tests, so just focus on understanding the ideas, more than the exact syntax. 
