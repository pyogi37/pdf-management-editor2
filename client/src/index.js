import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./Context/UserProvider";
import { PdfProvider } from "./Context/pdfContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserProvider>
      <PdfProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </PdfProvider>
    </UserProvider>
  </BrowserRouter>
);
