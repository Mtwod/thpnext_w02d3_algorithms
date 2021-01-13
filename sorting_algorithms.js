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

/*****************************
 * SWAP ELEMENT OF AN ARRAY
 * ***************************/

const swap = (items, leftIndex, rightIndex) => {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

/*****************************
 * BUBBLE SORT
 * ***************************/
const bubbleSort = (numbers) => {
  let sortedNumbers = [...numbers];
  let comparisonCount = 0;
  let swapped;
  for (let i = sortedNumbers.length - 1; i >= 0; i--) {
    swapped = false;
    for (let j = 0; j < i; j++) {
      comparisonCount++;
      if (sortedNumbers[j] > sortedNumbers[j + 1]) {
        swap(sortedNumbers, j, j+1);
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  console.log(`Tri à bulle: ${comparisonCount} comparaisons - [${sortedNumbers}] \n`);
  return sortedNumbers;
}

/*****************************
 * INSERTION SORT
 * ***************************/

const insertionSort = (numbers) => {
  let sortedNumbers = [...numbers];
  let comparisonCount = 0;
  for (let i = 1; i < sortedNumbers.length; i++) {
    const valueToCompare = sortedNumbers[i];
    j = i;
    comparisonCount++;
    while (j > 0 && sortedNumbers[j - 1] > valueToCompare) {
      sortedNumbers[j] = sortedNumbers[j - 1];
      j--;
      comparisonCount++;
    }
    sortedNumbers[j] = valueToCompare;
  }
  console.log(`Tri par insertion: ${comparisonCount} comparaisons - [${sortedNumbers}] \n`);
  return sortedNumbers;
};


/*****************************
 * SELECTION SORT
 * ***************************/

const selectionSort = (numbers) => {
  let sortedNumbers = [...numbers];
  let comparisonCount = 0;
  for (let i = 0; i < sortedNumbers.length - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < sortedNumbers.length; j++) {
      comparisonCount++;
      if (sortedNumbers[j] < sortedNumbers[minIndex]) minIndex = j;
    }
    if (minIndex != i) {
      swap(sortedNumbers, i, minIndex);
    }
  }
  console.log(`Tri par sélection: ${comparisonCount} comparaisons - [${sortedNumbers}] \n`);
  return sortedNumbers;
};


/*****************************
 * QUICK SORT
 * ***************************/
// Can be optimized
class QuickSort {

  constructor(array) {
    this.array = [...array];
    this.comparisonCount = 0;
  }

  partition(array, firstIndex, lastIndex) {
    const pivotValue = array[firstIndex];
    let i = lastIndex;
    for (let j = lastIndex; j >= firstIndex; j--) {
      this.comparisonCount++;
      if (array[j] > pivotValue) {
        swap(array, i, j);
        i--;
      }
    }
    swap(array, i, firstIndex);
    return i;
  }
  
  quickSort(array, firstIndex, lastIndex) {
    if (array.length < 2) return array;
    if (firstIndex < lastIndex) {
      const pivotIndex = this.partition(array, firstIndex, lastIndex);
      this.quickSort(array, firstIndex, pivotIndex - 1);
      this.quickSort(array, pivotIndex + 1, lastIndex);
    }
    return array;
  }

  display() {
    console.log(`Tri rapide: ${this.comparisonCount} comparaisons - [${this.array}] \n`);
  }

  perform() {
    if (this.comparisonCount === 0) this.quickSort(this.array, 0, this.array.length - 1);
    this.display();
  }
};

/*****************************
 * MERGE SORT
 * ***************************/
class MergeSort {

  constructor(array) {
    this.array = [...array];
    this.comparisonCount = 0;
  }

  merge(left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
      this.comparisonCount ++;
      if (left[leftIndex] < right[rightIndex]) {
        resultArray.push(left[leftIndex]);
        leftIndex ++;
      } else {
        resultArray.push(right[rightIndex]);
        rightIndex++;
      }
    }
    return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }
  
  mergeSort(array) {
    if (array.length <= 1) return array;
    const middleIndex = Math.floor(array.length / 2);
    const firstHalfNumbers = array.slice(0, middleIndex);
    const secondHalfNumbers = array.slice(middleIndex);
    return this.merge(this.mergeSort(firstHalfNumbers), this.mergeSort(secondHalfNumbers));
  }

  display() {
    console.log(`Tri fusion: ${this.comparisonCount} comparaisons - [${this.array}] \n`);
  }

  perform() {
    if (this.comparisonCount === 0) this.array = this.mergeSort(this.array);
    this.display();
  }
};

// Méthode asynchrone
// fs.readFile(fileName, 'utf8', (error, data) => {
//   if (error) {
//       console.error(error.message);
//       return ;
//   }
//   console.log(data);
// });



/*****************************
 * LAUNCH AND TEST THE ALGORITHMS
 * ***************************/

// Méthode synchrone
try {
  const data = fs.readFileSync(fileName, 'utf8');
  const numbers = data.split(' ').map((number) => Number.parseInt(number));
  if (!hasOnlyNumbers(numbers)) return console.error("The data is not valid!");

  console.log('====================================');
  console.log('BEGIN');
  console.log(numbers);
  console.log('====================================\n');

  bubbleSort(numbers);
  insertionSort(numbers);
  selectionSort(numbers);
  const quickSortedNumbers = new QuickSort(numbers);
  quickSortedNumbers.perform();
  const mergeSortedNumbers = new MergeSort(numbers);
  mergeSortedNumbers.perform();

  console.log('\n====================================');
  console.log('END');
  console.log('====================================');
  
} catch (error) {
  console.error(error.message);
}
