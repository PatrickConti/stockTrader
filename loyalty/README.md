# loyalty-z
A loyalty service which is receives updates about users hitting a new Loyalty level (due to amount of funds in their portfolio), and pushes messages out to MQ for future processing.


### Building Docker Image
To build this Docker images correctly, an MQ Resource Adapter must be packaged into the Docker Image. The Resource Adapter is specific to the version of MQ you are running and can be found on FixCentral. http://www-01.ibm.com/support/docview.wss?uid=swg21633761

If any code changes are done locally, first make sure to export a new `.war` file to the `build` directory. Then the Docker image for this Service can be created using the following commands.

```
cd build
docker build . -t cc-z-hack/loyalty
```

### Environment Variables
```
MQ_HOST=129.40.117.225
MQ_PORT=1414
MQ_QM=MQZL
MQ_QUEUE_NAME=NOTIFICATION
```

- `MQ_HOST` - Hostname/IP of the MQ server
- `MQ_PORT` - Port of the MQ server
- `MQ_QM` - Name of the MQ Queue Manager of the MQ server
- `MQ_QUEUE_NAME` - Name of the Queue under the specified MQ Queue Manager where the notification service will listen for new messages
