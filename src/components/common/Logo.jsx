import logomark from "../../assets/logomark.svg";

export default function Logo() {
  return (
    <div className="flex gap-2">
      <img src={logomark} alt="" />
      <p className="text-text-xl font-bold">Famiacount</p>
    </div>
  );
}
