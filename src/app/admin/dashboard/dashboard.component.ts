import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedAction: string = 'new';
  selectedEntity: string = 'biographies';

  actions = [
    { label: 'Создать', value: 'new' },
    { label: 'Редактировать', value: 'edit' },
    { label: 'Удалить', value: 'delete' }
  ];

  entities = [
    { label: 'Биографии', value: 'biographies' },
    { label: 'Предметы', value: 'artifacts' },
    { label: 'Новости', value: 'articles' },
    { label: 'Награды', value: 'medals' },
    { label: 'Звания', value: 'ranks' },
  ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['entity']) {
        this.selectedEntity = params['entity'] || this.selectedEntity;
      }
    });
  }

  navigate(): void {
    this.router.navigate([
      '/admin',
      this.selectedEntity,
      this.selectedAction
    ]);
  }
}
