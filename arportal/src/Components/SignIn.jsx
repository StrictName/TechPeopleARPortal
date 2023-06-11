import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Header from "./HeaderLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Response after Sign in
  const [submitResponse, setSubmitResponse] = useState("");

  let navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Firebase Auth method
  const submitSignIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Storing credentials to save log in
        const user = userCredential.user;
        localStorage.setItem("UI", user.uid);
        localStorage.setItem("DN", user.email);
        setSubmitResponse("Successful Sign In");

        toast.success(" Successful sign in", {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          return navigate("/home");
        }, 1500);
      })
      .catch((error) => {
        toast.error("Error on sign in", {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          progress: undefined,
          theme: "colored",
        });
        console.log(error);
        setSubmitResponse(error.message);
      });
  };

  return (
    <div>
      <Header />
      <ToastContainer
        position="top-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="flex flex-col py-8 bg-[#539ddb]  w-10/12 items-center mx-auto mt-20 border-2 rounded-md">
        <h1 className="md:text-4xl sm:text-3xl text-xl mb-5 text-[#f7f5f5]">
          Log In
        </h1>
        <input
          value={email}
          onChange={(e) => handleEmailChange(e)}
          placeholder="email"
          className="w-1/2 mb-5 h-8 p-2 border rounded self-center"
        />
        <input
          value={password}
          onChange={(e) => handlePasswordChange(e)}
          placeholder="password"
          type="password"
          className="w-1/2 mb-5 h-8 p-2 border rounded self-center"
        />
        <div className="flex gap-1">
          <p className="mb-5">New user? Create an account </p>
          <p
            className="font-bold underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            Sign Up
          </p>
        </div>
        <button
          onClick={() => submitSignIn()}
          className="bg-[#094B83] hover:bg-[#f7f5f5] text-white hover:text-[#094B83] font-bold md:text-base text-xs md:py-3 md:px-4 py-2 px-3 rounded self-center border-white"
        >
          {" "}
          Log In
        </button>
        {/* Success or failure message */}
        <p className="m-5  md:text-base text-xs p-5">{submitResponse}</p>
      </div>
    </div>
  );
};

export default SignIn;
