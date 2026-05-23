import { useState } from "react";
import axios from "axios";
import API_BASE from "../config";

export const useProductAutoFetch = () => {
  const [fetching, setFetching] = useState(false);

  const fetchProductDetails = async (url) => {
    if (!url) return null;

    try {
      setFetching(true);

      const { data } = await axios.post(
        `${API_BASE}/fetch-product`,
        { url }
      );

       return {
        productName: data.productName || "",
        imageUrl: Array.isArray(data.imageUrl)
          ? data.imageUrl[0]
          : data.imageUrl || "",
        currentPrice: data.currentPrice || "",
        originalPrice: data.originalPrice || "",
        rating: data.rating || "",
        reviewsCount: data.reviewsCount || "",
        discountPercent: data.discountPercent || "",
        platform: data.platform || "unknown",
      };
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      setFetching(false);
    }
  };

  return { fetchProductDetails, fetching };
};
