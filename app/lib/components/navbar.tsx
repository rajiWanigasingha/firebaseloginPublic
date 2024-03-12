import { Box, Flex, Heading, Icon, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { RiLoginBoxFill } from "react-icons/ri";

export default function Navbar() {
  return (
    <>
      <Box w="100vw" h="auto" bgColor="#05142b">
        <Flex flexDirection="row" justifyContent="space-between" p='20px'>
          <Stack>
            <Link href='/' style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <RiLoginBoxFill></RiLoginBoxFill>
            <Heading size="md">Login.io</Heading>
            </Link>
          </Stack>
          <Stack></Stack>
        </Flex>
      </Box>
    </>
  );
}
