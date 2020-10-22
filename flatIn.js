function flatIn(arr,response)
{
	let arrlen = arr.length;

	for(let i= 0;i<arrlen;i++)
	{
    if(Array.isArray(arr[i]))
    {
      flatIn(arr[i],response)
    }else{
        	response.push(arr[i]);
    }
	
	}
	return response;
}

let arr = [4,[2,3],[5,[5,6,2]],[9,8,[23,5]]];
let response = [];
console.log(flatIn(arr,response));


