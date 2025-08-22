/* eslint-disable import/no-dynamic-require */
const path = require('path');
const fs = require('fs');
const ScoreCounter = require('score-tests');

const testSuiteName = 'Madlib Challenge Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

describe(testSuiteName, () => {
  // Define the file paths we'll be testing
  // path.join() safely combines directory paths for different operating systems
  const madlibChallengeDir = path.join(__dirname, '../src/madlib-challenge');
  const packageJsonPath = path.join(madlibChallengeDir, 'package.json');
  const madlibPath = path.join(madlibChallengeDir, 'madlib.js');
  const indexPath = path.join(madlibChallengeDir, 'index.js');

  // Test 1: Check if the madlib.js file was created
  it('1. creates a new file called madlib.js', () => {
    // Did you create the madlib.js file?
    expect(fs.existsSync(madlibPath)).toBeTruthy();

    scoreCounter.correct(expect);
  });

  // Test 2: Check if madlib.js properly exports the function
  it('2. madlib.js exports the madlib function as a default export', () => {
    // First check if the file exists to prevent require() errors
    if (!fs.existsSync(madlibPath)) {
      throw new Error('madlib.js file does not exist yet. Please create it first.');
    }

    // Actually try to import the madlib function to make sure it works
    const madlib = require(madlibPath);

    // Check that the madlib import is actually a function
    expect(typeof madlib).toEqual('function');

    // Test that the function can be called with the expected parameters
    // This ensures the function works correctly, not just that it exists
    expect(() => {
      madlib('Doctor', 'Alice', 'dance', 'cat', true);
    }).not.toThrow();

    scoreCounter.correct(expect);
  });

  // Test 3: Check if index.js imports madlib and everything works together
  it('3. index.js imports madlib and everything still works', () => {
    // Check that index.js contains the import statement
    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    const hasRequireStatement = indexContent.match(/require\(['"]\.\/madlib\.js['"]\)/);
    expect(hasRequireStatement).toBeTruthy();

    // Check that index.js does not contain the madlib function definition
    const hasMadlibArrowFunction = indexContent.match(/const madlib = \(.*\) =>/);
    const hasMadlibFunctionDeclaration = indexContent.match(/function madlib\(.*\)/);
    expect(hasMadlibArrowFunction).toBeFalsy();
    expect(hasMadlibFunctionDeclaration).toBeFalsy();

    // Check that the madlib function is called in the main function
    expect(indexContent).toContain('madlib(profession, name, verb, pet, storyContinues)');

    scoreCounter.correct(expect);
  });

  // Test 4: Check if package.json was created with npm init
  it('4. initializes a package.json file with npm init', () => {
    // fs.existsSync() returns true if a package.json file exists, false otherwise
    expect(fs.existsSync(packageJsonPath)).toBeTruthy();

    // Read the package.json file and parse it as JSON
    // JSON.parse() converts a JSON string into a JavaScript object
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    // Check that the package.json has the required properties
    // toHaveProperty() is a Jest matcher that checks if an object has a specific property
    expect(packageJson).toHaveProperty('name');
    expect(packageJson).toHaveProperty('version');
    expect(packageJson).toHaveProperty('description');
    expect(packageJson).toHaveProperty('main');

    scoreCounter.correct(expect);
  });

  // Test 5: Check if prompt-sync was installed as a dependency
  it('5. installs prompt-sync as a dependency', () => {
    // First check if package.json exists to prevent readFileSync errors
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error('package.json file does not exist yet. Please run "npm init -y" first.');
    }

    // Read the package.json file again to check dependencies
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    // Check that prompt-sync is listed in the dependencies object
    expect(packageJson.dependencies).toHaveProperty('prompt-sync');

    // Also check that the actual node_modules folder contains prompt-sync
    // This verifies the package was actually downloaded, not just listed
    const promptSyncPath = path.join(madlibChallengeDir, 'node_modules', 'prompt-sync');
    expect(fs.existsSync(promptSyncPath)).toBeTruthy();

    scoreCounter.correct(expect);
  });

  // Test 6: Check if prompt-sync is properly imported and initialized
  it('6. imports and initializes the prompt function', () => {
    // Read the contents of index.js as a string
    const indexContent = fs.readFileSync(indexPath, 'utf-8');

    // Check that the file contains the correct require statements
    // match() returns null if no match is found
    const hasPromptSync = indexContent.match(/require\(['"]prompt-sync['"]\)/);
    const hasPromptSyncInit = indexContent.match(/require\(['"]prompt-sync['"]\)\(\)/);
    expect(hasPromptSync).toBeTruthy();
    expect(hasPromptSyncInit).toBeTruthy();

    scoreCounter.correct(expect);
  });

  // Test 7: Check if hardcoded values were replaced with prompt() calls
  it('7. updates hard-coded values with prompts (5 prompt calls)', () => {
    // Read the contents of index.js
    const indexContent = fs.readFileSync(indexPath, 'utf-8');

    // Count how many times prompt() is called using a regular expression
    // match() with regex /prompt\(/g finds all occurrences of "prompt("
    // The || [] ensures we get an empty array if no matches are found
    const promptCalls = (indexContent.match(/prompt\(/g) || []).length;

    // Check that there are at least 5 prompt() calls (one for each input)
    expect(promptCalls).toBeGreaterThanOrEqual(5);

    scoreCounter.correct(expect);
  });

  // IGNORE PLEASE
  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
});
