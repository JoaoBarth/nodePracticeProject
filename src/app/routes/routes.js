module.exports = (app) =>{
    app.get('/', function(req, resp) {
        const livroDao = new LivroDao(db);
        livroDao.lista().then(livros => resp.marko(
            require('../../views/index.marko'),
            {
                livros: livros
            }

        ))
        .catch(erro => console.log(erro));
    });
}