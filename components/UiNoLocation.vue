<template>
  <div class="no-location">
    <img
      src="/images/location.svg" alt="Map pin"
      class="image"
    >

    <div class="description">
      {{ DESCRIPTION }}
    </div>
  </div>
</template>

<script setup lang="ts">
const DESCRIPTION = 'Укажите свое местоположение'
</script>

<style lang="scss" scoped>
.no-location {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;

  .image {
    width: 150px;
  }

  .description {
    font-size: 1rem;
  }

  @media screen and (min-width: $size-sm) {
    gap: 15px;

    .image {
      width: 350px;
    }

    .description {
      font-size: 2rem;
    }
  }

  @media screen and (min-width: $size-xl) {
    gap: get-vw(15px);

    .image {
      width: get-vw(350px);
    }

    .description {
      font-size: get-vw(32px);
    }
  }
}
</style>
