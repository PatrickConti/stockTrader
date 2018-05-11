import quandl

quandl.ApiConfig.api_key = "_2VFhkQ446andCSWu2Mi"

symbol = "IBM"

df = quandl.get("WIKI/{}.4".format(symbol), rows=1)

dict = {}
dict["symbol"] = symbol
dict["date"] = str(df.index[0]).split(" ")[0]
dict["price"] = df.iloc[0]['Close']
print(dict)
