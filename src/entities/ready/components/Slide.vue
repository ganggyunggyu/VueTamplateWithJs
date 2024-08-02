<script setup>
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';

</script>

<template>
  <Carousel :wrap-around="true">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<style>
.carousel__item {
  width: 100%;
  height: calc(45 * var(--vh));
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-gray-50);
}

.carousel__slide {
  padding: 10px;
}

.carousel__pagination-button::after {
  border-radius: 50%;
  width: 8px;
  height: 8px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
  background-color: var(--color-gray-30);
  color: var(--color-white);
  border-radius: 50%;
}

.carousel__next {
  right: -75px;
}

.carousel__prev {
  left: -75px;
}
</style>
