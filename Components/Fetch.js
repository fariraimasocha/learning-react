import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Fetch() {
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const response = await axios.get(`https://randomuser.me/api?page=${page}`);
    return response.data;
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["users", page],
    queryFn: fetchData,
  });

  if (isPending) return <span>Loading...</span>;

  if (isError) return <span>Error: {error.message}</span>;

  return (
    <div className="max-w-2xl mt-10 px-10">
      {data.results.map((user) => (
        <Card key={user.email}>
          <CardHeader>
            <CardTitle>
              <div className="flex gap-1.5">
                <span className="font-bold">{user.name.first}</span>
                <span className="font-bold">{user.name.last}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              priority
              src={user.picture.thumbnail}
              width={50}
              height={50}
              alt="profile"
            />
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={handleNext}>
              Next
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
