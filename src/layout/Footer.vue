<template>
  <footer class="footer">
    <p>&copy; 2025 - Todos os direitos reservados</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
.footer {
  background-color: #4C5B3C;
  color: white;
  text-align: center;
  position: fixed;
  width: 100%;
  bottom: 0;
  padding: 5px 0;
  font-size: 12px;
  opacity: 1;
}

.footer p {
  margin: 0;
}

@media (max-width: 768px) {
  .footer {
    font-size: 10px;
    padding: 3px 0;
  }
}
</style>
