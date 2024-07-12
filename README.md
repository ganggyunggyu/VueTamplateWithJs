# Vue + Javascript Template

- vite로 생성한 vue 프로젝트의 기본 코드 삭제
- 폴더 구조 정의

## 로컬 호스트를 https로 테스트

루트 디렉토리에서 실행

```
mkcert localhost
```

## lib

- vue-router

## custom-lib

- setViewPort

## custom-hook

- useSetVh

## tree

```
.
├── App.vue
├── app
│   ├── config
│   │   └── env-config.js
│   ├── provider
│   │   └── AppProvider.vue
│   ├── store
│   │   └── useDarkMode.js
│   └── styles
│       ├── app.css
│       └── index.css
├── assets
│   └── vue.svg
├── entities
│   ├── domain1
│   │   ├── api
│   │   │   └── api.js
│   │   └── components
│   │       └── UI.vue
│   └── domain2
│       ├── api
│       │   └── api.js
│       └── components
│           └── UI.vue
├── features
│   ├── domain1
│   │   ├── api
│   │   │   └── api.js
│   │   └── components
│   │       └── UI.vue
│   └── domain2
│       ├── api
│       │   └── api.js
│       └── components
│           └── UI.vue
├── main.js
├── router
│   └── index.js
├── shared
│   ├── components
│   ├── hooks
│   │   └── useSetVh.js
│   └── lib
│       └── setViewPort.js
└── views
    ├── Routing1.vue
    └── Routing2.vue
```

## update

## 코드 컨벤션

1. script setup & style scoped를 사용한다.

```
<script setup></script>

<template></template>

<style scoped></style>
```
