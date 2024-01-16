import styles from "./Tile.module.css";
import colorMap from "./constants/colorMap";

interface Props {
  value: number;
}

// Component representing individual tiles.
const Tile = ({ value }: Props) => {
  // If value is 8, 512, or 2048, text is white, otherwise it's black.
  // The value determines the tile color
  return (
    <div
      className={`flex absolute justify-center items-center w-full h-full top-0 ${colorMap[value]} ${
        value === 8 || value === 512 || value === 2048 ? "text-white" : "text-black"
      } ${styles.tile}`}
    >
      {value}
    </div>
  );
};

export default Tile;


