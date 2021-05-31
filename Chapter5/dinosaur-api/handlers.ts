// handlers.ts

import { RouterContext } from "./deps.ts";
import { dinosaurCollection } from "./db.ts";

const showWelcome = async (ctx: RouterContext) => {
  ctx.response.body = { message: "Welcome to the Dinosaur API" };
  ctx.response.status = 200;
};

const getDinosaurs = async (ctx: RouterContext) => {
  const dinosaurs = await dinosaurCollection.find();

  ctx.response.body = dinosaurs;
  ctx.response.status = 200;
};

const addDinosaur = async (ctx: RouterContext) => {
  if (!ctx.request.hasBody) {
    ctx.response.body = { message: "No data" };
    ctx.response.status = 400;
    return;
  }

  const { name, epoch, habitat } = await ctx.request.body().value;
  const result = await dinosaurCollection.insertOne({
    name,
    epoch,
    habitat,
  });
  ctx.response.status = 201;
  ctx.response.body = { message: `Added dinosaur with ID: ${result.$oid}` };
};

const getDinosaur = async (ctx: RouterContext) => {
  const id = ctx.params.id;

  const dinosaur = await dinosaurCollection.findOne({
    _id: {
      $oid: `${id}`,
    },
  });

  if (!dinosaur) {
    ctx.response.body = { message: "Dinosaur not found" };
    ctx.response.status = 404;
    return;
  }
  ctx.response.body = dinosaur;
  ctx.response.status = 200;
};

const updateDinosaur = async (ctx: RouterContext) => {
  const id = ctx.params.id;

  if (!ctx.request.hasBody) {
    ctx.response.body = { message: "No data" };
    ctx.response.status = 400;
    return;
  }

  const { name, epoch, habitat } = await ctx.request.body().value;
  const { modifiedCount } = await dinosaurCollection.updateOne({
    _id: {
      $oid: `${id}`,
    },
  }, { $set: { name, epoch, habitat } });

  if (!modifiedCount) {
    ctx.response.body = { message: "Dinosaur not found" };
    ctx.response.status = 404;
    return;
  }
  ctx.response.body = { message: "Dinosaur updated" };
  ctx.response.status = 200;
};

const deleteDinosaur = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const deleteCount = await dinosaurCollection.deleteOne({
    _id: {
      $oid: `${id}`,
    },
  });

  if (!deleteCount) {
    ctx.response.body = { message: "Dinosaur not found" };
    ctx.response.status = 404;
    return;
  }
  ctx.response.body = { message: "Dinosaur deleted" };
  ctx.response.status = 200;
};

export {
  addDinosaur,
  deleteDinosaur,
  getDinosaur,
  getDinosaurs,
  showWelcome,
  updateDinosaur,
};
