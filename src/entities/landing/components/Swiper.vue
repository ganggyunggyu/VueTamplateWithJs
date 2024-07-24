<template>
  <Carousel @init="handleInit" @slide-start="handleSlideStart" :wrap-around="true">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script>
  import { defineComponent } from 'vue';
  import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';

  import 'vue3-carousel/dist/carousel.css';

  export default defineComponent({
    name: 'Basic',
    components: {
      Carousel,
      Slide,
      Pagination,
      Navigation,
    },
    methods: {
      handleInit() {
        console.log('Init');
      },
      handleSlideStart(data) {
        console.log('슬라이드', data);
      },
    },
  });
</script>

<style>
  .carousel__item {
    /* min-height: 200px; */
    width: 100%;
    height: calc(50 * var(--vh));
    background-color: var(--vc-clr-primary);
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .carousel__slide {
    /* padding: 10px; */
  }

  .carousel__prev,
  .carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
  }
</style>
