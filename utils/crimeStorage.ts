import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

export type Crime = {
  id: string;
  name: string;
  image?: string;
  desc: string;
  date: string;
  solved: boolean;
};

const STORAGE_KEY = "CRIME_DB";

async function getCrimes(): Promise<Crime[]> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error("Error reading crimes:", e);
    return [];
  }
}

async function getCrime(id: string): Promise<Crime | undefined> {
  const crimes = await getCrimes();
  return crimes.find((c) => c.id === id);
}

async function addCrime(data: Omit<Crime, "id">): Promise<Crime> {
  const crimes = await getCrimes();
  const id = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    data.name + Date.now().toString()
  );

  const newCrime: Crime = { id, ...data };
  const updated = [...crimes, newCrime];

  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newCrime;
  } catch (e) {
    console.error("Error saving crime:", e);
    throw e;
  }
}

async function updateCrime(id: string, updates: Partial<Omit<Crime, "id">>): Promise<Crime | null> {
  const crimes = await getCrimes();
  const idx = crimes.findIndex((c) => c.id === id);
  if (idx === -1) return null;

  const updatedCrime = { ...crimes[idx], ...updates };
  crimes[idx] = updatedCrime;

  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(crimes));
    return updatedCrime;
  } catch (e) {
    console.error("Error updating crime:", e);
    throw e;
  }
}

async function deleteCrime(id: string): Promise<boolean> {
  const crimes = await getCrimes();
  const filtered = crimes.filter((c) => c.id !== id);

  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (e) {
    console.error("Error deleting crime:", e);
    return false;
  }
}

export default {
  getCrimes,
  getCrime,
  addCrime,
  updateCrime,
  deleteCrime,
};
