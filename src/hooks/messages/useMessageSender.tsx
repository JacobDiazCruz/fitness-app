import { uploadFiles } from "@/api/Exercise";
import { useMutation } from "react-query";

export default function useMessageSender() {
  // upload files to cloudinary request
  const uploadFilesMutation = useMutation(uploadFiles, {
    onSuccess: async (data) => {
      return data;
    },
    onError: (err) => {
      console.log(err);
    }
  });

  return {
    uploadFilesMutation
  }
};