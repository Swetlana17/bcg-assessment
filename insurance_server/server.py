from flask import Flask,jsonify,render_template
import pandas as pd
from main import reading_data
from main import search_by_customer_id
from main import search_by_product_id
app = Flask(__name__)


@app.route('/')
def hello():
    return {"message":"Hello World"}


@app.route('/data')
def insurance_data():
    data = reading_data()
    return data


@app.route('/product_id')
def find_data(ctx):
    return search_by_product_id(ctx)


@app.route('/customer_id')
def find_data(ctx):
    return search_by_customer_id(ctx)


if __name__ == '__main__':
    app.run()