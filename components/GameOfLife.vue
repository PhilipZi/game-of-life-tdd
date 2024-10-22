<template>
  <div class="flex justify-center">
    <div :class="['grid gap-1', `grid-cols-${columns}`]">
      <div v-for="(row, rowIndex) in grid" :key="rowIndex">
        <div
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          class="cell w-8 h-8 bg-gray-200 border border-gray-400"
          @click="toggleCell(rowIndex, colIndex)"
          :class="{ 'bg-green-500': cell }"
        ></div>
      </div>
    </div>
  </div>
  <p class="text-white flex justify-center">'click on some empty cells'</p>
  <div class="flex justify-center">
    <button
      @click="nextGeneration()"
      class="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
    >
      Nächste Generation
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  rows: { type: Number, default: 12 },
  columns: { type: Number, default: 12 },
});

const grid = ref(
  Array.from({ length: props.rows }, () => Array(props.columns).fill(false))
);

console.log(grid.value);

const toggleCell = (rowIndex, colIndex) => {
  grid.value[rowIndex][colIndex] = !grid.value[rowIndex][colIndex];
};

const nextGeneration = (input) => {
  console.debug(input);
  if (input) grid.value = input;
  const newGrid = grid.value.map((row, rowIndex) => {
    return row.map((cell, colIndex) => {
      const neighbors = countNeighbors(rowIndex, colIndex);
      if (cell && (neighbors < 2 || neighbors > 3)) {
        return false; // Zelle stirbt
      }
      if (!cell && neighbors === 3) {
        return true; // Zelle wird lebendig
      }
      return cell;
    });
  });
  grid.value = newGrid;
  console.log(grid.value);
};

const countNeighbors = (row, col) => {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue; // Ignoriere die Zelle selbst
      const newRow = row + i;
      const newCol = col + j;
      if (
        newRow >= 0 &&
        newRow < props.rows &&
        newCol >= 0 &&
        newCol < props.columns
      ) {
        if (grid.value[newRow][newCol]) {
          count++;
        }
      }
    }
  }
  return count;
};
</script>

<style scoped>
.cell {
  transition: background-color 0.3s ease;
}
</style>
