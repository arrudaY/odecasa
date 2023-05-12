create table if not exists Categorias(
    id int primary key not null,
    descricao varchar(250),
    qualificacao double,
    url_imagem varchar(100)
)