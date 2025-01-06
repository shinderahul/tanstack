import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts = async (pageNumber: number) => {
  try {
    const res: any = await api.get(`/posts?_start=${pageNumber}&_limit=3`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};

export const fetchIndPost = async (id: number) => {
  try {
    const res: any = await api.get(`/posts?id=${id}`);
    return res.status === 200 ? res.data[0] : [];
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id: number) => {
  return api.delete(`/posts/${id}`);
};

export const updatePost = (id: number, title: string) => {
  return api.patch(`/posts/${id}`, { title });
};

type PageParamType = {
  pageParam?: number;
};

export const fetchUsers = async ({ pageParam = 1 }: PageParamType) => {
  try {
    const res = await axios.get(
      `https://api.github.com/users?per_page=10&page=${pageParam}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
