import mongoose, { Document, Schema } from "mongoose";

export interface categories extends Document{
  id: number,
  name:  string,
}

const categoriesSchema:Schema = new mongoose.Schema({
  id: {type: Number},
  name: {type: String},
},{collection: 'Categories'});

const  Category = mongoose.models.Category || mongoose.model<categories>('Category', categoriesSchema);

export default Category; 