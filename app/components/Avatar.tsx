import ColorHash from "color-hash";
import styled from "styled-components";

interface Props {
  name: string;
}

const colorHash = new ColorHash();

/**
 * returns 4 random percentages joined with a '/'
 * unlikely example: '100% 100% / 100% 100%'
 */
const getBorderRadius = ({ name }: Props): string => {
  // abusing the rgb hash to get useful/deterministic numbers
  const hash = [
    colorHash.rgb(`${name}-border`),
    colorHash.rgb(`${name}-border-2`),
  ];

  return hash
    .reduce((prev, cur) => {
      prev.push(cur.map((num) => `${(num / 255) * 100}%`).join(" "));

      return prev;
    }, [] as string[])
    .join(" / ");
};

const Avatar = styled.div<Props>`
  --size: 1.6em;
  opacity: ${(props) => (props.name ? 1 : 0)};
  background: ${(props) => colorHash.hex(props.name)};
  width: var(--size);
  height: var(--size);
  border-radius: ${getBorderRadius};
  transition: all;
  transition-duration: var(--anim);
  transition-delay: var(--delay);
  display: inline-block;
`;

export default Avatar;
