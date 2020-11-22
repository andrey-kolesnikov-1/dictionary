export interface Word {
  number: number,
  word: string,
  translation: string,
  date: string,
  mark: boolean,
  select: boolean
}

export interface Group {
  name: string,
  numberWords: number,
  dateCreate: string,
  numberUse: number,
  lastUse: string,
  selected: boolean
}

export interface WordsForGroup {
  number: number,
  text: string,
  selected: boolean
}
