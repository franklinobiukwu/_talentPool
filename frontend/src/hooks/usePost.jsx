import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query"

// API URL
const apiUrl = import.meta.env.VITE_API_URL

// Mutation Function
const postData = async ({ endpoint, data }) => {
    const response = await axios.post(`${apiUrl}/${endpoint}`, data)
    return response.data
}

const usePostData = (queryKey) => {
    const queryClient = useQueryClient()

    const { mutate, isLoading, isError, isSuccess, error } = useMutation({
        mutationFn: postData,
        onSuccess: (newData, variables) => {
            queryClient.setQueryData(queryKey, (oldData) => {
                if (!oldData) return { data: [newData] }
                return {...oldData, data: [...oldData.data, newData]}
            })
        }
    })

    const mutateWithEndpoint = (endpoint, data) => {
        mutate({endpoint, data})
    }

    return { mutate: mutateWithEndpoint, isLoading, isError, isSuccess, error }
}

export default usePostData
