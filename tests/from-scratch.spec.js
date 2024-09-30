/* eslint-disable global-require */
const path = require('path');
const fs = require('fs');
const ScoreCounter = require('score-tests');

const testSuiteName = 'From Scratch Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);
const relativePathToSrc = path.join(__dirname, '../src')
const pathToIndex = path.join(relativePathToSrc, './index.js')
const pathToMultiply = path.join(relativePathToSrc, './multiply.js')
const pathToGreet = path.join(relativePathToSrc, './greet.js')


describe(testSuiteName, () => {
  it('creates index.js file', () => {
    const fileNames = fs.readdirSync(relativePathToSrc);
    expect(fileNames.includes('index.js')).toBeTruthy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('creates multiply.js file', () => {
    const fileNames = fs.readdirSync(relativePathToSrc);
    expect(fileNames.includes('multiply.js')).toBeTruthy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('creates greet.js file', () => {
    const fileNames = fs.readdirSync(relativePathToSrc);
    expect(fileNames.includes('greet.js')).toBeTruthy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('exports a named helloWorld from index.js', () => {
    const { helloWorld } = require(pathToIndex);
    expect(typeof helloWorld).toEqual('function');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('returns exactly the right value from helloWorld', () => {
    const { helloWorld } = require(pathToIndex);
    expect(helloWorld()).toEqual('Hello world!');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('default exports a function from greet', () => {
    const greet = require(pathToGreet);
    expect(typeof greet).toEqual('function');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('properly greets people', () => {
    const greet = require(pathToGreet);
    const randomName = `sara_${Math.random()}`;
    expect(greet(randomName)).toEqual(`Hello ${randomName}, how are you?`);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('default exports a multiply function from multiply.js', () => {
    const multiply = require(pathToMultiply);
    expect(multiply).toBeTruthy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('name exports a multiply function from index.js', () => {
    const { multiply } = require(pathToIndex);
    expect(multiply).toBeTruthy();

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
