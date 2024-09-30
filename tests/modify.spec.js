/* eslint-disable global-require */
const path = require('path');
const ScoreCounter = require('score-tests');
const { anotherFunction, liarFunction } = require('../src/modify');

const testSuiteName = 'Modify Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

describe(testSuiteName, () => {
  it('does not export default a function anymore', () => {
    const exportedModule = require('../src/modify');
    expect(typeof exportedModule).toEqual('object');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('has the right named exports', () => {
    expect(typeof anotherFunction).toEqual('function');
    expect(typeof liarFunction).toEqual('function');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('prints the right response from liarFunction', () => {
    expect(liarFunction()).toEqual('I stand alone.');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('prints the right response from another function', () => {
    expect(anotherFunction()).toEqual("No, you don't.");

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  // IGNORE PLEASE
  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
});
