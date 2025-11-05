from flask import Flask, jsonify, request, render_template, url_for
from flask_bcrypt import Bcrypt #encriptar a senha 
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from contas import Contas,Biblioteca