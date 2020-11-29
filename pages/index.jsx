import React, {useEffect} from "react";
import {getUser} from "../utils/aws/user";

export default function Home() {
  async function fetch() {
    const user = await getUser('47e12680-8af6-4d05-98ae-3223d057603b');
    console.log({ user });
  }
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div>
      <h1>Homepage</h1>
    </div>
  );
}
