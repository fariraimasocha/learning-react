
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Interview() {
  const fetchCoffee = () => {
    const response = axios.get("https://coffee.alexflipnote.dev");
    return response;
  };

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["coffee"],
    queryFn: fetchCoffee,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return <div>{JSON.stringify(data)}</div>;

}