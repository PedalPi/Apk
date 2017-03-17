export class MessagesList {
  public messages : Array<string> = [];

  public add(message : string) {
    this.messages.push(message);
  }

  public isEmpty() {
    return this.messages.length === 0;
  }

  public toString() {
    if (this.messages.length == 0)
      return "";

    if (this.messages.length == 1)
      return this.messages[0];

    return `<ul>
              ${this.messages.map(message => `<li>${message}</li>`)
              .reduce((a, b) => a+b)}
            </ul>`;
  }
}
