module.exports=mongoose=>{const GardenLog=mongoose.model("garden-log",mongoose.Schema({year:{type:Number,required:!0},seedName:{type:String,required:!0},seedType:{type:String,required:!1,default:"n/a"},variety:{type:String,required:!0},plantedQty:{type:String,required:!0},plantedDate:{type:String,required:!0},harvestedQty:{type:String,required:!1,default:""},harvestedDate:{type:String,required:!1,default:""},notes:{type:String,required:!1,default:""}},{collection:"garden-log"}));return GardenLog};