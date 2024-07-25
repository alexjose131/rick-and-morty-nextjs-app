import { useToast } from "@/components/ui/use-toast";

export enum ToastTitle {
  Exito = "Exito",
  Error = "Error",
  Info = "Información",
}

interface Props {
  title: ToastTitle;
  description: string;
}

export function useToastImp() {
  const { toast } = useToast();

  const showToast = ({ title, description }: Props) => {
    let variant: "default" | "destructive" | null | undefined = "default"; // Variante por defecto

    switch (title) {
      case ToastTitle.Exito:
        variant = "default";
        break;
      case ToastTitle.Error:
        variant = "destructive";
        break;
      default:
        variant = "default";
        break;
    }

    return toast({
      title: title,
      description: description,
      variant: variant,
    });
  };

  return { showToast };
}
