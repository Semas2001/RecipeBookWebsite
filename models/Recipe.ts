import mongoose, { Document, Schema } from "mongoose";
import { UserDocument } from "./Users";

export interface RecipeDocument extends Document {
  title: string;
  des: string;
  ingredients: string[];
  instructions: string;
  category: string;
  imageUrl: string;
  user: mongoose.Types.ObjectId | UserDocument;
}

const recipesSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  des: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, 
{ 
  timestamps: true,
  collection: 'Recipe',
  versionKey: false
  
});
recipesSchema.index({ title: 1, category: 1, user: 1 });

const Recipe = mongoose.models.Recipe || mongoose.model<RecipeDocument>('Recipe', recipesSchema);

export default Recipe;
