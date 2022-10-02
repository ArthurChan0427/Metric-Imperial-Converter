const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('correctly read a whole number input', function() {
    let expected = 12;
    let inputString = '012mi';
    let actual = convertHandler.getNum(inputString);
    assert.equal(actual, expected);
  });

  test('correctly read a decimal number input', function() {
    let expected = 0.12;
    let inputString = '0.12mi';
    let actual = convertHandler.getNum(inputString);
    assert.equal(actual, expected);
  });

  test('correctly read a fractional input', function() {
    let expected = 4 / 3;
    let inputString = '4/3mi';
    let actual = convertHandler.getNum(inputString);
    assert.equal(actual, expected);
  });

  test('correctly read a fractional input with a decimal', function() {
    let expected = 4.63 / 3.5;
    let inputString = '4.63/3.5mi';
    let actual = convertHandler.getNum(inputString);
    assert.equal(actual, expected);
  });

  test('correctly return an error on a double-fraction (i.e. 3/2/3)', function() {
    let expected = undefined;
    let inputString = '3/2/3mi';
    let actual = convertHandler.getNum(inputString);
    assert.equal(actual, expected);
  });
  
  test('correctly default to a numerical input of 1 when no numerical input is provided', function() {
    let expected = 1;
    let inputString = 'mi';
    let actual = convertHandler.getNum(inputString);
    assert.equal(actual, expected);
  });
  
  test('correctly read each input unit', function() {
    let expected = ['mi', 'km', 'gal', 'l', 'lbs', 'kg'];
    for (let i = 0; i < expected.length; i++) {
      let inputString = '4/3' + expected[i];
      let actual = convertHandler.getUnit(inputString);
      assert.equal(actual, expected[i]);
    }
  });

  test('correctly return an error for an invalid input unit', function() {
    let expected = undefined;
    let inputString = '4/3t';
    let actual = convertHandler.getReturnUnit(convertHandler.getUnit(inputString));   
    assert.equal(actual, expected);
  });
  
  test('return the correct return unit for each valid input unit', function() {
    let expected = ['mi', 'km', 'gal', 'l', 'lbs', 'kg'];
    let inputStrings = ['km', 'mi', 'l', 'gal', 'kg', 'lbs'];
    for (let i = 0; i < expected.length; i++) {
      let actual = convertHandler.getReturnUnit(inputStrings[i]);   
      assert.equal(actual, expected[i]);
    }
  });

  test('correctly return the spelled-out string unit for each valid input unit', function() {
    let expected = ['miles', 'kilometers', 'gallons', 'liters', 'pounds', 'kilograms'];
    let inputStrings = ['mi', 'km', 'gal', 'l', 'lbs', 'kg'];
    for (let i = 0; i < expected.length; i++) {
      let actual = convertHandler.spellOutUnit(inputStrings[i]);   
      assert.equal(actual, expected[i]);
    }
  });

  test('correctly convert gal to L', function() {
    const galToL = 3.78541;
    let expected = 3.78541;
    let actual = convertHandler.convert(1, 'gal');
    assert.equal(actual, expected);
  });
  
  test('correctly convert L to gal', function() {
    const galToL = 3.78541;
    let expected = 1;
    let actual = convertHandler.convert(3.78541, 'l');   
    assert.equal(actual, expected);
  });
  
  test('correctly convert mi to km', function() {
    const miToKm = 1.60934;
    let expected = 1.60934;
    let actual = convertHandler.convert(1, 'mi');   
    assert.equal(actual, expected);
  });
  
  test('correctly convert km to mi', function() {
    const miToKm = 1.60934;
    let expected = 1;
    let actual = convertHandler.convert(1.60934, 'km');   
    assert.equal(actual, expected);
  });
  
  test('correctly convert lbs to kg', function() {
    const lbsToKg = 0.453592;
    let expected = 0.453592;
    let actual = convertHandler.convert(1, 'lbs');   
    assert.equal(actual, expected);
  });
  
  test('correctly convert kg to lbs', function() {
    const lbsToKg = 0.453592;
    let expected = 1;
    let actual = convertHandler.convert(0.453592, 'kg');   
    assert.equal(actual, expected);
  });
  
});