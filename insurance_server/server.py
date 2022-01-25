from flask import Flask,jsonify,request,render_template
import pandas as pd
from main import inserting_data,fetching_data,updating_data,filtering_data,filtering_Gender
from main import search_by_customer_id
from main import search_by_product_id
from bson.objectid import ObjectId
app = Flask(__name__)
from pymongo import MongoClient


@app.route('/')
def hello():
    return {"message":"Hello World"}


@app.route('/upload_data')
def insurance_data():
    data = inserting_data()
    return data


@app.route('/data',methods=['GET'])
def fetch_data():
    try:
        return jsonify(fetching_data())
    except Exception as e:
        print(e)
        return {"message":"cannot read data"}


@app.route('/update_data/<id>',methods=['PUT'])
def update_data(id):
    return updating_data(id)


@app.route('/filter/<region>', methods=['GET'])
def filter_data(region):
    print("============================================================",region);
    return jsonify(filtering_data(region))


@app.route('/filter_gender', methods=['GET'])
def filter_by_gender():
    return jsonify(filtering_Gender())


@app.route('/product_id')
def find_data(ctx):
    return search_by_product_id(ctx)


@app.route('/customer_id')
def find(ctx):
    return search_by_customer_id(ctx)


if __name__ == '__main__':
    app.run()