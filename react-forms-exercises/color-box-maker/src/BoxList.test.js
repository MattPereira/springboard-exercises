import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BoxList from "./BoxList";

//test function to create a new box
function addBox(boxList, height = "7", width = "7", color = "indigo") {
  const widthInput = screen.getByLabelText("Width");
  const heightInput = screen.getByLabelText("Height");
  const colorInput = screen.getByLabelText("Color");
  fireEvent.change(widthInput, { target: { value: width } });
  fireEvent.change(heightInput, { target: { value: height } });
  fireEvent.change(colorInput, { target: { value: color } });
  const submitBtn = screen.getByText("Add Box");
  fireEvent.click(submitBtn);
}

describe("<BoxList /> rendering", function () {
  describe("initial boxlist state", function () {
    it("renders without crashing", function () {
      render(<BoxList />);
    });

    it("matches snapshot", function () {
      const { asFragment } = render(<BoxList />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("adding and removing boxes", function () {
    it("can add new box to page", function () {
      const view = render(<BoxList />);

      //no boxes in document
      expect(screen.queryByText("X")).not.toBeInTheDocument();

      addBox(view);

      //expect box to be in document
      const removeBtn = screen.getByText("X");
      expect(removeBtn).toBeInTheDocument();

      expect(removeBtn.closest("div")).toHaveStyle(`
      width: 7em;
      height: 7em;
      background-color: indigo;
      `);

      //expect form to be empty
    });

    it("can remove a box from document", function () {
      addBox(render(<BoxList />));

      const removeBtn = screen.getByText("X");

      //click remove btn and expect box removed from document
      fireEvent.click(removeBtn);
      expect(removeBtn).not.toBeInTheDocument();
    });
  });
});
