import {
  CharacterResult,
  CharacterStatus,
  ICharacterStatus,
} from "@/types/api-types";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect } from "react";
import { editCharacterStatusSchema } from "@/schemas/editCharacterStatusSchemat";
import { useCharacter } from "@/hooks/useCharacter";

interface Props {
  character: CharacterResult;
  isOpen: boolean;
  onClose: () => void;
}

export function EditCharacterStatus({ character, isOpen, onClose }: Props) {
  const { updateCharacterStatus } = useCharacter();

  const form = useForm<ICharacterStatus>({
    resolver: zodResolver(editCharacterStatusSchema),
  });

  const { setValue } = form;
  const { errors } = form.formState;

  useEffect(() => {
    const keys = Object.keys(character) as Array<keyof ICharacterStatus>;
    if (character) {
      keys.forEach((key) => {
        setValue(key, character[key]);
      });
    }
  }, [character, setValue]);

  const handleUpdate: SubmitHandler<ICharacterStatus> = (data) => {
    updateCharacterStatus(character, data);
    onClose();
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar</DialogTitle>
          <DialogDescription>Edita el estado personaje.</DialogDescription>
        </DialogHeader>
        <section>
          <Form {...form}>
            <form
              className="flex flex-col gap-2"
              onSubmit={form.handleSubmit(handleUpdate)}
            >
              <FormField
                control={form.control}
                name="status"
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
                        {Object.values(CharacterStatus).map((gender) => (
                          <SelectItem key={gender} value={gender}>
                            {gender}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-accent">
                      {errors.status?.message}
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
