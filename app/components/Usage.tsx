import useStore from "hooks/useStore";
import AddServer from "./AddServer";

const date = new Date();

const Usage: React.FC = () => {
  const name = useStore((state) => state.name);

  return (
    <>
      <h2>2. What do you want to use? 🤷‍♀️</h2>
      <fieldset disabled={!name}>
        {false && (
          <div>
            <div>
              <div>
                Flex{" "}
                <small>
                  claimed by {name} ({`${date}`})
                </small>
              </div>
              <div>
                <textarea placeholder="Message here (optional)"></textarea>
              </div>
              <div>
                <button type="button">CLAIM</button>
              </div>
            </div>
          </div>
        )}
        <div>
          <AddServer />
        </div>
      </fieldset>
    </>
  );
};

export default Usage;
