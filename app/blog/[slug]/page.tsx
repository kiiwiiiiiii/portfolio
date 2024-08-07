// app/blog/[slug]/page.tsx
import { fetchPageBlocks, fetchPageBySlug, notion } from "@/lib/notion";
import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import { notFound } from "next/navigation";
import {BlockObjectResponse} from "@notionhq/client/build/src/api-endpoints";


export default async function Blog({params}: {params: {slug: string}}) {
    const post = await fetchPageBySlug(params.slug);
    console.log('post', post);
    if (!post) notFound();

    const content = await fetchPageBlocks(post.id);
    const renderer = new NotionRenderer({
        client: notion,
    });

    // @ts-ignore
    renderer.use(hljsPlugin());
    // @ts-ignore
    renderer.use(bookmarkPlugin());

    const html = await renderer.render(...content);
    console.log('content', content);

    return (
        <main className="flex flex-col items-center px-4 w-full">
           <div dangerouslySetInnerHTML={{ __html: html }} className="max-w-[53rem]"></div>
        </main>
    )
}