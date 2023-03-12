import { Schema, model } from "mongoose";

export const PaintingSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  gallery: {
    type: String,
    required: true,
  },
  technique: {
    type: String,
  },
  size: {
    type: String,
  },
  medium: {
    type: String,
  },
  materials: {
    type: String,
  },
  unique: {
    type: Boolean,
    required: true,
  },
  certificate: {
    type: Boolean,
  },
  rarity: {
    type: String,
  },
  condition: {
    type: String,
  },
  signature: {
    type: Boolean,
  },
  price: {
    type: Number,
  },
  frame: {
    type: Boolean,
  },
  highlightOrder: {
    type: Number,
  },
  summary: {
    type: String,
  },
  image: {
    type: String,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
});

export const Painting = model("painting", PaintingSchema, "paintings");
