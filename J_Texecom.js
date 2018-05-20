var service = 'urn:micasaverde-com:serviceId:TexecomAlarmPanel1';	
var devID='';
function Launch(deviceID) {
    devID=deviceID
    var html =  `

<head>
<style>
.varTable{
	width:500px;
	border-collapse:collapse;	
}
.varTable tr:nth-child(even) {
	background-color: #f2f2f2;
}


/* Style the tab */
.tab {
	overflow: hidden;
	background-color:#00A652;
}
.tabBG {
	vertical-align:middle;
	height:50px;
	background-color:#00A652;
}
/* Style the buttons that are used to open the tab content */
.tab button {
	background-color:#00A652;
	color:white;
	float: left;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 7px 8px;
	margin:9px 6px 0px 6px;
	transition: 0.3s;
}
/* Change background color of buttons on hover */
.tab button:hover {
	background-color:#00643F ;
	padding: 7px 8px;
	margin:9px 6px 0px 6px;
	vertical-align:middle;
    border-radius: 10px;
}
/* Create an active/current tablink class */
.tab button.active {
	background-color:#006E46;;
	padding: 7px 8px;
	margin:9px 6px 0px 6px;
	vertical-align:middle;
    border-radius: 12px;
}
/* Style the tab content */
.tabcontent {
}
</style>
<script>
function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
} </script>
</head>

<body>


<!-- Tab links -->
<div class="tabBG">
<div class="tab">
	<button id="defaultOpen" class="tablinks" onclick="openTab(event, 'Panel')">
	Panel Setup</button>
	<button class="tablinks" onclick="openTab(event, 'Zones')">
	Zone Setup</button>
	<button class="tablinks" onclick="openTab(event, 'Pushover')">
	Pushover Notifications</button>
	<button class="tablinks" onclick="openTab(event, 'Texting')">
	Text Messaging</button>
	</div></div>
<!-- Tab content -->
<div id="Panel" class="tabcontent">
	<h3>Panel Setup</h3>
	<table class="varTable">
		<tr>
			<td>Plugin Version</td>
			<td id="TexecomVersion"></td>
		</tr>

		<tr>
			<td>Connect Via:</td>
			<td><select id="IP/SerialDD" onchange="ipser()"><option value="s">Serial</option><option value="i">IP</option></select></td>
		</tr>
		<tr>
			<td id="connDesc">Connection Settings:</td>
			<td id="connSett"></td>
		</tr>
		<tr>
			<td>Panel UDL Code</td>
			<td><input id="Panel UDL Code" type="text" placeholder="UDL Code" value="" /></td>
		</tr>
		<tr>
			<td>Panel Engineer Code</td>
			<td><input id="Panel Engineer Code" type="text" placeholder="Engineer Code" value="" /></td>
		</tr>
		
		<tr>
			<td>Panel Type</td>
			<td><select id="Panel TypeDD"><option value="12">Premier Elite 12</option><option value="24">Premier Elite 24</option><option value="48">Premier Elite 48 (and above)</option></select></td>
		</tr>

		<tr>
			<td>Grab Zone Names on Next LUUP Restart?</td>
			<td><input id="Grab Zone Names on Next LUUP Restart (1= Yes, 0=No)CB" type="checkbox" /></td>
		</tr>
		<tr>
			<td>Used Zones <strong>NOT </strong>to be Created</td>
			<td><textarea id="Used Zones to be Ignored (Format: 001,002,003)" cols="20" rows="1" style="width:215px;height:50px"  placeholder="Format: xxx,yyy,zzz eg. 001,002,003" value="" ></textarea></td>
		</tr>

		<tr>
			<td><strong>Unused</strong> Zones to be Created</td>
			<td><textarea id="Unused Zones to be Added (Format: 001,002,003)" cols="20" rows="1" style="width:215px;height:50px"  placeholder="Format: xxx,yyy,zzz eg. 001,002,003" value="" ></textarea></td>
		</tr>
		<tr>
			<td>24 Hour Zones (NEVER disarmed by Vera)</td>
			<td><textarea id="24 Hour Zones (NEVER disarmed by Vera)" cols="20" rows="1" style="width:215px;height:50px"  placeholder="Format: xxx,yyy,zzz eg. 001,002,003" value="" ></textarea></td>
		</tr>
		<tr>
			<td>Number of Areas</td>
			<td><select id="MaxPartitionsDD" onchange="hideInpDD('MaxPartitionsDD','Zones to arm in Area B Full Set','Zones to arm in Area B Part Set')"><option value="1">1 Area</option><option value="2">2 Areas</option></select></td>
		</tr>
		<tr>
			<td>Zones to arm in Vera when Area A Full Set</td>
			<td><textarea id="Zones to arm in Area A Full Set" cols="20" rows="1" style="width:215px;height:50px" placeholder="Format: xxx,yyy,zzz eg. 001,002,003" value="" ></textarea></td>
		</tr>
		<tr>
			<td>Zones to arm in Vera when Area A Part Set</td>
			<td><textarea id="Zones to arm in Area A Part Set" cols="20" rows="1" style="width:215px;height:50px" placeholder="Format: xxx,yyy,zzz eg. 001,002,003" value="" ></textarea></td>
		</tr>
		<tr>
			<td>Zones to arm in Vera when Area B Full Set</td>
			<td><a  id="txtBf"></a><textarea id="Zones to arm in Area B Full Set" cols="20" rows="1" style="width:215px;height:50px" placeholder="Format: xxx,yyy,zzz eg. 001,002,003" value="" ></textarea></td>
		</tr>
		<tr>
			<td>Zones to arm in Vera when Area B Part Set</td>
			<td><a id="txtBp"></a><textarea id="Zones to arm in Area B Part Set" cols="20" rows="1" style="width:215px;height:50px" placeholder="Format: xxx,yyy,zzz eg. 001,002,003" value="" ></textarea></td>
		</tr>
	</table>
	<hr>
	<table width="500px">
		<tr align="center">
			<td><button onclick="saveGet(1,1)" style="width: 120px">Save Page
			</button></td>
			<td><button onclick="saveGet(0,1)" style="width: 120px"><b>Save All</b>
			</button></td>
		</tr>
		<tr align="center">
			<td><button onclick="saveGet(1,0)" style="width: 120px">Refresh Page
			</button></td>
			<td><button onclick="saveGet(0,0)" style="width: 120px"><b>Refresh All</b>
			</button></td>
		</tr>
	</table>
</div>

<div id="Zones" class="tabcontent">
	<h3>Zone Setup</h3>
	<table class="varTable" id="zonesetup">

	</table>
	<hr>
	<table width="500px">
		<tr align="center">
			<td><button onclick="saveGet(2,1)" style="width: 120px">Save Page
			</button></td>
			<td><button onclick="saveGet(0,1)" style="width: 120px"><b>Save All</b>
			</button></td>
		</tr>
		<tr align="center">
			<td><button onclick="saveGet(2,0)" style="width: 120px">Refresh Page
			</button></td>
			<td><button onclick="saveGet(0,0)" style="width: 120px"><b>Refresh All</b>
			</button></td>
		</tr>
	</table>

</div>
<div id="Pushover" class="tabcontent">
	<h3>Pushover Notifications</h3>
Uses the <a href="https://www.pushover.net" target="_blank">Pushover</a> Service. <br>You must have a (free) account, created an 'Application' and have registered at least one Device.
 <hr>	
	<table class="varTable">
		<tr>
			<td>PushOver App Token</td>
			<td><input id="PushOver App Token" type="text"  placeholder="PushOver App Token" style="width:215px" maxlength="30" value=""/></td>
		</tr>
		<tr>
			<td>PushOver User Token</td>
			<td><input id="PushOver User Token" type="text" placeholder="PushOver User Token"  style="width:215px" maxlength="30" value="" /></td>
		</tr>
		<tr>
			<td>PushOver Message Title</td>
			<td><input id="PushOver Message Title" type="text"  placeholder="eg. Home Alarm"   style="width:215px" value="" /></td>
		</tr>
		<tr>
			<td>Alarm Sound</td>
			<td><select id="Pushover Alarm SoundDD" style="width:215px" ><option value='pushover'>Pushover (default)</option> 
<option value='bike'>Bike</option>
<option value='bugle'>Bugle</option>
<option value='cashregister'>Cash Register</option>  
<option value='classical'>Classical </option>
<option value='cosmic'>Cosmic</option>
<option value='falling'>Falling</option>
<option value='gamelan'>Gamelan</option>
<option value='incoming'>Incoming</option>
<option value='intermission'>Intermission</option>
<option value='magic'>Magic</option>
<option value='mechanical'>Mechanical</option> 
<option value='pianobar'>Piano Bar</option>
<option value='siren'>Siren</option>
<option value='spacealarm'>Space Alarm</option>  
<option value='tugboat'>Tug Boat</option>
<option value='alien'>Alien Alarm (long)</option>
<option value='climb'>Climb (long)</option>
<option value='persistent'>Persistent (long)</option> 
<option value='echo'>Pushover Echo (long)</option>
<option value='updown'>Up Down (long)</option>
<option value='none'>None (silent)</option></select></td>
		</tr>
		<tr>
			<td>Alarm Message Repeats Every (sec)</td>
			<td><input id="PushOver - Alarm Message Repeats Every (sec)" type="text" style="width:50px"  placeholder="eg. 30" value="" /></td>
		</tr>
		<tr>
			<td>Alarm Stops Retrying After: (min)</td>
			<td><input id="PushOver - Alarm Stops Retrying After: (min)" type="text" style="width:50px"  placeholder="eg. 90" value="" /></td>
		</tr>
		<tr>
			<td>Device Token For Alarm Notifications</td>
			<td><input id="PushOver - Device Token For Alarm Notifications (Blank = All Devices With User Token)" style="width:215px" type="text" placeholder="(Blank = All With User Token)" value="" /></td>
		</tr>
		<tr>
			<td>Set/Unset Notifications</td>
			<td><input id="PushOver Set/Unset Notifications (1 = Yes, 0 = No)CB" type="checkbox"/></td>
		</tr>
		<tr>
			<td>Set/Unset Sound</td>
			<td><select id="PushOver Set/Unset SoundDD" style="width:215px" ><option value='pushover'>Pushover (default)</option> 
<option value='bike'>Bike</option>
<option value='bugle'>Bugle</option>
<option value='cashregister'>Cash Register</option>  
<option value='classical'>Classical </option>
<option value='cosmic'>Cosmic</option>
<option value='falling'>Falling</option>
<option value='gamelan'>Gamelan</option>
<option value='incoming'>Incoming</option>
<option value='intermission'>Intermission</option>
<option value='magic'>Magic</option>
<option value='mechanical'>Mechanical</option> 
<option value='pianobar'>Piano Bar</option>
<option value='siren'>Siren</option>
<option value='spacealarm'>Space Alarm</option>  
<option value='tugboat'>Tug Boat</option>
<option value='alien'>Alien Alarm (long)</option>
<option value='climb'>Climb (long)</option>
<option value='persistent'>Persistent (long)</option> 
<option value='echo'>Pushover Echo (long)</option>
<option value='updown'>Up Down (long)</option>
<option value='none'>None (silent)</option></select></td>
		</tr>
		<tr>
			<td>Device To Receive Set/Unset Notifications</td>
			<td><input id="PushOver - Device To Receive Set/Unset Notifications (Blank = All With User Token)" style="width:215px" type="text" placeholder="(Blank = All With User Token)" value="" /></td>
		</tr>
		<tr>
			<td>PushOver Notification on Vera Restart</td>
			<td><input id="PushOver Notification on Vera Restart (1 = Yes, 0 = No)CB" type="checkbox"/></td>
		</tr>
	</table>
	<hr>
	<table width="500px">
		<tr align="center">
			<td><button onclick="saveGet(3,1)" style="width: 120px">Save Page
			</button></td>
			<td><button onclick="saveGet(0,1)" style="width: 120px"><b>Save All</b>
			</button></td>
		</tr>
		<tr align="center">
			<td><button onclick="saveGet(3,0)" style="width: 120px">Refresh Page
			</button></td>
			<td><button onclick="saveGet(0,0)" style="width: 120px"><b>Refresh All</b>
			</button></td>
		</tr>
	</table>
</div>

<div id="Texting" class="tabcontent">
	<h3>Text Messaging</h3>
Uses the <a href="http://www.clickatell.com" target="_blank">Clickatell</a> Service. <br>You must have a (free) account	and have registered at least one phone number.
 <hr><table class="varTable">
		<tr>
			<td>To be added...</td>
			<td><input id="Admin Access Code" placeholder="" /></td>
		</tr>
</table>
	<hr>
	<table width="500px">
		<tr align="center">
			<td><button onclick="saveGet(4,1)" style="width: 120px">Save Page
			</button></td>
			<td><button onclick="saveGet(0,1)" style="width: 120px"><b>Save All</b>
			</button></td>
		</tr>
		<tr align="center">
			<td><button onclick="saveGet(4,0)" style="width: 120px">Refresh Page
			</button></td>
			<td><button onclick="saveGet(0,0)" style="width: 120px"><b>Refresh All</b>
			</button></td>
		</tr>
	</table>
</div>
<iframe id="I1" name="Used for Luup Reloads" style="width:0px;height:0px;visibility:hidden"></iframe>

<script>
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

function ipser(){
	if (document.getElementById('IP/SerialDD').value=='i'){
		document.getElementById('connDesc').innerHTML='Connection Settings (ip:port):'
		document.getElementById('connSett').innerHTML='<input id="PanelIP" type="text" placeholder="eg. 192.168.1.100" value="" style="width:125px"/> : <input id="PanelPort" type="text" placeholder="eg. 10001" value="10001"  style="width:75px"/>'
		operation('PanelIP', 0)
		operation('PanelPort', 0)			
	}
	else {
		document.getElementById('connDesc').innerHTML='Connection Settings:'
		document.getElementById('connSett').innerHTML='Goto "Apps">"Serial Port Configuration" and choose<br>the Texecom Elite Device<br>and set the following options, <br>Baud Rate: <i>19200</i>, <br>Parity: <i>None</i>, <br>Data Bits: <i>8</i>, <br>Stop Bits: <i>2</i>.'
	}
}
function redownload(){
	document.getElementById('Cust Logo Download Location').value='redownload'
}
function restore(){
	document.getElementById('Cust Logo Download Location').value=document.getElementById('Last Cust Logo Download Location').value
}/*
function savev(id){
	if(id.substr(id.length - 2)=='CB'){
		id=id.substr(0,id.length - 2)
		if(document.getElementById(id).checked==true){
			val= '1'
		}
		else{
			val= '0'
		}
		Fsave(id,val)
		}
	else{
		Fsave(id,document.getElementById(id).value)
	}
}*/
function operation(id,saveit){
	if(saveit==1){ //save
		if(id.substr(id.length - 2)=='CB'){
			if(document.getElementById(id).checked==true){
				val= '1'
			} else{
				val= '0'
			}
			id=id.substr(0,id.length - 2)
			Fsave(id,val)
		}else if(id.substr(id.length - 2)=='DD'){
			id=id.substr(0,id.length - 2)
			Fsave(id,document.getElementById(id+'DD').value)
		} else{
			Fsave(id,document.getElementById(id).value)
		}
	} else{ //load
		if(id.substr(id.length - 2)=='CB'){
			id=id.substr(0,id.length - 2)
			document.getElementById(id+'CB').checked=cbLoad(id)
		}else if(id.substr(id.length - 2)=='DD'){
			id=id.substr(0,id.length - 2)
			document.getElementById(id+'DD').value=Fget(id)
		} else{
			document.getElementById(id).value=Fget(id)
			document.getElementById(id).innerHTML=Fget(id)
		}
	}
}
function saveGet(page,saveit){
	if(page==1 || page==0){//panel setup or all
		operation('TexecomVersion',saveit)
		operation('Panel UDL Code',saveit)
		operation('Panel Engineer Code',saveit)
		operation('Grab Zone Names on Next LUUP Restart (1= Yes, 0=No)CB',saveit)
		operation('IP/SerialDD',saveit)
		setTimeout(ipser(),50)
		setTimeout(function(){
      ip=''
      if(document.getElementById('IP/SerialDD').value=='i'){
        
          operation('PanelIP', saveit)
          operation('PanelPort', saveit)
          ip=document.getElementById('PanelIP').value+':'+document.getElementById('PanelPort').value
        
      } else{
        ip=''
      }
      if(saveit==1){
        Fipset(ip)
      }
		},100)
				operation('Panel TypeDD',saveit)
		operation('Used Zones to be Ignored (Format: 001,002,003)',saveit)
		operation('Unused Zones to be Added (Format: 001,002,003)',saveit)
		operation('24 Hour Zones (NEVER disarmed by Vera)',saveit)
		operation('MaxPartitionsDD',saveit)
		operation('Zones to arm in Area A Full Set',saveit)
		operation('Zones to arm in Area A Part Set',saveit)
		operation('Zones to arm in Area B Full Set',saveit)
		operation('Zones to arm in Area B Part Set',saveit)
		hideInpDD('MaxPartitionsDD','Zones to arm in Area B Full Set','Zones to arm in Area B Part Set')
	}	
	if(page==2 || page==0){//zone setup or all
		if(saveit==0){
			document.getElementById('zonesetup').innerHTML=''
			str=Fget('CctsUsed')
			arr = str.split(",");
   			for (i=0;i<arr.length;i++){
    			if(Number(arr[i])!=0 && Number.isInteger(Number(arr[i])) ){
					document.getElementById('zonesetup').innerHTML+='<tr><td>Circuit '+Number(arr[i])+' Text</td><td><input id="Cct '+Number(arr[i])+' Text" type="text"  placeholder="Circuit '+Number(arr[i])+' Text"   style="width:215px" value="" /></td></tr>'
				}
			}
			setTimeout(function(){
			    for (i=0;i<arr.length;i++){
			    	if(Number(arr[i])!=0 && Number.isInteger(Number(arr[i])) ){
						operation('Cct '+Number(arr[i])+' Text',saveit)
					}
				}
			},50)
		}
		else{
		    for (i=0;i<arr.length;i++){
		    	if(Number(arr[i])!=0 && Number.isInteger(Number(arr[i])) ){
					operation('Cct '+Number(arr[i])+' Text',saveit)
					
				}
			}
		}
	}	
	if(page==3 || page==0){//pushover or all
		operation('PushOver App Token',saveit)
		operation('PushOver User Token',saveit)
		operation('PushOver Message Title',saveit)
		operation('Pushover Alarm SoundDD',saveit)
		operation('PushOver - Alarm Message Repeats Every (sec)',saveit)
		operation('PushOver - Alarm Stops Retrying After: (min)',saveit)
		operation('PushOver - Device Token For Alarm Notifications (Blank = All Devices With User Token)',saveit)
		operation('PushOver Set/Unset Notifications (1 = Yes, 0 = No)CB',saveit)
		operation('PushOver Set/Unset SoundDD',saveit)
		operation('PushOver - Device To Receive Set/Unset Notifications (Blank = All With User Token)',saveit)
		operation('PushOver Notification on Vera Restart (1 = Yes, 0 = No)CB',saveit)
	}
	if(page==4 || page==0){//Texting or all
	
	}
	if(saveit){
		if (confirm('Restart Luup?')) {
    		Freloadluup()// Save it!
    	}
	}
}
function cbLoad(varN){
	if(Fget(varN)=='1'){
		return true
	}
	else{
		return false
	}
}
function getZones(){
}

function hideInp(cb,Inp,Inp2){
	if(document.getElementById(cb).checked==1){
		document.getElementById(Inp).style.opacity=1
		document.getElementById(Inp).disabled=0
		if(Inp2!=undefined){
			document.getElementById(Inp2).style.opacity=1
			document.getElementById(Inp2).disabled=0
		}
	}
	else{
		document.getElementById(Inp).style.opacity=0
		document.getElementById(Inp).disabled=1
		if(Inp2!=undefined){
			document.getElementById(Inp2).style.opacity=0
			document.getElementById(Inp2).disabled=1
		}
	}
}
function hideInpDD(dd,Inp,Inp2){
	if(document.getElementById(dd).value=='2'){
		document.getElementById(Inp).style.opacity=1
		document.getElementById(Inp).style.height=50
		document.getElementById(Inp).style.width=215
		document.getElementById(Inp).disabled=0
		document.getElementById('txtBp').innerHTML=''//'Zones to arm in Area B Part Set'
		document.getElementById('txtBf').innerHTML=''//'Zones to arm in Area B Full Set'
		if(Inp2!=undefined){
			document.getElementById(Inp2).style.opacity=1
			document.getElementById(Inp2).disabled=0
			document.getElementById(Inp2).style.width=215
			document.getElementById(Inp2).style.height=50
		}
	}
	else{
		document.getElementById(Inp).style.opacity=0
		document.getElementById(Inp).style.height=1
		document.getElementById(Inp).style.width=1
		document.getElementById(Inp).disabled=1
		document.getElementById('txtBp').innerHTML='<i>(Disabled)</i>'
		document.getElementById('txtBf').innerHTML='<i>(Disabled)</i>'
		if(Inp2!=undefined){
			document.getElementById(Inp2).style.height=1
			document.getElementById(Inp2).style.opacity=0
			document.getElementById(Inp2).style.width=1
			document.getElementById(Inp2).disabled=1
		}
	}
}
saveGet(0,0)
</script>

</body>

    `
    set_panel_html(html);
}
function Fget(varN){
  return api.getDeviceState(devID, service, varN);
}
function Fsave(varN,varV){
		api.setDeviceStateVariablePersistent(devID, service, varN,varV,'ok()','nok()',false);
}
function Freloadluup(){
dru=api.getDataRequestURL()+'?id=lu_action&serviceId=urn:micasaverde-com:serviceId:HomeAutomationGateway1&action=RunLua&Code=luup.reload()'
 document.getElementById('I1').src=dru
}
function Fipset(ip){
dru=api.getDataRequestURL()+'?id=lu_action&serviceId=urn:micasaverde-com:serviceId:HomeAutomationGateway1&action=RunLua&Code=luup.ip_set("'+ip+'", '+devID+')'
 document.getElementById('I1').src=dru
}

