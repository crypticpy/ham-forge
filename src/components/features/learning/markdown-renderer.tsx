'use client'

import { cn } from '@/lib/utils'

interface MarkdownRendererProps {
  content: string
  className?: string
}

/**
 * Enhanced markdown renderer for learning content
 *
 * Supports:
 * - Headers (h1-h4)
 * - Paragraphs with proper spacing
 * - Bold and italic text
 * - Bullet and numbered lists
 * - Code blocks with syntax highlighting hints
 * - Inline code
 * - Tables with proper styling
 * - Horizontal rules for visual breaks
 * - Callout boxes: :::info, :::warning, :::tip, :::definition, :::formula, :::radio, :::examfocus
 *
 * Uses regex parsing without external dependencies
 */
export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  const html = parseMarkdown(content)

  return (
    <div
      className={cn(
        'prose prose-slate dark:prose-invert max-w-none',
        // Headers - with better visual hierarchy
        'prose-h1:text-2xl prose-h1:font-bold prose-h1:mb-4 prose-h1:mt-8 prose-h1:pb-2 prose-h1:border-b prose-h1:border-border',
        'prose-h2:text-xl prose-h2:font-semibold prose-h2:mb-3 prose-h2:mt-6',
        'prose-h3:text-lg prose-h3:font-semibold prose-h3:mb-2 prose-h3:mt-5',
        'prose-h4:text-base prose-h4:font-medium prose-h4:mb-2 prose-h4:mt-4',
        // Paragraphs - generous spacing for readability
        'prose-p:mb-4 prose-p:leading-relaxed prose-p:text-muted-foreground',
        // Lists - comfortable spacing
        'prose-ul:mb-4 prose-ul:pl-6 prose-li:mb-2 prose-li:text-muted-foreground',
        'prose-ol:mb-4 prose-ol:pl-6',
        // Code - subtle but clear
        'prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-foreground',
        'prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:border prose-pre:border-border',
        // Strong/Em
        'prose-strong:font-semibold prose-strong:text-foreground prose-em:italic',
        // Tables
        '[&_table]:w-full [&_table]:border-collapse [&_table]:my-4',
        '[&_th]:bg-muted [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:border [&_th]:border-border',
        '[&_td]:px-4 [&_td]:py-2 [&_td]:border [&_td]:border-border [&_td]:text-muted-foreground',
        '[&_tr:nth-child(even)]:bg-muted/30',
        // Horizontal rules
        '[&_hr]:my-8 [&_hr]:border-t-2 [&_hr]:border-border',
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

/**
 * Callout box component styles
 * These are rendered as HTML but styled via CSS classes
 */
const calloutStyles = {
  info: {
    container: 'my-6 rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30 p-4',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'font-semibold text-blue-900 dark:text-blue-100',
    content: 'text-blue-800 dark:text-blue-200',
  },
  warning: {
    container: 'my-6 rounded-lg border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30 p-4',
    icon: 'text-amber-600 dark:text-amber-400',
    title: 'font-semibold text-amber-900 dark:text-amber-100',
    content: 'text-amber-800 dark:text-amber-200',
  },
  tip: {
    container: 'my-6 rounded-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-950/30 p-4',
    icon: 'text-green-600 dark:text-green-400',
    title: 'font-semibold text-green-900 dark:text-green-100',
    content: 'text-green-800 dark:text-green-200',
  },
  definition: {
    container:
      'my-6 rounded-lg border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/30 p-4',
    icon: 'text-purple-600 dark:text-purple-400',
    title: 'font-semibold text-purple-900 dark:text-purple-100',
    content: 'text-purple-800 dark:text-purple-200',
  },
  formula: {
    container: 'my-6 rounded-lg border-l-4 border-cyan-500 bg-cyan-50 dark:bg-cyan-950/30 p-4',
    icon: 'text-cyan-600 dark:text-cyan-400',
    title: 'font-semibold text-cyan-900 dark:text-cyan-100',
    content: 'text-cyan-800 dark:text-cyan-200 font-mono',
  },
  radio: {
    container:
      'my-6 rounded-lg border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/30 p-4',
    icon: 'text-orange-600 dark:text-orange-400',
    title: 'font-semibold text-orange-900 dark:text-orange-100',
    content: 'text-orange-800 dark:text-orange-200',
  },
  examfocus: {
    container: 'my-6 rounded-lg border-l-4 border-rose-500 bg-rose-50 dark:bg-rose-950/30 p-4',
    icon: 'text-rose-600 dark:text-rose-400',
    title: 'font-semibold text-rose-900 dark:text-rose-100',
    content: 'text-rose-800 dark:text-rose-200',
  },
}

// SVG icons as strings for use in HTML
const calloutIcons = {
  info: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
  warning:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  tip: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>',
  definition:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>',
  formula:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="m13 2-2 2.5h3L12 7"/><path d="M10 14v-3"/><path d="M14 14v-3"/><path d="M12 14v-3"/><circle cx="12" cy="17" r="3"/></svg>',
  radio:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></svg>',
  examfocus:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
}

/**
 * Parse markdown content to HTML
 * Enhanced parser with callouts, tables, and better formatting
 */
function parseMarkdown(markdown: string): string {
  if (!markdown) return ''

  let html = markdown

  // Escape HTML entities first to prevent XSS
  html = escapeHtml(html)

  // Process callout blocks FIRST (before any other processing)
  // Syntax: :::type Title\nContent\n:::
  html = processCallouts(html)

  // Code blocks (must be processed before other elements)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const languageClass = lang ? ` class="language-${lang}"` : ''
    return `<pre><code${languageClass}>${code.trim()}</code></pre>`
  })

  // Inline code (single backticks)
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr />')
  html = html.replace(/^\*\*\*$/gm, '<hr />')

  // Headers (must process from h4 to h1 to avoid conflicts)
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>')
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')

  // Bold (double asterisks or underscores)
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>')

  // Italic (single asterisks or underscores) - be careful not to match within words
  html = html.replace(/(?<![*\w])\*([^*]+)\*(?![*\w])/g, '<em>$1</em>')
  html = html.replace(/(?<![_\w])_([^_]+)_(?![_\w])/g, '<em>$1</em>')

  // Process tables
  html = processTables(html)

  // Process bullet and numbered lists
  html = processLists(html)

  // Paragraphs - wrap standalone lines
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
  return text.replace(/[&<>]/g, (char) => htmlEntities[char] || char)
}

/**
 * Process callout blocks
 * Syntax: :::type Title
 *         Content here
 *         :::
 */
function processCallouts(html: string): string {
  // Match callout blocks: :::type Title\nContent\n:::
  const calloutRegex =
    /:::(info|warning|tip|definition|formula|radio|examfocus)(?:\s+(.+?))?\n([\s\S]*?):::/g

  return html.replace(calloutRegex, (_, type, title, content) => {
    const styles = calloutStyles[type as keyof typeof calloutStyles]
    const icon = calloutIcons[type as keyof typeof calloutIcons]
    const titleText = title?.trim() || getDefaultTitle(type)
    const contentHtml = content
      .trim()
      .split('\n')
      .map((line: string) => line.trim())
      .filter((line: string) => line)
      .join('<br />')

    return `
<div class="${styles.container}">
  <div class="flex items-start gap-3">
    <span class="${styles.icon}">${icon}</span>
    <div class="flex-1 min-w-0">
      <div class="${styles.title} mb-1">${titleText}</div>
      <div class="${styles.content} text-sm leading-relaxed">${contentHtml}</div>
    </div>
  </div>
</div>`
  })
}

/**
 * Get default title for callout types
 */
function getDefaultTitle(type: string): string {
  const titles: Record<string, string> = {
    info: 'Info',
    warning: 'Warning',
    tip: 'Tip',
    definition: 'Definition',
    formula: 'Formula',
    radio: 'Radio Note',
    examfocus: 'Exam Focus',
  }
  return titles[type] || 'Note'
}

/**
 * Process markdown tables
 * Supports: | Header | Header |
 *           |--------|--------|
 *           | Cell   | Cell   |
 */
function processTables(html: string): string {
  const lines = html.split('\n')
  const result: string[] = []
  let tableBuffer: string[] = []
  let inTable = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Check if line looks like a table row
    const isTableRow = line.startsWith('|') && line.endsWith('|')
    const isSeparator = /^\|[\s\-:|]+\|$/.test(line)

    if (isTableRow || isSeparator) {
      if (!inTable) {
        inTable = true
      }
      tableBuffer.push(line)
    } else {
      if (inTable) {
        // Flush table
        result.push(renderTable(tableBuffer))
        tableBuffer = []
        inTable = false
      }
      result.push(lines[i])
    }
  }

  // Flush any remaining table
  if (inTable && tableBuffer.length > 0) {
    result.push(renderTable(tableBuffer))
  }

  return result.join('\n')
}

/**
 * Render a markdown table to HTML
 */
function renderTable(rows: string[]): string {
  if (rows.length < 2) return rows.join('\n')

  // Find the separator row
  const separatorIndex = rows.findIndex((row) => /^\|[\s\-:|]+\|$/.test(row))
  if (separatorIndex === -1) return rows.join('\n')

  // Parse header rows (everything before separator)
  const headerRows = rows.slice(0, separatorIndex)
  // Parse body rows (everything after separator)
  const bodyRows = rows.slice(separatorIndex + 1)

  // Build HTML
  let tableHtml = '<table>'

  // Header
  if (headerRows.length > 0) {
    tableHtml += '<thead>'
    for (const row of headerRows) {
      const cells = row
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim())
      tableHtml += '<tr>'
      for (const cell of cells) {
        tableHtml += `<th>${cell}</th>`
      }
      tableHtml += '</tr>'
    }
    tableHtml += '</thead>'
  }

  // Body
  if (bodyRows.length > 0) {
    tableHtml += '<tbody>'
    for (const row of bodyRows) {
      const cells = row
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim())
      tableHtml += '<tr>'
      for (const cell of cells) {
        tableHtml += `<td>${cell}</td>`
      }
      tableHtml += '</tr>'
    }
    tableHtml += '</tbody>'
  }

  tableHtml += '</table>'
  return tableHtml
}

/**
 * Process bullet and numbered lists
 */
function processLists(html: string): string {
  const lines = html.split('\n')
  const result: string[] = []
  let inUnorderedList = false
  let inOrderedList = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    // Unordered list item
    const unorderedMatch = trimmed.match(/^[-*]\s+(.+)$/)
    // Ordered list item
    const orderedMatch = trimmed.match(/^(\d+)\.\s+(.+)$/)

    if (unorderedMatch) {
      // Close ordered list if open
      if (inOrderedList) {
        result.push('</ol>')
        inOrderedList = false
      }
      // Open unordered list if not open
      if (!inUnorderedList) {
        result.push('<ul>')
        inUnorderedList = true
      }
      result.push(`<li>${unorderedMatch[1]}</li>`)
    } else if (orderedMatch) {
      // Close unordered list if open
      if (inUnorderedList) {
        result.push('</ul>')
        inUnorderedList = false
      }
      // Open ordered list if not open
      if (!inOrderedList) {
        result.push('<ol>')
        inOrderedList = true
      }
      result.push(`<li>${orderedMatch[2]}</li>`)
    } else {
      // Close any open lists
      if (inUnorderedList) {
        result.push('</ul>')
        inUnorderedList = false
      }
      if (inOrderedList) {
        result.push('</ol>')
        inOrderedList = false
      }
      result.push(line)
    }
  }

  // Close any remaining open lists
  if (inUnorderedList) {
    result.push('</ul>')
  }
  if (inOrderedList) {
    result.push('</ol>')
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

    // Check if line is already an HTML element
    if (
      trimmed.startsWith('<h') ||
      trimmed.startsWith('</h') ||
      trimmed.startsWith('<ul') ||
      trimmed.startsWith('</ul') ||
      trimmed.startsWith('<ol') ||
      trimmed.startsWith('</ol') ||
      trimmed.startsWith('<li') ||
      trimmed.startsWith('</li') ||
      trimmed.startsWith('<pre') ||
      trimmed.startsWith('</pre') ||
      trimmed.startsWith('<code') ||
      trimmed.startsWith('</code') ||
      trimmed.startsWith('<table') ||
      trimmed.startsWith('</table') ||
      trimmed.startsWith('<thead') ||
      trimmed.startsWith('</thead') ||
      trimmed.startsWith('<tbody') ||
      trimmed.startsWith('</tbody') ||
      trimmed.startsWith('<tr') ||
      trimmed.startsWith('</tr') ||
      trimmed.startsWith('<th') ||
      trimmed.startsWith('</th') ||
      trimmed.startsWith('<td') ||
      trimmed.startsWith('</td') ||
      trimmed.startsWith('<div') ||
      trimmed.startsWith('</div') ||
      trimmed.startsWith('<hr') ||
      trimmed.startsWith('<span') ||
      trimmed.startsWith('</span') ||
      trimmed.startsWith('<br')
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

// Export callout types for use in content authoring
export type CalloutType =
  | 'info'
  | 'warning'
  | 'tip'
  | 'definition'
  | 'formula'
  | 'radio'
  | 'examfocus'
