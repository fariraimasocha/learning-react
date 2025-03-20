import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "./ui/table";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

export default function Intermediate() {
  const useState = React.useState;

  const [location, setLocation] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchData = async () => {
    const response = await axios.get("https://randomuser.me/api?results=20");
    const data = response.data.results.map((user) => user.location);
    console.log(data);
    setLocation(data);
    return data;
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["location"],
    queryFn: fetchData,
  });

  if (isPending) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  const search = (data) => {
    return data.filter((location) => {
      return (
        location.city.toLowerCase().includes(filter.toLowerCase()) ||
        location.country.toLowerCase().includes(filter.toLowerCase())
      );
    });
  };

  return (
    <div className="max-w-5xl mt-10 px-10">
      <Card>
        <div className="p-2">
          <Input
            type="text"
            placeholder="Search"
            className="w-6/12"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
        </div>
        <Table>
          <TableCaption>User Location Data</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => console.log("clicked city sort")}>
                City
              </TableHead>
              <TableHead>Coordinates</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Postcode</TableHead>
              <TableHead>Number</TableHead>
              <TableHead>Street</TableHead>
            </TableRow>
          </TableHeader>
          {search(location).map((location) => (
            <TableBody key={location.postcode}>
              <TableRow>
                <TableCell>{location.city}</TableCell>
                <TableCell>
                  {location.coordinates.latitude},{" "}
                  {location.coordinates.longitude}
                </TableCell>
                <TableCell>{location.country}</TableCell>
                <TableCell>{location.postcode}</TableCell>
                <TableCell>{location.street.number}</TableCell>
                <TableCell>{location.street.name}</TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </Card>
    </div>
  );
}
