import io from "socket.io-client";

// Establish a connection to the socket server
export const socket = io("http://localhost:4000");