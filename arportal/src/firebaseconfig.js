import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  type: "service_account",
  projectId: "techpeoplear",
  private_key_id: "",
  private_key: "",
  client_email: "firebase-adminsdk-fj2bh@techpeoplear.iam.gserviceaccount.com",
  client_id: "",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:""
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
firebaseConfig.db = db;

export default firebaseConfig;