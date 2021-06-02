import resourceFactory from "./resourceFactory";
import { User, Thing, Claim } from "models/types";
import { mutate } from "swr";

export const userResource = resourceFactory<User>("user", {
  postUpdate: () => {
    // user may have claimed a thing, need to invalidate cache
    mutate("/api/v1/thing/list");
  },
});

// path name is the namespace
const namespace = typeof window !== "undefined" && window.location.pathname;

export const thingResource = resourceFactory<Thing, Thing<true>>("thing", {
  listView: `/api/v1/thing/list?namespace=${namespace}`,
});

export const claimResource = resourceFactory<Claim<true>>("claim");
