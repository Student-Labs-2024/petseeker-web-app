import React from "react";
import { petModel, PetCard } from "@entities/pet/";
import styles from "./card.module.scss";
import { match } from "ts-pattern";

type PetListProps = {
  pets: petModel.Pet[];
  isLoading: boolean;
  isError: boolean;
  error?: string;
};

export const PetList: React.FC<PetListProps> = ({
  pets,
  isLoading,
  isError,
}) => {
  return (
    <div className={styles.container}>
      {match({ isLoading, isError, pets })
        .with({ isLoading: true }, () => <div>Loading...</div>)
        .with({ isError: true }, () => <div>Error</div>)
        .with({ pets: { length: 0 } }, () => <p>No pets available.</p>)
        .otherwise(() => (
          <div className={styles.card__list_container}>
            {pets?.map((pet: petModel.Pet) => (
              <PetCard key={pet.id} description={pet} />
            ))}
          </div>
        ))}
    </div>
  );
};
