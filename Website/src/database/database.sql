CREATE DATABASE projectCS;
USE projectCS;


CREATE TABLE organizacao (
	idOrg int primary key auto_increment,
    nomeOrg VARCHAR(45)
);

CREATE TABLE usuario (
	idUsuario int primary key auto_increment,
    username VARCHAR(45) UNIQUE NOT NULL,
    steamId VARCHAR(100) UNIQUE,
    senha VARCHAR(225) NOT NULL,
    fkOrganizacao INT,
    constraint fkOrg foreign key usuario(fkOrganizacao) references organizacao(idOrg) 
);

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
select * from organizacao where idOrg = 3;
SELECT * FROM quiz;
SELECT * FROM quiz JOIN usuario ON fkUsuario = idUsuario WHERE fkUsuario = 3;

INSERT INTO usuario (username, steamID, senha, fkOrganizacao) VALUES 
	('MKS_Shoji', 'matheusshoji', 'mks_123', 1);
    
DROP DATABASE projectCS;
