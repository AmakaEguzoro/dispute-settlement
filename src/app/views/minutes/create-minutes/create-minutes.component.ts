import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-minutes',
  templateUrl: './create-minutes.component.html',
  styleUrls: ['./create-minutes.component.scss']
})
export class CreateMinutesComponent implements OnInit {

public Editor = ClassicEditor;
public model = {
editorData: '<p>Hello, world!</p>'
};

  constructor() { }

  ngOnInit() {
      // console.log("Editor: "+this.model.editorData)
  }

}
