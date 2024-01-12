import React from "react";
import Match from "@/components/Match/Match";

const index = ({ id }) => {
  return <Match matchId={id} />;
};

export default index;

export async function getServerSideProps(context) {
  const id = context.query.id;
  return {
    props: {
      id,
    },
  };
}
