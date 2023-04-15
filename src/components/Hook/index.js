import React, { createContext, useEffect, useState } from "react";
import mqtt from "mqtt";

export const QosOption = createContext([]);

const HookMqtt = () => {
  const [client, setClient] = useState(null);
  const mqttConnect = () => {
    console.log("Connecting");
    setClient(mqtt.connect("ws://192.168.137.205:9001"));
  };

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        console.log("Connected");
      });
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        console.log("Reconnecting");
      });
      client.on("message", (topic, message) => {
        console.log("sending message");
      });
    }
  }, [client]);

  const mqttPublish = (message) => {
    if (client) {
      client.publish("licht", message);
    }
  };

  return (
    <>
      <p> test </p>
      <button onClick={mqttConnect}>connect</button>
      <button onClick={() => mqttPublish("true")}>an</button>
      <button onClick={() => mqttPublish("false")}>aus</button>
    </>
  );
};

export default HookMqtt;
