import { ChakraProvider } from "@chakra-ui/react";
import { configureStore } from "@reduxjs/toolkit";
import type { AnyAction } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import notesReducer from "./reducers/notesReducer";
import uiReducer from "./reducers/uiReducer";
import type { RootState } from "./types";
import theme from "./theme";

export function renderWithProviders(
  ui: ReactElement,
  preloadedState?: Partial<RootState>
) {
  const store = configureStore({
    reducer: {
      notes: notesReducer as (state: RootState["notes"] | undefined, action: AnyAction) => RootState["notes"],
      ui: uiReducer as (state: RootState["ui"] | undefined, action: AnyAction) => RootState["ui"],
    },
    preloadedState: preloadedState as RootState | undefined,
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </Provider>
  );

  return {
    store,
    ...render(ui, { wrapper }),
  };
}
