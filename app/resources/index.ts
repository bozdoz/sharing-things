import resourceFactory from "./resourceFactory";
import { User } from "models/User";
import { Thing } from "models/Thing";

export const userResource = resourceFactory<User>("user");

export const thingResource = resourceFactory<Thing>("thing");
