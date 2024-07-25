import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEpisode } from "@/hooks/useEpisode";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/common/Icons";

interface OptionsProps {
  page: number;
  maxPage: number;
  prevPage: () => void;
  nextPage: () => void;
}

export const Options = ({
  page,
  maxPage,
  prevPage,
  nextPage,
}: OptionsProps) => {
  const {} = useEpisode();
  const router = useRouter();
  const handleCreationClick = () => {
    router.push("/episode/create");
  };

  return (
    <>
      <div>
        <Button variant="default" onClick={() => handleCreationClick()}>
          Nuevo episodio
        </Button>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => prevPage()}
          disabled={page === 1}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          variant="outline"
          onClick={() => nextPage()}
          disabled={page === maxPage}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </>
  );
};
