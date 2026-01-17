import { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FieldError } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUpdateWeeklyAvailability } from "@/hooks/api/profile/use-update-weekly-availability";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import formatTime from "@/lib/helper";

/* =======================
   Constants
======================= */

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

const DAY_LABEL: Record<(typeof WEEKDAYS)[number], string> = {
  Sun: "Sunday",
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
};

const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";

  return `${hour.toString().padStart(2, "0")}:${minute}`;
});

/* =======================
   Zod Schema
======================= */

const timeSlotSchema = z
  .object({
    from: z.string().min(1, "From time is required"),
    to: z.string().min(1, "To time is required"),
  })
  .refine((data) => data.from < data.to, {
    message: "End time must be after start time",
    path: ["to"],
  });

const weeklyAvailabilitySchema = z.object({
  weeklyAvailability: z.record(z.enum(WEEKDAYS), z.array(timeSlotSchema)),
});

export type WeeklyAvailabilityType = z.infer<typeof weeklyAvailabilitySchema>;

/* =======================
   Component
======================= */

export default function WeeklyAvailabilityForm() {
  const { user } = useAuthStore();

  const { mutate: updateAvailability, isPending } = useUpdateWeeklyAvailability();

  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<WeeklyAvailabilityType>({
    resolver: zodResolver(weeklyAvailabilitySchema),
    defaultValues: {
      weeklyAvailability: WEEKDAYS.reduce(
        (acc, day) => ({ ...acc, [day]: [] }),
        {} as Record<string, { from: string; to: string }[]>
      ),
    },
  });

  useEffect(() => {
    if (!user || !user.weeklyAvailability) return;

    reset({ weeklyAvailability: user.weeklyAvailability });
  }, [user]);

  const weeklyAvailability = watch("weeklyAvailability");

  /* =======================
     Field Arrays per Day
  ======================= */

  const fieldArrays = {
    Sun: useFieldArray({ control, name: "weeklyAvailability.Sun" }),
    Mon: useFieldArray({ control, name: "weeklyAvailability.Mon" }),
    Tue: useFieldArray({ control, name: "weeklyAvailability.Tue" }),
    Wed: useFieldArray({ control, name: "weeklyAvailability.Wed" }),
    Thu: useFieldArray({ control, name: "weeklyAvailability.Thu" }),
    Fri: useFieldArray({ control, name: "weeklyAvailability.Fri" }),
    Sat: useFieldArray({ control, name: "weeklyAvailability.Sat" }),
  };

  /* =======================
     Submit
  ======================= */

  const onSubmit = (data: WeeklyAvailabilityType) => {
    const cleaned = Object.fromEntries(
      Object.entries(data.weeklyAvailability).filter(([_, slots]) => slots.length > 0)
    );
    updateAvailability(cleaned);
  };

  return (
    <div className="max-w-3xl p-6 border rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-semibold">Weekly Availability</h2>
          <Button disabled={isPending} type="submit" className="w-20">
            {isPending ? <Spinner /> : "Save"}
          </Button>
        </div>

        {WEEKDAYS.map((day) => {
          const { fields, append, remove } = fieldArrays[day];
          const isSelected = weeklyAvailability[day]?.length > 0;
          const dayErrors = errors.weeklyAvailability?.[day];

          return (
            <div key={day} className="p-4">
              <div className="flex flex-col gap-3 sm:space-x-45 md:flex-row items-start  mb-2">
                {/* Checkbox */}
                <div className="flex items-center gap-3 w-28">
                  <Checkbox
                    className="size-5"
                    id={day}
                    checked={isSelected}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        append({ from: "", to: "" });
                      } else {
                        setValue(`weeklyAvailability.${day}`, []);
                      }
                    }}
                  />
                  <Label htmlFor={day} className="cursor-pointer">
                    {DAY_LABEL[day]}
                  </Label>
                </div>

                {/* Slots */}
                <div className="flex flex-col gap-3 flex-1">
                  {!isSelected && <div className="text-sm text-muted-foreground">Unavailable</div>}

                  {isSelected &&
                    fields.map((item, index) => (
                      <div key={item.id} className="flex items-center gap-2">
                        {/* From */}
                        <Controller
                          name={`weeklyAvailability.${day}.${index}.from`}
                          control={control}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className="w-40 h-10! rounded-sm!">
                                <SelectValue placeholder="From" />
                              </SelectTrigger>
                              <SelectContent position="popper">
                                <ScrollArea className="h-40">
                                  {TIME_OPTIONS.map((time) => (
                                    <SelectItem key={time} value={time}>
                                      {time && formatTime(time)}
                                    </SelectItem>
                                  ))}
                                </ScrollArea>
                              </SelectContent>
                            </Select>
                          )}
                        />

                        <span>-</span>

                        {/* To */}
                        <Controller
                          name={`weeklyAvailability.${day}.${index}.to`}
                          control={control}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className="w-40 h-10! rounded-sm!">
                                <SelectValue placeholder="To" />
                              </SelectTrigger>
                              <SelectContent position="popper">
                                <ScrollArea className="h-40">
                                  {TIME_OPTIONS.map((time) => (
                                    <SelectItem key={time} value={time}>
                                      {time && formatTime(time)}
                                    </SelectItem>
                                  ))}
                                </ScrollArea>
                              </SelectContent>
                            </Select>
                          )}
                        />

                        {/* Add */}
                        {index === 0 && (
                          <button
                            type="button"
                            onClick={() => append({ from: "", to: "" })}
                            className="border rounded-full p-1">
                            <Plus className="w-4 h-4" />
                          </button>
                        )}

                        {/* Remove */}
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="border rounded-full p-1">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              {/* Errors */}
              {Array.isArray(dayErrors) && (
                <div className="ml-28 mt-2 space-y-1">
                  {dayErrors.map(
                    (slotError, index) =>
                      slotError?.to?.message && (
                        <FieldError key={index}>
                          Slot {index + 1}: {slotError.to.message}
                        </FieldError>
                      )
                  )}
                </div>
              )}
            </div>
          );
        })}
      </form>
    </div>
  );
}
