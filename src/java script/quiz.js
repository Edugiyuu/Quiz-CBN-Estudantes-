document.addEventListener("DOMContentLoaded", () => {

    const perguntas = [
        {
            pergunta: "O que torna uma senha mais segura?",
            opcoes: [
                "Usar apenas números",
                "Usar informações pessoais",
                "Misturar letras, números e símbolos",
                "Deixar a senha curta"
            ],
            correta: 2
        },
        {
            pergunta: "Qual destas situações pode indicar phishing?",
            opcoes: [
                "Um e-mail pedindo sua senha urgentemente",
                "Um site com cadeado HTTPS",
                "Uma atualização oficial do sistema",
                "Um arquivo salvo no computador"
            ],
            correta: 0
        },
        {
            pergunta: "O que é autenticação em dois fatores?",
            opcoes: [
                "Criar duas contas diferentes",
                "Confirmar identidade usando mais de um método",
                "Trocar de senha duas vezes",
                "Ter duas senhas iguais"
            ],
            correta: 1
        },
        {
            pergunta: "Qual é o principal objetivo de um firewall?",
            opcoes: [
                "Melhorar gráficos de jogos",
                "Resfriar o computador",
                "Controlar e monitorar conexões de rede",
                "Criar senhas automaticamente"
            ],
            correta: 2
        },
        {
            pergunta: "O que é malware?",
            opcoes: [
                "Um hardware defeituoso",
                "Um software malicioso",
                "Um antivírus avançado",
                "Uma rede social"
            ],
            correta: 1
        },
        {
            pergunta: "Por que atualizar programas e sistemas é importante?",
            opcoes: [
                "Apenas para mudar o visual",
                "Para ocupar mais espaço",
                "Para corrigir falhas de segurança",
                "Para diminuir a internet"
            ],
            correta: 2
        },
        {
            pergunta: "O que pode acontecer ao usar a mesma senha em vários sites?",
            opcoes: [
                "A internet fica mais lenta",
                "Várias contas podem ser invadidas ao mesmo tempo",
                "O computador desliga sozinho",
                "A senha fica mais forte"
            ],
            correta: 1
        },
        {
            pergunta: "Qual destas ações é mais segura em um Wi-Fi público?",
            opcoes: [
                "Fazer login em banco sem cuidado",
                "Compartilhar senhas",
                "Evitar acessar informações sensíveis",
                "Desativar o antivírus"
            ],
            correta: 2
        },
        {
            pergunta: "O ransomware é um tipo de ataque que:",
            opcoes: [
                "Acelera o computador",
                "Bloqueia ou criptografa arquivos para pedir resgate",
                "Cria backups automáticos",
                "Melhora a conexão da internet"
            ],
            correta: 1
        },
        {
            pergunta: "Qual destas práticas ajuda MAIS a proteger seus dados?",
            opcoes: [
                "Ignorar backups",
                "Clicar em links desconhecidos",
                "Fazer backups regularmente",
                "Desativar atualizações automáticas"
            ],
            correta: 2
        }
    ];

    let perguntaAtual = 0;
    let pontos = 0;

    const perguntaTitulo = document.querySelector(".question-area h2");
    const badge = document.querySelector(".question-badge");
    const opcoes = document.querySelectorAll(".option");
    const progresso = document.querySelector(".progress");
    const stats = document.querySelectorAll(".stat-box");

    function carregarPergunta() {
        const atual = perguntas[perguntaAtual];

        badge.textContent = `✨ PERGUNTA ${perguntaAtual + 1}`;
        perguntaTitulo.textContent = atual.pergunta;

        opcoes.forEach((opcao, index) => {
            opcao.querySelector("p").textContent = atual.opcoes[index];
            opcao.classList.remove("correct", "wrong");
            opcao.style.pointerEvents = "auto";
        });

        stats[0].textContent = `🎯 ${perguntaAtual + 1}/${perguntas.length}`;
        stats[1].textContent = `⭐ ${pontos}`;

        progresso.style.width =
            `${(perguntaAtual / perguntas.length) * 100}%`;
    }

    opcoes.forEach((opcao, index) => {
        opcao.addEventListener("click", () => {

            const correta = perguntas[perguntaAtual].correta;

            opcoes.forEach(op => {
                op.style.pointerEvents = "none";
            });

            if (index === correta) {
                opcao.classList.add("correct");
                pontos++;
            } else {
                opcao.classList.add("wrong");
                opcoes[correta].classList.add("correct");
            }

            stats[1].textContent = `⭐ ${pontos}`;

            setTimeout(() => {
                perguntaAtual++;

                if (perguntaAtual < perguntas.length) {
                    carregarPergunta();
                } else {
                    mostrarResultado();
                }
            }, 1000);
        });
    });

    function mostrarResultado() {

        let mensagem = "";

        if (pontos <= 3) {
            mensagem = "🖥️ Você ainda está aprendendo!";
        } else if (pontos <= 7) {
            mensagem = "🔐 Bom conhecimento em segurança digital!";
        } else {
            mensagem = "🛡️ Você entende bastante de cibersegurança!";
        }

        document.querySelector(".question-area").innerHTML = `
            <div class="question-badge">🏆 QUIZ FINALIZADO</div>
            <h2>Você acertou ${pontos} de ${perguntas.length} perguntas!</h2>
            <p style="font-size:22px;margin-top:20px;">
                ${mensagem}
            </p>
        `;

        progresso.style.width = "100%";
    }

    carregarPergunta();

});