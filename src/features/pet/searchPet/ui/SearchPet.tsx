import React, { ChangeEvent, useState } from "react";
import { useGetPetsQuery } from "../../../../entities/pet/index";
import { Input } from "../../../../shared/ui/Input";
import { Button } from "../../../../shared/ui/button";
export const SearchPet: React.FC = () => {
  const [name, setName] = useState("");

  const [searchParams, setSearchParams] = useState<{
    name?: string;
  }>({});

  useGetPetsQuery(searchParams);

  const handleSearch = () => {
    setSearchParams({
      name: name || undefined,
    });
  };
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <div>
      <div>
        <label>
          <Input value={name} onChange={handleChangeName} />
        </label>
      </div>

      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};
