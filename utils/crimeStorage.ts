import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export type Crime = {
  id: string;       // UUID
  name: string;
  image?: string;
  desc: string;
  date: string;     // ISO string (e.g. "2025-10-02T10:00:00.000Z")
  solved: boolean;
};

const STORAGE_KEY = "CRIME_DB";

// ---- Helpers ----
const loadCrimes = async (): Promise<Crime[]> => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error loading crimes:", e);
    return [];
  }
};

const saveCrimes = async (crimes: Crime[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(crimes));
  } catch (e) {
    console.error("Error saving crimes:", e);
    throw e;
  }
};

// ---- CRUD Functions ----
export const getCrimes = async (): Promise<Crime[]> => {
  return await loadCrimes();
};

export const getCrime = async (id: string): Promise<Crime | undefined> => {
  const crimes = await loadCrimes();
  return crimes.find((c) => c.id === id);
};

export const addCrime = async (data: Omit<Crime, "id">): Promise<Crime> => {
  const crimes = await loadCrimes();
  const newCrime: Crime = { id: uuidv4(), ...data };
  crimes.push(newCrime);
  await saveCrimes(crimes);
  return newCrime;
};

export const updateCrime = async (
  id: string,
  updates: Partial<Omit<Crime, "id">>
): Promise<Crime | null> => {
  const crimes = await loadCrimes();
  const idx = crimes.findIndex((c) => c.id === id);
  if (idx === -1) return null;

  const updated = { ...crimes[idx], ...updates };
  crimes[idx] = updated;
  await saveCrimes(crimes);
  return updated;
};

export const deleteCrime = async (id: string): Promise<boolean> => {
  const crimes = await loadCrimes();
  const filtered = crimes.filter((c) => c.id !== id);
  if (filtered.length === crimes.length) return false; // not found
  await saveCrimes(filtered);
  return true;
};

// ---- Clear All (for testing/dev) ----
export const clearCrimes = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};

export default {
  getCrimes,
  getCrime,
  addCrime,
  updateCrime,
  deleteCrime,
  clearCrimes,
};
