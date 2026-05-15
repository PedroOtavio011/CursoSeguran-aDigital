let divQuiz = document.querySelector(".quiz");
let pontuacaoTotal = 0;
let questoesRespondidas = 0; 

addEventListener("DOMContentLoaded", () => {
    inicializarQuiz();
});

function inicializarQuiz() {
    pontuacaoTotal = 0;
    questoesRespondidas = 0;

    fetch("json/quiz.json")
        .then(response => response.json())
        .then(data => {
            let questoesEmbaralhadas = data.sort(() => Math.random() - 0.5);
            let cincoQuestoes = questoesEmbaralhadas.slice(0, 5);

            // Cria uma estrutura limpa com um topo para mostrar os pontos em tempo real
            divQuiz.innerHTML = `
                <div class="quiz-header">
                    <h2>Quiz de Segurança Digital</h2>
                    <div class="placar-tempo-real">Pontuação Atual: <span id="pontos-val">0</span> pontos</div>
                </div>
                <div class="questoes-container"></div>
                <div class="quiz-resultado-final" style="display: none;"></div>
            `;

            let containerQuestoes = divQuiz.querySelector(".questoes-container");

            cincoQuestoes.forEach((item, index) => {
                let cardQuestao = document.createElement("div");
                cardQuestao.classList.add("questao-card-grande"); 

                cardQuestao.innerHTML = `
                    <div class="questao-titulo">Questão ${index + 1} de 5</div>
                    <p class="pergunta-texto">${item.pergunta}</p>
                    <div class="alternativas-container" id="alternativas-${item.id}"></div>
                    <div class="feedback-box" id="feedback-${item.id}" style="display: none;"></div>
                `;

                containerQuestoes.appendChild(cardQuestao);

                let containerAlternativas = document.getElementById(`alternativas-${item.id}`);

                item.alternativas.forEach(alt => {
                    let botaoAlt = document.createElement("button");
                    botaoAlt.classList.add("btn-alternativa-grande"); // Botões maiores para facilitar o clique de idosos
                    botaoAlt.innerHTML = `<strong>${alt.opcao})</strong> ${alt.texto}`;

                    botaoAlt.addEventListener("click", () => {
                        validarResposta(item, alt, containerAlternativas, item.id);
                    });

                    containerAlternativas.appendChild(botaoAlt);
                });
            });
        })
        .catch(error => console.error("Erro ao carregar o quiz:", error));
}

function validarResposta(questao, alternativaClicada, container, questaoId) {
    let feedbackBox = document.getElementById(`feedback-${questaoId}`);
    
    let botoes = container.querySelectorAll("button");
    botoes.forEach(btn => btn.disabled = true);

    feedbackBox.style.display = "block";
    feedbackBox.innerText = alternativaClicada.feedback;

    if (alternativaClicada.correta) {
        feedbackBox.classList.add("feedback-sucesso");
        pontuacaoTotal += questao.pontos;
        // Atualiza o placar no topo em tempo real
        document.getElementById("pontos-val").innerText = pontuacaoTotal;
    } else {
        feedbackBox.classList.add("feedback-erro");
    }

    questoesRespondidas++;

    // Se ele respondeu as 5 questões, exibe a tela de fechamento
    if (questoesRespondidas === 5) {
        exibirTelaFinal();
    }
}

function exibirTelaFinal() {
    let resultadoBox = divQuiz.querySelector(".quiz-resultado-final");
    resultadoBox.style.display = "block";

    if (pontuacaoTotal >= 60) {
        resultadoBox.innerHTML = `
            <h3>🎉 Parabéns! Você foi muito bem!</h3>
            <p>Você atingiu <strong>${pontuacaoTotal} pontos</strong> e mostrou que sabe se proteger muito bem na internet!</p>
            <button class="btn-final-quiz btn-avancar">Avaliação Final</button>
        `;
        
        resultadoBox.querySelector(".btn-avancar").addEventListener("click", () => {
            alert("Redirecionando para a avaliação final...");
            window.location.href = "avaliacao.html"; 
        });

    } else {
        resultadoBox.innerHTML = `
            <h3>🌱 Quase lá! Vamos tentar mais uma vez?</h3>
            <p>Você fez <strong>${pontuacaoTotal} pontos</strong>. A média para passar é 60 pontos. Que tal rever as dicas e tentar de novo com calma?</p>
            <button class="btn-final-quiz btn-reiniciar">Tentar Novamente</button>
        `;

        // Evento do botão Reiniciar
        resultadoBox.querySelector(".btn-reiniciar").addEventListener("click", () => {
            inicializarQuiz();
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        });
    }
}