console.log("helloworld"); 

function Stack(){ //tipo de estrutura de dados. vai empilhando, tipo push and pop, last in first out

    this.data = [];

    this.push = function(element){
        this.data.push(element) //adiciona elementos no array
    }
    this.pop = function(){
        var result = this.data[this.data.length-1];

        // this.data.remove(this.data.lenght-1);
        this.data.pop(); //retira o ultimo elemento do array

        return result;
    }
};

function Car(brand,model){
    this.brand=brand;
    this.model=model;
}

var stack1 = new Stack(); //instanciar

stack1.push(2); //acrescentar o 2 no array
stack1.push(3);
stack1.push(4);

// var b = data[data.lenght-1]; //indica o ultimo valor do array

var hondaCivic = new Car("Honda","Civic");
var citroenC4 = new Car("Citroen","C4");

var ferroVelho = new Stack();  // criar uma pilha de carros

ferroVelho.push(citroenC4);
ferroVelho.push(hondaCivic);

ferroVelho.pop(); //retira o ultimo elemento a entrar, porque e stack, que neste caso e o hondaCivic

ferroVelho.push(citroenC4); //fica um array com 2 vezes o mesmo objecto, ha um Citroen C4 em 2 posicoes


function Queue(){ //tipo de estrutura de dados. vai empilhando, tipo push and pop, first in first out

    this.data = [];

    this.enqueue = function(element){
        
        this.data.push(element) //adiciona elementos no array

    }
    this.dequeue = function(){

        var result = this.data[0]; //guarda o primeiro elemento na variavel result. como e variavel nao se coloca o this.

        this.data.splice(0,1); //retira o primeiro elemento do array

        return result;
    }
};

var queue1 = new Queue();


//para acrescentar valores ao array data:
queue1.enqueue("marta");
queue1.enqueue("marco");
queue1.enqueue("paulo");
// data =[marta, marco, paulo]

queue1.dequeue();
//retira o primeiro elemento -> // data =[marco,paulo]



