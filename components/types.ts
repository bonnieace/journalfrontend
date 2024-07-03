// components/types.ts

export interface JournalEntry {
    id: number;
    title: string;
    content: string;
  }
  
  export interface JournalEntryCreate {
    title: string;
    content: string;
  }
  