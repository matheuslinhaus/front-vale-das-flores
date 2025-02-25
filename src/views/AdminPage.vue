<template>
    <div class="admin-container">
        <h1>Painel Administrativo</h1>
        <div class="admin-options">
            <div class="option-card" @click="navigateTo('manage-users')">
                <h2>Gerenciar Usuários</h2>
                <p>Adicionar, editar ou remover usuários do sistema.</p>
            </div>
            <div class="option-card" @click="navigateTo('view-reports')">
                <h2>Relatórios</h2>
                <p>Visualize relatórios de uso e métricas do sistema.</p>
            </div>
            <div class="option-card" @click="navigateTo('settings')">
                <h2>Configurações</h2>
                <p>Altere configurações gerais do sistema.</p>
            </div>
            <div class="option-card" @click="navigateTo('admin/budget-list')">
                <h2>Orçamentos</h2>
                <p>Acesse e gerencie a lista de Orçamentos do sistema.</p>
            </div>
            <div class="option-card" @click="navigateTo('admin/register-product')">
                <h2>Cadastrar Produto</h2>
                <p>Acesse e gerencie a lista de produtos do sistema.</p>
            </div>
            <div class="option-card" @click="navigateTo('admin/product-color')">
                <h2>Cadastro de cores</h2>
                <p>Acesse e gerencie a cor dos produtos.</p>
            </div>
            <div class="option-card" @click="navigateTo('admin/product-material')">
                <h2>Cadastro de materiais</h2>
                <p>Acesse e gerencie os materiais dos produtos.</p>
            </div>
            <div class="option-card" @click="navigateTo('admin/product-type')">
                <h2>Cadastro de tipo de produto</h2>
                <p>Acesse e gerencie os tipos dos produtos.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AdminPage",
    methods: {
        navigateTo(route) {
            this.$router.push(`/${route}`);
        }
    }
};
</script>

<style scoped>
.admin-container {
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
}

h1 {
    font-size: 28px;
    color: #4c5b3c;
    margin-bottom: 20px;
}

.admin-options {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.option-card {
    background-color: #ffffff;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 300px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.option-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.option-card h2 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #4c5b3c;
}

.option-card p {
    font-size: 14px;
    color: #666;
}
</style>
