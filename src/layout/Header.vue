<template>
    <header class="header">
        <div class="logo-container">
            <router-link to="/" class="logo-link">
                <div class="logo"></div>
            </router-link>
            <span class="logo-text">Vale das Flores</span>
        </div>

        <!-- Menu hamburguer (visível apenas no mobile) -->
        <div class="hamburger-menu" @click="toggleMenu">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>

        <!-- Menu de navegação -->
        <nav :class="{ 'active': isMenuVisible }">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">Sobre</a></li>
                <li><a href="/contact">Contato</a></li>
                 <li v-if="isAuthenticated"><a href="/users">Conta</a></li>
          <!-- <li>
            <a v-if="!isAuthenticated" href="/login">Login</a>
            <a v-else href="#" @click.prevent="logout">Logout</a>
          </li> -->
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
            currentLang: localStorage.getItem('lang') || 'pt',
            isMenuVisible: false,
        };
    },
    created() {
        this.checkAuthStatus();
    },
    methods: {
        checkAuthStatus() {
            this.isAuthenticated = localStorage.getItem("authToken") !== null;
        },
        toggleMenu() {
            this.isMenuVisible = !this.isMenuVisible;
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
    z-index: 10;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo {
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

.hamburger-menu {
    display: none;
    flex-direction: column;
    cursor: pointer;
    padding: 10px;
}

.hamburger-menu .bar {
    width: 30px;
    height: 3px;
    background-color: white;
    margin: 5px 0;
}

nav.active {
    display: block;
    opacity: 1;
    transform: translateY(0);
}

@media (max-width: 768px) {
    nav {
        display: none;
        background-color: #6A7F3D;
        text-align: center;
        position: absolute;
        top: 103%;
        left: 43%;
        padding-right: 30px;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .hamburger-menu {
        display: flex;
    }

    nav.active {
        display: block;
        opacity: 1;
        transform: translateY(0);
    }

    nav ul {
        padding: 0;
        display: block;
    }

    nav ul li {
        padding: 5px 20px;
        width: 80%;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        background-color: #6A7F3D;
        transition: background-color 0.3s ease;
    }

    nav ul li a {
        font-size: 18px;
        padding: 22px;
        display: block;
        color: white;
        text-decoration: none;
    }

    nav ul li a:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
}
</style>