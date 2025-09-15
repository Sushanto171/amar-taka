import { useGetSettingsQuery } from "@/redux/features/settings/settings.api";
import AdminConfigPanel from "../components/SettingUpdate";

export default function SystemSettings() {
  const { data } = useGetSettingsQuery(undefined);

  return <div>{data && <AdminConfigPanel defaultValues={data} />}</div>;
}
