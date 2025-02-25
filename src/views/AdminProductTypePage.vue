<template>
    <div class="admin-container">
        <!-- Linha de título e botão para Criar Novo Tipo -->
        <div class="header">
            <h3>Lista de Tipos de Produto</h3>
            <button class="submit-button" @click="openCreateTypePopup">Novo Tipo</button>
        </div>

        <!-- Lista de Tipos de Produto -->
        <div class="list-container">
            <div v-if="productTypes.length > 0">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="type in productTypes" :key="type.id">
                            <td>{{ type.id }}</td>
                            <td>{{ type.name }}</td>
                            <td>
                                <button @click="openEditTypePopup(type)" class="edit-button">
                                    <img src="https://img.icons8.com/?size=100&id=86374&format=png&color=ffffff"
                                        alt="Editar" class="edit-icon" />
                                    Editar
                                </button>
                                <button @click="openDeleteTypePopup(type)" class="delete-button"
                                    aria-label="Excluir tipo">
                                    <img src="https://img.icons8.com/?size=100&id=99961&format=png&color=000000"
                                        alt="Excluir" class="delete-icon" />
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <p>Nenhum tipo de produto cadastrado.</p>
            </div>
        </div>

        <!-- Popup para Criar Tipo de Produto -->
        <div v-if="showCreatePopup" class="popup-backdrop">
            <div class="popup">
                <h2>Criar Tipo de Produto</h2>
                <form @submit.prevent="createProductType">
                    <div class="form-group">
                        <label for="createName">Nome</label>
                        <input type="text" id="createName" v-model="newProductType.name" required />
                    </div>
                    <button type="submit" class="confirm">Salvar</button>
                    <button type="button" @click="closeCreatePopup" class="cancel">Cancelar</button>
                </form>
            </div>
        </div>

        <!-- Popup para Editar Tipo de Produto -->
        <div v-if="showEditPopup" class="popup-backdrop">
            <div class="popup">
                <h2>Editar Tipo de Produto</h2>
                <form @submit.prevent="updateProductType">
                    <div class="form-group">
                        <label for="editName">Nome</label>
                        <input type="text" id="editName" v-model="productTypeToEdit.name" required />
                    </div>
                    <button type="submit" class="confirm">Salvar</button>
                    <button type="button" @click="closeEditPopup" class="cancel">Cancelar</button>
                </form>
            </div>
        </div>

        <!-- Popup para Deletar Tipo de Produto -->
        <div v-if="showDeletePopup" class="popup-backdrop">
            <div class="popup">
                <h3>Excluir Tipo de Produto</h3>
                <p>Você deseja realmente excluir este tipo de produto?</p>
                <button @click="deleteProductType" class="delete">Excluir</button>
                <button @click="closeDeletePopup" class="cancel">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../services/api.js';
import "../css/Form.css";
import "../css/Popup.css";

export default {
    name: "ProductTypePage",
    data() {
        return {
            showCreatePopup: false,
            showEditPopup: false,
            showDeletePopup: false,
            newProductType: {
                name: "",
            },
            productTypeToEdit: null,
            productTypeToDelete: null,
            productTypes: [] // Inicialmente vazio, será carregado via API
        };
    },
    methods: {
        getAuthHeaders() {
            const token = localStorage.getItem("authToken");
            return { headers: { Authorization: `Bearer ${token}` } };
        },
        async fetchProductTypes() {
            try {
                const response = await api.get("/api/admin/product-type/", this.getAuthHeaders());
                this.productTypes = response.data;
            } catch (error) {
                console.error("Erro ao buscar tipos de produto:", error);
            }
        },
        openCreateTypePopup() {
            this.showCreatePopup = true;
        },
        closeCreatePopup() {
            this.showCreatePopup = false;
            this.newProductType = { name: "" };
        },
        async createProductType() {
            try {
                const response = await api.post("/api/admin/product-type/", this.newProductType, this.getAuthHeaders());
                this.productTypes.push(response.data);
                this.closeCreatePopup();
            } catch (error) {
                console.error("Erro ao criar tipo de produto:", error);
            }
        },
        openEditTypePopup(type) {
            this.productTypeToEdit = { ...type };
            this.showEditPopup = true;
        },
        closeEditPopup() {
            this.showEditPopup = false;
            this.productTypeToEdit = null;
        },
        async updateProductType() {
            try {
                const response = await api.put(`/api/admin/product-type/${this.productTypeToEdit.id}`, this.productTypeToEdit, this.getAuthHeaders());
                const index = this.productTypes.findIndex(type => type.id === this.productTypeToEdit.id);
                if (index !== -1) {
                    this.productTypes[index] = response.data;
                }
                this.closeEditPopup();
            } catch (error) {
                console.error("Erro ao atualizar tipo de produto:", error);
            }
        },
        openDeleteTypePopup(type) {
            this.productTypeToDelete = type;
            this.showDeletePopup = true;
        },
        closeDeletePopup() {
            this.showDeletePopup = false;
            this.productTypeToDelete = null;
        },
        async deleteProductType() {
            try {
                await api.delete(`/api/admin/product-type/${this.productTypeToDelete.id}`, this.getAuthHeaders());
                this.productTypes = this.productTypes.filter(type => type.id !== this.productTypeToDelete.id);
                this.closeDeletePopup();
            } catch (error) {
                console.error("Erro ao excluir tipo de produto:", error);
            }
        }
    },
    created() {
        this.fetchProductTypes();
    }
};
</script>


<style scoped>
.admin-container {
    background-color: #f4f4f9;
    padding: 20px;
    border-radius: 10px;
    font-family: Arial, sans-serif;
}

/* Estilizando a linha do título e do botão */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.header h3 {
    font-size: 28px;
    /* Aumenta o tamanho do título */
    margin: 0;
}

.submit-button {
    background-color: #4CAF50;
    width: 180px;
    color: white;
    padding: 8px 12px;
    /* Reduz o tamanho do botão */
    font-size: 18px;
    /* Fonte menor */
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-left: auto;
    /* Garante que o botão fique à direita */
}

.submit-button:hover {
    background-color: #45a049;
}

.list-container {
    background-color: #ffffff;
    padding: 20px;
    margin-top: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.list-container table {
    width: 100%;
    border-collapse: collapse;
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

th:last-child,
td:last-child {
    width: 150px;
}

button {
    padding: 8px 16px;
    margin-bottom: 5px;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
    transition: background-color 0.3s;
}

/* Botão de edição modernizado */
.edit-button {
    background-color: #2196F3;
    color: white;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-size: 16px;
    font-weight: 500;
    gap: 10px;
    position: relative;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    line-height: 1;
}

.edit-button img.edit-icon {
    width: 20px;
    height: 20px;
    transition: transform 0.2s ease;
}

/* Efeitos de interação */
.edit-button:hover {
    background-color: #1976D2;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.edit-button:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.edit-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.3);
}

/* Melhoria de acessibilidade para alto contraste */
@media (forced-colors: active) {
    .edit-button {
        border: 2px solid transparent;
    }
}

/* Efeito opcional para o ícone */
.edit-button:hover img.edit-icon {
    transform: scale(1.05);
}



/* Botão de deletar modernizado */
.delete-button {
    background-color: #f44336;
    color: white;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-size: 16px;
    font-weight: 500;
    gap: 10px;
    position: relative;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    line-height: 1;
}

.delete-button img.delete-icon {
    width: 20px;
    height: 20px;
    transition: transform 0.2s ease;
    filter: invert(1);
    /* Inverte a cor do ícone para branco */
}

/* Efeitos de interação */
.delete-button:hover {
    background-color: #e53935;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.delete-button:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.delete-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.3);
}

/* Acessibilidade para alto contraste */
@media (forced-colors: active) {
    .delete-button {
        border: 2px solid transparent;
    }
}

/* Animação do ícone */
.delete-button:hover img.delete-icon {
    transform: scale(1.05);
}

/* Estilos para os popups continuam iguais... */
</style>
