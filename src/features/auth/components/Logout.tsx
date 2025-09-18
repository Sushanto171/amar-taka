import ButtonLoader from "@/components/ButtonLoader";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";

export default function Logout({ width }: { width: "full" | "" }) {
  const dispatch = useDispatch();

  const [logout, { isLoading }] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      const res = await logout(null).unwrap();
      dispatch(authApi.util.resetApiState());
      toast.success(res.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        onClick={handleLogout}
        variant="outline"
        size="sm"
        className={`w-${width} text-sm`}
      >
        <ButtonLoader spin={isLoading} />
        Logout
      </Button>
    </>
  );
}
