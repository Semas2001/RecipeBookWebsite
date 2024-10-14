import mongoose, { Document, Schema } from "mongoose";

export interface Recipe extends Document {
  title: string;
  ingredients: string[];
  instructions: string;
  categoryId: string;
  imageUrl: string;
}

const RecipeSchema: Schema = new Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  imageUrl: { type: String, required: true },
});

const RecipeModel = mongoose.models.Recipe || mongoose.model<Recipe>("Recipe", RecipeSchema);
export default RecipeModel;
