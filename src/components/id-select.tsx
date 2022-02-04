import { Select } from 'antd';
import React from 'react'
import { Raw } from 'types'

// 获得Select身上所有的自带类型
// 当子类型存在父类型的Props的时候.不是简单的覆盖.而是取得一个最大公约数.
type SelectProps = React.ComponentProps<typeof Select>
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'defaultOptionName' | 'options'> {
    value?: Raw | null | undefined,// 当转入的值的时候,都为number
    onChange?: (valie?: number) => void,
    defaultOptionName?: string,// 作为默认值存在的
    options?: { name: string, id: number }[]
}

/**
 * value 可以传入多种类型的值
 * onChange只会回调 number|undefined类型
 * 当isNaN(Number(value))为true的时候,代表选择默认类型
 * 当选择默认类型的时候,onChange会回调[返回]undefine
 */
export default function IdSelect(props: IdSelectProps) {
    const { value, onChange, defaultOptionName, options, ...restProps } = props;
    return (
        <Select
            // Select的value如果没有匹配到的话,那么默认就是显示的id
            value={options?.length ? toNumber(value) : 0}
            onChange={value => onChange?.(toNumber(value) || undefined)}
            {...restProps}
        >
            {
                defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
            }
            {
                options?.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)
            }
        </Select>
    )
}

const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)
