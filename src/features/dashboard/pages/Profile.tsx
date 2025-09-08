import ProfileCard from "@/components/ProfileCard";
import { useGetMeQuery } from "@/redux/features/user/user.api";

export default function Profile() {
  const { data } = useGetMeQuery(undefined);
  return <>{data && <ProfileCard user={data} />}</>;
}
