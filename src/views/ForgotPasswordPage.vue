<template>
    <div class="container">
        <h2>Recuperar Senha</h2>
        <form @submit.prevent="submitEmail">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" placeholder="Digite seu email" required
                    aria-describedby="email-helper" />
            </div>

            <button type="submit" :disabled="!email">Enviar</button>
        </form>

        <div class="login-link">
            <p>Lembrou sua senha? <router-link to="/login">Voltar ao login</router-link></p>
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
import api from '../services/api';
import "../css/Form.css";
import "../css/Popup.css";

export default {
    name: "ForgotPassword",
    data() {
        return {
            email: "",
            popupMessage: null,
        };
    },
    methods: {
        async submitEmail() {
            try {
                await api.post("api/auth/forgot-password", {
                    email: this.email
                });
                this.popupMessage = "Se o email estiver cadastrado, você receberá um link para redefinir sua senha.";
                this.email = "";
            } catch (error) {
                console.error("Erro ao enviar email de recuperação:", error);
                this.popupMessage = error.response?.data?.message || "Ocorreu um erro ao tentar enviar o email. Tente novamente.";
            }
        },
        closePopup() {
            this.popupMessage = null;
        }
    }
};
</script>

