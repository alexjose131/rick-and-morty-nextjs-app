import { CharacterResult, Gender, Status } from "@/types/api-types";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogDescription,
} from "../ui/dialog";
import { useCharacter } from "@/hooks/useCharacter";
import { useCharacterStore } from "@/store/character-store";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newCharacterSchema } from "@/schemas/newCharacterSchema";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  character: CharacterResult;
  isOpen: boolean;
  onClose: () => void;
}

export function EditCharacterBasicInfo({ character, isOpen, onClose }: Props) {
  const { updateCharacter } = useCharacterStore((state) => ({
    updateCharacter: state.updateCharacter,
  }));

  const form = useForm<CharacterResult>({
    resolver: zodResolver(newCharacterSchema),
  });

  const { errors } = form.formState;

  const handleUpdate = () => {
    onClose();
  };
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar</DialogTitle>
          <DialogDescription>
            Edita la información básica del personaje.
          </DialogDescription>
        </DialogHeader>
        <section>
          <Form {...form}>
            <form
              className="flex flex-col gap-2"
              onSubmit={form.handleSubmit(handleUpdate)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Nombre"
                        className="placeholder:text-gray-300"
                        defaultValue={character.name}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.name?.message}</FormMessage>
                  </FormItem>
                )}
              ></FormField>

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="text-gray-300">
                          <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {Object.values(Status).map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage>{errors.status?.message}</FormMessage>
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
                        type="text"
                        placeholder="Especie"
                        className="placeholder:text-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.species?.message}</FormMessage>
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
                        type="type"
                        placeholder="Tipo"
                        className="placeholder:text-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.type?.message}</FormMessage>
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
                    <FormMessage>{errors.gender?.message}</FormMessage>
                  </FormItem>
                )}
              ></FormField>

              <Button type="submit" className="mt-5">
                Crear
              </Button>
            </form>
          </Form>
          <Button
            className="w-full mt-2"
            type="button"
            variant="secondary"
            onClick={() => onClose()}
          >
            Cerrar
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  );
}
