import resourceFactory from "./resourceFactory";
import { User, Thing, Claim } from "models/types";
import { mutate } from "swr";

export const userResource = resourceFactory<User>("user", {
  postUpdate: () => {
    // user may have claimed a thing, need to invalidate cache
    mutate("/api/v1/thing/list");
  },
});

export const thingResource = resourceFactory<Thing, Thing<true>>("thing", {
  postCreate: ({ namespace }) => {
    // need to invalidate cache specifically for namespace
    mutate(`/api/v1/thing/list?namespace=${namespace}`);
  },
});

export const claimResource = resourceFactory<Claim<true>>("claim");
