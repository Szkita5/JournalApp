import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'journal-header',
  template: `
    <header class="bg-dark" [style.min-height]="height">
      <div class="container">
        <nav class="navbar navbar-expand-md sticky-md-top navbar-dark bg-dark">
          <div class="container-fluid">
            <a class="navbar-brand">Journal</a>
            <div class="collapse navbar-collapse">
              <div class="navbar-nav">
                <a class="nav-link active" aria-current="page">Home</a>
                <a class="nav-link">Features</a>
                <a class="nav-link">Pricing</a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  `,
  styles: [`
  `]
})
export class JournalHeaderComponent implements OnInit {

  @Input() height = '3rem';

  constructor() { }

  ngOnInit(): void {
  }

}
