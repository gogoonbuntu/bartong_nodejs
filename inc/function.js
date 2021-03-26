/*
npm install urlencode
npm install axios
npm install iconv-lite
*/
const urlencode = require('urlencode')
const axios = require('axios')
const iconv = require('iconv-lite')

const DN_SERVICE_URL = "https://bcoin.teledit.com/bartong/"
const DN_CONNECT_TIMEOUT = 5
const DN_TIMEOUT = 30

/******************************************************
 * ID		: 다날에서 제공해 드린 CPID
 * PWD		: 다날에서 제공해 드린 CPPWD
 * ORDERID	: CP 주문정보
 ******************************************************/
const ID  = "A010002002"
const PWD = "bbbbb"
const ORDERID = "ORDERID"
exports.ID = ID
exports.PWD = PWD
exports.ORDERID = ORDERID
const Debug = true

exports.CallTrans = async function( data ) {
    let REQ_STR = data2str( data )
    let RES_STR = ""
	
	//인증서 무시 옵션입니다. 테스트에만 사용해주세요.
	process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;    	
	
	let res = await axios.post(DN_SERVICE_URL, REQ_STR, {
		  headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
		  },
		  responseType: 'arraybuffer'
	 })
	 	  
	
	 if(res.status == '200') {
		 RES_STR = iconv.decode(res.data, 'euc-kr').toString()
	 } else {
		 //network error logic
		 RES_STR = 'RETURNCODE=-1'
	 } 
	 
	 if (Debug){		 		
	 //console.log(jschardet.detect(res.data));
		console.log('REQ => ' + REQ_STR)
		console.log('RES => ' + RES_STR)
	}
	
	return str2data(RES_STR)
}

data2str = function( data ) {
    let str = ""
    data.forEach((val, key, mapObject) => str+=(key+'='+urlencode(val)+'&'))
    return str.slice(0,-1)
}
exports.data2str = data2str

str2data = function( str ){
    const myMap = new Map()
    let query = str.split('&')
    for (elem of query) {
        let pair = elem.split('=')
        myMap.set(pair[0], pair[1])
    }
    return myMap
}
exports.str2data = str2data