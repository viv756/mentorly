import WeeklyAvailabilityForm from "./_components/weeklyAvailability-form";

const Calendar = () => {
  return (
    <div className="pt-6">
      <div className="flex items-center">
        <h1 className="text-4xl font-bold tracking-wide">Calendar</h1>
      </div>
      <div className="pt-10">
        <WeeklyAvailabilityForm />
      </div>
    </div>
  );
};

export default Calendar;
