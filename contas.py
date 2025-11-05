from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
engine = create_engine('sqlite:///contas_paralel.db',echo=True)
Base = declarative_base()
class Contas(Base):
    __tablename__ = 'contas'
    id = Column(Integer,primary_key=True)
    nick = Column(String(50))
    email = Column(String(50))
    senha = Column(String(20))
    meus_jogos = relationship('Biblioteca', back_populates='conta')
class Biblioteca(Base):
    __tablename__ = 'biblioteca'
    id = Column(Integer, primary_key=True)
    jogos = Column(String(59))#
    conta_id = Column(Integer, ForeignKey('contas.id'))  
    conta = relationship('Contas', back_populates='meus_jogos')
if __name__ == '__main__':
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    Session = Session()