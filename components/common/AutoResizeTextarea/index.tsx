import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef } from "react";

export function AutoResizeTextarea(props: any) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [props.value]);

  return <Textarea ref={textareaRef} {...props} />;
}
