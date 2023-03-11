import mongoose from "mongoose";

export const PaintingSchema = new mongoose.Schema({
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
  collection: {
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
});

export const Painting = mongoose.model("painting", PaintingSchema, "paintings");
