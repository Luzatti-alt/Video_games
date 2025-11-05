from flask import Flask, jsonify, request, render_template, url_for
from flask_bcrypt import Bcrypt #encriptar a senha 
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from contas import Contas,Biblioteca
db = Flask(__name__)
bcrypt = Bcrypt(db)
engine = create_engine('sqlite:///meubanco.db', echo=True)
Session = sessionmaker(bind=engine)
session = Session()

@api.route("/", methods=["GET"])
def root():
    return "só o root da api"
#iniciar flask
if __name__ == "__main__":
    db.run(host='0.0.0.0')