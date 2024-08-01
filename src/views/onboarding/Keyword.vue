<script setup>
  import { useRouter } from 'vue-router';

  import Navigation from '@/entities/onboarding/components/Navigation.vue';
  import Guide from '@/entities/onboarding/components/Guide.vue';

  import useGetConstant from '@/shared/hooks/useGetConstant';
  import Button from '@/shared/components/Button.vue';

  import { CHARACTER_EN, CHARACTER_KO } from '@/assets/constants/character';
  import { ref } from 'vue';

  const ONBOARDING_SECOND_SECTION = [
    '평화님을 표현하는',
    '단어를3가지 선택해주세요.',
  ];

  const { data } = useGetConstant(CHARACTER_KO, CHARACTER_EN);

  const router = useRouter();
  const keywordGroupRef = ref([]);

  for (let i = 0; i < data.value.length; i += 4) {
    const chunk = data.value.slice(i, i + 4);
    keywordGroupRef.value.push(chunk);
  }

  console.log(keywordGroupRef.value);

  const keywordRef = ref([]);
  const isButtonActive = ref(false);
  const handleClick = () => {
    if (keywordRef.value.length === 3) {
      localStorage.setItem(
        'selectedKeywords',
        JSON.stringify(keywordRef.value),
      );
      router.push('/content-map');
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

  const getClass = (index) => {
    return index % 2 === 0 ? 'keyword-article-even' : 'keyword-article-odd';
  };
</script>

<template>
  <main class="onboarding-page">
    <Navigation />
    <Guide :guide="ONBOARDING_SECOND_SECTION" />
    <section class="keyword-section">
      <article
        class="keyword-article scroll"
        v-for="(keywordList, i) in keywordGroupRef"
        :key="i"
        :class="getClass(i + 1)"
      >
        <figure
          v-for="keyword in keywordList"
          :key="keyword.id"
          class="character-card"
          :class="isSelected(keyword.id) && 'test'"
          @click="handleKeywordClick(keyword.id)"
        >
          <p>{{ keyword.char }}</p>
        </figure>
      </article>
    </section>
    <Button
      :disabled="!isButtonActive"
      @click="handleClick"
      class="onboarding-button"
      label="선택 완료"
    />
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

  .character-card {
    height: calc(10 * var(--vh));
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    background: white;
    border-radius: 40px;
    border: solid 1px #ccc;
    min-width: fit-content;
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
  .keyword-section {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .keyword-article-odd {
    display: flex;
    gap: 6px;
    overflow: scroll;
    padding: 2px 30px 2px 10px;
  }
  .keyword-article-even {
    display: flex;
    gap: 6px;
    overflow: scroll;
    padding: 2px 10px 2px 30px;
    position: relative;
    width: 100%;
  }
</style>
