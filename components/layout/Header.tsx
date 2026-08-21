import { getHeaderData } from "@/cms/api/header";
import HeaderClient from "./HeaderClient"

export default async function Header(){
  const data = await getHeaderData();
  return <HeaderClient data={data} />
}