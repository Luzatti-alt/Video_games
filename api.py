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

@db.route("/", methods=["GET"])
def root():
    return "só o root da api"
@db.route("/criar_conta", methods=["POST"])
def criar_conta():
    #js mandar como json _> pegar os dados do json
    dados = request.get_json()
    email = dados.get("email")
    nick = dados.get("nick")
    #criar verificação de nick
    senha = dados.get("senha")
    conta = session.query(conta).filter_by(email=email).first()
    conta_senha = bcrypt.generate_password_hash(dados["senha"]).decode("utf-8")
    nova_conta = conta(nick=nick,email=email,senha=conta_senha)
    session.add(nova_conta)
    session.commit()
    return jsonify({"status": "ok", "mensagem": "Conta criada com sucesso!"})

#iniciar flask
if __name__ == "__main__":
    db.run(host='0.0.0.0')