import { DashBoardSkeleton } from "@/components/Skeleton";
import type { ISidebarItems } from "@/types/global.types";
import { Suspense } from "react";

// export const generateRoute = (sidebarItems: ISidebarItems[]) => {
//   return sidebarItems.flatMap((item) =>
//     item.items.map((route) => ({
//       Component: route.Component,
//       path: route.url,
//     }))
//   );
// };
export const generateRoute = (sidebarItems: ISidebarItems[]) => {
  return sidebarItems.flatMap((item) =>
    item.items.map((route) => ({
      Component: () => (
        <Suspense fallback={<DashBoardSkeleton />}>
          <route.Component />
        </Suspense>
      ),
      path: route.url,
    }))
  );
};
