z/OS Connect Enterprise Edition Build Toolkit
=============================================

IBM Knowledge Center
--------------------
More information about the Build Toolkit is provided in the IBM Knowledge Center at:
https://www.ibm.com/support/knowledgecenter/SS4SVW_3.0.0/com.ibm.zosconnect.doc/overview/build_toolkit.html 

Running the Build Toolkit
-------------------------

The zconbt command is supplied in the bin directory, three variations are supplied:
   zconbt      for use on a UNIX or Linux or MAC operating system.
   zconbt.bat  for use on a Windows operating system.
   zconbt.zos  for use on a z/OS operating system.

The command syntax is:

Usage:  zconbt --properties=<properties file> --file=<archive file>

        --properties | -p - The file containing the properties for creating the archive
        --file | -f - The name of the archive file to create
        --help | -h - Display this message
        --verbose | -v - Output diagnostic information


Building a Service Archive(SAR) file
------------------------------------
To create a service archive file, define the service configuration in a properties file and run the zconbt command.
The archive file name must end with .sar

e.g. zconbt --properties=service1.properties --file=service1.sar 

Building an API Requester Archive(ARA) file
-------------------------------------------
To create an API requester archive file, define the API requester configuration in a properties file and run the zconbt command.
The archive file name must end with .ara

e.g. zconbt --properties=watson_translator2.properties --file=watson_translator2.ara 

Sample Files
------------
samples/service/sample_restClient_sar.properties is the sample properties file for REST client service provider.
samples/apiRequester/sample_ara.properties is the sample properties file for API requester.

*******************************************************************************
(C) Copyright IBM Corporation 2017 All rights reserved.
    For legal information, see http://www.ibm.com/legal/copytrade.shtml
*******************************************************************************