import { NextResponse } from "next/server"
import { requireStaff } from "@/lib/admin/auth"

export async function GET() {
  try {
    const { supabase } = await requireStaff()
    const { data, error } = await supabase
      .from("media_assets")
      .select("id, url, path, alt_vi, kind, created_at")
      .order("created_at", { ascending: false })
      .limit(300)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ assets: data ?? [] })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Không có quyền" }, { status: 401 })
  }
}
