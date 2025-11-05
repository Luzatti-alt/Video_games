from flask import Flask, jsonify, request, render_template, url_for
from flask_bcrypt import Bcrypt #encriptar a senha 
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import traceback
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
            nova_conta = Contas(nick=nick,email=email,senha=conta_senha)
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

@db.route("/login",methods=["POST"])
def login():
    try:
        dados = request.get_json(force=True)
        if not dados:
            return jsonify({"status": "erro", "mensagem": "JSON inválido"}), 400
        email = dados.get("email")
        senha = dados.get("senha")
        #output debug p/api
        if not email or not senha:
            return jsonify({"status": "erro", "mensagem": "Campos obrigatórios ausentes"}), 400
        #refatoração apos a mudança do db(podia ter avisado que mudou os emails)
        conta = session.query(db).filter_by(email=email).first()
        if not conta:
            return jsonify({"status": "erro", "mensagem": "Usuário não encontrado"}), 404
        if bcrypt.check_password_hash(conta.senha, senha):
            return jsonify({
                "status": "ok",
                "mensagem": f"Bem-vindo, {conta.nome_motorista} a paralel!",
                "usuario": {
                    "id": conta.id,
                    "nick": conta.nick,
                    "email": conta.email,
                    "jogos": conta.jogos
                    }
                    })
        else:
            return jsonify({"status": "erro", "mensagem": "Senha incorreta"}), 401
    except Exception as e:
        traceback.print_exc()  # mostra o erro completo no terminal
        return jsonify({"status": "erro", "mensagem": str(e)}), 500
    return

@db.route("/adicionar_carrinho/<jogos>", methods=["POST"])
def add_jogo_carrinho():
    return "adicionando <jogos> ao carrinho"

@db.route("/adicionar_jogo_conta/<jogos>", methods=["POST"])
def add_jogo_conta():
    #lista -> array da biblioteca
    return "adicionando <jogos> a conta"

#iniciar flask
if __name__ == "__main__":
    db.run(host='0.0.0.0')