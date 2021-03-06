var service = 'urn:micasaverde-com:serviceId:TexecomAlarmPanel1';	
var devID='';
function Launch(deviceID) {
    devID=deviceID
    var html =  `


<head>
<style>
.varTable{
	width:510px;
	border-collapse:collapse;	
	padding:6px 6px 6px 6px;
}
.varTable thead th{
position: sticky; 
top:0;
	border-bottom:1px solid #000000;
	
	background-color: #00A652;
	color: white;
text-align:center;

}

.z2aTable th{
position: sticky; 
top:0;
	background-color: #00A652;
	color: white;
	}
.varTable th, td{
		padding:4px 4px 4px 4px;

}
.varTable tr:nth-child(even) {
	background-color: #00F60021;
}
.z2aTable td:nth-child(1){
text-align:center;
}
.z2aTable td:nth-child(2){
text-align:center;
}
.z2aTable td:nth-child(3){
text-align:center;
}
.z2aTable td:nth-child(4){
text-align:center;
}
.z2aTable td:nth-child(5){
text-align:center;
}
.z2aTable td:nth-child(6){
text-align:center;
}

.z2aTable {
	width: 500px;
	border-collapse: collapse;
	border:1px solid #000000;
	padding:4px 4px 4px 4px;
}
}
.z2aTable tr:nth-child(even) {
	background-color: #00F60021;
}
.z2aTable td{
	border-bottom:1px solid #bbbbbb;
		padding:4px 4px 4px 4px;
}

.z2aTable td:nth-child(odd) {
	border-right:1px solid #bbbbbb;
}



.tab {
	overflow: hidden;
	background-color:#00A652;
}
.tabBG {
	vertical-align:middle;
	height:50px;
	background-color:#00A652;
}
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
.tab button:hover {
	background-color:#00643F ;
	padding: 7px 8px;
	margin:9px 6px 0px 6px;
	vertical-align:middle;
    border-radius: 10px;
}
.tab button.active {
	background-color:#006E46;;
	padding: 7px 8px;
	margin:9px 6px 0px 6px;
	vertical-align:middle;
    border-radius: 12px;
}
.tabcontent {
}
.tabsubcontent {

display:none}
.vbut{
	background-color:#dfdfdf;
	color:black;
	border:thin #cccccc solid;
	cursor: pointer;
	padding: 5px 6px;
	margin:7px 4x 0px 4px;
	transition: 0.3s;
    border-radius: 10px;

	
}
.vbut:hover{
		background-color:#bbbbbb;

	color:black;
	
	border:thin #cccccc solid;
	cursor: pointer;
	padding: 5px 6px;
	margin:7px 4x 0px 4px;
	transition: 0.3s;
    border-radius: 10px;

}

.vbut2{
	background-color:#006E47;
	color:white;
	border:thin #cccccc solid;
	cursor: pointer;
	padding: 5px 6px;
	margin:7px 4x 0px 4px;
	transition: 0.3s;
    border-radius: 10px;

	
}
.vbut2:hover{
		background-color:#00492B;

	color:white;
	
	border:thin #cccccc solid;
	cursor: pointer;
	padding: 5px 6px;
	margin:7px 4x 0px 4px;
	transition: 0.3s;
    border-radius: 10px;

}

.Ttooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
}

.Ttooltip .Ttooltiptext {
    visibility: hidden;
    width: 250px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: -700%;
    left: 100%;
    margin-left: 0px;
    opacity: 0;
    transition: opacity 0.3s;
}

.Ttooltip:hover .Ttooltiptext {
    visibility: visible;
    opacity: 1;
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
} 
function innerTab(fr,to){
    document.getElementById(fr).style.display = "none";
    document.getElementById(to).style.display = "block";
}
</script>
</head>

<body>


<!-- Tab links -->
<div class="tabBG">
<div class="tab">
	<button id="defaultOpen" class="tablinks" onclick="openTab(event, 'Connection')">
	Connection Setup</button>
	<button class="tablinks" onclick="openTab(event, 'Zones')">
	Zone Setup</button>
	<button class="tablinks" onclick="openTab(event, 'Notifications')">
	Notifications</button>
	</div></div>
<!-- Tab content -->
<div id="Connection" class="tabcontent">
	<h3>Connection Setup</h3>
	<table class="varTable" >
		<tr>
			<td style="width: 277px">Plugin Version</td>
			<td id="TexecomVersion"></td>
		</tr>

		<tr>
			<td style="width: 277px">Connect Via:</td>
			<td><select id="IP/SerialDD" onchange="ipser()"><option value="s">Serial</option><option value="i">IP</option></select></td>
		</tr>
		<tr>
			<td id="connDesc" style="width: 277px">Connection Settings:</td>
			<td id="connSettS"></td>
		</tr>
		<tr>
			<td style="width: 277px">Panel Type</td>
			<td><select id="Panel TypeDD"><option value="12">Premier Elite 12</option><option value="24">Premier Elite 24</option><option value="48">Premier Elite 48 (and above)</option></select></td>
		</tr>
		<tr>
			<td style="width: 277px">Panel UDL Code</td>
			<td><input id="Panel UDL Code" type="text" placeholder="UDL Code" value="" /></td>
		</tr>
		<tr>
			<td style="width: 277px">Panel Engineer Code</td>
			<td><input id="Panel Engineer Code" type="text" placeholder="Engineer Code" value="" /></td>
		</tr>
		<tr>
			<td style="width: 277px">Create 'PC Controlled Output' Switches</td>
			<td><select id="pcopDD"><option value="0">None</option><option value="1">PC Control 1</option><option value="2">PC Control 1-2</option><option value="3">PC Control 1-3</option><option value="4">PC Control 1-4</option></select></td>
		</tr>
		
	</table>
	<hr>
	<table width="500px">
		<tr align="center">
			<td><button class="vbut2" onclick="saveGet(1,1)" style="width: 150px">
			Save Just This Page
			</button></td>
			<td><button class="vbut2" onclick="saveGet(0,1)" style="width: 150px"><b>
			Save All Pages</b>
			</button></td>
		</tr>
		<tr align="center">
			<td><button class="vbut2" onclick="saveGet(1,0)" style="width: 150px">
			Reload Just This Page
			</button></td>
			<td><button class="vbut2" onclick="saveGet(0,0)" style="width: 150px"><b>
			Reload All Pages</b>
			</button></td>
		</tr>
	</table>
</div>
<div id="Zones" class="tabcontent">
	<h3>Zone Setup</h3>
<button class="vbut2" style="margin:5px 5px 5px 5px" onclick="innerTab('Zones','Zone Names')">Setup Zone Names</button>
	<table class="varTable">

		<tr>
			<td style="width: 277px">Used Zones <strong>NOT </strong>to be Created<br><button class="vbut" onclick='populate("Used Zones to be Ignored (Format: 001,002,003)")'>Populate with all circuits used</button></td>
			<td><textarea id="Used Zones to be Ignored (Format: 001,002,003)" cols="20" rows="1" style="width:215px;height:50px"  placeholder="Format: xxx,yyy,zzz eg. 001,002,003" value="" ></textarea></td>
		</tr>

		<tr>
			<td style="width: 277px"><strong>Unused</strong> Zones to be Created<br></td>
			<td><textarea id="Unused Zones to be Added (Format: 001,002,003)" cols="20" rows="1" style="width:215px;height:50px"  placeholder="Format: xxx,yyy,zzz eg. 001,002,003" value="" ></textarea></td>
		</tr>
		<tr>
			<td style="width: 277px">Number of Areas</td>
			<td><select id="MaxPartitionsDD" onchange="hideInpDD('MaxPartitionsDD','Zones to arm in Area B Full Set','Zones to arm in Area B Part Set')"><option value="1">1 Area</option><option value="2">2 Areas</option></select></td>
		</tr>
		<tr>
			<td  colspan="2">Vera Programming for Texecom Zones: <div class="Ttooltip">(?)<span class="Ttooltiptext">Table of Vera Zones to be Armed/Disarmed based upon Partition (/Area) Arm Status: <br>24 = 24 Hour (Never Disarmed By Vera eg. Panic Button)<br>AF = Area A, Full Set<br>AP = Area A, Part Set<br>BF = Area B, Full Set<br>BP = Area B, Part Set<br><br>eg. If Zone 001 were to have AF ticked, The corresponding Zone 001 within Vera would be armed and disarmed when Area A is Fully Armed and Disarmed.</span></div><br>
			
		<div style="overflow-y: auto; border:border:1px solid #000000; overflow-x: auto; height: 200px; width: 520px">
		<table class="z2aTable">
		<tr>
			<th>24</th>
			<th>AF</th>
			<th>AP</th>
			<th>BF</th>
			<th>BP</th>
			<th>#</th>
			<th>Description</th></tr>
			
			<tbody id="z2aTable" ></tbody>

	</table>
</div>

		
		
		</td>
		</tr>
</table>
	<hr>
	<table width="500px">
		<tr align="center">
			<td><button class="vbut2" onclick="saveGet(2,1)" style="width: 150px">
			Save Just This Page
			</button></td>
			<td><button class="vbut2" onclick="saveGet(0,1)" style="width: 150px"><b>
			Save All Pages</b>
			</button></td>
		</tr>
		<tr align="center">
			<td><button class="vbut2" onclick="saveGet(2,0)" style="width: 150px">
			Reload Just This Page
			</button></td>
			<td><button class="vbut2" onclick="saveGet(0,0)" style="width: 150px"><b>
			Reload All Pages</b>
			</button></td>
		</tr>
	</table>
</div>
<div id="Zone Names" class="tabcontent">
	<h3>Setup Zone Names</h3>
	<button class="vbut2" style="margin:5px 5px 5px 5px" onclick="innerTab('Zone Names','Zones')">< Back to Zone Setup</button>

	<table class="varTable">
		<tr>
			<td style="width: 277px">Grab Zone Names on Next LUUP Restart?</td>
			<td><input id="Grab Zone Names on Next LUUP Restart (1= Yes, 0=No)CB" type="checkbox" /></td>
		</tr>
	
<tr>
			<td  colspan="2">Vera Name/Type Programming for Texecom Zones:

		<div style="overflow-y: auto; border:border:1px solid #000000; overflow-x: hidden; height: 200px; width: 520px">
			<table class="varTable"><thead><tr>
			<th>Texecom</th>
			<th>Text</th>
			<th>Type</th>
			</tr></thead><tbody class="varTable" id="zonesetup">
</tbody>
	</table>
</div>
</td></tr></table>
	<hr>
	<table width="500px">
		<tr align="center">
			<td><button class="vbut2" onclick="saveGet(3,1)" style="width: 150px">
			Save Just This Page
			</button></td>
			<td><button class="vbut2" onclick="saveGet(0,1)" style="width: 150px"><b>
			Save All Pages</b>
			</button></td>
		</tr>
		<tr align="center">
			<td><button class="vbut2" onclick="saveGet(3,0)" style="width: 150px">
			Reload Just This Page
			</button></td>
			<td><button class="vbut2" onclick="saveGet(0,0)" style="width: 150px"><b>
			Reload All Pages</b>
			</button></td>
		</tr>
	</table>

</div>
<div id="Notifications" class="tabcontent">
	<h3>Notifications</h3>
	<table class="varTable" style="text-align:center">
	<tr></tr>
		<tr>
			<td><label><input id="usePOCB" type="checkbox">Use PushOver Notifications?</label><br>
			<button id="bP1" class="vbut" style="margin:5px 5px 5px 5px" onclick="innerTab('Notifications','Pushover')">Account Settings</button>

<button id="bP2" class="vbut" style="margin:5px 5px 5px 5px" onclick="innerTab('Notifications','PO')">Notifications</button>
</td></tr>
<tr><td><hr></td></tr>
		<tr>
			
			<td><label><input id="useTXTCB" type="checkbox">Use Text Messaging Notifications?</label><br>
			<button id="bT1" class="vbut" style="margin:5px 5px 5px 5px" onclick="innerTab('Notifications','Texting')">Account Settings</button>

<button id="bT2" class="vbut" style="margin:5px 5px 5px 5px" onclick="innerTab('Notifications','TXT')">Notifications</button>
</td>
		</tr>
<tr><td><hr></td></tr>

		<tr>
			<td><label><input id="useEMCB" type="checkbox">Use Email Notifications?</label><br>
			<button id="bE1" class="vbut" style="margin:5px 5px 5px 5px" onclick="innerTab('Notifications','Emailing')">Account Settings</button>

<button id="bE2" class="vbut" style="margin:5px 5px 5px 5px;" onclick="innerTab('Notifications','EM')">Notifications</button>
</td>
		</tr>
<tr><td><hr></td></tr>



	</table>	
	<table width="500px">
		<tr align="center">
			<td><button class="vbut2" onclick="saveGet(4,1)" style="width: 150px">
			Save Just This Page
			</button></td>
			<td><button class="vbut2" onclick="saveGet(0,1)" style="width: 150px"><b>
			Save All Pages</b>
			</button></td>
		</tr>
		<tr align="center">
			<td><button class="vbut2" onclick="saveGet(4,0)" style="width: 150px">
			Reload Just This Page
			</button></td>
			<td><button class="vbut2" onclick="saveGet(0,0)" style="width: 150px"><b>
			Reload All Pages</b>
			</button></td>
		</tr>
	</table>
</div>
<div id="EM" class="tabcontent">
	<h3>Email Notifications</h3>
<button class="vbut2" style="margin:5px 5px 5px 5px" onclick="innerTab('EM','Emailing')">< Back To Email Setup</button>	<button class="vbut2" style="margin:5px 5px 5px 5px" onclick="innerTab('EM','Notifications')">Back To Notifications Home ></button><br>
<table class="varTable">
		<tr>
			<td>Email Message Subject</td>
			<td><input id="nEMsubj" placeholder="Subject for Emails" type="text" /></td>
		</tr>

		<tr>
			<td>Email Message Header <font size="1">(HTML tags <b>supported</b>)</font></td>
			<td><input id="nEMhead" placeholder="Header for Emails" type="text" /></td>
		</tr>

		<tr>
			<td>Vera Restart Notifications</td>
			<td><input id="nEMch0CB" type="checkbox"/></td>
		</tr>

		<tr>
			<td>Set/Unset Notifications</td>
			<td><input id="nEMch4CB" type="checkbox"/></td>
		</tr>
		
		<tr><td colspan="2"><hr>System Flags to Notify via Email:</td>
		</tr>
		<tr>
		<td colspan="2" style="text-align:center">
<button class="vbut" onclick="selSF('E',true)">Select All</button>
<button class="vbut" onclick="selSF('E',false)">Deselect All</button>
 Or Copy From: 
 <button class="vbut" onclick="copySF('P','E')">PushOver</button>
 <button class="vbut" onclick="copySF('T','E')">Texting</button>
 </td>
 </tr>
		<tr>
		<td id="nEMsf" colspan="2"><table><tr><td>
<div style="overflow-y:scroll; overflow-x:hidden; height:100px;width:250px"><table class="varTable" style="overflow-y:scroll;height:100px;width:500px"><tr><td>
<label><input type="checkbox" id="sfE1">Confirm Devices</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE2">Engineer Working</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE3">Panel Lid Tamper</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE4">Auxiliary Tamper</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE5">Bell Tamper</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE6">Auxiliary Fuse Blown</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE7">Mains Power Off</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE8">ATS Path Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE9">Coms Failed</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE10">Fully Armed</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE11">System Open</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE12">Courtesy Light</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE13">Battery Test On</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE14">Battery Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE15">Bell Fuse Blown</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE16">Service Required</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE17">Custom 1 Stage B</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE18">Custom 1 Stage A</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE19">Confirmed Alarm</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE20">UDL Enabled</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE21">UDL Call Active</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE22">UDL Lockout</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE23">Coms Active</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE24">Coms Successful</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE25">Custom 3 Stage A</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE26">Radio-Pad Lost</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE27">No Radio-Pad Signal</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE28">Radio-Pad Successful</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE29">Radio-Pad Failed</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE30">Custom 2 Stage A or B</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE31">Custom 2 Stage B</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE32">Custom 2 Stage A</label></td></tr>
</table></div></td><td>

<div style="overflow-y:scroll; overflow-x:hidden; height:100px;width:250px"><table class="varTable" style="overflow-y:scroll;height:100px;width:500px"><tr><td>
<label><input type="checkbox" id="sfE33">Com 1 No Signal</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE34">Com 2 Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE35">Com 1 Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE36">Custom 4 Stage A or B</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE37">Custom 4 Stage B</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE38">Custom 4 Stage A</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE39">Custom 3 Stage A or B</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE40">Custom 3 Stage B</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE41">CIE Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE42">No ATS Available</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE43">ATS Remote Test</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE44">Detector Test</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE45">Radio RX Tamper</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE46">Radio Jamming</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE47">Coms Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE48">Com 2 No Signal</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE49">IP Path Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE50">Com 3 Power On</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE51">Com 2 Power On</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE52">Com 1 Power On</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE53">PSU Mains Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE54">WD Test Active</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE55">PSU Battery Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE56">PSU Fuse Blown</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE57"><i>(empty)</i></label></td></tr><tr><td>
<label><input type="checkbox" id="sfE58"><i>(empty)</i></label></td></tr><tr><td>
<label><input type="checkbox" id="sfE59"><i>(empty)</i></label></td></tr><tr><td>
<label><input type="checkbox" id="sfE60"><i>(empty)</i></label></td></tr><tr><td>
<label><input type="checkbox" id="sfE61"><i>(empty)</i></label></td></tr><tr><td>
<label><input type="checkbox" id="sfE62">Charger Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE63">PS Failure</label></td></tr><tr><td>
<label><input type="checkbox" id="sfE64">Low Fob Battery</label></td></tr></table></div></td></tr></table>
		</td>
		
		</tr>
</table>
	<hr>
	<table width="500px">
		<tr align="center">
			<td><button class="vbut2" onclick="saveGet(5,1)" style="width: 150px">
			Save Just This Page
			</button></td>
			<td><button class="vbut2" onclick="saveGet(0,1)" style="width: 150px"><b>
			Save All Pages</b>
			</button></td>
		</tr>
		<tr align="center">
			<td><button class="vbut2" onclick="saveGet(5,0)" style="width: 150px">
			Reload Just This Page
			</button></td>
			<td><button class="vbut2" onclick="saveGet(0,0)" style="width: 150px"><b>
			Reload All Pages</b>
			</button></td>
		</tr>
	</table>
</div>

<div id="TXT" class="tabcontent">
	<h3>Text Message Notifications</h3>
<button class="vbut2" style="margin:5px 5px 5px 5px" onclick="innerTab('TXT','Texting')">< Back To Text Setup</button>	<button class="vbut2" style="margin:5px 5px 5px 5px" onclick="innerTab('TXT','Notifications')">Back To Notifications Home ></button><br>
	<table class="varTable">
<tr>
			<td>Text Message Header</td>
			<td><input id="nTXThead" placeholder="Header for Text Message" type="text" /></td>
		</tr>
<tr>
			<td>Vera Restart Notifications</td>
			<td><input id="nTXTch0CB" type="checkbox"/></td>
		</tr>



		<tr>
			<td>Set/Unset Notifications</td>
			<td><input id="nTXTch4CB" type="checkbox"/></td>
		</tr>
		
		<tr><td colspan="2"><hr>System Flags to Notify via Texting:</td>
		</tr>
		<tr>
		<td colspan="2" style="text-align:center">
<button class="vbut" onclick="selSF('T',true)">Select All</button>
<button class="vbut" onclick="selSF('T',false)">Deselect All</button>
 Or Copy From: 
 <button class="vbut" onclick="copySF('P','T')">PushOver</button>
 <button class="vbut" onclick="copySF('E','T')">Emails</button>
 </td>
 </tr><tr></tr>
		<tr>
		<td id="nTXTsf"
		
		 colspan="2"><table><tr><td>
<div style="overflow-y:scroll; overflow-x:hidden; height:100px;width:250px"><table class="varTable" style="overflow-y:scroll;height:100px;width:500px"><tr><td>
<label><input type="checkbox" id="sfT1">Confirm Devices</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT2">Engineer Working</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT3">Panel Lid Tamper</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT4">Auxiliary Tamper</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT5">Bell Tamper</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT6">Auxiliary Fuse Blown</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT7">Mains Power Off</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT8">ATS Path Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT9">Coms Failed</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT10">Fully Armed</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT11">System Open</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT12">Courtesy Light</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT13">Battery Test On</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT14">Battery Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT15">Bell Fuse Blown</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT16">Service Required</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT17">Custom 1 Stage B</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT18">Custom 1 Stage A</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT19">Confirmed Alarm</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT20">UDL Enabled</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT21">UDL Call Active</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT22">UDL Lockout</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT23">Coms Active</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT24">Coms Successful</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT25">Custom 3 Stage A</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT26">Radio-Pad Lost</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT27">No Radio-Pad Signal</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT28">Radio-Pad Successful</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT29">Radio-Pad Failed</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT30">Custom 2 Stage A or B</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT31">Custom 2 Stage B</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT32">Custom 2 Stage A</label></td></tr>
</table></div></td><td>

<div style="overflow-y:scroll; overflow-x:hidden; height:100px;width:250px"><table class="varTable" style="overflow-y:scroll;height:100px;width:500px"><tr><td>
<label><input type="checkbox" id="sfT33">Com 1 No Signal</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT34">Com 2 Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT35">Com 1 Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT36">Custom 4 Stage A or B</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT37">Custom 4 Stage B</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT38">Custom 4 Stage A</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT39">Custom 3 Stage A or B</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT40">Custom 3 Stage B</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT41">CIE Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT42">No ATS Available</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT43">ATS Remote Test</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT44">Detector Test</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT45">Radio RX Tamper</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT46">Radio Jamming</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT47">Coms Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT48">Com 2 No Signal</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT49">IP Path Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT50">Com 3 Power On</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT51">Com 2 Power On</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT52">Com 1 Power On</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT53">PSU Mains Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT54">WD Test Active</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT55">PSU Battery Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT56">PSU Fuse Blown</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT57"><i>(empty)</i></label></td></tr><tr><td>
<label><input type="checkbox" id="sfT58"><i>(empty)</i></label></td></tr><tr><td>
<label><input type="checkbox" id="sfT59"><i>(empty)</i></label></td></tr><tr><td>
<label><input type="checkbox" id="sfT60"><i>(empty)</i></label></td></tr><tr><td>
<label><input type="checkbox" id="sfT61"><i>(empty)</i></label></td></tr><tr><td>
<label><input type="checkbox" id="sfT62">Charger Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT63">PS Failure</label></td></tr><tr><td>
<label><input type="checkbox" id="sfT64">Low Fob Battery</label></td></tr></table></div></td></tr></table></td>
		</tr>
</table>
	<hr>
	<table width="500px">
		<tr align="center">
			<td><button class="vbut2" onclick="saveGet(6,1)" style="width: 150px">
			Save Just This Page
			</button></td>
			<td><button class="vbut2" onclick="saveGet(0,1)" style="width: 150px"><b>
			Save All Pages</b>
			</button></td>
		</tr>
		<tr align="center">
			<td><button class="vbut2" onclick="saveGet(6,0)" style="width: 150px">
			Reload Just This Page
			</button></td>
			<td><button class="vbut2" onclick="saveGet(0,0)" style="width: 150px"><b>
			Reload All Pages</b>
			</button></td>
		</tr>
	</table>
</div>
<div id="PO" class="tabcontent">

	<h3>Pushover Notifications</h3>
<button class="vbut2" style="margin:5px 5px 5px 5px" onclick="innerTab('PO','Pushover')">< Back To Pushover Setup</button>	<button class="vbut2" style="margin:5px 5px 5px 5px" onclick="innerTab('PO','Notifications')">Back To Notifications Home ></button><br>
	<table class="varTable">

		<tr>
			<td>PushOver Message Title</td>
			<td><input id="PushOver Message Title" type="text"  placeholder="eg. Home Alarm"   style="width:215px" value="" /></td>
		</tr>
		
		<tr>
			<td>Set/Unset Notifications</td>
			<td><input id="nPOch4CB" type="checkbox"/></td>
		</tr>
		
		<tr>
			<td>PushOver Notification on Vera Restart</td>
			<td><input id="nPOch0CB" type="checkbox"/></td>
		</tr>
	
		
		<tr><td colspan="2"><hr>System Flags to Notify via PushOver:</td>
		</tr>
		<tr>
		<td colspan="2" style="text-align:center">
<button class="vbut" onclick="selSF('P',true)">Select All</button>
<button class="vbut" onclick="selSF('P',false)">Deselect All</button>
 Or Copy From: 
 <button class="vbut" onclick="copySF('T','P')">Texting</button>
 <button class="vbut" onclick="copySF('E','P')">Emails</button>
 </td>
 </tr>
<tr></tr>
<tr>
		<td id="nPOsf" colspan="2"><table><tr><td>
<div style="overflow-y:scroll; overflow-x:hidden; height:100px;width:250px"><table class="varTable" style="overflow-y:scroll;height:100px;width:500px"><tr><td>
<label><input type="checkbox" id="sfP1">Confirm Devices</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP2">Engineer Working</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP3">Panel Lid Tamper</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP4">Auxiliary Tamper</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP5">Bell Tamper</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP6">Auxiliary Fuse Blown</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP7">Mains Power Off</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP8">ATS Path Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP9">Coms Failed</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP10">Fully Armed</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP11">System Open</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP12">Courtesy Light</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP13">Battery Test On</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP14">Battery Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP15">Bell Fuse Blown</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP16">Service Required</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP17">Custom 1 Stage B</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP18">Custom 1 Stage A</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP19">Confirmed Alarm</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP20">UDL Enabled</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP21">UDL Call Active</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP22">UDL Lockout</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP23">Coms Active</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP24">Coms Successful</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP25">Custom 3 Stage A</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP26">Radio-Pad Lost</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP27">No Radio-Pad Signal</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP28">Radio-Pad Successful</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP29">Radio-Pad Failed</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP30">Custom 2 Stage A or B</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP31">Custom 2 Stage B</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP32">Custom 2 Stage A</label></td></tr>
</table></div></td><td>

<div style="overflow-y:scroll; overflow-x:hidden; height:100px;width:250px"><table class="varTable" style="overflow-y:scroll;height:100px;width:500px"><tr><td>
<label><input type="checkbox" id="sfP33">Com 1 No Signal</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP34">Com 2 Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP35">Com 1 Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP36">Custom 4 Stage A or B</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP37">Custom 4 Stage B</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP38">Custom 4 Stage A</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP39">Custom 3 Stage A or B</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP40">Custom 3 Stage B</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP41">CIE Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP42">No ATS Available</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP43">ATS Remote Test</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP44">Detector Test</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP45">Radio RX Tamper</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP46">Radio Jamming</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP47">Coms Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP48">Com 2 No Signal</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP49">IP Path Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP50">Com 3 Power On</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP51">Com 2 Power On</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP52">Com 1 Power On</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP53">PSU Mains Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP54">WD Test Active</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP55">PSU Battery Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP56">PSU Fuse Blown</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP57"><i>(empty)</i></label></td></tr><tr><td>
<label><input type="checkbox" id="sfP58"><i>(empty)</i></label></td></tr><tr><td>
<label><input type="checkbox" id="sfP59"><i>(empty)</i></label></td></tr><tr><td>
<label><input type="checkbox" id="sfP60"><i>(empty)</i></label></td></tr><tr><td>
<label><input type="checkbox" id="sfP61"><i>(empty)</i></label></td></tr><tr><td>
<label><input type="checkbox" id="sfP62">Charger Fault</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP63">PS Failure</label></td></tr><tr><td>
<label><input type="checkbox" id="sfP64">Low Fob Battery</label></td></tr></table></div></td></tr></table>
		</td>
		
		</tr>
		<tr><td>System Flag Notification Priority:</td>
		<td><select id="nPOsfPriDD"><option value="1">Normal</option><option value="2">High</option></select></td></tr>
		</table>
	<hr>
	<table width="500px">
		<tr align="center">
			<td><button class="vbut2" onclick="saveGet(7,1)" style="width: 150px">
			Save Just This Page
			</button></td>
			<td><button class="vbut2" onclick="saveGet(0,1)" style="width: 150px"><b>
			Save All Pages</b>
			</button></td>
		</tr>
		<tr align="center">
			<td><button class="vbut2" onclick="saveGet(7,0)" style="width: 150px">
			Reload Just This Page
			</button></td>
			<td><button class="vbut2" onclick="saveGet(0,0)" style="width: 150px"><b>
			Reload All Pages</b>
			</button></td>
		</tr>
	</table>
</div>
<div id="Pushover" class="tabcontent">
	<h3>Pushover Account Settings</h3>
<button class="vbut2" style="margin:5px 5px 5px 5px" onclick="innerTab('Pushover','Notifications')">< Back To Notifications Home</button><button class="vbut2" style="margin:5px 5px 5px 5px" onclick="innerTab('Pushover','PO')">On To Pushover Notifications ></button><br>
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
	</table>
	<hr>
	<table width="500px">
		<tr align="center">
			<td><button class="vbut2" onclick="saveGet(8,1)" style="width: 150px">
			Save Just This Page
			</button></td>
			<td><button class="vbut2" onclick="saveGet(0,1)" style="width: 150px"><b>
			Save All Pages</b>
			</button></td>
		</tr>
		<tr align="center">
			<td><button class="vbut2" onclick="saveGet(8,0)" style="width: 150px">
			Reload Just This Page
			</button></td>
			<td><button class="vbut2" onclick="saveGet(0,0)" style="width: 150px"><b>
			Reload All Pages</b>
			</button></td>
		</tr>
	</table>
</div>

<div id="Texting" class="tabcontent">
	<h3>Text Messaging</h3>
<button class="vbut2" style="margin:5px 5px 5px 5px" onclick="innerTab('Texting','Notifications')">< Back To Notifications Home</button><button class="vbut2" style="margin:5px 5px 5px 5px" onclick="innerTab('Texting','TXT')">On To Text Notifications ></button><br>
Uses the <a href="http://www.clickatell.com" target="_blank">Clickatell</a> Service. <br>You must have a (free) account	and have registered at least one phone number.
 <hr>
	<table class="varTable">
		
		<tr>
			<td>Clickatell App Key</td>
			<td><input id="nTXTappkey" placeholder="Clickatell App Key" type="text" /></td>
		</tr>
		
<tr><td colspan="2">UK Phone Numbers to Text: <font size="1">(international option coming soon)</font></td></tr>
	</table>

<div style="overflow-y:scroll; overflow-x:hidden; height:155px;width:510px"><table class="varTable" style="overflow-y:scroll;height:100px;width:500px">
		

		<tr id="nTXTnums">
			<td><button onclick="del(1,'text')">X</button></td>
			<td><input id="text1a" placeholder="Phone Number 1" style="width:360px"/></td>
		</tr>
		<tr>
			<td><button onclick="del(2,'text')">X</button></td>
			<td><input id="text2a" placeholder="Phone Number 2"  style="width:360px"/></td>
		</tr>
		<tr>
			<td><button onclick="del(3,'text')">X</button></td>
			<td><input id="text3a" placeholder="Phone Number 3"  style="width:360px"/></td>
		</tr>
		<tr>
			<td><button onclick="del(4,'text')">X</button></td>
			<td><input id="text4a" placeholder="Phone Number 4"  style="width:360px"/></td>
		</tr>
		<tr>
			<td><button onclick="del(5,'text')">X</button></td>
			<td><input id="text5a" placeholder="Phone Number 5"  style="width:360px"/></td>
		</tr>
		<tr>
			<td><button onclick="del(6,'text')">X</button></td>
			<td><input id="text6a" placeholder="Phone Number 6"  style="width:360px"/></td>
		</tr>
		<tr>
			<td><button onclick="del(7,'text')">X</button></td>
			<td><input id="text7a" placeholder="Phone Number 7"  style="width:360px"/></td>
		</tr>
		<tr>
			<td><button onclick="del(8,'text')">X</button></td>
			<td><input id="text8a" placeholder="Phone Number 8"  style="width:360px"/></td>
		</tr>
		<tr>
			<td><button onclick="del(9,'text')">X</button></td>
			<td><input id="text9a" placeholder="Phone Number 9" style="width:360px" /></td>
		</tr>
		<tr>
			<td><button onclick="del(10,'text')">X</button></td>
			<td><input id="text10a" placeholder="Phone Number 10" style="width:360px" /></td>
		</tr>
	</table>
	</div>
	<hr>
	<table width="500px">
		<tr align="center">
			<td><button class="vbut2" onclick="saveGet(9,1)" style="width: 150px">Save 
			Just This Page
			</button></td>
			<td><button class="vbut2" onclick="saveGet(0,1)" style="width: 150px"><b>
			Save All Pages</b>
			</button></td>
		</tr>
		<tr align="center">
			<td><button class="vbut2" onclick="saveGet(9,0)" style="width: 150px">
			Reload Just This Page
			</button></td>
			<td><button class="vbut2" onclick="saveGet(0,0)" style="width: 150px"><b>
			Reload All Pages</b>
			</button></td>
		</tr>
	</table>
</div>

<div id="Emailing" class="tabcontent">
	<h3>Emails</h3>
<button class="vbut2" style="margin:5px 5px 5px 5px" onclick="innerTab('Emailing','Notifications')">< Back To Notifications Home</button><button class="vbut2" style="margin:5px 5px 5px 5px" onclick="innerTab('Emailing','EM')">On To Email Notifications ></button><br>
Uses the <a href="https://www.smtp2go.com/" target="_blank">SMTP2GO</a> Service. <br>You must sign up for a (free) account.
<hr> 
	<table class="varTable">
		
		<tr>
			<td>Your email address</td>
			<td><input id="nEMf" placeholder="Your email address" type="text" /></td>
		</tr>

		<tr>
			<td>SMTP2GO Username</td>
			<td><input id="nEMusr" placeholder="SMTP2GO Username" type="text" /></td>
		</tr>

		<tr>
			<td>SMTP2GO Password</td>
			<td><input id="nEMpw" placeholder="SMTP2GO Password" type="text" /></td>
		</tr>
		<tr><td colspan="2" style="text-align:center">Email addresses to notify:</td></tr>
	</table>
<div style="overflow-y:scroll; overflow-x:hidden; height:155px;width:510px"><table class="varTable" style="overflow-y:scroll;height:100px;width:500px">

		<tr id="nEMt">
			<td><button onclick="del(1,'email')">X</button></td>
			<td><input id="email1a" placeholder="Email Recipient 1" style="width:360px"/></td>
		</tr>
		<tr>
			<td><button onclick="del(2,'email')">X</button></td>
			<td><input id="email2a" placeholder="Email Recipient 2"  style="width:360px"/></td>
		</tr>
		<tr>
			<td><button onclick="del(3,'email')">X</button></td>
			<td><input id="email3a" placeholder="Email Recipient 3"  style="width:360px"/></td>
		</tr>
		<tr>
			<td><button onclick="del(4,'email')">X</button></td>
			<td><input id="email4a" placeholder="Email Recipient 4"  style="width:360px"/></td>
		</tr>
		<tr>
			<td><button onclick="del(5,'email')">X</button></td>
			<td><input id="email5a" placeholder="Email Recipient 5"  style="width:360px"/></td>
		</tr>
		<tr>
			<td><button onclick="del(6,'email')">X</button></td>
			<td><input id="email6a" placeholder="Email Recipient 6"  style="width:360px"/></td>
		</tr>
		<tr>
			<td><button onclick="del(7,'email')">X</button></td>
			<td><input id="email7a" placeholder="Email Recipient 7"  style="width:360px"/></td>
		</tr>
		<tr>
			<td><button onclick="del(8,'email')">X</button></td>
			<td><input id="email8a" placeholder="Email Recipient 8"  style="width:360px"/></td>
		</tr>
		<tr>
			<td><button onclick="del(9,'email')">X</button></td>
			<td><input id="email9a" placeholder="Email Recipient 9" style="width:360px" /></td>
		</tr>
		<tr>
			<td><button onclick="del(10,'email')">X</button></td>
			<td><input id="email10a" placeholder="Email Recipient 10" style="width:360px" /></td>
		</tr>
	</table>
	</div>
	<hr>
	<table width="500px">
		<tr align="center">
			<td><button class="vbut2" onclick="saveGet(10,1)" style="width: 150px">
			Save Just This Page
			</button></td>
			<td><button class="vbut2" onclick="saveGet(0,1)" style="width: 150px"><b>
			Save All Pages</b>
			</button></td>
		</tr>
		<tr align="center">
			<td><button class="vbut2" onclick="saveGet(10,0)" style="width: 150px">
			Reload Just This Page
			</button></td>
			<td><button class="vbut2" onclick="saveGet(0,0)" style="width: 150px"><b>
			Reload All Pages</b>
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
		document.getElementById('connDesc').innerHTML='Connection Settings (IP:Port):'
		document.getElementById('connSettS').innerHTML='<input id="inpIP" type="text" placeholder="eg. 192.168.1.100" value="'+Fget('PanelIP')+'" style="width:125px"/> : <input id="inpPort" type="text" placeholder="eg. 10001" value="'+Fget('PanelPort')+'"  style="width:75px"/>'
	}
	else {
		document.getElementById('connDesc').innerHTML='Connection Settings: <div class="Ttooltip">(?)  <span class="Ttooltiptext">Go into <br><i>"Apps"</i><br>then<br><i>"Serial Port Configuration"</i><br> choose the Texecom Elite Device <br>and set the following options:<hr>Baud Rate: 19200,<br>Parity: None,<br>Data Bits: 8,<br>Stop Bits: 2</span></div>'
		document.getElementById('connSettS').innerHTML='Ensure Serial Port is configured.'
	}
}
function populate(id){
	document.getElementById(id).value=Fget('CctsUsed')
}
function cb24(cb){
	if(document.getElementById(cb+'z2a24').checked==true){
		document.getElementById(cb+'z2aAF').disabled=true
		document.getElementById(cb+'z2aAP').disabled=true
		document.getElementById(cb+'z2aBF').disabled=true
		document.getElementById(cb+'z2aBP').disabled=true
	}else{
		document.getElementById(cb+'z2aAF').disabled=false
		document.getElementById(cb+'z2aAP').disabled=false
		document.getElementById(cb+'z2aBF').disabled=false
		document.getElementById(cb+'z2aBP').disabled=false
	}
}
function cbPop(){
	str=Fget('CctsUsed')
	z24=Fget('24 Hour Zones (NEVER disarmed by Vera)')
	AF=Fget('Zones to arm in Area A Full Set')
	AP=Fget('Zones to arm in Area A Part Set')
	BF=Fget('Zones to arm in Area B Full Set')
	BP=Fget('Zones to arm in Area B Part Set')
	arr = str.split(",");
	for (i=0;i<arr.length;i++){
		if(Number(arr[i])!=0 && Number.isInteger(Number(arr[i])) ){
			if(z24.indexOf(String(arr[i]))!=-1){
				document.getElementById(Number(arr[i])+'z2a24').checked=true
			}else{
				document.getElementById(Number(arr[i])+'z2a24').checked=false
			}
			cb24(Number(arr[i]))
			if(AF.indexOf(String(arr[i]))!=-1){
				document.getElementById(Number(arr[i])+'z2aAF').checked=true
			}else{
				document.getElementById(Number(arr[i])+'z2aAF').checked=false
			}
			if(AP.indexOf(String(arr[i]))!=-1){
				document.getElementById(Number(arr[i])+'z2aAP').checked=true
			}else{
				document.getElementById(Number(arr[i])+'z2aAP').checked=false
			}
			if(BF.indexOf(String(arr[i]))!=-1){
				document.getElementById(Number(arr[i])+'z2aBF').checked=true
			}else{
				document.getElementById(Number(arr[i])+'z2aBF').checked=false
			}
			if(BP.indexOf(String(arr[i]))!=-1){
				document.getElementById(Number(arr[i])+'z2aBP').checked=true
			}else{
				document.getElementById(Number(arr[i])+'z2aBP').checked=false
			}
		}	
	}
}
function cbGet(){
	str=Fget('CctsUsed')
	AF=''
	AP=''
	z24=''
	BF=''
	BP=''
	arr = str.split(",");
	for (i=0;i<arr.length;i++){
		if(Number(arr[i])!=0 && Number.isInteger(Number(arr[i])) ){
			if(document.getElementById(Number(arr[i])+'z2a24').checked==true){
			z24+=String(arr[i])+','
			}
			if(document.getElementById(Number(arr[i])+'z2aAF').checked==true){
			AF+=String(arr[i])+','
			}
			if(document.getElementById(Number(arr[i])+'z2aAP').checked==true){
			AP+=String(arr[i])+','
			}
			if(document.getElementById(Number(arr[i])+'z2aBF').checked==true){
			BF+=String(arr[i])+','
			}
			if(document.getElementById(Number(arr[i])+'z2aBP').checked==true){
			BP+=String(arr[i])+','
			}
		}	
	}
	Fsave('24 Hour Zones (NEVER disarmed by Vera)',z24)
	Fsave('Zones to arm in Area A Full Set',AF)
	Fsave('Zones to arm in Area A Part Set',AP)
	Fsave('Zones to arm in Area B Full Set',BF)
	Fsave('Zones to arm in Area B Part Set',BP)
}

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
function ipSaveGet(saveit){
	if(saveit==1){
		if (document.getElementById('IP/SerialDD').value=='i'){
			Fsave('PanelIP',document.getElementById('inpIP').value)
			Fsave('PanelPort',document.getElementById('inpPort').value)
			Fipset(document.getElementById('inpIP').value+':'+document.getElementById('inpPort').value)
		}
		else{	
			Fipset('')
		}
	}
	else{ //loading
		if (document.getElementById('IP/SerialDD').value=='i'){
			document.getElementById('inpIP').value=Fget('PanelIP')
			document.getElementById('inpPort').value=Fget('PanelPort')
		}
	}
}
function saveGet(page,saveit){
	if(page==1 || page==0){//connection setup or all
		operation('TexecomVersion',saveit)
		operation('Panel UDL Code',saveit)
		operation('Panel Engineer Code',saveit)
		operation('IP/SerialDD',saveit)
		setTimeout(function(){ipSaveGet(saveit)},100)
		ipser()		
		operation('Panel TypeDD',saveit)
		operation('pcopDD',saveit)		
	}	
	if(page==2 || page==0){//zone setup or all
		operation('Used Zones to be Ignored (Format: 001,002,003)',saveit)
		operation('Unused Zones to be Added (Format: 001,002,003)',saveit)
		//operation('24 Hour Zones (NEVER disarmed by Vera)',saveit)
		operation('MaxPartitionsDD',saveit)
		if(saveit==0){//load
			document.getElementById('z2aTable').innerHTML=''
			str=Fget('CctsUsed')
			arr = str.split(",");
   			for (i=0;i<arr.length;i++){
    			if(Number(arr[i])!=0 && Number.isInteger(Number(arr[i])) ){
	    			tbl=document.getElementById('z2aTable')
	    			row=tbl.insertRow(i)
	      			c0=row.insertCell(0)
	    			c0.width=25
	    			c1=row.insertCell(1)
	    			c1.width=25
	    			c2=row.insertCell(2)
	    			c2.width=25
	    			c3=row.insertCell(3)
	    			c3.width=25
	    			c4=row.insertCell(4)
	    			c4.width=25
	    			c5=row.insertCell(5)
	    			c5.width=25
	    			c6=row.insertCell(6)
	    			c0.innerHTML='<input type="checkbox" id="'+Number(arr[i])+'z2a24" onchange="cb24('+Number(arr[i])+')">'
	    			c1.innerHTML='<input type="checkbox" id="'+Number(arr[i])+'z2aAF">'
	    			c2.innerHTML='<input type="checkbox" id="'+Number(arr[i])+'z2aAP">'
	    			c3.innerHTML='<input type="checkbox" id="'+Number(arr[i])+'z2aBF">'
	    			c4.innerHTML='<input type="checkbox" id="'+Number(arr[i])+'z2aBP">'
	    			c5.innerHTML=String(arr[i])
	    			c6.id='z2a'+Number(arr[i])+'Name'
				}
			}
			setTimeout(function(){
			    for (i=0;i<arr.length;i++){
			    	if(Number(arr[i])!=0 && Number.isInteger(Number(arr[i])) ){
						n=Fget('Cct '+Number(arr[i])+' Text')
						document.getElementById('z2a'+Number(arr[i])+'Name').innerHTML=n
					}
				}
			},50)
			setTimeout(function(){cbPop()},100)
		}
		else{//save
			cbGet()
		}
	}
	
	if(page==3 || page==0){//zone names or all
		operation('Grab Zone Names on Next LUUP Restart (1= Yes, 0=No)CB',saveit)
		if(saveit==0){
			document.getElementById('zonesetup').innerHTML=''
			str=Fget('CctsUsed')
			arr = str.split(",");
			
   			for (i=0;i<arr.length;i++){
    			if(Number(arr[i])!=0 && Number.isInteger(Number(arr[i])) ){
	    			tbl=document.getElementById('zonesetup')
	    			row=tbl.insertRow(i)
	      			c0=row.insertCell(0)
	      			c1=row.insertCell(1)
	      			c2=row.insertCell(2)
	      			c0.innerHTML='Circuit '+Number(arr[i])
	    			c1.innerHTML='<input id="Cct '+Number(arr[i])+' Text" type="text"  placeholder="Circuit '+Number(arr[i])+' Text"   style="width:215px" value="" />'
	    			c2.innerHTML='<select id="z'+Number(arr[i])+'tDD" ><option value="">Auto</option><option value="01 ">Door</option><option value="04 ">PIR/Misc</option><option value="09 ">Smoke Detector</option></select>'
					//document.getElementById('zonesetup').innerHTML+='<tr><td></td><td></td></tr>'
				}
			}
			setTimeout(function(){
			    for (i=0;i<arr.length;i++){
			    	if(Number(arr[i])!=0 && Number.isInteger(Number(arr[i])) ){
						operation('Cct '+Number(arr[i])+' Text',saveit)
						operation('z'+Number(arr[i])+'tDD',saveit)
						ddv=document.getElementById('z'+Number(arr[i])+'tDD').value
						if(ddv=='02 '){//if ee2 then set as ee1
						ddv='01 '
						document.getElementById('z'+Number(arr[i])+'tDD').value='01 '
						}
						if(ddv!='01 '&&ddv!='04 '&& ddv!='09 '){//if not recognised set to auto
						document.getElementById('z'+Number(arr[i])+'tDD').value=''
						}
					}
				}
			},50)
		}
		else{
		    for (i=0;i<arr.length;i++){
		    	if(Number(arr[i])!=0 && Number.isInteger(Number(arr[i])) ){
					operation('Cct '+Number(arr[i])+' Text',saveit)
					operation('z'+Number(arr[i])+'tDD',saveit)					
				}
			}
		}
	}	
	if(page==4 || page==0){//pushover or all
		operation('usePOCB',saveit)
		operation('useEMCB',saveit)
		operation('useTXTCB',saveit)
		
	}
	if(page==5 || page==0){//email notifications or all
		operation('nEMhead',saveit)
		operation('nEMsubj',saveit)
		operation('nEMch0CB',saveit)
		operation('nEMch4CB',saveit)
       	//sysflags EM
       	if(saveit==0){//loading
			var sfe = Fget('nEMsf')
		    for (i = 1; i <= 64; i++) {
			    if(sfe.indexOf('|'+i+'|')== -1){
			    	document.getElementById('sfE'+i).checked=false
			   	}else{
			    	document.getElementById('sfE'+i).checked=true
			    }
    		}
    		document.getElementById('nEMsf').value=sfe

    	} else{//saving	
    		str=''
			for (i=1; i<=64;i++){
				if(document.getElementById('sfE'+i).checked==true){
					str+='|'+i+'|'
				}
			}

    		document.getElementById('nEMsf').value=str
 			operation('nEMsf',1)
       	}

	}
	if(page==6 || page==0){//text notifications or all

		operation('nTXTch0CB',saveit)
		operation('nTXTch4CB',saveit)
		operation('nTXThead',saveit)
       	//sysflags TXT
       	if(saveit==0){//loading
			var sft = Fget('nTXTsf')
		    for (i = 1; i <= 64; i++) {
			    if(sft.indexOf('|'+i+'|')== -1){
			    	document.getElementById('sfT'+i).checked=false
			   	}else{
			    	document.getElementById('sfT'+i).checked=true
			    }
    		}
    		document.getElementById('nTXTsf').value=sft
    	} else{//saving	
    		str=''
			for (i=1; i<=64;i++){
				if(document.getElementById('sfT'+i).checked==true){
					str+='|'+i+'|'
				}
			}

    		document.getElementById('nTXTsf').value=str
 			operation('nTXTsf',1)
       	}

	}

	
	if(page==7 || page==0){//pushover notifications or all

		operation('PushOver Message Title',saveit)
		operation('nPOch4CB',saveit)
		operation('nPOch0CB',saveit)
       	//sysflags PO
		if(saveit==0){//loading
			var sfp = Fget('nPOsf')
		    for (i = 1; i <= 64; i++) {
			    if(sfp.indexOf('|'+i+'|')== -1){
			    	document.getElementById('sfP'+i).checked=false
			   	}else{
			    	document.getElementById('sfP'+i).checked=true
			    }
    		}
    		document.getElementById('nPOsf').value=sfp
    	} else{//saving	
    		str=''
			for (i=1; i<=64;i++){
				if(document.getElementById('sfP'+i).checked==true){
					str+='|'+i+'|'
				}
			}

    		document.getElementById('nPOsf').value=str
 			operation('nPOsf',1)
       	}
		operation('nPOsfPriDD',saveit)
		
	}
	if(page==8 || page==0){//pushover setup or all

		operation('PushOver App Token',saveit)
		operation('PushOver User Token',saveit)
		operation('Pushover Alarm SoundDD',saveit)
		operation('PushOver - Alarm Message Repeats Every (sec)',saveit)
		operation('PushOver - Alarm Stops Retrying After: (min)',saveit)
		operation('PushOver - Device Token For Alarm Notifications (Blank = All Devices With User Token)',saveit)
		operation('PushOver Set/Unset SoundDD',saveit)
		operation('PushOver - Device To Receive Set/Unset Notifications (Blank = All With User Token)',saveit)
	}
	if(page==9 || page==0){//texting setup or all

		operation('nTXTappkey',saveit)
		if(saveit==0){//loading
			var txtnums=Fget('nTXTnums')
		    var res = txtnums.split("<");
		    for (i = 1; i < res.length; i++) {
			    res[i]=res[i].substr(0,res[i].length-1)
    			document.getElementById('text'+i+'a').value=res[i]
    		}
    	} else{//saving
    		r=''
    		for (i = 1; i <= 10; i++) {
			    if(document.getElementById('text'+i+'a').value!=''){
			    	r+='<'+document.getElementById('text'+i+'a').value+'>'
			    }

    		}
    		document.getElementById('nTXTnums').value=r
 			operation('nTXTnums',1)
       	}
	}
	if(page==10 || page==0){//email setup or all

		operation('nEMf',saveit)
		operation('nEMusr',saveit)
		operation('nEMpw',saveit)
		//EMAIL ADDRESSES
		if(saveit==0){//loading
			var emailaddrs=Fget('nEMt')
		    var res = emailaddrs.split("<");
		    for (i = 1; i < res.length; i++) {
			    res[i]=res[i].substr(0,res[i].length-1)
    			document.getElementById('email'+i+'a').value=res[i]
    		}
    	} else{//saving
    		r=''
    		for (i = 1; i <= 10; i++) {
			    if(document.getElementById('email'+i+'a').value!=''){
			    	r+='<'+document.getElementById('email'+i+'a').value+'>'
			    }

    		}
    		document.getElementById('nEMt').value=r
 			operation('nEMt',1)
       	}
	}
	if(saveit){
		setTimeout(relPrompt(),250) //delayed to allow time for ip operations
	}
}
function relPrompt(){
	if (confirm('Restart Luup?')) {
 		Freloadluup()
	}
}
    	
function copySF(from,to){
	for (i = 1; i <= 64; i++) {
		document.getElementById('sf'+to+i).checked=document.getElementById('sf'+from+i).checked
	}
}
function selSF(from,to){
	for (i = 1; i <= 64; i++) {
		document.getElementById('sf'+from+i).checked=to
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

function del(c,t){
	document.getElementById(t+c+"a").value=""
	document.getElementById(t+c+"b").value=""
}
//function Fget(k){if(k=='CctsUsed'){return '001,002,009,100,101,209,098,069'} else if(k=='IP/Serial') {return 's'}else {return k}}

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

