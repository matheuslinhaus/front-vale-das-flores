<template>
    <div class="container">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" placeholder="Digite seu email" required
                    aria-describedby="email-helper" />
            </div>

            <div class="form-group">
                <label for="password">Senha</label>
                <input type="password" id="password" v-model="password" placeholder="Digite sua senha" required
                    aria-describedby="password-helper" />
            </div>

            <button type="submit" :disabled="!email || !password">Entrar</button>
        </form>

        <div class="signup-link">
            <p>Ainda não tem uma conta? <router-link to="/register">Crie uma conta</router-link></p>
        </div>

        <div v-if="popupMessage">
            <div class="popup-backdrop" @click="closePopup"></div>
            <div class="popup">
                <p>{{ popupMessage }}</p>
                <button @click="closePopup">Fechar</button>
            </div>
        </div>

    </div>
</template>

<script>
import "../css/Form.css";
import "../css/Popup.css";
import axios from "axios";

export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            popupMessage: null,
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post("http://localhost:8080/api/auth/login", {
                    email: this.email,
                    password: this.password
                });
                localStorage.setItem("authToken", response.data.token);
                this.$router.push("/users");
            } catch (error) {
                console.error('Erro no login:', error);

                if (!error.response) {
                    this.popupMessage = 'O servidor está indisponível. Tente novamente mais tarde.';
                } else if (error.response.status === 401) {
                    this.popupMessage = 'Email ou senha incorretos.';
                } else {
                    this.popupMessage = 'Ocorreu um erro inesperado. Tente novamente.';
                }
            }
        },
        closePopup() {
            this.popupMessage = null;
        }
    }
};
</script>
