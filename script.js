document.addEventListener("DOMContentLoaded", () => {
    const riskForm = document.getElementById("riskForm");
    const riskList = document.getElementById("riskList");

    function loadRisks() {
        const risks = JSON.parse(localStorage.getItem("risks")) || [];
        risks.forEach((risk) => addRiskToList(risk));
    }

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

    function saveRisk(risk) {
        const risks = JSON.parse(localStorage.getItem("risks")) || [];
        risks.push(risk);
        localStorage.setItem("risks", JSON.stringify(risks));
    }

    function deleteRisk(description) {
        let risks = JSON.parse(localStorage.getItem("risks")) || [];
        risks = risks.filter((risk) => risk.description !== description);
        localStorage.setItem("risks", JSON.stringify(risks));
        renderRisks();
    }

    function renderRisks() {
        riskList.innerHTML = "";
        loadRisks();
    }

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

    loadRisks();
});
