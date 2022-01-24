# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.

import pandas as pd
import pymongo
import json


def update_db():
    client = pymongo.MongoClient("mongodb://localhost:27017")
    df = pd.read_csv("Data Set - Insurance Client.csv")
    db=client["insuranceData"]
    db.insert_many(df)
    data=df.to_dict(orient="records")
    print(data)


def reading_data():
    try:
        df = pd.read_csv("Data Set - Insurance Client.csv")
        client = pymongo.MongoClient("mongodb://localhost:27017")
        db = client["insuranceData"]
        db.product.insert_many(df.to_dict('records'))
    except Exception as e:
        print(e)

    row_json_data = df.to_json(orient='records')
    return row_json_data


def search_by_customer_id(ctx):
    return {"message":"Hello World"}


def search_by_product_id(ctx):
    return {"message":"Hello World"}