<script setup>
  import Button from './Button.vue';

  /**
   * modalTextList: String[]
   * buttonConfigList: {style: String, label: String, click: Function}[]
   */
  const props = defineProps({
    modalTextList: Array,
    buttonConfigList: Array,
  });
</script>
<template>
  <div class="modal-background">
    <div class="modal-container">
      <div class="modal-text-container">
        <p v-for="(p, i) in props.modalTextList" :key="i">{{ p }}</p>
      </div>
      <div class="modal-button-container">
        <Button
          v-for="(button, i) in props.buttonConfigList"
          :key="i"
          :label="button.label"
          @click="button.click"
          :class="button.style"
          class="modal-button"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: calc(100 * var(--vh));
    z-index: 998;
    opacity: 1;
  }
  .modal-container {
    width: 90%;
    height: calc(32 * var(--vh));
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: white;
    transform: translate(-50%, -50%);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    gap: 10px;
  }
</style>
