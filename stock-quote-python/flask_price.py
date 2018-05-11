import quandl
from flask import Flask
from flask import jsonify

quandl.ApiConfig.api_key = "_2VFhkQ446andCSWu2Mi"
app = Flask(__name__)


@app.route("/stock-quote/<symbol>")
def get_price(symbol):
    df = quandl.get("WIKI/{}.4".format(symbol), rows=1)
    # print(mydata)
    dict = {}
    dict["symbol"] = symbol
    dict["date"] = str(df.index[0]).split(" ")[0]
    dict["price"] = df.iloc[0]['Close']
    # return "Hello World!"
    return jsonify(dict)

if __name__=='__main__':
    app.run(host='0.0.0.0', port=9081)
