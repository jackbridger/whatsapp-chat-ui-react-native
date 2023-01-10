interface SendNewMessageProps {
  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
  newMsg: string;
  setNewMsg: (newmsg: string) => void;
}

export default function sendMsg(props: SendNewMessageProps) {
  const { isTyping, setIsTyping, newMsg, setNewMsg } = props;
  if (isTyping) {
    setNewMsg("");
    setIsTyping(false);
  }
}
