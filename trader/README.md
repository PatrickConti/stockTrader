# trader
The Z OS version of the "Trader" Frontend


### Building Docker Image
If any code changes are done locally, first make sure to export a new `.war` file to the `build` directory. Then the Docker image for this Service can be created using the following commands.

```
cd build
docker build . -t cc-z-hack/trader
```

### Running Docker Container & Required Envirionment Variables
This Docker container requires a few environment variables to be set within the container in order for the code to connect properly.

```
ZCEE_URL=https://129.40.117.225:9443
ZCEE_USER=Fred
ZCEE_PASS=fredpwd
QUOTE_HOST=host.docker.internal
LOYALTY_HOST=host.docker.internal
```

- `ZCEE_URL` - URL of the zOS Connect EE Server, including port.
- `ZCEE_USER` - Username which has been given access to hit the zOS Connect APIs
- `ZCEE_PASS` - Password for the above user  
- `QUOTE_HOST` - The hostname/ip for the Stock Quote Service
- `LOYALTY_HOST` - The hostname/ip for the Loyalty Service

**Note**: The internal networking for the Stock Quote and Loyalty services may need to be configured properly in Kubernetes environments that are proxied.
