import SessionRequestCard from "./_components/card";

const Inbox = () => {

  

  return (
    <>
      <h1 className="text-4xl mt-5 font-semibold">Session Requests</h1>
      <div className="grid sm:grid-cols-2  gap-2 mt-10">
        <SessionRequestCard />
        <SessionRequestCard />
        <SessionRequestCard />
      </div>
    </>
  );
};

export default Inbox;
