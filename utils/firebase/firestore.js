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

function deleteList(wishlistId) {
  return new Promise((resolve, reject) => {
    firestore
      .collection("wishlists")
      .doc(wishlistId)
      .delete()
      .then(() => resolve())
      .catch(error => reject(error));
  });
}

function addItemToWishlist(wishlistId, item) {
  return new Promise((resolve, reject) => {
    firestore.collection("items")
      .add(item)
      .then((docRef) => {
      const listRef = firestore.collection("wishlists").doc(wishlistId);
      listRef.update({
        items: firebase.firestore.FieldValue.arrayUnion({id: docRef.id, ...item}),
      })
        .then(() => {
          listRef.get().then((snapshot) => {
            resolve({ id: wishlistId, ...snapshot.data() })
          })
        })
        .catch((error) => reject(error));
    });
  })
}

function removeItemFromWishlist(wishlistId, itemId) {
  return new Promise((resolve, reject) => {
    if (wishlistId && itemId) {
      const docRef = firestore.collection("wishlists").doc(wishlistId);
      docRef.get().then(snapshot => {
        const { items } = snapshot.data();
        docRef.update({
          items: items.filter(item => item.id !== itemId)
        }).then(() => {
          resolve({success: true });
        }).catch(error => reject(error));
      }).catch(error => reject(error))
    } else {
      reject({success: false });
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
  deleteList,
  getWishlistsForUser,
  listenToWishlistChanges,
  addItemToWishlist,
  removeItemFromWishlist
};