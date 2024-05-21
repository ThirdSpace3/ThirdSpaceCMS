import Display from "../components/logiciel/Display";
import { useParams } from "react-router-dom";

export default function Logiciel() {
  const { templateName } = useParams();
  const walletId = sessionStorage.getitem("userAccount");
  console.log(walletId);
  return (
    <>
      <Display templateName={templateName} />
    </>
  );
}
