<script setup>
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';

  import { useContentStore } from '../../app/store/useContentStore';
  import ContentList from '../../features/content/components/ContentList.vue';

  import Header from '../../entities/content/components/Header.vue';
  import Guide from '../../entities/content/components/Guide.vue';
  import BottomNavigation from '../../entities/content/components/BottomNavigation.vue';

  import useKeyword from '../../shared/hooks/useKeyword';
  import KeywordSelector from '../../shared/components/KeywordSelector.vue';
  import Button from '../../shared/components/Button.vue';

  const store = useContentStore();
  const { keywordContentList } = storeToRefs(store);

  const isKeywordSelector = ref(false);

  const {
    setSelectedKeyword,
    keywordGroupRef,
    getIsSelected,
    selectedKeyword,
  } = useKeyword({
    size: 6,
  });

  const toggleKeywordSelected = () => {
    isKeywordSelector.value = !isKeywordSelector.value;
  };

  const handleKeywordClick = (id) => {
    setSelectedKeyword(id);
    toggleKeywordSelected();
    //여기서 얻은 id로 관련 콘텐츠 불러오기
  };
</script>
<template>
  <main class="chat-page">
    <Header />
    <div class="chat-container">
      <Guide />
      <ContentList :contentList="keywordContentList" />
    </div>
    <TransitionGroup name="fade">
      <KeywordSelector
        class="chat-keyword"
        v-if="isKeywordSelector"
        :keywordGroupRef="keywordGroupRef"
        :handleKeywordClick="handleKeywordClick"
        :getIsSelected="getIsSelected"
      />
      <Button
        @click="toggleKeywordSelected"
        v-if="!isKeywordSelector"
        class="submit-button black lg"
        label="키워드 선택"
      />
    </TransitionGroup>
    <BottomNavigation />
  </main>
</template>
<style scoped>
  .chat-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
    height: calc(100 * var(--vh));
    background-color: var(--color-gray-10);
  }
  .chat-container {
    position: relative;
    bottom: calc(10 * var(--vh));
    width: 100%;
    height: calc(82 * var(--vh));
    margin-top: calc(8 * var(--vh));
    padding-bottom: calc(10 * var(--vh));
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }
  .chat-keyword {
    position: fixed;
    bottom: calc(12 * var(--vh));
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 9;
  }
  .submit-button {
    position: fixed;
    bottom: calc(12 * var(--vh));
  }
</style>
