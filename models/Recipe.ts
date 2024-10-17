import mongoose, { Document, Schema } from "mongoose";

export interface RecipeDocument extends Document {
  title: string;
  des: string;
  ingredients: string[];
  instructions: string;
  category: string;
  imageUrl: string;
}

const recipesSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  des: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
}, { 
  timestamps: true,
  collection: 'Recipe',
  versionKey: false
  
});

const Recipe = mongoose.models.Recipe || mongoose.model<RecipeDocument>('Recipe', recipesSchema);

export default Recipe;
