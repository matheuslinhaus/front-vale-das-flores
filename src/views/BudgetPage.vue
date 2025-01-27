<template>
    <div>
        <div v-if="!token">
            <p>Redirecionando para a página de login...</p>
        </div>
        <div v-else class="container large">
            <h2>Orçamentos Pendentes</h2>

            <div v-if="loading">
                <p>Carregando orçamentos...</p>
            </div>

            <div v-else>
                <div v-if="budgets.length">
                    <table class="budget-table">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th>Status</th>
                                <th>Imagem</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="budget in budgets" :key="budget.id">
                                <td>{{ budget.title }}</td>
                                <td>{{ budget.description }}</td>
                                <td>{{ formatValue(budget.value) }}</td>
                                <td>{{ formatStatus(budget.status) }}</td>
                                <td>
                                    <div v-if="budget.image">
                                        <img :src="budget.image" alt="Imagem do orçamento" class="budget-image" />
                                    </div>
                                </td>
                                <td>
                                    <button v-if="budget.status === 'REQUESTED'" @click="editBudget(budget)" class="edit-button">
                                        Editar
                                    </button>
                                    <button v-if="budget.status === 'REQUESTED'" @click="showDeleteConfirm(budget.id)" class="delete-button">
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <p>Nenhum orçamento pendente no momento.</p>
                </div>
            </div>

            <button @click="goToNewBudgetPage" class="new-budget-button">Novo Orçamento</button>
        </div>

        <!-- Modais de edição e confirmação permanecem inalterados -->
    </div>
</template>

<script>
import "../css/Form.css";
import "../css/Popup.css";
import api from "../services/api";

export default {
    data() {
        return {
            token: localStorage.getItem("authToken"),
            budgets: [],
            loading: true,
            showModal: false,
            showEditModal: false,
            budgetToDelete: null,
            editForm: {
                title: "",
                description: "",
                value: null, // Incluí o valor no formulário para futuras edições
                image: null,
            },
            budgetToEdit: null,
            canEdit: false,
        };
    },
    created() {
        if (!this.token) {
            this.$router.push("/login");
        } else {
            this.fetchBudgets();
        }
    },
    methods: {
        async fetchBudgets() {
            try {
                const response = await api.get("/api/budgets", {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });
                this.budgets = response.data;
            } catch (error) {
                console.error("Erro ao carregar orçamentos:", error);
                alert("Erro ao carregar os orçamentos.");
            } finally {
                this.loading = false;
            }
        },
        goToNewBudgetPage() {
            this.$router.push("/budget/new");
        },
        editBudget(budget) {
            this.editForm.title = budget.title;
            this.editForm.description = budget.description;
            this.editForm.value = budget.value || null; // Preenche o valor (se existir)
            this.editForm.image = budget.image || null;
            this.budgetToEdit = budget;
            this.canEdit = true;
            this.showEditModal = true;
        },
        formatValue(value) {
            return value && value > 0 ? `R$ ${value.toFixed(2).replace('.', ',')}` : "---";
        },
        formatStatus(status) {
            return status === "REQUESTED" ? "Solicitado" : status;
        },
        handleImageUpload(event) {
            const file = event.target.files[0];
            this.editForm.image = file ? URL.createObjectURL(file) : null;
        },
        async submitEditBudget() {
            const formData = new FormData();
            formData.append("title", this.editForm.title);
            formData.append("description", this.editForm.description);
            formData.append("value", this.editForm.value || 0); // Inclui o valor no envio do formulário
            if (this.editForm.image) {
                formData.append("image", this.editForm.image);
            }

            try {
                await api.put(`/api/budgets/${this.budgetToEdit.id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });
                this.fetchBudgets();
                this.showEditModal = false;
                alert("Orçamento atualizado com sucesso.");
            } catch (error) {
                console.error("Erro ao editar orçamento:", error);
                alert("Erro ao editar o orçamento.");
            }
        },
        closeEditModal() {
            this.showEditModal = false;
            this.canEdit = false;
        },
        showDeleteConfirm(budgetId) {
            this.showModal = true;
            this.budgetToDelete = budgetId;
        },
        async confirmDelete() {
            try {
                await api.delete(`/api/budgets/${this.budgetToDelete}`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });
                this.budgets = this.budgets.filter(budget => budget.id !== this.budgetToDelete);
                alert("Orçamento excluído com sucesso.");
            } catch (error) {
                console.error("Erro ao excluir orçamento:", error);
                alert("Erro ao excluir o orçamento.");
            } finally {
                this.showModal = false;
            }
        },
        cancelDelete() {
            this.showModal = false;
        },
    },
};
</script>


<style scoped>
/* Estilos para os modais de edição e exclusão */
.popup-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
}

.popup button {
    margin-top: 10px;
}

.popup .form-group {
    margin-bottom: 15px;
}

/* Estilos para a tabela e botões */
.budget-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.budget-table th, .budget-table td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
}

.budget-table th {
    background-color: #f4f4f4;
}

.budget-image {  
    max-width: 100px;
    max-height: 100px;
    object-fit: cover;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.new-budget-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #6A7F3D;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

.new-budget-button:hover {
    background-color: #45a049;
}

.edit-button, .delete-button {
    padding: 5px 5px;
    margin-right: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
    cursor: pointer;
}

.icon-button {
    width: 24px;
    height: 24px;
}

.edit-button {
    background-color: #4CAF50;
    color: white;
    border: none;
}

.edit-button:hover {
    background-color: #45a049;
}

.delete-button {
    background-color: #f44336;
    color: white;
    border: none;
}

.delete-button:hover {
    background-color: #e53935;
}
</style>
