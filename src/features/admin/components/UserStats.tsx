import { COLORS } from "@/constant/stats";
import { convertTaka } from "@/utils/convertTaka";
import type { IUserStats } from "@/types/stats.types";
import ReusablePieChart from "@/components/PieChar";

export default function UserStats({ userStats }: { userStats: IUserStats }) {
  const userPieData = userStats.roleByUsers.map(role => ({
    name: role._id,
    value: role.count,
    percent: ((role.count / userStats.total) * 100).toFixed(1),
  }));

  return (
    <ReusablePieChart
      title="User Stats"
      data={userPieData}
      colors={COLORS}
      centerLabel={`৳${convertTaka(userStats.amount)}`}
      footerContent={
        <p className="text-center w-full">total users: {userStats.total}</p>
      }
      innerRadius="50%"
      outerRadius="85%"
    />
  );
}
