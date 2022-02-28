import { FunctionComponent, useState, useEffect } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { useRouter } from "next/router";
import { useAuthDispatch } from "../../context/auth";

const GoogleSignInComponent: FunctionComponent = () => {
  const [loginFailed, setLoginFailed] = useState<boolean>();
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const dispatch = useAuthDispatch();
  const router = useRouter();

  const onLoginSuccess = (
    res: GoogleLoginResponseOffline | GoogleLoginResponse
  ) => {
    if ("profileObj" in res) {
      setEmail(res.profileObj.email);
      setFirstName(res.profileObj.givenName);
      setLastName(res.profileObj.familyName);
      dispatch("LOGIN", { email, firstName, lastName };
    }

    console.log(email);
    console.log(firstName);
    console.log(lastName);

    // router.replace("/redirect_page_url");
  };

  useEffect(() => {
    console.log(email);
    console.log(firstName);
    console.log(lastName);
  }, [email, firstName, lastName]);

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
