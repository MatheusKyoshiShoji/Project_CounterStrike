var numeroQuestao = document.querySelector(".question-number");
var textoQuestao = document.querySelector(".question-text");
var elementoOpcaoContainer = document.querySelector(".option-container")
var elementoIndicadorResposta = document.querySelector(".respostas");
var inicioBox = document.querySelector(".quiz-start")
var quizBox = document.querySelector(".quiz-box")
var resultadoBox = document.querySelector(".result-box")

var contadorQuestao = 0;
var questaoCorrespondente;
var questoesDisponiveis = [];
var opcoesDisponiveis = [];
var respostaCorretas = 0;
var respostaErradas = 0;
var tentativas = 0;

function registarQuestoesDisponiveis() {
    var totalQuestoes = quiz.length;
    for (var i = 0; i < totalQuestoes; i++) {
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
    for (var i = 0; i < opcaoTamanho; i++) {
        opcoesDisponiveis.push(i);
    }
    elementoOpcaoContainer.innerHTML = '';
    var animacaoDelay = 0.2;
    // Inserir as opções no html
    for (var i = 0; i < opcaoTamanho; i++) {
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
    if (id === questaoCorrespondente.resposta) {
        element.classList.add("correct");
        atualizarIndicador("correct");
        respostaCorretas++;
        console.log(respostaCorretas);
    } else {
        element.classList.add("wrong");
        atualizarIndicador("wrong");
        respostaErradas++;
        var opcaoTamanho = elementoOpcaoContainer.children.length;
        for (var i = 0; i < opcaoTamanho; i++) {
            if (parseInt(elementoOpcaoContainer.children[i].id) === questaoCorrespondente.resposta) {
                elementoOpcaoContainer.children[i].classList.add("correct");
            }
        }
    }
    tentativas++;
    bloquearOpcao();
}

function indicadorResposta() {
    elementoIndicadorResposta.innerHTML = "";
    var totalQuestoes = quiz.length;
    for (var i = 0; i < totalQuestoes; i++) {
        var indicador = document.createElement("div");
        elementoIndicadorResposta.appendChild(indicador);
    }
}

function atualizarIndicador(tipoMarca) {
    // Adicionar classe de corrto no elemento
    elementoIndicadorResposta.children[contadorQuestao - 1].classList.add(tipoMarca);
}

function proximaAlternativa() {
    if (contadorQuestao === quiz.length) {
        console.log("Acabou o quiz");
        finalizaQuiz();
    } else {
        novaQuestao();
    }
}

function finalizaQuiz() {
    // Esconder o quiz
    quizBox.classList.add("hide");
    // Mostar resultado
    resultadoBox.classList.remove("hide");
    resultadoQuiz();
}

function resultadoQuiz() {
    var listaPatente = ['Prata1', 'Prata1', 'Prata1', 'Prata2', 'Prata3', 'Prata4', 'Prata5', 'Prata6', 'Ouro1', 'Ouro2', 'Ouro3',
        'Ouro4', 'AK1', 'AK2', 'AK3', 'Xerifie', 'Aguia1', 'Aguia2', 'Supremo', 'Supremo', 'Global'];
    resultadoBox.querySelector(".total-question").innerHTML = quiz.length;
    resultadoBox.querySelector(".total-attempt").innerHTML = tentativas;
    resultadoBox.querySelector(".total-correct").innerHTML = respostaCorretas
    resultadoBox.querySelector(".total-wrong").innerHTML = tentativas - respostaCorretas;
    var porcentagemAcerto = (respostaCorretas / quiz.length) * 100;
    resultadoBox.querySelector(".total-percentage").innerHTML = porcentagemAcerto.toFixed(2) + '%';
    resultadoBox.querySelector(".total-score").innerHTML = listaPatente[respostaCorretas];
    /* `<img src="img/rank_guardian.png" alt="rank"></img>`     */

    var fkUsuario = sessionStorage.ID_USUARIO

    console.log(fkUsuario)

    fetch("/quiz/resultado", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            tentativasServer: tentativas,
            acertoServer: respostaCorretas,
            patenteServer: listaPatente[respostaCorretas],
            fkUsuarioServer: fkUsuario,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                alert("Quiz realizado com sucesso!")

                setTimeout(() => {
                    alert("Foi");
                }, "2000");

            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            /* finalizarAguardar(); */
        });
}

function resetarQuiz() {
    contadorQuestao = 0;
    respostaCorretas = 0;
    tentativas = 0;
}

function tentarNovamente() {
    resultadoBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetarQuiz();
    iniciarQuiz();
}

function voltarInicio() {
    resultadoBox.classList.add("hide");
    inicioBox.classList.remove("hide")
    resetarQuiz();
}

// FUNÇÕES INICIALIZADAS PARA O QUIZ

function iniciarQuiz() {

    // Econder quiz
    inicioBox.classList.add("hide");
    // Mostar quiz
    quizBox.classList.remove("hide");

    registarQuestoesDisponiveis();
    novaQuestao()
    indicadorResposta();
}