from sqlalchemy import create_engine, Column, Integer, String, Bool
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
engine = create_engine('sqlite:///contas_paralel.db',echo=True)
Base = declarative_base()
class Contas(Base):
    id = Column(Integer,primary_key=True)
    nick = Column(String(50))
    email = Column(String(50))
    senha = Column(String(20))
    meus_jogos = relationship('biblioteca', back_populates='contas')
class Biblioteca(Base):
    jogos = Column(String(59))#
if __name__ == '__main__':
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    Session = Session()