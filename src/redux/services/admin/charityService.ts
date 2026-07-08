import {
  ICreateCharityPayload,
  IUpdateCharityPayload,
} from "@/src/types/adminCharityTypes";

export const charityPayloadToFormData = (
  payload: ICreateCharityPayload | IUpdateCharityPayload,
): FormData => {
  const formData = new FormData();

  formData.append("charity_name", payload.charity_name.trim());
  formData.append("country", payload.country);
  formData.append("url", payload.url.trim());

  if (payload.logo instanceof File) {
    formData.append("logo", payload.logo);
  }

  return formData;
};
