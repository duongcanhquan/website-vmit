import { revalidatePath, revalidateTag } from "next/cache"
import { NextResponse } from "next/server"
import { clearCmsCache } from "@/services/cms"
import { NewsApiError, assertNewsApiKey, createNewsClient, draftFromRequest, publishNews } from "@/lib/news/publish"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function fail(err: unknown) {
  if (err instanceof NewsApiError) {
    return NextResponse.json({ error: err.message }, { status: err.status })
  }
  const message = err instanceof Error ? err.message : "Không đăng được bài."
  return NextResponse.json({ error: message }, { status: 500 })
}

function refreshNews() {
  clearCmsCache()
  revalidateTag("cms")
  revalidatePath("/")
  revalidatePath("/news", "layout")
}

export async function GET(request: Request) {
  try {
    assertNewsApiKey(request)
    const supabase = createNewsClient()
    const { data, error } = await supabase
      .from("posts")
      .select("id, slug, title_vi, title_en, cover_url, is_published, published_at")
      .order("published_at", { ascending: false })
      .limit(30)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ posts: data ?? [] })
  } catch (err) {
    return fail(err)
  }
}

export async function POST(request: Request) {
  try {
    assertNewsApiKey(request)
    const draft = await draftFromRequest(request)
    const supabase = createNewsClient()
    const post = await publishNews(supabase, draft)
    refreshNews()
    const origin = new URL(request.url).origin
    return NextResponse.json({
      post: {
        ...post,
        url: `${origin}/news/${post.slug}`,
      },
    })
  } catch (err) {
    return fail(err)
  }
}
