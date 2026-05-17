# 🎓 Curso de Inclusão e Segurança Digital para a Terceira Idade

Este é um sistema de aprendizado interativo desenvolvido para capacitar o público idoso a navegar na internet com autonomia, confiança e, acima de tudo, segurança. Através de um design acessível e dinâmico, o projeto apresenta um quiz prático e uma avaliação final para consolidar o conhecimento contra golpes digitais.

---

## 🚀 Funcionalidades do Projeto

*   **Interface Acessível:** Botões grandes, textos expandidos e alto contraste, pensados especificamente no conforto visual e motor de usuários da terceira idade.
*   **Quiz Interativo (Treino):** Sorteia 5 questões aleatórias sobre o cotidiano digital com feedbacks educativos imediatos a cada resposta.
*   **Avaliação Final Integrada:** Uma prova de fogo com 10 questões inéditas cobrindo os principais módulos do curso.
*   **Pontuação em Tempo Real:** Placar atualizado dinamicamente para que o aluno acompanhe seu desempenho.
*   **Lógica de Conclusão Humanizada:**
    *   **Pontuação < 80:** Mensagem de incentivo e botão para reiniciar o teste de forma suave.
    *   **Pontuação ≥ 80:** Tela de comemoração pela conclusão do curso e liberação do botão para emissão do certificado.

---

## 📚 Conteúdo Programático Coberto

As questões e módulos abordam situações reais de engenharia social e segurança, divididas em:
1.  **Links Suspeitos:** Identificação de páginas falsas e a importância do cadeado de segurança.
2.  **Segurança Bancária:** Proteção de senhas, cartões e recusa de ajuda de estranhos em caixas eletrônicos.
3.  **Redes Sociais:** Cuidados com a exposição da rotina familiar e checagem de perfis clonados (golpe do Pix).
4.  **Engenharia Social:** Como lidar com mensagens urgentes baseadas em falsas ameaças (como suspensão de benefícios) ou falsas promessas (heranças e prêmios).

---

## 🛠️ Tecnologias Utilizadas

*   **HTML5:** Estruturação semântica das páginas de navegação e blocos do quiz.
*   **CSS3:** Estilização personalizada baseada em variáveis (`:root`), garantindo responsividade e foco na usabilidade.
*   **JavaScript (Vanilla):** Lógica de manipulação do DOM, controle de pontuação, embaralhamento de arrays e consumo de dados locais.
*   **JSON:** Banco de dados leve e estruturado para armazenamento das questões e feedbacks.

---

## 📁 Estrutura de Pastas do Projeto

```text
📁 curso-seguranca-digital/
│
├── 📄 index.html              # Página principal / Introdução do curso
├── 📄 avaliacao.html          # Página da Avaliação Final
│
├── 📁 css/
│   └── 📄 style.css           # Estilização global e componentes dos cards
│
├── 📁 js/
│   ├── 📄 quiz.js             # Lógica do quiz de treino (5 questões)
│   └── 📄 avaliacao.js        # Lógica da avaliação final (5 questões)
│
└── 📁 json/
    ├── 📄 quiz.json           # Banco de dados do treino
    └── 📄 avaliacao.json # Banco de dados da avaliação