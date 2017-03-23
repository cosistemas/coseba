function jsOnclickLogoCos()
{
	alert("prueba 4.2");
		//openInWebView("https://google.es");	
//navigator.app.loadUrl('https://google.com/', { openExternal:true });
	//window.open("http://www.coseba.com","_system");
		
//alert("vamos a la web corporativa");	
location.href="http://www.coseba.com";	
}
function openInWebView(url)    
{
	var anchor = document.createElement('a');
	anchor.setAttribute('href', url);
	//anchor.setAttribute('target', '_self');
	var dispatch = document.createEvent('HTMLEvents');
	dispatch.initEvent('click', true, true);
	anchor.dispatchEvent(dispatch);    
}

function jsOnclickLogoPrem()
{
	window.open("app/view/doc/premier.pdf");
}

function jsMisSeguros()
{		
	alert("ha pulsado mi seguros");
	//location.href="index.php?boton=misSeguros";
}

function jsSiniestros()
{
	alert("ha pulsado siniestros");
	//location.href="index.php?boton=siniestros";
}

function jsOficinas()
{
	location.href="index.php?boton=oficinas";
}

function jsTelfAsis()
{
	location.href="index.php?boton=telfAsis";
}

function jsCalendario()
{
	location.href="index.php?boton=calendario";
}

function jsPromociones()
{
	location.href="index.php?boton=promociones";
}

function jsCerrarSesion()
{
	setCookie("ApUsuUsu","","")
	setCookie("ApTipoUsu","","")	
	
	location.href="index.php?boton=acc.inicio";
}
