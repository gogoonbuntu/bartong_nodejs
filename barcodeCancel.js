/*
npm install urlencode
npm install axios
npm install iconv-lite
*/

const { CallTrans, data2str, ID, PWD, ORDERID } = require("./inc/function")

let TransR = new Map();

/***[ 필수 데이터 ]************************************
 하기 필드는 필수값으로 가맹점 환경에 맞게 세팅	 
    * ID_MERCHANT	: 가맹점 ID (다날발급)
    * PW_MERCHANT	: 가맹점 PWD (다날발급)
    * TID			: 거래 키 값 (PAY전문 성공 시 응답)	 
    * COMMAND		: PAY_CANCEL (고정값)
    ******************************************************/

TransR.set( "ID_MERCHANT", ID );
TransR.set( "PW_MERCHANT", PWD );	
TransR.set( "TID", "xxxxxxxxxxxxxxxxxxxxxxxx" );	
TransR.set( "COMMAND", "PAY_CANCEL" );
    

/***[ 선택 사항 ]**************************************
하기 필드는 옵션값으로 가맹점에서 필요한 부분을 세팅	  
    * ID_ORDER			: 가맹점 거래번호	 
    ******************************************************/

TransR.set( "ID_ORDER", ORDERID );

let Res = CallTrans( TransR );

if( true )
{
    console.log( "REQ[" + data2str(TransR) + "]<BR>" );
    console.log( "RES[" + data2str(Res) + "]<BR>" );
    //return;
}

if( Res.get("RETURNCODE") === "0000" ) {
    /**************************************************************************
     *
     * 결제 성공에 대한 작업
     *
     **************************************************************************/
    
    
} else {
    /**************************************************************************
     *
     * 결제 실패에 대한 작업
     *
     **************************************************************************/

}