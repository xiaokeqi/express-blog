
let headers = {
	method:'get',
	headers:{
		'Content-type':'application/json',
	},
	'credentials': 'include'
}

/**
 * @param  {[type]} data:obj,
 * {
 * 		url:'' 必填项
 * }
 * 
 * @return {[type]}
 */
export function getRequest(url, data){
	let req = Object.assign({},headers);
	req.body = data;	
	return fetch(url,req)
	.then(status)
	.then(json)
	.then(checkSuccess)
	.catch(function(err){
		console.log(err);
	})
}
/**
 * @param  {[type]} data:obj,
 * {
 * 		url:'' 必填项
 * }
 * 
 * @return {[type]}
 */
export function postRequest(url,data){

	let req = Object.assign({},headers);
	req.method = 'post';
	req.body = JSON.stringify(data);
	return fetch(url,req)
	.then(status)
	.then(json)
	.then(checkSuccess)
	.catch(function(err){
		console.log(err);
	})
}

function checkSuccess(data){
	if(data.status == 0){
		return data.data
	}else{
		return new Error(data.message);
	}
}

function status(response){
	if((response.status >= 200 && response.status < 300) || response.status == 304){
		return response
	}else{
		return new Error(response.statusText);
	}
}

function json(response){
	return response.json();
}