import {
  CharacterResult,
  Gender,
  CharacterStatus,
  ICharacterUpdate,
} from "@/types/api-types";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "../ui/dialog";
import { useCharacterStore } from "@/store/character-store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { useEffect } from "react";
import { updateCharacterSchema } from "@/schemas/updateCharacterSchema";
import { useCharacter } from "@/hooks/useCharacter";

interface Props {
  character: CharacterResult;
  isOpen: boolean;
  onClose: () => void;
}

export function EditCharacterBasicInfo({ character, isOpen, onClose }: Props) {
  const { updateCharacterBasicInfo } = useCharacter();

  const form = useForm<ICharacterUpdate>({
    resolver: zodResolver(updateCharacterSchema),
  });

  const { setValue } = form;
  const { errors } = form.formState;

  useEffect(() => {
    const keys = Object.keys(character) as Array<keyof ICharacterUpdate>;
    if (character) {
      keys.forEach((key) => {
        setValue(key, character[key]);
      });
    }
  }, [character, setValue]);

  const handleUpdate: SubmitHandler<ICharacterUpdate> = (data) => {
    updateCharacterBasicInfo(character, data);
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
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-accent">
                      {errors.name?.message}
                    </FormMessage>
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
                    <FormMessage className="text-accent">
                      {errors.species?.message}
                    </FormMessage>
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
                    <FormMessage className="text-accent">
                      {errors.type?.message}
                    </FormMessage>
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
                          {field.value || (
                            <span className="text-gray-500">Género</span>
                          )}
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
                    <FormMessage className="text-accent">
                      {errors.gender?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-5">
                Actualizar
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
