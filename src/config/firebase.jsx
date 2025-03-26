import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC4ZcLbqrjrEDDlmMqWiuh5ljxBJ9tcc4U",
    authDomain: "wega-tetebatu.firebaseapp.com",
    projectId: "wega-tetebatu",
    storageBucket: "wega-tetebatu.firebasestorage.app",
    messagingSenderId: "1092096715180",
    appId: "1:1092096715180:web:c111d1a8e998906660b209",
    measurementId: "G-4R767F4DNV"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };