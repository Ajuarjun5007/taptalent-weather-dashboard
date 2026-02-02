import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";
import { FcGoogle } from "react-icons/fc";

function GoogleSignIn() {
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      dispatch(
        setUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button className="google-btn" onClick={handleLogin}>
      <FcGoogle size={20} />
      <span>Continue with Google</span>
    </button>
  );
}

export default GoogleSignIn;
