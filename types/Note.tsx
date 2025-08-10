export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
}

export class Note {
  constructor(
    id: string,
    title: string,
    content: string,
    category: string,
    created_at: string
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.category = category;
    this.created_at = created_at;
  }
}
