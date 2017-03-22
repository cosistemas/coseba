//FUNCIONES JAVASCRIPT

//seguridad:
//si no tiene cookie de tipo usuario se manda a página acceso denegado
tipo=getCookie("ApTipoUsu");
if (!tipo>=1 && pagUrl.indexOf("boton=acc.inicio")==-1)
	window.top.location.href="NoAcceso.php";

function getCookie(NameOfCookie)
{
	if (document.cookie.length > 0) 
	{ 

		begin = document.cookie.indexOf(NameOfCookie+"="); 
		if (begin != -1) 
		{ 
		begin += NameOfCookie.length+1; 
		end = document.cookie.indexOf(";", begin);
		if (end == -1) end = document.cookie.length;
		return unescape(document.cookie.substring(begin, end)); 
		} 
	}
}

function setCookie(NameOfCookie, value, expiredays) 
{
	var ExpireDate = new Date ();
	ExpireDate.setTime(ExpireDate.getTime() + (expiredays * 24 * 3600 * 1000));

	document.cookie = NameOfCookie + "=" + escape(value) + 
	((expiredays == null) ? "" : "; expires=" + ExpireDate.toGMTString());
}

function formatNumCadena(num)
{
	//redondea y devuelve un número siempre en formato cadena con dos decimales
	num=formatNum(num);
	num=num.toString();
 	posDecimal=num.indexOf('.');
	if (posDecimal==-1)
	num+='.00';
	else if (posDecimal==num.length-2)
	num+='0';				  
		
	return num	

}

function letraNif(obj)
//valida los nifs
{  
	obj.value=obj.value.toUpperCase();

	var dni=obj.value;

	if (dni=='')
		return;
	while (strpos(dni,".")>=0)	
		dni=dni.replace('.','');
	while (strpos(dni," ")>=0)	
	  dni=dni.replace(' ','');
	while (strpos(dni,"-")>=0)	
	  dni=dni.replace('-','');		
	var iniDni=dni.substr(0,1);
	var finDni=dni.substr(dni.length-1,dni.length);		
	if (!esNumero(finDni))
		dni = dni.substr(0,dni.length-1);
	dni = dni.toUpperCase();			
	if (esNumero(iniDni))	//si empieza es un NIF 
	{	
		if (!/^\d{8}$/.test(dni)) 
		{
			alert("NIF incorrecto o no reconocido en España");
			return false;
		}
		else	
		{
			var letras = "TRWAGMYFPDXBNJZSQVHLCKE";
			var numero = dni%23;
			var letra = letras.substring(numero,numero+1);
			obj.value=dni+letra;		
			if ((finDni!=letra)&&(!esNumero(finDni)))				
				alert("Se corrigió la letra del NIF que resultaba incorrecta según especificaciones españolas");
			
			return true;
		}
	}		
	else if(dni.substr(0,1)=="X")
	{
			return letraNIE(obj);
	}
	else
	{
			//return letraCIF(obj);
			// No validamos CIF para poder permitir la entrada de CIFs de otros paises
			return true;
	}
		//obj.value=dni;			
}

function esNumero(num)
{
	if (num.substr(0,1)=='.')
		return false;

	if (isNaN(num))
		return false;
	else
		return true; 
}
  
 //para validad cajas de texto numéricas (el punto decimal es el '.' la coma no vale)
 //ej. return onChangeSoloNum(this);
function onChangeSoloNum(obj)
{
    var valor=obj.value;
    if (!esNumero(valor))
    {
	    alert('Cantidad o número incorrecto');
	    obj.value='';
	    return false;
    }
    else
	    return true;
}

//lo mismo que onchangesolonum pero todo siempre con formato 2 decimales
function onChangeSoloNum2dec(obj)
{
	obj.value = obj.value.replace (",",".");
	
	onChangeSoloNum(obj);	
	
	obj.value=formatNum2dec(obj.value);
	
}
	
function letraNIE(elNIE)  
{ 
    //los nie los damos por válidos directamente
    return true;
    //
  
	var nie = elNIE.value.substr(1,elNIE.value.length);
		
  	var nies = nie.substr(0,1);
  	
	if (nies=='')
		return;
	while (strpos(nie,".")>=0)	
		nie=nie.replace('.','');
	while (strpos(nie," ")>=0)	
	  nie=nie.replace(' ','');
	while (strpos(nie,"-")>=0)	
	  nie=nie.replace('-','');		
  	var ininie=nie.substr(0,1);
  	var finnie=nie.substr(nie.length-1,nie.length);		
  	if (!esNumero(finnie))
			nie = nie.substr(0,nie.length-1);
	nie = nie.toUpperCase();			
	if (esNumero(ininie))	//solo si empieza por número,los cifs no se tratan 
  	{	
    	if (!/^\d{8}$/.test(nie))
		{ 
    		alert("NIE incorrecto");
				return false;
		}
    	else	
    	{
    		var letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    		var numero = nie%23;
    		var letra = letras.substring(numero,numero+1);
    		elNIE.value="X"+nie+letra;		
				if ((finnie!=letra)&&(!esNumero(finnie)))
					alert("Se corrigió la letra del NIE que resultaba incorrecta");
				
				return true;
    	}
  	}
}	
	
function abrirFormSel(formulario)
//abre un formulario de solo selección
{
    var nombreFormNuevo = '';
    
    if (formulario.indexOf("?")==-1)
        formulario += "?frmSel_sn=S";
    else
        formulario += "&frmSel_sn=S";
    
    //alert(formulario);
    window.open(formulario,nombreFormNuevo,"status=1,toolbar=0,scrollbars=1,resizable=1,width=550,height=450,left=100,top=100");
}

function abrirFormDim(formulario,nombreForm,ancho,alto)
//abre un formulario 
{		
	params="top=100,left=100,status=1,toolbar=0,scrollbars=1,resizable=1,width="+ancho+",height="+alto;		
	window.open(formulario,nombreForm,params);
}

function abrirForm(formulario,nombreForm,params)
//abre un formulario
{
	if(params==null || params=='')
		params="status=1,toolbar=0,scrollbars=1,resizable=1,width=1024,height=650";

	if (nombreForm == null)
		nombreForm = '';
	
	window.open(formulario,nombreForm,params);
}

function abrirFormExterno(formulario,nombreForm,params)
//abre un formulario 
{
	params=paramVentana("1");
	window.open(formulario,nombreForm,params);
}

//abre una pequeña ventana centrada para descargar un excel
function abrirFormExcel(url)
{		
	var anchoVentana=450;
	var altoVentana=300
	
	var nleft = (screen.width - anchoVentana) / 2;
	var ntop = (screen.height - altoVentana) / 2;
	var params = 'toolbar=0,location=0,statusbar=0,menubar=0,resizable=1,';
	params+='width='+anchoVentana+',height='+altoVentana+',left=' + nleft + ',top =' + ntop + ',scrollbars=1';
	
	window.open(url,'ventana',params);
}

function abrirFormInf(frmSubmit)
{
	//NO UTILIZAR ESTO PARA OTRA COSA QUE NO SEAN INFORMES PORQUE SI HACE HISTORY BACK ENTRA EN BUCLE
	//abre un formulario en blanco que una vez abierto lanza el submit de la ventana padre
	if (frmSubmit==null)
		frmSubmit=frm;
	
	/*frmSubmit.target="_blank";                           
	frmSubmit.submit();
	frmSubmit.target="";                           
	return;        */
	
	frmSubmit.target="ventana";                           
	params="status=1,toolbar=0,scrollbars=1,resizable=1";
	var wOpen=window.open("blancoSubmit.htm?nomFrm="+frmSubmit.name,"ventana",params);
	wOpen.focus();
	wOpen.moveTo( 0, 0 );
	wOpen.resizeTo( screen.availWidth, screen.availHeight );
	
	//setTimeout(function(){frm.submit();},100);  
}

function mayuscula(objeto)  
{
	objeto.value=objeto.value.toUpperCase();

}


function setPointer()
{
	if (document.all)
	for (var i=0;i < document.all.length; i++)
		document.all(i).style.cursor = 'wait';
}

function resetPointer()
{
	if (document.all)
	for (var i=0;i < document.all.length; i++)
		document.all(i).style.cursor = 'default';
} 

function alert2(title,mess,icon,defbut,mods)
{
  /*icon = (icon==0) ? 0 : 2;
  defbut = (defbut==0) ? 0 : 1;
  retVal = makeMsgBox(title,mess,icon,4,defbut,mods);
  retVal = (retVal==6);*/

	var retVal=0;
	if (confirm(mess))
		retVal=1;
	
	return retVal;
}

function alert3(cabecera,mensaje,valorDefecto,fecha_sn)
{   
	var myArguments = new Object();
	myArguments.cabecera = cabecera;
	myArguments.mensaje = mensaje;
	myArguments.valorDefecto = valorDefecto;
	myArguments.fecha_sn = fecha_sn;
	
	var ventana= window.showModalDialog("modal.htm",myArguments,'dialogHeight:130px;dialogWidth:380px;center:Yes; help:No;resizable:No;status:No;'); 
	
	//alert (ventana);
	return ventana;    
	
	//esto es como estaba:
	//retVal = makeInputBox(cabecera,mensaje,introDefecto);
	//return retVal;
}

function paramVentana(tipo)
{
  if (tipo=="1") //ventana pequeña solo para operaciones internas
	  return "toolbar=0,scrollbars=1,resizable=1,height=30,width=400,left=100,top=100";
//		  return "toolbar=0,scrollbars=1,resizable=1,height=30,width=400,left=2000,top=2000";
}

function formatNum(valor, nDecimales) 
{
	if (nDecimales==null)
  		nDecimales=2;

	var T = Number('1e'+nDecimales)
 	var resp= Math.round(valor*T)/T 

	return resp;
} 

  
function formatNum2(num,decimales,puntoDecimal)
//recibe un número y lo devuelve por defecto con dos decimales
{	
  num=num.toString();

  if (decimales==null)
  	decimales=2;
  if (puntoDecimal==null)
  	puntoDecimal=".";
	
  posDecimal=num.indexOf(puntoDecimal);

  var result=num;
  if (posDecimal!=-1)
	{
    result=posDecimal+decimales+1;
    result=num.substring(0,result);
	}
  
  result=new Number(result);
  return result;
}

//devuelve siempre el resultado con dos decimales, si cantidad erronea devuelve 0.00
function formatNum2dec(cantidad) 
{ 		
	var val = parseFloat(cantidad); 
	if (isNaN(val)) { return "0.00"; } 
	if (val <= 0) { return "0.00"; } 
	val += ""; 
	// Next two lines remove anything beyond 2 decimal places 
	if (val.indexOf('.') == -1) 
	{
		return val+".00"; 
	} 
	else 
	{ 
		val = Math.round(val*100)/100;
		val = val.toFixed(2);
		val = val.substring(0,val.indexOf('.')+3); 
	} 

	return val; 
} 
	
function redondeo(X, nDecimales)
{ 
	if (nDecimales==null)
		nDecimales=2;
	var T = Number('1e'+nDecimales)
  	return Math.round(X*T)/T 
}


function desCamposForm(objForm)
//deshabilita todos los campos del formulario recibido 
{
	for (var n=0;n<objForm.elements.length;n++)
	{
		if ( objForm.elements[n].type 
			&& (objForm.elements[n].type.toUpperCase()=='TEXTAREA'
				|| objForm.elements[n].type.toUpperCase()=='TEXT') )
		{
			objForm.elements[n].readOnly=true;
			objForm.elements[n].style.color='gray';	
		}
		else
			objForm.elements[n].disabled=true;
	}
}  

//prepara un formulario antes del submit
function quitaBlancosFrm(objForm)  
{
  for (var n=0;n<objForm.elements.length;n++)
  {
	  if (objForm.elements[n].type.toUpperCase()=='TEXT')		    
		  objForm.elements[n].value=trim(objForm.elements[n].value);
  }
}  

function lTrim(sStr)
{
   while (sStr.charAt(0) == " ") 
	  sStr = sStr.substr(1, sStr.length - 1);
   return sStr;
}
  
  // Removes leading whitespaces
function LTrim( value ) {
	
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
	
}

// Removes ending whitespaces
function RTrim( value ) {
	
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
	
}

// Removes leading and ending whitespaces
function trim( value ) {
	
	return LTrim(RTrim(value));
	
}

function desEnlaces(iniciales)
//deshabilita todos los enlaces cuyas tres primeras iniciales del name comiencen por
//el parámetro recibido 
{
	if (iniciales==null)
		iniciales="lnk"
	
	for (var n=0;n<document.links.length;n++)
	{      
		if (document.links[n].name.substring(0,3)==iniciales)
			{
		  document.links[n].href="#";
			document.links[n].style.textDecoration="none";
				  document.links[n].style.color="#000000";
				  document.links[n].style.cursor="default";        
		}                
	}
}  
  
function parseFloat2(num)
//recibe cadena numérica y devuelve número, cero si está vacia 
{
	var num=parseFloat(num)
  	if (isNaN(num))
  		num=0;
    
	return num;
}

//cuenta corriente ibam++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function limpiaCC(valor)
{
	while (strpos(valor," ")>=0)
		valor=valor.replace(" ","");
	while (strpos(valor,"-")>=0)	
		valor=valor.replace("-","");
	return valor.toUpperCase();
}

function calculoCC(Banco, Cuenta)
{
     Pesos= new Array(6,3,7,9,10,5,8,4,2,1);
     var result ="";
     var iTemp =0;
     for (var n=0;n<=7;n++)
	 {
     	iTemp  = iTemp + Banco.substr(7 - n, 1) * Pesos[n];
     }
     result = 11 - iTemp % 11;
     if (result > 9)
	 {
     	result=1-result % 10;
     }
     iTemp=0;
     for (var n=0;n<=9;n++)
	 {
        iTemp  = iTemp + Cuenta.substr(9 - n, 1) * Pesos[n];
     }
     iTemp =11 - (iTemp % 11);
     if (iTemp > 9)
	 {
     	iTemp =1-(iTemp % 10);
     }
     result=result*10+iTemp;
     return(result);
}

//puede ser cc o iban ej. onchange='verCC(this)'
function verCC(objeto)
{
	var cc=limpiaCC(objeto.value);

    if (cc=="")
		return;

	if (cc.length==20)
	{      
		var entOfi=cc.substring(0,8);
		var dc=cc.substring(8,10);
		var numCta=cc.substring(10,20);        
		var digitoCorrecto=calculoCC(entOfi,numCta);
				  
		if (digitoCorrecto!=dc)
			alert("Cuenta Corriente incorrecta, el Dígito de Control correcto sería el "+digitoCorrecto+", no obstante será convertida a código Iban.");  
			
		objeto.value=ccToIban(cc);
	}
	else if (cc.length==24)
	{
		//de momento si entra el iban completo nos fiamos y no comprobamos nada
		objeto.value=formatIban(cc);
		if (!verifyIban(cc))
			alert("Código Iban incorrecto");			
	}
	else
		alert("Cuenta corriente o código Iban incorrecto");
}	
	
function verifyIban(iban)
{
	var iban=limpiaCC(iban);
	//alert(iban.substring(4));
	//alert(iban);
	if(limpiaCC(ccToIban(iban.substring(4)))==iban)
		return true;
	else
		return false;	
}
	
//para onkeydown de los campos de cuenta corriente
function escribeCC(objeto)
{
    /*var tecla= window.event ? event.keyCode : objeto.wich;
  	var cuenta=objeto.value;
    var longCuenta=cuenta.length;
    if (longCuenta==4 && tecla!=46 && tecla!=8)
    {
    	//alert(objeto.value+"-");
		objeto.value+=" ";
    }   */
	
	//objeto.value=objeto.value.toUpperCase();	
}  

//recibe cuenta corriente y lo convierte a iban	
function ccToIban(cccc)
{	   
	cccc=limpiaCC(cccc);	
	
	if (cccc.length!=20)
		return "";	   
	   
	var codPais="ES";
   
   	//+++++++++++++
   
	var ccccc=cccc;//.replace(/[/-?:().,'+]/gi,'');
   	var let=ccccc+codPais+"00";
   	var cadenaletras="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   	ib="";
   	for (xx=0;xx<let.length;xx++)
	{
    	if(isNaN(let.substring(xx,xx+1)))
        {
        	ib+=10+cadenaletras.indexOf(let.substring(xx,xx+1));
        }
        else
        {
        	ib+=let.substring(xx,xx+1);
        } 
	}
   	var x=0;
   	var c=0;
   	var r=0;
   	var a;
   	var b;
   	d=ib;
   	s=97;
   	for(x=0;x<d.length;x++)
    {
    	a=d.substring(x,x+1)
       	di=""+r+a;
    	r=di%s;
    }
    ib=98-r  ;
    if (ib<10){ib="0"+ib};
    iba=codPais+ib+cccc;
    
	return formatIban(iba);
}	
	
function formatIban(iba)
{
	var niba="";
    for (x=0;x<iba.length;x++)
    {
		niba+=iba.substring(x,x+1);
		if (x==3 || x==7 || x==11 || x==13)
			niba+=" ";
	}
	return niba;
}
	
//onclick del botón iban que hay en todos los campos de cuenta corriente	
function pulsaBotonIban(idBotonCta)
{
	var cc=limpiaCC(document.getElementById(idBotonCta).value);
	if(cc.length==24)
	{
		if (!verifyIban(cc))
			alert("Código Iban incorrecto");
		else			
			alert("Código Iban correcto");
		//alert("Ya existen los 24 dígitos del código Iban");	
	}
	if(cc.length==20)
		document.getElementById(idBotonCta).value=ccToIban(cc);
	else if(cc.length<20)
		alert("Número de cuenta incorrecto, no es posible convertirlo a Iban");	
}
	
//fin cuenta corriente ibam++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	
function strpos(str, ch)
{
	for (var i = 0; i < str.length; i++)
		if (str.substring(i, i+1) == ch) return i;
			return -1;
}

//ej. onkeypress='return letraMayu(event)'
//sólo se puede aplicar a un elemento
function letraMayu(e)
{
	tecla = (document.all) ? e.keyCode : e.which;
  	if(tecla == 9 || tecla == 0) return true;
	if(tecla == 8) return true;
  	/*if(window.Event)
	{
    	var pst = e.currentTarget.selectionStart;
      	var string_start = e.currentTarget.value.substring(0,pst);
      	var string_end = e.currentTarget.value.substring(pst ,e.currentTarget.value.length);
      	e.currentTarget.value = string_start+ String.fromCharCode(tecla).toUpperCase()+ string_end;
      	e.currentTarget.selectionStart = pst + 1;
      	e.currentTarget.selectionEnd = pst + 1;
      	e.stopPropagation();
      	return false;
  	}
  	else */
	{
    	te = String.fromCharCode(tecla);
    	te = te.toUpperCase();
    	num = te.charCodeAt(0);
    	e.keyCode = num;
  	} 
}	
	
//ej. onkeypress='letraMayu()'
/*function letraMayu()
{
  if (document.all)
	{
    var c = event.keyCode;
    var C = String.fromCharCode(c).toUpperCase().charCodeAt(); 
    event.keyCode = C;
    return true;
  }
  else 
    return true;
}*/	

function verMatricula(obj)
{
  var resp=obj.value;

	for (i=0;i<resp.length;i++)
	  resp = resp.replace("-","");
	
	for (i=0;i<resp.length;i++)
	  resp = resp.replace(" ","");
		
	for (i=0;i<resp.length;i++)
	  resp = resp.replace(".","");

	obj.value=resp;
}

function existeObj(nomObj)
{
	//devuelve true si existe un elemento en la página con ese name ó id
	if (document.getElementById(nomObj) == null)
		return false;
	else
		return true;
}	

function tienePermiso(codPermiso)
{
	var cadPermisos=getCookie("PermisosUsu");
//	alert(cadPermisos);
	if (cadPermisos.charAt(codPermiso-1)==1)
		return true;
	else
		return false;
	
}

function quitaAcento(cadena)
{
    var resp= cadena;
    
	resp= resp.replace('á','a');
	resp= resp.replace('é','e');
	resp= resp.replace('í','i');
	resp= resp.replace('ó','o');
	resp= resp.replace('ú','u');

	resp= resp.replace('Á','A');
	resp= resp.replace('É','E');
	resp= resp.replace('Í','I');
	resp= resp.replace('Ó','O');
	resp= resp.replace('Ú','U');

    return resp;
}

function urlencode( text )
{
   var SAFECHARS = "0123456789" +
                   "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                   "abcdefghijklmnopqrstuvwxyz" +
                   "-_.!~*'()";
   var HEX = "0123456789ABCDEF";

   var plaintext = text;
   var encoded = "";
   for (var i = 0; i < plaintext.length; i++ ) {
      var ch = plaintext.charAt(i);
      if (ch == " ") {
         encoded += "+";
      } else if (SAFECHARS.indexOf(ch) != -1) {
         encoded += ch;
      } else {
         var charCode = ch.charCodeAt(0);
         encoded += "%";
         encoded += HEX.charAt((charCode >> 4) & 0xF);
         encoded += HEX.charAt(charCode & 0xF);
      }
   } // for

   return encoded;
}

//botón cerrar en toda la aplicación
function pulsaCerrar(pagInicio)
{    
    if (pagInicio==null)
        pagInicio='index.php?boton=ini.inicio';

    //si existe el menú vamos a inicio sino cerramos ventana
    if (document.getElementById("fraMenu"))	
        location.href=pagInicio;       
    else
        window.close();
}

function iframeResizeMe(obj)
{
    try 
	{
	    parent.document.body.style.cursor = 'default';     
	
		/*var oBody= obj.contentWindow.document.body;
		var oFrame	=	obj;
		
		oFrame.style.height = oBody.scrollHeight + (oBody.offsetHeight - oBody.clientHeight);*/

	    //var frame = document.getElementById(id);
	    var frame = obj;
	    var objToResize = (frame.style) ? frame.style : frame;
	    var innerDoc = (frame.contentDocument) ? frame.contentDocument : frame.contentWindow.document;		
	    //objToResize.width = (20 + frame.contentWindow.document.body.scrollWidth) + 'px';
	    //ojo el width no habilitarlo, si da problemas ponerlo manualmente al 100% o ancho fijo
		objToResize.height = (innerDoc.body.scrollHeight+10) +'px';
		//alert(objToResize.height);
	}
	
	catch(e)
	{		
		window.status =	"Error: " + e.number + "; " + e.description;
	}

}

//se llama en el body onload de Funciones::cabecera
function bodyOnLoadCabecera()
{
	txtDisabledToReadOnly();    
    //if (window.opener)
	if (window.opener && document.body.clientHeight>120)
    {
        //alert(document.body.clientHeight)
        this.focus();
    }    

    //evitamos falsos submits
	if( document.getElementsByName("frm")[0] && document.getElementsByName("frm")[0].enctype!="multipart/form-data")
		document.getElementsByName("frm")[0].onsubmit=returnFalse;
}

function returnFalse()
{
	return false;
}

function txtDisabledToReadOnly()
{
    //convierte cajas de texto deshabilitadas en readonly
    for (var j=0;j<document.all.length;j++)
    {
	    if ( document.all[j].type 
	        && (document.all[j].type.toUpperCase()=='TEXT'
	            || document.all[j].type.toUpperCase()=='TEXTAREA') )	            
	    {
            if (document.all[j].disabled)
            {
                document.all[j].disabled=false;
		        document.all[j].readOnly=true;				    
		    }
		    //los readOnly le ponemos la letra gris
		    if (document.all[j].readOnly)
		        document.all[j].style.color='gray';				    		    		    
		}
    }
}

//habilita o deshabilita una caja de texto
function txtDisableSN(objTxt, disableSN)
{
    if (disableSN)
    {
        objTxt.readOnly=true;
        objTxt.style.color='gray';				    		    		    
    }
    else
    {
        objTxt.readOnly=false;
        objTxt.style.color='black';				    		    		    
    }        
}

function maximizarVentana()
{
    window.moveTo(0,0);
    if (document.all)		
        top.window.resizeTo(screen.availWidth,screen.availHeight);    
    else if (document.layers||document.getElementById) 
    {
        if (top.window.outerHeight<screen.availHeight||top.window.outerWidth<screen.availWidth)
        {
            top.window.outerHeight = screen.availHeight;
            top.window.outerWidth = screen.availWidth;
        }
    }
}

function redimVentana(tipo,ancho,alto)
{
    if (tipo>0)
    {
        ancho=800;
        alto=600;
    }

    if (tipo==1) //ventana pequeña 
    {
        ancho=450;
        alto=300;
    }
    
    top.window.resizeTo(ancho+12,alto+28);
    top.window.moveTo((screen.width-ancho)/2,(screen.height-alto)/2); //centra la ventana. Eliminar si no se quiere centrar el popup
}

//al seleccionar el control seleccionar el texto
function onFocusSel(obj)
{
	obj.select();
}

//FUNCIONES DE FECHA+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function priDiaMesAnt()
{
	var hoy=new Date();	
	mesAct=hoy.getMonth()+1;	
	mesAnt= mesAct-1==0 ? 12 : mesAct-1;	
	anyoAct=hoy.getFullYear();
	anyoAnt= mesAnt==12 ? anyoAct-1 : anyoAct;	

	mesAnt= mesAnt<10 ? "0"+mesAnt : mesAnt;
	return "01-"+mesAnt+"-"+anyoAnt;
}

function ultDiaMesAnt()
{	
	return "31"+priDiaMesAnt().substr(2);
}

function addToDate(fecha, ndias)
{
    if (fecha=='')
        return '';
       
    //el mes se trabaja en base 0 por eso le restamos 1
	var fecha = new Date(separaFecha(fecha,'A'), parseInt(separaFecha(fecha,'M'))-1, separaFecha(fecha,'D'));
	fecha.setDate(fecha.getDate()+parseInt(ndias));
 
	var anio=fecha.getFullYear();
	var mes= fecha.getMonth()+1;
	var dia= fecha.getDate();
 
	if(mes.toString().length<2)
		mes="0".concat(mes);        
 
	if(dia.toString().length<2)
    	dia="0".concat(dia);        
    
    return dia+"-"+mes+"-"+anio;
}

//devuelve fecha actual en formato DMA
function fechaHoyDMA()
{
	var hoy=new Date();

	var dia='0'+hoy.getDate();
	dia = dia.substr( dia.length-2 );
	
	var mes=  '0'+(hoy.getMonth()+1);
	mes = mes.substr( mes.length-2 );

	var ano=hoy.getFullYear()

	var hoyDMA=dia+'-'+mes+'-'+ano;		

	return hoyDMA;
}

//devuelve true si la fecha proporcionada formato DMA es mayor que la fecha actual
function esFechaMayorHoy(fechaDMA)
{
    if (restaFechas(fechaHoyDMA(),fechaDMA) <0)
        return true;
    else
        return false;
}
        
function separaFecha(fecha,DMA)
//recibe una fecha y lo que se quiere devolver: dia mes o año de la misma
//DMA puede ser D, M  o  A
{
  if (fecha.length==8) //si es formato sin espacios
  {
	  var dia=fecha.substring(0,2);
		var mes=fecha.substring(2,4);
		var ano=fecha.substring(4,8);  
  }
	else
	{
	  var dia=fecha.substring(0,2);
		var mes=fecha.substring(3,5);
		var ano=fecha.substring(6,10);  
  }
      
  if (DMA=="D")  	
	  return dia;
  else if (DMA=="M")
	  return mes;  
  else if (DMA=="A")   
    return ano;
}

function anyoBisiesto(anyo)
{
    /**
    * si el año introducido es de dos cifras lo pasamos al periodo de 1900. Ejemplo: 25 > 1925
    */
    if (anyo < 100)
        var fin = anyo + 1900;
    else
        var fin = anyo ;

    /*
    * primera condicion: si el resto de dividir el año entre 4 no es cero > el año no es bisiesto
    * es decir, obtenemos año modulo 4, teniendo que cumplirse anyo mod(4)=0 para bisiesto
    */
    if (fin % 4 != 0)
        return false;
    else
    {
        if (fin % 100 == 0)
        {
            /**
            * si el año es divisible por 4 y por 100 y divisible por 400 > es bisiesto
            */
            if (fin % 400 == 0)
            {
                return true;
            }
            /**
            * si es divisible por 4 y por 100 pero no lo es por 400 > no es bisiesto
            */
            else
            {
                return false;
            }
        }
        /**
        * si es divisible por 4 y no es divisible por 100 > el año es bisiesto
        */
        else
        {
            return true;
        }
    }
}
    
function validarFecha(fecha)
{
   /**
   * obtenemos la fecha introducida y la separamos en dia, mes y año
   */
   
   /*
   a=fecha;
   dia=a.split("/")[0];
   mes=a.split("/")[1];
   anyo=a.split("/")[2];
   */

   //la fecha no debe contener mas de 10 caracteres
   if (fecha.length>10)
   	return false;
   
   var dia=separaFecha(fecha,"D");
   var mes=separaFecha(fecha,"M");
   var anyo=separaFecha(fecha,"A");
   
   //comprobamos que no sea un número ninguno de los valores
   if ( (isNaN(dia))||(isNaN(mes))||(isNaN(anyo)) )        	
       return false
   
   //comprobamos si es año bisiesto
   if(anyoBisiesto(anyo))
       var febrero=29;
   else
       var febrero=28;
			
   /**
   * si el mes introducido es negativo, 0 o mayor que 12 > alertamos y detenemos ejecucion
   */
   if ((mes<1) || (mes>12))
   {
       //alert("El mes introducido no es valido. Por favor, introduzca un mes correcto");
       return false;
   }
   /**
   * si el mes introducido es febrero y el dia es mayor que el correspondiente 
   * al año introducido > alertamos y detenemos ejecucion
   */
   if ((mes==2) && ((dia<1) || (dia>febrero)))
   {
       //alert("El dia introducido no es valido. Por favor, introduzca un dia correcto");
       return false;         
   }
   /**
   * si el mes introducido es de 31 dias y el dia introducido es mayor de 31 > alertamos y detenemos ejecucion
   */
   if (((mes==1) || (mes==3) || (mes==5) || (mes==7) || (mes==8) || (mes==10) || (mes==12)) && ((dia<1) || (dia>31)))
   {
       //alert("El dia introducido no es valido. Por favor, introduzca un dia correcto");
       return false;
   }
   /**
   * si el mes introducido es de 30 dias y el dia introducido es mayor de 301 > alertamos y detenemos ejecucion
   */
   if (((mes==4) || (mes==6) || (mes==9) || (mes==11)) && ((dia<1) || (dia>30)))
   {
       //alert("El dia introducido no es valido. Por favor, introduzca un dia correcto");
       return false;
   }
   /**
   * si el mes año introducido es menor que 1900 o mayor que 2010 > alertamos y detenemos ejecucion
   * NOTA: estos valores son a eleccion vuestra, y no constituyen por si solos fecha erronea
   */
   if ((anyo<1900) || (anyo>2999))
   {
       //alert("El año introducido no es valido. Por favor, introduzca un año entre 1900 y 2010");
       return false;           
   } 
   /**
   * en caso de que todo sea correcto > enviamos los datos del formulario
   * para ello debeis descomentar la ultima sentencia
   */

    return true;
}    

function restaFechas(fechaFin,fechaIni,diaAno)
{
    //definimos fechaFin
    var dia=separaFecha(fechaFin,"D");
    var mes=separaFecha(fechaFin,"M");
    var anyo=separaFecha(fechaFin,"A");
		fechaFin = new Date(anyo,mes-1,dia);    
    //fecha inicio
    dia=separaFecha(fechaIni,"D");
    mes=separaFecha(fechaIni,"M");
    anyo=separaFecha(fechaIni,"A");
		fechaIni = new Date(anyo,mes-1,dia); 
		//

		var resta = fechaFin.getTime()-fechaIni.getTime();
     
  	var resultado = Math.floor(resta/(1000*60*60*24));
		
    //resultado en años
    if (diaAno=="A")
	    return Math.round(resultado/365);
    else
    //por defecto resultado en días
    	return resultado;  
    
}

function verFecha(objeto)
//el parametro normalmente es this
//esta pensada para el evento onblur, si la fecha no esta vacia y es correcta formatea la fecha 
//colocándole los separadores correctos, sino da mensaje de error y borra la fecha y posicionando el foco de nuevo
{
    var fecha=objeto.value;

    if (fecha!='')
	{
        if (validarFecha(fecha))    
	    {
            var dia=separaFecha(fecha,'D');
            var mes=separaFecha(fecha,'M');
	        var ano=separaFecha(fecha,'A');
	        objeto.value = dia + '-' + mes + '-' + ano;
	        return true;
		}
        else
        {
  	        alert('Fecha incorrecta');
            objeto.value='';
            objeto.focus();
			return false;
        }          
    }
} 

function verDiaSemana(fechaDMA) 
{
	var day=separaFecha(fechaDMA,'D');
	var month=separaFecha(fechaDMA,'M');
	var year=separaFecha(fechaDMA,'A');

	month=month-1; //el mes es en base cero
//alert(year +', '+month + ',  '+day);
//month='december';

	var oyear=year;

	//var dob = ' '+ year +', '+month + ',  '+day;
	//var thenx = new Date(dob);
	var thenx = new Date(year, month, day);
	//var thenx = new Date(year, month, day);
	//alert(thenx.getYear());
	//alert(thenx.getMonth());
	//alert(thenx.getDate());

	var year=thenx.getYear();
	if (year<100) 
		year='19' + thenx.getYear();
	else 
		year=thenx.getYear();

	if (year > 1969) 
		wyear=year;
	else 
	{
		if (oyear<1900) 
		{
			if (oyear>1800) 
			{
				wrelyear= (eval(oyear)-1801)%(28);
				wyear = wrelyear+1981;
			}
			else 
				wyear = 1970 
		}
		else
			if (oyear>1900) 
			{
				wrelyear= (eval(oyear)-1901)%(28); 
				wyear= wrelyear+1985
			}
	else 
		if (oyear==1900) 
		{
			wyear= 1990;
		}              
	}
	//var dob = ' '+ wyear +', '+month + ',  '+day;
	//var thenx = new Date(dob);
	var thenx = new Date(wyear, month, day);

	var theday = thenx.getDay()+1;
	var date=thenx.getDate();

	var weekday = new Array(6);
	weekday[1]='Domingo';
	weekday[2]='Lunes';
	weekday[3]='Martes';
	weekday[4]='Miércoles';
	weekday[5]='Jueves';
	weekday[6]='Viernes';
	weekday[7]='Sábado';
	if (day != date) 
		//alert('Sorry!  That appears to be an invalid date!'+day+' ...'+date+'::'+oyear+'...'+year+' '+dob+'=='+wyear+'.-.-'+thenx+' '+day+' '+month);
		return '';
	else 
	{
		dayborn = weekday[theday];
		dob = dayborn;
		//alert('Tu naciste un ' + dob);
		return dob;
	}
}

//FIN FUNCIONES DE FECHA+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function cambiaCp(idCampoCp, idCampoPobla, idCampoProvin, idCapaSel)
{
	var url= "index.php?boton=comun.cambiaCp&cp="+document.getElementById(idCampoCp).value;
	url+="&idCampoCp="+idCampoCp+"&idCampoPobla="+idCampoPobla+"&idCampoProvin="+idCampoProvin+"&idCapaSel="+idCapaSel;
//	abrirForm(url);return;
	jQuery.ajax({url:url, type:"post", dataType:"json"}).done(function(resp)  
	{   		
		document.getElementById(idCampoPobla).value=resp["pobla"];
		document.getElementById(idCampoProvin).value=resp["provin"];
		document.getElementById(idCapaSel).innerHTML=resp["htmlSelCp"];
		if (resp["htmlSelCp"]!="")
			document.getElementById(idCapaSel).parentNode.parentNode.style.display='table-row';		
	});     
}

function cambiaCpSel(idCampoCp, idCampoPobla, idCampoProvin, idCapaSel, cpSel, poblaSel, provinSel)
{
	document.getElementById(idCampoCp).value=cpSel;
	document.getElementById(idCampoPobla).value=poblaSel;
	document.getElementById(idCampoProvin).value=provinSel;	
	document.getElementById(idCapaSel).innerHTML="";
	document.getElementById(idCapaSel).parentNode.parentNode.style.display='none';
}

function cambiaCia(idCampoCodCia, idCampoNomCia)
{
	var url= "index.php?boton=comun.cambiaCia&codCia="+document.getElementById(idCampoCodCia).value;
	url+="&idCampoNomCia="+idCampoNomCia;
	//abrirForm(url);return;
	jQuery.ajax({url:url, type:"post", dataType:"json"}).done(function(resp)  
	{   		
		document.getElementById(idCampoNomCia).value=resp["nomCia"];
	});     
}

function onClickCell0(objTd)
{
	objTd.parentNode.cells[0].onclick()
}

//ej. onkeypress="escribeHora(this)"
function escribeHora(objeto)
{
  	var hora=objeto.value;
    var largo=hora.length;
    if (largo==2)
      objeto.value+=":";
}  

function replaceAll( text, busca, reemplaza )
{ 
	while (text.toString().indexOf(busca) != -1) 
		text = text.toString().replace(busca,reemplaza); 
	return text; 
} 

//si tenemos el nombre del archivo en un campo de texto en un formulario:
//abrirArchivo(dirDocs, idCampoNomFile)
//si queremos abrir un archivo directamente 
//abrirArchivo(dirDocs, '', nomArchivo)
function abrirArchivo(dirDocs, idCampoNomFile, nomArchivo)
{
	if (idCampoNomFile!='')
		nomArchivo=document.getElementById(idCampoNomFile).value;
			
	if (nomArchivo=='')
		return;

  //window.open('03docs.php?boton=verFichero&archivo='+obj,'','location=no,top=0,left=0,height=600,width=500,resizable=1');
	var dirDocsBase= getCookie("areaMagSN")==1 ? "docsMagnia/":"docs/";
	var archivo = "./"+dirDocsBase+dirDocs+"/" + nomArchivo;
	//alert(getCookie("areaMagSN"));
	location.href="recibir.php?U="+archivo;
}

function agregarArchivo(dirDocs,idCampoNomFile,ordenJsPosterior,idCampoDescripFile)
{	
	//por si se quiere ejecutar una orden después de subir el fichero
	if (ordenJsPosterior==null)
		ordenJsPosterior="";

	//por si se quiere recoger un campo descripción del fichero 
	if (idCampoDescripFile==null)
		idCampoDescripFile="";

	if(document.getElementById(idCampoNomFile).value!="")
	{
		alert("Ya existe un documento, deberá eliminarlo si quiere volver a agregar otro");
		return;
	}

	var url= "index.php?boton=comun.fichaSubirFichero&dirDocs="+dirDocs+"&idCampoNomFile="+idCampoNomFile;
	url+='&ordenJsPosterior='+ordenJsPosterior;
	url+='&idCampoDescripFile='+idCampoDescripFile;
	abrirFormDim(url,"",450,150);
}

function eliminarArchivo(dirDocs,idCampoNomFile)
{	
	if(document.getElementById(idCampoNomFile).value=="")
	{
		alert("No existe documento para eliminar");
		return;
	}

	if (!confirm("¿Está seguro de eliminar el documento?"))
		return;

	var url= "index.php?boton=comun.eliminarFichero&dirDocs="+dirDocs+"&nomFile="+document.getElementById(idCampoNomFile).value;
	//abrirForm(url);return;
	jQuery.ajax({url:url, type:"post"}).done(function(resp)  
	{   		
		document.getElementById(idCampoNomFile).value="";
		alert("El documento ha sido eliminado, debe grabar la ficha para completar la acción");
	});  
}

function pinchaCab(idCab)
{
	var objCab=document.getElementById(idCab);
	if (objCab.style.display=='none')
		objCab.style.display='';
	else
		objCab.style.display='none';	
}

function iniProcesa()
{
	if(document.getElementById("popupProcesa").style.display=="block")
		return false;		
	else
	{	
		//alert($(window).scrollTop());
		document.getElementById("popupProcesa").style.top=$(window).scrollTop()+300+"px";
		document.getElementById("popupProcesa").style.display="block";
		return true;
	}
}
function finProcesa()
{
	document.getElementById("popupProcesa").style.display="none";
}

//muestra mensaje informativo en una capa
function msgCapa(msg)
{
	document.getElementById("popupMsg").style.top=$(window).scrollTop()+300+"px";
	document.getElementById("popupMsg").style.display="block";
	document.getElementById("tdMsg").innerHTML=msg;
}

function cierraMsgCapa()
{
	document.getElementById("popupMsg").style.display="none";
}

function buscarEnTabla(idTabla, cadBusca)
{
	var tableReg = document.getElementById(idTabla);
	var searchText = cadBusca.toLowerCase();
	var cellsOfRow="";
	var found=false;
	var compareWith="";
	
	// Recorremos todas las filas con contenido de la tabla
	for (var i = 1; i < tableReg.rows.length; i++)
	{
		cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
		found = false;
		// Recorremos todas las celdas
		for (var j = 0; j < cellsOfRow.length && !found; j++)
		{
			compareWith = cellsOfRow[j].innerHTML.toLowerCase();
			// Buscamos el texto en el contenido de la celda
			if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1))
			{
				found = true;
			}
		}
		if(found)
		{
			tableReg.rows[i].style.display = '';
		} else {
			// si no ha encontrado ninguna coincidencia, esconde la
			// fila de la tabla
			tableReg.rows[i].style.display = 'none';
		}
	}
}

function marcarTodos(marcar_sn, $prefijoCampoCheck)
{
	if ($prefijoCampoCheck==null)
		$prefijoCampoCheck="chkSEL";
	
	//marcarmos o desmarcamos según esté el primer elemento que encontremos
	var marcar_sn;
	if (marcar_sn==1)
		marcar_sn=true;
	else
		marcar_sn=false;

	for (var n=0;n<frm.elements.length;n++)
   	if(frm.elements[n].type=='checkbox')
	{
		if (frm.elements[n].name.substring(0,$prefijoCampoCheck.length)==$prefijoCampoCheck)
			frm.elements[n].checked=marcar_sn;
	}
}

function onClickLogo()
{
	//location.href="index.php?boton=ini.inicio";
	window.history.back();
	
}