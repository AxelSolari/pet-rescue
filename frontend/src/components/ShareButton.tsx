import { ShareIcon, ClipboardDocumentIcon } from "@heroicons/react/20/solid"
import { useRef ,useState } from "react"
import type { Publication } from "../types"
import { useClickOutside } from "../hooks/useClickOutside"

type ShareButtonProps = {
    publicationId: Publication['_id']
}

export default function ShareButton({publicationId} : ShareButtonProps) {
    
    const [open, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const url = `${window.location.origin}/?viewDetails=true&publicationId=${publicationId}`
  
    const handleCopy = async() => {
        await navigator.clipboard.writeText(url)
        alert('Enlace copiado al portapapeles')
        setOpen(false)
    }

    useClickOutside(menuRef, () => setOpen(false))

    return (
    <div className="relative inline-block text-left">
        <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 text-sm rounded cursor-pointer"
        >
            <ShareIcon className="w-4 h-4 text-yellow-700"/>
            Compartir
        </button>

        {open && (
            <div className="absolute -right-5 -top-42 z-10 mt-2 w-34 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                ref={menuRef}
            >
                <div className="py-1 flex flex-col items-center shadow-lg ">
                    <a
                        href={`https://wa.me/?text=${encodeURIComponent(url)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 hover:bg-yellow-200 flex gap-2 text-sm"
                    >
                        <img src="/icons/whatsapp.svg" />
                        WhatsApp
                    </a>
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-2 px-4 py-2 hover:bg-yellow-200 text-sm"
                    >
                        <img src="/icons/facebook.svg" />
                        Facebook
                    </a>
                    <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-2 px-4 py-2 hover:bg-yellow-200 text-sm"
                    >
                        <img src="/icons/twitter-x.svg" />
                        Twitter
                    </a>
                    <button
                        onClick={handleCopy}
                        className="w-full py-2 hover:bg-yellow-200 flex items-center justify-center gap-2 text-sm"
                    >
                        <ClipboardDocumentIcon className="w-4 h-4 text-black" />
                        Copiar enlace
                    </button>
                </div>
            </div>
        )}
    </div>
  )
}
