import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import * as uuid from "uuid";

@Component({
  selector: "app-add-chips",
  templateUrl: "./add-chips.component.html",
  styleUrls: ["./add-chips.component.css"],
})
export class AddChipsComponent implements AfterViewInit {
  inputChips: string = "";
  currentPosition = 0;
  preCaretRange!: Range;
  @Input() inputChipsValue: any = "";
  @ViewChild("inputChips", { static: true }) el: ElementRef<HTMLInputElement>;

  @Input() formFields = [
    {
      label: "Submission ID",
      value: 1,
    },
    {
      label: "Form Title",
      value: 2,
    },
    {
      label: "Email",
      value: 3,
    },
    {
      label: "Name",
      value: 4,
    },
  ];
  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.el.nativeElement.innerHTML = this.inputChipsValue;
  }

  /**
   * onTextChange()
   * @description to get value of text when change
   * @param event
   */
  onTextChange() {
    this.getCaretPosition();
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
    const newContent = this.renderer.createText(`${selected[0].label}`);

    secChild.setAttribute("class", "dfb-icon-close-line");
    child.setAttribute("id", `chip-${newId}`);
    child.setAttribute("class", "dfd-chip mx-1 ps-2 pe-1");
    child.setAttribute("contenteditable", "false");
    child.append(newContent);
    this.renderer.appendChild(child, secChild);
    this.preCaretRange ? this.preCaretRange.insertNode(child) : "";
  }

  /**
   * deleteTag()
   * @description delete selected chip
   * @param event
   */
  deleteTag(event: any) {
    const id = event.path[1].id;
    if (id) {
      if (this.el.nativeElement.children[id]) {
        this.el.nativeElement.children[id].replaceWith(" ");
      }
    } else {
      this.getCaretPosition();
    }
  }

  /**
   * getCaretPosition()
   * @description get the rang of caret in text input
   */
  getCaretPosition() {
    let position = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
      const selection: any = window.getSelection();
      if (selection.rangeCount !== 0) {
        const range = window.getSelection()!.getRangeAt(0);
        // const preCaretRange = range.cloneRange();
        // preCaretRange.selectNodeContents(this.el.nativeElement);
        // preCaretRange.setEnd(range.endContainer, range.endOffset);
        // position = preCaretRange.toString().length;
        // preCaretRange.setStart(this.el.nativeElement, 0);
        this.preCaretRange = range;
      }
    }
  }
}
