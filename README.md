# cc-z-hack
The cc-z-hack project is based off of the [IBM Stock Trader](https://github.com/IBMStockTrader) project, but ported to work with System z.

It contains the following services:
- [Trader](trader) - A frontend microservice that bridges all other services
- [Stock Quote](/stock-quote) - A microservice that uses [Quandl](https://www.quandl.com/) to current Stock information
- [Loyalty](loyalty) - A microservice that receives notifications about new loyalty level updates and posts them to MQ
- [Notification](notification) - A microservice that watches for new messages on MQ and sends information to [IBM Functions](https://console.bluemix.net/openwhisk/) to perform additional notification processing like updating Slack

### Importing into Eclipse
Many of these services are written in Java and can be imported directly into Eclipse. For more information follow the [Importing into Eclipse Guide](docs/eclipse_import.md).


### Docker Compose
A `docker-compose.yml` is provided in the `build` folder that should allow the full service stack to work locally, given that the images have already been built correctly.
# stockTrader
