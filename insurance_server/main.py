# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import pandas as pd


def reading_data():

    df = pd.read_csv("Data Set - Insurance Client.csv")
    print(df)

    row_json_data = df.to_json(orient='records')
    return row_json_data


def search_by_customer_id(ctx):
    return {"message":"Hello World"}


def search_by_product_id(ctx):
    return {"message":"Hello World"}