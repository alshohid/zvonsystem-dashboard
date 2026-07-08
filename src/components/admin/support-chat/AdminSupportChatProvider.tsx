"use client";

import { type ReactNode, useEffect, useEffectEvent, useRef } from "react";
import {
  hydrateSupportChat,
  receiveSupportMessage,
  setConnectionStatus,
  setConversationTyping,
} from "@/src/redux/features/admin/support/supportChatSlice";
import {
  buildAdminSupportChatSeed,
  supportChatSimulationReplies,
} from "@/src/redux/features/admin/support/supportChatSeed";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import type { SupportChatState } from "@/src/types/adminSupportChatTypes";

type AdminSupportChatProviderProps = {
  children: ReactNode;
};

export default function AdminSupportChatProvider({
  children,
}: AdminSupportChatProviderProps) {
  const dispatch = useAppDispatch();
  const chatState = useAppSelector((state) => state.adminSupportChat);

  const chatStateRef = useRef<SupportChatState>(chatState);
  const handledOutgoingIdsRef = useRef<Record<string, string>>({});
  const replyCursorRef = useRef<Record<string, number>>({});
  const timeoutIdsRef = useRef<number[]>([]);

  useEffect(() => {
    chatStateRef.current = chatState;
  }, [chatState]);

  const queueSimulatedReply = useEffectEvent(
    (
      conversationId: string,
      delayRange: [number, number] = [1_200, 2_600],
    ) => {
      const currentState = chatStateRef.current;
      const conversation = currentState.conversationsById[conversationId];
      const scriptedReplies = supportChatSimulationReplies[conversationId];

      if (!conversation || !scriptedReplies?.length || conversation.typing) {
        return;
      }

      dispatch(setConversationTyping({ conversationId, typing: true }));

      const [minDelay, maxDelay] = delayRange;
      const delay = minDelay + Math.floor(Math.random() * (maxDelay - minDelay));

      const timeoutId = window.setTimeout(() => {
        const latestState = chatStateRef.current;
        const latestConversation = latestState.conversationsById[conversationId];
        const availableReplies = supportChatSimulationReplies[conversationId];

        timeoutIdsRef.current = timeoutIdsRef.current.filter(
          (id) => id !== timeoutId,
        );

        if (!latestConversation || !availableReplies?.length) {
          return;
        }

        const cursor = replyCursorRef.current[conversationId] ?? 0;
        const nextReply = availableReplies[cursor % availableReplies.length];

        replyCursorRef.current[conversationId] = cursor + 1;

        dispatch(setConversationTyping({ conversationId, typing: false }));
        dispatch(
          receiveSupportMessage({
            conversationId,
            body: nextReply,
            senderName: latestConversation.participantName,
          }),
        );
      }, delay);

      timeoutIdsRef.current.push(timeoutId);
    },
  );

  useEffect(() => {
    if (chatState.initialized) {
      return;
    }

    dispatch(hydrateSupportChat(buildAdminSupportChatSeed()));
  }, [chatState.initialized, dispatch]);

  useEffect(() => {
    if (!chatState.initialized || chatState.connectionStatus === "connected") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      dispatch(setConnectionStatus("connected"));
    }, 700);

    timeoutIdsRef.current.push(timeoutId);

    return () => {
      window.clearTimeout(timeoutId);
      timeoutIdsRef.current = timeoutIdsRef.current.filter((id) => id !== timeoutId);
    };
  }, [chatState.connectionStatus, chatState.initialized, dispatch]);

  useEffect(() => {
    Object.entries(chatState.messagesByConversationId).forEach(
      ([conversationId, messages]) => {
        const lastMessage = messages[messages.length - 1];

        if (!lastMessage || lastMessage.sender !== "admin") {
          return;
        }

        if (handledOutgoingIdsRef.current[conversationId] === lastMessage.id) {
          return;
        }

        handledOutgoingIdsRef.current[conversationId] = lastMessage.id;
        queueSimulatedReply(conversationId);
      },
    );
  }, [chatState.messagesByConversationId]);

  useEffect(() => {
    if (!chatState.initialized || chatState.connectionStatus !== "connected") {
      return;
    }

    const intervalId = window.setInterval(() => {
      const currentState = chatStateRef.current;
      const eligibleConversationIds = currentState.conversationIds.filter(
        (conversationId) => {
          const conversation = currentState.conversationsById[conversationId];

          return (
            conversationId !== currentState.activeConversationId &&
            Boolean(conversation) &&
            !conversation.typing &&
            Math.random() > 0.5
          );
        },
      );

      if (!eligibleConversationIds.length) {
        return;
      }

      const randomConversationId =
        eligibleConversationIds[
          Math.floor(Math.random() * eligibleConversationIds.length)
        ];

      queueSimulatedReply(randomConversationId, [2_400, 4_100]);
    }, 14_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [chatState.connectionStatus, chatState.initialized]);

  useEffect(
    () => () => {
      timeoutIdsRef.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    },
    [],
  );

  return children;
}
