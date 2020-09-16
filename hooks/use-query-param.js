import React from "react";
import { useRouter } from "next/router";

const useQueryParam = (key) => {
  const router = useRouter();
  return router.query[key];
};

export default useQueryParam;
