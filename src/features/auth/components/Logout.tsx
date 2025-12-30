/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonLoader from "@/components/ButtonLoader";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";

export default function Logout({ width }: { width?: "full" | "" }) {
  const dispatch = useDispatch();

  const [logout, { isLoading }] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      const res = await logout(null).unwrap();
      dispatch(authApi.util.resetApiState());
      toast.success(res.message);
    } catch (error:any) {
      toast.error(error.data.message);
    }
  };
  return (
    <>
      <Button
        onClick={handleLogout}
        variant="outline"
        size="sm"
        className={`w-${width} text-sm border border-destructive! text-destructive bg-destructive/20 hover:text-destructive hover:bg-destructive/30`}
      >
        <ButtonLoader spin={isLoading} />
        Logout
      </Button>
    </>
  );
}
