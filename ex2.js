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

const westView = (numbers) => {
  let comparisonCount = 0;
  let numbersToCheck = [...numbers];
  let hasView = 0;
  let currentIsMax;
  let currentValue;
  
  for (let i = 0; i < numbersToCheck.length; i++) {
    currentIsMax = true;
    currentValue = numbersToCheck[i];
    for (let j = i + 1; j < numbersToCheck.length; j++) {
      comparisonCount++;
      if (numbersToCheck[j] >= currentValue) {
        currentIsMax = false;
        break;
      }
    }
    if (currentIsMax) hasView++;
  }

  console.log(`Le nombre final est: ${hasView}, avec ${comparisonCount} comparaisons`);
  return hasView;
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

  westView(numbers);

  console.log('\n====================================');
  console.log('END');
  console.log('====================================');
  
} catch (error) {
  console.error(error.message);
}
