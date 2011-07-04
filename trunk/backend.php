<?
// vim: sw=4:ts=4:nu:nospell:fdc=4
/**
* ws script of mailing script
*
* @author Ing. James Jara
* @copyright (c) 2011-2012, by Ing. James Jara
* @date 03. Julio 2012
* @version $Id: backend.php  2011-07-03 09:53:42Z james $
*
* @license backend.php is licensed under the terms of the Open Source
* LGPL 3.0 license. Commercial use is permitted to the extent that the
* code/component(s) do NOT become part of another Open Source or Commercially
* licensed development library or toolkit without explicit permission.
*
* License details: http://www.gnu.org/licenses/lgpl.html
*/
 

/*
DATABASE:
id,
nombre,
mail,
ip,
hora,
Host: extracto del host proveniente para filtro  dinamico
real_url: url real completa


La respuesta no estan en formato estandar ni en JSON ni en XML. puede ser adaptada facilmente

Para ver los datos, necesitas SQL LITE MANANGER
*/


//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////IMPORTANTE: CAMBIAR EL NOMBRE DEL ARCHIVO DE LA BASE DE DATOS //
//////////////////////////////////////////////////////////////////////////////////////////
$DB_URI = "mass_mailingsqlite";
$db = sqlite_open($DB_URI) or die("No puedo abrir la base de datos");
if (sqlite_query($db,'SELECT * FROM correos') === false){
	if(!sqlite_query($db,'CREATE TABLE correos (id INTEGER AUTOINCREMENT , nombre VARCHAR(250), mail VARCHAR(250), ip VARCHAR(250), hora VARCHAR(250), host VARCHAR(250), real_url VARCHAR(250), host_client VARCHAR(250) )')){
		die("error");
	}
}


//FUNCIONES
function getRealIpAddr() {  
       if (!empty($_SERVER['HTTP_CLIENT_IP'])) {  
              $ip=$_SERVER['HTTP_CLIENT_IP'];  
       } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {  
              $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];  
       }else{  
              $ip=$_SERVER['REMOTE_ADDR'];  
       }  
return $ip;  
}  
if (!function_exists("GetSQLValue")) {
function GetSQLValue($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
{
  if (PHP_VERSION < 6) {
    $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
  }
  switch ($theType) {
    case "puretext":
      $theValue = ($theValue != "") ? "'" . @ereg_replace("[^A-Za-z0-9-]", "", $theValue). "'" : "NULL";
    break;    
    case "text":
      $theValue = ($theValue != "") ? "'".sqlite_escape_string($theValue). "'" : "NULL";
    break;    
    case "int":
    case "ids":
      $theValue = ($theValue != "") ? intval($theValue) : 0;
      break;
    case "double":
      $theValue = ($theValue != "") ? doubleval($theValue) : "NULL";
      break;
    case "sql":
      $theValue = ($theValue != "") ? @ereg_replace("/[^a-z0-9 ]/i", "", $theValue) : "NULL";
      break;
    case "url": //a coder here,
      $theValue = ($theValue != "") ? "'".sqlite_escape_string($theValue). "'" : "NULL";
      break;
  } 
    return $theValue;   
}
}
function traerhost(){
	$scheme = extract(parse_url($_SERVER['HTTP_REFERER']));
	$referer = $scheme .'://'. str_replace('www.', null, $host);
	return $referer;
}
	
//VARIABLES:
$_IP = getRealIpAddr();
$_HORA = date("d-m-Y H:i:s");
$_HOST = traerhost();
$IP 		= isset($_IP)   					?  $_IP				 					:  NULL;    
$HORA 		= isset($_HORA)   					?  $_HORA								:  NULL;    
$HOST 		= isset($_HOST )   					?  $_HOST 								:  NULL;    
$REAL_URL 	= isset($_SERVER['HTTP_REFERER'])   ?  $_SERVER['HTTP_REFERER'] 			:  NULL; //Cuidado,var de riesgo   



//WS METODO
function add_mail() {
		global $IP;	
		global $HORA;
		global $HOST;
		global $REAL_URL;
		global $REAL_URL;
		global $db;
		$continue = true;			
		$var1 = isset($_POST['1']) ? $_POST['1'] : $continue = false ;	//nombre	
		$var2 = isset($_POST['2']) ? $_POST['2'] : $continue = false ;	//mail
		$var3 = isset($_POST['3']) ? $_POST['3'] : $continue = false ;	//host client
		if ($continue!=true)return "ilegal."; else
		if ( sqlite_query($db,'insert into correos ("nombre","mail","ip","hora","host","real_url") values (
											 '.GetSQLValue($var1	,"text").',
											 '.GetSQLValue($var2	,"text").',
											 '.GetSQLValue($IP		,"text").',
											 '.GetSQLValue($HORA	,"text").',
											 '.GetSQLValue($HOST	,"text").',
											 '.GetSQLValue($REAL_URL,"url").'
											  )' )){
											  		return "ok";
												  }else{ 
													return "nook";
											   	  };	
}; 		

//*PROC
echo add_mail();
die();//remove to show temp data
//==================warning this is only for test..data is not clean,could be have XSS or something..
$result = sqlite_array_query($db, "SELECT * FROM correos", SQLITE_ASSOC);
$temp;
foreach ($result as $data){
	 $temp .= '<b>Nombre:</b> '.$data['nombre'].'   -    <b>E-mail:</b> '.$data['mail'].'     -     <b>Campana:</b> '.$data['real_url']."<br>";
}
echo "<h1>Results</h1><hr><pre>".$temp."</pre><br> copyright (c) 2011-2012, by Ing. James Jara";
die();

?>