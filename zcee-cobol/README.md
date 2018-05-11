# ibmCloudPlatform
Documentation for the IBM Cloud Platform work headed up by Vijay with assistance from several others on the team.

## IBM Z components
IBM Z has a z/OS Connect and CICS piece that provides an API for stocks and portfolios.  It also includes an MQ piece still to be designed and architected.

### Description and Notes
On the CICS side is a Cobol program and copybook named ISTPOMA (IST stands for IBM Stock Trader ... I think).  

### Processes
#### Disconnect CICS and zCEE
  This is needed for several other steps.  It is done from inside CICS
* BBOC STOP_SRVR RGN=CICSICP  
* Optionally: BBOC STOP_TRUE

#### Re-connect CICS and zCEE (assumes CICS and zCEE are both up)
* BBOC START_TRUE
* BBOC START_SRVR RGN=CICSICP DGN=GROUP NDN=CICSMLA SVN=NAME3 SVC=* MNC=1 MXC=10 TXN=N SEC=N REU=N 

#### Stop CICS
* Disconnect CICS and zCEE
* cemt p shut
* If Region still there in 2 minutes, then go to SDSF and  /c CICSICP

#### Start CICS
* s cics53x,REGNAM=ICP,SIP=IC,JOBNAME=CICSICP,CSD=ML (this is done from SDSF)
* Then move over to the CICS region and do
    * CEDA INS LIST(BBOLIST)
    * CEDA INS GR(ISTGRP)
    * Re-Connect CICS and zCEE

#### Stop z/OS Connect (ZCEEML)
* Disconnect CICS and zCEE
* /p bzceeml (from SDSF)

#### Start z/OS Connect (ZCEEML)
* s BAQSTRT,JOBNAME=bzceeml,PARMS='zceeml --clean'
* Re-Connect CICS and zCEE (if CICS is up)
