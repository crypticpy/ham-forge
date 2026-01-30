'use client'

import { cn } from '@/lib/utils'

interface MarkdownRendererProps {
  content: string
  className?: string
}

/**
 * Simple markdown renderer for learning content
 * Supports: headers (h1-h4), paragraphs, bold, italic, bullet lists, code blocks
 * Uses regex parsing without external dependencies
 */
export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  const html = parseMarkdown(content)

  return (
    <div
      className={cn(
        'prose prose-slate dark:prose-invert max-w-none',
        // Headers
        'prose-h1:text-2xl prose-h1:font-bold prose-h1:mb-4 prose-h1:mt-6',
        'prose-h2:text-xl prose-h2:font-semibold prose-h2:mb-3 prose-h2:mt-5',
        'prose-h3:text-lg prose-h3:font-semibold prose-h3:mb-2 prose-h3:mt-4',
        'prose-h4:text-base prose-h4:font-medium prose-h4:mb-2 prose-h4:mt-3',
        // Paragraphs
        'prose-p:mb-4 prose-p:leading-relaxed',
        // Lists
        'prose-ul:mb-4 prose-ul:pl-6 prose-li:mb-2',
        // Code
        'prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono',
        'prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto',
        // Strong/Em
        'prose-strong:font-semibold prose-em:italic',
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

/**
 * Parse markdown content to HTML
 * Simple regex-based parser for common markdown elements
 */
function parseMarkdown(markdown: string): string {
  if (!markdown) return ''

  let html = markdown

  // Escape HTML entities first to prevent XSS
  html = escapeHtml(html)

  // Code blocks (must be processed before other elements)
  // Triple backtick code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const languageClass = lang ? ` class="language-${lang}"` : ''
    return `<pre><code${languageClass}>${code.trim()}</code></pre>`
  })

  // Inline code (single backticks)
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Headers (must process from h4 to h1 to avoid conflicts)
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>')
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')

  // Bold (double asterisks or underscores)
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>')

  // Italic (single asterisks or underscores)
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>')

  // Process bullet lists
  html = processLists(html)

  // Paragraphs - wrap standalone lines (not headers, lists, or code blocks)
  html = processParagraphs(html)

  return html
}

/**
 * Escape HTML entities to prevent XSS
 */
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
  }
  // Don't escape quotes as they're needed for markdown syntax
  return text.replace(/[&<>]/g, (char) => htmlEntities[char] || char)
}

/**
 * Process bullet lists (- or * at start of line)
 */
function processLists(html: string): string {
  const lines = html.split('\n')
  const result: string[] = []
  let inList = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const listMatch = line.match(/^[-*]\s+(.+)$/)

    if (listMatch) {
      if (!inList) {
        result.push('<ul>')
        inList = true
      }
      result.push(`<li>${listMatch[1]}</li>`)
    } else {
      if (inList) {
        result.push('</ul>')
        inList = false
      }
      result.push(line)
    }
  }

  // Close any unclosed list at the end
  if (inList) {
    result.push('</ul>')
  }

  return result.join('\n')
}

/**
 * Wrap standalone text in paragraph tags
 * Skips lines that are already wrapped in HTML tags
 */
function processParagraphs(html: string): string {
  const lines = html.split('\n')
  const result: string[] = []
  let paragraphBuffer: string[] = []

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      const content = paragraphBuffer.join(' ').trim()
      if (content) {
        result.push(`<p>${content}</p>`)
      }
      paragraphBuffer = []
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    // Skip empty lines - flush paragraph
    if (!trimmed) {
      flushParagraph()
      continue
    }

    // Check if line starts with an HTML tag (headers, lists, code blocks)
    if (
      trimmed.startsWith('<h') ||
      trimmed.startsWith('</h') ||
      trimmed.startsWith('<ul') ||
      trimmed.startsWith('</ul') ||
      trimmed.startsWith('<li') ||
      trimmed.startsWith('</li') ||
      trimmed.startsWith('<pre') ||
      trimmed.startsWith('</pre') ||
      trimmed.startsWith('<code') ||
      trimmed.startsWith('</code')
    ) {
      flushParagraph()
      result.push(line)
      continue
    }

    // Add to paragraph buffer
    paragraphBuffer.push(trimmed)
  }

  // Flush any remaining paragraph content
  flushParagraph()

  return result.join('\n')
}
