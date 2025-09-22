import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import SplitText from "../styles/SplitText ";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-96"
      >
        {/* <h2 className="text-2xl mb-4 font-bold">Register</h2> */}
        <SplitText
          text="Hello, Please Register"
          className="text-2xl font-semibold text-center mb-2"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 py-2 rounded font-semibold"
          disabled={loading}
        >
          {loading ? "Creating..." : "Register"}
        </button>
        <p className="mt-3 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
