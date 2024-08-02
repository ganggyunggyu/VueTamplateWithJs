<script setup>
  import Button from './Button.vue';
  const props = defineProps({ keywordGroupRef: Array, handleKeywordClick: Function, getIsSelected: Function });

  const getClass = ({ index }) => {
    return index % 2 === 0 ? 'keyword-article-even' : 'keyword-article-odd';
  };
</script>
<template>
  <section class="keyword-section">
    <article
      class="keyword-article scroll"
      v-for="(keywordList, i) in props.keywordGroupRef"
      :key="i"
      :class="getClass({ index: i + 1 })"
    >
      <Button
        v-for="keyword in keywordList"
        @click="props.handleKeywordClick(keyword.id)"
        :key="keyword.id"
        class="body-12px chip-lg"
        :class="props.getIsSelected(keyword.id) ? 'chip-gray' : 'chip-white'"
        :label="keyword.char"
      />
    </article>
  </section>
</template>
<style scoped>
  .keyword-section {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
  }

  .keyword-article-odd {
    display: flex;
    gap: 6px;
    overflow: scroll;
    padding: 2px 40px 2px 5px;
    width: 100%;
  }

  .keyword-article-even {
    display: flex;
    gap: 6px;
    overflow-x: scroll;
    padding: 2px 5px 2px 40px;
    width: 100%;
  }
</style>
