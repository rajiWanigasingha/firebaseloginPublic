"use client";

import {
  Alert,
  AlertIcon,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { auths } from "../lib/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Singup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(true);
  const router = useRouter()

  const handelsubmit = () => {
    //@ts-ignore
    createUserWithEmailAndPassword(auths, email, password)
      .then((users) => {
        router.push('/dashbode')
      })
      .catch((error: any) => {
        setError(false)
      });
  };

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
        <Card w="lg" variant="elevated" bgColor="whitesmoke" mb="30px">
          <CardHeader>
            <Heading size="lg">Let`&apos;`s Sing Up</Heading>
          </CardHeader>
          {!error ? (
            <Alert status="error">
              <AlertIcon />
              There was an error. Try again
            </Alert>
          ) : (
            <Divider />
          )}
          <CardBody>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={(e) => {
                e.preventDefault();
                handelsubmit();
              }}
            >
              <FormControl isRequired py="10px">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  required
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <FormHelperText>Ex:example@gmail.com</FormHelperText>
              </FormControl>
              <FormControl isRequired py="10px">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  required
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                ></Input>
                <FormHelperText>Must enter 8 digites</FormHelperText>
              </FormControl>
              <Button type="submit" colorScheme="whatsapp" my="10px">
                Create an acount
              </Button>
            </form>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
}
