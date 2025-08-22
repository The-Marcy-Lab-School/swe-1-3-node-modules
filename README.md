# swe-1-3-node-modules

- [Reminders](#reminders)
  - [Asking ChatGPT for Help](#asking-chatgpt-for-help)
  - [Be Okay With Being "Provisionally Complete"](#be-okay-with-being-provisionally-complete)
- [Setup](#setup)
- [From Scratch Questions](#from-scratch-questions)
  - [Question 1: Create our files](#question-1-create-our-files)
  - [Question 2: Default Export `greet`](#question-2-default-export-greet)
  - [Question 3: Export a `helloWorld` function](#question-3-export-a-helloworld-function)
  - [Question 4: Import and export `multiply`](#question-4-import-and-export-multiply)
- [Debug Questions](#debug-questions)
  - [Question 5: mirror](#question-5-mirror)
- [Modify Questions](#modify-questions)
  - [Question 6: Default to Named Exports](#question-6-default-to-named-exports)
  - [Bonus: Review! ...and maybe nodemon](#bonus-review-and-maybe-nodemon)

## Reminders

### Asking ChatGPT for Help

If you’re stuck, you may use ChatGPT to clarify the assignment — but not to solve it for you. To do this, copy the meta-prompt below into ChatGPT along with the assignment question.

> You are acting as a tutor. Your job is to explain what this coding question is asking, clarify confusing wording, and highlight the relevant concepts students need to know — but do not provide the full solution or code that directly answers the question. Instead, focus on rephrasing the problem in simpler terms, identifying what’s being tested, and suggesting what steps or thought processes might help. Ask guiding questions to ensure the student is thinking critically. Do not write the final function, algorithm, or code implementation.

Be mindful of your AI usage on assignments. AI can be a great tool to help your learning but it can also be detrimental if you let it do too much of the thinking for you.

### Be Okay With Being "Provisionally Complete"

At Marcy, we will deem an assignment as "complete" if the solution passes at least **75%** of the automated tests. 

However, we know many of you will feel the urge to hold off on submitting until your assignment feels 100% perfect. That drive for excellence is an asset!

But perfectionism can also get in the way of learning — especially when we need to cover a lot in a short amount of time.

That’s why we encourage you to be comfortable with being **“provisionally complete.”** This means:

- Submitting your work even if it isn’t perfect yet
- Treating submission as a checkpoint, not a finish line
- Committing to return, revise, and improve later

Learning to move forward with provisional completeness will help you make steady progress while still building the habit of continuous improvement.

## Setup

For guidance on setting up and submitting this assignment, refer to the Marcy lab School Docs How-To guide for [Working with Short Response and Coding Assignments](https://marcylabschool.gitbook.io/marcy-lab-school-docs/fullstack-curriculum/how-tos/working-with-assignments#how-to-work-on-assignments).

Here are some useful commands to remember.

```sh
npm i                   # install dependencies
git checkout -b draft   # switch to the draft branch before starting

npm test # run the automated tests
npm run test:w # run the automated tests and rerun them each time you save a change

git add -A              # add a changed file to the staging area
git commit -m 'message' # create a commit with the changes
git push                # push the new commit to the remote repo
```

## From Scratch Questions

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

## Debug Questions

### Question 5: mirror
In `debug.js` We have a function called `mirror()` that's supposed to log and return whatever we pass into it. But the test is failing. What's wrong our code? Check out the tests in `debug.spec.js` and see if you can figure out what we're missing in `debug.js`.

## Modify Questions

### Question 6: Default to Named Exports
So we wrote a default export in `modify.js`. We did this because we *thought* it would only export the `onlyOne` function. But now we want to add another function to also export! So we have two things to do:

1. First, copy this function into the `modify.js` file

```js
const anotherFunction = () => {
  return "No, you don't.";
};
```

2. Export both `anotherFunction()` and `onlyOne()` as named exports.
-------------------------------------------------

### Bonus: Review! ...and maybe nodemon
It's day 1, so use this time to get ahead! This week we're going to review variables, data types, functions, string manipulation, and flow control. You learned all about these in the pre work, so go over your notes. Also you can take this time to experiment with Jest's watchAll mode with the npm `test:w` script.

If you *really* want something to do other than review JS, you can check out this [article on nodemon](https://www.geeksforgeeks.org/node-js-nodemon-module/). Nodemon (sounds like pokemon) automatically reruns files when they get saved. It's super handy. Also, tests will form the backbone of our assignments, so watch this video about [getting started with Jest tests](https://www.youtube.com/watch?v=FgnxcUQ5vho). Note, that is all about _writing_ tests, but all you'll need to do is _read_ tests, so just focus on understanding the ideas, more than the exact syntax. 
