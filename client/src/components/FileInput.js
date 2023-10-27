import React, { useState } from "react";
import { Box, Button, Center, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import { UserState } from "../Context/UserProvider";
import { usePdfContext } from "../Context/pdfContext";

const FileInput = ({ user }) => {
  const [pdf, setPdf] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const { updatePdfs } = usePdfContext();
  const toast = useToast();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPdf(file);
  };

  const handleFileUpload = async () => {
    if (!pdf) {
      toast({
        title: "Please select a PDF file.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    setPdfLoading(true);

    try {
      const formData = new FormData();
      formData.append("pdf", pdf);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload progress: ${percentCompleted}%`);
        },
      };

      const response = await axios.post("/api/v1/pdf/upload", formData, config);

      if (response.status === 200) {
        console.log("PDF uploaded successfully.");
        toast({
          title: "File uploaded successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });

        console.log("*************************", response.data);
        updatePdfs(response.data.pdf);
      } else {
        console.log("PDF upload failed.");
        toast({
          title: "File upload failed!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
      toast({
        title: "Server issue while uploading PDF",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

    setPdfLoading(false);
  };

  return (
    <Box>
      <Center pb={3}>
        <Input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          backgroundColor={"thistle"}
        />
      </Center>
      <Center pb={3}>
        <Button onClick={handleFileUpload} isLoading={pdfLoading}>
          Upload
        </Button>
      </Center>
    </Box>
  );
};

export default FileInput;
