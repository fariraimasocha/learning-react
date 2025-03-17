import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Fetch() {
  const fetchData = () => {
    const response = axios.get("https://randomuser.me/api?results=1");
    const results = response.then((res) => res.data);
    return results;
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: [fetchData],
    queryFn: fetchData,
  });

  if (isPending) return <span>Loading...</span>;

  if (isError) return <span>Error: {error.message}</span>;

  return <div>{JSON.stringify(data)}</div>;
}
