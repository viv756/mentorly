import { Button } from "@/components/ui/button";

export default function HeroLanding() {
  return (
    <div className=" px-10">
      <section className="grid lg:grid-cols-2 gap-10  py-16 items-center">
        {/* Left */}
        <div className="space-y-6">
          <h1 className="text-5xl xl:text-6xl font-serif leading-tight">
            Where Skills Are <br />
            Exchanged <br />
            <span className="text-primary">Not sold.</span>
          </h1>
          <p className="text-muted-foreground max-w-md">
            Mentor to earn credits. Learn using credits. Grow through community-powered mentoring.
          </p>

          <div className="flex items-center gap-4">
            <Button className="rounded-full px-6">Need Help?</Button>
          </div>
        </div>

        {/* Right Avatars */}
        <div className="sm:block hidden h-125 ">
          <div className="grid grid-cols-2 -mt-5 relative gap-5 ">
            <div className="ml-15 ">
              <img
                src={"https://res.cloudinary.com/devincarloz/image/upload/v1769492757/hero1_aax1jr.jpg"}
                className="rounded-[50px] rounded-bl-[140px] w-60 object-cover"
                alt="hero1"
              />
            </div>
            <div className="">
              <img
                src={"https://res.cloudinary.com/devincarloz/image/upload/v1769492756/hero2_od7bym.jpg"}
                className="rounded-full rounded-br-[10px] w-40 object-cover"
                alt="hero2"
              />
            </div>
            <div className="ml-30 w-40 h-40">
              <img
                src={"https://res.cloudinary.com/devincarloz/image/upload/v1769492757/hero3_yhwurj.avif"}
                className=" object-cover w-40 h-40 rounded-full rounded-br-[10px]"
                alt=""
              />
            </div>
            <div className="">
              <img
                src={"https://res.cloudinary.com/devincarloz/image/upload/v1769492828/hero4_wictmr.jpg"}
                className="rounded-full object-cover object-[80%_15%] w-35 h-70 overflow-hidden absolute top-45"
                alt=""
              />
            </div>
            <div className="">
              <img
                src={"https://res.cloudinary.com/devincarloz/image/upload/v1769492761/hero5_u4auml.jpg"}
                className="rounded-full object-cover overflow-hidden w-55 h-50 ml-15 "
                alt=""
              />
            </div>
            <div className="">
              <img
                src={"https://res.cloudinary.com/devincarloz/image/upload/v1769492758/hero6_qtwwvu.avif"}
                className="rounded-s-full  overflow-hidden w-50 object-cover h-30 mt-14"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
