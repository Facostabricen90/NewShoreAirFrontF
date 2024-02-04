import { Flight } from "./flight";

export interface Journey{
  Origin?: string;
  Destination?: string;
  Price?: number;
  Flights?: Flight[]
}
