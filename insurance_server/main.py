# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.


import pymongo
from pymongo import MongoClient
from flask import Flask,jsonify,request,render_template
import pandas as pd
from bson.objectid import ObjectId
import json
client = MongoClient('localhost', 27017)
db = client['insuranceData']


def inserting_data():
    try:
        df = pd.read_csv("Data Set - Insurance Client.csv")
        db.product.insert_many(df.to_dict('records'))
    except Exception as e:
        print(e)
    row_json_data = df.to_json(orient='records')
    return row_json_data


def fetching_data():
    try:
        collection = db['product']
        policies = list(collection.find())
        for policy in policies:
            policy["_id"] = str(policy["_id"])
        return policies
    except Exception as e:
        print(e)
        return {"message":"cannot read data"}


def updating_data(id):
    try:
        res = request.json
        print('res is -----',id)
        collection = db['product']
        policy = collection.replace_one({"_id":ObjectId(id)},res)
        print('policy is---- ',policy)
        return {"message": "cannot read data"}
    except Exception as e:
        print(e)
        return {"message":"cannot read data"}


def filtering_data(param):
    try:
        collection = db['product']
        if param == "All":
            filter_by_month = list(collection.aggregate([{"$group": {'_id': {"$month": {"$toDate": "$Date of Purchase"}}, "Premium": {"$sum": "$Premium"}}}]))
        else:
            filter_by_month = list(collection.aggregate([{"$match":{"Customer_Region":param}},{"$group":{'_id':{"$month":{"$toDate":"$Date of Purchase"}},"Premium":{"$sum":"$Premium"}}}]))
        for row in filter_by_month:
            row["_id"] = str(row["_id"])
        print("res is", filter_by_month)
        return filter_by_month
    except Exception as e:
        print(e)


def filtering_gender():
    try:
        collection = db['product']
        filter_by_gender = list(collection.aggregate([{"$group": {'_id': '$Customer_Gender', "Premium": {"$sum": "$Premium"}}}]))
        for row in filter_by_gender:
            row["_id"] = str(row["_id"])
        print("res is", filter_by_gender)
        return filter_by_gender
    except Exception as e:
        print(e)


def search_by_customer_id(ctx):
    return {"message":"Hello World"}


def search_by_product_id(ctx):
    return {"message":"Hello World"}