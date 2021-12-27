import React, { useEffect, useState } from "react";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

import Navbar from "./common/Navbar";

const App = (props) => {

  return (
    <s.Screen>
      <s.Container
        flex={1}
        jc={"center"}
        ai={"center"}
        fd={"row"}
        style={{ padding: 10, backgroundColor: "var(--primary)" }}
      >       
        <Navbar {...props}>          
        </Navbar>
        {props.children}
      </s.Container>
    </s.Screen>
  );
}

export default App;
