import React from "react";
import { useRouter } from "next/router";

const useUid = () => {
  const router = useRouter();
  const { uid } = router.query;

  return uid;
};

export default useUid;
