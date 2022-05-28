const seedValidator = require('../helpers/validate');

function saveSeed(req, res, next) {
  const validationRule = {
    name: "required|string",
    type: "string",
    seedsPerOunce: "required|numeric",
    seedsPer100Feet: "required|string",
    sowingDepth: "required|string",
    daysToGermination: "required|string",
    rowSpacing: "required|string",
    plantSpacing: "required|string",
    daysToHarvest: "required|string",
    plantingDate: "required|string"
  };
  seedValidator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
}

module.exports = {
  saveSeed
};
