import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Center,
  Select, // Import Select component from Chakra UI
} from "@chakra-ui/react";
// import { Document, Page, pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url
// ).toString();

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFModal = ({
  isOpen,
  onClose,
  pdfData,
  onDownload,
  onPageSelection,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]); // State to store selected pages

  const handleDownload = () => {
    // Send the selected pages to the parent component for download
    console.log(selectedPages);
    onDownload(selectedPages);
  };

  const reset = () => {
    setSelectedPages([]);
  };

  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const pageOptions = Array.from({ length: numPages }, (_, i) => {
    const orderNumber = selectedPages.indexOf(i + 1) + 1;
    return {
      value: i + 1,
      label: `Page ${i + 1}:  ${orderNumber}`,
    };
  });

  useEffect(() => {
    onPageSelection(selectedPages);
  }, [selectedPages, onPageSelection]);

  const handlePageChange = (e) => {
    const selectedPage = Number(e.target.value);
    setSelectedPages((prevSelectedPages) => {
      if (prevSelectedPages.includes(selectedPage)) {
        // Remove the page from selection
        return prevSelectedPages.filter((page) => page !== selectedPage);
      } else {
        // Add the page to selection
        return [...prevSelectedPages, selectedPage];
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">PDF Viewer</ModalHeader>
        <ModalBody>
          <Document
            file={pdfData}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              customTextRenderer={() => []}
            />
          </Document>
          <Center mt="4">
            <Button
              onClick={prevPage}
              disabled={pageNumber === 1}
              variant="outline"
            >
              Previous Page
            </Button>
            <Text mx="4">
              Page {pageNumber} of {numPages}
            </Text>
            <Button
              onClick={nextPage}
              disabled={pageNumber === numPages}
              variant="outline"
            >
              Next Page
            </Button>
          </Center>
        </ModalBody>
        <ModalFooter>
          <Select
            value={selectedPages} // Ensure value is an array
            onChange={handlePageChange}
            multiple
            placeholder="Select pages to download"
            h={"auto"}
          >
            {pageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          {/* Conditionally render the download button */}
          {selectedPages.length > 0 && (
            <Button colorScheme="blue" onClick={handleDownload}>
              Download
            </Button>
          )}
          <Button onClick={reset}>Reset</Button>
          <Button colorScheme="gray" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PDFModal;
