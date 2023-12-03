CREATE DATABASE projectCS;
USE projectCS;


CREATE TABLE organizacao (
	idOrg int primary key auto_increment,
    nomeOrg VARCHAR(45)
);

CREATE TABLE usuario (
	idUsuario int primary key auto_increment,
    username VARCHAR(45) UNIQUE NOT NULL,
    steamId VARCHAR(32) UNIQUE,
    senha VARCHAR(225) NOT NULL,
    fkOrganizacao INT,
    constraint fkOrg foreign key usuario(fkOrganizacao) references organizacao(idOrg) 
);

INSERT INTO usuario (username, steamID, senha, fkOrganizacao) VALUES 
	('MKS_Shoji', 'matheusshoji', 'mks_123', 1);

CREATE TABLE quiz (
	idQuiz int primary key auto_increment,
    tentativas int,
    acerto int,
    patente VARCHAR(45),
    fkUsuario int
);

INSERT INTO organizacao VALUES 
	(1, 'Furia'),
	(2, 'MIBR'),
	(3, 'Pain'),
	(4, 'Imperial'),
	(5, 'RED Canids'),
	(6, 'Sharks'),
	(7, 'Flamengo'),
	(8, 'Corinthians'),
	(9, 'Fluxo'),
	(10, 'Legacy');
    
SELECT * FROM organizacao;
SELECT * FROM usuario;
SELECT * FROM quiz;
SELECT * FROM organizacao where idOrg = 3;
SELECT usuario.username as "Nome do usuário", quiz.tentativas as "Perguntas respondidas", quiz.acerto as "Respostas corretas", 
	quiz.patente as "Patente do Usuário" FROM quiz JOIN usuario ON fkUsuario = idUsuario WHERE fkUsuario = 1;
SELECT usuario.username, usuario.fkOrganizacao FROM quiz JOIN usuario ON fkUsuario = idUsuario WHERE patente = "Global";
SELECT organizacao.nomeOrg FROM organizacao JOIN usuario ON fkOrganizacao = idOrg WHERE username = 'Rtshad';
SELECT SUM(tentativas) as "Tentativas total" FROM quiz;
SELECT usuario.username, COUNT(idQuiz) as "Quantidade de Quiz realizados" FROM quiz JOIN usuario ON fkUsuario = idUsuario WHERE fkUsuario = 1;
SELECT max(quiz.acerto) as "Máximo de acertos", min(quiz.acerto) as "Mínimo de acertos" FROM quiz;
    
DROP DATABASE projectCS;