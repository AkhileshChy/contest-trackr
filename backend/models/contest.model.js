import mongoose from "mongoose";

const contestSchema = new mongoose.Schema({
    platform : String,
    name : String,
    url : String,
    startTime : Date,
    duration : Number
})

const Contest = mongoose.model('Contest', contestSchema);

export default Contest;