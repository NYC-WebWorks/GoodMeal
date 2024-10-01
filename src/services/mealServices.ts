import { client } from "@/src/config/apiClient";
import {
  TGetAllAreasResponse,
  TGetAllCategoriesResponse,
  TGetRandomMealResponse,
} from "@/src/types/api";

async function getRandomMeal(): Promise<TGetRandomMealResponse> {
  const response = await client.get<TGetRandomMealResponse>("/random.php");

  // console.log("getRandomMeal", response.data);

  return response.data;
}

async function getAllAreas(): Promise<TGetAllAreasResponse> {
  const response = await client.get<TGetAllAreasResponse>("/list.php?a=list");

  // console.log("getAllAreas", response.data);

  return response.data;
}

async function getAllCategories(): Promise<TGetAllCategoriesResponse> {
  const response = await client.get<TGetAllCategoriesResponse>(
    "/categories.php"
  );

  // console.log("getAllCategories", response.data);

  return response.data;
}

export default {
  getRandomMeal,
  getAllAreas,
  getAllCategories,
};
