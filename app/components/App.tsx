import ThingSection from "components/ThingSection";
import UserOptions from "components/UserOptions";
import NavigationObserver from "./NavigationObserver";
import AppStatus from "./AppStatus";

const App = () => (
  <>
      <AppStatus />
    <UserOptions />
    <ThingSection />
    <NavigationObserver />
  </>
);

export default App;
