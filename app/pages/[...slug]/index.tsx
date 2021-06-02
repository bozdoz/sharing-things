import React from "react";
import { withRouter } from "next/router";
import App from "components/App";

const ContentPage = withRouter(({ router }) => {
  return (
    <>
      <p>Page: {router.asPath}</p>
      <App />
    </>
  );
});

export default ContentPage;
