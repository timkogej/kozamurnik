export type Van = {
  id: string;
  name: string;
  image: string;
  capacity: string;
  volume: string;
  seats: string;
  bestFor: string[];
};

// Placeholder specs — Tim updates these with the real vans' data
export const vans: Van[] = [
  {
    id: "van-1",
    name: "Kombi 1 — veliki tovorni prostor",
    image: "/images/najem/van-1.jpg",
    capacity: "do 1.000 kg",
    volume: "do 11 m³",
    seats: "3 sedeži",
    bestFor: ["Selitve", "Prevoz pohištva"],
  },
  {
    id: "van-2",
    name: "Kombi 2 — vsestranski",
    image: "/images/najem/van-2.jpg",
    capacity: "do 800 kg",
    volume: "do 8 m³",
    seats: "3 sedeži",
    bestFor: ["Dostava", "Večji nakupi"],
  },
  {
    id: "van-3",
    name: "Kombi 3 — kompaktni",
    image: "/images/najem/van-3.jpg",
    capacity: "do 600 kg",
    volume: "do 6 m³",
    seats: "2 sedeža",
    bestFor: ["Manjši prevozi", "Mestna dostava"],
  },
];
