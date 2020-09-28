import {firebase, firestore} from "./index";

function addList(uid, name) {
  return new Promise((resolve, reject) => {
    firestore
      .collection("wishlists")
      .add({
        uid: uid,
        name: name,
        items: [],
      })
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}

function addItemToWishlist(wishlistId, item) {
  return new Promise((resolve, reject) => {
    const itemId = firestore.collection("temp").doc().id;
    const listRef = firestore.collection("wishlists").doc(wishlistId);
      listRef.update({
        items: firebase.firestore.FieldValue.arrayUnion({id: itemId, ...item}),
      })
      .then(() => {
        listRef.get().then((snapshot) => {
          resolve({ id: wishlistId, ...snapshot.data() })
        })
      })
      .catch((error) => reject(error));
  });
}

function removeItemFromWishlist(wishlistId, itemId) {
  return new Promise((resolve, reject) => {
    if (wishlistId && itemId) {
      resolve({success: true });
    } else {
      reject({success: true });
    }
  });
}

function getWishlistsForUser(uid) {
  return new Promise((resolve, reject) => {
    firestore
      .collection("wishlists")
      .where("uid", "==", uid)
      .get()
      .then((querySnapshot) => {
        const wishlists = [];
        querySnapshot.forEach((doc) => wishlists.push({id: doc.id, ...doc.data()}));
        resolve(wishlists);
      })
      .catch((error) => reject(error));
  });
}

function listenToWishlistChanges(wishlistId, onNext, onError) {
  if (!wishlistId) return;
  return firestore
    .collection("wishlists")
    .doc(wishlistId)
    .onSnapshot(
      (snapshot) => onNext({ id: wishlistId, ...snapshot.data() }),
      (error) => onError(error)
    );
}

export {
  addList,
  getWishlistsForUser,
  listenToWishlistChanges,
  addItemToWishlist,
  removeItemFromWishlist
};