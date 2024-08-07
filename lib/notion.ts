import "server-only";

import { Client } from "@notionhq/client";
import React from "react";
import {
    BlockObjectResponse,
    PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

console.log('notion', notion)

export const fetchPages = React.cache(() => {
    return notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID!,
        filter: {
            property: "Status",
            select: {
                equals: "Published",
            },
        },
    });
});

export const fetchPageBySlug = React.cache(async (slug: string) => {
    const res = await notion.databases
        .query({
            database_id: process.env.NOTION_DATABASE_ID!,
            filter: {
                property: "Slug",
                rich_text: {
                    equals: slug,
                },
            },
        });
    return res.results[0] as PageObjectResponse | undefined;
});

export const fetchPageBlocks = React.cache(async (pageId: string) => {
    const res = await notion.blocks.children
        .list({block_id: pageId,     page_size: 50,});
    console.log('res', res)
    return res.results as BlockObjectResponse[];
});
