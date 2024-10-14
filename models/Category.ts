import mongoose, { Document, Schema } from "mongoose";

export interface Category extends Document {
  name: string;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
});

const CategoryModel = mongoose.models.Category || mongoose.model<Category>("Category", CategorySchema);
export default CategoryModel;
