"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import { auths } from "../lib/firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addData } from "../lib/actions/actions";
import { db } from "../lib/firebase/firebase";
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";

export default function Dashbode() {
  const route = useRouter();
  const [userinfo, setUserinfo] = useState("");
  const [userid, setUserid] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoding] = useState(true);
  const [data ,setData] = useState<any[]>([])

  onAuthStateChanged(auths, (user) => {
    if (user) {
      setUserid(user.uid);
      //@ts-ignore
      setUserinfo(user.email);
    } else {
      route.push("/login");
    }
  });

  const submitHandel = () => {
    addData(body, title, userid);
    setBody("");
    setTitle("");
  };

  async function getData() {
    const q = query(collection(db, "usercomments"), where("uid", "==", userid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      //@ts-ignore
      setData((state) => [...state,doc.data()])
    });

    setLoding(false)
  }

  return (
    <>
      <Box w="100%" h="100hv" overflowY="hidden">
        <Flex
          flex="1"
          flexDirection="column"
          gap="20px"
          justifyContent="center"
          
          alignItems="center"
          mt="100px"
          mb="100px"
        >
          <Card w="lg" variant="elevated" bgColor="whitesmoke">
            <CardHeader>
              <Heading size="lg">Welcome {userinfo}</Heading>
            </CardHeader>
            <Divider />
            <CardBody>
              <Tabs variant="soft-rounded" colorScheme="green">
                <TabList>
                  <Tab>Add information</Tab>
                  <Tab onClick={() => getData()}>See informatiom</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        submitHandel();
                      }}
                    >
                      <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                          placeholder="Enter your title"
                          type="text"
                          name="title"
                          onChange={(e) => setTitle(e.target.value)}
                          value={title}
                        ></Input>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Comment</FormLabel>
                        <Textarea
                          placeholder="Enter your thouth"
                          size="md"
                          resize="vertical"
                          name="body"
                          onChange={(e) => setBody(e.target.value)}
                          value={body}
                        />
                      </FormControl>
                      <Button type="submit" colorScheme="whatsapp" mt="15px">
                        Submit your values
                      </Button>
                    </form>
                  </TabPanel>
                  <TabPanel>
                    {loading ? (
                      <Card align="center">
                        <CardHeader>
                          <Heading size="md">LODING</Heading>
                        </CardHeader>
                        <CardBody>
                          <Spinner />
                        </CardBody>
                      </Card>
                    ) : (
                      data.map((val) => (
                        <Card align="center" m='10px'>
                        <CardHeader>
                          <Heading size="md">{val.title}</Heading>
                        </CardHeader>
                        <CardBody>
                          <Text>{val.body}</Text>
                        </CardBody>
                      </Card>
                      ))
                    )}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </CardBody>
          </Card>
        </Flex>
      </Box>
    </>
  );
}