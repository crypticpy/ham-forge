'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Upload, AlertTriangle, Check, X, Loader2 } from 'lucide-react'
import { exportAllData, importData, downloadAsJson, validateImportData } from '@/lib/data-export'

type MessageType = 'success' | 'error' | null

interface Message {
  type: MessageType
  text: string
}

export function ExportDialog() {
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [message, setMessage] = useState<Message>({ type: null, text: '' })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExport = async () => {
    setIsExporting(true)
    setMessage({ type: null, text: '' })

    try {
      const data = await exportAllData()
      const timestamp = new Date().toISOString().split('T')[0]
      const filename = `hamforge-backup-${timestamp}.json`
      downloadAsJson(data, filename)
      setMessage({ type: 'success', text: 'Data exported successfully!' })
    } catch (error) {
      console.error('Export failed:', error)
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Export failed. Please try again.',
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setMessage({ type: null, text: '' })
    }
  }

  const handleImportClick = () => {
    if (selectedFile) {
      setShowConfirmation(true)
    }
  }

  const handleConfirmImport = async () => {
    if (!selectedFile) return

    setShowConfirmation(false)
    setIsImporting(true)
    setMessage({ type: null, text: '' })

    try {
      const text = await selectedFile.text()
      const parsedData = JSON.parse(text)

      if (!validateImportData(parsedData)) {
        setMessage({
          type: 'error',
          text: 'Invalid file format. Please select a valid HamForge backup file.',
        })
        return
      }

      const result = await importData(parsedData)

      if (result.success) {
        setMessage({ type: 'success', text: result.message })
        setSelectedFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      } else {
        setMessage({ type: 'error', text: result.message })
      }
    } catch (error) {
      console.error('Import failed:', error)
      setMessage({
        type: 'error',
        text: 'Failed to read file. Please make sure it is a valid JSON file.',
      })
    } finally {
      setIsImporting(false)
    }
  }

  const handleCancelImport = () => {
    setShowConfirmation(false)
  }

  const clearFileSelection = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      {/* Export Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Download className="size-5" aria-hidden="true" />
            Export Data
          </CardTitle>
          <CardDescription>
            Download all your study progress, exam history, and settings as a backup file.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleExport} disabled={isExporting} className="w-full sm:w-auto">
            {isExporting ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="size-4" aria-hidden="true" />
                Export Backup
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Import Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Upload className="size-5" aria-hidden="true" />
            Import Data
          </CardTitle>
          <CardDescription>
            Restore your data from a previously exported backup file.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File Input */}
          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileSelect}
              className="block w-full text-sm text-muted-foreground
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-primary file:text-primary-foreground
                hover:file:bg-primary/90
                file:cursor-pointer cursor-pointer"
            />
            {selectedFile && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Selected: {selectedFile.name}</span>
                <button
                  onClick={clearFileSelection}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Clear selection"
                >
                  <X className="size-4" />
                </button>
              </div>
            )}
          </div>

          {/* Import Button */}
          <Button
            onClick={handleImportClick}
            disabled={!selectedFile || isImporting}
            variant="outline"
            className="w-full sm:w-auto"
          >
            {isImporting ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Importing...
              </>
            ) : (
              <>
                <Upload className="size-4" aria-hidden="true" />
                Import Backup
              </>
            )}
          </Button>

          {/* Confirmation Dialog */}
          {showConfirmation && (
            <div className="rounded-lg border border-amber-500/50 bg-amber-500/10 p-4 space-y-3">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  className="size-5 text-amber-500 flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="space-y-1">
                  <p className="font-medium text-sm">Confirm Import</p>
                  <p className="text-sm text-muted-foreground">
                    This will replace all your existing data with the imported data. This action
                    cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" size="sm" onClick={handleCancelImport}>
                  Cancel
                </Button>
                <Button variant="destructive" size="sm" onClick={handleConfirmImport}>
                  Yes, Import
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Status Message */}
      {message.type && (
        <div
          className={`flex items-center gap-2 rounded-lg p-4 ${
            message.type === 'success'
              ? 'bg-green-500/10 border border-green-500/50 text-green-700 dark:text-green-400'
              : 'bg-red-500/10 border border-red-500/50 text-red-700 dark:text-red-400'
          }`}
        >
          {message.type === 'success' ? (
            <Check className="size-5 flex-shrink-0" aria-hidden="true" />
          ) : (
            <X className="size-5 flex-shrink-0" aria-hidden="true" />
          )}
          <span className="text-sm">{message.text}</span>
        </div>
      )}
    </div>
  )
}
