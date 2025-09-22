import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import * as React from "react";

const features = [
  {
    title: "Send Money",
  },
  {
    title: "Cash Out",
  },
  {
    title: "Bill Payment",
  },
  {
    title: "Cash In",
  },
  {
    title: "Secure",
  },
];

export function FeaturesCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    const interval = setInterval(
      () => {
        if (api.selectedScrollSnap() === api.scrollSnapList().length - 1) {
          api.scrollTo(0);
        } else {
          api.scrollNext();
        }
      },
      current === 0 ? 0 : 3000
    );

    return () => clearInterval(interval);
  }, [api, current]);

  const loopedFeatures = [...features, ...features, ...features];

  return (
    <div className="px-4 flex justify-center w-full h-[80px] relative">
      <Carousel setApi={setApi} className="absolute -bottom-6 w-[60vw] mx-auto">
        <CarouselContent className="flex gap-6 items-center px-10 py-7">
          {loopedFeatures.map((feature, index) => {
            const isActive = index === current;
            return (
              <CarouselItem
                key={`${feature.title}-${index}`}
                className="flex w-full justify-center md:basis-1/2 lg:basis-1/3"
              >
                <Card
                  className={`w-[200px] ${
                    isActive
                      ? "scale-[1.2] h-[100px] rounded-3xl shadow-lg border border-primary/20 bg-primary/10"
                      : "scale-100 rounded-[100px] opacity-70"
                  }`}
                >
                  <CardContent className="flex h-full items-center justify-center">
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
