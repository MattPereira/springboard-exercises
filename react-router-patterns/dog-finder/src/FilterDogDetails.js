import React from "react";
import DogDetails from "./DogDetails";
import { useParams } from "react-router-dom";

const FilterDogDetails = ({ dogs }) => {
  const { name } = useParams();

  const dog = dogs.find((d) => d.name.toLowerCase() === name);

  return <DogDetails dog={dog} />;
};

export default FilterDogDetails;
