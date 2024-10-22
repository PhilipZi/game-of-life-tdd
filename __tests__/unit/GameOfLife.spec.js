import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GameOfLife from "../../components/GameOfLife.vue";

describe("GameOfLife Component", () => {
  it("should render an empty grid", () => {
    const wrapper = mount(GameOfLife, {
      props: {
        rows: 4,
        columns: 4,
      },
    });

    const cells = wrapper.findAll(".cell");
    expect(cells.length).toBe(wrapper.props("rows") * wrapper.props("columns")); // 4x4 grid
    cells.forEach((cell) => {
      expect(cell.classes()).toContain("bg-gray-200"); // Initial cells should be dead
    });
  });

  // Test that the grid is updated when a cell is clicked
  it("should update the grid for the next generation", async () => {
    const wrapper = mount(GameOfLife, {
      props: {
        rows: 4,
        columns: 4,
      },
    });

    // Initial configuration
    let rows = [];

    const setRandomCol = () => {
      const col = [];
      for (let n = 0; n < wrapper.props("columns"); n++) {
        col.push(Math.random() < 0.5); // Randomly assign true or false
      }
      return col;
    };

    const setRows = () => {
      for (let i = 0; i < wrapper.props("rows"); i++) {
        rows.push(setRandomCol());
      }
    };

    setRows();
    const input = rows;

    // Set the grid to this random configuration
    wrapper.vm.grid = input;
    await wrapper.vm.$nextTick(); // Ensure Vue reactivity updates are done

    // Define the function to count neighbors
    const countNeighbors = (row, col) => {
      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue; // Ignore the cell itself
          const newRow = row + i;
          const newCol = col + j;
          if (
            newRow >= 0 &&
            newRow < wrapper.props("rows") &&
            newCol >= 0 &&
            newCol < wrapper.props("columns")
          ) {
            if (input[newRow][newCol]) {
              count++;
            }
          }
        }
      }
      return count;
    };

    // Calculate the next generation
    const expectedGrid = input.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        const neighbors = countNeighbors(rowIndex, colIndex);
        if (cell && (neighbors < 2 || neighbors > 3)) {
          return false; // Cell dies
        }
        if (!cell && neighbors === 3) {
          return true; // Cell becomes alive
        }
        return cell;
      });
    });

    // Run the next generation in the component
    await wrapper.vm.nextGeneration();
    await wrapper.vm.$nextTick(); // Ensure Vue reactivity updates are done

    // Check if the grid matches the expected output
    expect(wrapper.vm.grid).toEqual(expectedGrid);
  });
});
