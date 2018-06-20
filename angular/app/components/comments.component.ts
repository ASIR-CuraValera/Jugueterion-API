import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {LoginService} from '../services/login.service';
import {CommentService} from '../services/comment.service';
import {User} from '../model/user';
import {Juguete} from '../model/juguete';
import {GenerateDatePipe} from '../pipes/generate.date.pipe';

@Component({
  selector: "comments",
  templateUrl: "app/view/comments.html",
  directives: [ROUTER_DIRECTIVES],
  providers: [LoginService, CommentService],
  pipes: [GenerateDatePipe]
})

export class CommentsComponent implements OnInit
{
  public titulo: string = "Comentarios";
  public identity;
  public comment;
  public errorMessage;
  public status;
  public commentList;
  public loading = 'show';

  constructor(
    private _loginService: LoginService,
    private _commentService: CommentService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit()
  {
    this.identity = this._loginService.getIdentity();

    this._route.params.subscribe(
      params => {
        let id = +params["id"];
        this.comment = {
          "juguete_id": id,
          "body": ""
        };

        //Conseguir comentatrios
        this.getComments(id);
      }
    );
  }

  onSubmit()
  {
    console.log(this.comment);

    this.loading = 'show';
    let token = this._loginService.getToken();
    this._commentService.create(token, this.comment).subscribe(
      response => {
        this.status = response.status;

        if(this.status != "success") {
          this.status = "error";
          console.log(response.msg);
        }
        else {
          this.comment.body = "";
          //Recagar los comentarios

          this.getComments(this.comment.juguete_id);
        }
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null) {
          console.log(this.errorMessage._body);
          alert("Error en la petición!");
        }
      }
    );
  }

  getComments(juguete_id)
  {
    this.loading = 'show';
    this._commentService.getComments(juguete_id).subscribe(
      response => {
        if(response.status != "success") {
          this.status = "error";
          console.log(response.msg);
        }
        else
          this.commentList = response.data;

        this.loading = 'hide';
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null) {
          console.log(this.errorMessage._body);
          alert("Error en la petición!");
        }
      }
    );
  }

  deleteComment(id)
  {
    let comment_panel = <HTMLElement>document.querySelector(".comment-panel-"+id);
    if(comment_panel != null) {
      comment_panel.style.display = "none";
    }

    let token = this._loginService.getToken();
    this._commentService.delete(token, id).subscribe(
      response => {
        if(response.status != "success") {
          this.status = "error";
          console.log(response.msg);
        }
        else
          this.commentList = response.data;
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null) {
          console.log(this.errorMessage._body);
          alert("Error en la petición!");
        }
      }
    );
  }
}
