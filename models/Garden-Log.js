module.exports = (mongoose) => {
    const GardenLog = mongoose.model(
        'garden-log',
        mongoose.Schema(
            {
                year: {
                    type: Number,
                    required: true
                },
                seedName: {
                    type: String,
                    required: true
                },
                seedType: {
                    type: String,
                    required: false,
                    default: 'n/a'
                },
                variety: {
                    type: String,
                    required: true
                },
                plantedQty: {
                    type: String,
                    required: true
                },
                plantedDate: {
                    type: String,
                    required: true
                },
                harvestedQty: {
                    type: String,
                    required: false,
                    default: ''
                },
                harvestedDate: {
                    type: String,
                    required: false,
                    default: ''
                },
                notes: {
                    type: String,
                    required: false,
                    default: ''
                }
            },
            {   // Stops mongoose from adding an 's' to the end of the DB name
                collection: 'garden-log'
            }
        )
    );

    return GardenLog;

};