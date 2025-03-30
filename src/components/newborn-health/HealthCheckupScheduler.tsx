
import React, { useState } from "react";
import HealthCheckupOverview from "./HealthCheckupOverview";
import HealthCheckupDialog from "./HealthCheckupDialog";

interface HealthCheckupSchedulerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const HealthCheckupScheduler: React.FC<HealthCheckupSchedulerProps> = ({ open, setOpen }) => {
  const handleScheduleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <HealthCheckupOverview onScheduleClick={handleScheduleClick} />
      <HealthCheckupDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default HealthCheckupScheduler;
