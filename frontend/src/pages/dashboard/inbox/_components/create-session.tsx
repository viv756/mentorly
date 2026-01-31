import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSkillByIdAndWeeklyAvailability } from "@/hooks/api/skills/use-get-skillById-and-weeklyAvailability";
import { formatWord, generateDates } from "@/lib/helper";
import { useAuthStore } from "@/store/store";
import type { CreateAcceptSessionPayload } from "@/features/session/types";
import { Spinner } from "@/components/ui/spinner";
import { useCreateAcceptRequestSession } from "@/hooks/api/session/use-createAcceptRequestSession";
import ScheduleMeetingSkelton from "@/components/skelton/scheduleMeeting-skelton";
import { DAYS_TO_SHOW, TOTAL_DAYS } from "@/constant";

type Availability = Record<string, AvailabilitySlot[]>;

type ScheduleForm = {
  date: string;
  from: string;
  to: string;
  timezone: string;
};

// Type for a booked slot
interface BookedSlot {
  date: string; // YYYY-MM-DD
  from: string; // HH:mm
  to: string; // HH:mm
}

interface AvailabilitySlot {
  from: string; // HH:mm
  to: string; // HH:mm
}

// Type for weekly availability
interface WeeklyAvailability {
  [key: string]: AvailabilitySlot[] | undefined; // Mon, Tue, etc.
}

const CreateSession = () => {
  const currentUser = useAuthStore((s) => s.user);
  const { learnerId: mentorId, skillId, sessionId } = useParams();
  const { data } = useSkillByIdAndWeeklyAvailability(mentorId, skillId);
  const { mutate: createSession, isPending } = useCreateAcceptRequestSession();
  const [availability, setAvailability] = useState<Availability>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<AvailabilitySlot[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  const form = useForm<ScheduleForm>({
    defaultValues: {
      date: "",
      from: "",
      to: "",
      timezone: "Asia/Kolkata",
    },
  });

  const allDates = generateDates(new Date(), TOTAL_DAYS);
  const visibleDates = allDates.slice(startIndex, startIndex + DAYS_TO_SHOW);

  /* -------- FETCH AVAILABILITY (BACKEND FORMAT) -------- */
  useEffect(() => {
    if (!data?.skillAndAvailability?.weeklyAvailability) return;
    setAvailability(data.skillAndAvailability.weeklyAvailability);
  }, [data]);

  /* -------- DATE SELECT -------- */
  const handleDateSelect = (iso: string, weekday: string) => {
    setSelectedDate(iso);

    form.setValue("date", iso);
    form.setValue("from", "");
    form.setValue("to", "");

    setTimeSlots(availability[weekday] || []);
  };

  /* -------- SUBMIT -------- */
  const onSubmit = (data: ScheduleForm) => {
    // const weekday = new Date(data.date).toLocaleDateString("en-US", {
    //   weekday: "short",
    // });

    const payload: CreateAcceptSessionPayload = {
      date: data.date,
      sessionId: sessionId as string,
      from: data.from, // "09:00 AM"
      to: data.to, // "10:00 AM"
      timezone: "Asia/Kolkata",
      learnerId: currentUser?.userId as string,
      mentorId: mentorId as string,
      skillId: skillId as string,
    };

    createSession(payload);
  };

  if (!data) {
    return <ScheduleMeetingSkelton />;
  }

  const userSkill = data.skillAndAvailability.userSkill;
  const user = data.skillAndAvailability.user;
  const avatar = data.skillAndAvailability.avatar;
  const bookedSlots = data.skillAndAvailability.bookedSlots;

  // Example: bookedSlots is an array of BookedSlot
  const bookedByDate: Record<string, string[]> = bookedSlots.reduce(
    (acc: Record<string, string[]>, slot: BookedSlot) => {
      const dateKey = slot.date.split("T")[0]; // ✅ YYYY-MM-DD

      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(`${slot.from}-${slot.to}`);

      return acc;
    },
    {} as Record<string, string[]>,
  );

  // Type-safe function
  const isDateFullyBooked = (dateIso: string, weekday: keyof WeeklyAvailability) => {
    const availabilitySlots: AvailabilitySlot[] = availability[weekday] || [];

    // If no availability slots, consider it not bookable (not fully booked)
    if (availabilitySlots.length === 0) return false;

    const bookedSlotsForDate: string[] = bookedByDate[dateIso] || [];

    // If no booked slots at all, date is not fully booked
    if (bookedSlotsForDate.length === 0) return false;

    // Only fully booked if ALL available slots are booked
    return availabilitySlots.every((slot) =>
      bookedSlotsForDate.includes(`${slot.from}-${slot.to}`),
    );
  };

  return (
    <div className="min-h-screen w-full px-4 py-6 sm:py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col xl:flex-row gap-4">
          <div className="w-full xl:w-1/2">
            <Card className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl">
              <Link
                to={`/user/${mentorId}`}
                className="flex items-center gap-2 mb-4 text-sm sm:text-base hover:underline">
                <ArrowLeft size={20} className="shrink-0" />
                <span className="truncate">{user.name}</span>
              </Link>

              <div className="flex  flex-row justify-between  items-center gap-4 mb-4">
                <h1 className="text-2xl sm:text-4xl font-bold wrap-break-word">
                  {userSkill.skillName}
                </h1>
                <img
                  src={avatar}
                  alt={user.name}
                  className="rounded-full w-25 h-25 sm:w-24 sm:h-24 md:w-30 md:h-30 object-cover "
                />
              </div>

              <div className="border-y py-3 sm:py-4 mb-4 sm:mb-6 flex justify-between items-center">
                <div className="flex items-center">
                  <p className="text-sm sm:text-base">{formatWord(userSkill.category)}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm sm:text-base">
                    {userSkill.experienceYears} Year{userSkill.experienceYears > 1 ? "s" : ""} of
                    experience
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm sm:text-base">{formatWord(userSkill.skillLevel)}</p>
                </div>
              </div>

              <div>
                <p className="text-sm leading-relaxed">{userSkill.description}</p>
              </div>
            </Card>
          </div>

          <div className="w-full xl:w-1/2">
            <Card className="p-4 sm:p-6 sm:pb-12 space-y-4 sm:space-y-6 rounded-2xl sm:rounded-3xl">
              <h1 className="text-xl sm:text-2xl font-bold">Schedule a Meeting</h1>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                {/* -------- DATE SLIDER -------- */}
                <div>
                  <h2 className="font-semibold mb-3 text-sm sm:text-base">Select Date</h2>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => setStartIndex((i) => Math.max(i - 1, 0))}
                      disabled={startIndex === 0}
                      className="shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                      <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>

                    <div className="flex gap-2 overflow-hidden flex-1">
                      {visibleDates.map((d) => {
                        const disabled =
                          availability[d.weekday]?.length === 0 ||
                          isDateFullyBooked(d.iso, d.weekday);
                        return (
                          <Button
                            key={d.key}
                            type="button"
                            disabled={disabled}
                            variant={selectedDate === d.iso ? "default" : "outline"}
                            onClick={() => handleDateSelect(d.iso, d.weekday)}
                            className="min-w-16 sm:min-w-20 h-16 sm:h-20 flex flex-col rounded-lg sm:rounded-xl p-1 sm:p-2">
                            <span className="text-xs sm:text-sm">{d.weekday}</span>
                            <span className="text-base sm:text-lg font-semibold">{d.date}</span>
                          </Button>
                        );
                      })}
                    </div>

                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        setStartIndex((i) => Math.min(i + 1, TOTAL_DAYS - DAYS_TO_SHOW))
                      }
                      disabled={startIndex >= TOTAL_DAYS - DAYS_TO_SHOW}
                      className="shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </div>
                </div>

                {/* -------- TIME SLOTS -------- */}
                {selectedDate && (
                  <div>
                    <h2 className="font-semibold mb-3 text-sm sm:text-base">Available Time</h2>
                    {timeSlots.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No availability for this day</p>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                        {timeSlots.map((slot) => {
                          const selected =
                            form.watch("from") === slot.from && form.watch("to") === slot.to;

                          // Check if this specific slot is booked
                          const bookedSlotsForDate = bookedByDate[selectedDate] || [];
                          const isSlotBooked = bookedSlotsForDate.includes(
                            `${slot.from}-${slot.to}`,
                          );
                          return (
                            <Button
                              key={`${slot.from}-${slot.to}`}
                              type="button"
                              variant={selected ? "default" : "outline"}
                              disabled={isSlotBooked}
                              onClick={() => {
                                form.setValue("from", slot.from);
                                form.setValue("to", slot.to);
                              }}
                              className="rounded-md h-10 sm:h-12 w-full text-xs sm:text-sm">
                              {format(slot.from, "hh:mm a")} – {format(slot.to, "hh:mm a")}
                            </Button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* -------- TIMEZONE -------- */}
                <div>
                  <h2 className="font-semibold mb-3 text-sm sm:text-base">Timezone</h2>
                  <Select
                    value={form.watch("timezone")}
                    onValueChange={(v) => form.setValue("timezone", v)}>
                    <SelectTrigger className="w-full h-10 sm:h-11 text-sm sm:text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">(GMT+5:30) India</SelectItem>
                      <SelectItem value="Europe/London">(GMT+0) London</SelectItem>
                      <SelectItem value="America/New_York">(GMT-5) New York</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* -------- SUBMIT -------- */}
                <Button
                  type="submit"
                  className="w-full rounded-xl py-5 sm:py-6 text-base sm:text-lg"
                  disabled={!form.watch("date") || !form.watch("from") || !form.watch("to")}>
                  {isPending ? <Spinner /> : "Schedule"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSession;
