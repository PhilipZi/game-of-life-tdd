<template>
  <div class="grid" :style="gridStyle">
    <div v-for="(row, rowIndex) in grid" :key="rowindex" class="flex">
      <div
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        class="cell w-6 h-6 border border-gray-300"
        :class="cell ? 'bg-black' : 'bg-white'"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
const props = defineProps({
  rows: {
    type: Number,
    default: 5,
  },
  cols: {
    type: Number,
    default: 5,
  },
});

const grid = ref(
  Array.from(
    { length: props.rows },
    () => Array.from({ length: props.cols }, () => false) // alle Zellen tot initialisieren
  )
);

const gridStyle = {
  display: "grid",
  gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
};
</script>

<style scoped>
.grid {
  gap: 2px;
}
.cell {
  transition: background-color 0.2s;
}
</style>
