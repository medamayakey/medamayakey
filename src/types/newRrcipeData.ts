import { Ingredient } from './recipe';

interface NewIngredient
  extends Omit<
    Ingredient,
    | 'localizedName'
    | 'image'
    | 'original'
    | 'originalName'
    | 'amount'
    | 'unit'
    | 'meta'
    | 'measures'
  > {}

// interface Ingredient {
//   id: number;
//   name: string;
//   localizedName: string;
//   image: string;
//   original: string;
//   originalName: string;
//   amount: number;
//   unit: string;
//   meta: string[];
//   measures: {
//     us: Measure;
//     metric: Measure;
//   };
// }

export default interface NewRrcipeData {
  id: string | number;
  title: string;
  image: string;
  summary: string;
  ingredients: NewIngredient[];
}
