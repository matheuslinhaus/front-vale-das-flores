<template>
    <header class="header">
        <div class="logo-container">
            <router-link to="/" class="logo-link">
                <div class="logo"></div>
            </router-link>
            <span class="logo-text">Vale das Flores</span>
        </div>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">Sobre</a></li>
                <li><a href="/contact">Contato</a></li>
                <!-- <li v-if="isAuthenticated"><a href="/users">Conta</a></li>
                <li>
                    <a v-if="!isAuthenticated" href="/login">Login</a>
                    <a v-else href="#" @click.prevent="logout">Logout</a>
                </li> -->
            </ul>
        </nav>
        <!-- <div class="language-selector">
            <img src="../assets/bandeira-brasileira.png" alt="Portuguese" class="language-icon"
                :class="{ 'selected': currentLang === 'pt' }" @click="changeLanguage('pt')" />
            <img src="../assets/flag-usa.png" alt="English" class="language-icon"
                :class="{ 'selected': currentLang === 'en' }" @click="changeLanguage('en')" />
        </div> -->
    </header>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            isAuthenticated: false,
            currentLang: localStorage.getItem('lang') || 'pt',
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
        },
        changeLanguage(language) {
            localStorage.setItem('lang', language);
            this.currentLang = language;
            window.location.reload();
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
    position: relative;
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
    margin-left: 30px;
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

.language-selector {
    display: flex;
    gap: 10px;
    align-items: center;
    position: absolute;
    top: 5px;
    right: 15px;
}

.language-icon {
    width: 23px;
    height: 16px;
    cursor: pointer;
    opacity: 0.9;
    border: 2px solid #fff;
    border-radius: 80%;
}

.language-icon:hover {
    opacity: 1;
    border-color: #FFD700;
}

.language-icon.selected {
    border-color: #FFD700;
    opacity: 1;
}
</style>
