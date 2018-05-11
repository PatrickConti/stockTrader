# Stock Quote Service
A service to fetch the most recent stock prices from [Quandl](https://www.quandl.com/)

### Building Docker Image
If any code changes are done locally, first make sure to export a new `.war` file to the `build` directory. Then the Docker image for this Service can be created using the following commands.

```
cd build
docker build . -t cc-z-hack/stock-quote
```

### Environment Variables
```
QUANDL_KEY=_2VFhkQ446andCSWu2Mi
```

- `QUANDL_KEY` - An API Key retrieved from Quandl after creating a new account
