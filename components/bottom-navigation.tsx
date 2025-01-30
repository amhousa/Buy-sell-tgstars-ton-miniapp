import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { useRef, useEffect } from "react"

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  items: {
    id: string
    label: string
    icon: IconDefinition
  }[]
}

export function BottomNavigation({ activeTab, onTabChange, items }: BottomNavigationProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio("/click.wav")
    audioRef.current.preload = "auto"
  }, [])

  const playClickSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((error) => {
        if (error.name !== "NotAllowedError") {
          console.error("Error playing sound:", error)
        }
      })
    }
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-md shadow-custom rounded-t-lg"
      aria-label="Main Navigation"
    >
      <div className="flex justify-around p-2">
        {items.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className="flex flex-col items-center"
            onClick={() => {
              onTabChange(item.id)
              playClickSound()
            }}
            aria-current={activeTab === item.id ? "page" : undefined}
          >
            <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
            <span className="text-xs mt-1">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  )
}

