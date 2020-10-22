const mongoose = require('mongoose');
const moment = require('moment');
const defaultDateFormate = "DD-MM-YYYY,h:mm:ss A";
let ObjectId = require('mongoose').Types.ObjectId;

let cartModule = {
	userId : {
		type: ObjectId,
		required: true,
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
	},
	products:[
		{
			productId:{
				type: ObjectId,
				required: true,
			},
			qty:{
				type:Number,
				default:0
			}
		}
	]
};

module.exports =  mongoose.model("cart",cartModule);