const fs = require('fs');

const fileName = process.argv[2];

/*****************************
 * VERIFY THE DATA
 * ***************************/

const hasOnlyNumbers = (array) => {
  const notNumbers = array.filter((element) => !Number.isInteger(element));
  if (notNumbers.length >= 1) return false;
  return true; 
};

var comparisonCount = 0;

const sumPair = (numbers, k) => {
  comparisonCount = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      comparisonCount++;
      if (numbers[i] + numbers[j] === k) return true;
    }
  }
  return false;
}

// Méthode synchrone
try {
  const data = fs.readFileSync(fileName, 'utf8');
  const numbers = data.split(' ').map((number) => Number.parseInt(number));
  if (!hasOnlyNumbers(numbers)) return console.error("The data is not valid!");

  console.log('====================================');
  console.log('BEGIN');
  console.log(numbers);
  console.log('====================================\n');

  console.log(`The answer is ${sumPair(numbers, 17)}, with ${comparisonCount} comparisons`);
  console.log(`The answer is ${sumPair(numbers, 19)}, with ${comparisonCount} comparisons`);

  console.log('\n====================================');
  console.log('END');
  console.log('====================================');
  
} catch (error) {
  console.error(error.message);
}
