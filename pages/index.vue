<template>
  <div class="main-page">
    <button class="location-button">
      Мое местоположение
    </button>

    <ui-no-location />
  </div>
</template>

<style lang="scss" scoped>
$location-button-left: 20px;
$location-button-top: 20px;

.main-page {
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .location-button {
    position: absolute;
    left: $location-button-left;
    top: $location-button-top;
    background: none;
    border: none;
    font-size: 14px;
    color: $primary-text-color;
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: color $base-transition;

    &:hover {
      color: $hovered-text-color;
    }
  }

  @media screen and (min-width: $size-sm) {
    .location-button {
      font-size: 1rem;
    }
  }

  @media screen and (min-width: $size-xl) {
    .location-button {
      top: get-vw($location-button-top);
      left: get-vw($location-button-left);
      font-size: get-vw(16px);
    }
  }
}
</style>
