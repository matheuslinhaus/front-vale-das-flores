<template>
  <div class="page">
    <div class="content-wrapper">
      <section class="about-us">
        <h2>Quem Somos</h2>
        <p>
          A Vale das Flores é uma loja de arranjos florais localizada no centro de Ibirama. Nosso objetivo é levar
          beleza e alegria à sua vida, com arranjos únicos e feitos com muito carinho.
        </p>
      </section>
      <section class="mission">
        <h2>Nossa Missão</h2>
        <p>
          Nossa missão é proporcionar experiências memoráveis através da arte floral, oferecendo produtos de alta
          qualidade e um atendimento personalizado.
        </p>
      </section>

      <section class="values">
        <h2>Nossos Valores</h2>
        <ul>
          <li>Qualidade: Utilizamos apenas as melhores flores e materiais.</li>
          <li>Criatividade: Cada arranjo é único e feito sob medida.</li>
          <li>Sustentabilidade: Prezamos por práticas sustentáveis em todos os nossos processos.</li>
          <li>Amor: Tudo o que fazemos é com muito carinho e dedicação.</li>
        </ul>
      </section>

      <section class="social">
        <h2>Nos Acompanhe no Instagram</h2>
        <p>
          Fique por dentro das novidades e inspirações da Vale das Flores. Siga-nos no Instagram:
        </p>
        <a href="https://www.instagram.com/valedasflores_/" target="_blank" class="instagram-link">
          @valedasflores_
        </a>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
}

.content-wrapper {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: transparent;
}

p {
  font-size: 1.1rem;
  color: #ffffff;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  background-color: #f8f8f8;
  margin: 10px 0;
  padding: 15px;
  border-radius: 8px;
  font-size: 1rem;
  color: #555;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

ul li:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.instagram-link {
  display: inline-block;
  margin-top: 10px;
  padding: 12px 24px;
  background-color: #f1e7a2;
  color: black;
  text-decoration: none;
  border-radius: 25px;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.instagram-link:hover {
  background-color: #d1ba1d;
  transform: scale(1.05);
}

/* Espaçamento entre as seções */
.about-us,
.mission,
.values,
.social {
  margin-bottom: 30px;
}

/* Responsividade */
@media (max-width: 768px) {
  h2 {
    font-size: 1.8rem;
  }

  p {
    font-size: 1rem;
  }

  ul li {
    font-size: 0.95rem;
  }

  .instagram-link {
    font-size: 0.95rem;
    padding: 10px 20px;
  }
}
</style>
