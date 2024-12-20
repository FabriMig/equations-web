import { EditableMathField, addStyles, MathField } from 'react-mathquill';

import "./styles.css"
import { forwardRef } from 'react';
import { Button } from './ui/button';
import { Keyboard } from 'lucide-react';
import useUiStore from '@/store/ui.store';

addStyles()

type MathInputProps = {
    onChange?: (mathField: MathField) => void
    latex: string
    hideKeyboardButton?: boolean
}

const MathInput = forwardRef<MathField | null, MathInputProps>(function MathInput({ onChange, latex, hideKeyboardButton = false }: MathInputProps, equationInputRef) {
    const { addKeyboardStatus, showKeyboard } = useUiStore();

    return (
        <div className='relative flex items-center'>
            {!hideKeyboardButton && (
                <Button onClick={() => addKeyboardStatus(!showKeyboard)} variant='ghost' className='absolute right-0 mr-2 hover:bg-gray-700 hover:text-white' aria-label='keyboard'>
                    <Keyboard className='h-6 w-6' />
                </Button>
            )}
            <EditableMathField

                className="w-full py-6 px-6 text-1xl bg-gray-900 border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white caret-white"
                latex={latex}
                aria-label='mathInput'

                mathquillDidMount={mathField => {
                    if (equationInputRef && "current" in equationInputRef) {
                        equationInputRef.current = mathField
                    }
                }}
                onChange={onChange}

            />
        </div>
    )
})

export default MathInput