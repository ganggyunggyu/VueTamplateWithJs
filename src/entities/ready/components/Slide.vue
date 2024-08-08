<script setup>
  import 'vue3-carousel/dist/carousel.css';
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

  import Image from '@/shared/components/Image.vue';

  import {
    SLIDE_0,
    SLIDE_1,
    SLIDE_2,
    SLIDE_3,
    SLIDE_4,
  } from '@/shared/resources/slide';

  const SLIDE_INFO = [
    { id: 0, imageUrl: SLIDE_0 },
    { id: 1, imageUrl: SLIDE_1 },
    { id: 2, imageUrl: SLIDE_2 },
    { id: 3, imageUrl: SLIDE_3 },
    { id: 4, imageUrl: SLIDE_4 },
  ];

  const breakpoints = {
    // 700px and up
    700: {
      itemsToShow: 2,
      snapAlign: 'center',
    },
    // 1024 and up
    1024: {
      itemsToShow: 2,
      snapAlign: 'start',
    },
  };
</script>

<template>
  <Carousel :wrap-around="true" :breakpoints="breakpoints">
    <Slide v-for="slide in SLIDE_INFO" :key="slide.id">
      <div class="carousel__item">
        <Image class="carousel-image" :src="slide.imageUrl" />
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<style>
  .carousel__item {
    /* min-height: calc(50 * var(--vh)); */
    min-height: 280px;
    width: 100%;
    background-color: var(--color-white);
    font-size: 20px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
  }
  .carousel__slide {
    padding: 10px;
  }
  .carousel__pagination {
    padding-top: 8px;
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
    background-color: var(--color-gray-40);
    color: var(--color-white);
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
  .carousel__next {
    right: -65px;
  }
  .carousel__prev {
    left: -65px;
  }
  .carousel-image {
    width: 100%;
    min-height: 280px;
    border-radius: 5px;
  }
</style>
