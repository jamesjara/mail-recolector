// vim: sw=4:ts=4:nu:nospell:fdc=4
/**
* js script of mailing script
*
* @author Ing. James Jara
* @copyright (c) 2011-2012, by Ing. James Jara
* @date 03. Julio 2012
* @version $Id: sc.js  2011-07-03 05:12:14Z james $
*
* @license sc.js is licensed under the terms of the Open Source
* LGPL 3.0 license. Commercial use is permitted to the extent that the
* code/component(s) do NOT become part of another Open Source or Commercially
* licensed development library or toolkit without explicit permission.
*
* License details: http://www.gnu.org/licenses/lgpl.html
*/


/*
================hOW TO USE:   :ALWAYS AT THE END OF THE PAGE, JUST BEFORE BODY
<script type="text/javascript" src="http://jqueryjs.googlecode.com/files/jquery-1.3.2.js"></script>
<script type="text/javascript" src="http://plugins.jquery.com/files/jquery.cookie.js.txt"></script>
<script type="text/javascript" src="http://plugins.jquery.com/files/jquery.floatobject-1.4.js.txt"></script>
<script type="text/javascript" src="http://amirharel.com/labs/fo/jquery.floatobject-1.0.js"></script>
<script type="text/javascript" src="sc.js"></script>
<script type="text/javascript">MJJ.setTipo("banner");MJJ.run();</script>
================EASY STUFF
*/


//CLASE OBJETO
function mailer_jamesjara() {
	var self = this;
	//PROPIEDADES
	this.id = null;
	this.titulo = null;
	this.boton = null;
	this.contenido = null;
	this.contenido2 =null;
	this.tipo = null;
	this.ws = null;
	this.width = null;
	this.position = null;
	var formulario = document.createElement("form");
	var markupdiv = null;
				
	//METODOS
	this.setId  = function (_id){
		self.id = _id;
	}
	this.setTitulo  = function (_titulo){
		self.titulo = _titulo;
	}
	this.setButton  = function (_boton){
		self.boton = _boton;
	}
	this.setContenido1  = function (_contenido){
		self.contenido = _contenido;
	}
	this.setContenido2  = function (_contenido2){
		self.contenido2 = _contenido2;
	}
	this.setTipo  = function (_tipo){
		self.tipo = _tipo;
	}
	this.setWS  = function (_ws){
		self.ws = _ws;
	}
	this.setWidth  = function (_width){
		self.width = _width;
	}
	
	this.setFloatPosicion  = function (_position){
		self.position = _position;
	}
	
	//FUNCIONES
	this.formato = function (_tipo){		
			var br = "";	
			var _position = self.position;
			var _close = '<a id="ocultarsiempre" style="color: white;" href="#">(Never show)</a>';
			
			if (_position!=null){
				switch (_position){
					case "top":	
					_position = "top: 0;"
					break;				
					case "bottom":
					_position = "bottom: 0;"
					break;	
				}
			} else { _position = ""; } 
			
			if (_tipo.toLowerCase()=="banner"){
				br="";
				$(document).ready(function(){
					$("#jamesjaradiv").makeFloat({x:20,y:200,speed:"fast"});
				});	
			}else if(_tipo.toLowerCase()=="widget"){
				br = "<br>"; _position = ""; _close ="";
			}else if(_tipo.toLowerCase()=="popup"){
				$(document).ready(function(){
						var windowWidth = document.documentElement.clientWidth;  
						var windowHeight = document.documentElement.clientHeight;  
						var popupHeight = $("#jamesjaradiv").height();  
						var popupWidth = $("#jamesjaradiv").width();  
						$("#jamesjaradiv").css({  
						"position": "absolute"
						,"width":"100%"
						,"height":"100%"
						,"left":"0"
						,"background":"#000000"
						,"opacity": "0.9" 
						}); 
						$("#jamesjaradiv2").css({  
						"margin-top": windowHeight/2-popupHeight/2
						,"margin-left": windowWidth/2-popupWidth/2
						,"opacity": "100" 
						}); 					
						$("#jamesjaradiv").fadeIn("slow");  
						$("#jamesjaradiv2").fadeIn("slow"); 
				});	
			}
			markupdiv = new String(''+
			  '<div id="jamesjaradiv" style="'+_position+';width:'+self.width+'px;">'
			  +'<div id="jamesjaradiv2" style="width:'+self.width+'px;background-image: url(http://www.tamingthebeast.net/images/ttb-pop.gif); background-repeat: no-repeat; background-color: #000000; background-position: 0% 50%; text-align: center;">'	 
			  +'		<font face="Arial" style="font-size: 14px; color: #ffffff;">'
			  +'		<b>'+self.titulo+'</b>'
			  +'		</font>'
			  +'		<br>           '         
			  +'		<font size="2" face="arial">'
			  +'		<input type="text" maxlength="20" size="20" id="first" onfocus="this.value=\'\';" value="first name" name="first" style="font-size: 11px; color: #000000; background-color: #A4C4E0; border: 1px solid; border-color: #4378AC #4378AC #4378AC #4378AC;">  '+br
			  +'		<input type="text" maxlength="20" size="20" id="mail" onfocus="this.value=\'\';" value="email" name="mail" style="font-size: 11px; color: #000000; background-color: #A4C4E0; border: 1px solid; border-color: #4378AC #4378AC #4378AC #4378AC;">  '+br
			  +'		<input type="submit" id="formjamesjara" value="&nbsp; '+self.boton+' &nbsp;" style="font-size: 12px; color: #000000; background-color: #A4C4E0; border: 1px solid; border-color: #4378AC #4378AC #4378AC #4378AC;"> '		  
			  +'		<a id="ocultar" style="color: white;" href="#">Close</a><br> '  	 
			  +'		</font>'
			  +'		<font face="Arial" style="font-size: 12px; color: #ffffff;">'+self.contenido+'<br></font>'
			  +'		<font face="Arial" style="font-size: 10px; color: #ffffff;">'+self.contenido2+'.</font>	'
			  +'		<font face="Arial" style="font-size: 9px; color: #ffffff;">'+_close+'</font>	'
			  +'	</div></div>');
			return markupdiv;
		}
	this.markup = function (_tipo){
				var tipo = _tipo;
					if(!$.cookie('jamesjara')){
						formulario.innerHTML = self.formato(self.tipo);
						document.getElementById(self.id).appendChild(formulario);
						self.addHandler(_tipo);	
					} 
			}
	this.run = function (){			
				if(window.addEventListener){
						//all
						window.addEventListener('load', self.markup(1) ,false);
						}else{
						//ie
						window.attachEvent('onload', self.markup(2) );
				}
		    }			
	//EVENTOS 
	this.addHandler = function (_tipo){	
					if(_tipo==1){
							//all
							document.getElementById("formjamesjara").addEventListener('click',function(e){
											  e.preventDefault();
											  self.submitform();
									},false);							
					}else{
							//ie
						   document.getElementById("formjamesjara").attachEvent('onclick',function(e){
                   						  e.returnValue = false;										  
										  self.submitform();
								});
					}
				}		
	this.submitform = function(){	
				var first = formulario.elements["first"].value;
				var email = formulario.elements["mail"].value;
				var bool_error = false;
				var error = "Hay un error, porfavor para que reciba actualizaciones automaticas, complete los datos correctamente.\n\n";
				if (first.length<=3){
					error += "\t El Nombre es Obligatorio. \n";
					bool_error = true;
				}
				if (email.length<=6){
					error += "\t El Correo es Obligatorio. \n";
					bool_error = true;
				}
				if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
					error += "\t El Correo es incorrecto. \n";
					bool_error = true;
				}
				if (bool_error==false) { 
							$(document).ready(function(){
									$.post( self.ws , { 1: first , 2:  email, 3:  window.location.hostname  },
									  function(data){
										   alert("Guardado Correctamente!");
										   $("#jamesjaradiv").hide("slow");	
										   //$.cookie('jamesjara','hide', { expires: 7 });									   
									  });
							}) 
					}else{
					alert(error);
				}			   
		}		
	//MORE
	$(document).ready(function(){
		$("#ocultar").click(function(){
			$("#jamesjaradiv").hide("slow");
		});
	});
	$(document).ready(function(){
		$("#ocultarsiempre").click(function(){
			$("#jamesjaradiv").hide("slow");
			$.cookie('jamesjara','hide', { expires: 4 });
		});
	});
};


var MJJ ;

MJJ = new mailer_jamesjara()
MJJ.setId			( "lokero" );
MJJ.setTitulo 		( "No se pierda las actualizaciones - GRATIS!");
MJJ.setContenido1 	( "Cuando te subscribes, tambien recibes gratis un pack de cortesia!");			
MJJ.setContenido2 	( "Nosotros odiamos el spam y nunca jamas venderemos tu email.");			
MJJ.setButton		( "Subscribir");
MJJ.setTipo			( "banner");
MJJ.setWS			( "http://playground.com/recolector_mails/backend.php");
MJJ.setFloatPosicion( "bottom");		
MJJ.setWidth 		( 600) ;	

