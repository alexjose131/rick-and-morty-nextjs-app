import { IEpisodeUpdate, EpisodeResult } from "@/types/api-types";
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
  FormLabel,
  FormMessage,
} from "../ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useEffect } from "react";
import { useEpisodeStore } from "@/store/episode-store";
import { updateEpisodeSchema } from "@/schemas/updateEpisodeSchema";
import { formatDate } from "@/lib/utils";

interface Props {
  episode: EpisodeResult;
  isOpen: boolean;
  onClose: () => void;
}

export function EditEpisodeBasicInfo({ episode, isOpen, onClose }: Props) {
  const { updateEpisode } = useEpisodeStore((state) => ({
    updateEpisode: state.updateEpisode,
  }));

  const form = useForm<IEpisodeUpdate>({
    resolver: zodResolver(updateEpisodeSchema),
  });

  const { setValue } = form;
  const { errors } = form.formState;

  useEffect(() => {
    const keys = Object.keys(episode) as Array<keyof IEpisodeUpdate>;
    if (episode) {
      keys.forEach((key) => {
        if (key === "air_date") {
          setValue(key, new Date(episode[key]).toISOString().split("T")[0]);
          return;
        }
        setValue(key, episode[key]);
      });
    }
  }, [episode, setValue]);

  const handleUpdate: SubmitHandler<IEpisodeUpdate> = (data) => {
    const { name, air_date, episode: episodeString, ...dataEp } = episode;
    data.air_date = formatDate(data.air_date);
    const updatedCharacter = { ...dataEp, ...data };
    updateEpisode(updatedCharacter);
    onClose();
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar</DialogTitle>
          <DialogDescription>
            Edita la información básica del episodio.
          </DialogDescription>
        </DialogHeader>
        <section>
          <Form {...form}>
            <form
              className="flex flex-col gap-2 w-full"
              onSubmit={form.handleSubmit(handleUpdate)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="name" className="text-gray-300">
                      Nombre
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage className="text-accent">
                      {errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              ></FormField>

              <FormField
                control={form.control}
                name="air_date"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="name" className="text-gray-300">
                      Fecha de lanzamiento
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage className="text-accent">
                      {errors.air_date?.message}
                    </FormMessage>
                  </FormItem>
                )}
              ></FormField>

              <FormField
                control={form.control}
                name="episode"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="name" className="text-gray-300">
                      Episodio
                    </FormLabel>
                    <FormControl>
                      <Input type="type" {...field} />
                    </FormControl>
                    <FormMessage className="text-accent">
                      {errors.episode?.message}
                    </FormMessage>
                  </FormItem>
                )}
              ></FormField>

              <Button type="submit">Crear</Button>
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
