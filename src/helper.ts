import { enqueueSnackbar } from "notistack";

export const getRelativeTime = (dateString: string): string => {
  return "";
};

type SelectType = { value: string; label: string };
type InputData = string[] | { idx: string; name: string }[];

export const convertToValueLabel = (data: InputData): SelectType[] => {
  if (data.length > 0 && typeof data[0] === "string") {
    return (data as string[]).map((item) => ({
      value: item,
      label: item,
    }));
  } else if (data.length > 0 && typeof data[0] === "object") {
    return (data as { idx: string; name: string }[]).map((item) => ({
      value: item.idx,
      label: item.name,
    }));
  }
  return [];
};

export const handleUnknownError = (errorResponse: {
  [key: string]: string | string[];
}) => {
  if (typeof errorResponse === "object" && errorResponse) {
    Object.entries(errorResponse).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((message: string) =>
          enqueueSnackbar(` ${key}: ${message}`, { variant: "error" }),
        );
      } else if (typeof value === "string") {
        enqueueSnackbar(` ${key}: ${value}`, { variant: "error" });
      }
    });
  } else if (typeof errorResponse === "string") {
    enqueueSnackbar(errorResponse, { variant: "error" });
  } else {
    enqueueSnackbar("An unexpected error occurred. Please try again.", {
      variant: "error",
    });
  }
};
