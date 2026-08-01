/* eslint-disable global-require */
const { anotherFunction, onlyOne } = require('../src/modify');

const testSuiteName = 'Modify Tests';

describe(testSuiteName, () => {
  it('does not export default a function anymore', () => {
    const exportedModule = require('../src/modify');
    expect(typeof exportedModule).toEqual('object');
  });

  it('has the right named exports', () => {
    expect(typeof anotherFunction).toEqual('function');
    expect(typeof onlyOne).toEqual('function');
  });

  it('prints the right response from onlyOne', () => {
    expect(onlyOne()).toEqual('I stand alone.');
  });

  it('prints the right response from another function', () => {
    expect(anotherFunction()).toEqual("No, you don't.");
  });
});
