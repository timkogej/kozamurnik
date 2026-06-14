import {
  Wrench,
  Disc3,
  Target,
  Settings,
  Warehouse,
  Truck,
  Sun,
  Snowflake,
  RefreshCw,
  Bike,
  Layers,
  Bus,
} from "lucide-react";

export const servicesItems = [
  { label: "Menjava pnevmatik", href: "/storitve/menjava-pnevmatik", icon: Wrench, desc: "Sezonska montaža in balansiranje" },
  { label: "Vulkanizerstvo", href: "/storitve/vulkanizerstvo", icon: Disc3, desc: "Popravilo in servis pnevmatik" },
  { label: "Centriranje koles", href: "/storitve/centriranje-koles", icon: Target, desc: "3D geometrija za varno vožnjo" },
  { label: "Mini servis", href: "/storitve/mini-servis", icon: Settings, desc: "Olje, filtri, pregled vozila" },
  { label: "Shranjevanje pnevmatik", href: "/storitve/shranjevanje-pnevmatik", icon: Warehouse, desc: "Sezonski hotel za pnevmatike" },
  { label: "Najem kombijev", href: "/storitve/najem-kombijev", icon: Bus, desc: "Trije kombiji za selitve in prevoze" },
];

export const tiresItems = [
  { label: "Letne pnevmatike", href: "/pnevmatike/letne", icon: Sun, desc: "Za sezono nad 7 °C" },
  { label: "Zimske pnevmatike", href: "/pnevmatike/zimske", icon: Snowflake, desc: "Varnost v zimskih razmerah" },
  { label: "Celoletne pnevmatike", href: "/pnevmatike/celoletne", icon: RefreshCw, desc: "Kompromis za zmerne podnebje" },
  { label: "Tovorne pnevmatike", href: "/pnevmatike/tovorne", icon: Truck, desc: "Za kombije in gospodarska vozila" },
  { label: "Motoristične pnevmatike", href: "/pnevmatike/motoristicne", icon: Bike, desc: "Za vse kategorije motorjev" },
  { label: "Konfigurator platišč", href: "/pnevmatike/konfigurator-platisc", icon: Layers, desc: "Poiščite primerna platišča" },
];
