/* eslint-disable global-require */
const path = require('path');
const fs = require('fs');
const ScoreCounter = require('score-tests');

const testSuiteName = 'From Scratch Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

describe(testSuiteName, () => {
  it('creates index.js file', () => {
    const fileNames = fs.readdirSync(path.join(__dirname));
    expect(fileNames.includes('index.js')).toBeTruthy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('creates multiply.js file', () => {
    const fileNames = fs.readdirSync(path.join(__dirname));
    expect(fileNames.includes('multiply.js')).toBeTruthy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('creates greet.js file', () => {
    const fileNames = fs.readdirSync(path.join(__dirname));
    expect(fileNames.includes('greet.js')).toBeTruthy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('exports a named helloWorld from index.js', () => {
    const { helloWorld } = require('./index');
    expect(typeof helloWorld).toEqual('function');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('returns exactly the right value from helloWorld', () => {
    const { helloWorld } = require('./index');
    expect(helloWorld()).toEqual('Hello world!');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('default exports a function from greet', () => {
    const greet = require('./greet');
    expect(typeof greet).toEqual('function');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('properly greets people', () => {
    const greet = require('./greet');
    const randomName = `sara_${Math.random()}`;
    expect(greet(randomName)).toEqual(`Hello ${randomName}, how are you?`);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('default exports a multiply function from multiply.js', () => {
    const multiply = require('./multiply');
    expect(multiply).toBeTruthy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('name exports a multiply function from index.js', () => {
    const { multiply } = require('./index');
    expect(multiply).toBeTruthy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it("the multiply function isn't just rewritten in index.js", () => {
    const fileText = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf-8');

    expect(fileText.includes('multiply')).toBeTruthy();
    expect(fileText.includes('multiply = (')).toBeFalsy();
    expect(fileText.includes('function multiply')).toBeFalsy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('properly multiplies numbers', () => {
    const multiply = require('./multiply');
    expect(multiply(2, 0)).toEqual(0);
    expect(multiply(5, 5)).toEqual(25);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  // IGNORE PLEASE
  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
});
