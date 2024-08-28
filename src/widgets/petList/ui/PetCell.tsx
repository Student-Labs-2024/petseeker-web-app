import React, { forwardRef } from "react";
import * as petModel from "@entities/pet";
import styles from "./card.module.scss";
import { petListConsts } from "@shared/constants";
interface PetCellProps {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
  allPets: petModel.type.Pet[];
  favorites: number[];
  petItemRefs: React.RefObject<(HTMLDivElement | null)[]>;
}

const PetCell = forwardRef<HTMLDivElement, PetCellProps>(
  ({ columnIndex, rowIndex, style, allPets, favorites, petItemRefs }, ref) => {
    const index = rowIndex * petListConsts.columnCount + columnIndex;
    const pet = allPets[index];
    if (!pet) return null;

    return (
      <div
        key={pet.id}
        style={style}
        className={styles.petItem}
        ref={(el) => {
          if (el) {
            petItemRefs.current[index] = el;
          }
        }}
      >
        <petModel.PetCard
          key={pet.id}
          description={pet}
          isSaved={favorites.includes(pet.id)}
          isFavoritePage={false}
        />
      </div>
    );
  }
);

export default PetCell;
