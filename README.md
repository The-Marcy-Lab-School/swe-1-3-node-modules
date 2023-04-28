# Assignment 1.0.0 - Intro To Node!
- [Assignment 1.0.0 - Intro To Node!](#assignment-100---intro-to-node)
- [Getting started](#getting-started)
- [Finishing](#finishing)
- [Submitting On Time](#submitting-on-time)
- [What's in an assignment?](#whats-in-an-assignment)
  - [From Scratch](#from-scratch)
  - [Debug](#debug)
  - [Modify](#modify)
  - [Short Answers](#short-answers)
- [npm start vs npm test](#npm-start-vs-npm-test)
  - [playground.js](#playgroundjs)
- [Question 1: Create our files](#question-1-create-our-files)
- [Question 2: Export a `helloWorld` function](#question-2-export-a-helloworld-function)
- [Question 3: Default Export `greet`](#question-3-default-export-greet)
- [Question 4: Import and export `multiply`](#question-4-import-and-export-multiply)
- [Question 5: DEBUG](#question-5-debug)
- [Question 6: MODIFY](#question-6-modify)
- [Short answers](#short-answers-1)
- [Bonus: Review! ...and maybe nodemon](#bonus-review-and-maybe-nodemon)


Welcome to your fist *official* JS assignment! It may not seem exciting to you, but we sure are pumped about it. We're going to start off simple, but you'll be amazed how quickly you'll be able to carry out complex tasks in the coming weeks.

To start off, let's explain how these assignments work.

# Getting started
Whenever you get an assignment the first thing you should do is run

```bash
npm i
npm test
```

This will install any necessary dependencies and then show you all the tests you need to work on. We may explain each function in the `README.md`, but always run the tests because they are crucial to explaining what the code literally must do.

# Finishing
In order to submit an assignment, you need to run your tests, commit your code, and then push it up to GitHub. So something like:

```bash
npm test
git add .
git commit -m "Finished!"
git push
```

# Submitting On Time
You have to understand that "grades" don't exist at Marcy. We only need performance data in order to know how you're doing, and make sure the people who need help get it as quickly as they can.

> To that end, always submit these standard homework assignments by midnight on the day they were assigned.

It's ok if you didn't finish! Just show us what you have. There will be time later in the week to go back and finish anything you have left over. We have reviews every Thursday, and want to make sure we know what to go over.

# What's in an assignment?
Some of homework will be a special case, but in general there will be 4 sections.

## From Scratch
This is the bulk of the assignment. It's testing your ability to look at a blank page and create something.

## Debug
We'll be real with you: most of this job is fixing something broken. So in this part you'll be asked to try and get something working by *mostly* relying on reading tests.

> This was 75% of my job, I cannot stress how important it is to get good at this.
>
> -- Mike

## Modify
Given some existing code, can you enhance/change it? It's similar to debug in that there's existing code, but nothing is broken.

## Short Answers
Your ability to communicate is just as important as your code. So we'll ask you to write a few sentences (think about the length of a long tweet) to answer a question. Read answers out loud to check flow, and use an external service to double check grammar.

To answer the questions, just edit each `.md` file in the `short-answers` folder under the `# Answer` section. Leave the `# Feedback` section blank, that's for your teacher!

-----------------------------
So those are the four sections. They may not be all in the assignment, but always check the `README.md` and run your tests to make sure you've done everything.

# npm start vs npm test
Sometimes you'll want to play around and run files before testing directly. That's what `node FILENAME` or `npm start` are for. However, to make sure you got things right, use `npm test` or `npm run test:w`.

For the tests, they (mostly) only care about what you export from the file. So feel free to *run* the functions in their files while you're messing around.

## playground.js
You can also create what's called a "playground" (or "sandbox") file where you import any code you need, and then mess around with that file. This can be helpful to keep your actual assignment code clean. We've included one (and even added a script).

Alright! Let's get started!

# Question 1: Create our files
First up, you may have noticed our `from-scratch` test is expecting some files to exist, so let's make them! _**In the `src` folder**_ please create the following files:
  - `index.js`
  - `multiply.js`
  - `greet.js`

NOTE: This is a pretty important step! If you can't get the tests that check these files' existence to pass in 20 minutes, reach out to your teacher for help.

# Question 2: Export a `helloWorld` function
Inside `index.js` write a function called `helloWorld` that **RETURNS** the string:
```bash
Hello world!
```
But that's not the real challenge. Using a _**named export**_, export the `helloWorld` function.

# Question 3: Default Export `greet`
We've done a `named export` yes, but what about default exports? In `greet.js`, write a function called `greet()` that takes in a `name` argument and returns a string like:

```js
greet('jo')

Hello, jo! How are you?
```

Now, use a `default export` and export the function.

# Question 4: Import and export `multiply`
Inside `multiply.js` write a function called `multiply()` that takes 2 `numbers` and **RETURNS** their product. Here's the tricky part:

- Default export the `multiply()` function from `multiply.js`
- Then `require` the `multiply()` function into your `index.js`
- Finally, add the `multiply()` function to the named exports of `index.js`

We exported a function out of its base file, imported it into an `index` file, and then re-exported it. Why? This pattern is called a `Barrel File`. Since `index.js` is a "magic" file in node, it can help clean up our exports.

See, if you just require a *folder* instead of a file, node will *automatically* check if theres an `index.js` file in the root of that folder, and then use that. Look how much this feature helps us:

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

This way, we get to write small, focused, well named files, and we only have to write all those `require`s once in an index. Barrel files aren't a good idea for most simple things like these assignments (just export multiple functions from a regular file), but they're a good trick to know for more complex projects.

# Question 5: DEBUG
In `debug.js` We have a function called `mirror()` that's supposed to log and return whatever we pass into it. But the test is failing. What's wrong our code? Check out the tests in `debug.spec.js` and see if you can figure out what we're missing in `debug.js`.

# Question 6: MODIFY
So we wrote a default export (not even using a named function) in `modify.js`. We did this because we *thought* it would only export one function. But now we've added `anotherFunction()`. So we have two things to do:

- rename the anonymous default export function as `liarFunction()`
- Export both `anotherFunction()` and `liarFunction()` as named exports.
-------------------------------------------------

# Short answers
Please answer all the short answers. They're on today's lecture, as well as a new article on "Semantic Versioning." If you're wondering why lectures and assignments look like `#.#.#`, that's what why! Though it's more an homage, our lessons aren't literally semantically versioned.

# Bonus: Review! ...and maybe nodemon
It's day 1, so use this time to get ahead! This week we're going to review variables, data types, functions, string manipulation, and flow control. You learned all about these in the pre work, so go over your notes. Also you can take this time to experiment with Jest's watchAll mode with the npm `test:w` script.

If you *really* want something to do other than review JS, you can check out this [article on nodemon](https://www.geeksforgeeks.org/node-js-nodemon-module/). Nodemon (sounds like pokemon) automatically reruns files when they get saved. It's super handy.
