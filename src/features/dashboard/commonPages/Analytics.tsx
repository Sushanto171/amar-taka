import { useGetUserStatsQuery } from "@/redux/features/stats/stats.api";


export default function Analytics() {
  const { data } = useGetUserStatsQuery(undefined);
  console.log(data);
  return <div>This is Analytics Component.</div>;
}
