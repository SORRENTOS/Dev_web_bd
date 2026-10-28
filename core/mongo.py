import os
from pathlib import Path
from dotenv import load_dotenv
from pymongo import MongoClient

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

MONGODB_URL = os.getenv(
    "MONGODB_URL",
    "mongodb+srv://guillermotolentino05_db_user:4E3bLbVQH8wo1QIm@database1.niui9a2.mongodb.net",
)
MONGODB_NAME = os.getenv("MONGODB_NAME", "buhonero_db")
MONGODB_COLLECTION = os.getenv("MONGODB_COLLECTION", "productos")

_client = None

def get_client():
    global _client
    if _client is None:
        _client = MongoClient(MONGODB_URL)
    return _client

def get_db():
    return get_client()[MONGODB_NAME]

def get_productos_collection():
    return get_db()[MONGODB_COLLECTION]