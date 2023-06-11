import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

// All the attributes need to be filled for integretion with Firebase to work
const firebaseConfig = {
  type: "",
  projectId: "",
  private_key_id: "",
  private_key: "",
  client_email: "",
  client_id: "",
  auth_uri: "",
  token_uri: "",
  auth_provider_x509_cert_url: "",
  client_x509_cert_url: "",
  universe_domain: "",
  apiKey: "",
  authDomain: "",
};

const app = initializeApp(firebaseConfig);

// Database instance that is exported
const db = getFirestore(app);

// Auth instance that is exported
const provider = new GoogleAuthProvider();

firebaseConfig.db = db;
firebaseConfig.provider = provider;

export default firebaseConfig;
