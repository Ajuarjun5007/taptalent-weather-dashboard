import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { logoutUser } from '../../features/auth/authSlice';
import { IoLogOut } from 'react-icons/io5';
import './SignOutButton.css';

function SignOutButton() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logoutUser());
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <button className="signout-btn" onClick={handleLogout}>
      <IoLogOut size={18} />
      <span>Sign Out</span>
    </button>
  );
}

export default SignOutButton;
