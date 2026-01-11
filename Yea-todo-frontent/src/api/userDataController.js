import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiService } from "./axios";

// login
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiService.post(
        `/user/auth`,
        payload
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("userData");
    },
    retry: 0,
  });
};

// add task
export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiService.post(
        `/user/add-task`,
        payload
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getTasks");
    },
    retry: 0,
  });
};



export const useGetTasks = (page, limit, search,status,group,priority) => {
  return useQuery({
    queryKey: ['getTasks', page, limit, search, status, group, priority],

    queryFn: async () => {
      return await apiService.get(`/user/get-tasks?page=${page}&limit=${limit}&search=${search}&status=${status}&group=${group}&priority=${priority}`);
    },
    retry: 0,
  })
}


export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id) => {
      return await apiService.delete(`/user/delete-task/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getTasks']);
    },
    retry: 0,
  })
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }) => {
      return await apiService.put(`/user/update-task/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getTasks']);
    },
    retry: 0,
  })
}