import { TCategory, TMeal, TMealArea } from "./meal";

export type TGetRandomMealResponse = {
  meals: TMeal[];
};

export type TGetAllAreasResponse = {
  meals: TMealArea[];
};

export type TGetAllCategoriesResponse = {
  categories: TCategory[];
};
