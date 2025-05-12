import Countries from "../components/Countries";
import Form from "../components/Form";

export function HomePage() {
  return (
    <>
      <section className="flex flex-col items-center justify-center p-10">
        <Form />
      </section>
      <section className="flex flex-col items-center justify-center p-10">
        <Countries />
      </section>
    </>
  );
}
