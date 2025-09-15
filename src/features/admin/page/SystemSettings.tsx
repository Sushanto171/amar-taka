import { useGetSettingsQuery } from "@/redux/features/settings/settings.api";
import AdminConfigPanel from "../components/SettingUpdate";

export default function SystemSettings() {
  const { data } = useGetSettingsQuery(undefined);
  console.log(data);
  return (
    <div>
      This is SystemSettings Component.
      <AdminConfigPanel />
    </div>
  );
}
