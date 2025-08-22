# swe-1-3-node-modules

- [Reminders](#reminders)
  - [Asking ChatGPT for Help](#asking-chatgpt-for-help)
  - [Be Okay With Being "Provisionally Complete"](#be-okay-with-being-provisionally-complete)
- [Setup](#setup)
- [Modify Questions](#modify-questions)
  - [Question 1: Default to Named Exports](#question-1-default-to-named-exports)
- [Program Challenge](#program-challenge)
  - [Question 2: Madlib Challenge](#question-2-madlib-challenge)

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

## Modify Questions

### Question 1: Default to Named Exports
So we wrote a default export in `modify.js`. We did this because we *thought* it would only export the `onlyOne` function. But now we want to add another function to also export! So we have two things to do:

1. First, copy this function into the `modify.js` file

```js
const anotherFunction = () => {
  return "No, you don't.";
};
```

2. Export both `anotherFunction()` and `onlyOne()` as named exports.

## Program Challenge

### Question 2: Madlib Challenge

You'll find a folder in the `src` folder called `madlib-challenge`. It contains a single `index.js` file with two functions:
- `madlib()` a function that accepts various inputs to generate a story.
- `main()` - defines hard-coded values to invoke the `madlib()` function with.

First, change directories to move into this folder and then run the `index.js` file to see how the program works:

```sh
cd src/madlib-challenge   # move into the madlib-challenge directory
node index.js             # run the program
```

Try changing around the values to change the story!

This program is considered **"hard-coded"** because the program code must be modified in order to produce a new result. Let's refactor this into an interactive Madlib program that gets user input instead.

Your goal is to improve the program by doing the following:

1. **First, improve the separation of concerns by using modules:**
   * Create a new file in the `madlib-challenge` directory called `madlib.js`.
   * Move the `madlib` function from `index.js` into your new `madlib.js`
   * Export the `madlib` function from `madlib.js` as a default export.
   * Import `madlib` into your `index.js` file so that it can be used.

2. **Then, make the program more dynamic allowing the user to change the story each time they run the program:**
    * Initialize the `package.json` file using `npm init -y`
    * Install the `prompt-sync` module from `npm` using your terminal
    * Update `index.js` to import and configure the `prompt` function from `prompt-sync`
    
      ```js
      const prompt = require('prompt-sync')()
      ```

    * Replace the hard-coded values for `profession`, `name`, `verb`, `pet`, `storyContinues` with calls to `prompt()` 

        ```js
        const profession = prompt('Choose a profession: ');
        const name = prompt('Choose a name: ');
        const verb = prompt('Choose a verb: ');
        const pet = prompt('Choose a pet: ');
        
        // We have to do some input validation for this one to make sure it is a boolean
        const storyContinuesResponse = prompt('Choose whether the story continues. Y or N: ');
        const storyContinues = storyContinuesResponse.toUpperCase() === "Y";
        ```
