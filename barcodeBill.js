/*
npm install urlencode
npm install axios
npm install iconv-lite
*/

const { CallTrans, data2str, ID, PWD, ORDERID } = require("./inc/function")

const TransR = new Map()

/***[ 필수 데이터 ]************************************
 하기 필드는 필수값으로 가맹점 환경에 맞게 세팅 
    * NUM_BARCODE  : 바코드 번호 
    * ID_MERCHANT	: 가맹점 ID (다날발급)
    * PW_MERCHANT	: 가맹점 PWD (다날발급)
    * AMT_PAY		: 결제 금액
    * CD_ITEM		: 상품코드 (다날발급) 
    * NM_ITEM		: 상품명
    * COMMAND		: PAY (고정값)
    ******************************************************/
TransR.set( "NUM_BARCODE",  "72019900554875871319");
TransR.set( "ID_MERCHANT",  ID)
TransR.set( "PW_MERCHANT", PWD)
TransR.set( "AMT_PAY", "100" )
TransR.set( "CD_ITEM", "2200000000" )
TransR.set( "NM_ITEM", "상품명" )
TransR.set( "COMMAND", "PAY" )
    

/***[ 선택 사항 ]**************************************
하기 필드는 옵션값으로 가맹점에서 필요한 부분을 세팅 
    * SID_MERCHANT		: 지점 가맹점번호 
    * ID_ORDER			: 가맹점 거래번호
    * MSG_RESERVED_1	: 가맹점 사용 필드 (해당 필드값을 세팅하여 전문 요청시 응답으로 그대로 전달)
    * MSG_RESERVED_2	: 가맹점 사용 필드 (해당 필드값을 세팅하여 전문 요청시 응답으로 그대로 전달)
    ******************************************************/
TransR.set( "SID_MERCHANT", "" )
TransR.set( "ID_ORDER", ORDERID )
TransR.set( "MSG_RESERVED_1", "by pass value 1" )
TransR.set( "MSG_RESERVED_2", "by pass value 2" )

CallTrans( TransR )
	.then(res => {			
		if(res.get("RETURNCODE") == "0000")
		{
			console.log('success logic')	
		}
		else
		{
			console.log('fail logic')	
		}		
	})
