<script setup>
  import { useRouter } from 'vue-router';

  import Navigation from '@/entities/onboarding/components/Navigation.vue';
  import Guide from '@/entities/onboarding/components/Guide.vue';

  import useGetConstant from '@/shared/hooks/useGetConstant';
  import Button from '@/shared/components/Button.vue';

  import { CHARACTER_EN, CHARACTER_KO } from '@/assets/constants/character';
  import { ref } from 'vue';

  const ONBOARDING_SECOND_SECTION = ['평화님을 표현하는', '단어를3가지 선택해주세요.'];

  const { data: characterList } = useGetConstant(CHARACTER_KO, CHARACTER_EN);

  const router = useRouter();

  const keywordRef = ref([]);
  const isButtonActive = ref(false);
  const handleClick = () => {
    if (keywordRef.value.length === 3) {
      localStorage.setItem('selectedKeywords', JSON.stringify(keywordRef.value));
      router.push('/content-chat');
    }
  };
  const isSelected = (id) => {
    return keywordRef.value.includes(id);
  };

  const handleKeywordClick = (id) => {
    if (keywordRef.value.includes(id)) {
      keywordRef.value = keywordRef.value.filter((keyword) => keyword !== id);
    } else if (keywordRef.value.length < 3) {
      keywordRef.value.push(id);
    }
    isButtonActive.value = keywordRef.value.length === 3;
    console.debug(keywordRef.value);
  };
</script>

<template>
  <main class="onboarding-page">
    <Navigation />
    <Guide :guide="ONBOARDING_SECOND_SECTION" />
    <section class="character-card-container">
      <figure
        v-for="character in characterList"
        :key="character.id"
        class="character-card"
        :class="isSelected(character.id) && 'test'"
        @click="handleKeywordClick(character.id)"
      >
        <p>{{ character.char }}</p>
      </figure>
    </section>
    <Button :disabled="!isButtonActive" @click="handleClick" class="onboarding-button" label="선택 완료" />
  </main>
</template>

<style scoped>
  .onboarding-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100 * var(--vh));
  }

  .character-card-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
    overflow: scroll;
    width: 100%;
  }

  .character-card {
    width: 28vw;
    height: calc(10 * var(--vh));
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background: white;
    border-radius: 40px;
    border: solid 1px #ccc;
  }

  .onboarding-button {
    position: fixed;
    bottom: calc(8 * var(--vh));
    left: 50%;
    transform: translate(-50%, 50%);
  }
  .test {
    background-color: black;
    color: white;
  }
</style>
