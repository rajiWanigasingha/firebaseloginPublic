import {
  Button,
  Flex,
  Heading,
  Stack,
} from "@chakra-ui/react";
import firebase from "firebase/compat/app";
import Link from "next/link";

export default function Home() {
  console.log(firebase)
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
          <Stack>
            <Heading as="h1" size="4xl">
              Welocome to Login.io
            </Heading>
          </Stack>
          <Stack flexDirection="row">
            <Button size="lg" colorScheme="purple">
              <Link href='/login'>Login</Link>
            </Button>
            <Button size="lg" colorScheme="purple">
              <Link  href='/signup'>Sign up</Link>
            </Button>
            <Button size="lg" colorScheme="purple">
              <Link  href='/dashbode'>Dashbode</Link>
            </Button>
          </Stack>
        </Flex>
    </>
  );
}
