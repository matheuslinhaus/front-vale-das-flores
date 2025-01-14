<template>
    <div class="container large">
        <div class="sidebar">
            <ul>
                <li @click="setActiveTab('data')" :class="{ active: activeTab === 'data' }">Dados</li>
                <li @click="setActiveTab('password')" :class="{ active: activeTab === 'password' }">Senha</li>
                <li @click="setActiveTab('messages')" :class="{ active: activeTab === 'messages' }">Mensagens</li>
                <li @click="openLogoutPopup" class="logout">Sair</li>
            </ul>
        </div>
        <div class="content">
            <div v-if="activeTab === 'data'">
                <h2>Dados do Perfil</h2>
                <div v-if="loading">
                    <p>Carregando dados...</p>
                </div>
                <div v-else-if="user">
                    <div v-if="isEditing">
                        <div class="form-group">
                            <label for="name">Nome:</label>
                            <input type="text" v-model="user.name" id="name" />
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" v-model="user.email" id="email" />
                        </div>
                        <div class="form-group">
                            <label for="phone">Telefone:</label>
                            <input type="text" v-model="user.phone" id="phone" />
                        </div>
                        <button @click="updateUserData">Salvar alterações</button>
                        <button @click="cancelEdit">Cancelar</button>
                    </div>
                    <div v-else>
                        <p><strong>Nome:</strong> {{ user.name }}</p>
                        <p><strong>Email:</strong> {{ user.email }}</p>
                        <p><strong>Telefone:</strong> {{ user.phone }}</p>
                        <button @click="startEditing">Editar</button>
                    </div>
                </div>
                <div v-else>
                    <p>Erro ao carregar os dados do usuário. Tente novamente mais tarde.</p>
                </div>
            </div>

            <div v-if="activeTab === 'password'">
                <h2>Alterar Senha</h2>
                <form @submit.prevent="updatePassword">
                    <div class="form-group">
                        <label for="oldPassword">Senha Atual:</label>
                        <input type="password" v-model="oldPassword" id="oldPassword" required />
                    </div>
                    <div class="form-group">
                        <label for="newPassword">Nova Senha:</label>
                        <input type="password" v-model="newPassword" id="newPassword" required />
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword">Confirmar Nova Senha:</label>
                        <input type="password" v-model="confirmPassword" id="confirmPassword" required />
                    </div>
                    <button type="submit">Atualizar Senha</button>
                </form>
            </div>

            <div v-if="activeTab === 'messages'">
                <h2>Mensagens</h2>
                <p>Esta seção exibirá suas mensagens.</p>
            </div>
        </div>
    </div>

    <div v-if="showLogoutPopup" class="popup-backdrop" @click="closeLogoutPopup"></div>
    <div v-if="showLogoutPopup" class="popup">
        <p>Deseja realmente sair?</p>
        <button @click="confirmLogout">Sim</button>
        <button @click="closeLogoutPopup">Não</button>
    </div>

    <div v-if="popupMessage">
        <div class="popup-backdrop" @click="closePopup"></div>
        <div class="popup">
            <p>{{ popupMessage }}</p>
            <button @click="closePopup">Fechar</button>
        </div>
    </div>
</template>

<script>
import "../css/Form.css";
import "../css/Popup.css";
import axios from "axios";

export default {
    name: "UserProfile",
    data() {
        return {
            activeTab: "data",
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            isEditing: false,
            error: null,
            popupMessage: null,
            showLogoutPopup: false,
            user: null,
            loading: true,
        };
    },
    created() {
        this.fetchUserData();
    },
    methods: {
        setActiveTab(tab) {
            this.activeTab = tab;
        },
        async fetchUserData() {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    throw new Error("Token de autenticação não encontrado");
                }

                this.loading = true; // Inicia o carregamento
                const response = await axios.get("http://localhost:8080/api/user/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                this.user = response.data;
            } catch (error) {
                this.error = error.response ? error.response.data : error.message;
                console.error("Erro ao obter dados do usuário:", this.error);
                this.popupMessage = "Erro ao carregar os dados do usuário. Tente novamente mais tarde.";
            } finally {
                this.loading = false; // Finaliza o carregamento
            }
        },
        async updatePassword() {
            if (this.newPassword !== this.confirmPassword) {
                this.popupMessage = "As senhas não coincidem.";
                return;
            }

            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    throw new Error("Token de autenticação não encontrado");
                }

                const response = await axios.put(
                    "http://localhost:8080/api/user/me/change-password",
                    {
                        oldPassword: this.oldPassword,
                        newPassword: this.newPassword,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                this.popupMessage = "Senha atualizada com sucesso!";
            } catch (error) {
                if (error.response && error.response.data) {
                    const errorMessage = error.response.data.message || "Erro ao atualizar senha.";
                    console.error("Erro ao atualizar senha:", errorMessage);
                    this.popupMessage = errorMessage;
                } else {
                    console.error("Erro desconhecido:", error.message);
                    this.popupMessage = "Erro ao atualizar senha.";
                }
            }
        },
        startEditing() {
            this.isEditing = true;
        },
        cancelEdit() {
            this.isEditing = false;
            this.fetchUserData();  // Recarrega os dados após cancelar
        },
        async updateUserData() {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    throw new Error("Token de autenticação não encontrado");
                }

                const response = await axios.put(
                    "http://localhost:8080/api/user/me",
                    {
                        name: this.user.name,
                        email: this.user.email,
                        phone: this.user.phone,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Atualiza o token
                if (response.data && response.data.token) {
                    localStorage.setItem("authToken", response.data.token);
                }

                // Recarrega os dados do usuário com o novo token
                await this.fetchUserData();

                this.isEditing = false;
                this.popupMessage = "Dados atualizados com sucesso!";
            } catch (error) {
                console.error("Erro ao atualizar dados:", error);
                this.popupMessage = "Erro ao atualizar dados.";
            }
        },
        logout() {
            localStorage.removeItem("authToken");
            this.$router.push("/login");
        },
        openLogoutPopup() {
            this.showLogoutPopup = true;
        },
        closeLogoutPopup() {
            this.showLogoutPopup = false;
        },
        confirmLogout() {
            this.logout();
            this.closeLogoutPopup();
        },
        closePopup() {
            this.popupMessage = null;
        }
    },
};
</script>

<style scoped>
.container {
    display: flex;
    height: 100vh;
    margin: auto;
}

.sidebar {
    width: 200px;
    background-color: #f4f4f4;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.sidebar ul {
    list-style-type: none;
    padding: 0;
}

.sidebar li {
    cursor: pointer;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 4px;
    background-color: #e0e0e0;
    height: 40px;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
}

.sidebar li:hover {
    background-color: #ccc;
}

.sidebar li.active {
    background-color: #6a7f3d;
    color: white;
}

.sidebar li.logout {
    margin-top: auto;
    background-color: #ccc;
}

.sidebar li.logout:hover {
    background-color: #9e9e9e;
}

.content {
    flex-grow: 1;
    margin-left: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

button {
    padding: 10px 20px;
    background-color: #6a7f3d;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 10px;
}

button:hover {
    background-color: #557a2d;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
}

h2 {
    font-size: 22px;
    color: #4c5b3c;
    margin-bottom: 20px;
}
</style>
