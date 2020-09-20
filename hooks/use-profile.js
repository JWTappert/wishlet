import React, { useState, useEffect } from "react";
import {getUserProfile} from "utils/firebase/auth";

const useProfile = (uid) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProfile = async (uid) => {
    if (!uid) return;
    try {
      const userProfileDocument = await getUserProfile(uid);
      setProfile(userProfileDocument);
      setLoading(false);
    } catch(error) {
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    setError(null);
    setProfile(null);
    getProfile(uid);
  }, [uid]);

  return [profile, loading, error];
};

export default useProfile;
