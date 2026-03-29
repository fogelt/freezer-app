import { useState, useRef } from 'react'
import { supabase } from '@/utils'
import { PrimaryButton } from '@/ui'
import { Camera } from 'lucide-react'

interface Props {
  shelfNumber: number
  onClose: () => void
  onSuccess: () => void
}

export default function AddItemForm({ shelfNumber, onClose, onSuccess }: Props) {
  const [name, setName] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name) return alert("Namn krävs!")

    setLoading(true)
    let finalImageUrl = null

    try {
      if (image) {
        const fileName = `${Date.now()}-${image.name}`;

        const { error: uploadError } = await supabase.storage
          .from('freezer-images')
          .upload(fileName, image);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from('freezer-images')
          .getPublicUrl(fileName);

        finalImageUrl = data.publicUrl;
      }

      const { error: dbError } = await supabase.from('freezer_items').insert({
        name,
        shelf_number: shelfNumber,
        image_url: finalImageUrl
      })

      if (dbError) throw dbError;

      onSuccess()
    } catch (err: any) {
      console.error("Error saving item:", err)
      alert(`Kunde inte spara: ${err.message || 'Okänt fel'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 p-4 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4">
        <h2 className="mb-6 text-center text-xs font-black tracking-[0.3em] text-brand">
          NY VARA · HYLLA {shelfNumber}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="group relative flex aspect-square w-24 mx-auto cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-brand bg-slate-50"
          >
            {preview ? (
              <img src={preview} className="h-full w-full object-cover" alt="Preview" />
            ) : (
              <Camera className='text-brand' />
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setImage(e.target.files[0])
                  setPreview(URL.createObjectURL(e.target.files[0]))
                }
              }}
            />
          </div>

          <input
            type="text"
            placeholder="VAD SKA VI FRYSA IN?"
            className="w-full rounded-xl border border-slate-200 p-4 outline-brand uppercase text-sm tracking-widest font-bold text-center"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <PrimaryButton
                label="SPARA I FRYSEN"
                loading={loading}
                type="submit"
              />

              <PrimaryButton
                variant="danger"
                label="AVBRYT"
                onClick={onClose}
                disabled={loading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}