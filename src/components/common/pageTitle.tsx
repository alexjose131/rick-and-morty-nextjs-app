import Image from "next/image";

export const PageTitle = ({ title }: { title: string }) => {
  return (
    <>
      <section className="flex flex-col-reverse md:flex-row justify-between items-center mb-10 w-full">
        <h2 className="text-3xl mt-3 md:mt-0">{title}</h2>

        <Image
          width={200}
          height={100}
          className="sm:hidden md:block"
          src={"/rick_and_morty.png"}
          alt="image brand for the Rick And Morty web app"
        ></Image>
      </section>
    </>
  );
};
