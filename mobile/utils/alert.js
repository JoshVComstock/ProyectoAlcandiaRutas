import Toast from "react-native-simple-toast";

export const SuccesAlert = (Text) => {
  Toast.show(`${Text}`);
};
export const ErrorAlert = (Text) => {
  Toast.show({
    type: "error",
    text1: `${Text}`,
  });
};
