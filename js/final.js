let divQuiz = document.querySelector(".quiz");
let pontuacaoTotal = 0;
let questoesRespondidas = 0;

addEventListener("DOMContentLoaded", () => {
  inicializarAvaliacao();
});

function inicializarAvaliacao() {
  pontuacaoTotal = 0;
  questoesRespondidas = 0;

  fetch("json/final.json")
    .then((response) => response.json())
    .then((data) => {
      let questoesEmbaralhadas = data.sort(() => Math.random() - 0.5);

      let cincoQuestoes = questoesEmbaralhadas.slice(0, 5);

      divQuiz.innerHTML = `
                <div class="conteudoDiv" style="margin-bottom: 20px; text-align: center;">
                    <h2>Instruções da Avaliação</h2>
                    <p>Esta avaliação contém 5 questões valendo 20 pontos cada. Para concluir o curso e conquistar o seu distintivo de segurança, você precisa alcançar pelo menos <strong>80 pontos</strong>!</p>
                    <div style="font-size: 1.5rem; font-weight: bold; color: var(--azulPrincipal);">
                        Sua Pontuação: <span id="pontos-val">0</span> / 100
                    </div>
                </div>
                <div class="questoes-container"></div>
                <div class="quiz-resultado-final" style="display: none; margin: 0 auto;"></div>
            `;

      let containerQuestoes = divQuiz.querySelector(".questoes-container");

      cincoQuestoes.forEach((item, index) => {
        let cardQuestao = document.createElement("div");
        cardQuestao.classList.add("questao-card-grande");
        cardQuestao.style.margin = "30px auto"; // Centraliza o bloco na página

        cardQuestao.innerHTML = `
                    <div class="conteudoDiv" style="padding: 20px; margin: 0 0 15px 0; border-bottom: 3px solid var(--azulPrincipal);">
                        <strong style="color: var(--azulPrincipal); font-size: 1.4rem;">Pergunta ${index + 1} de 5</strong>
                    </div>
                    <p class="container p" style="font-size: 1.4rem; text-align: left; font-weight: 500;">${item.pergunta}</p>
                    <div class="alternativas-container" id="alternativas-${item.id}"></div>
                    <div class="conteudoDiv" id="feedback-${item.id}" style="display: none; padding: 20px; margin-top: 15px;"></div>
                `;

        containerQuestoes.appendChild(cardQuestao);

        let containerAlternativas = document.getElementById(
          `alternativas-${item.id}`,
        );

        item.alternativas.forEach((alt) => {
          let botaoAlt = document.createElement("button");
          botaoAlt.classList.add("btn-alternativa-grande");
          botaoAlt.style.color = "white"; // Garante leitura já que o fundo do botão é azulHover no seu CSS
          botaoAlt.innerHTML = `<strong>${alt.opcao})</strong> ${alt.texto}`;

          botaoAlt.addEventListener("click", () => {
            validarRespostaFinal(item, alt, containerAlternativas, item.id);
          });

          containerAlternativas.appendChild(botaoAlt);
        });
      });
    })
    .catch((error) =>
      console.error("Erro ao carregar a avaliação final:", error),
    );
}

function validarRespostaFinal(
  questao,
  alternativaClicada,
  container,
  questaoId,
) {
  let feedbackBox = document.getElementById(`feedback-${questaoId}`);

  let botoes = container.querySelectorAll("button");
  botoes.forEach((btn) => (btn.disabled = true));

  feedbackBox.style.display = "block";
  feedbackBox.innerText = alternativaClicada.feedback;

  if (alternativaClicada.correta) {
    feedbackBox.style.borderLeft = "8px solid #2e7d32";
    feedbackBox.style.backgroundColor = "#e8f5e9";
    pontuacaoTotal += questao.pontos;
    document.getElementById("pontos-val").innerText = pontuacaoTotal;
  } else {
    feedbackBox.style.borderLeft = "8px solid #c62828";
    feedbackBox.style.backgroundColor = "#ffebee";
  }

  questoesRespondidas++;

  if (questoesRespondidas === 5) {
    exibirEncerramentoCurso();
  }
}

function exibirEncerramentoCurso() {
  let resultadoBox = divQuiz.querySelector(".quiz-resultado-final");
  resultadoBox.style.display = "block";

  // Condição de vitória adaptada para a pontuação de 80 pontos requerida
  if (pontuacaoTotal >= 80) {
    resultadoBox.innerHTML = `
            <h2 style="color: #2e7d32; font-size: 2.5rem; margin-bottom: 15px;">🎓 Curso Concluído com Sucesso!</h2>
            <p style="font-size: 1.4rem; color: #333; line-height: 1.6;">
                Parabéns! Você alcançou <strong>${pontuacaoTotal} pontos</strong> na sua avaliação e demonstrou domínio completo sobre a sua proteção na internet. 
                Agora você navega com total independência e segurança. Muito obrigado por fazer parte do nosso curso! ❤️
            </p>
            <div class="botoes" style="margin-top: 25px;">
                <button class="btn-final-quiz btn-avancar" id="btn-certificado">Emitir Meu Certificado</button>
            </div>
        `;

    resultadoBox
      .querySelector("#btn-certificado")
      .addEventListener("click", () => {
        const nomeAluno = prompt(
          "Por favor, digite o seu nome completo para o certificado:",
        );

        if (nomeAluno && nomeAluno.trim() !== "") {
          const dataAtual = new Date().toLocaleDateString("pt-BR");
          const janelaCertificado = window.open("", "_blank");

          const htmlCertificado = `
                    <!DOCTYPE html>
                    <html lang="pt-BR">
                    <head>
                        <meta charset="UTF-8">
                        <title>Certificado - ${nomeAluno}</title>
                        <style>
                            body { font-family: 'Arial', sans-serif; text-align: center; padding: 50px; border: 15px solid #1a4a73; color: #333; }
                            .moldura { border: 5px solid #f1c40f; padding: 40px; }
                            h1 { color: #1a4a73; font-size: 48px; margin-bottom: 10px; }
                            h2 { font-size: 30px; margin-bottom: 40px; }
                            .texto { font-size: 22px; line-height: 1.8; margin-bottom: 50px; }
                            .destaque { font-weight: bold; color: #1a4a73; font-size: 26px; }
                            .rodape { margin-top: 50px; display: flex; justify-content: space-around; font-size: 18px; }
                            .assinatura { border-top: 1px solid #333; width: 250px; padding-top: 10px; }
                        </style>
                    </head>
                    <body>
                        <div class="moldura">
                            <h1>DECLARAÇÃO DE CONCLUSÃO DE CURSO</h1>
                            <h2>Conclusão de Curso</h2>
                            <p class="texto">
                                Declaramos que <span class="destaque">${nomeAluno.toUpperCase()}</span> concluiu com sucesso o <br>
                                <strong>Curso de Inclusão e Segurança Digital para a Terceira Idade</strong>,<br>
                                com carga horária total de <strong>4 horas</strong>.
                            </p>
                            <p>Data de emissão: ${dataAtual}</p>
                            <div class="rodape">
                                <div class="assinatura">Ciência da computação Unifenas / 1 Período</div>
                                <div class="assinatura">Segurança Digital 2026</div>
                            </div>
                        </div>
                        <script>
                            window.onload = () => { window.print(); };
                        </script>
                    </body>
                    </html>
                `;

          janelaCertificado.document.write(htmlCertificado);
          janelaCertificado.document.close();
        } else {
          alert("É necessário informar o nome para gerar o certificado.");
        }
      });
  } else {
    // Incentivo humanizado em caso de nota menor que 80
    resultadoBox.innerHTML = `
            <h2 style="color: #c62828; font-size: 2.2rem; margin-bottom: 15px;">🌱 Você está no caminho certo!</h2>
            <p style="font-size: 1.4rem; color: #333; line-height: 1.6;">
                Você somou <strong>${pontuacaoTotal} pontos</strong>. Para obter a aprovação completa do curso, precisamos alcançar 80 pontos. 
                Não desanime, os truques da internet exigem prática mesmo! Vamos rever as dicas com calma e tentar mais uma vez? O seu esforço vale ouro!
            </p>
            <div class="botoes" style="margin-top: 25px;">
                <button class="btn-final-quiz btn-reiniciar" id="btn-recomecar">Tentar Novamente</button>
            </div>
        `;

    resultadoBox
      .querySelector("#btn-recomecar")
      .addEventListener("click", () => {
        inicializarAvaliacao();
        window.scrollTo({ top: 0, behavior: "smooth" }); // Sobe a página suavemente
      });
  }
}
