import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Header from "./HeaderLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Response after sign up
  const [submitResponse, setSubmitResponse] = useState("");

  let navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const submitSignUp = () => {
    // Firebase Auth method
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Information extracted from Firebase profile
        // Email chosen because not all users have display_name
        localStorage.setItem("UI", user.uid);
        localStorage.setItem("DN", user.email);
        setSubmitResponse("Successful Sign Up");

        toast.success(" Successful sign up", {
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
        toast.error("Error on sign up", {
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
          Sign Up
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
          <p className="mb-5">Already a member? </p>
          <p
            className="font-bold underline cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Log in
          </p>
        </div>

        <button
          onClick={() => submitSignUp()}
          className="bg-[#094B83] hover:bg-[#f7f5f5] text-white hover:text-[#094B83] font-bold md:text-base text-xs md:py-3 md:px-4 py-2 px-3 rounded self-center border-white"
        >
          {" "}
          Register
        </button>
        {/* Success or failure message */}
        <p className="m-5  md:text-base text-xs p-5  ">{submitResponse}</p>
      </div>
    </div>
  );
};

export default SignUp;
