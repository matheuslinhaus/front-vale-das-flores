<template>
    <div class="container">
        <h2>Cadastro de Usuário</h2>
        <form @submit.prevent="register">
            <div class="form-group">
                <label for="name">Nome <span class="required">*</span></label>
                <input type="text" id="name" v-model="name" placeholder="Digite seu nome" required />
                <small v-if="name && !isNameValid" class="error-text">
                    Informe nome e sobrenome.
                </small>
            </div>

            <div class="form-group">
                <label for="email">Email <span class="required">*</span></label>
                <input type="email" id="email" v-model="email" placeholder="Digite seu email" required />
                <small v-if="email && !isEmailValid" class="error-text">
                    Por favor, insira um e-mail válido.
                </small>
            </div>

            <div class="form-group">
                <label for="phone">Telefone</label>
                <input type="text" id="phone" v-model="phone" @input="formatPhone" placeholder="(99) 9 9999-9999" />
            </div>

            <div class="form-group">
                <label for="password">Senha <span class="required">*</span></label>
                <input type="password" id="password" v-model="password" placeholder="Digite sua senha" required />
                <small v-if="password && password.length < 8" class="error-text">
                    A senha deve ter pelo menos 8 caracteres.
                </small>
            </div>

            <div class="form-group">
                <label for="confirm-password">Confirmar Senha <span class="required">*</span></label>
                <input type="password" id="confirm-password" v-model="confirmPassword" placeholder="Confirme sua senha"
                    required />
                <small v-if="confirmPassword && confirmPassword !== password" class="error-text">
                    As senhas não coincidem.
                </small>
            </div>

            <button type="submit" :disabled="!isFormValid">
                Cadastrar
            </button>
        </form>

        <div class="login-link">
            <p>Já tem uma conta? <router-link to="/login">Faça login</router-link></p>
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
import "../css/Popup.css"

export default {
    name: "Register",
    data() {
        return {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            popupMessage: null,
        };
    },
    computed: {
        isEmailValid() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(this.email);
        },
        isNameValid() {
            return this.name.trim().split(" ").length >= 2;
        },
        isFormValid() {
            return (
                this.isNameValid &&
                this.email &&
                this.isEmailValid &&
                this.password &&
                this.confirmPassword &&
                this.password === this.confirmPassword &&
                this.password.length >= 8
            );
        }
    },
    methods: {
        formatPhone(event) {
            let phone = event.target.value.replace(/\D/g, '');
            if (phone.length > 10) {
                phone = phone.slice(0, 11);
            }
            if (phone.length >= 7) {
                phone = phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (phone.length >= 3) {
                phone = phone.replace(/(\d{2})(\d{1,5})/, '($1) $2 ');
            } else if (phone.length > 0) {
                phone = phone.replace(/(\d{2})/, '($1) ');
            }
            this.phone = phone;
        },
        async register() {
            if (!this.isFormValid) {
                if (!this.isNameValid) {
                    this.popupMessage = "Por favor, insira o seu primeiro e segundo nome.";
                    return;
                }
                this.popupMessage = "Preencha todos os campos corretamente!";
                return;
            }

            try {
                const response = await fetch("http://localhost:8080/api/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        phone: this.phone
                    })
                });

                if (response.status === 400) {
                    const errorResponse = await response.json();
                    this.popupMessage = errorResponse.message || "Erro ao cadastrar o usuário.";
                    return;
                }

                if (!response.ok) {
                    throw new Error("Erro ao cadastrar o usuário.");
                }

                this.popupMessage = "Cadastro realizado com sucesso!";
                setTimeout(() => this.$router.push("/users"), 1000);
            } catch (error) {
                if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
                    this.popupMessage = "O servidor está indisponível. Tente novamente mais tarde.";
                } else {
                    this.popupMessage = error.message || "Erro no cadastro.";
                }
            }
        },
        closePopup() {
            this.popupMessage = null;
        }
    }
};
</script>