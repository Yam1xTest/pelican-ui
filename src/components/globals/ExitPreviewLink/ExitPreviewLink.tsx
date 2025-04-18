import axios from "axios";
import { useRouter } from "next/router";

export function ExitPreviewLink() {
  const router = useRouter();

  const handleExit = async () => {
    await axios.post(`/api/exit-preview`);
    router.reload();
  };

  return (
    <button
      type="button"
      className="button button--secondary exit-preview-link"
      onClick={handleExit}
    >
      Выйти из режима черновика
    </button>
  );
}
