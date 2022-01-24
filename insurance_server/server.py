from flask import Flask,jsonify,request,render_template
import pandas as pd
from main import reading_data
from main import search_by_customer_id
from main import search_by_product_id
from bson.objectid import ObjectId
app = Flask(__name__)
from pymongo import MongoClient

@app.route('/')
def hello():
    return {"message":"Hello World"}


@app.route('/data',methods=['GET'])
def fetch_data():
    try:
        client = MongoClient('localhost', 27017)
        db = client['insuranceData']
        collection = db['product']
        policies=list(collection.find())
        for policy in policies:
            policy["_id"]=str(policy["_id"])
        print(jsonify(policies))
        return jsonify(policies)
    except Exception as e:
        print(e)
        return {"message":"cannot read data"}


@app.route('/upload_data')
def insurance_data():
    data = reading_data()
    return data


@app.route('/update_data/<id>',methods=['PUT'])
def update_data(id):
    try:
        res = request.json
        print('res is -----',id)
        client = MongoClient('localhost', 27017)
        db = client['insuranceData']
        collection = db['product']
        policy = collection.replace_one({"_id":ObjectId(id)},res)
        print('policy is---- ',policy)
    except Exception as e:
        print(e)
    return {"message":"cannot read data"}



@app.route('/product_id')
def find_data(ctx):
    return search_by_product_id(ctx)


@app.route('/customer_id')
def find(ctx):
    return search_by_customer_id(ctx)


if __name__ == '__main__':
    app.run()