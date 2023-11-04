export class FileInputHandler {
  selectedFile: File | null = null;

  constructor() {
  }

  onFileChanged($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }

    this.selectedFile = input.files[0] as File;
  }

  reset() {
    this.selectedFile = null;
  }

  isPresent():boolean {
    return this.selectedFile != null;
  }

  getSelectedFileName():string {
    return this.selectedFile?.name ?? '';
  }
}
