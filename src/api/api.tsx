import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts = async () => {
  try {
    const res: any = await api.get(`/posts?_start=0&_limit=3`);
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
