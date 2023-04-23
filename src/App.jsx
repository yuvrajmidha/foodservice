import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Center,
  Button,
  Heading,
  Divider,
  Image,
  HStack,
  Textarea,
  Spinner,
  IconButton,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import { Camera } from "react-camera-pro";
import {
  FaArrowLeft,
  FaBackward,
  FaCamera,
  FaChevronLeft,
} from "react-icons/fa";
import uploadImage from "./services/upload";
import createNew from "./services/create";
import updateInfo from "./services/update";
import fetchAll from "./services/fetch";
import Lead from "./components/Lead";
import deleteOne from "./services/delete";

export const App = () => {
  const camera = React.useRef(null);
  const [image, setImage] = React.useState("");

  const [allLeads, setLeads] = React.useState([]);

  const [upload, setUpload] = React.useState(false);

  const [view_all, setView] = React.useState(false);

  const [text, setText] = React.useState("");

  const [title, setTitle] = React.useState("");

  const [id, setId] = React.useState("");

  const [menu, setMenu] = React.useState("");

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // console.log(text);
      // Send Axios request here
      if (id && text) {
        updateInfo(id, text).then(() => {
          fetchAllLeads();
        });
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [text]);

  const fetchAllLeads = () => {
    fetchAll().then((res) => {
      setLeads(res);
    });
  };

  React.useEffect(() => {
    fetchAllLeads();
  }, []);

  React.useEffect(() => {
    // console.log(id)
  }, [id]);

  return (
    <ChakraProvider theme={theme}>
      {view_all ? (
        <>
          <Box h="100vh" w="100%">
            <HStack
              pos={"sticky"}
              top={0}
              bg="white"
              borderBottomWidth={1}
              cursor={"pointer"}
              _hover={{ bg: "gray.200" }}
              px={3}
              py={3}
              spacing={3}
            >
              <Heading size="md">All Leads</Heading>
            </HStack>

            <VStack spacing={0}>
              {allLeads.map((lead) => (
                <Lead
                  key={lead._id}
                  lead={lead}
                  onDelete={(id, callback) => {
                    deleteOne(lead._id).then(() => {
                      fetchAllLeads()
                      callback()
                    })
                  }}
                  onClick={() => {
                    setId(lead._id);
                    setTitle(lead.title)
                    setImage(lead.image);
                    setText(lead.info);
                    setView(false);
                    window.scrollTo(0, 0);
                  }}
                />
              ))}
            </VStack>

            <Box h={20} />
          </Box>{" "}
        </>
      ) : (
        <>
          {image === "" ? (
            <Box>
              <Box h="100vh" w="100vw">
                <Camera ref={camera} />
              </Box>
              <Box
                pos={"fixed"}
                h="200px"
                bottom={0}
                left={0}
                right={0}
                width="100vw"
                bg="blackAlpha.500"
              >
                <Center h="144px">
                <Button
                  onClick={() => {
                    const img = camera.current.takePhoto();
                    setView(false);
                    setId('')
                    setImage(img);
                    setTitle("New Lead");
                    setText('')
                    uploadImage(img).then((res) => {
                      console.log(res);
                      setUpload(true);
                      createNew(res).then((result) => {
                        console.log(result);
                        fetchAllLeads();
                        setTitle(result.data.title);
                        setImage(result.data.image);
                        setId(result.data._id);
                      });
                    });
                  }}
                  rounded={"full"}
                  size="lg"
                  boxSize={"80px"}
                  _hover={{ bg: "whiteAlpha.600" }}
                  bg="whiteAlpha.200"
                  minH="auto"
                  color="white"
                  borderWidth={4}
                > 
                <Box boxSize="64px" minW="64px" rounded={"full"} bg="white" />
                </Button>
                </Center>
                 <Box mx={3} my={"2px"}>
                  {allLeads.length > 0 && <Button onClick={() => {setView(true)}} minH={"50px"} w="100%" color="white" variant={"outline"}>
                      View All Leads
                  </Button>}
                 </Box>
              </Box>
             
            </Box>
          ) : (
            <Box h="100vh" w="100%">
              <HStack
                onClick={() => {
                  setView(true);
                }}
                cursor={"pointer"}
                _hover={{ bg: "gray.200" }}
                px={3}
                py={3}
                spacing={3}
              >
                <FaChevronLeft />
                <Heading size="md">{title}</Heading>
              </HStack>
              <Divider />
              <HStack px={4} w="100%" justify={"space-between"} py={3}>
                <Image
                  src={image}
                  objectFit="cover"
                  boxSize="64px"
                  rounded={"xl"}
                />
                {id ==='' && <HStack>
                  {!upload && <Spinner size={"sm"} ml="auto"></Spinner>}
                  <Box>
                    <Text fontWeight={"bold"}>
                      {upload ? "Uploaded" : "Uploading..."}
                    </Text>
                  </Box>
                </HStack>}
              </HStack>
              <Divider />
              <Textarea
                h="100%"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                rounded={"none"}
                outline={"none"}
                border={0}
                p={3}
                placeholder="Write Something..."
              ></Textarea>
            </Box>
          )}
        </>
      )}

      {!(view_all === false && image === '') && (
        <IconButton
          onClick={() => {
            setImage("");
            setView(false)
            setUpload(false);
          }}
          size="lg"
          rounded={"full"}
          boxSize="56px"
          bg={"black"}
          color="white"
          pos="fixed"
          bottom={6}
          right={6}
        >
          <FaCamera size="20px" />
        </IconButton>
      )}
    </ChakraProvider>
  );
};
