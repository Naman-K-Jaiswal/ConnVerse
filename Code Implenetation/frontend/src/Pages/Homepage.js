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
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Login from "../Components/Authentication/Login";
import Signup from "../Components/Authentication/Signup";

function Homepage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/chats");
  }, [navigate]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Container maxW="xl" centerContent justifyContent='center'>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        boxShadow='2xl'
      >
        <Text fontSize="4xl" fontFamily="Times Roman">
          ConnVerse
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} boxShadow='2xl'>
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab
              _selected={{ color: "black", bg: "rgb(250, 238, 190)" }}
              mr="0.5em"
              _hover={{ color: "black", bg: "#F2B65D" }}
            >
              Login
            </Tab>
            <Tab
              _selected={{ color: "black", bg: "rgb(250, 238, 190)" }}
              ml="0.5em"
              _hover={{ color: "black", bg: "#F2B65D" }}
            >
              Sign Up
            </Tab>
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
}

export default Homepage;
