import mongoose, { Document, Schema } from "mongoose";

export interface recipes extends Document{
  id: number,
  title: string;
  des: string;
  ingredients:  string[];
  instructions: string;
  category: string;
  imageUrl: string;

}

const recipesSchema:Schema = new mongoose.Schema({
  id: {type: Number},
  title: { type: String, required:true },
  des: { type: String, required:true },
  ingredients: { type: Array, of: String, required:true},
  instructions: { type: String, required:true },
  category:  { type: String, required:true},
  imageUrl:{type: String},
},{collection: 'Recipe'});

const  Recipe = mongoose.models.Recipe || mongoose.model<recipes>('Recipe', recipesSchema);

export default Recipe; 