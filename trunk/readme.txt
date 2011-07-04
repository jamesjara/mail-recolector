// vim: sw=4:ts=4:nu:nospell:fdc=4
/**
* all framework
*
* @author Ing. James Jara
* @copyright (c) 2011-2012, by Ing. James Jara
* @date 03. Julio 2012
* @version $Id: sc.js  2011-07-03 05:12:14Z james $
*
* @license all framework is licensed under the terms of the Open Source
* LGPL 3.0 license. Commercial use is permitted to the extent that the
* code/component(s) do NOT become part of another Open Source or Commercially
* licensed development library or toolkit without explicit permission.
*
* License details: http://www.gnu.org/licenses/lgpl.html
*/




Instruciones:
1. Poner dentro del body, antes del body las referencias a los scripts.
ej.
<script type="text/javascript" src="http://jqueryjs.googlecode.com/files/jquery-1.3.2.js"></script>
<script type="text/javascript" src="http://plugins.jquery.com/files/jquery.cookie.js.txt"></script>
<script type="text/javascript" src="http://plugins.jquery.com/files/jquery.floatobject-1.4.js.txt"></script>
<script type="text/javascript" src="http://amirharel.com/labs/fo/jquery.floatobject-1.0.js"></script>
<script type="text/javascript" src="sc.js"></script>
<script type="text/javascript">MJJ.setTipo("banner");MJJ.run();</script>
</html>

2.Seleccionar el tipo (banner,widget,popup)
banner: banner flotante
widget: div normal
popup: ventana completa

3.Configurar el webservice MJJ.setWS("url") esta debe apuntar al archivo backend.php

4. Configurar el backend.php , el nombre del archivo cambiarlo, ALERTA, RIESGO.. SI NO SE CAMBIA puede ser descargado.

5.listo.
