// models/Ingredient.js
import mongoose from 'mongoose';

export interface IngredientDocument extends Document {
    name: string;
    amount: string;
    unit: string;
  }

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true },
  unit: { type: String, required: true },
});

const Ingredient = mongoose.models.Ingredient || mongoose.model('Ingredient', ingredientSchema);

export default Ingredient;
