import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../components/Login";
import Signup from "../components/Signup";

const AuthPage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        align="center"
      >
        <Text fontSize="4xl" fontFamily="Work sans" color="black">
          PDF EDITOR
        </Text>
      </Box>

      <Box
        bg="white"
        w="100%"
        p={4}
        color="black"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default AuthPage;
