const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/diverse', {
  useNewUrlParser: true,
  useUnifiedTopology: true
},err=>{
	if(!err)
	{
		console.log("Connect with DB Successfully!!!");
	}
});

module.exports=mongoose;