const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { mongoose } = require("./config/db");

const product = require("./model/productModel");
const cart = require("./model/cartModel");

app.use(bodyParser.json());
const defaultDateFormate = "DD-MM-YYYY,h:mm:ss A";
const moment = require("moment");
const fs = require("fs");
const http = require("http");
const request = require("request");


app.get("/",()=>{
	console.log("hello");
});


app.post("/addProduct",async(req,res)=>{
	
		let title = req.body.title;
		let price = req.body.price;
		let discount = req.body.discount;

		let newproduct = new product({title:title,price:price,discount:discount});
		await newproduct.save((err,docs)=>{
			if(!err)
			{
				response = {"statusCode":200,"data":docs}
			}else{
				response = {"statusCode":400,"data":err}

			}
			res.send(response);
		});
	
});


app.post("/addCart",async(req,res)=>{
	
		let userId = req.body.userId;
		let productId = req.body.productId;
		let qty = req.body.qty;
		let products=[{productId:productId,qty:qty}]; 

		

		await cart.findOneAndUpdate({ userId:userId },{ "$push": { "products": {productId:productId,qty:qty} } }, { "useFindAndModify":true }, async (err, docs) => {
            if(!err)
				{
					response = {"statusCode":200,"data":docs}

					if(!docs)
					{
						cartData = new cart({userId,products});
					    await cartData.save((err,doc)=>{
							if(!err)
							{
								response = {"statusCode":200,"data":doc}
							}else{
								response = {"statusCode":400,"data":err}
							}
							res.send(response);	
						});
					}
				}else{
					response = {"statusCode":400,"data":err}
				}
				res.send(response);	
        });
		/*await cart.findOne({userId:userId},async (err,docs)=>{
			if(!err)
			{
				if(docs)
				{

					products.push(docs.products);
	
				  await cart.updateOne({_id:docs._id}, {products,last_updated:moment.utc().format(defaultDateFormate)}, {
						new: false,
						upsert: true,
						rawResult: true 
						},(err,docs)=>{
						if(!err)
						{
							response={"statuscode":200,"data":docs}
						}else{
							response={"statuscode":400,"data":err}
						}
					
					});
				}else{
					cartData = new cart({userId,products});
					await cartData.save((err,docs)=>{
						if(!err)
						{
							response = {"statusCode":200,"data":docs}
						}else{
							response = {"statusCode":200,"data":err}
						}
						res.send(response);	
			
						});
				}
				
			}else{
				response={"statuscode":400,"data":err}
			}
			res.send(response);		
		});*/
	
});




app.get('/readStream', (req, res) => {

let filepath = 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3';

let randname = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

request
  .get('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',(error, response, audioBody)=> {
	        if (error ) {
	            res.send({"statusCode":404,"message":"File not exist"})
	        }
	})
  .on('error', function(err) {
    if(!err)
    {
    	console.log("get some error")
    }
  })
  .pipe(fs.createWriteStream(randname+'.mp3',(err,data)=>{
  		if(!err)
  		{
  			res.send({"statusCode":200,"message":"file has been download."})
  		}else{
  			res.send({"statusCode":200,"message":"error occued while downloading file!!!"})
  		}

  }));


/*fs.readFile(filepath, 'mp3', function(err, data) {
    if (err) {
      res.writeHead(404);
      res.end("404 Not Found");
    } else {
    	
      res.writeHead(200, {
        "Content-Type": "text/html"
      });
      res.end(data);
    }
  });
*/

	//let filePath = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
	//stat = fs.statSync(filePath);

	 /*fs.exists(filePath, (exists) => {
        if (exists) {
            const rstream = fs.ReadStream(file);
            rstream.pipe(res);
        } else {
            res.send('Error - 404');
            res.end();
        }
    });*/

	/*let opStream = fs.createReadStream(filePath);

    opStream.pipe(res);*/

	/*const file = fs.createReadStream(filePath);
		file.write('hello, ');
		file.end('world!');*/
  /*  var readStream = fs.createReadStream(filePath);    
    readStream.on('data', (data) => {
        res.write(data);
    });
    readStream.on('end', (err,data) => {
		if(!err)
		{
			res.status(200).send("File has been download successfully.");
		}else{
			res.status(400).send("Error occured while file downloading!!!");
		}
    });*/
});



app.listen("3000");
