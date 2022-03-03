import { createContext, useReducer, useContext, useEffect } from "react";
import { User } from "../types";
import axios from "axios";

interface State {
  authenticated: boolean;
  user: User | undefined | null;
  loading: boolean;
}

export interface Action {
  type: string;
  payload: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

const StateContext = createContext<State>({
  authenticated: false,
  user: undefined,
  loading: true,
});

const DispatchContext = createContext((() => true) as React.Dispatch<Action>);

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        authenticated: true,
        user: payload,
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
  });

  useEffect(() => {
    async function registerNewUser() {
      axios.put(
        `${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_API_VERSION}/users`,
        state.user
      );
    }
    registerNewUser();
  }, [state.user]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthDispatch = () => useContext(StateContext);
export const useDispatchState = () => useContext(DispatchContext);
