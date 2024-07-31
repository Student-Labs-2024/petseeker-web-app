import React from "react";
import * as petModel from "@entities/pet";
import styles from "./card.module.scss";
import { match } from "ts-pattern";
export const PetList: React.FC = () => {
  const {
    data: pets,
    isLoading,
    isError,
    error,
  } = petModel.api.useGetPetsQuery();

  return (
    <div className={styles.container}>
      {match({ isLoading, isError, pets })
        .with({ isLoading: true }, () => <div>Loading...</div>)
        .with({ isError: true }, () => <div>Error: </div>)
        .with({ pets: { length: 0 } }, () => <p>No pets available.</p>)
        .otherwise(() => (
          <div className={styles.card__list_container}>
            {pets?.results?.map((pet: petModel.type.Pet) => (
              <petModel.PetCard key={pet.id} description={pet} />
            ))}
          </div>
        ))}
    </div>
  );
};
