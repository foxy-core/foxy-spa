import { CategorizedEnum, Enum } from '@@/domain/layout'
import { PickerOption } from '../picker-option'

export const enumToPickerOptions = (e: Enum): PickerOption[] =>
  Object.entries(e).map(([key, displayValue]) => ({
    key,
    displayValue,
  }))

export const categorizedEnumToPickerOptions = (
  e: CategorizedEnum,
): PickerOption[][] =>
  Object.values(
    Object.entries(e).reduce(
      (acc, [key, { category, value: displayValue }]) => {
        acc[category] = acc[category]
          ? [...acc[category], { key, displayValue }]
          : [{ key, displayValue }]
        return acc
      },
      {} as Record<string, PickerOption[]>,
    ),
  )
