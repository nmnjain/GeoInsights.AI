import React, { useState } from 'react'

export default function ImageRotate() {
  const [angle, setAngle] = useState(0)

  const handleChange = (e) => setAngle(parseInt(e.target.value, 10))

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-28">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Slide Through Time : Past &lt;-&gt; Future</h1>
          <p className="text-sm text-gray-400">Use the bottom slider to Time Travel. Current angle: <span className="text-cyan-300 font-semibold">{angle}°</span></p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gray-900/60 p-4">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop"
              alt="Rotatable"
              className="max-h-full max-w-full transition-transform duration-150 ease-linear drop-shadow-xl"
              style={{ transform: `rotate(${angle}deg)` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom slider bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="rounded-2xl border border-white/10 bg-gray-900/80 backdrop-blur-xl p-3">
            <div className="flex items-center gap-4">
              <label htmlFor="angle" className="text-sm text-gray-300 whitespace-nowrap">TimeGlide</label>
              <input
                id="angle"
                type="range"
                min="-180"
                max="180"
                step="1"
                value={angle}
                onChange={handleChange}
                className="w-full accent-cyan-400"
              />
              <div className="w-14 text-right text-sm text-cyan-300 font-semibold">{angle}°</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
