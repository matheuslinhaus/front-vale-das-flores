<template>
  <div class="page">
    <div class="content-wrapper">
      <div class="text-section">
        <h2>Transforme seu ambiente</h2>
        <p>Com muito carinho, criamos arranjos personalizados que trazem um pedacinho de aconchego e alegria para o seu
          lar. Cada peça é feita com atenção aos detalhes, para que seu ambiente fique ainda mais especial e acolhedor,
          do jeitinho que você merece. Tudo isso, diretamente de Ibirama/SC.</p>

        <div class="mobile-carousel" v-if="isMobile">
          <div class="image-box">
            <div class="image-box-background">
              <div class="carousel-container">
                <button @click="prevImage" class="carousel-btn prev-btn">‹</button>
                <img :src="images[currentIndex]" :alt="'Produto ' + (currentIndex + 1)" class="carousel-image" />
                <button @click="nextImage" class="carousel-btn next-btn">›</button>
              </div>
            </div>
          </div>
        </div>

        <p>Escolhemos flores e materiais de qualidade, sempre com muito cuidado para garantir que cada arranjo seja
          bonito e durável.</p>
        <p><strong>Venha nos visitar e descubra como podemos transformar seu espaço com arranjos feitos especialmente
            para você!</strong></p>

        <button class="cta-btn" @click="navigateToBudget">Solicite um orçamento</button>
      </div>

      <div class="image-section" v-if="!isMobile">
        <div class="image-box">
          <div class="image-box-background">
            <img src="https://i.imgur.com/RxMbC7I.png" alt="Produto 1" />
            <img src="https://i.imgur.com/nAxB52I.png" alt="Produto 2" />
            <img src="https://i.imgur.com/DhbMERr.png" alt="Produto 3" />
            <img src="https://i.imgur.com/KB8JFJA.png" alt="Produto 4" />
            <img src="https://i.imgur.com/qHr31zr.png" alt="Produto 5" />
            <img src="https://i.imgur.com/ab566g5.png" alt="Produto 6" />
            <img src="https://i.imgur.com/24zvFre.png" alt="Produto 7" />
            <img src="https://i.imgur.com/ImX9krq.png" alt="Produto 8" />
            <img src="https://i.imgur.com/JvXbJoA.png" alt="Produto 9" />
            <img src="https://i.imgur.com/tMZdXGm.png" alt="Produto 10" />
            <img src="https://i.imgur.com/iMROLqr.png" alt="Produto 11" />
            <img src="https://i.imgur.com/KuCIFku.png" alt="Produto 12" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      images: [
        "https://i.imgur.com/RxMbC7I.png",
        "https://i.imgur.com/nAxB52I.png",
        "https://i.imgur.com/DhbMERr.png",
        "https://i.imgur.com/KB8JFJA.png",
        "https://i.imgur.com/qHr31zr.png",
        "https://i.imgur.com/ab566g5.png",
        "https://i.imgur.com/24zvFre.png",
        "https://i.imgur.com/ImX9krq.png",
        "https://i.imgur.com/JvXbJoA.png",
        "https://i.imgur.com/tMZdXGm.png",
        "https://i.imgur.com/iMROLqr.png",
        "https://i.imgur.com/KuCIFku.png",
      ],
      currentIndex: 0, // Indica a imagem atual no carrossel
      isMobile: false,
    };
  },
  mounted() {
    this.isMobile = window.innerWidth <= 768; // Detecta o tamanho da tela
    window.addEventListener('resize', this.handleResize); // Escuta mudanças no tamanho da tela
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    navigateToBudget() {
      this.$router.push('/budget');
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 768; // Atualiza o estado com base na largura da tela
    },
    // Função para avançar a imagem
    nextImage() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0; // Se estiver na última imagem, volta para a primeira
      }
    },
    // Função para voltar a imagem
    prevImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.images.length - 1; // Se estiver na primeira imagem, vai para a última
      }
    },
  },
};
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
}

.content-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
}

.text-section {
  width: 45%;
  padding: 20px;
  display: flex;
  color: white;
  flex-direction: column;
  justify-content: center;
}

.text-section p {
  font-size: 1.1em;
  margin-bottom: 25px;
}

.cta-btn {
  color: white;
  padding: 12px 25px;
  border: none;
  cursor: pointer;
  font-size: 1.1em;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.image-section {
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.image-box {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-height: 550px;
  background-color: #dcdcdc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: hidden;
  overflow-x: hidden;
  height: 100%;
}

.image-box-background {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  height: auto;
}

.image-box img {
  width: 100%;
  height: auto;
  object-fit: contain;
  max-width: 100%;
  border-radius: 10px;
  transition: transform 0.3s ease;
  max-height: 230px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.image-box img:hover {
  transform: scale(1.05);
  z-index: 1;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.image-box-background {
  overflow-x: hidden;
}

@media (max-width: 768px) {
  .content-wrapper {
    gap: 20px;
    flex-direction: column;
  }

  .text-section,
  .mobile-carousel {
    width: 88%;
    padding: 10px;
  }

  .text-section h2 {
    margin-top: 0;
  }

  .text-section p {
    margin-bottom: 15px;
    font-size: 1em;
  }

  .mobile-carousel {
    margin-top: 20px;
  }

  .carousel-container {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    height: 230px;
    position: relative;
  }

  .carousel-image {
    width: 100%;
    object-fit: contain;
    border-radius: 10px;
    transition: transform 0.3s ease;
  }

  .carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    color: black;
    border: none;
    font-size: 3em;
    cursor: pointer;
    width: 0px;
    height: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease;
    z-index: 1;
  }

  .prev-btn {
    left: -6px;
  }

  .next-btn {
    right: -6px;
  }
}
</style>
