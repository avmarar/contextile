import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import theme from "./theme";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container missing in index.html");
}

createRoot(container).render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </Provider>
);
