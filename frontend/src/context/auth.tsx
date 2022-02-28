import { createContext, useReducer, useContext, useEffect } from "react";
import { User } from "../types";

interface State {
  authenticated: boolean;
  user: User | undefined | null;
  loading: boolean;
}

interface Action {
  type: string;
  payload: any;
}

const StateContext = createContext<State>({
  authenticated: false,
  user: undefined,
  loading: true,
});

const DispatchContext = createContext(null);

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
  const [state, defaultDispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true,
  });

  const dispatch = (type: string, payload?: User) =>
    defaultDispatch({ type, payload });

  return (
    // value={dispatch}でvalueの下に赤いなみなみ線が出ます
    <DispatchContext.Provider value={dispatch}> 
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthDispatch = () => useContext(StateContext);
export const useDispatchState = () => useContext(DispatchContext);
