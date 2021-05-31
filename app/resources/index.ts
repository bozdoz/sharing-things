import resourceFactory from "./resourceFactory";
import { User, Thing, Claim } from "models/types";
import { mutate } from "swr";

export const userResource = resourceFactory<User>("user", {
  postUpdate: () => {
    // user may have claimed a thing
    mutate("/api/v1/thing/list");
  },
});

export const thingResource = resourceFactory<Thing, Thing<true>>("thing");

export const claimResource = resourceFactory<Claim<true>>("claim");
