'use client';

import { MessageSenderProvider } from "./useMessageSender";
import { ChatProvider } from "./useChat";

import { combineComponents } from "@/utils/combineComponents"

const providers = [
  ChatProvider,
  MessageSenderProvider
];

const MessageContextProvider = combineComponents(...providers);
export default MessageContextProvider;