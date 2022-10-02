function ConvertHandler() {

  this.getNum = function(input) {
    let result;

    let matchings = input.match(/(\d+\.?\d*)\/?(\d+\.?\d*)?(\/*)/);
    if (matchings !== null) {
      if (matchings[2] === undefined) {
        result = parseFloat(matchings[1]);
      } else {
        if (matchings[3] === '') {
          result = parseFloat(matchings[1]) / parseFloat(matchings[2]);
        } else {
          result = undefined;
        }
      }
    } else {
      result = 1;
    } 
    
    return result;
  };

  this.getUnit = function(input) {
    let result = input.match(/[^a-z%]*([a-z%]*)/)[1];
    return result;
  };

  this.getReturnUnit = function(initUnit) {
    let result;

    if (initUnit == 'gal' || initUnit == 'l') {
      result = initUnit == 'gal' ? 'l' : 'gal';
    } else if (initUnit == 'mi' || initUnit == 'km') {
      result = initUnit == 'mi' ? 'km' : 'mi';
    } else if (initUnit == 'lbs' || initUnit == 'kg') {
      result = initUnit == 'lbs' ? 'kg' : 'lbs';
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    if (unit == 'gal') result = 'gallons';
    if (unit == 'l') result = 'liters';
    if (unit == 'mi') result = 'miles';
    if (unit == 'km') result = 'kilometers';
    if (unit == 'lbs') result = 'pounds';
    if (unit == 'kg') result = 'kilograms';

    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initUnit == 'gal' || initUnit == 'l') result = initUnit == 'gal' ? initNum*galToL : initNum/galToL;
    if (initUnit == 'mi' || initUnit == 'km') result = initUnit == 'mi' ? initNum*miToKm : initNum/miToKm;
    if (initUnit == 'lbs' || initUnit == 'kg') result = initUnit == 'lbs' ? initNum*lbsToKg : initNum/lbsToKg;

    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = initNum + ' ' + initUnit + ' converts to ' + returnNum + ' ' + returnUnit + '.';

    return result;
  };

}

module.exports = ConvertHandler;
