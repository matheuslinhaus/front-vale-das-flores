<template>
    <div>
        <div v-if="!token">
            <p>Redirecionando para a página de login...</p>
        </div>
        <div v-else class="container">
            <h2>Orçamento</h2>
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="title">
                        Nome do Produto ou Serviço: <span class="required">*</span>
                    </label>
                    <input type="text" id="title" v-model="form.title" required
                        placeholder="Arranjo floral, Decoração para quarto..." />
                </div>

                <div class="form-group">
                    <label for="description">
                        Descrição Detalhada: <span class="required" v-if="!form.image">*</span>
                    </label>
                    <textarea id="description" v-model="form.description" :required="!form.image"
                        placeholder="Descreva os detalhes, como tamanho, estilo, cores desejadas..."></textarea>
                </div>

                <div class="form-group">
                    <label for="image">Imagem de Referência:</label>
                    <input type="file" id="image" ref="imageInput" @change="handleImageUpload" />
                    <small class="field-description">
                        Inclua uma imagem para exemplificar sua necessidade (opcional).
                    </small>
                </div>
                <button type="submit">Solicitar Orçamento</button>
                <button type="button" @click="handleCancel" class="cancel-button">Cancelar</button>
            </form>
        </div>
    </div>
</template>

<script>
import "../css/Form.css";

export default {
    data() {
        return {
            token: localStorage.getItem("authToken"),
            form: {
                title: "",
                description: "",
                image: null,
            },
        };
    },
    created() {
        if (!this.token) {
            this.$router.push("/login");
        }
    },
    methods: {
        handleImageUpload(event) {
            const file = event.target.files[0];
            this.form.image = file ? file : null;
        },
        async handleSubmit() {
            if (!this.form.image && (!this.form.title || !this.form.description)) {
                alert("Nome e descrição detalhada são obrigatórios se não houver imagem.");
                return;
            }

            const formData = new FormData();
            formData.append("title", this.form.title);
            formData.append("description", this.form.description);
            if (this.form.image) {
                formData.append("image", this.form.image);
            }

            try {
                const response = await fetch("http://localhost:8080/api/budgets", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${this.token}`, // Inclua o token de autenticação, se necessário
                    },
                    body: formData,
                });

                if (response.ok) {
                    alert("Sua solicitação de orçamento foi enviada com sucesso!");
                    this.resetForm();
                } else {
                    const error = await response.json();
                    alert(`Erro ao enviar orçamento: ${error.message || "Erro desconhecido."}`);
                }
            } catch (error) {
                console.error("Erro ao enviar orçamento:", error);
                alert("Ocorreu um erro ao processar sua solicitação. Tente novamente.");
            }
        },
        handleCancel() {
            this.resetForm();
            this.$router.push("/budget");
        },
        resetForm() {
            this.form = {
                title: "",
                description: "",
                image: null,
            };
            this.$refs.imageInput.value = "";
        },
    },
};
</script>
