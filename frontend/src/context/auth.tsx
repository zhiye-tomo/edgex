import { createContext, useReducer, useContext, useEffect } from "react";
import { User } from "../types";
import axios from "axios";

interface State {
  authenticated?: boolean;
  user: User | undefined | null;
  loading: boolean;
  jwt?: string;
}

interface Payload {
  user?: User;
  jwt?: string;
}

export interface Action {
  type: string;
  payload: Payload;
}

const initialValue = {
  user: null,
  authenticated: false,
  loading: true,
  jwt: "",
};

const StateContext = createContext<State>(initialValue);

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
  const [state, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    async function registerNewUser() {
      console.log("state.user", state.user);
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_HOST}/users`,
        state.user
      );

      dispatch({
        type: "LOGIN",
        payload: { jwt: res.data.jwt },
      });
    }
    if (!state.jwt) {
      registerNewUser();
    }
  });

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthDispatch = () => useContext(StateContext);
export const useDispatchState = () => useContext(DispatchContext);
