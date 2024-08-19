import api from "api/axios";

const usePost = () => {
  const postData = async (endpoint, body) => {
    try {
      const res = await api.post(endpoint, body);

      if (res.data.code === 0) {
        return { isSuccess: true, isLoading: true, data: res.data.result };
      }
    } catch (error) {}
  };

  return { postData };
};

export default usePost;
