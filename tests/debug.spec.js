const path = require('path');
const ScoreCounter = require('score-tests');
const { mirror } = require('../src/debug');

const testSuiteName = 'Debug Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

describe(testSuiteName, () => {
  it('mirrors a given value', () => {
    expect(mirror('hello')).toEqual('hello');
    expect(mirror(1)).toEqual(1);
    expect(mirror(true)).toEqual(true);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  // IGNORE PLEASE
  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
});
