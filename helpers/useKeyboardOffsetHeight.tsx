import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export default function useKeyboardOffsetHeight(): number {
  const [keyBoardOffsetHeight, setKeyboardOffsetHeight] = useState(0);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      (e) => {
        setKeyboardOffsetHeight(e.endCoordinates.height);
      }
    );
    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      () => {
        setKeyboardOffsetHeight(0);
      }
    );

    return () => {
      keyboardWillHideListener.remove();
      keyboardWillShowListener.remove();
    };
  }, []);

  return keyBoardOffsetHeight;
}
