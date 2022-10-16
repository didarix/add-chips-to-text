import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import * as uuid from "uuid";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2) {}
  inputChipsValue: any = "";
  inputChips: any = "";
  currentPosition = 0;
  @ViewChild("inputChips", { static: true }) el: ElementRef<HTMLInputElement>;

  @Input() formFields = [
    {
      label: "Submission ID",
      value: 1,
      tagLength: 14,
    },
    {
      label: "Form Title",
      value: 2,
      tagLength: 11,
    },
    {
      label: "Email",
      value: 3,
      tagLength: 14,
    },
    {
      label: "Name",
      value: 4,
      tagLength: 14,
    },
  ];

  textArray = [
    { content: "qwe", istag: false },
    { content: "qwe", istag: false },
    { content: "qwe", istag: false },
  ];

  ngOnInit() {}
  /**
   * onTextChange()
   * @description to get value of text when change
   * @param event
   */
  onTextChange(event: any) {
    this.inputChips = this.el.nativeElement.innerText;
    console.log(this.inputChips.length);
  }

  /**
   * addChips()
   * @description add new chip to input
   * @param event
   */

  addChips(event: any) {
    const newId = uuid.v4();
    const selected = this.formFields.filter((obj) => {
      return obj.value === event;
    });
    const child = this.renderer.createElement("tag");
    const secChild = this.renderer.createElement("span");
    const newContent = this.renderer.createText(`${event.target.value}`);

    secChild.setAttribute("class", "dfb-icon-close-line");
    child.setAttribute("id", `chip-${newId}`);
    child.setAttribute("class", "dfd-chip ps-1 pe-1");
    child.setAttribute("contenteditable", "false");

    child.append(newContent);
    this.renderer.appendChild(child, secChild);
    // this.renderer.appendChild(this.el.nativeElement, child);
    const range = window.getSelection().getRangeAt(0);
    console.log(range);

    const preCaretRange = range.cloneRange();
    preCaretRange.insertNode(child);
    this.inputChips =
      this.inputChipsValue.changingThisBreaksApplicationSecurity;
  }

  /**
   * deleteTag()
   * @description delete selected chip
   * @param event
   */
  deleteTag(event: any) {
    const id = event.path[1].id;
    if (id) {
      this.el.nativeElement.children[id].remove();
      this.inputChipsValue = this.sanitizer.bypassSecurityTrustHtml(
        this.el.nativeElement.innerHTML
      );
      this.inputChips =
        this.inputChipsValue.changingThisBreaksApplicationSecurity;
      this.el.nativeElement.setAttribute("contenteditable", "false");
      this.el.nativeElement.setAttribute("contenteditable", `true`);
    }
  }

  getMousePosition(event) {
    let position = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
      const selection: any = window.getSelection();
      if (selection.rangeCount !== 0) {
        const range = window.getSelection().getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(this.el.nativeElement);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        position = preCaretRange.toString().length;
        preCaretRange.setStart(this.el.nativeElement, 0);
        const child = this.renderer.createElement("tag");

        const newContent = this.renderer.createText("test");
        child.append(newContent);
        range.insertNode(child);
        console.log(range);
        console.log(range.endOffset);
        console.log(position);

        this.currentPosition = position;
      }
    }
  }
}
