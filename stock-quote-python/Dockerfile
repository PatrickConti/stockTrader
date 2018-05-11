FROM python

RUN pip install Flask
RUN pip install quandl

COPY flask_price.py .

EXPOSE 9081
CMD python flask_price.py
