const mongoose=require("mongoose");

module.exports.init=async function(){
    await mongoose.connect("mongodb+srv://"+process.env.MONGO_USERNAME+":"+process.env.MONGO_PASSWORD+"@cluster0.h1usxsj.mongodb.net/SamuhikCharcha?retryWrites=true&w=majority");
}