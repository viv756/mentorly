import { useEffect, useState } from "react";
import { Response } from "@/components/ai/response";

type Props = {
  text: string;
  onStreamingChange?: (isStreaming: boolean) => void;
};

export const StreamingResponse = ({ text, onStreamingChange }: Props) => {
  const [content, setContent] = useState("\u200B");

  useEffect(() => {
    let index = 0;
    let current = "";

    const tokens = text.split(/(\s+)/); // keeps spaces

    const startTimeout = setTimeout(() => {
      onStreamingChange?.(true);
    }, 300);

    const interval = setInterval(() => {
      if (index < tokens.length) {
        current += tokens[index];
        setContent(current);
        index++;
      } else {
        clearInterval(interval);
        onStreamingChange?.(false);
      }
    }, 60);

    return () => {
      clearInterval(interval);
      clearTimeout(startTimeout);
    };
  }, [text, onStreamingChange]);

  return (
    <>
      <Response>{content}</Response>
    </>
  );
};
