import { useEffect, useRef } from "react";

type Opts = {
  loadMoreRef: React.RefObject<Element | null>;
  canLoadMore: boolean;        // hasMore
  isLoading: boolean;          // isFetching / isLoading
  onLoadMore: () => void;      // call to request more (e.g. setLimit)
  root?: Element | null;       // optional scroll container
  rootMargin?: string;
  threshold?: number | number[];
};

export function useInfiniteScroll({
  loadMoreRef,
  canLoadMore,
  isLoading,
  onLoadMore,
  root = null,
  rootMargin = "200px", // prefetch before truly visible
  threshold = 0.1,
}: Opts) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isLoadingRef = useRef<boolean>(false);
  const onLoadMoreRef = useRef(onLoadMore);

  // keep refs fresh without re-creating observer on every render
  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    // nothing to do if can't load more or ref not mounted
    const target = loadMoreRef.current;
    if (!canLoadMore || !target) return;

    // cleanup previous observer if exists
    if (observerRef.current) {
      try {
        observerRef.current.disconnect();
      } catch {
        // Ignore errors during disconnect
      }
      observerRef.current = null;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;

        // if intersecting and not currently loading -> trigger once
        if (e.isIntersecting && !isLoadingRef.current) {
          // unobserve immediately to prevent multiple triggers
          try {
            observer.unobserve(e.target);
          } catch {
            //
          }

          // set loading guard and call the loadMore function
          onLoadMoreRef.current();
        }
      },
      { root: root ?? null, rootMargin, threshold }
    );

    observerRef.current = observer;
    observer.observe(target);

    // cleanup on unmount / deps change
    return () => {
      if (observerRef.current) {
        try {
          observerRef.current.disconnect();
        } catch {
          //
        }
        observerRef.current = null;
      }
    };
    // intentionally do NOT include isLoading or onLoadMore in deps (we use refs)
  }, [loadMoreRef, canLoadMore, root, rootMargin, threshold]);
}
