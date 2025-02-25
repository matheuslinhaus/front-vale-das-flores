<template>
    <div class="admin-container">
        <!-- Linha de título e botão para Criar Novo Material -->
        <div class="header">
            <h3>Lista de Materiais</h3>
            <button class="submit-button" @click="openCreateMaterialPopup">Novo Material</button>
        </div>

        <!-- Lista de Materiais -->
        <div class="list-container">
            <div v-if="materials.length > 0">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Material</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="material in materials" :key="material.id">
                            <td>{{ material.id }}</td>
                            <td>{{ material.typeMaterial }}</td>
                            <td>
                                <button @click="openEditMaterialPopup(material)" class="edit-button">
                                    <img src="https://img.icons8.com/?size=100&id=86374&format=png&color=ffffff"
                                        alt="Editar" class="edit-icon" />
                                    Editar
                                </button>
                                <button @click="openDeleteMaterialPopup(material)" class="delete-button"
                                    aria-label="Excluir material">
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
                <p>Nenhum material cadastrado.</p>
            </div>
        </div>

        <!-- Popup para Criar Material -->
        <div v-if="showCreatePopup" class="popup-backdrop">
            <div class="popup">
                <h2>Criar Material</h2>
                <form @submit.prevent="createMaterial">
                    <div class="form-group">
                        <label for="createMaterial">Material</label>
                        <input type="text" id="createMaterial" v-model="newMaterial.typeMaterial" required />
                    </div>
                    <button type="submit" class="confirm">Salvar</button>
                    <button type="button" @click="closeCreatePopup" class="cancel">Cancelar</button>
                </form>
            </div>
        </div>

        <!-- Popup para Editar Material -->
        <div v-if="showEditPopup" class="popup-backdrop">
            <div class="popup">
                <h2>Editar Material</h2>
                <form @submit.prevent="updateMaterial">
                    <div class="form-group">
                        <label for="editMaterial">Material</label>
                        <input type="text" id="editMaterial" v-model="materialToEdit.typeMaterial" required />
                    </div>
                    <button type="submit" class="confirm">Salvar</button>
                    <button type="button" @click="closeEditPopup" class="cancel">Cancelar</button>
                </form>
            </div>
        </div>

        <!-- Popup para Deletar Material -->
        <div v-if="showDeletePopup" class="popup-backdrop">
            <div class="popup">
                <h3>Excluir Material</h3>
                <p>Você deseja realmente excluir este material?</p>
                <button @click="deleteMaterial" class="delete">Excluir</button>
                <button @click="closeDeletePopup" class="cancel">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script>
import api from "../services/api.js";
import "../css/Form.css";
import "../css/Popup.css";

export default {
    name: "MaterialPage",
    data() {
        return {
            showCreatePopup: false,
            showEditPopup: false,
            showDeletePopup: false,
            newMaterial: { typeMaterial: "" },  // O usuário irá digitar o tipo de material
            materialToEdit: null,
            materialToDelete: null,
            materials: []
        };
    },
    methods: {
        getAuthHeaders() {
            const token = localStorage.getItem("authToken");
            return { headers: { Authorization: `Bearer ${token}` } };
        },
        async fetchMaterials() {
            try {
                const response = await api.get("/api/admin/material/", this.getAuthHeaders());
                this.materials = response.data;
            } catch (error) {
                console.error("Erro ao buscar materiais:", error);
            }
        },
        openCreateMaterialPopup() {
            this.showCreatePopup = true;
        },
        closeCreatePopup() {
            this.showCreatePopup = false;
            this.newMaterial = { typeMaterial: "" };  // Limpa o campo para o próximo material
        },
        async createMaterial() {
            try {
                const payload = {
                    typeMaterial: this.newMaterial.typeMaterial  // Salva o tipo digitado pelo usuário
                };
                const response = await api.post("/api/admin/material/", payload, this.getAuthHeaders());
                this.materials.push(response.data);
                this.closeCreatePopup();
            } catch (error) {
                console.error("Erro ao criar material:", error);
            }
        },
        openEditMaterialPopup(material) {
            this.materialToEdit = { ...material };
            this.showEditPopup = true;
        },
        closeEditPopup() {
            this.showEditPopup = false;
            this.materialToEdit = null;
        },
        async updateMaterial() {
            try {
                const response = await api.put(`/api/admin/material/${this.materialToEdit.id}`, this.materialToEdit, this.getAuthHeaders());
                const index = this.materials.findIndex(m => m.id === this.materialToEdit.id);
                if (index !== -1) {
                    this.materials[index] = response.data;
                }
                this.closeEditPopup();
            } catch (error) {
                console.error("Erro ao atualizar material:", error);
            }
        },
        openDeleteMaterialPopup(material) {
            this.materialToDelete = material;
            this.showDeletePopup = true;
        },
        closeDeletePopup() {
            this.showDeletePopup = false;
            this.materialToDelete = null;
        },
        async deleteMaterial() {
            try {
                await api.delete(`/api/admin/material/${this.materialToDelete.id}`, this.getAuthHeaders());
                this.materials = this.materials.filter(m => m.id !== this.materialToDelete.id);
                this.closeDeletePopup();
            } catch (error) {
                console.error("Erro ao excluir material:", error);
            }
        }
    },
    created() {
        this.fetchMaterials();
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
