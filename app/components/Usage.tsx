// TODO: Add Redux
import { useEffect, useRef } from "react";

const Usage: React.FC = () => {
  const date = useRef<Date>();

  // added to useEffect to get around nextjs's server-side rendering
  useEffect(() => {
    date.current = new Date();
  }, []);

  return (
    <>
      <h2>2. What do you want to use? </h2>
      <fieldset disabled>
        <div>
          <div>
            <div>
              Flex{" "}
              <small>
                claimed by {name} ({`${date.current}`})
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
        <div>
          <button type="button">PLUS SIGN</button>
        </div>
      </fieldset>
    </>
  );
};

export default Usage;
