import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-feeds',
  templateUrl: './create-feeds.component.html',
  styleUrls: ['./create-feeds.component.scss']
})
export class CreateFeedsComponent implements OnInit {

public Editor = ClassicEditor;
public model = {
editorData: '<p>Hello, world!</p>'
};
  constructor() { }

  ngOnInit() {
      // console.log("Editor: "+this.model.editorData)
  }

}
