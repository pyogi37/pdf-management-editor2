import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  useBreakpointValue, // Import the breakpoint utility
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import FileInput from "../components/FileInput";
import UserPdfs from "../components/UserPdfs";
import { UserState } from "../Context/UserProvider";

const Homepage = () => {
  const { user } = UserState();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  // Use useBreakpointValue to customize layout based on screen size
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <Box>
      {/* Navbar */}
      {user && (
        <Flex
          p={4}
          alignItems="center"
          boxShadow="base"
          bg="lavenderblush"
          w={"100vw"}
          direction={isSmallScreen ? "column" : "row"} // Adjust direction for small screens
        >
          <Text
            fontSize="lg"
            color={"GrayText"}
            textAlign={isSmallScreen ? "center" : "left"}
          >
            Welcome, {user.name} !!
          </Text>
          <Spacer />
          {isSmallScreen && <Box p={2} /> /* Add space for small screens */}
          <Button colorScheme="red" onClick={logoutHandler}>
            Logout
          </Button>
        </Flex>
      )}
      {/* Main Content */}
      {user && (
        <Box p={4}>
          <FileInput user={user} />
        </Box>
      )}
      {user && (
        <Box p={4}>
          <UserPdfs user={user} />
        </Box>
      )}
    </Box>
  );
};

export default Homepage;
