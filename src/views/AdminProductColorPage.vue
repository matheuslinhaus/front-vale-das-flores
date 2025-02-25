<template>
    <div class="admin-container">
        <div class="header">
            <h3>Lista de Cores</h3>
            <button class="submit-button" @click="openCreateColorPopup">Nova Cor</button>
        </div>

        <div class="color-list-container">
            <table v-if="colors.length > 0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Cor</th>
                        <th>Hexadecimal</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="color in colors" :key="color.id">
                        <td>{{ color.id }}</td>
                        <td>{{ color.name }}</td>
                        <td>
                            <div :style="{ backgroundColor: color.hexadecimalColor }" class="color-circle"></div>
                        </td>
                        <td>{{ color.hexadecimalColor }}</td>
                        <td>
                            <button @click="openEditColorPopup(color)" class="edit-button">
                                    <img src="https://img.icons8.com/?size=100&id=86374&format=png&color=ffffff"
                                        alt="Editar" class="edit-icon" />
                                    Editar
                                </button>
                                <button @click="openDeleteColorPopup(color)" class="delete-button"
                                    aria-label="Excluir tipo">
                                    <img src="https://img.icons8.com/?size=100&id=99961&format=png&color=000000"
                                        alt="Excluir" class="delete-icon" />
                                    Excluir
                                </button>

                        </td>
                    </tr>
                </tbody>
            </table>
            <p v-else>Nenhuma cor cadastrada.</p>
        </div>

        <!-- Popup de Criação -->
        <div v-if="showCreatePopup" class="popup-backdrop">
            <div class="popup">
                <h2>Criar Cor</h2>
                <form @submit.prevent="createColor">
                    <div class="form-group">
                        <label>Nome</label>
                        <input type="text" v-model="newColor.name" required />
                    </div>
                    <div class="form-group full-width">
                        <label>Escolha a cor</label>
                        <chrome-picker v-model="newColor.colorPicker" class="full-width-picker" disable-alpha />
                    </div>
                    <button type="submit" class="confirm">Salvar</button>
                    <button type="button" @click="closeCreatePopup" class="cancel">Cancelar</button>
                </form>
            </div>
        </div>

        <!-- Popup de Edição -->
        <div v-if="showEditPopup" class="popup-backdrop">
            <div class="popup">
                <h2>Editar Cor</h2>
                <form @submit.prevent="updateColor">
                    <div class="form-group">
                        <label>Nome</label>
                        <input type="text" v-model="colorToEdit.name" required />
                    </div>
                    <div class="form-group full-width">
                        <label>Escolha a cor</label>
                        <chrome-picker v-model="colorToEdit.colorPicker" class="full-width-picker" disable-alpha />
                    </div>
                    <button type="submit" class="confirm">Salvar</button>
                    <button type="button" @click="closeEditPopup" class="cancel">Cancelar</button>
                </form>
            </div>
        </div>

        <!-- Popup de Exclusão -->
        <div v-if="showDeletePopup" class="popup-backdrop">
            <div class="popup">
                <h2>Confirmar Exclusão</h2>
                <p>Tem certeza que deseja excluir a cor "{{ colorToDelete?.name }}"?</p>
                <button @click="deleteColor" class="delete">Excluir</button>
                <button @click="closeDeletePopup" class="cancel">Cancelar</button>
            </div>
        </div>

    </div>
</template>

<script>
import api from '../services/api.js';
import { Chrome } from '@ckpack/vue-color';

export default {
    components: {
        'chrome-picker': Chrome
    },
    data() {
        return {
            showCreatePopup: false,
            showEditPopup: false,
            showDeletePopup: false,
            newColor: { name: "", colorPicker: { hex: "#ffffff" } },
            colorToEdit: null,
            colorToDelete: null,
            colors: []
        };
    },
    mounted() {
        this.fetchColors();
    },
    methods: {
        async fetchColors() {
            try {
                const response = await api.get('/api/admin/color/', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                this.colors = response.data;
            } catch (error) {
                console.error('Erro ao buscar cores:', error);
            }
        },
        openCreateColorPopup() {
            this.showCreatePopup = true;
        },
        closeCreatePopup() {
            this.showCreatePopup = false;
            this.newColor = { name: "", colorPicker: { hex: "#ffffff" } };
        },
        async createColor() {
            try {
                const payload = {
                    name: this.newColor.name,
                    hexadecimalColor: this.newColor.colorPicker.hex // Apenas HEX
                };
                await api.post('/api/admin/color/', payload, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                this.fetchColors();
                this.closeCreatePopup();
            } catch (error) {
                console.error('Erro ao criar cor:', error);
            }
        },
        openEditColorPopup(color) {
            this.colorToEdit = { ...color, colorPicker: { hex: color.hexadecimalColor } };
            this.showEditPopup = true;
        },
        closeEditPopup() {
            this.showEditPopup = false;
            this.colorToEdit = null;
        },
        async updateColor() {
            try {
                const payload = {
                    name: this.colorToEdit.name,
                    hexadecimalColor: this.colorToEdit.colorPicker.hex
                };
                await api.put(`/api/admin/color/${this.colorToEdit.id}`, payload, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                this.fetchColors();
                this.closeEditPopup();
            } catch (error) {
                console.error('Erro ao editar cor:', error);
            }
        },
        openDeleteColorPopup(color) {
            this.colorToDelete = color;
            this.showDeletePopup = true;
        },
        closeDeletePopup() {
            this.colorToDelete = null;
            this.showDeletePopup = false;
        },
        async deleteColor() {
            if (!this.colorToDelete) return;

            try {
                await api.delete(`/api/admin/color/${this.colorToDelete.id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                this.fetchColors();
                this.closeDeletePopup();
            } catch (error) {
                console.error('Erro ao excluir cor:', error);
            }
        }
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

.color-list-container {
    background-color: #ffffff;
    padding: 20px;
    margin-top: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.color-list-container table {
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

.edit-button {
    background-color: #2196F3;
    color: white;
    border: none;
}

.delete-button {
    background-color: #f44336;
    color: white;
    border: none;
}

.color-circle {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    /* Para deixar a cor em formato de bolinha */
    display: inline-block;
    border: 1px solid #ddd;
}


.popup-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 400px;
    width: 100%;
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

.full-width {
    width: 100%;

}

.full-width-picker {
    width: 100%;
    max-width: none;
}
</style>
