<template>
    <div>
        <div v-if="!token">
            <p>Redirecionando para a página de login...</p>
        </div>
        <div v-else class="container">
            <h2>Orçamentos Pendentes</h2>

            <div v-if="loading">
                <p>Carregando orçamentos...</p>
            </div>

            <div v-else>
                <div v-if="budgets.length">
                    <ul class="budget-list">
                        <li v-for="budget in budgets" :key="budget.id" class="budget-item">
                            <h3>{{ budget.title }}</h3>
                            <p><strong>Descrição:</strong> {{ budget.description }}</p>
                            <div v-if="budget.image">
                                <p><strong>Imagem:</strong></p>
                                <img :src="budget.image" alt="Imagem do orçamento" class="budget-image" />
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-else>
                    <p>Nenhum orçamento pendente no momento.</p>
                </div>
            </div>

            <button @click="goToNewBudgetPage" class="new-budget-button">Novo Orçamento</button>
        </div>
    </div>
</template>

<script>
import "../css/Form.css";
import api from "../services/api";

export default {
    data() {
        return {
            token: localStorage.getItem("authToken"),
            budgets: [],
            loading: true,
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
    },
};
</script>