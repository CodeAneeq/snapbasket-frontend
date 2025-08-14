import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import baseURL from '../../services/baseURL';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/features/user-slice';
import { useNavigate } from 'react-router-dom';

function GoogleLoginButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        const idToken = credentialResponse.credential; // JWT ID token
        let res = await axios.post(`${baseURL}/auth/api/google`, { token: idToken });
        console.log(res);
        if (res.status == 200) {                        
            dispatch(addUser(res.data));
            navigate('/')
        }
        
      }}
      onError={() => console.log('Login Failed')}
    />
  );
}

export default GoogleLoginButton
