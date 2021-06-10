import resourceFactory from "./resourceFactory";
import { User, Thing, Claim } from "models/types";
import { mutate } from "swr";
import socket from "websocket/client-socket";

export const userResource = resourceFactory<User>("user", {
  postUpdate: () => {
    // user may have claimed a thing, need to invalidate cache
    mutate("/api/v1/thing/list");

    // signal sockets to refresh Thing lists across any namespace where
    // this user has claimed a Thing
    socket.emit("user update");
  },
});

// path name is the namespace
const namespace = typeof window !== "undefined" && window.location.pathname;

const emitThingUpdate = ({ _id: thingId }: Thing) => {
  // signal sockets to refresh Things in this namespace
  socket.emit("thing update", thingId);
};

export const thingResource = resourceFactory<Thing, Thing<true>>("thing", {
  listView: `/api/v1/thing/list?namespace=${namespace}`,
  postUpdate: emitThingUpdate,
  postCreate: emitThingUpdate,
});

export const claimResource = resourceFactory<Claim<true>>("claim");
