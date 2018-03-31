var Panel_Svc = 'urn:micasaverde-com:serviceId:TexecomAlarmPanel1';	
var deviID='';
function Launch_Rkp(deviceID) {
	var KeypadDisplay1  = get_device_state(deviceID,  Panel_Svc, 'KeypadDisplay1', 1);
    var KeypadDisplay2  = get_device_state(deviceID,  Panel_Svc, 'KeypadDisplay2', 1);
    var Status  = get_device_state(deviceID,  Panel_Svc, 'Status', 1);
    var SysV  = get_device_state(deviceID,  Panel_Svc, 'SysV', 1);
    var SysC  = get_device_state(deviceID,  Panel_Svc, 'SysC', 1);
    var BattV  = get_device_state(deviceID,  Panel_Svc, 'BattV', 1);
    var BattC  = get_device_state(deviceID,  Panel_Svc, 'BattC', 1);
    var PollTime  = get_device_state(deviceID,  Panel_Svc, 'PollTime', 1);
    var LastPollTime  = get_device_state(deviceID,  Panel_Svc, 'LastPollTime', 1);
    deviID=deviceID
    var html =  '<head><link href="https://fonts.googleapis.com/css?family=Droid Sans Mono" rel="stylesheet"><style>.button {    background-color: #BBBBBB;    border: none;    float: left;    color: white;    text-align: center;    text-decoration: none;    font-size: 16px;    margin: 4px 2px;    padding: 5px;    border-radius: 40%;    border: 2px solid #000000;    width: 70px;    height: 70px;    font-family: "Arial";}table {    align: centre;    border-collapse: collapse;    font-family: "Droid Sans Mono";    font-size: 24px;    white-space:pre-wrap;    letter-spacing: 2px;}  .lcd{border:1px solid black;}  .status{font-family: "Arial";    font-size: 12px;    border:1px solid black;    width:100%;}    .tr2:nth-child(even) {background-color: #f2f2f2}</style></head><body>';
    html += '<table id="lcd" align=center class="table lcd" width=400px><tr align=center><td id="lcd1">'+KeypadDisplay1+'</td></tr><tr align=center><td id="lcd2">'+KeypadDisplay2+'</td></tr></table>';
    html += '<p><table id="buttonTable" align=center width=400px><tr>		<td><button class="button" onclick="Fclick(\'1\')">    1     .?!</button></td>    	<td><button class="button" onclick="Fclick(\'2\')">    2   ABC</button></td>    	<td><button class="button" onclick="Fclick(\'3\')">    3     DEF</button></td>    	<td width=20px></td>    	<td><button class="button" onclick="Fclick(\'o\')">OMIT</button></td>    	<td><button class="button" onclick="Fclick(\'r\')">RESET</button></td>	</tr>	<tr>		<td><button class="button" onclick="Fclick(\'4\')">    4     GHI</button></td>    	<td><button class="button" onclick="Fclick(\'5\')">  5   JKL</button></td>    	<td><button class="button" onclick="Fclick(\'6\')">  6  MNO</button></td>    	<td width=20px></td>    	<td><button class="button" onclick="Fclick(\'c\')">CHIME</button></td>    	<td><button class="button" onclick="Fclick(\'u\')">/\\</button></td>	</tr>	<tr>		<td><button class="button" onclick="Fclick(\'7\')">  7 PQRS</button></td>   	<td><button class="button" onclick="Fclick(\'8\')">    8    TUV</button></td>    	<td><button class="button" onclick="Fclick(\'9\')">  9 WXYZ</button></td>    	<td width=20px></td>    	<td><button class="button" onclick="Fclick(\'p\')">PART</button></td>    	<td><button class="button" onclick="Fclick(\'d\')">\\/</button></td>	</tr>	<tr>		<td><button class="button" onclick="Fclick(\'y\')">YES</button></td>    	<td><button class="button" onclick="Fclick(\'0\')">      0        [_]</button></td>    	<td><button class="button" onclick="Fclick(\'n\')">NO</button></td>    	<td width=20px></td>    	<td><button class="button" onclick="Fclick(\'a\')">AREA</button></td>    	<td><button class="button" onclick="Fclick(\'m\')">MENU</button></td>	</tr>    </table> <iframe id="ButtF" src="demo_iframe.htm" width="0" height="0" style="border:none;"></iframe>   ';
    html += '<p></p>    <table id="status" class="table status">	<tr class="tr2">		<td align="Right">Status:</td>		<td colspan="3" id="s1">'+Status+'</td>    </tr>	<tr class="tr2">		<td align="Right">Polling Every:</td>		<td id="s6">'+PollTime+'</td>		<td align="Right">Last Poll Time:</td>		<td id="s7">'+LastPollTime+'</td>    </tr>	<tr class="tr2">		<td align="Right">System Voltage:</td>		<td id="s2">'+SysV+'</td>		<td align="Right">System Current:</td>		<td id="s3">'+SysC+'</td>    </tr>	<tr class="tr2">		<td align="Right">Battery Voltage:</td>		<td id="s4">'+BattV+'</td>		<td align="Right">Battery Current:</td>		<td id="s5">'+BattC+'</td>    </tr>    </table></body>';
 
    
    set_panel_html(html);
    setInterval(FReload,500,deviceID);
}
function Fclick(buttonP){
	var deviceID=deviID;
    	document.getElementById('buttonTable').style.opacity=0.6;
    	setTimeout("document.getElementById('buttonTable').style.opacity=1.0;", 1200);
    	var ipaddress = data_request_url;
    	var addr = ipaddress + 'id=action&output_format=xml&DeviceNum='+deviceID+'&serviceId=urn:micasaverde-com:serviceId:TexecomAlarmPanel1&action=keyPress&newKeyPress='+buttonP;	
    	window.document.getElementById("ButtF").src = addr;	
	
    //	window.alert(addr);

    	///	var myWindow = window.open(addr, "myWindow", "width=400,height=100"); 
    }

function FReload(devID){

	var KeypadDisplay1  = get_device_state(devID,  Panel_Svc, 'KeypadDisplay1', 1);
    var KeypadDisplay2  = get_device_state(devID,  Panel_Svc, 'KeypadDisplay2', 1);
    var Status  = get_device_state(devID,  Panel_Svc, 'Status', 1);
    var SysV  = get_device_state(devID,  Panel_Svc, 'SysV', 1);
    var SysC  = get_device_state(devID,  Panel_Svc, 'SysC', 1);
    var BattV  = get_device_state(devID,  Panel_Svc, 'BattV', 1);
    var BattC  = get_device_state(devID,  Panel_Svc, 'BattC', 1);
    var PollTime  = get_device_state(devID,  Panel_Svc, 'PollTime', 1);
    var LastPollTime  = get_device_state(devID,  Panel_Svc, 'LastPollTime', 1);
    window.document.getElementById("lcd1").innerHTML = KeypadDisplay1;	
    window.document.getElementById("lcd2").innerHTML = KeypadDisplay2;
    window.document.getElementById("s1").innerHTML = Status;	
    window.document.getElementById("s2").innerHTML = SysV;
    window.document.getElementById("s3").innerHTML = SysC;	
    window.document.getElementById("s4").innerHTML = BattV;
    window.document.getElementById("s5").innerHTML = BattC;	
	window.document.getElementById("s6").innerHTML = PollTime;
	window.document.getElementById("s7").innerHTML = LastPollTime;
}

