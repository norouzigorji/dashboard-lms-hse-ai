import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, Download } from 'lucide-react'
import ActionButton from '../common/ActionButton'

function ReportModal({ isOpen, onClose }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="
                glass-card rounded-2xl p-8
                w-full max-w-md
                transform transition-all
              ">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title className="text-xl font-bold text-white">
                    گزارش مدیریتی
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-green-400 font-medium mb-4">
                    ✓ گزارش PDF تولید شد
                  </p>
                  <p className="text-gray-300 text-sm">
                    گزارش مدیریتی با تمام داده‌های انتخاب شده آماده دانلود است.
                  </p>
                </div>

                <div className="flex gap-3">
                  <ActionButton
                    variant="primary"
                    icon={Download}
                    onClick={() => {
                      // Simulate download
                      console.log('Downloading report...')
                      onClose()
                    }}
                    className="flex-1"
                  >
                    دانلود گزارش
                  </ActionButton>
                  <ActionButton
                    variant="ghost"
                    onClick={onClose}
                  >
                    بستن
                  </ActionButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ReportModal

