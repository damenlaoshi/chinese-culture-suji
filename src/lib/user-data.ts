import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";

export const listFavorites = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<{ topic_slug: string }>`
      select topic_slug from user_favorites
      where user_id = ${context.userId}
      order by created_at desc
    `;
  });

export const toggleFavoriteRemote = createServerFn({ method: "POST" })
  .validator((slug: string) => slug)
  .middleware([authMiddleware])
  .handler(async ({ context, data: slug }) => {
    const sql = await getSql();
    const existing = await sql<{ topic_slug: string }>`
      select topic_slug from user_favorites
      where user_id = ${context.userId} and topic_slug = ${slug}
    `;
    if (existing.length) {
      await sql`
        delete from user_favorites
        where user_id = ${context.userId} and topic_slug = ${slug}
      `;
      return { saved: false as const };
    }
    await sql`
      insert into user_favorites (user_id, topic_slug)
      values (${context.userId}, ${slug})
    `;
    return { saved: true as const };
  });

export const listVocabRemote = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<{ hanzi: string; status: string }>`
      select hanzi, status from user_vocab where user_id = ${context.userId}
    `;
  });

export const upsertVocabRemote = createServerFn({ method: "POST" })
  .validator((input: { hanzi: string; status: string }) => input)
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      insert into user_vocab (user_id, hanzi, status, updated_at)
      values (${context.userId}, ${data.hanzi}, ${data.status}, now())
      on conflict (user_id, hanzi)
      do update set status = excluded.status, updated_at = now()
    `;
    return { ok: true as const };
  });
