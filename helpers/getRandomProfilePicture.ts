import images from "../assets";

export default function getRandomProfilePicture() {
  const randomIntBetweenOneAndFour = Math.floor(Math.random() * 5);
  return images[randomIntBetweenOneAndFour];
}
