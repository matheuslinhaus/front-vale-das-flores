<template>
    <header class="header">
        <div class="logo-container">
            <div class="logo"></div>
            <span class="logo-text">Vale das Flores</span>
        </div>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">Sobre</a></li>
                <li><a href="/contact">Contato</a></li>
                <li><a href="/users">Conta</a></li>
                <li>
                    <a v-if="!isAuthenticated" href="/login">Login</a>
                    <a v-else href="#" @click.prevent="logout">Logout</a>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            isAuthenticated: false,
        };
    },
    created() {
        this.checkAuthStatus();
    },
    methods: {
        checkAuthStatus() {
            this.isAuthenticated = localStorage.getItem("authToken") !== null;
        },
        logout() {
            localStorage.removeItem("authToken");
            this.checkAuthStatus();
            this.$router.push("/");
        }
    },
    watch: {
        '$route'(to, from) {
            this.checkAuthStatus();
        }
    }
};
</script>

<style scoped>
.header {
    background-color: #6A7F3D;
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo {
    opacity: 1;
    width: 50px;
    height: 50px;
    background-image: url('../assets/logo.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    border: 2px solid #fff;
}

.logo-text {
    font-size: 24px;
    font-weight: bold;
    margin-left: 10px;
}

nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
}

nav ul li {
    margin: 0 15px;
}

nav ul li a {
    color: white;
    text-decoration: none;
    font-size: 18px;
}

nav ul li a:hover {
    text-decoration: underline;
}
</style>
