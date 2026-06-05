const botaoQuiz = document.getElementById("quizBotao");

async function renderizarQuiz(mod) {
  try {
    const response = await fetch("json/modulos.json");
    if (!response.ok)
      throw new Error("Não foi possível carregar as perguntas.");

    const banco = await response.json();
    const modulo = banco.find((m) => m.categoria === mod);

    if (modulo) {
      const quizContainer = document.querySelector(".quizMod");
      quizContainer.innerHTML = `
                <div class="questao-card-grande" style="margin: 20px auto; max-width: 80%;">
                    <h2 class="pergunta-texto" style="font-size: 1.5rem; margin-bottom: 20px;">${modulo.pergunta}</h2>
                    <div class="alternativas-container">
                        ${modulo.alternativas
                          .map(
                            (alt) => `
                            <button class="btn-alternativa-grande" onclick="validarRespostaModulo(this, '${alt.opcao}', '${modulo.categoria}')">
                                <strong>${alt.opcao})</strong> ${alt.texto}
                            </button>
                        `,
                          )
                          .join("")}
                    </div>
                    <div id="feedback-modulo" class="conteudoDiv" style="display: none; margin-top: 20px; padding: 20px;"></div>
                </div>
            `;
      // Guardamos os dados do módulo atual para validar depois
      window.dadosModuloAtual = modulo;
    }
  } catch (error) {
    console.error("Erro ao renderizar o quiz:", error);
  }
}

function validarRespostaModulo(botao, opcaoSelecionada, categoria) {
  const modulo = window.dadosModuloAtual;
  const feedbackBox = document.getElementById("feedback-modulo");
  const alternativasContainer = botao.parentElement;

  const botoes = alternativasContainer.querySelectorAll("button");
  botoes.forEach((btn) => (btn.disabled = true));

  const alternativa = modulo.alternativas.find(
    (a) => a.opcao === opcaoSelecionada,
  );

  feedbackBox.style.display = "block";
  feedbackBox.innerText = alternativa.feedback;

  feedbackBox.style.borderLeft = alternativa.correta
    ? "8px solid #2e7d32"
    : "8px solid #c62828";
  feedbackBox.style.backgroundColor = alternativa.correta
    ? "#e8f5e9"
    : "#ffebee";
}
