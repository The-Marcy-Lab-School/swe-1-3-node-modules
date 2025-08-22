// TODO: Import prompt-sync and madlib.js

// TODO: Move the madlib function to its own file: madlib.js
const madlib = (profession, name, verb, pet, storyContinues) => {
  console.log(`There once was a ${profession} named ${name}.`);
  console.log(`Every day, ${name} would practice ${verb} with their pet${pet} by their side.`);

  if (storyContinues) {
    console.log(`Suddenly, ${name} discovered a hidden talent that no one knew about, and everything changed!`);
  } else {
    console.log(`${name} continued their days peacefully, always practicing ${verb} with their pet ${pet}.`);
  }

  console.log('The end.');
};

// TODO: Replace the hardcoded values with prompt calls
const main = () => {
  const profession = 'Wizard';
  const name = 'Harry';
  const verb = 'magic spells';
  const pet = 'owl';
  const storyContinues = true;

  madlib(profession, name, verb, pet, storyContinues);
};

main();
