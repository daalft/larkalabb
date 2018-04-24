
import {Component} from "@angular/core";
import {BufferService} from "../../services/buffer.service";
import {LarkaService} from "../../services/larka.service";
import {KarpService} from "../../services/karp.service";

@Component({
  selector: 'buffer-test',
  templateUrl: '../../templates/buffer-test.html'
})

export class BufferTest {

  public param1 = 2;
  public param2 = 3;

  public word = "hund";

  public el = [];
  private args = ["a", ["b", "d"], "c"];
  constructor(private buffer: BufferService, private karp: KarpService) {

  }

  function1(arg1,arg2,arg3) {
      console.log(arg1);
    console.log(arg2);
    console.log(arg3);
  }

  test() {
    //this.buffer.setParams(this.karp.fetchMini, this.word, 3, this.karp);
    this.function1.apply(this, this.args);
  }

  cancel() {
    this.buffer.interrupt();
  }

  elems() {
    while (this.buffer.ready()) {
      this.el.push(this.buffer.next());
    }
  }
}
