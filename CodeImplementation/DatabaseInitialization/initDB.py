from pymongo import MongoClient

def copy_collection(source_uri, destination_uri):
    source_client = MongoClient(source_uri)
    source_db = source_client['ConnVerse']
    source_collection = source_db['StoredUsers']

    destination_client = MongoClient(destination_uri)
    destination_db = destination_client.get_database(source_db.name)
    destination_collection = destination_db.get_collection(source_collection.name)

    destination_collection.drop()

    destination_collection.insert_many(source_collection.find())

    source_client.close()
    destination_client.close()

destination_uri = input("Enter the MongoDB URI: ")

source_uri = "mongodb+srv://user:mahadevs@cluster0.4f7oefr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

copy_collection(source_uri, destination_uri)

print("Database Initialization Complete!")
