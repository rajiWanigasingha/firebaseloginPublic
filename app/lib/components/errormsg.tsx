import { Alert, AlertIcon, FormHelperText } from "@chakra-ui/react";

export function HelperEmail() {
  return (
    <>
      <FormHelperText>Ex:example@gmail.com</FormHelperText>
    </>
  );
}

export function Error() {
  return (
    <>
      <Alert status="error" mt="5px">
        <AlertIcon />
        Wrong email or password
      </Alert>
    </>
  );
}

export function HelperPaasword() {
  return (
    <>
      <FormHelperText>Must enter 8 digites</FormHelperText>
    </>
  );
}

