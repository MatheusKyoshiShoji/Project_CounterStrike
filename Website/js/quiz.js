var numeroQuestao = document.querySelector(".question-number");
var textoQuestao = document.querySelector(".question-text");
var elementoOpcaoContainer = document.querySelector(".option-container") 

var contadorQuestao = 0;
var questaoCorrespondente;
var questoesDisponiveis = [];
var opcoesDisponiveis = [];

function registarQuestoesDisponiveis() {
    var totalQuestoes = quiz.length;
    for(var i = 0; i < totalQuestoes; i++) {
        questoesDisponiveis.push(quiz[i]);
    }
}

function novaQuestao() {
    // Número do índice da questão 
    numeroQuestao.innerHTML = "Questão " + (contadorQuestao + 1) + ' de ' + quiz.length;

    // Pegar questão randomica
    const indiceQuestao = questoesDisponiveis[parseInt(Math.random() * questoesDisponiveis.length)];
    // Título da questão
    questaoCorrespondente = indiceQuestao;
    textoQuestao.innerHTML = questaoCorrespondente.q;
    // Pegar a posição do indice da questao  da lista questoesDisponiveis
    const indice1 = questoesDisponiveis.indexOf(indiceQuestao);
    // Remove os indices das questões da lista de questoesDisponiveis, evita com que as questoes não se repitam
    questoesDisponiveis.splice(indice1, 1);

/*     console.log(indiceQuestao); */
/*     console.log(questaoCorrespondente.opcao); */


    var opcaoTamanho = questaoCorrespondente.opcao.length;
    // Enviar as opções disponiveis para o vetor
    for(var i = 0; i < opcaoTamanho; i++) {
        opcoesDisponiveis.push(i);
    }
    elementoOpcaoContainer.innerHTML = '';
    var animacaoDelay = 0.2; 
    // Inserir as opções no html
    for(var i = 0; i < opcaoTamanho; i++ ) {
        var opcaoIndice = opcoesDisponiveis[parseInt(Math.random() * opcoesDisponiveis.length)];
        var indice2 = opcoesDisponiveis.indexOf(opcaoIndice);
        opcoesDisponiveis.splice(indice2, 1);
         /* console.log(opcaoIndice); */


        var elementoOpcao = document.createElement("div");
        elementoOpcao.innerHTML = questaoCorrespondente.opcao[opcaoIndice];
        elementoOpcao.id = opcaoIndice;
        elementoOpcao.style.animationDelay = animacaoDelay + 's';
        animacaoDelay = animacaoDelay + 0.2;
        elementoOpcao.className = 'option';
        elementoOpcaoContainer.appendChild(elementoOpcao);
        elementoOpcao.setAttribute("onclick", "verificarResposta(this)");
    }

    contadorQuestao++;
}


function bloquearOpcao() {
    var opcaoTamanho = elementoOpcaoContainer.children.length;
    for (var i = 0; i < opcaoTamanho; i++) {
        elementoOpcaoContainer.children[i].classList.add('opcao-bloqueada')
    }
}

function verificarResposta(element) {
    var id = parseInt(element.id);
    // Pega o valor do id da resposta e compara com a resposta da questao correspondente
    if(id === questaoCorrespondente.resposta) {
        console.log("certo")
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");

        var opcaoTamanho = elementoOpcaoContainer.children.length;
        for (var i = 0; i < opcaoTamanho; i++) {
            if(parseInt(elementoOpcaoContainer.children[i].id) === questaoCorrespondente.resposta) {
                elementoOpcaoContainer.children[i].classList.add("correct");
            }
        }
    }
    bloquearOpcao();
}

function proximaAlternativa() {
    if(contadorQuestao === quiz.length) {
        console.log("Acabou o quiz");
    } else {
        novaQuestao();
    }
}

window.onload = function() {
    registarQuestoesDisponiveis();
    novaQuestao()
}