import Modality from "@/entities/Modality";

export async function getModalities() {
  const modalities = await Modality.find();
  return modalities;
}
