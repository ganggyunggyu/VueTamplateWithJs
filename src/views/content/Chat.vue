<script setup>
  import { ref, watch, nextTick } from 'vue';
  import { useContentStore } from '../../app/store/useContentStore';
  import ContentList from '../../features/content/components/ContentList.vue';
  import Header from '../../entities/content/components/Header.vue';
  import Guide from '../../entities/content/components/Guide.vue';
  import BottomNavigation from '../../entities/content/components/BottomNavigation.vue';
  import useKeyword from '../../shared/hooks/useKeyword';
  import KeywordSelector from '../../shared/components/KeywordSelector.vue';
  import Button from '../../shared/components/Button.vue';
  import Loading from '@/entities/landing/components/Loading.vue';
  import BottomArrowIcon from '@/shared/icons/BottomArrowIcon.vue';
  import { getPreviousRoute } from '@/router';
  import { scrollToBottom } from '@/shared/lib/scrollToBottom';

  const contentStore = useContentStore();
  const { getKeywordsContentList, getKeywordContentList } = contentStore;

  const chatRefList = ref([]);
  const isLoadingRef = ref(true);
  const selectedKeywordListRef = ref(
    JSON.parse(localStorage.getItem('selectedKeywordList')) || [],
  );

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
      contentList: getKeywordContentList({ keywordId: id }),
      guideList: ['알랄ㄹ랄랄', '알랄ㄹ랄랄', '알랄ㄹ랄랄'],
    };
    closeKeywordSelector();
    const copyChetList = [...chatRefList.value];
    copyChetList.push(newChat);
    chatRefList.value = [...copyChetList];
  };
  const handleScrollBottomClick = () => {
    const chatContainer = document.querySelector('.chat-container');
    chatContainer.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  };

  watch(chatRefList, async () => {
    await nextTick();
    scrollToBottom({ className: 'chat-container' });
  });

  const initContentList = getKeywordsContentList({
    keywordIdList: selectedKeywordListRef,
  });

  const previousRoute = getPreviousRoute();

  if (previousRoute.name === 'Keyword') {
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
      <ContentList :contentList="initContentList" />
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
      <Button
        class="down-botton"
        @click="handleScrollBottomClick"
        :icon="BottomArrowIcon"
        iconSize="icon-md"
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
    touch-action: none;
  }
  .chat-container {
    position: fixed;
    top: calc(8 * var(--vh));
    width: 100%;
    max-height: calc(55 * var(--vh));
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    touch-action: pan-y;
  }
  .keyword-selector-background {
    position: fixed;
    width: 100vw;
    height: calc(100 * var(--vh));
    background-color: rgba(255, 255, 255, 0.1);
    z-index: 8;
  }
  .chat-keyword {
    position: fixed;
    bottom: calc(12 * var(--vh));
    background-color: rgba(255, 255, 255, 0.2);
    z-index: 9;
  }
  .submit-button {
    position: fixed;
    bottom: calc(12 * var(--vh));
    background: linear-gradient(
      180deg,
      rgba(243, 243, 243, 0, 4) 0%,
      #f3f3f3 100%
    );
  }
  .down-botton {
    position: fixed;
    bottom: calc(20 * var(--vh));
    right: 5%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-white);
    border-radius: 50%;
    box-shadow: 0px 4px 20px rgba(188, 188, 121, 0.2);
  }
</style>
