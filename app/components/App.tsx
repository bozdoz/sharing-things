import ThingSection from "components/ThingSection";
import UserOptions from "components/UserOptions";
import NavigationObserver from "./NavigationObserver";
import AppStatus from "./AppStatus";
import ThingObserver from "./ThingObserver";

const App = () => (
  <>
      <AppStatus />
    <UserOptions />
    <ThingSection />
    <NavigationObserver />
      <ThingObserver />
  </>
);

export default App;
