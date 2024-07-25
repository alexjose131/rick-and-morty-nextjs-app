import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { EpisodeFilters } from "@/types/app-types";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FilterDataProps {
  updateFilters: (data: EpisodeFilters) => void;
}

export const FilterData = ({ updateFilters }: FilterDataProps) => {
  const handleFilterSubmit = (data: EpisodeFilters) => {
    updateFilters(data);
  };

  const form = useForm<EpisodeFilters>();

  return (
    <>
      <Form {...form}>
        <form
          action=""
          className="flex gap-2 flex-col justify-start md:flex-row"
          onSubmit={form.handleSubmit(handleFilterSubmit)}
        >
          <div>
            <label className="text-md text-gray-300 mb-1">
              Filtrar episodios:
            </label>
            <div className="flex flex-col md:flex-row gap-2 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Nombre del episodio"
                        className="placeholder:text-gray-300"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>

              <FormField
                control={form.control}
                name="episode"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="episode"
                        placeholder="Episodio"
                        className="placeholder:text-gray-300"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <Button type="submit" className="">
                Filtrar
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
