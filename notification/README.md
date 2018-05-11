# Notification
A service to read messages off of a specified MQ Queue and post them to IBM Functions for processing to Slack.


### Notes
This service uses MessageDrivenBeans from the Java EE framework.

In order to correctly use these classes, an `.ear` file must be created which contains the `ejb` code. This can be done by importing both the `notification` and `notificationejb` folder into an Eclipse workspace and exporting an `EAR` from the `notification` project.

### Building Docker Image
To build this Docker images correctly, an MQ Resource Adapter must be packaged into the Docker Image. The Resource Adapter is specific to the version of MQ you are running and can be found on FixCentral. http://www-01.ibm.com/support/docview.wss?uid=swg21633761

If any code changes are done locally, first make sure to export a new `.ear` file to the `build` directory. Then the Docker image for this Service can be created using the following commands.

```
cd notificationejb/build
docker build . -t cc-z-hack/notification
```

### Environment Variables
```
FUNCTIONS_URL=https://openwhisk.ng.bluemix.net/api/v1/namespaces/zcloud_prod/actions/cc-z-hack/LoyaltyToSlack?blocking=true
FUNCTIONS_API_KEY=b8f3e99e-8740-4afa-bf06-c740ad05ea82:J9gGMjk9f3KJomFKzDuAtLJmT6dOXsDVO0UnPFU19h09GwYnUrEX80GaN64K2Jqr
MQ_HOST=129.40.117.225
MQ_PORT=1414
MQ_QM=MQZL
MQ_QUEUE_NAME=NOTIFICATION
```

- `FUNCTIONS_URL` - OpenWhisk URL specified from the IBM Cloud Functions UI
- `FUNCTIONS_API_KEY` - OpenWhisk API Key specified from the IBM Cloud Functions UI
- `MQ_HOST` - Hostname/IP of the MQ server
- `MQ_PORT` - Port of the MQ server
- `MQ_QM` - Name of the MQ Queue Manager of the MQ server
- `MQ_QUEUE_NAME` - Name of the Queue under the specified MQ Queue Manager where the notification service will listen for new messages
