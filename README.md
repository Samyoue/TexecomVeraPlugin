# TexecomVeraPlugin

Micasaverde Vera home automation controller plug-in to connect with a Texecom Premier Elite Series alarm panel

Uses Texecom Simple Protocol via IP or serial connection.  Supports  the following:
- Arm up to 2 Areas
- Part-arm up to 2 Areas
- Disarm up to 2 Areas
- Control of PC Outputs 1-4
- Polls zones every ~0.6s
- Reports zone status,
- Gathers Zone Names and types
- Reports partition status (including Exit/Entry started)
- Control and Control battery voltages/Current
- Keypad display
- Virtual Keypad in Vera 
- Comms status and auto attempts reconnection/reports failures
- Support for Pushover notifications upon zone active when zone is armed (Entry circuits only cause notification if Area assigned is in alarm)
                                            
Polling is  sequentially done in the following order:
- Zones
- Areas
- Zones
- Output Status
- Zones
- Keypad Display
- Zones
- Voltages
- Back to start

Poll times depend on your vera, mine averages a poll every 0.286s therefore my zones are updated every approx 0.572s (2x0.286s) and everything else approx every 2.288s (8x0.286s) 

© 2017-2027 Sam Youe


Notes:		This plug-in requires the Texecom Premier Elite firmware v1.0+ although it may work on Premier firmware version 9.06 or	later.  Earlier versions may not work correctly or at all. If your firmware version	is older than this you must flash the panel to upgrade to the latest firmware.
			
Please note this has been designed for Vera UI7. It may work with UI5 and as such I have included the original setup instructions for UI5 for Racarters Texecom version that this is based upon although much of it has been changed, the setup procedure should be the same, but if any steps do not seem right please adapt accordingly.

Getting Started (UI7)
---------------------

1	On the Vera dashboard menu on the left of the page select Apps -> Develop Apps -> Luup files,	then upload all files, ticking the box marked 'Restart Luup after upload'.
	
2	On the Vera menu select Apps --> Develop Apps --> Create device, then in the field called 'Upnp Device Filename' enter D_Texecom.xml.  Save, click 'Reload Luup' on the Serial port configuration page.

3	When Luup has restarted find the Texecom device block on the 'Devices' page on Vera	dashboard, then click the right arrow and open the 'Advanced' tab.
	
4	If you are using a network connection to the panel, enter IP address and port number in the 'ip' field, separated by a colon.  For example: 192.168.0.123:10001
	
5	If you are using a USB serial connection to the panel you must configure a suitable serial port on Vera to 19200 Baud, 8 bits, no parity, 2 stop bits and assign it to the Texecom device. (Apps>Develop Apps>Serial Port Configuration)

6	Click on Setup Panel, Setup options as necessary, paying close attention to Engineer Code and UDL code. Click Save All and when prompted, click OK to restart Luup. 

6b (This will migrate into the setup page soon) on the Device>Advanced page, in the 'altid' field, list the outputs to create, separated by commas in the format P01 for PC output 1.  For example to create all 4 PC controlled outputs as Vera Switches, enter "P01,P02,P03,P04". You may also create up to 8 X-10 Outputs this way using "X01" etc however I could not get my panel to support X-10 outputs and Texecom Tech support said it was effectively a depreciated technology so this *probably* wont work. The plug-in will currently allow up to 48 zones, 4 PC controlled outputs, 2 Areas, 1 Part Set per area.

6c On your alarm panel make sure that it is not set and not in engineer mode, then restart luup. The plugin should create 2 partitions, as many zones as you have programmed in your panel and the output devices as specified in Step 7 above. 
	
7	For network comms you must use a Texecom COM IP/COM WIFI module connected to a Com port on the panel and programmed appropriately.

7	For serial comms use a COM USB or PC COM lead connected to a Com port on the panel and programmed as nothing fitted

8	If you use Pushover messaging options, you will receive a notification on your phone or other Pushover-enabled device in an alarm state, detailing the zone that has tripped the alarm (or Set/Unset/Partset or Vera Restart notifications). If you specify a Device it will only deliver to that device. You must create your own Pushover App on the Pushover site and use the relevant user and app keys supplied by them.

9	Zone device blocks have two variables called LatchStatus and LatchPeriod.  When a zone
	is tripped, if LatchPeriod is non-zero, LatchStatus will be set to '1'.  When no further
	trips have occurred for the number of minutes set in LatchPeriod, LatchStatus will be
	set to '0'.  This feature can be used in a Vera scene to switch off lights etc. after
	a period of no movement in a room.  Set LatchPeriod to zero to disable this feature.
	
10.	You can also specify which zone is armed by partset/fullset etc on the Setup page. NB. When a circuit is omitted for partset by your alarm system (eg. Landing PIR), Vera displays this as the same icon as if it were active at the moment...


Getting Started (UI5)
---------------------
Alan Carter February 2016

1	On the Vera dashboard select APPS -> Develop Apps -> Luup files, then upload the 5 xml
	and 2 json files, ticking the box marked 'Restart Luup after upload'.
	
2	On the Vera dashboard select APPS --> Develop Apps --> Create device, then in the field
	called 'Upnp Device Filename' enter D_Texecom.xml.  Save, and restart Luup.

3	When Luup has restarted find the Texecom device block on the 'Devices' tab on Vera
	dashboard, then click the spanner and open the 'Advanced' tab.
	
4	In the 'altid' field list the devices you wish to create, separated by commas.  For example,
	to create 8 zones enter Z01,Z02,Z03,Z04,Z05,Z06,Z07,Z08.  To create 3 Digicom outputs enter
	X01,X02,X03.  To create 2 programmable outputs enter P01,P02. The plug-in will currently
	allow up to 20 zones, up to 8 Digicom outputs and up to 2 programmable outputs.
	
5	If you are using a network connection to the panel, enter IP address and port number
	in the 'ip' field, separated by a colon.  For example: 192.168.0.123:10001
	
6	If you are using a serial connection to the panel you must configure a suitable serial port
	on Vera to 19200 Baud, 8 bits, no parity, 2 stop bits and assign it to the Texecom device.
	
7	Restart Luup, after which the plug-in should create two partition devices and as many zone
	and output devices as specified in Step 4 above.  Partitions will be polled every 10 seconds
	and zones every 5 seconds.
	
8	On the Texecom panel set the UDL password to 1234 via keypad or Wintex.  If you wish to use
	a different UDL password you must edit and re-upload I_Texecom.xml then restart Luup.

9	For network comms you must use a Texecom COM IP module connected to the Com1 port on the panel.

10	For serial comms use a COM USB or PC COM lead connected to the Com1 port on the panel.
	
11	If you use Pushover messaging via the Vera 'Push Notification' app you can enter the
	Push Notification device number in the 'Vera Push Device' field, the Pushover Device
	name in the 'Pushover Device' field and the required sound in the 'Pushover Sound'
	field (in lower case).  You will then receive a notification on your phone or other
	Pushover-enabled device if the first line of the Texecom keypad display changes.
	(Since the second line of the keypad display often shows the time, only changes to the
	first line will generate a notification.)  If want the message sent to all of your
	Pushover devices, leave the 'Pushover Device' field blank.

12	Zone device blocks have two variables called LatchStatus and LatchPeriod.  When a zone
	is tripped, if LatchPeriod is non-zero, LatchStatus will be set to '1'.  When no further
	trips have occurred for the number of minutes set in LatchPeriod, LatchStatus will be
	set to '0'.  This feature can be used in a Vera scene to switch off lights etc. after
	a period of no movement in a room.  Set LatchPeriod to zero to disable this feature.

Any problems/comments, please feel free to contact me via the vera forum thread/PM,
http://forum.micasaverde.com/index.php/topic,77475.0.html

Sam.

PS Connect protocol is under development ;)
