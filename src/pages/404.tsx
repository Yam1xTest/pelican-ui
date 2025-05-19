import { CustomError } from "../components/globals/CustomError/CustomError";

export default function Custom404() {
  return (
    <CustomError
      code={404}
      message="Страница не найдена или не существует"
    />
  );
}
