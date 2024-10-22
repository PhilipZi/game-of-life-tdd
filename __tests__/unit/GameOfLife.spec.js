import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import GameOfLife from "../../components/GameOfLife.vue";

describe("GameOfLife Component", () => {
  it("should initialize a grid with dead cells", () => {
    const wrapper = mount(GameOfLife, {
      props: {
        rows: 5,
        cols: 5,
      },
    });

    const cells = wrapper.findAll(".cell");
    expect(cells.length).toBe(25);

    cells.forEach((cell) => {
      expect(cell.classes()).toContain("bg-white"); // dead cell
    });
  });
});
