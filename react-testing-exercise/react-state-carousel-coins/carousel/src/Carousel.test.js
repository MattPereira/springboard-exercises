import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

//smoke test
it("renders without crashing", () => {
  render(<Carousel />);
});

//snapshot test
it("should match snapshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

//specialized testing
it("works when you click on the right arrow", function () {
  render(<Carousel />);

  // expect the first image to show, but not the second
  let image1 = screen.queryByAltText(
    "Photo by Richard Pasquarella on Unsplash"
  );
  expect(image1).toBeInTheDocument();
  let image2 = screen.queryByAltText("Photo by Pratik Patel on Unsplash");
  expect(image2).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = screen.queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  image1 = screen.queryByAltText("Photo by Richard Pasquarella on Unsplash");
  expect(image1).not.toBeInTheDocument();
  image2 = screen.queryByAltText("Photo by Pratik Patel on Unsplash");
  expect(image2).toBeInTheDocument();
});

it("works when you click on the left arrow", function () {
  render(<Carousel />);

  // move forward in the carousel
  const rightArrow = screen.queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // move backward in the carousel
  const leftArrow = screen.queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  const image1 = screen.queryByAltText(
    "Photo by Richard Pasquarella on Unsplash"
  );
  expect(image1).toBeInTheDocument();
  const image2 = screen.queryByAltText("Photo by Pratik Patel on Unsplash");
  expect(image2).not.toBeInTheDocument();
});

it("hides and shows arrows", function () {
  render(<Carousel />);

  const leftArrow = screen.queryByTestId("left-arrow");
  const rightArrow = screen.queryByTestId("right-arrow");

  //On first image, left arrow should be hidden, right arrow showing
  expect(leftArrow).toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  //both arrows showing on second image
  fireEvent.click(rightArrow);
  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  // left arrow showing, right arrow hidden on last image
  fireEvent.click(rightArrow);
  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).toHaveClass("hidden");
});
