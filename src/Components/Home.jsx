import React from "react";
import { Head } from "./Head";
import UserContext from "../UserContext";
import { Contas } from "./Contas/Contas";

const Home = () => {
  const { data } = React.useContext(UserContext);
  if (data === null) return null;
  return (
    <section>
      <Head title={data.name} />
      <Contas />
    </section>
  );
};

export default Home;
