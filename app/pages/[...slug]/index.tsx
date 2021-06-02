import React from "react";
import { useRouter } from "next/router";
import App from "components/App";

const ContentPage: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <p>Namespace: {router.asPath}</p>
      <App />
    </>
  );
};

export default ContentPage;
