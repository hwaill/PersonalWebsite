import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function Update() {
	revalidatePath('/bookclub');
	redirect('/bookclub');
}