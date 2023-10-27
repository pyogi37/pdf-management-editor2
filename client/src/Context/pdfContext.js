import React, { createContext, useContext, useState } from "react";

const PdfContext = createContext();

export const usePdfContext = () => {
  return useContext(PdfContext);
};

export const PdfProvider = ({ children }) => {
  const [pdfs, setPdfs] = useState([]);

  const updatePdfs = (newPdf) => {
    setPdfs([...pdfs, newPdf]);
  };

  return (
    <PdfContext.Provider value={{ pdfs, setPdfs, updatePdfs }}>
      {children}
    </PdfContext.Provider>
  );
};
