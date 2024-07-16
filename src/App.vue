<script setup>
import { useSetVh } from "@/shared/hooks/useSetVh";
import Image from "./shared/components/Image.vue";
import Button from "@/shared/components/Button.vue";
import Input from "@/shared/components/Input.vue";
import { ref } from "vue";
import Map from "./entities/map/components/Map.vue";
useSetVh();

const inputRef = ref(null);

const SRC =
  "https://images.unsplash.com/photo-1715412406617-e76cd73e644d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const INPUT_CONFIG = {
  label: "",
  placeholder: "",
};
const handleClick = () => {
  console.log("hello");
  console.log(inputRef.value);
};

const handleChange = (event) => {
  inputRef.value = event.target.value;
};
</script>

<template>
  <Map class="map" />
  <Image class="test-image" :src="SRC" :alt="asdasdsad" />
  <Button class="test-button" label="버튼" :on-click="handleClick" />
  <Input class="test-input" label="인풋" placeholder="테스트 인풋" :on-change="handleChange" />
</template>

<style scoped>
.test-button {
  color: red;
}
.test-image {
  width: 300px;
  height: 300px;
}
.test-input {
  display: flex;
  flex-direction: column;
}
.test-input input {
  padding: 10px;
  background-color: red;
}
</style>
