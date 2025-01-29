<template>
  <div class="page">
    <section class="contact-info">
      <h2>Entre em Contato</h2>
      <p>
        Estamos sempre prontos para atendê-lo! Entre em contato conosco através do telefone, e-mail, Instagram ou visite
        nossa loja.
      </p>
    </section>

    <section class="details">
      <div class="contact-item">
        <h3>WhatsApp</h3>
        <p>
          <a href="https://wa.me/554733574717" class="contact-link">
            <i class="fab fa-whatsapp"></i> +55 47 3357-4717
          </a>
        </p>
      </div>

      <div class="contact-item">
        <h3>E-mail</h3>
        <p>
          <a href="mailto:rolaniduwe@gmail.com" class="contact-link">
            <i class="fas fa-envelope"></i> rolaniduwe@gmail.com
          </a>
        </p>
      </div>

      <div class="contact-item">
        <h3>Instagram</h3>
        <p>
          <a href="https://www.instagram.com/valedasflores_/" target="_blank" class="contact-link">
            <i class="fab fa-instagram"></i> @valedasflores_
          </a>
        </p>
      </div>

      <div class="contact-item">
        <h3>Endereço</h3>
        <p>
          <a href="https://www.google.com/maps/place/R.+Marqu%C3%AAs+do+Herval,+34+-+Centro,+Ibirama+-+SC,+89140-000,+Brasil"
            target="_blank" class="contact-link">
            <i class="fas fa-map-marker-alt"></i> R. Marquês do Herval, 34 - Centro, Ibirama - SC, 89140-000, Brasil
          </a>
        </p>
      </div>
    </section>

    <section class="contact-map">
      <div class="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3551.089396525741!2d-49.51838868495646!3d-27.05668298301883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dfb3e4b6d7e5a5%3A0x1f8e8b0f8b0f8b0f!2sR.%20Marqu%C3%AAs%20do%20Herval%2C%2034%20-%20Centro%2C%20Ibirama%20-%20SC%2C%2089140-000%2C%20Brasil!5e0!3m2!1spt-BR!2sbr!4v1629999999999!5m2!1spt-BR!2sbr"
          width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Contato',
};
</script>

<style scoped>
.contact {
  padding: 40px 0;
  background-color: #f9f9f9;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-info {
  text-align: center;
  margin-bottom: 40px;
}

p {
  font-size: 1.1rem;
  color: #ffffff;
  margin-bottom: 20px;
}

.details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.contact-item {
  background-color: #ffffffd3;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.contact-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.contact-item h3 {
  font-size: 1.5rem;
  color: #4CAF50;
  margin-bottom: 10px;
}

.contact-link {
  color: #E1306C;
  text-decoration: none;
  transition: color 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.contact-link:hover {
  color: #C13584;

}

.contact-map {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}

.map {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 800px;
}

.fab,
.fas {
  font-size: 1.2rem;
}
</style>