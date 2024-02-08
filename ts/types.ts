export interface HelpArticle {
  name: string;
  path: string; // Must start with @client
  subitems?: HelpArticle[];
}

export type HelpArticleIndex = HelpArticle[];