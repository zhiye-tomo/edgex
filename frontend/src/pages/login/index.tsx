import { FunctionComponent, useState } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { useAuthDispatch, useDispatchState } from "../../context/auth";

const GoogleSignInComponent: FunctionComponent = () => {
  const [loginFailed, setLoginFailed] = useState<boolean>();
  const { authenticated, loading, user } = useAuthDispatch();
  const dispatch = useDispatchState();

  const onLoginSuccess = async (
    res: GoogleLoginResponseOffline | GoogleLoginResponse
  ) => {
    if ("profileObj" in res) {
      const profileObj = res.profileObj;

      dispatch({
        type: "LOGIN",
        payload: {
          email: profileObj.email,
          firstName: profileObj.givenName,
          lastName: profileObj.familyName,
        },
      });

      console.log("user", user);
    }
  };

  const login = async () => {
    dispatch({
      type: "LOGIN",
      payload: {
        email: "tomo@test.com",
        firstName: "firstName",
        lastName: "lastName",
      },
    });
  };

  const logCat = () => {
    console.log(
      `${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_API_VERSION}/users`
    );
  };

  return (
    <div>
      <h1>Welcome to Edge</h1>
      {loginFailed && <h3>Could not sign you in! Try again.</h3>}
      <GoogleLogin
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE}`}
        buttonText="Sign in with Google"
        onSuccess={onLoginSuccess}
        onFailure={(error) => {
          console.log(error);
          setLoginFailed(true);
        }}
        cookiePolicy={"single_host_origin"}
        responseType="code,token"
      />
      <button onClick={login}>Login</button>
      <button onClick={logCat}>LogCat</button>
    </div>
  );
};

export default GoogleSignInComponent;
