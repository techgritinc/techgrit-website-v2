import { getHeaderData } from "@/cms/api/header";
import HeaderClient from "./HeaderClient"

export default async function Header(){
  const data = await getHeaderData();
  if (!data) return null;
  return <HeaderClient data={data} />
}