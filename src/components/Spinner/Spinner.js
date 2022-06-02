import { TailSpin } from "react-loader-spinner";
import { SpinnerWrapper } from "./Spinner.styled.js";
const Spinner = () => {
  return (
    <SpinnerWrapper>
      <TailSpin color="orange" ariaLabel="loading" />
    </SpinnerWrapper>
  );
};

export default Spinner;
