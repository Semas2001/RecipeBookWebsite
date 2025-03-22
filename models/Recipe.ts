import mongoose, { Document, Schema } from "mongoose";
import { Types } from "mongoose";
import { IngredientDocument } from "./Ingredients";




export interface RecipeDocument extends Document {
  title: string;
  des: string;
  ingredients: IngredientDocument[];
  instructions: string;
  category: string;
  imageUrl: string;
  user: Types.ObjectId;
}


const recipesSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  des: { type: String, required: true },
  ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
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
