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

const sumPair = (numbers, total) => {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === total) return true;
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

  console.log(sumPair(numbers, 17));
  console.log(sumPair(numbers, 19));

  console.log('\n====================================');
  console.log('END');
  console.log('====================================');
  
} catch (error) {
  console.error(error.message);
}
