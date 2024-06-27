"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { IComboBoxItem } from "@/types/combo_box"

interface IComboBoxProps {
    items: IComboBoxItem[];
    onChange?: (value: string) => void;
    placeholder?: string;
    value: string;
}

export function Combobox({ items, onChange, placeholder = 'Select an option', value }: IComboBoxProps) {
    const [open, setOpen] = React.useState(false)
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-fit justify-between px-4"
                >
                    {value
                        ? items.find((item) => item.value === value)?.label
                        : placeholder}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value?.toString()}
                                    onSelect={(currentValue) => {
                                        setOpen(false)
                                        onChange && onChange(currentValue)
                                    }}
                                >
                                    {item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
