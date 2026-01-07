import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

const timeRanges = [
  { id: 'today', label: 'امروز' },
  { id: 'week', label: 'هفته جاری' },
  { id: 'month', label: 'ماه جاری' },
]

function TimeRangeFilter({ value, onChange }) {
  const selected = timeRanges.find(r => r.id === value) || timeRanges[0]

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="
          glass-strong rounded-lg px-3 md:px-4 py-1.5 md:py-2 pr-8 md:pr-10
          text-xs md:text-sm font-medium text-white
          flex items-center gap-2 w-full sm:w-auto
          hover:bg-white/10 transition-colors
          border border-white/20
        ">
          <span>{selected.label}</span>
          <ChevronDown className="w-3 h-3 md:w-4 md:h-4 absolute left-2" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="
            absolute top-full mt-2 left-0 z-50
            glass-strong rounded-lg overflow-hidden
            border border-white/20
            w-full sm:w-auto min-w-[120px] md:min-w-[150px]
          ">
            {timeRanges.map((range) => (
              <Listbox.Option
                key={range.id}
                value={range.id}
                className={({ active }) =>
                  `px-3 md:px-4 py-1.5 md:py-2 cursor-pointer text-xs md:text-sm text-white transition-colors ${
                    active ? 'bg-white/10' : ''
                  }`
                }
              >
                {range.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default TimeRangeFilter

