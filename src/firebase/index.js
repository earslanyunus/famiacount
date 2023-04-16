import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import {
  collection,
  addDoc,
  setDoc,
  getFirestore,
  doc,
  query,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import store from "../redux/store";
import { setLogin, setUser } from "../redux/stores/user";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signupWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const { displayName, email, photoURL, uid } = user;
    //create user collection then add user doc to it
    await setDoc(doc(db, "users", uid), {
      displayName,
      email,
      photoURL,
      uid,
    });

    return user;
  } catch (e) {
    throw e;
  }
};

const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (e) {
    throw e;
  }
};

const signOut = async () => {
  try {
    await auth.signOut();
    store.dispatch(setLogin(false));
    store.dispatch(setUser(null));
  } catch (e) {
    throw e;
  }
};
onAuthStateChanged(auth, (user) => {
  if (user) {
    const { displayName, email, photoURL, uid } = user;
    store.dispatch(setLogin(true));
    store.dispatch(setUser({ displayName, email, photoURL, uid }));
  } else {
    console.log("user is signed out");
  }
});

const getPlatformsInfo = async () => {
  try {
    const platformsRef = await getDocs(collection(db, "platforms"));

    const platforms = [];

    platformsRef.forEach((doc) => {
      platforms.push(doc.data());
    });
    return platforms;
  } catch (e) {
    throw e;
  }
};
const createSubscriptionOwner = async (data) => {
  try {
    const subscriptionOwnerRef = await addDoc(
      collection(db, "subscriptions"),
      data
    );
    await updateDoc(doc(db, "subscriptions", subscriptionOwnerRef.id), {
      id: subscriptionOwnerRef.id,
    });

    const userRef = doc(db, "users", data.owner);
    const userSubscriptionsRef = collection(userRef, "subscriptions");
    await setDoc(doc(userSubscriptionsRef, subscriptionOwnerRef.id), {
      id: subscriptionOwnerRef.id,
    });
  } catch (e) {
    throw e;
  }
};
const getSubscriptionsData = async () => {
  try {
    const subscriptionsRef = await getDocs(collection(db, "subscriptions"));
    const subscriptions = [];
    subscriptionsRef.forEach((doc) => {
      subscriptions.push(doc.data());
    });
    return subscriptions;
  } catch (e) {
    throw e;
  }
};

const acceptSub = async (data) => {
    try {
        const userRef = doc(db, "users", data.senderId);
        const userSubscriptionsRef = collection(userRef, "subscriptions");
        await setDoc(doc(userSubscriptionsRef, data.subscriptionId), {
          id: data.subscriptionId
        });
        const subscriptionRef = doc(db, "subscriptions", data.subscriptionId);
        const subscriptionUsersRef = collection(subscriptionRef, "users");
        await setDoc(doc(subscriptionUsersRef, data.senderId), {});
        await updateDoc(doc(db, "users", data.ownerId, "notifications", data.id,), {
         "data.isVerified": true
        });
    } catch (e) {
        throw e;
    }
}
const sendJoinRequest = async (data) => {
  try {
    const usersRef = doc(db, "users", data.ownerId);
    const userRequestsRef = collection(usersRef, "notifications");
    const notificationsRef = await addDoc(userRequestsRef, { data });
    await updateDoc(
      doc(db, "users", data.ownerId, "notifications", notificationsRef.id),
      { id: notificationsRef.id }
    );
  } catch (e) {
    throw e;
  }
};
const getNotifications = async (uid) => {
  try{
  const userRef = doc(db, "users", uid);
  const userNotificationsRef = collection(userRef, "notifications");
  const notificationsRef = await getDocs(userNotificationsRef);
  const notifications = [];
  notificationsRef.forEach((doc) => {
    notifications.push(doc.data());
  })
  return notifications;

}catch(e){
    throw e;

  }
}

const findUser = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      return null;
    }
  } catch (e) {
    throw e;
  }
};
const getSubscriptionFromUser = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSubscriptionsRef = collection(userRef, "subscriptions");
    const subscriptionsRef = await getDocs(userSubscriptionsRef);
    const subscriptions = [];
    subscriptionsRef.forEach((doc) => {
      subscriptions.push(doc.data());
    });
    return subscriptions;
  } catch (e) {
    throw e;
  }
};
const getSubscriptionWithId = async (id) => {
  try {
    const subscriptionRef = doc(db, "subscriptions", id);
    const subscriptionDoc = await getDoc(subscriptionRef);
    // get users
    const subscriptionUsersRef = collection(subscriptionRef, "users");
    const usersRef = await getDocs(subscriptionUsersRef);
    
    const users = [];
    const usersDetail =[]

     if (subscriptionDoc.exists()) {
      usersRef.forEach((doc) => {
         users.push(doc.data());

       });
      if(users.length >0){
        users.forEach(async (user) => {
          
          
          const userRef = doc(db, "users", user.user);
          const userDoc = await getDoc(userRef);
          usersDetail.push(userDoc.data());

          
        });
        
      }
      
         


      const data = [subscriptionDoc.data(), usersDetail,users];
      return data;
    } else {
      return null;
    }
  } catch (e) {
    throw e;
  }
};

const getSubscriptionUsers = async (id) => {
  try {
    const subscriptionRef = doc(db, "subscriptions", id);
    const subscriptionUsersRef = collection(subscriptionRef, "users");
    const usersRef = await getDocs(subscriptionUsersRef);
    const users = [];
    usersRef.forEach((doc) => {
      users.push(doc.data());
    });
    return users;
  } catch (e) {
    throw e;
  }
}
const confirmPayment = async (data) => {
  try {
    console.log('confirm calisti');
    const subscriptionRef = doc(db, "subscriptions", data.subscriptionId);
    const subscriptionUsersRef = collection(subscriptionRef, "users", )
    const userRef = doc(subscriptionUsersRef, data.userId)
    await updateDoc(userRef, {
      isPayed: true,
      date: new Date().toISOString()
    });
  } catch (e) {
    throw e;
  }
}
    
    
export {
  signupWithGoogle,
  signInWithGoogle,
  signOut,
  getPlatformsInfo,
  createSubscriptionOwner,
  getSubscriptionsData,
  sendJoinRequest,
  acceptSub,
  getNotifications,
  findUser,
  getSubscriptionFromUser,
  getSubscriptionWithId,
  getSubscriptionUsers,
  confirmPayment
};
