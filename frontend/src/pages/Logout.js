import React, { useEffect, useState } from "react";

export default function Logout() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const logout = async () => {
      const res = await fetch("http://localhost:4000/users/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      setMessage(data.message);
    };
    logout();
  }, []);

  return (
    <div>
      <h2>Logout</h2>
      <p>{message}</p>
    </div>
  );
}
