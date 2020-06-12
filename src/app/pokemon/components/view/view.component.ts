import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {PokeAPIService} from '../../services/poke-api.service';

import {Pokemon} from '../../services/poke-api.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

  public pokemon$: Observable<Pokemon>;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokeAPIService,
  ) { }

  ngOnInit(): void {
    this.pokemon$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.pokemonService.getById(params.id);
      }),
    );
  }

}
