import { FadeLoader } from "react-spinners";

const Fade = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center">
      <FadeLoader color="#2563eb" />
    </div>
  );
};

export default Fade;
