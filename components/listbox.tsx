import React, {Fragment} from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'


const listbox: any = (props: any) => {

    const listboxButton = "relative w-full py-4 pl-3 pr-10 text-left bg-light rounded-md shadow-md cursor-pointer focus:outline-none sm:text-sm"
    const listboxOptions = "z-10 absolute py-2 mt-1 overflow-auto text-base bg-light rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm w-full"
    const containerStyle = "relative mt-1 "
    return (
        <Listbox value={props.value} onChange={props.setValue}>
            <div className={containerStyle}>
                <Listbox.Button className={listboxButton}>
                    <span className="block truncate">{props.value.insert}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    </span>
                </Listbox.Button>
                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Listbox.Options className={listboxOptions}>
                        {props.values.map((value: any, valueIdx: any) => (
                            <Listbox.Option
                                key={valueIdx}
                                className={({ active }) =>
                                    `${active ? 'text-black bg-primary' : 'text-gray-900'} cursor-pointer select-none relative py-2 pl-10 pr-4`
                                }
                                value={value}
                                >
                                {({ selected, active }) => (
                                    <>
                                        <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>{value.insert}</span>
                                        {selected ? (
                                            <span className={`${active ? 'text-amber-600' : 'text-amber-600'} absolute inset-y-0 left-0 flex items-center pl-3`}>
                                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>       
            </div>            
        </Listbox>
    )
}

export default listbox