export class Service {
  id: number;
  title: string;
  description: string;
  tags: string;
  images: string;

  constructor(id?: number, title?: string, description?: string, tags?: string,
              images?: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.images = images;
  }
}
