import React from "react";
import { Button } from "./components/ui/button";

const App = () => {
  return (
    <div>
      App
      <Button>Button</Button>
      <div className="bg-background text-foreground p-6 border">Background test</div>
    </div>
  );
};

export default App;
