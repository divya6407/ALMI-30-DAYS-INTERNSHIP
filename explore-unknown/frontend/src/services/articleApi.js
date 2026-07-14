import axios from "axios";

const api = axios.create({ baseURL: "/api" });

export async function searchArticle(topic, category) {
  const { data } = await api.get("/articles/search", { params: { topic, category } });
  return data.article;
}

export async function getRandomArticle() {
  const { data } = await api.get("/articles/random");
  return data.article;
}

export async function getArticleBySlug(slug) {
  const { data } = await api.get(`/articles/${slug}`);
  return data.article;
}

export async function getArticlesByCategory(category) {
  const { data } = await api.get(`/articles/category/${encodeURIComponent(category)}`);
  return data.articles;
}
