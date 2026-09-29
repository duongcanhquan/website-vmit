"use server"

import { saveEnglishTest, type EnglishTestRecord } from "@/lib/leads"

export async function submitEnglishTest(record: EnglishTestRecord) {
  return saveEnglishTest(record)
}
