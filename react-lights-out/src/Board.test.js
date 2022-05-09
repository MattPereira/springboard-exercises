import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Board from "./Board";

describe("<Board /> rendering", function () {
  describe("initial board and win state", function () {
    /* Smoke test*/
    it("renders without crashing", function () {
      render(<Board />);
    });

    /* Snapshot test*/
    it("matches snapshot for all lights on", function () {
      const { asFragment } = render(<Board chanceLightStartsOn={1} />);
      expect(asFragment()).toMatchSnapshot();
    });

    it("shows win state when all lights off", function () {
      render(<Board chanceLightStartsOn={0} />);
      expect(screen.getByText("You Won!")).toBeInTheDocument();
    });
  });
});

describe("cell click", function () {
  it("toggles lights properly", function () {
    //render a fully lit up board
    render(<Board nrows={3} ncols={3} chanceLightStartsOn={1} />);

    const cells = screen.getAllByRole("button");
    console.log(cells);

    //Expecting all cells start as lit
    cells.forEach((cell) => {
      expect(cell).toHaveClass("Cell-lit");
    });

    //[0,1,2]
    //[3,4,5]
    //[6,7,8]
    //click on the middle cell
    fireEvent.click(cells[4]);

    //Only cells at the corners should be lit
    let litIndices = [0, 2, 6, 8];
    cells.forEach((cell, idx) => {
      if (litIndices.includes(idx)) {
        expect(cell).toHaveClass("Cell-lit");
      } else {
        expect(cell).not.toHaveClass("Cell-lit");
      }
    });
  });

  it("says you won after turning all lights off", function () {
    render(<Board nrows={1} ncols={3} chanceLightStartsOn={1} />);

    expect(screen.queryByText("You Won!")).not.toBeInTheDocument();

    const winningCell = screen.getByText("0-1");
    fireEvent.click(winningCell);
    expect(screen.queryByText("You Won!")).toBeInTheDocument();
  });
});
/* test for clicking on a cell*/
