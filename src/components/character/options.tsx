import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/common/Icons";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const handleCreationClick = () => {
    router.push("/character/create");
  };
  return (
    <>
      <div>
        <Button variant="default" onClick={() => handleCreationClick()}>
          Nuevo personaje
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
