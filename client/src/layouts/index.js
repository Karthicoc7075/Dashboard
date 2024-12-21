import { useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";

import Sidebar from "../components/sidebar/sidebar";
import Main from "./dashboard/main";
import Header from "../components/header/header";


export default function Layout({ children }) {
  const [openSidebar, setOpenSidebar] = useState(false);
console.log('hello');
  return (
    <>
      <Header onOpenSidebar={() => setOpenSidebar(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Sidebar
          openSidebar={openSidebar}
          onCloseSidebar={() => setOpenSidebar(false)}
        />

        <Main>{children}</Main>
      </Box>
    </>
  );
}
