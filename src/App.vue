<script setup>
import Form from './Form.vue';
</script>

<template>
  <div :class="$style.outerDiv">
    <div :class="$style.innerDiv">
      <h2>App</h2>
      <Form />
    </div>
  </div>
</template>

<style module>
.outerDiv {
  display: flex;
  flex-direction: column;
}

.innerDiv {
  min-width: 70%;
  max-width: 30%;
  align-self: center;
}
</style>
