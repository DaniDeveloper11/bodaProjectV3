<template>
  <div class="absolute inset-0 flex items-center justify-center z-0 pointer-events-none mb-4">
    <div class="loader opacity-60"></div>
  </div>
</template>

<style scoped>
.loader {
  width: 2em;
  height: 1.5em;
  position: relative;
  animation: beat 1s infinite;
}

.loader::before,
.loader::after {
  content: "";
  position: absolute;
  top: 0;
  width: 12px;
  height: 18px;
  border-radius: 5em 5em 0 0;
  animation: coldblue 1s infinite;
}

.loader::before {
  left: 12px;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
}

.loader::after {
  left: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;
}

@keyframes beat {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@keyframes coldblue {
  0%, 100% { background-color: rgb(255, 255, 255); }
  50% { background-color: rgb(198, 23, 23); }
}
</style>
