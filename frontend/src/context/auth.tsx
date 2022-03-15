import { createContext, useReducer, useContext, useEffect } from "react";
import { User } from "../types";
import axios from "axios";

interface State {
  authenticated?: boolean;
  user: User | undefined | null;
  loading: boolean;
  jwt?: string;
}

export interface Action {
  type: string;
  payload: {
    user?: User;
    jwt?: string;
  };
}

const StateContext = createContext<State>({
  authenticated: false,
  user: undefined,
  loading: true,
  jwt: "",
});

const DispatchContext = createContext((() => true) as React.Dispatch<Action>);

const reducer: React.Reducer<State, Action> = (
  state: State,
  { type, payload }: Action
) => {
  switch (type) {
    case "OAUTH":
      return {
        user: payload.user,
        loading: true,
      };
    case "LOGIN":
      return {
        ...state,
        jwt: payload.jwt,
        authenticated: true,
      };
    case "LOGOUT":
      return { ...state, authenticated: false, user: null };
    default:
      throw new Error(`Unknown action type${type}`);
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true,
    jwt: "",
  });

  useEffect(() => {
    async function registerNewUser() {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_API_VERSION}/users`,
        state.user
      );
      dispatch({
        type: "LOGIN",
        payload: { jwt: res.data.jwt },
      });
    }
    registerNewUser();
  }, [state.authenticated]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthDispatch = () => useContext(StateContext);
export const useDispatchState = () => useContext(DispatchContext);
