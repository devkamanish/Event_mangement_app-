import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import SplitText from "../styles/SplitText ";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, status, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(signin({ email, password }));
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <form
          onSubmit={handleLogin}
          className="bg-gray-800 p-8 rounded-xl shadow-lg w-96 "
        >
          <SplitText
            text="Hello, Please Login"
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
          {/* <h2 className="text-2xl mb-4 font-bold">Login</h2> */}
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
            className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded font-semibold"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
          <p className="mt-3 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-400">
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
