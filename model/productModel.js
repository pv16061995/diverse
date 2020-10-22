const mongoose = require('mongoose');
const moment = require('moment');
const defaultDateFormate = "DD-MM-YYYY,h:mm:ss A";


let productModule = {
	title : {
		type: String,
		required: true,
		trim:true,
		min:3,
		max:50
	},
	price:{
		type:Number,
		required:true
	},
	discount:{
		type:Number,
		required:true,
	},
	is_active:{type:Boolean,default:true},
	is_deleted:{type:Boolean,default:false},
	created_date:{
		type:Date,
		default:moment.utc().format()
	},
	last_updated:{
		type:Date,
		default:moment.utc().format()
	}
};

module.exports =  mongoose.model("product",productModule);