document.addEventListener("DOMContentLoaded", () => {
    const riskForm = document.getElementById("riskForm");
    const riskList = document.getElementById("riskList");

    // Função para carregar riscos do localStorage
    function loadRisks() {
        const risks = JSON.parse(localStorage.getItem("risks")) || [];
        risks.forEach((risk) => addRiskToList(risk));
    }

    // Função para adicionar risco à lista
    function addRiskToList(risk) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${risk.description} - <span class="risk-level">${risk.level}</span></span>
            <button class="delete-button">Excluir</button>
        `;
        listItem.querySelector(".delete-button").addEventListener("click", () => {
            deleteRisk(risk.description);
        });
        riskList.appendChild(listItem);
    }

    // Função para salvar riscos no localStorage
    function saveRisk(risk) {
        const risks = JSON.parse(localStorage.getItem("risks")) || [];
        risks.push(risk);
        localStorage.setItem("risks", JSON.stringify(risks));
    }

    // Função para excluir risco
    function deleteRisk(description) {
        let risks = JSON.parse(localStorage.getItem("risks")) || [];
        risks = risks.filter((risk) => risk.description !== description);
        localStorage.setItem("risks", JSON.stringify(risks));
        renderRisks();
    }

    // Função para renderizar a lista de riscos
    function renderRisks() {
        riskList.innerHTML = "";
        loadRisks();
    }

    // Evento para adicionar novo risco
    riskForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const risk = {
            description: document.getElementById("riskDescription").value,
            level: document.getElementById("riskLevel").value,
        };

        addRiskToList(risk);
        saveRisk(risk);

        riskForm.reset();
    });

    // Carregar riscos ao iniciar
    loadRisks();
});
