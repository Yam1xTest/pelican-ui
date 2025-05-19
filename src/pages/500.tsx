import { CustomError } from "../components/globals/CustomError/CustomError";

export default function Custom500() {
  return (
    <CustomError
      code={500}
      message="Извините, произошла внутренняя ошибка сервера. Попробуйте зайти позже"
    />
  );
}
