import resourceFactory from "./resourceFactory";
import { User, Thing } from "models/types";

export const userResource = resourceFactory<User>("user");

export const thingResource = resourceFactory<Thing>("thing");
