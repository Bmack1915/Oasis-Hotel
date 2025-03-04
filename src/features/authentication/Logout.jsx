import { HiArrowRightEndOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { Logout, isLoading } = useLogout();
  return (
    <ButtonIcon disabled={isLoading} onClick={Logout}>
      {!isLoading ? <HiArrowRightEndOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
