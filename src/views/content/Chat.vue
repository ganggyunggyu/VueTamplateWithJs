<script setup>
  import { ref, watch, nextTick } from 'vue';
  import { storeToRefs } from 'pinia';

  import { useContentStore } from '../../app/store/useContentStore';
  import ContentList from '../../features/content/components/ContentList.vue';

  import Header from '../../entities/content/components/Header.vue';
  import Guide from '../../entities/content/components/Guide.vue';
  import BottomNavigation from '../../entities/content/components/BottomNavigation.vue';

  import useKeyword from '../../shared/hooks/useKeyword';
  import KeywordSelector from '../../shared/components/KeywordSelector.vue';
  import Button from '../../shared/components/Button.vue';
  import { useRouter } from 'vue-router';

  import { getPreviousRoute } from '@/router';
  import Loading from '@/entities/landing/components/Loading.vue';

  const store = useContentStore();
  const { keywordsContentList } = storeToRefs(store);
  const { setKeywordContentList } = store;
  const router = useRouter();

  const chatRefList = ref([]);

  const isKeywordSelector = ref(false);

  const { setSelectedKeyword, keywordGroupRef, getIsSelected } = useKeyword({
    size: 6,
  });

  const closeKeywordSelector = () => {
    isKeywordSelector.value = false;
  };
  const openKeywordSelector = () => {
    isKeywordSelector.value = true;
  };
  const handleKeywordClick = (id) => {
    setSelectedKeyword(id);
    const newChat = {
      contentList: setKeywordContentList({ keywordId: id }),
      guideList: ['알랄ㄹ랄랄', '알랄ㄹ랄랄', '알랄ㄹ랄랄'],
    };
    closeKeywordSelector();

    const copyChetList = [...chatRefList.value];
    copyChetList.push(newChat);

    chatRefList.value = [...copyChetList];
    console.log(chatRefList.value);
  };

  watch(chatRefList, async () => {
    await nextTick();
    const chatContainer = document.querySelector('.chat-container');
    chatContainer.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  });
  const isLoadingRef = ref(true);
  const timerRef = ref(null);

  const previousRoute = ref(getPreviousRoute());

  console.log(previousRoute);

  if (previousRoute.value.name === 'Keyword') {
    setTimeout(() => {
      isLoadingRef.value = false;
    }, 3000);
  } else {
    isLoadingRef.value = false;
  }
</script>
<template>
  <main class="chat-page">
    <Loading v-if="isLoadingRef" />
    <Header />
    <div class="chat-container">
      <Guide :guide-list="['최초 가이드', '입니다.']" />
      <ContentList :contentList="keywordsContentList" />
      <ContentList
        v-for="chat of chatRefList"
        :contentList="chat.contentList"
        :guide-list="chat.guideList"
      />
    </div>
    <TransitionGroup name="fade">
      <div
        @click="closeKeywordSelector"
        class="keyword-selector-background"
        v-if="isKeywordSelector"
      >
        <KeywordSelector
          class="chat-keyword"
          :keywordGroupRef="keywordGroupRef"
          :handleKeywordClick="handleKeywordClick"
          :getIsSelected="getIsSelected"
        />
      </div>
      <Button
        @click="openKeywordSelector"
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
  .keyword-selector-background {
    position: fixed;
    width: 100vw;
    height: calc(100 * var(--vh));
    background-color: rgba(255, 255, 255, 0.3);
    z-index: 8;
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
