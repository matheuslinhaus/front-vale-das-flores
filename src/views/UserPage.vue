<template>
    <div class="user-profile-container">
        <h2>Perfil do Usuário</h2>
        <div v-if="user">
            <p><strong>Nome:</strong> {{ user.name }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Data de Cadastro:</strong> {{ user.createdAt }}</p>
        </div>
        <div v-else>
            <p>Carregando informações do usuário...</p>
        </div>
        <button @click="logout">Sair</button>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "UserProfile",
    data() {
        return {
            user: null,
            error: null,
        };
    },
    created() {
        this.fetchUserData();
    },
    methods: {
        async fetchUserData() {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    throw new Error("Token de autenticação não encontrado");
                }

                const response = await axios.get("http://localhost:8080/api/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                this.user = response.data;
            } catch (error) {
                this.error = error.response ? error.response.data : error.message;
                console.error('Erro ao obter dados do usuário:', this.error);
            }
        },
        logout() {
            localStorage.removeItem("authToken");
            this.$router.push("/login");
        }
    }
};
</script>

<style scoped>
.user-profile-container {
    width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
}

h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
}

p {
    font-size: 16px;
    color: #666;
}

button {
    margin-top: 20px;
    padding: 12px;
    background-color: #6A7F3D;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #557a2d;
}
</style>
