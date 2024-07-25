import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { CharacterFilters } from "@/types/app-types";
import { Gender } from "@/types/api-types";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

interface FilterDataProps {
  updateFilters: (data: CharacterFilters) => void;
}
export const FilterData = ({ updateFilters }: FilterDataProps) => {
  const form = useForm<CharacterFilters>();
  const handleFilterSubmit = (data: CharacterFilters) => {
    updateFilters(data);
  };

  return (
    <Form {...form}>
      <form
        action=""
        className="flex gap-2 flex-col md:flex-row"
        onSubmit={form.handleSubmit(handleFilterSubmit)}
      >
        <div className="w-full">
          <label className="text-md text-gray-300 mb-1">
            Filtrar personajes:
          </label>
          <div className="flex flex-col md:flex-row gap-2 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Nombre del personaje"
                      className="placeholder:text-gray-300"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="species"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="species"
                      placeholder="Especie"
                      className="placeholder:text-gray-300"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Tipo"
                      className="placeholder:text-gray-300"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="text-gray-300">
                        <SelectValue placeholder="Género" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {Object.values(Gender).map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            ></FormField>

            <Button type="submit" className="w-full md:w-1/2">
              Filtrar
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
