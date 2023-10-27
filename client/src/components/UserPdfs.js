import React, { useEffect, useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import PDFModal from "./PDFModal";
import { usePdfContext } from "../Context/pdfContext";

const UserPdfs = ({ user }) => {
  // const [pdfs, setPdfs] = useState([]);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdfId, setSelectedPdfId] = useState();
  const { pdfs, setPdfs } = usePdfContext();
  const toast = useToast();

  // Add a state to track selected pages
  const [selectedPages, setSelectedPages] = useState([]);

  const handleDownload = async (selectedPages) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        responseType: "arraybuffer",
      };
      const response = await axios.post(
        "/api/v1/pdf/download",
        {
          selectedPages: selectedPages,
          id: selectedPdfId,
        },
        config
      );

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a temporary URL to download the Blob
      const url = window.URL.createObjectURL(blob);

      // Create a link and trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = "downloaded.pdf";
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);

      toast({
        title: "PDF Downloaded",
        description: "The PDF has been downloaded successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast({
        title: "Error",
        description: "Failed to download the PDF.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const openModal = async (pdfId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        responseType: "arraybuffer",
      };
      const response = await axios.get(`/api/v1/pdf/${pdfId}`, config);

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const pdfData = await URL.createObjectURL(blob);

        setSelectedPDF(pdfData);
        setSelectedPdfId(pdfId);
        setIsModalOpen(true);
      } else {
        console.log("Request failed with status code: ", response.status);
      }
    } catch (error) {
      console.log("Error while fetching PDF: ", error);
    }
  };

  const closeModal = () => {
    setSelectedPages([]);
    setSelectedPDF(null);
    setIsModalOpen(false);
    setSelectedPdfId(null);
  };

  const handleDelete = async (pdfId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.delete(`/api/v1/pdf/${pdfId}`, config);

      if (response.status === 204) {
        toast({
          title: "PDF Deleted",
          description: "The PDF has been deleted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Remove the deleted PDF from the list
        setPdfs(pdfs.filter((pdf) => pdf._id !== pdfId));
      } else {
        console.log("Request failed with status code: ", response.status);
      }
    } catch (error) {
      console.log("Error while deleting PDF: ", error);
      toast({
        title: "Error",
        description: "Failed to delete the PDF.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.get("/api/v1/pdf/get-all", config);

        if (response.status === 200) {
          setPdfs(response.data.pdfs);
        } else {
          console.log("Request failed with status code: ", response.status);
        }
      } catch (error) {
        console.log("Error while fetching PDFs: ", error);
      }
    };

    fetchData();
  }, [setPdfs]);

  return (
    <Box>
      <Box overflow={"scroll"} maxH={"70vh"}>
        {pdfs.map((pdf, index) => (
          <Box
            key={index}
            p={2}
            border="1px solid #ccc"
            mb={2}
            onClick={() => openModal(pdf._id)}
            _hover={{ cursor: "pointer" }}
            backgroundColor={"thistle"}
          >
            <Text fontSize="lg">{pdf.filename}</Text>
            <Button
              size="sm"
              colorScheme="red"
              ml={2}
              onClick={() => handleDelete(pdf._id)}
            >
              Delete
            </Button>
          </Box>
        ))}
      </Box>

      <PDFModal
        isOpen={isModalOpen}
        onClose={closeModal}
        pdfData={selectedPDF}
        onDownload={handleDownload}
        onPageSelection={setSelectedPages}
      />
    </Box>
  );
};

export default UserPdfs;
