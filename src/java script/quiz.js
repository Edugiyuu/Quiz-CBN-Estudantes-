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
        }
    ];

    let atual = 0;
    let pontos = 0;

    const titulo = document.querySelector(".question-area h2");
    const badge = document.querySelector(".question-badge");
    const opcoes = document.querySelectorAll(".option");
    const stats = document.querySelectorAll(".stat-box");
    const progresso = document.querySelector(".progress");

    function mostrarFeedback(tipo) {
        const el = document.createElement("div");

        el.classList.add("feedback");

        if (tipo === "certo") {
            el.classList.add("feedback-certo");
            el.textContent = "✔";
        } else {
            el.classList.add("feedback-errado");
            el.textContent = "✖";
        }

        document.body.appendChild(el);

        setTimeout(() => {
            el.remove();
        }, 1000);
    }

    function carregar() {
        const p = perguntas[atual];

        titulo.textContent = p.pergunta;
        badge.textContent = `✨ PERGUNTA ${atual + 1}`;

        opcoes.forEach((op, i) => {
            op.classList.remove("certo", "errado");
            op.style.pointerEvents = "auto";
            op.querySelector("p").textContent = p.opcoes[i];
        });

        stats[0].textContent = `🎯 ${atual + 1}/${perguntas.length}`;
        stats[1].textContent = `⭐ ${pontos}`;

        progresso.style.width = `${(atual / perguntas.length) * 100}%`;
    }

    function responder(i) {
        const correta = perguntas[atual].correta;

        opcoes.forEach(op => op.style.pointerEvents = "none");

        if (i === correta) {
            opcoes[i].classList.add("certo");
            pontos++;
            mostrarFeedback("certo");
        } else {
            opcoes[i].classList.add("errado");
            opcoes[correta].classList.add("certo");
            mostrarFeedback("errado");
        }

        stats[1].textContent = `⭐ ${pontos}`;

        setTimeout(() => {
            atual++;

            if (atual >= perguntas.length) {
                document.querySelector(".question-area").innerHTML = `
                    <h2>🎉 Fim do Quiz!</h2>
                    <p>Você fez ${pontos} pontos</p>
                    <button onclick="location.reload()">Jogar novamente</button>
                `;
                progresso.style.width = "100%";
                return;
            }

            carregar();

        }, 1200);
    }

    opcoes.forEach((op, i) => {
        op.addEventListener("click", () => responder(i));
    });

    carregar();
});