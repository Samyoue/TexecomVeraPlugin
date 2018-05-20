-- - - - = = =  COPYRIGHT  = = = - - - -- 
-- - - - = = = SAMUEL YOUE = = = - - - -- 
-- - - - = = =  2017-2027  = = = - - - -- 
--local luup={} function luup.variable_get(s,n,d)  if(luup[n]==nil)then return '##ERROR-'..n..' = NIL-VALUE##'else return luup[n] end end function luup.variable_set(s,n,v,d)  luup[n]=v end function luup.call_timer(s,m,n,b) end function luup.sleep(s) end function luup.log(s) print(s) end

------------------------------------------------------------------------------------
-------------------------------USER FEDINED VARIABLES-------------------------------- 
------------------------------------------------------------------------------------

local POapp				=	""
local POuser			=	""
local POtitle			=	"Texecom Alarm System"
local POsoundV			=	"none"
local POdeviceV 		=	""
local POch4				=	1
local POdevCh4 = ""
local POch4sound = "none"
local POretry			=	"30"
local POexpireV 		=	"3"
local POrestart			=	'1'
local engCode			=	"1234"
local udlCode 			=	"1234"
local addUnusedCcts = "" 
local ignoreCcts = ""
local ZntD = ""
local ZiAF = "001,002"
local ZiAP = "001,002"
local ZiBF = ""
local ZiBP = ""
local CctsUsed='001'
------------------------------------------------------------------------------------
-------------------------------VARIABLES USED--------------------------------------- 
------------------------------------------------------------------------------------
TEXECOM_VERSION				=	"2.67"
local panelType = '48'
local outgoingPDU 			=	""
local incomingPDU 			=	""
local panel_device 			=	0
local partition_device1 	= 	0
local partition_device2 	=	0
local partition1_armed		=	0
local partition2_armed		=	0
local max_partitions		=	2	-- Maximum number of partitions to create (must be 1 or 2)
local max_zones 			=	48  -- Maximum number of zones to look for
local last_zone				=	0
local endzone				=	""
local last_x10				=	0
local last_pc				=	0
local previousEventType 	=	{}
local message_type 			=	""
local keypadDisplay1 		=	"                "
local keypadDisplay2 		=	"                "
local lastKeypadDisplay1 	=	"                "
local lastKeypadDisplay2 	=	"                "
local watchdog 				=	0
local retry 				=	0
local commFail 				=	0
local texReady				=	0
local timeNotSet			=	0
local nextOperation			=	8
local ui7Check				=	""
local alreadyArmed			=	0
local alreadyDisarmed		=	0
local SysV 					=	"0"
local SysC 					= 	"0"
local BattV 				= 	"0"
local BattC 				= 	"0"
local RefV 					= 	"0"
local Tracker 				= 	"0"
local PollTime 				= 	"0"
local ZoneT 				=	{}  -- x:T = zone x type, x:P = partition, x:N = Name (eg. "Hall PIR (z2), x:C = Circuit Number (eg. "002"), x:A = armed
local PollT 				=	"0"
local QnextOperation		=	1
local Qmessage_type			=	""
local QoutgoingPDU			=	""
local Zmsg 					=	"" 
local CurZN 				=	1 
local CurZn 				=	1 
local curZi 				=	1
local PanelConfigured 		=	0
local partitionStatusNotSet =	1
local zoneStatusNotSet 		=	1
local cctTxt				=	""
local restartCount			=	0
local okRestart 			=	1
local NumOfCcts 			=	""
local HtDev         = 0
PANEL_SID					=	"urn:micasaverde-com:serviceId:TexecomAlarmPanel1"
PARTITION_SID				=	"urn:micasaverde-com:serviceId:AlarmPartition2"
SECURITY_SID 				=	"urn:micasaverde-com:serviceId:SecuritySensor1"
SWITCH_SID					=	"urn:upnp-org:serviceId:SwitchPower1"
------------------------------------------------------------------------------------
-----------------------REQUIRED FOR VIRTUAL KEYPAD------------------------ 
------------------------------------------------------------------------------------
ButtonPush				= "0"    
ButtonPushed			= {}
ButtonPushed["0"]		= 0x0A
ButtonPushed["1"]		= 0x01
ButtonPushed["2"]		= 0x02
ButtonPushed["3"]		= 0x03
ButtonPushed["4"]		= 0x04
ButtonPushed["5"]		= 0x05
ButtonPushed["6"] 		= 0x06
ButtonPushed["7"] 		= 0x07
ButtonPushed["8"] 		= 0x08
ButtonPushed["9"] 		= 0x09
ButtonPushed["o"] 		= 0x0B --omit
ButtonPushed["m"] 		= 0x0C --menu
ButtonPushed["y"] 		= 0x0D --yes
ButtonPushed["p"] 		= 0x0E --part
ButtonPushed["n"] 		= 0x0F --no
ButtonPushed["a"] 		= 0x10 --area
ButtonPushed["c"] 		= 0x14 --chime
ButtonPushed["r"] 		= 0x15 --reset
ButtonPushed["u"] 		= 0x16 --up
ButtonPushed["d"] 		= 0x17 --down
ButtonPushed["46"]		= 0x11 --4+6
ButtonPushed["13"] 		= 0x12 --1+3
ButtonPushed["79"] 		= 0x13 --7+9
----------------------------------------------------
ocZ={}
ocZ["P01"] = "PC OP1"
ocZ["P02"] = "PC OP2"
ocZ["P03"] = "PC OP3"
ocZ["P04"] = "PC OP4"--[[
ocZ["LHoZ"] = "P01"
ocZ["RHoZ"] = "P02"
ocZ["LHoZocc"] = 0 --currently not occupied
ocZ["RHoZocc"] = 0
ocZ["LHoZoccPDU"] = string.char(0x01) -- PC op 1
ocZ["RHoZoccPDU"] = string.char(0x12) -- PC op 2
ocZ["LWMbuzPDU"] = string.char(0x10) -- PC op 3
ocZ["LWMsirenPDU"] = string.char(0x0C) -- PC op 4
]]
------------------------------------------------------------------------------------
--------------------- REQUIRED FOR PUSHOVER SUPPORT--------------------- 
------------------------------------------------------------------------------------
require("lxp/lom")

local url 		= require("socket.url")
local http	 	= require("socket.http")
local https		= require("ssl.https")
local POlastCh4	= 0
----------------------------------------------------------------------------------------
---------------------------------UTILITY FUNCTIONS---------------------------------
-----------------------------------------------------------------------------------------

-- Utility functions for bitwise operations:
--	
-- bitMask(val, pos): return true if a bit is set, false if clear.
-- val: number from 0 to 255
-- pos: power of two, value of bit being tested
function bitMask(val, pos)
  return (val % (pos*2) >= pos)
end

-- bitAnd(a, b): AND of two bytes.
-- a, b: numbers 0-255 to compute the bitwise AND
function bitAnd(a, b)
  local result = 0
  local pos = 1
  repeat
    if (bitMask(a, pos) and bitMask(b,pos)) then
      result = result + pos
    end
    pos = pos * 2
  until pos == 256
  return result
end

-- Convert PDU bytes to a string for logging 
function PDUtoString(PDU)
  local PDUstr = string.char()
  for i = 1, string.len(PDU) do
    PDUstr = PDUstr .. string.format("%02X ", string.byte(string.sub(PDU, i, i)))
  end
  return PDUstr
end

--  convert PDU to int
function PDUtoInt(str) -- use length of string to determine 8,16,32,64 bits
  local t={str:byte(1,-1)}
  local tt={}
  for k=1,#t do
    tt[#t-k+1]=t[k]
  end
  t=tt
  local n=0
  for k=1,#t do
    n=n+t[k]*2^((k-1)*8)
  end
  return n
end

-- Find child device
function findChild(deviceId, label)
  for k, v in pairs(luup.devices) do
    if (v.device_num_parent == deviceId and v.id == label) then
      return k
    end
  end
end

-- Set flag to tell incoming handler we're ready to accept data
function readyForRx()
  texReady = 1
end

-- Make message string url-friendly
function url_encode(str)
  if (str) then
    str = string.gsub (str, "\n", "\r\n")
    str = string.gsub (str, "([^%w ])", function (c) return string.format ("%%%02X", string.byte(c)) end)
    str = string.gsub (str, " ", "+")
  end
  return str
end

function trim(s)
  return s:find'^%s*$' and '' or s:match'^%s*(.*%S)'
end

function writeFile(path,cont)
  local wf = io.open(path,'w') 
  if wf then
    wf:write (cont)
    wf:close ()
    return(true)
  else
    return("ERROR No File Found: "..path)
  end
end

function readFile(path)
  local rf = io.open(path,'r')
  local cont = ''
  if rf then
    cont = rf:read ("*all")
    rf:close ()
    return(tonumber(cont))
  else
    return(0)
  end
end

-----------------------------------------------------------------------------------------
---------------------------------POLLING FUNCTIONS---------------------------------
-----------------------------------------------------------------------------------------

--  keep track of polling time
function pollTime()
  if(Tracker == 0) then
    dispatcher() 
    restartCount=restartCount+1
    if((restartCount==1) or (restartCount==3) or (restartCount==9)) then 
      incomingPDU = ""
      texecomSendPDU()
    elseif(restartCount==6) then 
      initialiseComms()
      luup.variable_set(PARTITION_SID, "VendorStatus", string.format("Comms retry") , partition_device1)
      if (max_partitions == 2) then
        luup.variable_set(PARTITION_SID, "VendorStatus", string.format("Comms retry") , partition_device2)
      end
    elseif (restartCount==12) then
      luup.variable_set(PARTITION_SID, "VendorStatus", string.format("Comms fail") , partition_device1)
      if (max_partitions == 2) then
        luup.variable_set(PARTITION_SID, "VendorStatus", string.format("Comms fail") , partition_device2)
      end
      commFail = 1
      if((okRestart ==1) or (okRestart =="1"))then
        luup.reload()
      end
    end
    luup.variable_set(PANEL_SID, "PollTime", "Error", panel_device) 
    luup.variable_set(PANEL_SID, "Status", "RESTARTING OPERATIONS: ".. restartCount, panel_device) 
  else
    restartCount=0
    pollT = 2 / Tracker --  poll response time
    pollT = string.format("%.3fs", pollT)
    Tracker = 0
    luup.variable_set(PANEL_SID, "PollTime", pollT, panel_device) --  poll response time
  end
  luup.call_timer("pollTime", 1,'2','', "")
end

-- dispatcher
-- Poll panel to get current data
function dispatcher2()
  --USED IN TESTING TO TEMP DISABLE DISPATCHER (IGNORE)
end
function dispatcher()
  if (nextOperation == 1) then
    nextOperation = nextOperation + 1
    luup.variable_set(PANEL_SID, "Status", "Getting Area Status", panel_device) 
--		getZoneStatus()
    getPartitionStatus()
--		checkZonesArmed()
  elseif (nextOperation == 3) then
    nextOperation = nextOperation + 1
    luup.variable_set(PANEL_SID, "Status", "Getting OP Status", panel_device) 
    if ((last_x10 > 0) or (last_pc > 0)) then
      getOutputStatus()
    else
      getZoneStatus()
    end
  elseif (nextOperation == 5) then
    nextOperation = nextOperation + 1
    luup.variable_set(PANEL_SID, "Status", "Getting Display ", panel_device) 
    getKeypad()

  elseif (nextOperation == 7) then
    nextOperation = nextOperation + 1
    luup.variable_set(PANEL_SID, "Status", "Getting Voltages etc", panel_device) 
    getVolts()
  elseif (nextOperation == 0) then
    luup.variable_set(PANEL_SID, "Status", "Extra Command ", panel_device) 
    ExtraCmd()
    nextOperation=QnextOperation -- next operations continue from requested point 
  else
    nextOperation = nextOperation + 1
    luup.variable_set(PANEL_SID, "Status", "Getting Zone Statuses", panel_device) 
    if (nextOperation > 8) then  -- loop back to start (dont include "extra command" in normal poll loop)
      nextOperation = 1
      luup.variable_set(PANEL_SID, "Status", "Polling Cycle", panel_device) 
    end
    getZoneStatus()
  end
end

--queue up an extra command (button push/op change) 
function Qcmd() 
  nextOperation = 0

end

--perform queued command
function ExtraCmd() 
  if (message_type == "N") then
    message_type=Qmessage_type
    outgoingPDU = QoutgoingPDU
    texecomSendPDU()
  else
    luup.call_timer("dispatcher", 1,'1','', "")
  end

end

-- Send a message to panel to get system voltages etc
function getVolts()
  if (message_type == "N") then
    message_type = "VOLTS"
    outgoingPDU = string.char(0x5C, 0x56, 0x2F)
    texecomSendPDU()
  else
    luup.call_timer("dispatcher", 1,'1','', "")
  end
end

-- Send a message to panel to get zone status
function getZoneStatus()
  if (message_type == "N") then
    luup.variable_set(PANEL_SID, "Status", "Getting cct Status", panel_device) 
    message_type = "Z"
    outgoingPDU = string.char(0x5C, 0x5A, 0x00) .. string.char(endzone) .. string.char(0x2F)
    texecomSendPDU()
  else
    luup.call_timer("dispatcher", 1,'1','', "")
  end 
end

-- Send a message to panel to get partition status
function getPartitionStatus()
  if (message_type == "N") then
    message_type = "P"
    outgoingPDU = string.char(0x5C, 0x50, 0x00, 0x18, 0x2F)
    texecomSendPDU()
  else
    luup.call_timer("dispatcher", 1,'1','', "")
  end
end    

-- Send a message to panel to get output status
function getOutputStatus()
  if (message_type == "N") then
    message_type = "O"
    outgoingPDU = string.char(0x5C, 0x4F, 0x3F, 0x2F)
    texecomSendPDU()
  else
    luup.call_timer("dispatcher", 1,'1','', "")
  end
end

-- Send a message to panel to get keypad display
function getKeypad()
  if (message_type == "N") then
    message_type = "L"
    outgoingPDU = string.char(0x5C, 0x4C, 0x2F)
    texecomSendPDU()
  else
    luup.call_timer("dispatcher", 1,'1','', "")
  end
end

---------------------------------------------------------------------------------------
---------------------------------SETUP FUNCTIONS---------------------------------
---------------------------------------------------------------------------------------

--setup default vars
function UIvar(name, default, service, device)
  local uivalue = luup.variable_get(service or PANEL_SID, name, device or panel_device)  
  if uivalue then
    --variable already assigned a value so leave alone
    return uivalue
  else
    service = service or PANEL_SID
    device = device or lul_device
    luup.variable_set (service, name, default, device)
    return default
  end

end

-- Send a message to panel to get panel details (ID and firmware version)
function getPanelDetails()
  if (message_type == "N") then
    message_type = "V"
    outgoingPDU = string.char(0x5C, 0x49, 0x2F)
    texecomSendPDU()
  else
    luup.call_timer("dispatcher", 1,'1','', "")
  end
end

-- Request access to panel. 
-- Note that Texecom will disable access if no command is sent within 60 seconds
function initialiseComms()

  udlCode = luup.variable_get(PANEL_SID, "Panel UDL Code", panel_device) 
  luup.variable_set(PANEL_SID, "Status", "Requesting Access- ".. udlCode, panel_device) 
  local retries = 0
  message_type = "I"
  incomingPDU = ""
  outgoingPDU = string.char(0x5C, 0x57).. udlCode.. string.char(0x2F) 
  if(  luup.variable_get(PANEL_SID, 'IP/Serial', panel_device) =='i') then
    luup.call_timer("texecomSendPDU", 1,'5','', "")
  else
    texecomSendPDU()
  end
  
end

-- Set panel time to Vera time at startup then on request 
function setPanelTime()
  t.year = t.year - 2000
  local retries = 0
  while (message_type ~= "N") do
    luup.sleep(500)
    retries = retries + 1
    if retries > 3 then 
      break
    end
  end
  message_type = "T"
  outgoingPDU = string.char(0x5C, 0x54) .. string.char(t.day, t.month, t.year, t.hour, t.min) .. string.char(0x2F)
  texecomSendPDU()
end


-- Send a message to panel to get zone programming 
function getZoneProg()
  if (message_type ~= "N") then
    luup.call_timer("getZoneProg", 1,'1','', "")
    luup.variable_set(PANEL_SID, "Status", "zp wait...".. message_type, panel_device) 
  else
    message_type = "ZP"
    luup.variable_set(PANEL_SID, "Status", "zp SENDg...", panel_device) 
    local panelType = luup.variable_get(PANEL_SID, "Panel Type", panel_device) 
    if(panelType==nil)then
      luup.variable_set(PANEL_SID, "Panel Type", "24", panel_device) 
      panelType ='24'
    end
    local panelType2=string.format('%X',panelType)
    if(string.len(panelType2)==1)then
      panelType2='0'..panelType2
    end

    panelByte=string.char(panelType2)
    outgoingPDU = string.char(0x5C, 0x51, 0x00)..panelByte..string.char(0x2F) --0C=12, 18=24, 30=48, (58=88 but 50=max)
    texecomSendPDU()
  end
end

-- Send a message to panel to simulate keypad input and retrieve zone names (used in AutoConfig) 
function ZnSendEng()
  luup.variable_set(PANEL_SID, "Status", "Logging into Engineer mode...1", panel_device)
  if (message_type == "N") then
    luup.variable_set(PANEL_SID, "Status", "Logging into Engineer mode...3", panel_device)
    if(luup.variable_get(PANEL_SID, "Grab Zone Names on Next LUUP Restart (1= Yes, 0=No)", panel_device)) ==  "1" then
      luup.variable_set(PANEL_SID, "Status", "Logging into Engineer mode...4", panel_device)
      local engLen = string.len(engCode)
      local engHex ="" 
      for i=1, engLen do
        local cd=string.sub(engCode, i, i)
        engHex = engHex.. string.char(ButtonPushed[cd]) 
      end
      engLen = engLen + 2
      engLen = string.format('0x%02d', engLen) 
      engLen=string.char(engLen)
      luup.variable_set(PANEL_SID, "Status", "Logging into Engineer mode...5", panel_device)
      message_type = "SENG"
      outgoingPDU = string.char(0x5C, 0x4B).. engLen..engHex.. string.char(0x0D, 0x0D, 0x2F) 
      texecomSendPDU()	

      luup.variable_set(PANEL_SID, "Grab Zone Names on Next LUUP Restart (1= Yes, 0=No)", "0", panel_device)
    else
      init2() --grab zone names not reqd so skip lengthy zone name retrieval
    end
  else
    luup.call_timer("ZnSendEng", 1,'1','', "") 	-- try again
  end
end

-- Send a message to panel to get keypad display
function ZnCheckEng()
  luup.variable_set(PANEL_SID, "Status", "Please Wait...", panel_device)

  if (message_type == "N") then
    luup.sleep(500)
    message_type = "CENG"
    outgoingPDU = string.char(0x5C, 0x4C, 0x2F)
    texecomSendPDU()
  else
    luup.call_timer("ZnCheckEng", 1,'1','', "")
  end
end

function ZnEngOk()
  if (message_type == "N") then
    if (string.sub(lastKeypadDisplay1, 1, 8) == "Zone 001") then
      luup.variable_set(PANEL_SID, "Status", "Success! Gathering Zone Names", panel_device)
      curZn = string.sub(CctsUsed, 1,3)
      local curZnHex = "" 
      for i=1, 3 do
        local cd=string.sub(curZn, i, i)
        curZnHex = curZnHex.. string.char(ButtonPushed[cd]) 
      end
      message_type = "ZNM1"
      outgoingPDU = string.char(0x5C, 0x4B, 0X06, 0x0D, 0x0D, 0x0D).. curZnHex.. string.char(0x2F) -- 5x yes (\unfortunately there is a 4 keypress limit so the 5th yes has to be on another)then first zone number
      texecomSendPDU()
    else
      luup.variable_set(PANEL_SID, "Status", "FAILED! Zone names unavailable", panel_device)
      zoneNameMacro3() --cant get into eng mode or already in so skip setting up zones (and log out if alrady logged in)  
    end
  else
    luup.call_timer("ZnEngOk", 1,'1','', "")
  end
end

--allocate 2nd line of text as dev name and move on
function zoneNameMacro1() 
  luup.variable_set(PANEL_SID, "Status", "znm1, msg ".. message_type, panel_device)

  if (message_type == "N") then
    luup.variable_set(PANEL_SID, "Status", "znm1 n - ".. curZn, panel_device)
    if (string.sub (curZn, 1, 2)=="00")then 
      curZN = string.sub (curZn, 3)
    elseif (string.sub (curZn, 1, 1)=="0")then 
      curZN = string.sub (curZn, 2)
    else
      curZN = curZn
    end
    luup.variable_set(PANEL_SID, "Status", curZN.. " - ".. lastKeypadDisplay2, panel_device)
    lastKeypadDisplay2 = string.gsub(lastKeypadDisplay2, "  ", "")
    ZoneT[curZN..":N"] = lastKeypadDisplay2
    luup.variable_set(PANEL_SID, "Cct ".. curZN.. " Text",  lastKeypadDisplay2, panel_device) 
    luup.variable_set(PANEL_SID, "Status", curZi.. ZoneT[curZN..":N"], panel_device)
    luup.variable_set(PANEL_SID, "Cct ".. curZN.. " Text",  ZoneT[curZN..":N"], panel_device)
    curZi = curZi+1
    if(curZi > NumOfCcts) then --done last zone - start exit procedure
      zoneNameMacro3() 
    else 
      local x = ((curZi - 1) * 4) + 1
      curZn = string.sub(CctsUsed, x,x+2) --move onto next cct in list
      local curZnHex = "" 
      for i=1, 3 do
        local cd = string.sub(curZn, i, i)
        curZnHex = curZnHex .. string.char(ButtonPushed[cd]) 
      end
      message_type = "ZNM1"
      outgoingPDU = string.char(0x5C, 0x4B, 0x03).. curZnHex.. string.char(0x2F)
      texecomSendPDU()
    end
  else 
    luup.call_timer("zoneNameMacro1", 1,'1','', "")
  end
end

-- Send a message to panel to get keypad display
function zoneNameMacro2()
  if (message_type == "N") then
    luup.sleep(500)
    message_type = "ZNM2"
    outgoingPDU = string.char(0x5C, 0x4C, 0x2F)
    texecomSendPDU()
  else
    luup.call_timer("zoneNameMacro2", 1,'1','', "")
  end
end

--all done now to exit eng mode
function zoneNameMacro3()
  if (message_type == "N") then
    luup.variable_set(PANEL_SID, "Status", "Logging out...", panel_device)
    message_type = "ZNM3"
    outgoingPDU = string.char(0x5C, 0x4B, 0X04, 0x0C, 0x0A, 0x0D, 0x0F, 0x2F) --exit eng mode
    texecomSendPDU()
  else
    luup.call_timer("zoneNameMacro3", 1,'1','', "")
  end
end
------------------------------------------------------------------------------------------    			
---------------------------------COMMS MONITORING---------------------------------
------------------------------------------------------------------------------------------


-- Check comms to panel is OK.  If no activity for more than 20 seconds then re-send PDU
--                              If no activity for more than 120 seconds then re-initialise comms
--								If no activity for more than 180 seconds then publish comms fail alarm
function checkWatchdog()
  --os.setlocale("en_GB")
  --now = os.date("*t") 

  watchdog = watchdog + 1


  if (watchdog > 2) then
    retry = retry + 1
    if message_type ~= "I" then
      incomingPDU = ""
      texecomSendPDU()
    end
    partitionStatusNotSet = 1
    zoneStatusNotSet = 1
    if (retry > 15) then
      initialiseComms()
      luup.variable_set(PARTITION_SID, "VendorStatus", string.format("Comms retry") , partition_device1)
      if (max_partitions == 2) then
        luup.variable_set(PARTITION_SID, "VendorStatus", string.format("Comms retry") , partition_device2)
      end
    end
    if (retry > 20) and (commFail == 0) then
      luup.variable_set(PARTITION_SID, "VendorStatus", string.format("Comms fail") , partition_device1)
      if (max_partitions == 2) then
        luup.variable_set(PARTITION_SID, "VendorStatus", string.format("Comms fail") , partition_device2)
      end
      commFail = 1
    end
  end
--dispatcher() -- 
end

----------------------------------------------------------------------------------------------
---------------------------------ADDITIONAL FUNCTIONS---------------------------------
----------------------------------------------------------------------------------------------
--[[
--toggle occupied zone
function toggleOcc(ozone)
  local child = findChild(panel_device, ocZ[ozone])	
  if (child == nil) then
    luup.log("TEXECOM: No output " .. s)
  else
    local opMask=string.char(0xFF)
    if(ocZ[ozone.."occ"]==0) then
      luup.variable_set(SWITCH_SID, "Status", 1, child)
      ocZ[ozone.."occ"]=1
    else
      luup.variable_set(SWITCH_SID, "Status", 0, child)
      ocZ[ozone.."occ"]=0
      opMask =string.char(0x00)
    end
    QoutgoingPDU = string.char(0x5C, 0x4F, 0x50).. opMask ..ocZ[ozone.."occPDU"] .. string.char(0x2F)
    QnextOperation = 2
    Qmessage_type = "O" 
    Qcmd()
  end	           
end]]

-- Check to see which zones are Armed by Vera
function checkZonesArmed()
  for i=1, last_zone do 
    local child = findChild(panel_device, string.format("Z%03d", i))
    ZoneT[i.. ":A"] = luup.variable_get(SECURITY_SID, "Armed", child)
  end 
end
-- Check to see if a latched movement sensor has timed out
function motionOff()
  luup.call_timer("motionOff", 1, "15", "", "")
  for i = 1,last_zone do
    local s = string.format("Z%03d", i)
    local child = findChild(panel_device, s)	
    if (child == nil) then
      luup.log("TEXECOM: No zone " .. s)
    else
      if (luup.variable_get(SECURITY_SID, "LatchStatus", child) == "1") then
        local lastTrip = luup.variable_get(SECURITY_SID, "LastTrip", child)
        local latchPeriod = luup.variable_get(SECURITY_SID, "LatchPeriod", child)
        if ((latchPeriod ~= "0") and (lastTrip ~= nil)) then		
          if ((os.time() - lastTrip) > (latchPeriod * 60)) then
            luup.variable_set(SECURITY_SID, "LatchStatus", 0, child)
            if(luup.variable_get(SECURITY_SID , "Tripped", child)~='0')then
              luup.variable_set(SECURITY_SID, "Tripped", 0, child)
            end
            if(luup.variable_get(SECURITY_SID, "WTA", child)==1) or (luup.variable_get(SECURITY_SID, "WTA", child)=="1") then
              luup.variable_set(SECURITY_SID, "Armed", 1, child)
              luup.variable_set(SECURITY_SID, "WTA", 0, child)
            end
          end
        end
      end
    end	            
  end
end

-- an entry /access cct has tripped, check to see if the alarm panel is still in entry (if so recheck 10s later) or now in alarm (if so notify user)
function entryAct(zone) 
  if (luup.variable_get(PARTITION_SID, "DetailedArmMode", partition_device1) == "EntryDelay") then
    luup.call_timer("entryAct", 1,'10','', zone) 
  elseif (luup.variable_get(PARTITION_SID, "Alarm", partition_device1) == "Active") then
    notifyUserP("Entry Fault: ".. ZoneT[zone.. ":T"] , "1","3")
  end
end

-- Implement Zone Bypass/Un-bypass requests (UI5) or arm/disarm requests (UI7)
function setBypass(device, newArmedValue)
  --[[	if ui7Check == "false" then
			local command = ""
			local zone = luup.attr_get("altid", device)
			-- texecomLog(zone)
			zone = string.sub(zone, 2)
			zone = "0x" .. string.format("%X", zone)
			if (newArmedValue == "0") then
				command = "0x42"
				ZoneT[zone.. ":A"] = 0
			else
				command = "0x55"
				ZoneT[zone.. ":A"] = 1
			end
			local retries = 0
			while (message_type ~= "N") do
				luup.sleep(500)
				retries = retries + 1
				if retries > 3 then break end
			end
			QnextOperation=1
   		 	Qmessage_type="B"
   		 	QoutgoingPDU = string.char(0x5C) .. string.char(command) .. string.char(zone) .. string.char(0x2F)
    	else
    		luup.variable_set(SECURITY_SID, "Armed", newArmedValue, device)
    	end]]--
end

-- Arm specified Vera zone devices when partition is armed
function armZones(area, mode)
  luup.variable_set(PANEL_SID, "Status", "Arming Zones", panel_device)	
  local x=1
  local y = 3
  local cZn =0
  local cZN = 0
  local ZtA="" 
  if ((area == 1) or (area == "1")) then
    if (mode == 1) then
      ZtA = ZiAF
    else
      ZtA = ZiAP
    end
  elseif ((area == 2) or (area == "2")) then
    if (mode == 1) then
      ZtA = ZiBF
    else
      ZtA = ZiBP
    end
  end
  luup.variable_set(PANEL_SID, "Status", "1...", panel_device)

  if((ZtA=="")or(ZtA==nil))then
    luup.variable_set(PANEL_SID, "Status", "nil", panel_device)
  else
    local ZtAnum = string.gsub(ZtA, " ","")
    luup.variable_set(PANEL_SID, "Status", "2."..ZtA.." ~ "..ZtAnum, panel_device)
    luup.variable_set(PANEL_SID, "Status", "2.5..."..ZtAnum.." + ", panel_device)
    ZtAnum = (string.len(ZtAnum)+1) / 4
    luup.variable_set(PANEL_SID, "Status", "A3...", panel_device)

    for z = 1, ZtAnum do
      cZn = string.sub(ZtA, x,y)
      if (string.sub(cZn, 1, 2)=="00")then 
        cZN = string.sub (cZn, 3)
      elseif (string.sub (cZn, 1, 1)=="0")then 
        cZN = string.sub (cZn, 2)
      else
        cZN = cZn
      end
      x=x+4
      y=y+4
      local child = findChild(panel_device, string.format("Z%03d", cZN))
      if (child == nil) then
        luup.log("TEXECOM: Unable to locate zone device ", cZN)   
      else	
        if(luup.variable_get(SECURITY_SID, "LatchStatus", child) == '1') then
          luup.variable_set(SECURITY_SID, "WTA", "1", child)
        else
          luup.variable_set(SECURITY_SID, "Armed", '1', child)
        end
      end
    end	
    alreadyDisarmed = 0
    alreadyArmed = 1
  end
end


--Disarm specified Vera zone devices when partition is disarmed
function disarmZones(area)
  luup.variable_set(PANEL_SID, "Status", "Disarming Zones", panel_device)	
  local x=1
  local y = 3
  local cZn =0
  local cZN = 0
  local ZtD = ""
  if ((area == 1) or (area == "1")) then
    ZtD = ZiAF
  elseif ((area == 2) or (area == "2")) then
    ZtD = ZiBF
  end
  luup.variable_set(PANEL_SID, "Status", "1...", panel_device)
  if((ZtD=="")or(ZtD==nil))then
    luup.variable_set(PANEL_SID, "Status", "nil", panel_device)
  else
    local ZtDnum = string.gsub(ZtD, " ","")
    luup.variable_set(PANEL_SID, "Status", "2."..ZtD.." ~ "..ZtDnum, panel_device)
    luup.variable_set(PANEL_SID, "Status", "2.5..."..ZtDnum.." + ", panel_device)
    ZtDnum = (string.len(ZtDnum)+1) / 4
    luup.variable_set(PANEL_SID, "Status", "DI3...", panel_device)

    for z = 1, ZtDnum do
      cZn = string.sub(ZtD, x,y)
      luup.variable_set(PANEL_SID, "Status", cZn, panel_device)
      if (string.sub(cZn, 1, 2)=="00")then 
        cZN = string.sub (cZn, 3)
      elseif (string.sub (cZn, 1, 1)=="0")then 
        cZN = string.sub (cZn, 2)
      else
        cZN = cZn
      end
      x=x+4
      y=y+4

      luup.variable_set(PANEL_SID, "Status", "searching", panel_device)
      if(string.find(ZntD, cZn) == nil) then --cant find this zone number in the list of 24 hr zones so disarm
        local child = findChild(panel_device, string.format("Z%03d", cZN))
        if (child == nil) then
          luup.variable_set(PANEL_SID, "Status", "no zone...", panel_device)
          luup.log("TEXECOM: No zone to disarm " .. s)
        else

          luup.variable_set(PANEL_SID, "Status", "disarmed...", panel_device)
          luup.variable_set(SECURITY_SID, "Armed", 0, child)
        end
      end            
    end
  end
  luup.variable_set(PANEL_SID, "Status", "part done...", panel_device)
  alreadyArmed = 0
  alreadyDisarmed = 1
end

function HT(idV,stateV,nameV)
  if(HtDev~=0)then
    luup.call_action("urn:samyoue-com:serviceId:HomeTouch1","HAct",{id=idV,state=stateV,name=nameV},HtDev)
  end
end
------------------------------------------------------------------------------------
---------------------------------INITIALISATION---------------------------------
------------------------------------------------------------------------------------

-- Initialise the panel and create necessary child devices
function texecomStartup(lul_device)
  writeFile('/TexeDevNo',lul_device)
  PanelConfigured = 0   	
  panel_device = lul_device
  luup.variable_set(PANEL_SID, "Status", "Initialising...", panel_device)

  udlCode = UIvar("Panel UDL Code", "1234")
  engCode = UIvar("Panel Engineer Code", "1234")
  grabZD =  UIvar("Grab Zone Names on Next LUUP Restart (1= Yes, 0=No)", "1")
  handler = UIvar("Use Handler Plugin?", "0")

  -- occupyLH = UIvar("LH Area Occupied EE Zones (Format: 001,002)", "")
  -- occupyRH = UIvar("RH Area Occupied EE Zones (Format: 001,002)", "")
  -- LWMode = UIvar("Lone Worker Mode (0 = Disabled, 1 = Enabled)", "0")

  ignoreCcts = UIvar("Used Zones to be Ignored (Format: 001,002,003)", "")
  addUnusedCcts = UIvar("Unused Zones to be Added (Format: 001,002,003)", "")
  ZntD = UIvar("24 Hour Zones (NEVER disarmed by Vera)", "")
CctsUsed=UIvar("CctsUsed",'')
  POapp =  UIvar("PushOver App Token", "")
  POuser =  UIvar("PushOver User Token", "")
  POtitle = UIvar("PushOver Message Title", "Texecom Alarm System")
  POsoundV = UIvar("Pushover Alarm Sound", "updown")
  POretry = UIvar("PushOver - Alarm Message Repeats Every (sec)", "30")
  POexpireV = UIvar("PushOver - Alarm Stops Retrying After: (min)", "5")
  POdeviceV = UIvar("PushOver - Device Token For Alarm Notifications (Blank = All Devices With User Token)", "")
  POch4 = UIvar("PushOver Set/Unset Notifications (1 = Yes, 0 = No)", "1")
  POch4sound = UIvar("PushOver Set/Unset Sound", "pushover")
  POdevCh4 = UIvar("PushOver - Device To Receive Set/Unset Notifications (Blank = All With User Token)", "")
  POrestart = UIvar("PushOver Notification on Vera Restart (1 = Yes, 0 = No)", "1")

  ZiAF = UIvar("Zones to arm in Area A Full Set", CctsUsed)
  ZiAP = UIvar("Zones to arm in Area A Part Set", CctsUsed)	
  ZiBF = UIvar("Zones to arm in Area B Full Set", CctsUsed)
  ZiBP = UIvar("Zones to arm in Area B Part Set", CctsUsed)
  
  UIvar('IP/Serial','s')
  UIvar('PanelIP', '')
  UIvar('PanelPort', '10001')

  luup.variable_set(PANEL_SID, "Status", "Initialising...1", panel_device)
  luup.log("TEXECOM: starting ... device #"..tostring(panel_device).." starting up with id "..luup.devices[panel_device].id, 10)
  luup.variable_set(PANEL_SID, "TexecomVersion", TEXECOM_VERSION, panel_device)
  local ipAddress, trash, ipPort = string.match(luup.devices[panel_device].ip, "^([%w%.%-]+)(:?(%d-))$")
  if (ipAddress and ipPort ~= "") then
    luup.log(string.format ("TEXECOM Startup ipAddress=%s, ipPort=%s", tostring(ipAddress), tostring (ipPort)))
    luup.io.open (panel_device, ipAddress, ipPort)

  else
    luup.log("TEXECOM Startup Running on Serial.")

    if( luup.io.is_connected(panel_device) == false ) then
      luup.log("TEXECOM: no port for Texecom",1)
      luup.task('Assign IP Address or Serial Port for Texecom',2,'Texecom',-1)
      return false
    end
  end
  ui7Check = luup.variable_get(PANEL_SID, "UI7Check", panel_device) or ""
  if ui7Check == "" then
    luup.variable_set(PANEL_SID, "UI7Check", "false", panel_device)
    ui7Check = "false"
  end

  if( luup.version_branch == 1 and luup.version_major == 7 and ui7Check == "false") then
    luup.variable_set(PANEL_SID, "UI7Check", "true", panel_device)
    ui7Check = "true"
  end

  if (luup.variable_get(PANEL_SID, "MaxPartitions", panel_device) ~= nil) and (luup.variable_get(PANEL_SID, "MaxPartitions", panel_device) ~= "") then
    local max_par_string = luup.variable_get(PANEL_SID, "MaxPartitions", panel_device)
    max_partitions = tonumber(max_par_string)
    if (1 > max_partitions) then
      max_partitions = 1
      luup.task('Minimum number of partitions is 1',2,'Texecom',-1)
    end
    if (max_partitions > 2) then
      max_partitions = 2
      luup.task('Maximum number of partitions is 2',2,'Texecom',-1)
    end 		
  else
    luup.variable_set(PANEL_SID, "MaxPartitions", max_partitions, panel_device)
  end

  if(handler=='1')then
    HtDev=readFile('/HtDevNo')

    if (luup.is_ready(HtDev) == false) then
      luup.call_timer("init1bR", 1, "5", "", lul_device)
      luup.log('waiting for handler...')
    else
      init1b(lul_device)
    end
  else
    init1b(lul_device)
  end
end

function init1bR(lul_device)
  if (luup.is_ready(HtDev) == false) then
    luup.call_timer("init1bR", 1, "5", "", lul_device)
    luup.log('waiting for handler...')

  else
    init1b(lul_device)
  end
end
------
function init1b(lul_device)
  luup.log('handler ready/not in use')
  child_devices = luup.chdev.start(panel_device)
  luup.log("TEXECOM: adding default partitions", 10)
  luup.task('Adding partition devices ',4,'Texecom',-1)
  luup.chdev.append(panel_device,child_devices,"Partition-1","Texecom Partition 1","urn:schemas-micasaverde-com:device:AlarmPartition:2","D_TexecomPartition2.xml","","",true)
  partition_device1 = findChild(panel_device, "Partition-1")
  if (max_partitions == 2) then
    luup.chdev.append(panel_device,child_devices,"Partition-2","Texecom Partition 2","urn:schemas-micasaverde-com:device:AlarmPartition:2","D_TexecomPartition2.xml","","",true)
    partition_device2 = findChild(panel_device, "Partition-2")
  end
  partition_request_device = partition_device1
  luup.log("TEXECOM: attempting to add zones " .. luup.devices[panel_device].id, 10)
  luup.task('Adding zone devices ',4,'Texecom',-1)
  zoneStatusNotSet = 1
  partitionStatusNotSet = 1
  timeNotSet = 1
  retry = 0
  message_type = "N"
  texReady = 0
--  luup.call_timer("initialiseComms", 1, "5", "", '')--wait 5s before initialising
  initialiseComms() 
  texReady = 1
end

function init2() 
  luup.variable_set(PANEL_SID, "Status", "STARTING...i2", panel_device) 
  for i = 1,max_zones do
    s = string.format("Z%03d", i)	
    if( string.find (CctsUsed,string.sub(s,2)) ~= nil ) then
      luup.variable_set(PANEL_SID, "Status", "STARTING..."..ZoneT[i.. ":T"], panel_device) 
      luup.log("TEXECOM: adding zone " .. s, 10)
      if (ZoneT[i.. ":T"] == "09 ") then
        cctTxt = string.sub(s,2).. " ".. ZoneT[i.. ":N"].. " (Fire)"
        luup.chdev.append(panel_device,child_devices,s,cctTxt,"urn:schemas-micasaverde-com:device:SmokeSensor:1","D_SmokeSensor1.xml","","",false)
      elseif ((ZoneT[i.. ":T"] == "01 ") or (ZoneT[i.. ":T"] == "02 ")) then
        cctTxt = string.sub(s,2).. " ".. ZoneT[i.. ":N"].. " (EE)"
        luup.chdev.append(panel_device,child_devices,s,cctTxt ,"urn:schemas-micasaverde-com:device:DoorSensor:1","D_DoorSensor1.xml","","",false)
      elseif (ZoneT[i.. ":T"] == "04 ") then
        cctTxt = string.sub(s,2).. " ".. ZoneT[i.. ":N"].. " (Ac)" 
        luup.chdev.append(panel_device,child_devices,s,cctTxt ,"urn:schemas-micasaverde-com:device:MotionSensor:1","D_MotionSensor1.xml","","",false)
      else
        cctTxt= string.sub(s,2).. " ".. ZoneT[i.. ":N"]
        luup.chdev.append(panel_device,child_devices,s,cctTxt,"urn:schemas-micasaverde-com:device:MotionSensor:1","D_MotionSensor1.xml","","",false)
      end
      local child = findChild(panel_device, s)	
--      luup.attr_set("name",cctTxt, child)
      last_zone = i
      if (last_zone > 15) then
        endzone = "0x" .. string.format("%X", last_zone)
      else
        endzone = "0x0" .. string.format("%X", last_zone)
      end
    end
  end
  init3()
end

function init3()
  partitionStatusNotSet = 1
  luup.variable_set(PANEL_SID, "Status", "STARTING...6", panel_device) 
  luup.task('Adding X10 devices ',4,'Texecom',-1)
  for i = 1,8 do
    s = string.format("X%02d", i)	
    if( string.find (luup.devices[panel_device].id,s) ~= nil ) then
      luup.log("TEXECOM: adding X10 device " .. s, 10) 
      luup.chdev.append(panel_device,child_devices,s,s.." (Texecom)","urn:schemas-upnp-org:device:BinaryLight:1","D_BinaryLight1.xml","","",false)
      last_x10 = i
    end
  end
  luup.task('Adding PGM output ',4,'Texecom',-1)
  for i = 1,4 do
    s = string.format("P%02d", i)	
    if( string.find (luup.devices[panel_device].id,s) ~= nil ) then
      luup.log("TEXECOM: adding PC CONTROL OP device " .. s, 10)
      sn=ocZ[s]
      luup.chdev.append(panel_device,child_devices,s,sn,"urn:schemas-upnp-org:device:BinaryLight:1","D_BinaryLight1.xml","","",false)
      last_pc = i
    end
  end
  luup.chdev.sync(panel_device,child_devices)
  --	luup.call_timer("checkWatchdog", 1, "30", "", "")
  for i = 1,last_zone do
    --	previousEventType[i] = 0x80
    local s = string.format("Z%03d", i)
    local child = findChild(panel_device, s)	
    if (child == nil) then
      luup.log("TEXECOM: No zone " .. s)
    else
      if luup.variable_get(SECURITY_SID, "LatchPeriod", child) == nil then
        luup.variable_set(SECURITY_SID, "LatchPeriod", 0, child)
      end
      if luup.variable_get(SECURITY_SID, "LatchStatus", child) == nil then
        luup.variable_set(SECURITY_SID, "LatchStatus", 0, child)
      end
      --	if luup.variable_get(SECURITY_SID, "ArmThisZone", child) == nil then
      --	luup.variable_set(SECURITY_SID, "ArmThisZone", 0, child)
      --end
    end	            
  end
  luup.variable_set(PARTITION_SID, "VendorStatus", string.format("Starting") , partition_device1)
  if (max_partitions == 2) then
    luup.variable_set(PARTITION_SID, "VendorStatus", string.format("Starting") , partition_device2)
  end
  luup.variable_set(PANEL_SID, "Status", "STARTING...", panel_device) 
  --luup.call_delay("getPanelDetails", 4, "")
  luup.call_timer("motionOff", 1, "1m", "", "")
  luup.call_timer("readyForRx",1, '2','', "")
  luup.call_timer("pollTime",1, '7','', "")
  luup.set_failure(false)
  if(POrestart =='1') then
    notifyUserP("Controller Restart", "0","0")
  end
  PanelConfigured = 1
  dispatcher() 
end

-------------------------------------------------------------------------------------------
---------------------------------LOGGING FUNCTIONS---------------------------------
-------------------------------------------------------------------------------------------


-- Log PDUs to a file
function texecomLogPDU(PDU,direction,msg_type)
  local logfile = '/var/log/cmh/texecom_pdu.log'
  -- empty file if it reaches 250kb

  local outf = io.open(logfile , 'a')
local filesize = outf:seek("end")
  
  outf:close()
  if (filesize > 250000) then
    local outf = io.open(logfile , 'w')
    outf:write('')
    outf:close()
  end
  local outf = io.open(logfile, 'a')
  local mtype = " (" .. message_type .. ") "
  local sep = "   "
  if (retry ~= 0 and direction == "--&gt;") then
    sep = " R "
  end
  outf:write(os.date('%d/%m %H:%M:%S'))
  outf:write(sep)
  outf:write(direction)
  outf:write(mtype)
  outf:write(PDU)
  outf:write('\n')
  outf:close()
end


-- Debug messages may be logged in a file
function texecomLog(log_msg)
  local logfile = '/var/log/cmh/texecom_debug.log'
  -- empty file if it reaches 25kb
  local outf = io.open(logfile , 'a')
  local filesize = outf:seek("end")
  outf:close()
  if (filesize > 25000) then
    local outf = io.open(logfile , 'w')
    outf:write('')
    outf:close()
  end
  local outf = io.open(logfile, 'a')
  outf:write(os.date('%d/%m %H:%M:%S'))
  outf:write(":  ")
  outf:write(log_msg)
  outf:write('\n')
  outf:close()
end

------------------------------------------------------------------------------------------------
---------------------------------NOTIFICATION FUNCTIONS---------------------------------
-------------------------------------------------------------------------------------------------

-- Send a message to user's phone via Pushover
function notifyUserP(msg, pri, ch)
  POapp = luup.variable_get(PANEL_SID, "PushOver App Token", panel_device)
  POuser = luup.variable_get(PANEL_SID, "PushOver User Token", panel_device)
  POtitle = luup.variable_get(PANEL_SID, "PushOver Message Title", panel_device)
  if (POlastCh4 == 0) then  --controller been restarted 
    if(ch == "4" ) then
      POlastCh4 = msg --dont repeat ch4 msg
    end
  end
  if (msg ~= POlastCh4) then --if messege is the same as the last ch4 msg ignore (prevents multiple reporting of unchanged partition status...)
    luup.variable_set(PANEL_SID, "Status", "Sending '" .. msg .."'", panel_device) 
    local POexpire = POexpireV * 60			
    local data = {}
    local s = ""
    if (ch == "4" or ch == "0") then
      if (POch4sound ~= "") then
        POsound = "\038"  .. "sound=" .. POch4sound
      else 
        POsound = ""
      end
      if (POdevCh4 ~= "") then
        POdev = "\038"  .. "device=" .. POdevCh4
      else 
        POdev = ""
      end
    else
      if (POsoundV ~= "") then
        POsound = "\038"  .. "sound=" .. POsoundV
      else 
        POsound = ""
      end
      if (POdeviceV ~= "") then
        POdev = "\038"  .. "device=" .. POdeviceV
      else 
        POdev = ""
      end
    end
    if (pri == "2") then
      pri = "2" .."\038" .. "expire=" .. POexpire .. "\038"  .. "retry=".. POretry
    end
    local resp={}
    local request_body = "token=" .. POapp .. "\038" .. "user=" .. POuser .. "\038"  .. "message=".. trim(msg) .. "\038" .. "title=".. trim(POtitle)   .. "\038" .. "priority=" .. pri .. POdev ..POsound

    local urlV = "https:" .. "\047" .. "\047" ..  "api.pushover.net" .. "\047" .. "1" .. "\047" .. "messages.xml"
    local r, c, h, s = https.request
    {
      method = "POST",
      url = urlV,
      headers = {["Content-Length"] = string.len(request_body)},
      source = ltn12.source.string(request_body),
      sink = ltn12.sink.table(resp),
      protocol = "sslv23",
      verify = "none",
    }
  end
  if(ch == "4") then
    POlastCh4 = msg
  end
end    

--------------------------------------------------------------------------------------------------
---------------------------------COMMUNICATION TO PANEL---------------------------------
--------------------------------------------------------------------------------------------------

-- A byte of data has been received via serial or IP
-- This function is invoked until a complete PDU is assembled
function texecomIncoming(data)
  if (data == nil) or (texReady == 0) or (string.byte(data) == 0x2B) then
    return true
  end
  if message_type == "N" then
    texecomLog(tostring(data))
    return true
  end
  if (string.len(incomingPDU) < 3) then
    incomingPDU = incomingPDU .. data
    last_byte = string.byte(data)
    return true
  end
  if ((last_byte == 0x0D) and (string.byte(data) == 0x0A)) then
    incomingPDU = incomingPDU .. data
    texecomLogPDU(PDUtoString(incomingPDU), "&lt;--", message_type)
    texecomProcessPDU()
    incomingPDU = ""
    last_byte = ""
    return true
  else
    incomingPDU = incomingPDU .. data
    last_byte = string.byte(data)
    return true
  end
end

-- Send a message to Texecom via serial or IP
function texecomSendPDU()
  texecomLogPDU(PDUtoString(outgoingPDU), "-->", message_type)
  if luup.io.write(outgoingPDU) == false then
      luup.log('TEXECOM: PDU transmission failed: '..outgoingPDU)

    luup.call_timer("texecomSendPDU", 1,'5','', "")
    luup.variable_set(PANEL_SID, "Status", "cant send PDU", panel_device) 
    luup.set_failure(true)
    return false
  end

end


-- Decode a received PDU (Protocol Data Unit)
function texecomProcessPDU()

  Tracker = Tracker + 1
  luup.variable_set(PANEL_SID, "LastPollTime", os.date("%x, %X"), panel_device)
  if (string.sub(incomingPDU, 1, 5) == "ERROR") then
    luup.variable_set(PANEL_SID, "LastPollTime", os.date("%x, %X").." - ERROR "..message_type, panel_device) 
    luup.variable_set(PARTITION_SID, "VendorStatus", string.format("Error "..message_type) , partition_request_device)
    partitionStatusNotSet = 1
    message_type = "N"
    retry = 0
    initialiseComms()
    return true
  elseif (string.sub(incomingPDU, 1, 2) == "OK") then
    luup.variable_set(PANEL_SID, "LastPollTime", os.date("%x, %X").." - OK", panel_device)
    if (message_type == "KP") then
      message_type = "N"
      retry = 0
      commFail = 0
      dispatcher()
      return true
    end
    if (message_type == "SENG") then
      if (retry == 0) then
        ZnCheckEng() 
      end
      message_type = "N"
      retry = 0
      commFail = 0
      return true
    end
    if (message_type == "ZNM1") then
      if (retry == 0) then
        zoneNameMacro2()
      end
      message_type = "N"
      retry = 0
      commFail = 0
      return true
    end
    if (message_type == "ZNM3") then
      if (retry == 0) then
        init2()
      end
      message_type = "N"
      retry = 0
      commFail = 0
      return true
    end
    if (message_type == "A") then
      luup.variable_set(PARTITION_SID, "VendorStatus", string.format("OK") , partition_request_device)
      partitionStatusNotSet = 1
    end
    if (message_type == "I") then
      message_type = "N"
      --   if(NumOfCcts =="")then
      getZoneProg()
      --else
      --	getPartitionStatus()
      --end

    else
      message_type = "N"
      if(PanelConfigured == 1) then
        dispatcher()
      end
    end
    retry = 0
    commFail = 0
    return true
  elseif (string.sub(incomingPDU, 1, 9) == "NOT READY") then
    luup.variable_set(PARTITION_SID, "VendorStatus", string.format("Not ready") , partition_request_device)
    partitionStatusNotSet = 1
    message_type = "N"
    if(PanelConfigured == 1) then
      dispatcher()
    end
    retry = 0
    commFail = 0
    return true
  end
  if (message_type == "L") then
    if (retry == 0) then
      if (string.sub(incomingPDU, 1, 16) ~= lastKeypadDisplay1) then
        luup.variable_set(PANEL_SID, "KeypadDisplay1", string.sub(incomingPDU, 1, 16), panel_device)
        lastKeypadDisplay1 = string.sub(incomingPDU, 1, 16)
      end
      if (string.sub(incomingPDU, 17, 32) ~= lastKeypadDisplay2) then
        luup.variable_set(PANEL_SID, "KeypadDisplay2", string.sub(incomingPDU, 17, 32), panel_device)
        lastKeypadDisplay2 = string.sub(incomingPDU, 17, 32)
      end
    end
    message_type = "N"
    dispatcher()
    retry = 0
    commFail = 0
    return true
  elseif (message_type == "Z") then
    local x=1
    local y = 3
    local cZn =0
    local cZN = 0
    local test="" 
    for z = 1, NumOfCcts do
      cZn = string.sub(CctsUsed, x,y)
      if (string.sub(cZn, 1, 2)=="00")then 
        cZN = string.sub (cZn, 3)
      elseif (string.sub (cZn, 1, 1)=="0")then 
        cZN = string.sub (cZn, 2)
      else
        cZN = cZn
      end
      local pointer = (((cZN-1)*2)+1)
      local ZnStatus = string.sub(PDUtoString(string.byte(string.sub(incomingPDU, pointer, pointer))), 2,2)
      test = test.. cZN.. ZnStatus
      x=x+4
      y=y+4
      -- 0 = sec, 1 = act, 2 = tam
      if (ZnStatus ~= previousEventType[z]) or (zoneStatusNotSet == 1) then
        local child = findChild(panel_device, string.format("Z%03d", cZN))

        if (child == nil) then
          luup.log("TEXECOM: Unable to locate zone device ", cZN)   
        else	

          if(ZnStatus ~= "0") then
            if(luup.variable_get(SECURITY_SID , "Tripped", child)~=1)then
              luup.variable_set(SECURITY_SID , "Tripped", 1, child)
            end
            if((ZnStatus == "1") and (luup.variable_get(SECURITY_SID, "Status", child)~="Alarm")) then
              if(luup.variable_get(SECURITY_SID , "Status", child)~= "Alarm")then
                HT(cZN,1,ZoneT[cZN .. ":N"])
                --[[if(string.find (occupyLH,ZoneT[cZN.. ":C"])~= nil) then
                  toggleOcc("LHoZ")
                end
                if(string.find (occupyRH,ZoneT[cZN.. ":C"])~= nil) then
                  toggleOcc("RHoZ")
                end]]
                if(luup.variable_get(SECURITY_SID, "Armed", child) == "1" ) then
                  if ((ZoneT[cZN.. ":T"] == "01 ") or (ZoneT[cZN.. ":T"] == "02 ")or (ZoneT[cZN.. ":T"] == "04 ")) then
                    luup.call_timer("entryAct", 1,'3','', cZN) 
                  else
                    Zmsg = tostring(ZoneT[cZN.. ":N"]) 
                    Zmsg = Zmsg.. " Alert"
                    notifyUserP(Zmsg, "1","3")
                  end
                end
                local latchPeriod = luup.variable_get(SECURITY_SID, "LatchPeriod", child)
                if latchPeriod ~= "0" then
                  luup.variable_set(SECURITY_SID, "LatchStatus", 1, child)
                end
                luup.variable_set(SECURITY_SID, "LastActive", os.time(), child)
                luup.variable_set(SECURITY_SID, "Status", "Alarm", child)

              end
            elseif((ZnStatus == "2")and (luup.variable_get(SECURITY_SID, "Status", child)~="Tamper")) then			
              if(luup.variable_get(SECURITY_SID , "Status", child)~= "Tamper")then
                writeFile('/Ht2',cZN..' tam '..ZoneT[cZN .. ":N"])
                HT(cZN,2,ZoneT[cZN .. ":N"])
                Zmsg = tostring(ZoneT[cZN.. ":N"]) 
                Zmsg = Zmsg.. " Tamper Alert"
                notifyUserP(Zmsg, "1","6")
                luup.variable_set(SECURITY_SID, "Status", "Tamper", child)
                luup.variable_set(SECURITY_SID, "LastTamper", os.time(), child)
              end
            end

          else
            if(luup.variable_get(SECURITY_SID, "LatchStatus", child)==0 or luup.variable_get(SECURITY_SID, "LatchStatus", child)== "0") then
              if(luup.variable_get(SECURITY_SID , "Tripped", child)~=0)then
                HT(cZN,0,ZoneT[cZN .. ":N"])
                luup.variable_set(SECURITY_SID, "Tripped", 0, child)
                luup.variable_set(SECURITY_SID, "Status", "Healthy", child)
                luup.variable_set(SECURITY_SID, "LastSecure", os.time(), child)
              end
            end
          end			      
        end	
        previousEventType[z] = ZnStatus
      end
    end

    luup.variable_set(PANEL_SID, "Status", "cct st done", panel_device)
    zoneStatusNotSet = 0
    message_type = "N"
    dispatcher()
    watchdog = 0
    retry = 0
    commFail = 0
    return true
  elseif (message_type == "O") then
    if (retry == 0) then		
      if (last_x10 > 0) then
        local x10PDU = string.byte(string.sub(incomingPDU, 2,2))
        for i = 1,last_x10 do
          local s = string.format("X%02d", i)
          local child = findChild(panel_device, s)	
          if (child == nil) then
            luup.log("TEXECOM: No output " .. s)
          else
            local opState = bitMask(x10PDU, i)
            if (opState) then
              luup.variable_set(SWITCH_SID, "Status", 1, child)
            else
              luup.variable_set(SWITCH_SID, "Status", 0, child)
            end
          end	            
        end
      end
      if (last_pc > 0) then
        local pcPDU = string.byte(string.sub(incomingPDU, 1,1))
        for i = 1,last_pc do
          local s = string.format("P%02d", i)
          local child = findChild(panel_device, s)	
          if (child == nil) then
            luup.log("TEXECOM: No output " .. s)
          else
            local opState = bitMask(pcPDU, i)
            if (opState) then
              luup.variable_set(SWITCH_SID, "Status", 1, child)
            else
              luup.variable_set(SWITCH_SID, "Status", 0, child)
            end
          end	            
        end
      end
    end
    message_type = "N"
    dispatcher()
    watchdog = 0
    retry = 0
    commFail = 0
    return true
  elseif (message_type == "P") then
--			if (retry == 0) then
    local partitionStatus = incomingPDU
    -- To find the byte you want, double the table entry number and add 1.
    -- (See Texecom Simple Protocol document p.9)
    local partitionAlarmStatus = string.byte(string.sub(incomingPDU, 1, 1))
    local partitionReadyStatus = string.byte(string.sub(incomingPDU, 33, 33))
    local partitionFullStatus = string.byte(string.sub(incomingPDU, 45, 45))
    local partitionPartStatus = string.byte(string.sub(incomingPDU, 47, 47))
    local partitionEntryStatus = string.byte(string.sub(incomingPDU, 35, 35)) 
    local partitionExitStatus = string.byte(string.sub(incomingPDU, 39, 39))
    --local partitionArmFailStatus = string.byte(string.sub(incomingPDU, 55, 55))
    --local partitionResetReqdStatus = string.byte(string.sub(incomingPDU, 73, 73))
    if (partitionStatus ~= previousPartitionStatus) or (partitionStatusNotSet == 1) then
      -- Set Partition Alarm Statuses
      if (bitAnd(partitionAlarmStatus, 0x01) ~= 0) then
        luup.variable_set(PARTITION_SID, "Alarm", string.format("Active") , partition_device1)
        notifyUserP("Alarm Activated!" ,"2","3")
      else
        luup.variable_set(PARTITION_SID, "Alarm", string.format("None") , partition_device1)
      end
      if (max_partitions == 2) then
        if (bitAnd(partitionAlarmStatus, 0x02) ~= 0) then
          luup.variable_set(PARTITION_SID, "Alarm", string.format("Active") , partition_device2)
        else
          luup.variable_set(PARTITION_SID, "Alarm", string.format("None") , partition_device2)
        end
      end
      -- Set Partition Armed/Disarmed Statuses

      if (bitAnd(partitionEntryStatus, 0x01) ~= 0) then
        luup.variable_set(PARTITION_SID, "VendorStatus", string.format("Entry Delay") , partition_device1)
        luup.variable_set(PARTITION_SID, "ArmMode", "EntryDelay", partition_device1)
        luup.variable_set(PARTITION_SID, "DetailedArmMode", "EntryDelay", partition_device1)
      elseif (bitAnd(partitionExitStatus, 0x01) ~= 0) then
        luup.variable_set(PARTITION_SID, "VendorStatus", string.format("Exit Delay") , partition_device1)
        luup.variable_set(PARTITION_SID, "ArmMode", "ExitDelay", partition_device1)
        luup.variable_set(PARTITION_SID, "DetailedArmMode", "ExitDelay", partition_device1)
      elseif (bitAnd(partitionFullStatus, 0x01) ~= 0) then
        if (luup.variable_get(PARTITION_SID, "DetailedArmModeNum", partition_device1) ~= 2) then
          if ((POch4 == 1) or (POch4 == "1")) then
            notifyUserP("Full Set" ,"0","4")
          end
--							armZones(1, 1) --arm selected zones in area A (1), full set (1)
        end
        luup.variable_set(PARTITION_SID, "VendorStatus", string.format("Full Armed") , partition_device1)
        luup.variable_set(PARTITION_SID, "DetailedArmModeNum", 2, partition_device1)
        luup.variable_set(PARTITION_SID, "ArmModeNum", 1, partition_device1)
        luup.variable_set(PARTITION_SID, "ArmMode", "Armed", partition_device1)
        luup.variable_set(PARTITION_SID, "DetailedArmMode", "Full", partition_device1)
        partition1_armed = 1

      elseif (bitAnd(partitionPartStatus, 0x01) ~= 0) then
        if (luup.variable_get(PARTITION_SID, "DetailedArmModeNum", partition_device1) ~= 1) then
          if ((POch4 == 1) or (POch4 == "1")) then
            notifyUserP("Part Set" ,"0","4")			
          end
--							armZones(1, 2) --arm selected zones in area A (1), full set (2)
        end
        luup.variable_set(PARTITION_SID, "VendorStatus", string.format("Part Armed") , partition_device1)
        luup.variable_set(PARTITION_SID, "DetailedArmModeNum", 1, partition_device1)
        luup.variable_set(PARTITION_SID, "ArmModeNum", 1, partition_device1)
        luup.variable_set(PARTITION_SID, "ArmMode", "Armed", partition_device1)
        luup.variable_set(PARTITION_SID, "DetailedArmMode", "Part", partition_device1)
        partition1_armed = 1
      elseif (bitAnd(partitionReadyStatus, 0x01) ~= 0) then
        if (luup.variable_get(PARTITION_SID, "DetailedArmModeNum", partition_device1) ~= 0) then
          if ((POch4 == 1) or (POch4 == "1")) then
            notifyUserP("Disarmed" ,"0","4")
          end
--							disarmZones(1)
        end
        luup.variable_set(PARTITION_SID, "VendorStatus", string.format("Ready") , partition_device1)
        luup.variable_set(PARTITION_SID, "DetailedArmModeNum", 0, partition_device1)
        luup.variable_set(PARTITION_SID, "ArmModeNum", 0, partition_device1)
        luup.variable_set(PARTITION_SID, "ArmMode", "Disarmed", partition_device1)
        luup.variable_set(PARTITION_SID, "DetailedArmMode", "Ready" , partition_device1)
        partition1_armed = 0
      else
        if (luup.variable_get(PARTITION_SID, "DetailedArmModeNum", partition_device1) ~= 0) then
          if ((POch4 == 1) or (POch4 == "1")) then
            notifyUserP("Disarmed" ,"0","4")
          end
--							disarmZones(1)
        end
        luup.variable_set(PARTITION_SID, "VendorStatus", string.format("Not Ready") , partition_device1)
        luup.variable_set(PARTITION_SID, "DetailedArmModeNum", 0, partition_device1)
        luup.variable_set(PARTITION_SID, "ArmModeNum", 0, partition_device1)
        luup.variable_set(PARTITION_SID, "ArmMode", "Disarmed", partition_device1)
        luup.variable_set(PARTITION_SID, "DetailedArmMode", "NotReady" , partition_device1)
        partition1_armed = 0
      end
      if (max_partitions == 2) then
        if (bitAnd(partitionFullStatus, 0x02) ~= 0) then
          if (luup.variable_get(PARTITION_SID, "DetailedArmModeNum", partition_device2) ~= 0) then
--								armZones(2, 1) --arm selected zones in area B (2), full set (1)
          end
          luup.variable_set(PARTITION_SID, "VendorStatus", string.format("Full Armed") , partition_device2)
          luup.variable_set(PARTITION_SID, "DetailedArmModeNum", 2, partition_device2)
          luup.variable_set(PARTITION_SID, "ArmModeNum", 1, partition_device2)
          luup.variable_set(PARTITION_SID, "ArmMode", "Armed", partition_device2)
          luup.variable_set(PARTITION_SID, "DetailedArmMode", "Full", partition_device2)
          partition2_armed = 1
        elseif (bitAnd(partitionPartStatus, 0x02) ~= 0) then
          if (luup.variable_get(PARTITION_SID, "DetailedArmModeNum", partition_device2) ~= 1) then
--								armZones(2, 2) --arm selected zones in area B (2), Part set (1)
          end
          luup.variable_set(PARTITION_SID, "VendorStatus", string.format("Part Armed") , partition_device2)
          luup.variable_set(PARTITION_SID, "DetailedArmModeNum", 1, partition_device2)
          luup.variable_set(PARTITION_SID, "ArmModeNum", 1, partition_device2)
          luup.variable_set(PARTITION_SID, "ArmMode", "Armed", partition_device2)
          luup.variable_set(PARTITION_SID, "DetailedArmMode", "Part", partition_device2)
          partition2_armed = 1
        elseif (bitAnd(partitionReadyStatus, 0x02) ~= 0) then
          if (luup.variable_get(PARTITION_SID, "DetailedArmModeNum", partition_device2) ~= 0) then
--								disarmZones(2) --disarm selected zones in area B (2)
          end
          luup.variable_set(PARTITION_SID, "VendorStatus", string.format("Ready") , partition_device2)
          luup.variable_set(PARTITION_SID, "DetailedArmModeNum", 0, partition_device2)
          luup.variable_set(PARTITION_SID, "ArmModeNum", 0, partition_device2)
          luup.variable_set(PARTITION_SID, "ArmMode", "Disarmed", partition_device2)
          luup.variable_set(PARTITION_SID, "DetailedArmMode", "Ready" , partition_device2)
          partition2_armed = 0
        else
          if (luup.variable_get(PARTITION_SID, "DetailedArmModeNum", partition_device2) ~= 0) then
--								disarmZones(2) --disarm selected zones in area B (2)
          end
          luup.variable_set(PARTITION_SID, "VendorStatus", string.format("Not Ready") , partition_device2)
          luup.variable_set(PARTITION_SID, "DetailedArmModeNum", 0, partition_device2)
          luup.variable_set(PARTITION_SID, "ArmModeNum", 0, partition_device2)
          luup.variable_set(PARTITION_SID, "ArmMode", "Disarmed", partition_device2)
          luup.variable_set(PARTITION_SID, "DetailedArmMode", "NotReady" , partition_device2)
          partition2_armed = 0
        end
      end
      previousPartitionStatus = partitionStatus
      partitionStatusNotSet = 0
    end
--			end
    message_type = "N"
--			watchdog = 0
    retry = 0
    commFail = 0
    dispatcher()
    return true
  elseif (message_type == "V") then
    if (retry == 0) then
      luup.variable_set(PANEL_SID, "PanelType", string.sub(incomingPDU, 1, 12), panel_device)
      luup.variable_set(PANEL_SID, "PanelFirmware", string.sub(incomingPDU, 29, 32), panel_device)
    end
    message_type = "N"
    dispatcher()
    watchdog = 0
    retry = 0
    commFail = 0
    return true
  elseif (message_type == "CENG") then
    if (retry == 0) then
      if (string.sub(incomingPDU, 1, 16) ~= lastKeypadDisplay1) then
        luup.variable_set(PANEL_SID, "KeypadDisplay1", string.sub(incomingPDU, 1, 16), panel_device)
        lastKeypadDisplay1 = string.sub(incomingPDU, 1, 16)
      end
      if (string.sub(incomingPDU, 17, 32) ~= lastKeypadDisplay2) then
        luup.variable_set(PANEL_SID, "KeypadDisplay2", string.sub(incomingPDU, 17, 32), panel_device)
        lastKeypadDisplay2 = string.sub(incomingPDU, 17, 32)
      end
    end
    message_type = "N"
    ZnEngOk()
    retry = 0
    commFail = 0
    return true
  elseif (message_type == "ZNM2") then
    if (retry == 0) then
      if (string.sub(incomingPDU, 1, 16) ~= lastKeypadDisplay1) then
        luup.variable_set(PANEL_SID, "KeypadDisplay1", string.sub(incomingPDU, 1, 16), panel_device)
        lastKeypadDisplay1 = string.sub(incomingPDU, 1, 16)
      end
      if (string.sub(incomingPDU, 17, 32) ~= lastKeypadDisplay2) then
        luup.variable_set(PANEL_SID, "KeypadDisplay2", string.sub(incomingPDU, 17, 32), panel_device)
        lastKeypadDisplay2 = string.sub(incomingPDU, 17, 32)
      end
    end
    message_type = "N"
    zoneNameMacro1()
    retry = 0
    commFail = 0
    return true
  elseif (message_type == "I") then
    if (retry == 0) then
      getZoneProg() 
    else
      initialiseComms() 
    end
    message_type = "N"

    watchdog = 0
    retry = 0
    commFail = 0
    return true
  elseif (message_type == "VOLTS") then
    if (retry == 0) then
      SysV = (13.7 + ((PDUtoInt(string.sub(incomingPDU, 2, 2)) - PDUtoInt(string.sub(incomingPDU, 1, 1))) * 0.07))
      BattV = (13.7 + ((PDUtoInt(string.sub(incomingPDU, 3, 3)) - PDUtoInt(string.sub(incomingPDU, 1, 1))) * 0.07))
      SysC = (PDUtoInt(string.sub(incomingPDU, 4, 4)) * 9) / 1000
      BattC = (PDUtoInt(string.sub(incomingPDU, 5, 5)) * 9) / 1000
      luup.variable_set(PANEL_SID, "SysV", string.format("%.2fv", SysV), panel_device)
      luup.variable_set(PANEL_SID, "BattV", string.format("%.2fv", BattV), panel_device)
      luup.variable_set(PANEL_SID, "SysC", string.format("%.2fA", SysC), panel_device)
      luup.variable_set(PANEL_SID, "BattC", string.format("%.2fA", BattC), panel_device)

    end
    message_type = "N"
    dispatcher()
    watchdog = 0
    retry = 0
    commFail = 0
    return true
  elseif (message_type == "ZP") then
    if (retry == 0) then
      zn = 1
      CctsUsed = "" 
      ignoreCcts=luup.variable_get(PANEL_SID, "Used Zones to be Ignored (Format: 001,002,003)", panel_device)

      skipByte =0
      NumOfCcts = 0 
      ZoneT ={} 
      ZoneT["1:T"] = "start"
      for i=1, (string.len(incomingPDU)-1) do                                                     -- create Zone table
        if ( PDUtoString(string.sub(incomingPDU, i, i)) == "0D ") then                   -- if last byte then end loop
          skipByte=0
        elseif (skipByte==1) then                                                                                 -- if this byte is to be skipped (area assignment) make sure next byte isn't skipped
          skipByte=0
        elseif (string.find(ignoreCcts,PDUtoString(string.sub(incomingPDU, i, i)))~=nil) then --if the current zone is to be ignored                                                                                 -- if this byte is to be skipped (area assignment) make sure next byte isn't skipped
          zn = zn +1                                                                                                        -- increase Zone Number
          skipByte=1
        elseif ( (PDUtoString(string.sub(incomingPDU, i, i)) ~= "00 ") and (string.find(ignoreCcts,string.format("%03d", zn))==nil)) then            -- if zone is used (and not in list to be ignored) then setup attributes where
          ZoneT[zn .. ":T"] =  PDUtoString(string.sub(incomingPDU, i, i) )               -- T = Type code (01 = ee1, 03 = guard) 
          ZoneT[zn.. ":P"] =  PDUtoString(string.sub(incomingPDU, i+1, i+1) )      -- P = Partition that zone is assigned to
          if(luup.variable_get(PANEL_SID, "Cct ".. zn.. " Text", panel_device) == nil) then -- cct text not previously been gathered from the panel
            luup.variable_set(PANEL_SID, "Cct ".. zn.. " Text",  "(".. zn.. ")", panel_device) 
            ZoneT[zn.. ":N"] =  "(".. zn.. ")"                                                                         -- N = Zone Name Text (to be gathered later, for now just assign zone number) 
          else
            ZoneT[zn.. ":N"] =  luup.variable_get(PANEL_SID, "Cct ".. zn.. " Text", panel_device) -- cct text previously been gathered - restore from previous

            local s = string.format("Z%03d", zn)
            local child = findChild(panel_device, s)	
--            luup.attr_set("name",luup.variable_get(PANEL_SID, "Cct ".. zn.. " Text", panel_device), child)
          end
          ZoneT[zn.. ":C"] =  string.format("%03d", zn)                                               -- C = Circuit Number (ie "001")
          ZoneT[zn.. ":A"] = 0                                               -- A = Circuit currently Armed by Vera (boolean) 
          if CctsUsed == "" then
            CctsUsed = string.format("%03d", zn)                                                      -- first used zone - start the cct list of used ccts (eg. "1,2,4")
          else
            CctsUsed = CctsUsed .. ",".. string.format("%03d", zn)                            -- add this cct to the list of used ccts (eg. "001,002,004")
          end
          NumOfCcts = NumOfCcts +1                                                                       -- add to the used ccts total (eg. 3)
          zn = zn +1                                                                                                        -- increase Zone Number
          skipByte = 1                                                                                                     -- skip the next byte as should be area assignment byte 
        elseif (string.find(addUnusedCcts,PDUtoString(string.sub(incomingPDU, i, i)))~=nil) then --if the current unused zone is to be added                                                                                 -- if this byte is to be skipped (area assignment) make sure next byte isn't skipped
          ZoneT[zn .. ":T"] =  PDUtoString(string.sub(incomingPDU, i, i) )               -- T = Type code (01 = ee1, 03 = guard) 
          ZoneT[zn.. ":P"] =  PDUtoString(string.sub(incomingPDU, i+1, i+1) )      -- P = Partition that zone is assigned to
          if(luup.variable_get(PANEL_SID, "Cct ".. zn.. " Text", panel_device) == nil) then -- cct text not previously been gathered from the panel
            luup.variable_set(PANEL_SID, "Cct ".. zn.. " Text",  "(".. zn.. ")", panel_device) 
            ZoneT[zn.. ":N"] =  "(".. zn.. ")"                                                                         -- N = Zone Name Text (to be gathered later, for now just assign zone number) 
          else
            ZoneT[zn.. ":N"] =  luup.variable_get(PANEL_SID, "Cct ".. zn.. " Text", panel_device) -- cct text previously been gathered - restore from previous

            local s = string.format("Z%03d", zn)
            local child = findChild(panel_device, s)	
--            luup.attr_set("name",luup.variable_get(PANEL_SID, "Cct ".. zn.. " Text", panel_device), child)
          end
          ZoneT[zn.. ":C"] =  string.format("%03d", zn)                                               -- C = Circuit Number (ie "001")
          ZoneT[zn.. ":A"] = 0                                               -- A = Circuit currently Armed by Vera (boolean) 
          if CctsUsed == "" then
            CctsUsed = string.format("%03d", zn)                                                      -- first used zone - start the cct list of used ccts (eg. "1,2,4")
          else
            CctsUsed = CctsUsed .. ",".. string.format("%03d", zn)                            -- add this cct to the list of used ccts (eg. "001,002,004")
          end
          NumOfCcts = NumOfCcts +1                                                                       -- add to the used ccts total (eg. 3)
          zn = zn +1                                                                                                        -- increase Zone Number
          skipByte = 1                                                                                                     -- skip the next byte as should be area assignment byte 

        else -- Otherwise zone is unused and we aren't interested in it
          zn = zn +1                                                                                                        -- increase Zone Number 
          skipByte = 1                                                                                                     -- skip the next byte as should be area assignment byte 
        end
      end
      luup.variable_set(PANEL_SID, 'CctsUsed',  CctsUsed, panel_device) 
      --     UIvar('CctsUsed',CctsUsed)
    end
    message_type = "N"
    ZnSendEng()
    watchdog = 0
    retry = 0
    commFail = 0
    return true
  else
    luup.log("TEXECOM: Unrecognised PDU")
    local status = luup.variable_get(PANEL_SID, "Status",panel_device) 
    luup.variable_set(PANEL_SID, "Status", "Unrecognized PDU - ".. PDUtoString(outgoingPDU).. " MESSAGE = ".. message_type.. ", STATUS = ".. status , panel_device) 
    notifyUserP("UNRECOGNISED PDU - ".. PDUtoString(outgoingPDU).. " MESSAGE = ".. message_type,"1","1")
    return true
  end
end 
