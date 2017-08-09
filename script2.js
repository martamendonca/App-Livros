$opinion = [];

$('#buttonStart').click(function () {

    $("#startPage").hide();
    $("#mainPage").show();

});
// assim que se clica no botao da primeira pagina ("Comecar") ele vai esconder essa pagina e vai faer aparecer o pimeiro livro

// Funcoes para a mainPage --------------------------------------------------

    function Library(){

        this.filaBooks= new Queue (); //instanciar a classe Queue, que faz com que books deixe de ser um array para passar a ser uma fila
   
        this.viewedBooks= new Queue();

        this.actualBook= null; //cria um atributo que vai guardar o livro que esta a ser mostrado

        this.addBook= function(book){ //funcao para adicionar os livros a fila

            this.filaBooks.enqueue(book); // cria uma fila com todos os livros
        }
   
        this.runBook=function(){ //vai buscar o proximo livro

            this.actualBook = this.filaBooks.dequeue(); //funcao que retira livros e esta definida numa classe em baixo (vai retirar o primeiro elemento)
            
            // if (...... != null){

                this.actualBook.render(); //vai correr a funcao render para aparecer o livro na interface
            
                this.viewedBooks.enqueue(this.actualBook); //fila viewedbooks com os livros que foram retirados da fila books
            // }
            // else {
                // $("#mainPage").hide();
                // $("#endPage").show();

            // }

        }

        this.like=function(){ //funcao que executa apenas quando se clica no botao like (definida mais abaixo)

            this.actualBook.likes++;  //funcao likes associada ao livro que esta a aparecer na interface. o valor do like do livro que esta a aparecer na interface passa para 1

            this.runBook(); //executa a funcao runBook para garantir que passa para o livro seguinte, assim apenas podera existir um like por livro
        }
        
        this.dislike=function(){

            this.actualBook.dislikes++;

            this.runBook();
        }

        this.counterLikes=function(){

            var contadorLikes=0;

            var contadorDislikes=0;

            var livroActual= this.viewedBooks.dequeue();

            while (livroActual!= null){
                
                contadorLikes= contadorLikes + livroActual.likes;

                contadorDislikes= contadorDislikes + livroActual.dislikes;

                livroActual= this.viewedBooks.dequeue();

            return contadorLikes;
            return contadorDislikes;

            }
        }
    };

    function Book(title, image, descricao, links){
        this.title=title;
        this.image=image;
        this.descricao=descricao;
        this.links=links;
        this.likes=0;
        this.dislikes=0;

        this.render=function(){
            $("#title").html(this.title);
            $("#image").attr('src',this.image);
            $("#descricao").html(this.descricao);
            $("#links").attr('href',this.links);
        }   
    };

    function Queue(){ //tipo de estrutura de dados. vai empilhando, tipo push and pop, first in first out

        this.data = []; 

        this.enqueue = function(element){ //funcao para acrescentar livros na fila
        
            this.data.push(element) //adiciona elementos da fila do array data
        }

        this.dequeue = function(){ //funcao para retirar elementos da fila

            var result = this.data[0]; //guarda o primeiro elemento na variavel result. como e variavel nao se coloca o this.

            this.data.splice(0,1); //retira o primeiro elemento da fila

            return result;
        }
    };



    var library = new Library(); //instanciar

    var book1= new Book("Os Lusíadas", "OsLusiadas.jpg", "Considerada a epopeia portuguesa por excelência. Obra poética de <strong>Luís de Camões</strong> onde é consagrada a história de Portugal até à epopeia dos descobrimentos.",["http://www.fnac.pt/Os-Lusiadas-Luis-de-Camoes/a959399","https://www.bertrand.pt/ficha/os-lusiadas?id=2145159","https://www.wook.pt/livro/os-lusiadas-luis-de-camoes/2145159"]);
    var book2= new Book("Os Maias", "Maias.jpg","Uma das obras mais conhecidas de <strong>Eça de Queirós</strong>, que conta a história da família Maia ao longo de três gerações, centrando-se depois na última com a história de amor entre Carlos da Maia e Maria Eduarda.",["http://www.fnac.pt/Os-Lusiadas-Luis-de-Camoes/a959399","https://www.bertrand.pt/ficha/os-lusiadas?id=2145159","https://www.wook.pt/livro/os-lusiadas-luis-de-camoes/2145159"]);
    var book3= new Book("Mensagem", "Mensagem.jpg","Livro do poeta <strong>Fernando Pessoa</strong>. A obra trata do glorioso passado de Portugal de forma apologética e tenta encontrar um sentido para a antiga grandeza e a decadência existente na época.",["http://www.fnac.pt/Os-Lusiadas-Luis-de-Camoes/a959399","https://www.bertrand.pt/ficha/os-lusiadas?id=2145159","https://www.wook.pt/livro/os-lusiadas-luis-de-camoes/2145159"]);
    
    var books= new Queue();

    //para executar a funcao:
    library.addBook(book1); //coloca a variavel book1 na funcao addBook 
    library.addBook(book2);
    library.addBook(book3);


    library.runBook(); //para correr o primeiro livro 

    $("#buttonLike").click(function(){ //sempre que clico no botao like vai executar a funcao like que esta na classe library
        library.like();
    });

    $("#buttonDislike").click(function(){
        library.dislike();
    });

    // $('#likes').text(likes);