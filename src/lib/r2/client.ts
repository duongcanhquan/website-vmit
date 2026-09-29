import { PutObjectCommand, S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing env ${name}`)
  }
  return value
}

export function createR2Client() {
  return new S3Client({
    region: "auto",
    endpoint: requireEnv("R2_ENDPOINT"),
    credentials: {
      accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
      secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
    },
  })
}

export function publicObjectUrl(path: string): string {
  const cdn = process.env.NEXT_PUBLIC_CDN_URL?.replace(/\/$/, "")
  if (cdn && !cdn.includes("placeholder")) {
    return `${cdn}/${path}`
  }
  const endpoint = process.env.R2_ENDPOINT?.replace(/\/$/, "")
  const bucket = process.env.R2_BUCKET
  if (endpoint && bucket) {
    return `${endpoint}/${bucket}/${path}`
  }
  return `/${path}`
}

export async function uploadToR2(params: {
  path: string
  body: Buffer
  contentType: string
}): Promise<string> {
  const client = createR2Client()
  const bucket = requireEnv("R2_BUCKET")
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: params.path,
      Body: params.body,
      ContentType: params.contentType,
    }),
  )
  return publicObjectUrl(params.path)
}

export async function deleteFromR2(path: string): Promise<void> {
  const client = createR2Client()
  const bucket = requireEnv("R2_BUCKET")
  await client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: path,
    }),
  )
}
