import type { ISidebarItems } from "@/types/global.types";

export const generateRoute = (sidebarItems: ISidebarItems[]) => {
  return sidebarItems.flatMap((item) =>
    item.items.map((route) => ({ Component: route.Component, path: route.url }))
  );
};
