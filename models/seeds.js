module.exports = (mongoose) => {
    const Seed = mongoose.model(
        'seeds',
        mongoose.Schema(
            {
                name: {
                    type: String,
                    required: true
                },
                type: {
                    type: String,
                    required: false,
                    default: 'n/a'
                },
                seedsPerOunce: {
                    type: Number,
                    required: true
                },
                seedsPer100Feet: {
                    type: String,
                    required: true
                },
                sowingDepth: {
                    type: String,
                    required: true
                },
                daysToGermination: {
                    type: String,
                    required: true
                },
                rowSpacing: {
                    type: String,
                    required: true
                },
                plantSpacing: {
                    type: String,
                    required: true
                },
                daysToHarvest: {
                    type: String,
                    required: true
                },
                plantingDate: {
                    type: String,
                    required: true
                }
            }
        )
    );

    return Seed;

};

// name: String,
// type: String,
// seedsPerOunce: Number,
// seedsPer100Feet: String,
// sowingDepth: String,
// daysToGermination: String,
// rowSpacing: String,
// plantSpacing: String,
// daysToHarvest: String,
// plantingDate: String