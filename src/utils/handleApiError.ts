import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import type { ApiResponse } from "@/types";

interface ValidationErrorBody {
  errors: Array<{ field?: string; message: string }>;
}

export const handleApiError = (
  error: unknown,
  fallbackMessage = "An unexpected error occurred",
) => {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<ApiResponse>;

    if (err.response && err.response.data) {
      const { data } = err.response;

      if (
        data.message === "Validation Error" &&
        data.body &&
        typeof data.body === "object" &&
        "errors" in data.body &&
        Array.isArray((data.body as ValidationErrorBody).errors)
      ) {
        const validationMessages = (data.body as ValidationErrorBody).errors
          .map((e) => `${e.field ? e.field + ": " : ""}${e.message}`)
          .join(" | ");

        toast.error(validationMessages);
        return;
      }

      if (data.message) {
        toast.error(data.message);
        return;
      }
    }

    if (err.message === "Network Error") {
      toast.error("Network error. Please check your internet connection.");
      return;
    }

    toast.error(err.message || fallbackMessage);
    return;
  }

  if (error instanceof Error) {
    toast.error(error.message);
    return;
  }

  toast.error(fallbackMessage);
};
