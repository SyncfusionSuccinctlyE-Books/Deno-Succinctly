// schema.ts

interface DinosaurSchema {
  _id: { $oid: string };
  name: string;
  epoch: string;
  habitat: string;
}

export default DinosaurSchema;
