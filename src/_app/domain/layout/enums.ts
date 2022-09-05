export type Enum = Record<string, string>

export type CategorizedRecord = {
  category: string
  value: string
}

export type CategorizedEnum = Record<string, CategorizedRecord>
