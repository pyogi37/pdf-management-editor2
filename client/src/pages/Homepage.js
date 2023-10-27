import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
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
        >
          <Text fontSize="lg" color={"GrayText"}>
            Welcome, {user.name} !!
          </Text>
          <Spacer />
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
