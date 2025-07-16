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
        Solana: {
            Connection: any;
            PublicKey: any;
            LAMPORTS_PER_SOL: number;
        };
    }
}
declare const signInWithPopup: any, signOut: any, onAuthStateChanged: any, doc: any, setDoc: any, getDoc: any, updateDoc: any, deleteDoc: any;
export { signInWithPopup, signOut, onAuthStateChanged, doc, setDoc, getDoc, updateDoc, deleteDoc };
declare const app: any;
export declare const auth: any;
export declare const db: any;
export declare const googleProvider: any;
export default app;
