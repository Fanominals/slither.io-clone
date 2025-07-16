// Use global Firebase object from CDN
declare global {
    interface Window {
        Firebase: {
            initializeApp: any;
            getAuth: any;
            getFirestore: any;
            GoogleAuthProvider: any;
            signInWithPopup: any;
            signOut: any;
            onAuthStateChanged: any;
            doc: any;
            setDoc: any;
            getDoc: any;
            updateDoc: any;
            deleteDoc: any;
        };
    }
}

const { 
    initializeApp, 
    getAuth, 
    getFirestore, 
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    deleteDoc
} = window.Firebase;

// Export Firebase functions
export { 
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    deleteDoc
};

// Firebase configuration
// You'll need to replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyA7NanmtoaDMsJVOxmkO22drCUoeVi-Xzc",
  authDomain: "slitherio-27b90.firebaseapp.com",
  projectId: "slitherio-27b90",
  storageBucket: "slitherio-27b90.firebasestorage.app",
  messagingSenderId: "865197739212",
  appId: "1:865197739212:web:47ac91d93337f7f2c10669",
  measurementId: "G-TSFJ7ME6QZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);

// Create Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app; 