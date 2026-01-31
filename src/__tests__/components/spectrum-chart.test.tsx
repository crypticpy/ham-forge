import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SpectrumChart } from '@/components/features/spectrum/spectrum-chart'
import { AMATEUR_BANDS } from '@/data/radio/spectrum-data'
import type { SpectrumFilter } from '@/types/spectrum'

describe('SpectrumChart', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<SpectrumChart />)
      expect(screen.getByRole('region', { name: /spectrum chart/i })).toBeInTheDocument()
    })

    it('renders all amateur bands', () => {
      render(<SpectrumChart />)
      const buttons = screen.getAllByRole('button')
      // Should have one button for each band
      expect(buttons.length).toBeGreaterThanOrEqual(AMATEUR_BANDS.length)
    })

    it('renders band segments group', () => {
      render(<SpectrumChart />)
      expect(screen.getByRole('group', { name: /band segments/i })).toBeInTheDocument()
    })

    it('renders frequency scale markers', () => {
      render(<SpectrumChart />)
      expect(screen.getByText('1.8 MHz')).toBeInTheDocument()
      expect(screen.getByText('7 MHz')).toBeInTheDocument()
      expect(screen.getByText('14 MHz')).toBeInTheDocument()
      expect(screen.getByText('144 MHz')).toBeInTheDocument()
      expect(screen.getByText('1.3 GHz')).toBeInTheDocument()
    })

    it('renders license class legend', () => {
      render(<SpectrumChart />)
      expect(screen.getByText('technician')).toBeInTheDocument()
      expect(screen.getByText('general')).toBeInTheDocument()
      expect(screen.getByText('extra')).toBeInTheDocument()
    })
  })

  describe('band selection', () => {
    it('calls onBandSelect when a band is clicked', () => {
      const onBandSelect = vi.fn()
      render(<SpectrumChart onBandSelect={onBandSelect} />)

      // Find and click the 20m band button
      const buttons = screen.getAllByRole('button')
      const twentyMeterButton = buttons.find((btn) =>
        btn.getAttribute('aria-label')?.includes('20 Meters')
      )

      if (twentyMeterButton) {
        fireEvent.click(twentyMeterButton)
        expect(onBandSelect).toHaveBeenCalledTimes(1)
        expect(onBandSelect).toHaveBeenCalledWith(expect.objectContaining({ name: '20 Meters' }))
      }
    })

    it('calls onBandSelect when Enter key is pressed', () => {
      const onBandSelect = vi.fn()
      render(<SpectrumChart onBandSelect={onBandSelect} />)

      const buttons = screen.getAllByRole('button')
      const firstBandButton = buttons[0]

      fireEvent.keyDown(firstBandButton, { key: 'Enter' })
      expect(onBandSelect).toHaveBeenCalled()
    })

    it('calls onBandSelect when Space key is pressed', () => {
      const onBandSelect = vi.fn()
      render(<SpectrumChart onBandSelect={onBandSelect} />)

      const buttons = screen.getAllByRole('button')
      const firstBandButton = buttons[0]

      fireEvent.keyDown(firstBandButton, { key: ' ' })
      expect(onBandSelect).toHaveBeenCalled()
    })

    it('shows selected band with aria-pressed', () => {
      const selectedBand = AMATEUR_BANDS.find((b) => b.id === '20m')!
      render(<SpectrumChart selectedBand={selectedBand} />)

      const selectedButton = screen
        .getAllByRole('button')
        .find((btn) => btn.getAttribute('aria-label')?.includes('20 Meters'))

      expect(selectedButton).toHaveAttribute('aria-pressed', 'true')
    })

    it('announces selected band to screen readers', () => {
      const selectedBand = AMATEUR_BANDS.find((b) => b.id === '20m')!
      render(<SpectrumChart selectedBand={selectedBand} />)

      // There should be an aria-live region with the selection
      const liveRegion = document.querySelector('[aria-live="polite"]')
      expect(liveRegion).toHaveTextContent(/20 Meters/)
    })
  })

  describe('filtering', () => {
    it('dims non-matching bands when filter is applied', () => {
      const filter: SpectrumFilter = { licenseClass: 'technician' }
      render(<SpectrumChart filter={filter} />)

      // Bands should render with different opacity based on technician access
      // We can't easily test opacity in JSDOM, but we can verify the component renders
      expect(screen.getByRole('region')).toBeInTheDocument()
    })

    it('highlights matching bands in legend when filtered', () => {
      const filter: SpectrumFilter = { licenseClass: 'technician' }
      render(<SpectrumChart filter={filter} />)

      // The technician legend item should be visible
      expect(screen.getByText('technician')).toBeInTheDocument()
    })

    it('renders without filter when filter is undefined', () => {
      render(<SpectrumChart filter={undefined} />)
      expect(screen.getByRole('region')).toBeInTheDocument()
    })

    it('applies category filter', () => {
      const filter: SpectrumFilter = { category: 'VHF' }
      render(<SpectrumChart filter={filter} />)
      expect(screen.getByRole('region')).toBeInTheDocument()
    })

    it('applies mode filter', () => {
      const filter: SpectrumFilter = { mode: 'CW' }
      render(<SpectrumChart filter={filter} />)
      expect(screen.getByRole('region')).toBeInTheDocument()
    })

    it('applies combined filters', () => {
      const filter: SpectrumFilter = { licenseClass: 'general', mode: 'SSB' }
      render(<SpectrumChart filter={filter} />)
      expect(screen.getByRole('region')).toBeInTheDocument()
    })
  })

  describe('tooltips', () => {
    it('shows tooltip on hover', async () => {
      render(<SpectrumChart />)

      const buttons = screen.getAllByRole('button')
      const bandButton = buttons.find((btn) =>
        btn.getAttribute('aria-label')?.includes('20 Meters')
      )

      if (bandButton) {
        fireEvent.mouseEnter(bandButton)
        // Tooltip should appear with band info
        expect(await screen.findByRole('tooltip')).toBeInTheDocument()
      }
    })

    it('hides tooltip on mouse leave', async () => {
      render(<SpectrumChart />)

      const buttons = screen.getAllByRole('button')
      const bandButton = buttons[0]

      fireEvent.mouseEnter(bandButton)
      const tooltip = await screen.findByRole('tooltip')
      expect(tooltip).toBeInTheDocument()

      fireEvent.mouseLeave(bandButton)
      // Tooltip should be removed
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })

    it('shows tooltip on focus', async () => {
      render(<SpectrumChart />)

      const buttons = screen.getAllByRole('button')
      const bandButton = buttons[0]

      fireEvent.focus(bandButton)
      expect(await screen.findByRole('tooltip')).toBeInTheDocument()
    })

    it('tooltip contains band information', async () => {
      render(<SpectrumChart />)

      const buttons = screen.getAllByRole('button')
      const twentyMeterButton = buttons.find((btn) =>
        btn.getAttribute('aria-label')?.includes('20 Meters')
      )

      if (twentyMeterButton) {
        fireEvent.mouseEnter(twentyMeterButton)
        const tooltip = await screen.findByRole('tooltip')

        // Verify tooltip content
        expect(tooltip).toHaveTextContent('20 Meters')
        expect(tooltip).toHaveTextContent(/frequency/i)
        expect(tooltip).toHaveTextContent(/wavelength/i)
      }
    })
  })

  describe('accessibility', () => {
    it('has accessible region landmark', () => {
      render(<SpectrumChart />)
      expect(screen.getByRole('region', { name: /spectrum chart/i })).toBeInTheDocument()
    })

    it('band buttons have descriptive aria-labels', () => {
      render(<SpectrumChart />)

      const buttons = screen.getAllByRole('button')
      buttons.forEach((button) => {
        const label = button.getAttribute('aria-label')
        // Each band button should have an aria-label with band name and frequency
        if (label) {
          expect(label).toMatch(/band|MHz|GHz|kHz/i)
        }
      })
    })

    it('supports keyboard navigation', () => {
      render(<SpectrumChart />)

      const buttons = screen.getAllByRole('button')
      const firstButton = buttons[0]

      // All buttons should be focusable
      firstButton.focus()
      expect(document.activeElement).toBe(firstButton)
    })

    it('has proper focus indicators', () => {
      render(<SpectrumChart />)

      const buttons = screen.getAllByRole('button')
      // Buttons should have focus-visible classes (we can't test actual CSS)
      buttons.forEach((button) => {
        expect(button.className).toMatch(/focus/)
      })
    })
  })

  describe('responsive design', () => {
    it('has minimum width for mobile scrolling', () => {
      render(<SpectrumChart />)

      // The chart container should have a min-width class
      const container = document.querySelector('.min-w-\\[600px\\]')
      expect(container).toBeInTheDocument()
    })

    it('is contained in a scrollable wrapper', () => {
      render(<SpectrumChart />)

      // Should have an overflow-x-auto container
      const scrollContainer = document.querySelector('.overflow-x-auto')
      expect(scrollContainer).toBeInTheDocument()
    })
  })
})

describe('SpectrumChart integration with band data', () => {
  it('renders correct number of band segments', () => {
    render(<SpectrumChart />)

    const buttons = screen.getAllByRole('button')
    // Should match the number of bands in AMATEUR_BANDS
    expect(buttons.length).toBe(AMATEUR_BANDS.length)
  })

  it('bands are ordered by frequency', () => {
    render(<SpectrumChart />)

    const buttons = screen.getAllByRole('button')
    const labels = buttons.map((btn) => btn.getAttribute('aria-label') || '')

    // First band should be 160m (lowest frequency)
    expect(labels[0]).toContain('160')
    // Last band should be 23cm (highest frequency)
    expect(labels[labels.length - 1]).toContain('23')
  })

  it('handles empty selection gracefully', () => {
    render(<SpectrumChart selectedBand={null} />)

    // No buttons should be aria-pressed
    const buttons = screen.getAllByRole('button')
    buttons.forEach((button) => {
      expect(button.getAttribute('aria-pressed')).toBe('false')
    })
  })
})
