import { claimResource, thingResource } from ".";

const claimThing = async (thing: string, userId: string) => {
  const { _id: claim } = await claimResource.create({
    thing,
    user: userId,
  });

  await thingResource.update(thing, {
    claimed: claim,
    claimedBy: userId,
  });
};

export default claimThing;
