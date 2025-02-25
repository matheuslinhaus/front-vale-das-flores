<template>
    <div class="admin-container">
        <div class="header">
            <h3>Lista de Produtos</h3>
            <button class="submit-button" @click="openCreatePopup">Novo Produto</button>
        </div>
        <div class="product-list-container">
            <div v-if="products.length > 0">
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Imagem</th>
                            <th>Descrição</th>
                            <th>Sessão</th>
                            <th>Cor</th>
                            <th>Tipo</th>
                            <th>Preço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product.id">
                            <td>{{ product.id }}</td>
                            <td>
                                <img :src="product.urlImage" alt="Imagem do Produto" class="product-image"
                                    style="width: 80px; height: 80px; object-fit: cover;" />
                            </td>

                            <td>{{ product.description }}</td>
                            <td>{{ product.season }}</td>
                            <td>
                                <div :style="{ backgroundColor: product.color.hexadecimalColor }" class="color-circle">
                                </div>
                            </td>
                            <td>{{ product.productType.name }}</td>
                            <td>R$ {{ product.price | currency }}</td>
                            <td>
                                <button @click="openEditProductPopup(product)" class="edit-button">
                                    <img src="https://img.icons8.com/?size=100&id=86374&format=png&color=ffffff"
                                        alt="Editar" class="edit-icon" />
                                    Editar
                                </button>
                                <button @click="openDeleteProductPopup(product)" class="delete-button"
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
                <p>Nenhum produto cadastrado.</p>
            </div>
        </div>

        <div v-if="showCreatePopup" class="popup-backdrop">
            <div class="popup">
                <h2>Criar Produto</h2>
                <form @submit.prevent="createProduct">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="createDescription">Descrição <span class="required">*</span></label>
                            <input type="text" id="createDescription" v-model="newProduct.description" required />
                        </div>

                        <div class="form-group">
                            <label for="createFullDescription">Descrição Completa</label>
                            <input type="text" id="createFullDescription" v-model="newProduct.fullDescription" />
                        </div>

                        <div class="form-group">
                            <label for="createPrice">Preço <span class="required">*</span></label>
                            <input type="text" id="createPrice" v-model="newProduct.price" required />
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="createSeason">Estação <span class="required">*</span></label>
                            <select id="createSeason" v-model="newProduct.season" required>
                                <option value="Natal">Natal</option>
                                <option value="Páscoa">Páscoa</option>
                                <option value="Anual" selected>Anual</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="createProductType">Tipo de Produto <span class="required">*</span></label>
                            <select id="createProductType" v-model="newProduct.productType" required>
                                <option v-for="type in productTypes" :value="type" :key="type.id">{{ type.name }}
                                </option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="createColor">Cor Predominante</label>
                            <select id="createColor" v-model="newProduct.color">
                                <option v-for="color in colors" :value="color" :key="color.id">{{ color.name }}</option>

                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="createMaterial">Material</label>
                            <select id="createMaterial" v-model="newProduct.material" required>
                                <option v-for="material in materials" :value="material" :key="material.id">{{
                                    material.typeMaterial }}</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="createUrlImage">URL da Imagem <span class="required">*</span></label>
                            <input type="text" id="createUrlImage" v-model="newProduct.urlImage" required />
                        </div>


                    </div>

                    <button type="submit" class="confirm">Salvar</button>
                    <button type="button" @click="closeCreatePopup" class="cancel">Cancelar</button>
                </form>
            </div>
        </div>

        <!-- Popup para Editar Produto -->
        <div v-if="showEditPopup" class="popup-backdrop">
            <div class="popup">
                <h2>Editar Produto</h2>
                <form @submit.prevent="updateProduct">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="editDescription">Descrição <span class="required">*</span></label>
                            <input type="text" id="editDescription" v-model="productToEdit.description" required />
                        </div>

                        <div class="form-group">
                            <label for="editFullDescription">Descrição Completa</label>
                            <input type="text" id="editFullDescription" v-model="productToEdit.fullDescription" />
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="editPrice">Preço <span class="required">*</span></label>
                            <input type="text" id="editPrice" v-model="productToEdit.price" required />
                        </div>

                        <div class="form-group">
                            <label for="editSeason">Estação <span class="required">*</span></label>
                            <select id="editSeason" v-model="productToEdit.season" required>
                                <option value="Natal">Natal</option>
                                <option value="Páscoa">Páscoa</option>
                                <option value="Anual">Anual</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="editProductType">Tipo de Produto <span class="required">*</span></label>
                            <select id="editProductType" v-model="productToEdit.productType" required>
                                <option v-for="type in productTypes" :value="type" :key="type.id">{{ type.name }}
                                </option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="editColor">Cor Predominante</label>
                            <select id="editColor" v-model="productToEdit.color">
                                <option v-for="color in colors" :value="color" :key="color.id">{{ color.name }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="editMaterial">Material</label>
                            <select id="editMaterial" v-model="productToEdit.material" required>
                                <option v-for="material in materials" :value="material" :key="material.id">{{
                                    material.typeMaterial }}</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="editUrlImage">URL da Imagem <span class="required">*</span></label>
                            <input type="text" id="editUrlImage" v-model="productToEdit.urlImage" required />
                        </div>
                    </div>

                    <button type="submit" class="confirm">Salvar</button>
                    <button type="button" @click="closeEditPopup" class="cancel">Cancelar</button>
                </form>
            </div>
        </div>

        <!-- Popup para Deletar Produto -->
        <div v-if="showDeletePopup" class="popup-backdrop">
            <div class="popup">
                <h3>Excluir Produto</h3>
                <p>Você deseja realmente excluir este produto?</p>
                <button @click="deleteProduct" class="delete">Excluir</button>
                <button @click="closeDeletePopup" class="cancel">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script>
import api from "../services/api.js"
import "../css/Form.css";
import "../css/Popup.css";

export default {
    name: "ProductPage",
    data() {
        return {
            showCreatePopup: false,
            showEditPopup: false,
            showDeletePopup: false,
            newProduct: {
                productType: null,
                description: null,
                fullDescription: null,
                price: 0,
                season: "Anual",
                color: null,
                material: null,
                urlImage: null,
            },
            productToEdit: null,
            productToDelete: null,
            products: [
            ],
            productTypes: [],
            colors: [],
            materials: []
        };
    },
    methods: {
        getAuthHeaders() {
            const token = localStorage.getItem("authToken");
            return {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
        },
        async createProduct() {
            if (!this.newProduct.description || !this.newProduct.price || !this.newProduct.season || !this.newProduct.productType || !this.newProduct.urlImage) {
                alert("Por favor, preencha todos os campos obrigatórios.");
                return;
            }
            try {
                const response = await api.post("/api/admin/product/", this.newProduct);
                this.products.push(response.data);
                this.closeCreatePopup();
            } catch (error) {
                console.error("Erro ao criar tipo de produto:", error);
            }
        },

        async loadProducts() {
            try {
                const response = await api.get('/api/admin/product/');
                this.products = response.data || []; // Garante que sempre será um array
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
            }
        },
        openCreatePopup() {
            this.showCreatePopup = true;
        },
        closeCreatePopup() {
            this.showCreatePopup = false;
        },
        openEditProductPopup(product) {
            this.productToEdit = { ...product };
            this.showEditPopup = true;
        },
        closeEditPopup() {
            this.showEditPopup = false;
            this.productToEdit = null;
        },
        async updateProduct() {
            try {
                await api.put(`/api/admin/product/${this.productToEdit.id}`, this.productToEdit);
                const index = this.products.findIndex(product => product.id === this.productToEdit.id);
                if (index !== -1) {
                    this.products[index] = { ...this.productToEdit };
                }
                this.closeEditPopup();
            } catch (error) {
                console.error("Erro ao atualizar produto:", error);
            }
        },
        openDeleteProductPopup(product) {
            this.productToDelete = product;
            this.showDeletePopup = true;
        },
        closeDeletePopup() {
            this.showDeletePopup = false;
            this.productToDelete = null;
        },
        async deleteProduct() {
            try {
                await api.delete(`/api/admin/product/${this.productToDelete.id}`);
                this.products = this.products.filter(product => product.id !== this.productToDelete.id);
                this.closeDeletePopup();
            } catch (error) {
                console.error("Erro ao excluir produto:", error);
            }
        },
        async loadProductTypes() {
            const response = await api.get('/api/admin/product-type/');
            this.productTypes = response.data;
        },
        async loadColors() {
            const response = await api.get('/api/admin/color/');
            this.colors = response.data;
        },
        async loadMaterials() {
            const response = await api.get('/api/admin/material/');
            this.materials = response.data;
        },
        handleEscKey(event) {
            if (event.key === "Escape") {
                if (this.showCreatePopup) {
                    this.closeCreatePopup();
                } else if (this.showEditPopup) {
                    this.closeEditPopup();
                } else if (this.showDeletePopup) {
                    this.closeDeletePopup();
                }
            }
        }
    },
    mounted() {
        this.loadProducts();
        this.loadProductTypes();
        this.loadColors();
        this.loadMaterials();
        window.addEventListener("keydown", this.handleEscKey);
    },
    beforeDestroy() {
        window.removeEventListener("keydown", this.handleEscKey);
    }
};
</script>


<style scoped>
.required {
    color: red;
    margin-left: 5px;
}

.form-row {
    display: flex;
    gap: 15px;
    margin-bottom: 10px;
}

.form-group {
    flex: 1;
}

.checkbox-group {
    display: flex;
    align-items: center;
    gap: 3px;
    /* Reduzi o espaço entre o checkbox e o label */
    font-size: 16px;
}

.checkbox-group input {
    width: 18px;
    height: 18px;
    cursor: pointer;
}

.form-row {
    display: flex;
    justify-content: space-between;
    gap: 15px;
}

.form-group {
    width: 32%;
    /* Diminui a largura para permitir a terceira coluna */
}



.popup {
    padding: 15px;
    /* Reduzido para diminuir a altura */
    max-width: 900px;
    width: 100%;
    overflow-y: auto;
    /* Adiciona rolagem se necessário */
}

/* Estilos para o botão de salvar e cancelar */
.confirm {
    background-color: #4CAF50;
    color: white;
}

.cancel {
    background-color: #f44336;
    color: white;
}

/* Adiciona um pouco de espaçamento entre os campos */
.form-group input,
.form-group select {
    width: 90%;
    padding: 8px;
    margin-top: 5px;
}

.form-group label {
    margin-bottom: 5px;
}

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

.product-list-container {
    background-color: #ffffff;
    padding: 20px;
    margin-top: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-list-container table {
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

.color-circle {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    /* Para deixar a cor em formato de bolinha */
    display: inline-block;
    border: 1px solid #ddd;
}
</style>
