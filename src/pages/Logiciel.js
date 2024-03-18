import Display from "../components/logiciel/Display";
import { useParams } from "react-router-dom";

export default function Logiciel() {
  const { templateName } = useParams();

  return (
    <>
      <Display templateName={templateName} />
    </>
  );
}
