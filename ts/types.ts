export interface HelpArticle {
  name: string;
  path: ArticlePath; // Must start with @client
  subitems?: HelpArticle[];
  icon?: string;
}

export type HelpArticleIndex = HelpArticle[];
export type ArticlePath = `@client/help/${string}.md`;
