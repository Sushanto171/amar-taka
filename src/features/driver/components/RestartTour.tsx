import { Button } from "@/components/ui/button";
import { tourKey as key } from "@/constant/tourKey";
import { X } from "lucide-react";

export default function RestartTour({ tourKey }: { tourKey: string }) {
  const handleRestartTour = () => {
    localStorage.removeItem(tourKey);
    localStorage.removeItem(key.profile);
    window.location.reload();
  };
  return (
    <>
      <Button onClick={handleRestartTour}>
        <X size={16} /> Restart Tour
      </Button>
    </>
  );
}
