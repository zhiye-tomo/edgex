import { FunctionComponent, useState } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { useDispatchState } from "../../context/auth";
import { useRouter } from "next/router";

type Res = GoogleLoginResponseOffline | GoogleLoginResponse;
const GoogleSignInComponent: FunctionComponent = () => {
  const [loginFailed, setLoginFailed] = useState<boolean>();
  const dispatch = useDispatchState();
  const router = useRouter();

  const onLoginSuccess = async (res: Res) => {
    if ("profileObj" in res) {
      const profile = res.profileObj;
      dispatch({
        type: "OAUTH",
        payload: {
          user: {
            email: profile.email,
            firstName: profile.givenName,
            lastName: profile.familyName,
          },
        },
      });
      router.push("/");
    }
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
    </div>
  );
};

export default GoogleSignInComponent;
