"use client";

import {
  Alert,
  AlertIcon,
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
} from "@chakra-ui/react";
import { useState } from "react";
import { auths } from "../lib/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Error, HelperEmail, HelperPaasword } from "../lib/components/errormsg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorhandel,setErrorhandel] = useState(false)

  const route = useRouter();
  let formMessage;
  let formMessagepassword;

  const handelsubmit = () => {
    //@ts-ignore
    signInWithEmailAndPassword(auths, email, password)
      .then((users) => {
        const user = users.user;
        route.push("/dashbode");
      })
      .catch((error: any) => {
        setErrorhandel(true)
      });
  };

  if(!errorhandel){
    formMessage = <HelperEmail/>
    formMessagepassword= <HelperPaasword/>
  }else{
    formMessage = <Error/>
    formMessagepassword= <Error/>
  }

  return (
    <>
      <Flex
        flex="1"
        flexDirection="column"
        gap="20px"
        justifyContent="center"
        h="100vh"
        alignItems="center"
      >
        <Card w="lg" variant="elevated" bgColor="whitesmoke">
          <CardHeader>
            <Heading size="lg">Welcome</Heading>
          </CardHeader>
          <Divider />
          <CardBody>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handelsubmit();
              }}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <FormControl isRequired py="10px">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  required
                  placeholder="Enter your email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
                {formMessage}
              </FormControl>
              <FormControl isRequired py="10px">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  required
                  placeholder="Enter your password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>
                {formMessagepassword}
              </FormControl>
              <Button type="submit" colorScheme="whatsapp" mt="10px">
                Login to dashbode
              </Button>
            </form>
          </CardBody>
          <CardFooter>
            <Text>
              Don`&apos;`t have an account
              <Link href={"/signup"} color="blue">
                Click me to make a one
              </Link>
            </Text>
          </CardFooter>
        </Card>
      </Flex>
    </>
  );
}
