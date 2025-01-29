<template>
  <div class="page">
    <div class="content-wrapper">
      <div class="text-section">
        <h2>Transforme seu ambiente</h2>
        <p>Com muito carinho, criamos arranjos personalizados que trazem um pedacinho de aconchego e alegria para o seu
          lar. Cada peça é feita com atenção aos detalhes, para que seu ambiente fique ainda mais especial e acolhedor,
          do jeitinho que você merece. Tudo isso, diretamente de Ibirama/SC.</p>

        <p>Escolhemos flores e materiais de qualidade, sempre com muito cuidado para garantir que cada arranjo seja
          bonito e durável.</p>
        <p><strong>Venha nos visitar e descubra como podemos transformar seu espaço com arranjos feitos especialmente
            para você!</strong></p>


        <button class="cta-btn" @click="navigateToBudget">Solicite um orçamento</button>
      </div>

      <div class="image-section">
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
  methods: {
    navigateToBudget() {
      this.$router.push('/budget');
    },
  },
};
</script>

<style scoped>
.home-page {
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
</style>
