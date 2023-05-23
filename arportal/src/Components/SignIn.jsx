import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitResponse, setSubmitResponse] = useState("");
  let navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const submitSignIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("UI", user.uid);
        localStorage.setItem("DN", user.email);
        setSubmitResponse("Successful Sign In");
        console.log(user);
        setTimeout(() => {
          return navigate("/home");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        setSubmitResponse(error.message);
      });
  };

  return (
    <div>
      <input
        value={email}
        onChange={(e) => handleEmailChange(e)}
        placeholder="email"
      />
      <input
        value={password}
        onChange={(e) => handlePasswordChange(e)}
        placeholder="password"
        type="password"
      />
      <button onClick={() => submitSignIn()}> Sign In</button>
      {/* Success or failure message */}

      <p>{submitResponse}</p>
    </div>
  );
};

export default SignIn;
