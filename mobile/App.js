import React from "react";
import { UserProvider, useUser } from "./hook/useUser";
import Toast from "react-native-toast-message";
import Nav from "./components/nav";

export default function App() {
  return (
    <UserProvider>
      <Toast />
      <Nav />
    </UserProvider>
  );
}
