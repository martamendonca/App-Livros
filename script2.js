// assim que se clica no botao da primeira pagina ("Comecar") ele vai esconder essa pagina e vai faer aparecer o pimeiro livro

// Funcoes para a mainPage --------------------------------------------------

function Library() {

    this.filaBooks = new Queue(); //instanciar a classe Queue, que faz com que books deixe de ser um array para passar a ser uma fila

    this.viewedBooks = new Queue();

    this.actualBook = null; //cria um atributo que vai guardar o livro que esta a ser mostrado

    this.addBook = function (book) { //funcao para adicionar os livros a fila

        this.filaBooks.enqueue(book); // cria uma fila com todos os livros
    }

    this.runBook = function () { //vai buscar o proximo livro

        this.actualBook = this.filaBooks.dequeue(); //funcao que retira livros e esta definida numa classe em baixo (vai retirar o primeiro elemento)

        if (this.actualBook != null) {

            this.actualBook.render(); //vai correr a funcao render para aparecer o livro na interface

            this.viewedBooks.enqueue(this.actualBook); //fila viewedbooks com os livros que foram retirados da fila books
        }
        else {


        }

    }

    this.like = function () { //funcao que executa apenas quando se clica no botao like (definida mais abaixo)

        this.actualBook.likes++;  //funcao likes associada ao livro que esta a aparecer na interface. o valor do like do livro que esta a aparecer na interface passa para 1

        this.runBook(); //executa a funcao runBook para garantir que passa para o livro seguinte, assim apenas podera existir um like por livro
    }

    this.dislike = function () {

        this.actualBook.dislikes++;

        this.runBook();
    }


};


function Book(title, author, image, descricao, links) {
    this.title = title;
    this.author = author;
    this.image = image;
    this.descricao = descricao;
    this.links = links;
    this.likes = 0;
    this.dislikes = 0;

    this.render = function () {
        $("#title").html(this.title);
        $("#image").attr('src', this.image);
        $("#author").html(this.author);
        $("#descricao").html(this.descricao);
        $("#link").attr('href', this.links);
    }
};

function Queue() { //tipo de estrutura de dados. vai empilhando, tipo push and pop, first in first out

    this.data = [];

    this.enqueue = function (element) { //funcao para acrescentar livros na fila

        this.data.push(element) //adiciona elementos da fila do array data
    }

    this.dequeue = function () { //funcao para retirar elementos da fila

        var result = this.data[0]; //guarda o primeiro elemento na variavel result. como e variavel nao se coloca o this.

        this.data.splice(0, 1); //retira o primeiro elemento da fila

        return result;
    }
};

function init(paramPesquisa) {

    $.get("https://www.googleapis.com/books/v1/volumes?q=" + encodeURI(paramPesquisa)).done(function (data) {
        //encodeURI retira os espacos ou outros caracteres que foram introduzidos na interface
        //get vai buscar o link. done é a funcao call back
        console.log(data);

        for (i = 0; i < data.items.length; i++) {

            var bookInfo = data.items[i];

            var titulo = bookInfo.volumeInfo.title;
            var autor = bookInfo.volumeInfo.authors;
            var imagem = bookInfo.volumeInfo.imageLinks.thumbnail;
            var descricao = bookInfo.volumeInfo.description;
            var link = bookInfo.volumeInfo.infoLink;

            bookInfo = new Book(titulo, autor, imagem, descricao, link);


            library.addBook(bookInfo);

            console.log(bookInfo);
        }
        library.runBook();

    }).fail(function (data) {
        console.log(data);
    }) //data e a biblioteca com os livros da pesquisa

};


var library = new Library(); //instanciar

function loadTableResults() {
    var contadorLikes = 0;
    var contadorDislikes = 0;

    var livroActual = library.viewedBooks.dequeue();

    while (livroActual != null) {

        contadorLikes = contadorLikes + livroActual.likes;

        contadorDislikes = contadorDislikes + livroActual.dislikes;
        
        var rowHTML = `
                <tr>
                    <td>
                        ` + livroActual.title + `
                    </td>
                </tr>`;
                
        if (livroActual.likes >0){
            $('#livrosLiked tbody').append(rowHTML);
        }
        else {
        $('#livrosDisliked tbody').append(rowHTML);
        }

        livroActual = library.viewedBooks.dequeue();
    }

    $('#likes').html(contadorLikes);
    $('#dislikes').html(contadorDislikes);

}

function checkNoBooks (){
    if (library.filaBooks.data.length == 0){
        $("#mainPage").hide();
        $("#endPage").show();
        loadTableResults();
    }

}

$("#executa_pesquisa").click(function () {
    $("#startPage").hide();
    $("#mainPage").show();
    var paramPesquisa = $("#pesquisa").val();
    init(paramPesquisa);
});

$("#buttonLike").click(function () { //sempre que clico no botao like vai executar a funcao like que esta na classe library
    library.like();
    checkNoBooks();
});

$("#buttonDislike").click(function () {
    library.dislike();
    checkNoBooks();

});

$("#executa_nova_pesquisa").click(function () {
    $("#endPage").hide();
    $("#mainPage").show();
    var paramPesquisa = $("#novapesquisa").val();
    init(paramPesquisa);
});