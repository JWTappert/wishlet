import React, { useState, useEffect } from "react";
import firebase from "utils/firebase";

const useProfile = (uid) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProfile = (uid) => {
    if (!uid) return;
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setProfile({ uid: snapshot.id, ...snapshot.data() });
          setLoading(false);
        } else {
          setProfile(null);
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    setProfile(null);
    getProfile(uid);
  }, [uid]);

  return [profile, loading, error];
};

export default useProfile;
