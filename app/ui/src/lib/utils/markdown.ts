import markdownit from 'markdown-it';

const markdownIt = markdownit();

/**
 * Parse markdown into HTML and return it in the form of a
 * `dangerouslySetInnerHTML` React prop.
 * @param content - Markdown content
 * @returns Markdown parsed as HTML
 */
export const md = (content: string) =>
	markdownIt.render(content);

/**
 * Parse markdown into HTML inline and return it in the form of a
 * `dangerouslySetInnerHTML` React prop.
 *
 * Rendering *inline* means the content is rendered without the outer \<p\> tag.
 * @param content - Markdown content
 * @returns Markdown parsed as HTML inline
 */
export const mdi = (content: string) =>
	markdownIt.renderInline(content);
