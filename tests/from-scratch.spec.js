/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const path = require('path');
const fs = require('fs');
const ScoreCounter = require('score-tests');

const testSuiteName = 'From Scratch Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

// We're expecting some files in the src folder that
// you need to create.
const pathToSrc = path.join(__dirname, '../src');
const pathToIndex = path.join(__dirname, '../src/index.js');
const pathToMultiply = path.join(__dirname, '../src/multiply.js');
const pathToGreet = path.join(__dirname, '../src/greet.js');

describe(testSuiteName, () => {
  it('creates index.js file', () => {
    // Get the file names in the src folder
    const fileNames = fs.readdirSync(pathToSrc);

    // Check if you've created the index.js file
    expect(fileNames.includes('index.js')).toBeTruthy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('creates multiply.js file', () => {
    const fileNames = fs.readdirSync(pathToSrc);

    // Check if you've created the multiply.js file
    expect(fileNames.includes('multiply.js')).toBeTruthy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('creates greet.js file', () => {
    const fileNames = fs.readdirSync(pathToSrc);

    // Check if you've created the greet.js file
    expect(fileNames.includes('greet.js')).toBeTruthy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('exports a named helloWorld from index.js', () => {
    const { helloWorld } = require(pathToIndex);
    expect(helloWorld).toBeTruthy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('returns exactly the right value from helloWorld', () => {
    const { helloWorld } = require(pathToIndex);
    expect(typeof helloWorld).toEqual('function');

    expect(helloWorld()).toEqual('Hello world!');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('exports a default export called greet from greet.js', () => {
    const greet = require(pathToGreet);
    expect(greet).toBeTruthy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('properly greets people', () => {
    const greet = require(pathToGreet);
    expect(typeof greet).toEqual('function');

    const randomName = `sara_${Math.random()}`;
    expect(greet(randomName)).toEqual(`Hello ${randomName}, how are you?`);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('exports a default export called multiply from multiply.js', () => {
    const multiply = require(pathToMultiply);
    expect(multiply).toBeTruthy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('name exports a multiply function from index.js', () => {
    const { multiply } = require(pathToIndex);
    expect(typeof multiply).toEqual('function');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it("the multiply function isn't just rewritten in index.js", () => {
    const fileText = fs.readFileSync(pathToIndex, 'utf-8');

    expect(fileText.includes('multiply')).toBeTruthy();
    expect(fileText.includes('multiply = (')).toBeFalsy();
    expect(fileText.includes('function multiply')).toBeFalsy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('properly multiplies numbers', () => {
    const multiply = require(pathToMultiply);
    expect(multiply(2, 0)).toEqual(0);
    expect(multiply(5, 5)).toEqual(25);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  // IGNORE PLEASE
  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
});
