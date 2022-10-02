'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();
  
  app.route('/api/convert').get(function(req, res) {
    const initNum = convertHandler.getNum(req.query.input);
    const initUnit = convertHandler.getUnit(req.query.input); 
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    if (initNum === undefined && returnUnit === undefined) {
        res.send('invalid numerical expression and unit');
        return;
    }
    if (initNum === undefined) {
      res.send('invalid numerical expression');
      return;
    }
    if (returnUnit === undefined) {
      res.send('invalid unit');
      return;
    }
    const spelledOutInitUnit = convertHandler.spellOutUnit(initUnit);
    const spelledOutReturnUnit = convertHandler.spellOutUnit(returnUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnString = convertHandler.getString(initNum, spelledOutInitUnit, returnNum, spelledOutReturnUnit);
    res.send(returnString);
  });

};
