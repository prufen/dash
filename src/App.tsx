import "@mantine/core/styles.css";

import { Outlet } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import Header from "./Header";

export default function App() {
  return (
    <MantineProvider>
      <Header />
      <Outlet />
    </MantineProvider>
  );
}
