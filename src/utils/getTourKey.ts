import { role } from "@/constant/role";
import { tourKey } from "@/constant/tourKey";
import { TRole } from "@/types/global.types";

export const getTourKey = (userRole: TRole) => {
  switch (userRole) {
    case role.admin:
      return tourKey.admin;
    case role.agent:
      return tourKey.agent;
    case role.user:
      return tourKey.user;
    default:
      return "";
  }
};
