import axios from "axios";

import { getHeadersAndParams } from "../utils/common-utils";

export const getData = async (formData, jsonText, paramData, headerData) => {
  const apiType = formData.type.toLowerCase();
  const apiUrl = formData.url;
  const apiHeaders = getHeadersAndParams(headerData);
  const apiParams = getHeadersAndParams(paramData);

  try {
    const response = await axios({
      method: apiType,
      url: apiUrl,
      body: jsonText,
      headers: apiHeaders,
      params: apiParams,
    });

    await axios.post("http://localhost:5000/api/store-request", {
      method: apiType,
      url: apiUrl,
      responseData: JSON.stringify(response.data),
    });

    return response;
  } catch (error) {
    console.log("Error while getting the response ", error);
    return "error";
  }
};
