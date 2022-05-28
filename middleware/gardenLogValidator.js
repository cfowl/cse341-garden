const gardenLogValidator = require('../helpers/validate');

function saveEntry(req, res, next) {
  const validationRule = {
    year: "required|numeric",
    seedName: "required|string",
    seedType: "string",
    variety: "required|string",
    plantedQty: "required|string",
    plantedDate: "required|string",
    harvestedQty: "string",
    harvestedDate: "string",
    notes: "string"
  };
  gardenLogValidator(req.body, validationRule, {}, (err, status) => {
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
  saveEntry
};
