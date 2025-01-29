<template>
    <div class="admin-container">
        <h2>Lista de Budgets</h2>
        <div class="filter">
            <label for="status">Filtrar por situação:</label>
            <select id="status" v-model="filterStatus" @change="fetchBudgets">
                <option value="">Todos</option>
                <option value="REQUESTED">Solicitado</option>
                <option value="PENDING_REVIEW">Pendente de Revisão</option>
                <option value="REVIEWED">Revisado</option>
                <option value="WAITING_APPROVAL">Aguardando Aprovação</option>
                <option value="APPROVED">Aprovado</option>
                <option value="COMPLETED">Concluído</option>
                <option value="CANCELED">Cancelado</option>
            </select>
        </div>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th>Imagem</th>
                    <th>Situação</th>
                    <th>Ações</th> <!-- Nova coluna de Ações -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="budget in filteredBudgets" :key="budget.id">
                    <td>{{ budget.id }}</td>
                    <td>{{ budget.title }}</td>
                    <td>{{ budget.description }}</td>
                    <td>
                        <img :src="budget.image" alt="Imagem do Budget" class="budget-image" />
                    </td>
                    <td>{{ formatStatus(budget.status) }}</td>
                    <td>
                        <button @click="acceptBudget(budget)" class="accept-button">
                            Aceitar
                        </button>
                        <button @click="showRejectConfirm(budget)" class="reject-button">
                            Recusar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal para Aceitar o Orçamento -->
        <!-- Modal para Aceitar o Orçamento -->
        <div v-if="showAcceptModal" class="popup-backdrop">
            <div class="popup container">
                <h2>Aceitar Orçamento</h2>
                <p><strong>Título:</strong> {{ budgetToAccept.title }}</p>
                <p><strong>Descrição:</strong> {{ budgetToAccept.description }}</p>
                <div class="form-group">
                    <label for="acceptValue">Valor:</label>
                    <input type="number" v-model="acceptValue" id="acceptValue" />
                </div>
                <button @click="submitAcceptBudget" class="confirm">Aceitar</button>
                <button @click="closeAcceptModal" class="cancel-button">Cancelar</button>
            </div>
        </div>


        <!-- Modal para Recusar o Orçamento -->
        <div v-if="showRejectModal" class="popup-backdrop">
            <div class="popup">
                <h3>Recusar Orçamento</h3>
                <p>Você deseja realmente cancelar este orçamento?</p>
                <button @click="confirmReject" class="delete">Sim, Recusar</button>
                <button @click="cancelReject" class="confirm">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script>
import api from "../services/api.js";
import "../css/Form.css"
import "../css/Popup.css"

export default {
    name: "AdminPage",
    data() {
        return {
            filterStatus: "",
            budgets: [],
            showAcceptModal: false,
            showRejectModal: false,
            budgetToAccept: null,
            budgetToReject: null,
            acceptValue: null,
        };
    },
    computed: {
        filteredBudgets() {
            if (this.filterStatus) {
                return this.budgets.filter(budget => budget.status === this.filterStatus);
            }
            return this.budgets;
        },
    },
    methods: {
        async fetchBudgets() {
            const token = localStorage.getItem("authToken");
            try {
                const response = await api.get("/api/budgets/admin", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        status: this.filterStatus || null,
                    },
                });
                this.budgets = response.data;
            } catch (error) {
                console.error("Erro ao buscar budgets:", error.response?.data || error.message);
                alert("Erro ao buscar budgets. Verifique sua conexão ou suas permissões.");
            }
        },
        formatStatus(status) {
            switch (status) {
                case "REQUESTED":
                    return "Solicitado";
                case "PENDING_REVIEW":
                    return "Pendente de Revisão";
                case "REVIEWED":
                    return "Revisado";
                case "WAITING_APPROVAL":
                    return "Aguardando Aprovação";
                case "APPROVED":
                    return "Aprovado";
                case "COMPLETED":
                    return "Concluído";
                case "CANCELED":
                    return "Cancelado"; // Adicionado para o status "Cancelado"
                default:
                    return status;
            }
        },
        acceptBudget(budget) {
            this.budgetToAccept = budget;
            this.showAcceptModal = true;
        },
        async submitAcceptBudget() {
            const token = localStorage.getItem("authToken");
            try {
                const response = await api.put(`/api/budgets/${this.budgetToAccept.id}/accept`, {
                    value: this.acceptValue,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.fetchBudgets();
                this.closeAcceptModal();
                alert("Orçamento aceito com sucesso.");
            } catch (error) {
                console.error("Erro ao aceitar orçamento:", error.response?.data || error.message);
                alert("Erro ao aceitar orçamento.");
            }
        },
        closeAcceptModal() {
            this.showAcceptModal = false;
            this.acceptValue = null;
        },
        showRejectConfirm(budget) {
            this.budgetToReject = budget;
            this.showRejectModal = true;
        },
        async confirmReject() {
            const token = localStorage.getItem("authToken");
            try {
                await api.put(`/api/budgets/${this.budgetToReject.id}/reject`, null, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.fetchBudgets();
                this.showRejectModal = false;
                alert("Orçamento recusado com sucesso.");
            } catch (error) {
                console.error("Erro ao recusar orçamento:", error.response?.data || error.message);
                alert("Erro ao recusar orçamento.");
            }
        },
        cancelReject() {
            this.showRejectModal = false;
        },
    },
    created() {
        this.fetchBudgets();
    },
};
</script>

<style scoped>
.admin-container {
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
}

h2 {
    font-size: 28px;
    color: #4c5b3c;
    margin-bottom: 20px;
}

.filter {
    margin-bottom: 10px;
}

.filter label {
    margin-right: 10px;
    font-size: 16px;
}

.filter select {
    padding: 5px;
    font-size: 16px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th,
td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
}

th {
    background-color: #f1f1f1;
    font-weight: bold;
}

td img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 8px;
}

button {
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}

.accept-button {
    background-color: #4CAF50;
    color: white;
    border: none;
}

.accept-button:hover {
    background-color: #45a049;
}

.reject-button {
    background-color: #f44336;
    color: white;
    border: none;
}

.reject-button:hover {
    background-color: #e53935;
}
</style>
