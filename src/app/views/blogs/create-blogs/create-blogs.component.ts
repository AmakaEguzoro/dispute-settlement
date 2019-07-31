import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-blogs',
  templateUrl: './create-blogs.component.html',
  styleUrls: ['./create-blogs.component.scss']
})
export class CreateBlogsComponent implements OnInit {

public Editor = ClassicEditor;
public model = {
editorData: '<p>Hello, world!</p>'
};

  constructor() { }

  ngOnInit() {
      // console.log("Editor: "+this.model.editorData)
  }

}
