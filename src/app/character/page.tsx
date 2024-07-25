"use client";

import { useCharacter } from "@/hooks/useCharacter";
import { CharacterResult } from "@/types/api-types";
import { lazy, Suspense, useState } from "react";
import { EditCharacterBasicInfo } from "@/components/character/editCharacterBasicInfo";
import { EditCharacterStatus } from "@/components/character/editCharacterStatus";
import { FilterData } from "@/components/character/filterData";
import { Options } from "@/components/character/options";

const TableData = lazy(() => import("../../components/character/tableData"));

export default function CharacterPage() {
  const {
    characters,
    filteredNewCharacters,
    page,
    maxPage,
    prevPage,
    nextPage,
    updateFilters,
  } = useCharacter();

  const [showEditBasicInfo, setShowEditBasicInfo] = useState(false);
  const [showEditStatus, setShowEditStatus] = useState(false);
  const [character, setCharacter] = useState<CharacterResult>();

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl mb-10">Personajes</h2>
      <section className="mb-5 w-full">
        <FilterData updateFilters={updateFilters} />
      </section>
      <section className="flex flex-col gap-2 md:gap-0 md:flex-row items-center justify-center md:justify-between w-full my-2">
        <Options
          page={page}
          maxPage={maxPage}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </section>
      <section className="w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <TableData
            characters={characters}
            setCharacter={setCharacter}
            filteredNewCharacters={filteredNewCharacters}
            page={page}
            setShowEditBasicInfo={setShowEditBasicInfo}
            setShowEditStatus={setShowEditStatus}
          />
        </Suspense>
      </section>
      {showEditBasicInfo && character && (
        <EditCharacterBasicInfo
          character={character}
          isOpen={showEditBasicInfo}
          onClose={() => setShowEditBasicInfo(false)}
        />
      )}

      {showEditStatus && character && (
        <EditCharacterStatus
          character={character}
          isOpen={showEditStatus}
          onClose={() => setShowEditStatus(false)}
        />
      )}
    </div>
  );
}
