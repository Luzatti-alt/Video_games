from flask import Flask, jsonify, request, render_template, url_for
from flask_bcrypt import Bcrypt #encriptar a senha 
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from contas import Contas,Biblioteca
db = Flask(__name__)
bcrypt = Bcrypt(db)
engine = create_engine('sqlite:///contas_paralel.db', echo=True)
Session = sessionmaker(bind=engine)
session = Session()

@db.route("/", methods=["GET"])
def root():
    return "só o root da api"
@db.route("/criar_conta", methods=["POST"])
def criar_conta():
    try:
        #js mandar como json -> pegar os dados do json
        # #criar verificação de nick
        dados = request.get_json()
        email = dados.get("email")
        nick = dados.get("nick")
        conta = session.query(Contas).filter_by(email=email).first()
        #se conta ja existe
        if conta:
            return jsonify({"status": "erro", "mensagem": "Email já cadastrado!"})
        #verifica disponibilidade do nick
        if session.query(db).filter_by(nick=nick).first():
            conta_senha = bcrypt.generate_password_hash(dados["senha"]).decode("utf-8")
            nova_conta = conta(nick=nick,email=email,senha=conta_senha)
            #conectar com o bd
            session.add(nova_conta)
            session.commit()
            return jsonify({"status": "ok", "mensagem": "Conta criada com sucesso!"})
        else:
            return jsonify({"status": "ok", "mensagem": "nick ja cadastrado!"})
    except Exception as e:
        session.rollback()
        print(f"Erro ao cadastrar conta: {str(e)}")
        return jsonify({"erro": str(e)}), 500

#iniciar flask
if __name__ == "__main__":
    db.run(host='0.0.0.0')