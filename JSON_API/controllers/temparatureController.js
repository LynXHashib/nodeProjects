const express = require('express');

const convertTemperature = (unit, temp) => {
  if (unit === 'c') {
    return (temp * 9) / 5 + 32;
  } else if (unit === 'f') {
    return ((temp - 32) * 5) / 9;
  } else {
    return null;
  }
};
const convert = (req, res) => {
  const temp = parseFloat(req.query.temp);
  const unit = req.query.unit.toLowerCase();
  console.log(temp);
  console.log(unit);

  if (isNaN(temp) || !unit) {
    res.status(404).send('Provide Valid Temperature');
  }
  if (convertTemperature(unit, temp) === null) {
    res.status(404).send('Provide Valid Temperature');
  }
  console.log(convertTemperature(unit, temp));
  res.status(200).json({
    original: `${temp} ${unit === 'c' ? 'celsius' : 'fahrenheit'}`,
    convert: `${convertTemperature(unit, temp).toFixed(2)} ${
      unit === 'f' ? 'celsius' : 'fahrenheit'
    }`,
  });
};

module.exports = convert;
